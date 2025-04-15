import { ObjectId } from 'mongodb';

export interface AssessmentScores {
  workSatisfaction: number;
  stressLevel: number;
  teamRelationship: number;
  careerGrowth: number;
  compensation: number;
  workLifeBalance: number;
  cultureAlignment: number;
  overallScore: number;
}

export interface AssessmentAnswers {
  [key: string]: number | string | boolean;
}

export interface Assessment {
  _id?: ObjectId | string;
  userId: string;
  date: Date;
  scores: AssessmentScores;
  answers: AssessmentAnswers;
  recommendations?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OfflineAssessment extends Omit<Assessment, '_id'> {
  localId?: number;
  status: 'pending' | 'synced';
  serverId?: string;
}