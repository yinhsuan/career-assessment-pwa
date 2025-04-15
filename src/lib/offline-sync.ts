import { openDB, DBSchema } from 'idb';
import { OfflineAssessment } from '@/types/assessment';

const DB_NAME = 'career-assessment-db';
const DB_VERSION = 1;
const STORE_NAME = 'pending-assessments';

interface AssessmentDB extends DBSchema {
  'pending-assessments': {
    key: number;
    value: OfflineAssessment;
    indexes: {
      'status': string;
    }
  }
}

export async function initDB() {
  return openDB<AssessmentDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { 
          keyPath: 'localId',
          autoIncrement: true 
        });
        store.createIndex('status', 'status');
      }
    }
  });
}

export async function saveAssessmentOffline(assessment: Omit<OfflineAssessment, 'localId' | 'status' | 'createdAt'>): Promise<number> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  const assessmentWithStatus: OfflineAssessment = {
    ...assessment,
    status: 'pending',
    createdAt: new Date()
  };
  
  const id = await store.add(assessmentWithStatus);
  await tx.done;
  
  return id as number;
}

export async function syncPendingAssessments(): Promise<{ synced: number, failed: number }> {
  if (!navigator.onLine) return { synced: 0, failed: 0 };
  
  const db = await initDB();
  const pendingAssessments = await db.getAllFromIndex(
    STORE_NAME, 
    'status', 
    'pending'
  );
  
  let synced = 0;
  let failed = 0;
  
  for (const assessment of pendingAssessments) {
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores: assessment.scores,
          answers: assessment.answers,
          date: assessment.date
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // 更新本地記錄狀態
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        assessment.status = 'synced';
        assessment.serverId = result.id;
        await store.put(assessment);
        await tx.done;
        
        synced++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error('Sync failed for assessment:', error);
      failed++;
    }
  }
  
  return { synced, failed };
}