import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Photo {
  id: string;
  imageUrl: string;
  date: string;
  caption: string;
  rotation: number;
}

interface PhotoStore {
  photos: Photo[];
  addPhoto: (imageUrl: string) => void;
  removePhoto: (id: string) => void;
  clearAllPhotos: () => void;
}

export const usePhotoStore = create<PhotoStore>()(
  persist(
    (set) => ({
      photos: [],
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
