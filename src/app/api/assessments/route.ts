import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { saveAssessment } from '@/lib/models/assessment';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// 使用 Zod 驗證請求數據
const AssessmentSchema = z.object({
  scores: z.object({
    workSatisfaction: z.number().min(0).max(100),
    stressLevel: z.number().min(0).max(100),
    teamRelationship: z.number().min(0).max(100),
    careerGrowth: z.number().min(0).max(100),
    compensation: z.number().min(0).max(100),
    workLifeBalance: z.number().min(0).max(100),
    cultureAlignment: z.number().min(0).max(100),
    overallScore: z.number().min(0).max(100),
  }),
  answers: z.record(z.union([z.string(), z.number(), z.boolean()])),
  date: z.string().transform(val => new Date(val)),
  recommendations: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // 驗證請求數據
    const validationResult = AssessmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid assessment data', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const assessmentData = validationResult.data;
    
    const result = await saveAssessment({
      ...assessmentData,
      userId: session.user.id
    });
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error saving assessment:', error);
    return NextResponse.json(
      { error: 'Error saving assessment' },
      { status: 500 }
    );
  }
}