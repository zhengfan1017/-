import React from 'react';
import { Camera } from '../components/Camera';
import { PolaroidPhoto } from '../components/PolaroidPhoto';
import { usePhotoStore } from '../store/usePhotoStore';
import { Trash2 } from 'lucide-react';

export default function Home() {
  const { photos, addPhoto, removePhoto, clearAllPhotos } = usePhotoStore();

  return (
    <div className="min-h-screen bg-[#F0F0F0] polka-dot-bg">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Camera */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center lg:sticky lg:top-0 lg:h-screen">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              📸 拍立得
            </h1>
            <Camera onCapture={addPhoto} />
          </div>
        </div>
        
        {/* Right side - Photo wall */}
        <div className="lg:w-1/2 p-8">
          {photos.length > 0 && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={clearAllPhotos}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>清除全部</span>
              </button>
            </div>
          )}
          
          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="text-6xl mb-4">🎞️</div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                还没有照片
              </h2>
              <p className="text-gray-500">
                点击相机的快门按钮开始拍摄吧！
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {photos.map((photo) => (
                <PolaroidPhoto
                  key={photo.id}
                  photo={photo}
                  onRemove={() => removePhoto(photo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}