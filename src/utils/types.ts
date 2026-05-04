export type House = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface Option {
  text: string;
  scores: {
    [key in House]: number;
  };
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface HouseInfo {
  name: string;
  description: string;
  characters: string[];
  colors: {
    primary: string;
    secondary: string;
  };
  emoji: string;
}
