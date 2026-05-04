import React, { useState, useRef } from 'react';
import { Camera as CameraIcon, Upload, X } from 'lucide-react';

interface CameraProps {
  onCapture: (imageUrl: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
      setShowOptions(false);
    } catch (error) {
      console.error('Error accessing camera:', error);
      const userChoice = window.confirm(
        '无法访问摄像头。请检查：\n1. 是否已授予摄像头权限\n2. 摄像头是否被其他应用占用\n\n是否尝试使用上传图片功能？'
      );
      if (userChoice) {
        fileInputRef.current?.click();
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureFromCamera = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/png');
        onCapture(imageUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onCapture(imageUrl);
        setShowOptions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {/* Camera UI */}
      <div className="bg-[#F5E6C8] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-gray-300 rounded-full shadow-inner"></div>
        <div className="absolute top-4 right-4 w-6 h-6 bg-red-400 rounded-full shadow-inner"></div>
        
        {/* Camera body */}
        <div className="relative">
          {/* Lens */}
          <div className="mx-auto w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"></div>
            <div className="absolute inset-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-30"></div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full opacity-20 blur-sm"></div>
            
            {/* Viewfinder */}
            {!showCamera && !showOptions && (
              <div className="relative z-10 w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">📷</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Camera preview */}
            {showCamera && (
              <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          {/* Flash */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-100 rounded-full border-4 border-gray-300 shadow-inner"></div>
          
          {/* Shutter button */}
          <div className="mt-8 flex justify-center">
            {!showCamera && !showOptions && (
              <button
                onClick={() => setShowOptions(true)}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-red-400 active:scale-95"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-400 rounded-full"></div>
                </div>
              </button>
            )}
            
            {showOptions && (
              <div className="flex gap-4">
                <button
                  onClick={startCamera}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <CameraIcon className="w-8 h-8 text-gray-700" />
                  <span className="text-sm text-gray-700">摄像头</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload className="w-8 h-8 text-gray-700" />
                  <span className="text-sm text-gray-700">上传</span>
                </button>
                <button
                  onClick={() => setShowOptions(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <X className="w-8 h-8 text-gray-700" />
                  <span className="text-sm text-gray-700">取消</span>
                </button>
              </div>
            )}
            
            {showCamera && (
              <div className="flex gap-4">
                <button
                  onClick={captureFromCamera}
                  className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-red-400 active:scale-95"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-red-400 rounded-full"></div>
                  </div>
                </button>
                <button
                  onClick={stopCamera}
                  className="w-16 h-16 bg-gray-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  <X className="w-8 h-8 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
