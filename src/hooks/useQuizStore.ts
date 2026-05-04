
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { House } from '@/utils/houses';
import { QUESTIONS } from '@/utils/questions';

interface QuizState {
  answers: Record<number, House>;
  currentQuestion: number;
  setAnswer: (questionId: number, house: House) => void;
  setCurrentQuestion: (index: number) => void;
  resetQuiz: () => void;
  isComplete: () => boolean;
  calculateResults: () => Record<House, number>;
  getDominantHouse: () => House;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentQuestion: 0,

      setAnswer: (questionId: number, house: House) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: house }
        })),

      setCurrentQuestion: (index: number) =>
        set(() => ({ currentQuestion: index })),

      resetQuiz: () =>
        set(() => ({ answers: {}, currentQuestion: 0 })),

      isComplete: () => {
        const { answers } = get();
        return Object.keys(answers).length === QUESTIONS.length;
      },

      calculateResults: () => {
        const { answers } = get();
        const results: Record<House, number> = {
          gryffindor: 0,
          slytherin: 0,
          ravenclaw: 0,
          hufflepuff: 0
        };

        Object.values(answers).forEach((house) => {
          results[house] = (results[house] || 0) + 1;
        });

        const total = Object.values(results).reduce((sum, val) => sum + val, 0) || 1;
        const percentages: Record<House, number> = {
          gryffindor: Math.round((results.gryffindor / total) * 100),
          slytherin: Math.round((results.slytherin / total) * 100),
          ravenclaw: Math.round((results.ravenclaw / total) * 100),
          hufflepuff: Math.round((results.hufflepuff / total) * 100)
        };

        return percentages;
      },

      getDominantHouse: () => {
        const results = get().calculateResults();
        let dominant: House = 'gryffindor';
        let maxScore = 0;

        (Object.keys(results) as House[]).forEach((house) => {
          if (results[house] > maxScore) {
            maxScore = results[house];
            dominant = house;
          }
        });

        return dominant;
      }
    }),
    {
      name: 'hogwarts-quiz-storage'
    }
  )
);
