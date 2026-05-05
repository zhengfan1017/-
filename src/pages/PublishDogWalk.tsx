
import { useState } from 'react';
import { useDogWalkStore } from '../hooks/useDogWalkStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export function PublishDogWalk() {
  const navigate = useNavigate();
  const { addDogWalk } = useDogWalkStore();
  const [formData, setFormData] = useState({
    userName: '',
    dogName: '',
    dogType: '',
    location: '',
    latitude: 39.9042,
    longitude: 116.4074,
    date: new Date().toISOString().split('T')[0],
    time: '15:00',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) =&gt; {
    e.preventDefault();
    addDogWalk({
      ...formData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.userName}`
    });
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent&lt;HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement&gt;) =&gt; {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    &lt;div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8"&gt;
      &lt;div className="container mx-auto px-4 max-w-2xl"&gt;
        &lt;button
          onClick={() =&gt; navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        &gt;
          &lt;ArrowLeft size={20} /&gt;
          返回
        &lt;/button&gt;

        &lt;div className="bg-white rounded-2xl shadow-lg p-8"&gt;
          &lt;h1 className="text-3xl font-bold text-gray-800 mb-2"&gt;🐕 发布遛狗&lt;/h1&gt;
          &lt;p className="text-gray-600 mb-8"&gt;分享你的遛狗计划，找到小伙伴&lt;/p&gt;

          &lt;form onSubmit={handleSubmit} className="space-y-6"&gt;
            &lt;div&gt;
              &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                你的昵称
              &lt;/label&gt;
              &lt;input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入你的昵称"
              /&gt;
            &lt;/div&gt;

            &lt;div className="grid grid-cols-2 gap-4"&gt;
              &lt;div&gt;
                &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                  狗狗名字
                &lt;/label&gt;
                &lt;input
                  type="text"
                  name="dogName"
                  value={formData.dogName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="狗狗名字"
                /&gt;
              &lt;/div&gt;

              &lt;div&gt;
                &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                  狗狗品种
                &lt;/label&gt;
                &lt;input
                  type="text"
                  name="dogType"
                  value={formData.dogType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例如：金毛、柯基"
                /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;div&gt;
              &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                遛狗地点
              &lt;/label&gt;
              &lt;input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如：朝阳公园南门"
              /&gt;
            &lt;/div&gt;

            &lt;div className="grid grid-cols-2 gap-4"&gt;
              &lt;div&gt;
                &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                  日期
                &lt;/label&gt;
                &lt;input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                /&gt;
              &lt;/div&gt;

              &lt;div&gt;
                &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                  时间
                &lt;/label&gt;
                &lt;input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                /&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            &lt;div&gt;
              &lt;label className="block text-sm font-semibold text-gray-700 mb-2"&gt;
                备注（可选）
              &lt;/label&gt;
              &lt;textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="说说你的遛狗计划..."
              /&gt;
            &lt;/div&gt;

            &lt;button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
            &gt;
              &lt;Save size={20} /&gt;
              发布遛狗信息
            &lt;/button&gt;
          &lt;/form&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

