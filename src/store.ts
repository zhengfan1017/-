import { create } from 'zustand';
import { House, Option } from './utils/types';

interface AppState {
  currentQuestion: number;
  scores: Record<House, number>;
  selectedHouse: House | null;
  reset: () => void;
  answerQuestion: (option: Option) => void;
  calculateResult: () => House;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentQuestion: 0,
  scores: {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
  },
  selectedHouse: null,
  
  reset: () => set({
    currentQuestion: 0,
    scores: {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0
    },
    selectedHouse: null
  }),
  
  answerQuestion: (option) => {
    const state = get();
    const newScores = {
      gryffindor: state.scores.gryffindor + option.scores.gryffindor,
      slytherin: state.scores.slytherin + option.scores.slytherin,
      ravenclaw: state.scores.ravenclaw + option.scores.ravenclaw,
      hufflepuff: state.scores.hufflepuff + option.scores.hufflepuff
    };
    set({
      currentQuestion: state.currentQuestion + 1,
      scores: newScores
    });
  },
  
  calculateResult: () => {
    const state = get();
    const scores = state.scores;
    let maxScore = -1;
    let result: House = 'gryffindor';
    
    (Object.keys(scores) as House[]).forEach((house) => {
      if (scores[house] > maxScore) {
        maxScore = scores[house];
        result = house;
      }
    });
    
    set({ selectedHouse: result });
    return result;
  }
}));
