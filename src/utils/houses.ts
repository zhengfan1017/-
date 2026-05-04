
export type House = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface HouseData {
  name: string;
  colors: [string, string];
  bgGradient: string;
  description: string;
  traits: string[];
  characters: string[];
  emoji: string;
  element: string;
}

export const HOUSES: Record<House, HouseData> = {
  gryffindor: {
    name: '格兰芬多',
    colors: ['#740001', '#eeba30'],
    bgGradient: 'from-red-950 via-red-900 to-amber-900',
    description: '勇气、胆量、果敢和骑士精神的代表。格兰芬多人面对困难从不退缩，他们像狮子一样勇敢无畏。',
    traits: ['勇敢', '无畏', '坚定', '热血', '有正义感'],
    characters: ['哈利·波特', '赫敏·格兰杰', '罗恩·韦斯莱', '阿不思·邓布利多'],
    emoji: '🦁',
    element: '火'
  },
  slytherin: {
    name: '斯莱特林',
    colors: ['#1a472a', '#2a623d'],
    bgGradient: 'from-emerald-950 via-emerald-900 to-green-900',
    description: '精明、野心勃勃、足智多谋且谨慎。斯莱特林人为了达到目的不择手段，他们像蛇一样冷静而致命。',
    traits: ['精明', '有野心', '足智多谋', '谨慎', '意志坚定'],
    characters: ['西弗勒斯·斯内普', '德拉科·马尔福', '汤姆·里德尔', '雷古勒斯·布莱克'],
    emoji: '🐍',
    element: '水'
  },
  ravenclaw: {
    name: '拉文克劳',
    colors: ['#0e1a40', '#5d5d5d'],
    bgGradient: 'from-indigo-950 via-indigo-900 to-slate-900',
    description: '智慧、学识、机智和创造力的象征。拉文克劳人追求知识，他们像鹰一样洞察一切。',
    traits: ['智慧', '好奇心', '创造力', '独特', '睿智'],
    characters: ['卢娜·洛夫古德', '秋·张', '西比尔·特里劳妮', '罗伊纳·拉文克劳'],
    emoji: '🦅',
    element: '风'
  },
  hufflepuff: {
    name: '赫奇帕奇',
    colors: ['#ecb939', '#60605c'],
    bgGradient: 'from-yellow-950 via-yellow-900 to-amber-900',
    description: '努力、耐心、公平、诚实和忠诚的代表。赫奇帕奇人坚忍不拔，他们像獾一样脚踏实地。',
    traits: ['忠诚', '诚实', '勤奋', '公正', '善良'],
    characters: ['塞德里克·迪戈里', '尼法朵拉·唐克斯', '纽特·斯卡曼德', '波莫娜·斯普劳特'],
    emoji: '🦡',
    element: '土'
  }
};
