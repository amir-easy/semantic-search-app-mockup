import React from 'react';
import { Cpu, TrendingUp } from 'lucide-react';

const ModelInfo: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Cpu className="w-4 h-4" />
        <span>מופעל על ידי GPT-4 Turbo + מודל סמנטי מותאם לעברית v2.1</span>
      </div>
      <div className="text-xs text-gray-500">
        עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
      </div>
    </div>
  );
};

export default ModelInfo;