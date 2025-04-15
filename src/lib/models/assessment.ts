import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import { Assessment } from '@/types/assessment';

export async function saveAssessment(assessment: Omit<Assessment, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ insertedId: string }> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'career-assessment');
  
  const now = new Date();
  const result = await db.collection('assessments').insertOne({
    ...assessment,
    createdAt: now,
    updatedAt: now
  });
  
  return { insertedId: result.insertedId.toString() };
}

export async function getUserAssessments(userId: string): Promise<Assessment[]> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'career-assessment');
  
  const assessments = await db.collection('assessments')
    .find<Assessment>({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  
  return assessments.map(assessment => ({
    ...assessment,
    _id: (assessment._id as ObjectId).toString()
  }));
}

export async function getAssessmentById(id: string, userId: string): Promise<Assessment | null> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'career-assessment');
  
  const assessment = await db.collection('assessments').findOne<Assessment>({
    _id: new ObjectId(id),
    userId
  });
  
  if (!assessment) return null;
  
  return {
    ...assessment,
    _id: (assessment._id as ObjectId).toString()
  };
}