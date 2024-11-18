import React from 'react';
import { TrendingUp, ArrowUp, Clock } from 'lucide-react';

const trends = [
  {
    category: 'מסעדות',
    trend: 'ארוחות בוקר טבעוניות',
    increase: '+180%'
  },
  {
    category: 'קניות',
    trend: 'חנויות יד שנייה',
    increase: '+120%'
  },
  {
    category: 'בילויים',
    trend: 'סדנאות אפייה',
    increase: '+90%'
  },
  {
    category: 'אירועים',
    trend: 'הופעות במסעדות',
    increase: '+75%'
  }
];

const TrendsWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">טרנדים חמים החודש</h3>
      </div>
      
      <div className="space-y-4">
        {trends.map((item, index) => (
          <div key={index} className="bg-white/80 rounded-lg p-3 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">{item.category}</span>
                <p className="font-medium text-gray-800">{item.trend}</p>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{item.increase}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        <span>מבוסס על נתוני החודש האחרון</span>
      </div>
    </div>
  );
};

export default TrendsWidget;