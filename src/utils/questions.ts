
import { House } from './houses';

export interface Option {
  id: string;
  text: string;
  house: House;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '如果你要选择一种魔法植物，你会选择：',
    options: [
      { id: '1a', text: '火焰花', house: 'gryffindor' },
      { id: '1b', text: '吸血藤', house: 'slytherin' },
      { id: '1c', text: '月光草', house: 'ravenclaw' },
      { id: '1d', text: '治愈草', house: 'hufflepuff' }
    ]
  },
  {
    id: 2,
    text: '在一个危险的情况下，你的第一反应是：',
    options: [
      { id: '2a', text: '立即行动，保护他人', house: 'gryffindor' },
      { id: '2b', text: '先保护自己，再寻找机会', house: 'slytherin' },
      { id: '2c', text: '分析情况，寻找最佳方案', house: 'ravenclaw' },
      { id: '2d', text: '寻求大家合作解决', house: 'hufflepuff' }
    ]
  },
  {
    id: 3,
    text: '你最看重朋友的什么品质？',
    options: [
      { id: '3a', text: '勇气和正义感', house: 'gryffindor' },
      { id: '3b', text: '聪明和有野心', house: 'slytherin' },
      { id: '3c', text: '有趣和有创意', house: 'ravenclaw' },
      { id: '3d', text: '忠诚和可靠', house: 'hufflepuff' }
    ]
  },
  {
    id: 4,
    text: '你更喜欢哪种类型的课程？',
    options: [
      { id: '4a', text: '黑魔法防御术', house: 'gryffindor' },
      { id: '4b', text: '魔药学', house: 'slytherin' },
      { id: '4c', text: '占卜学', house: 'ravenclaw' },
      { id: '4d', text: '草药学', house: 'hufflepuff' }
    ]
  },
  {
    id: 5,
    text: '如果你有一个秘密，你会：',
    options: [
      { id: '5a', text: '为了正义揭露它', house: 'gryffindor' },
      { id: '5b', text: '利用它来达成目标', house: 'slytherin' },
      { id: '5c', text: '研究它来获取知识', house: 'ravenclaw' },
      { id: '5d', text: '永远保守秘密', house: 'hufflepuff' }
    ]
  },
  {
    id: 6,
    text: '在霍格沃茨，你最想去的地方是：',
    options: [
      { id: '6a', text: '魁地奇球场', house: 'gryffindor' },
      { id: '6b', text: '斯莱特林公共休息室', house: 'slytherin' },
      { id: '6c', text: '禁林深处', house: 'ravenclaw' },
      { id: '6d', text: '厨房', house: 'hufflepuff' }
    ]
  },
  {
    id: 7,
    text: '你希望自己在历史上被记住为：',
    options: [
      { id: '7a', text: '一个英雄', house: 'gryffindor' },
      { id: '7b', text: '一个伟大的领袖', house: 'slytherin' },
      { id: '7c', text: '一个智者', house: 'ravenclaw' },
      { id: '7d', text: '一个善良的人', house: 'hufflepuff' }
    ]
  },
  {
    id: 8,
    text: '面对挑战时，你相信：',
    options: [
      { id: '8a', text: '勇气可以战胜一切', house: 'gryffindor' },
      { id: '8b', text: '权力是关键', house: 'slytherin' },
      { id: '8c', text: '智慧是最强的武器', house: 'ravenclaw' },
      { id: '8d', text: '努力和耐心会有回报', house: 'hufflepuff' }
    ]
  },
  {
    id: 9,
    text: '你最害怕的是：',
    options: [
      { id: '9a', text: '被视为懦夫', house: 'gryffindor' },
      { id: '9b', text: '失败和平庸', house: 'slytherin' },
      { id: '9c', text: '愚昧和无知', house: 'ravenclaw' },
      { id: '9d', text: '孤独和被排斥', house: 'hufflepuff' }
    ]
  },
  {
    id: 10,
    text: '如果你可以拥有一种超能力，你想要：',
    options: [
      { id: '10a', text: '飞行', house: 'gryffindor' },
      { id: '10b', text: '读心术', house: 'slytherin' },
      { id: '10c', text: '预知未来', house: 'ravenclaw' },
      { id: '10d', text: '治愈能力', house: 'hufflepuff' }
    ]
  },
  {
    id: 11,
    text: '你觉得真正的力量来自于：',
    options: [
      { id: '11a', text: '内心的勇气', house: 'gryffindor' },
      { id: '11b', text: '野心和决心', house: 'slytherin' },
      { id: '11c', text: '知识和智慧', house: 'ravenclaw' },
      { id: '11d', text: '爱和友谊', house: 'hufflepuff' }
    ]
  },
  {
    id: 12,
    text: '分院帽在犹豫，让你自己选，你会选择：',
    options: [
      { id: '12a', text: '格兰芬多', house: 'gryffindor' },
      { id: '12b', text: '斯莱特林', house: 'slytherin' },
      { id: '12c', text: '拉文克劳', house: 'ravenclaw' },
      { id: '12d', text: '赫奇帕奇', house: 'hufflepuff' }
    ]
  }
];
