import { create } from 'zustand';
import { DogWalk } from '../types/dogWalk';

interface DogWalkStore {
  dogWalks: DogWalk[];
  addDogWalk: (dogWalk: Omit<DogWalk, 'id'>) => void;
  removeDogWalk: (id: string) => void;
}

const mockData: DogWalk[] = [
  {
    id: '1',
    userName: '小明',
    dogName: '旺财',
    dogType: '金毛',
    location: '北陵公园东门',
    latitude: 41.82,
    longitude: 123.42,
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
    location: '辽宁省实验中学附近',
    latitude: 41.805,
    longitude: 123.435,
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
    location: '沈阳师范大学',
    latitude: 41.85,
    longitude: 123.44,
    date: '2026-05-06',
    time: '09:00',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaogang'
  }
];

export const useDogWalkStore = create<DogWalkStore>((set) => ({
  dogWalks: mockData,
  addDogWalk: (dogWalk) => set((state) => ({
    dogWalks: [...state.dogWalks, { ...dogWalk, id: Date.now().toString() }]
  })),
  removeDogWalk: (id) => set((state) => ({
    dogWalks: state.dogWalks.filter((walk) => walk.id !== id)
  }))
}));
