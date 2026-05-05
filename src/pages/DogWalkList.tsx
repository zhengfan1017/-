
import { useDogWalkStore } from '../hooks/useDogWalkStore';
import { MapPin, Clock, Calendar, Dog, User, Plus, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Amap } from '../components/Amap';

export function DogWalkList() {
  const { dogWalks } = useDogWalkStore();

  return (
    &lt;div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50"&gt;
      &lt;div className="container mx-auto px-4 py-8"&gt;
        &lt;div className="flex justify-between items-center mb-8"&gt;
          &lt;div&gt;
            &lt;h1 className="text-3xl font-bold text-gray-800 mb-2"&gt;🐕 遛狗伙伴&lt;/h1&gt;
            &lt;p className="text-gray-600"&gt;找到附近的遛狗小伙伴一起玩耍&lt;/p&gt;
          &lt;/div&gt;
          &lt;Link
            to="/publish"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          &gt;
            &lt;Plus size={20} /&gt;
            发布遛狗
          &lt;/Link&gt;
        &lt;/div&gt;

        &lt;div className="mb-8"&gt;
          &lt;div className="bg-white rounded-2xl shadow-md p-4"&gt;
            &lt;div className="flex items-center gap-2 mb-4"&gt;
              &lt;Map size={20} className="text-blue-500" /&gt;
              &lt;h2 className="text-lg font-semibold text-gray-800"&gt;地图&lt;/h2&gt;
            &lt;/div&gt;
            &lt;Amap dogWalks={dogWalks} /&gt;
            &lt;p className="mt-2 text-sm text-gray-500 text-center"&gt;
              注：需要在 Amap.tsx 中替换 YOUR_AMAP_KEY 为你的高德地图 API Key
            &lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
          {dogWalks.map((walk) =&gt; (
            &lt;div
              key={walk.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
            &gt;
              &lt;div className="flex items-start gap-4 mb-4"&gt;
                {walk.avatar ? (
                  &lt;img
                    src={walk.avatar}
                    alt={walk.userName}
                    className="w-16 h-16 rounded-full object-cover"
                  /&gt;
                ) : (
                  &lt;div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center"&gt;
                    &lt;User size={32} className="text-white" /&gt;
                  &lt;/div&gt;
                )}
                &lt;div className="flex-1"&gt;
                  &lt;h3 className="text-xl font-bold text-gray-800"&gt;{walk.userName}&lt;/h3&gt;
                  &lt;div className="flex items-center gap-2 text-gray-600"&gt;
                    &lt;Dog size={16} /&gt;
                    &lt;span&gt;{walk.dogName} ({walk.dogType})&lt;/span&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;

              &lt;div className="space-y-3"&gt;
                &lt;div className="flex items-center gap-2 text-gray-700"&gt;
                  &lt;MapPin size={18} className="text-red-500" /&gt;
                  &lt;span&gt;{walk.location}&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center gap-2 text-gray-700"&gt;
                  &lt;Calendar size={18} className="text-blue-500" /&gt;
                  &lt;span&gt;{walk.date}&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center gap-2 text-gray-700"&gt;
                  &lt;Clock size={18} className="text-purple-500" /&gt;
                  &lt;span&gt;{walk.time}&lt;/span&gt;
                &lt;/div&gt;
                {walk.notes &amp;&amp; (
                  &lt;div className="mt-4 p-3 bg-gray-50 rounded-lg"&gt;
                    &lt;p className="text-gray-600 text-sm"&gt;{walk.notes}&lt;/p&gt;
                  &lt;/div&gt;
                )}
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;

        {dogWalks.length === 0 &amp;&amp; (
          &lt;div className="text-center py-16"&gt;
            &lt;Dog size={64} className="mx-auto text-gray-300 mb-4" /&gt;
            &lt;p className="text-gray-500 text-xl"&gt;暂无遛狗伙伴，快来发布吧！&lt;/p&gt;
          &lt;/div&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

