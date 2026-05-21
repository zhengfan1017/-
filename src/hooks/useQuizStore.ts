import { create } from 'zustand';
import type { Question, QuizResult } from '@/types';

interface QuizStore {
  questions: Question[];
  currentQuestion: number;
  answers: Record<number, string>;
  isLoading: boolean;
  error: string | null;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionIndex: number, answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateScore: () => { score: number; results: QuizResult[] };
  isComplete: () => boolean;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  answers: {},
  isLoading: false,
  error: null,

  setQuestions: (questions) => set({ questions }),

  setAnswer: (questionIndex, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionIndex]: answer }
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, state.questions.length - 1)
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0)
    })),

  resetQuiz: () =>
    set(() => ({
      questions: [],
      currentQuestion: 0,
      answers: {},
      isLoading: false,
      error: null
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  calculateScore: () => {
    const { questions, answers } = get();
    let correct = 0;
    const results: QuizResult[] = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_answer;
      
      if (isCorrect) correct++;

      results.push({
        number: index + 1,
        question: question.question,
        your_answer: userAnswer || '未作答',
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        explanation: question.explanation
      });
    });

    return {
      score: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
      results
    };
  },

  isComplete: () => {
    const { questions, answers } = get();
    return Object.keys(answers).length === questions.length;
  }
}));
