import { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    text: '面对危险时，你会怎么做？',
    options: [
      {
        text: '冲上去面对',
        scores: { gryffindor: 10, slytherin: 3, ravenclaw: 2, hufflepuff: 4 }
      },
      {
        text: '寻找捷径解决',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 5, hufflepuff: 1 }
      },
      {
        text: '先想清楚再行动',
        scores: { gryffindor: 3, slytherin: 4, ravenclaw: 10, hufflepuff: 3 }
      },
      {
        text: '寻求他人帮助',
        scores: { gryffindor: 4, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 2,
    text: '你最看重什么？',
    options: [
      {
        text: '勇气',
        scores: { gryffindor: 10, slytherin: 3, ravenclaw: 2, hufflepuff: 3 }
      },
      {
        text: '野心',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 3, hufflepuff: 1 }
      },
      {
        text: '智慧',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '忠诚',
        scores: { gryffindor: 3, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 3,
    text: '深夜听到异响，你会？',
    options: [
      {
        text: '出去探查',
        scores: { gryffindor: 10, slytherin: 4, ravenclaw: 3, hufflepuff: 2 }
      },
      {
        text: '躲起来',
        scores: { gryffindor: 1, slytherin: 5, ravenclaw: 2, hufflepuff: 3 }
      },
      {
        text: '分析声音来源',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '叫醒同伴一起',
        scores: { gryffindor: 4, slytherin: 2, ravenclaw: 3, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 4,
    text: '你更喜欢哪门课程？',
    options: [
      {
        text: '黑魔法防御术',
        scores: { gryffindor: 10, slytherin: 5, ravenclaw: 3, hufflepuff: 2 }
      },
      {
        text: '魔药学',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 6, hufflepuff: 3 }
      },
      {
        text: '魔咒学',
        scores: { gryffindor: 3, slytherin: 4, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '草药学',
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 4, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 5,
    text: '朋友被欺负了，你会？',
    options: [
      {
        text: '直接上前帮忙',
        scores: { gryffindor: 10, slytherin: 3, ravenclaw: 2, hufflepuff: 6 }
      },
      {
        text: '伺机报复',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 1, hufflepuff: 1 }
      },
      {
        text: '想办法智取',
        scores: { gryffindor: 3, slytherin: 4, ravenclaw: 10, hufflepuff: 3 }
      },
      {
        text: '默默支持安慰',
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 3, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 6,
    text: '你是一个怎样的人？',
    options: [
      {
        text: '外向果敢',
        scores: { gryffindor: 10, slytherin: 5, ravenclaw: 2, hufflepuff: 3 }
      },
      {
        text: '自信强势',
        scores: { gryffindor: 4, slytherin: 10, ravenclaw: 3, hufflepuff: 1 }
      },
      {
        text: '内敛聪慧',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '温和可靠',
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 3, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 7,
    text: '你更喜欢哪种动物？',
    options: [
      {
        text: '狮子',
        scores: { gryffindor: 10, slytherin: 3, ravenclaw: 2, hufflepuff: 2 }
      },
      {
        text: '蛇',
        scores: { gryffindor: 1, slytherin: 10, ravenclaw: 3, hufflepuff: 1 }
      },
      {
        text: '鹰',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 1 }
      },
      {
        text: '獾',
        scores: { gryffindor: 1, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 8,
    text: '做决定时，你更依赖？',
    options: [
      {
        text: '直觉',
        scores: { gryffindor: 10, slytherin: 4, ravenclaw: 2, hufflepuff: 3 }
      },
      {
        text: '利益',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 3, hufflepuff: 1 }
      },
      {
        text: '逻辑',
        scores: { gryffindor: 2, slytherin: 4, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '情感',
        scores: { gryffindor: 3, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 9,
    text: '你最想拥有什么？',
    options: [
      {
        text: '无畏的勇气',
        scores: { gryffindor: 10, slytherin: 3, ravenclaw: 2, hufflepuff: 3 }
      },
      {
        text: '无上的权力',
        scores: { gryffindor: 1, slytherin: 10, ravenclaw: 2, hufflepuff: 1 }
      },
      {
        text: '无尽的知识',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '真挚的友谊',
        scores: { gryffindor: 3, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 10,
    text: '团队中，你通常是？',
    options: [
      {
        text: '领导者',
        scores: { gryffindor: 10, slytherin: 6, ravenclaw: 3, hufflepuff: 2 }
      },
      {
        text: '野心家',
        scores: { gryffindor: 2, slytherin: 10, ravenclaw: 2, hufflepuff: 1 }
      },
      {
        text: '智囊',
        scores: { gryffindor: 3, slytherin: 4, ravenclaw: 10, hufflepuff: 2 }
      },
      {
        text: '执行者',
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 3, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 11,
    text: '犯错后，你会？',
    options: [
      {
        text: '勇于承认',
        scores: { gryffindor: 10, slytherin: 2, ravenclaw: 3, hufflepuff: 5 }
      },
      {
        text: '设法掩饰',
        scores: { gryffindor: 1, slytherin: 10, ravenclaw: 2, hufflepuff: 1 }
      },
      {
        text: '深刻反思',
        scores: { gryffindor: 3, slytherin: 3, ravenclaw: 10, hufflepuff: 3 }
      },
      {
        text: '尽力弥补',
        scores: { gryffindor: 4, slytherin: 1, ravenclaw: 3, hufflepuff: 10 }
      }
    ]
  },
  {
    id: 12,
    text: '你理想中的霍格沃茨生活是？',
    options: [
      {
        text: '充满冒险',
        scores: { gryffindor: 10, slytherin: 4, ravenclaw: 3, hufflepuff: 2 }
      },
      {
        text: '赢得荣誉',
        scores: { gryffindor: 4, slytherin: 10, ravenclaw: 3, hufflepuff: 2 }
      },
      {
        text: '努力学习',
        scores: { gryffindor: 2, slytherin: 3, ravenclaw: 10, hufflepuff: 3 }
      },
      {
        text: '安稳快乐',
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 2, hufflepuff: 10 }
      }
    ]
  }
];
