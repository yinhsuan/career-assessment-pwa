import { create } from 'zustand';
import { Assessment, AssessmentScores } from '@/types/assessment';
import { persist, createJSONStorage } from 'zustand/middleware'

interface AssessmentState {
  currentAssessment: {
    answers: Record<string, any>;
    currentStep: number;
    totalSteps: number;
    scores: Partial<AssessmentScores>;
  };
  pastAssessments: Assessment[];
  isLoading: boolean;
  
  // Actions
  setAnswer: (questionId: string, answer: any) => void;
  setStep: (step: number) => void;
  resetAssessment: () => void;
  calculateScore: () => void;
  setPastAssessments: (assessments: Assessment[]) => void;
  setLoading: (isLoading: boolean) => void;
}

const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      currentAssessment: {
        answers: {},
        currentStep: 1,
        totalSteps: 14,
        scores: {}
      },
      pastAssessments: [],
      isLoading: false,
      
      setAnswer: (questionId, answer) => set(state => ({
        currentAssessment: {
          ...state.currentAssessment,
          answers: {
            ...state.currentAssessment.answers,
            [questionId]: answer
          }
        }
      })),
      
      setStep: (step) => set(state => ({
        currentAssessment: {
          ...state.currentAssessment,
          currentStep: step
        }
      })),
      
      resetAssessment: () => set({
        currentAssessment: {
          answers: {},
          currentStep: 1,
          totalSteps: 14,
          scores: {}
        }
      }),
      
      calculateScore: () => {
        // 實現評分計算邏輯
        const { answers } = get().currentAssessment;
        
        // 這裡是示例計算方式，實際應用需要基於評估問題設計專門的算法
        const workSatisfaction = calculateCategoryScore(answers, 'ws');
        const stressLevel = calculateCategoryScore(answers, 'sl');
        const teamRelationship = calculateCategoryScore(answers, 'tr');
        const careerGrowth = calculateCategoryScore(answers, 'cg');
        const compensation = calculateCategoryScore(answers, 'comp');
        const workLifeBalance = calculateCategoryScore(answers, 'wlb');
        const cultureAlignment = calculateCategoryScore(answers, 'ca');
        
        // 計算總體分數 (示例)
        const overallScore = Math.round(
          (workSatisfaction + (100 - stressLevel) + teamRelationship + 
           careerGrowth + compensation + workLifeBalance + cultureAlignment) / 7
        );
        
        set(state => ({
          currentAssessment: {
            ...state.currentAssessment,
            scores: {
              workSatisfaction,
              stressLevel,
              teamRelationship,
              careerGrowth,
              compensation,
              workLifeBalance,
              cultureAlignment,
              overallScore
            }
          }
        }));
      },
      
      setPastAssessments: (assessments) => set({ pastAssessments: assessments }),
      
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'assessment-storage',
      storage: createJSONStorage(() => sessionStorage), // 使用 sessionStorage
    }
  )
);

// 輔助函數：計算分類評分
function calculateCategoryScore(answers: Record<string, any>, prefix: string): number {
  const categoryAnswers = Object.entries(answers)
    .filter(([key]) => key.startsWith(prefix))
    .map(([_, value]) => typeof value === 'number' ? value : 0);
  
  if (categoryAnswers.length === 0) return 0;
  
  const sum = categoryAnswers.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / categoryAnswers.length) * 20); // 假設評分範圍是 1-5，轉換為 0-100
}

export default useAssessmentStore;