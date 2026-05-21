export interface Question {
  number: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: string;
  explanation: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestion: number;
  answers: Record<number, string>;
  score: number;
  isLoading: boolean;
  error: string | null;
}

export interface QuizResult {
  number: number;
  question: string;
  your_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
}
