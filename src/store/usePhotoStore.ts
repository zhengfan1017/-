import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Photo {
  id: string;
  imageUrl: string;
  date: string;
  caption: string;
  rotation: number;
}

const samplePhotos: Photo[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    date: '2025/11/19',
    caption: 'MAY I MEET YOU',
    rotation: 2.3,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    date: '2025/11/18',
    caption: 'MAY I MEET YOU',
    rotation: -1.8,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    date: '2025/11/17',
    caption: 'MAY I MEET YOU',
    rotation: 3.5,
  },
];

interface PhotoStore {
  photos: Photo[];
  addPhoto: (imageUrl: string) => void;
  removePhoto: (id: string) => void;
  clearAllPhotos: () => void;
}

export const usePhotoStore = create<PhotoStore>()(
  persist(
    (set) => ({
      photos: samplePhotos,
      addPhoto: (imageUrl) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const rotation = (Math.random() - 0.5) * 10; // -5 to 5 degrees

        const newPhoto: Photo = {
          id: Date.now().toString(),
          imageUrl,
          date: dateStr,
          caption: 'MAY I MEET YOU',
          rotation,
        };

        set((state) => ({
          photos: [newPhoto, ...state.photos],
        }));
      },
      removePhoto: (id) => {
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id),
        }));
      },
      clearAllPhotos: () => {
        set({ photos: [] });
      },
    }),
    {
      name: 'polaroid-photos',
    }
  )
);
