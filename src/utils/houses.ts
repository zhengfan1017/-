import { House, HouseInfo } from './types';

export const houseInfo: Record<House, HouseInfo> = {
  gryffindor: {
    name: '格兰芬多',
    description: '勇气、果敢、正义',
    characters: ['哈利·波特', '赫敏·格兰杰', '罗恩·韦斯莱'],
    colors: {
      primary: '#740001',
      secondary: '#eeba30'
    },
    emoji: '🦁'
  },
  slytherin: {
    name: '斯莱特林',
    description: '野心、智谋、血统',
    characters: ['德拉科·马尔福', '西弗勒斯·斯内普'],
    colors: {
      primary: '#1a472a',
      secondary: '#aaaaaa'
    },
    emoji: '🐍'
  },
  ravenclaw: {
    name: '拉文克劳',
    description: '智慧、博学、创意',
    characters: ['卢娜·洛夫古德', '秋·张'],
    colors: {
      primary: '#0e1a40',
      secondary: '#946b2d'
    },
    emoji: '🦅'
  },
  hufflepuff: {
    name: '赫奇帕奇',
    description: '忠诚、善良、勤劳',
    characters: ['纳威·隆巴顿', '塞德里克·迪戈里'],
    colors: {
      primary: '#ecb939',
      secondary: '#372e29'
    },
    emoji: '🦡'
  }
};
