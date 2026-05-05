import { useDogWalkStore } from '../hooks/useDogWalkStore';
import { MapPin, Clock, Calendar, Dog, User, Plus, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Amap } from '../components/Amap';

export function DogWalkList() {
  const { dogWalks } = useDogWalkStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🐕 遛狗伙伴</h1>
            <p className="text-gray-600">找到附近的遛狗小伙伴一起玩耍</p>
          </div>
          <Link
            to="/publish"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            发布遛狗
          </Link>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-4">
              <Map size={20} className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">地图</h2>
            </div>
            <Amap dogWalks={dogWalks} />
            <p className="mt-2 text-sm text-gray-500 text-center">
              注：需要在 Amap.tsx 中替换 YOUR_AMAP_KEY 为你的高德地图 API Key
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogWalks.map((walk) => (
            <div
              key={walk.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
            >
              <div className="flex items-start gap-4 mb-4">
                {walk.avatar ? (
                  <img
                    src={walk.avatar}
                    alt={walk.userName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{walk.userName}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Dog size={16} />
                    <span>{walk.dogName} ({walk.dogType})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} className="text-red-500" />
                  <span>{walk.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-blue-500" />
                  <span>{walk.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={18} className="text-purple-500" />
                  <span>{walk.time}</span>
                </div>
                {walk.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">{walk.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {dogWalks.length === 0 && (
          <div className="text-center py-16">
            <Dog size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">暂无遛狗伙伴，快来发布吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
