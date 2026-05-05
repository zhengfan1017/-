
import { create } from 'zustand';
import { DogWalk } from '../types/dogWalk';

interface DogWalkStore {
  dogWalks: DogWalk[];
  addDogWalk: (dogWalk: Omit&lt;DogWalk, 'id'&gt;) =&gt; void;
  removeDogWalk: (id: string) =&gt; void;
}

const mockData: DogWalk[] = [
  {
    id: '1',
    userName: '小明',
    dogName: '旺财',
    dogType: '金毛',
    location: '朝阳公园南门',
    latitude: 39.9342,
    longitude: 116.4778,
    date: '2026-05-05',
    time: '15:00',
    notes: '一起散步，狗狗很友善',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming'
  },
  {
    id: '2',
    userName: '小红',
    dogName: '豆豆',
    dogType: '柯基',
    location: '奥林匹克森林公园',
    latitude: 40.0034,
    longitude: 116.3965,
    date: '2026-05-05',
    time: '16:30',
    notes: '想找个伴一起跑',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong'
  },
  {
    id: '3',
    userName: '小刚',
    dogName: '球球',
    dogType: '拉布拉多',
    location: '玉渊潭公园',
    latitude: 39.9167,
    longitude: 116.3039,
    date: '2026-05-06',
    time: '09:00',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaogang'
  }
];

export const useDogWalkStore = create&lt;DogWalkStore&gt;((set) =&gt; ({
  dogWalks: mockData,
  addDogWalk: (dogWalk) =&gt; set((state) =&gt; ({
    dogWalks: [...state.dogWalks, { ...dogWalk, id: Date.now().toString() }]
  })),
  removeDogWalk: (id) =&gt; set((state) =&gt; ({
    dogWalks: state.dogWalks.filter((walk) =&gt; walk.id !== id)
  }))
}));

