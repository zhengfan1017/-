import React from 'react';
import { X } from 'lucide-react';
import { Photo } from '../store/usePhotoStore';

interface PolaroidPhotoProps {
  photo: Photo;
  onRemove: () => void;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({ photo, onRemove }) => {
  return (
    <div
      className="group relative bg-white p-4 pb-16 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-grab active:cursor-grabbing"
      style={{
        transform: `rotate(${photo.rotation}deg)`,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600 z-10"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="bg-gray-100 aspect-square overflow-hidden">
        <img
          src={photo.imageUrl}
          alt="Polaroid"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="font-handwriting text-gray-700 text-lg">{photo.caption}</p>
        <p className="font-handwriting text-gray-500 text-sm mt-1">{photo.date}</p>
      </div>
    </div>
  );
};
