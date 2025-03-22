import React from 'react';
import useVisitorCount from '../hooks/useVisitorCount';
import { Eye } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const { count, loading, error } = useVisitorCount();

  return (
    <div className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-black/60 border border-primary/30 text-primary rounded-lg flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(14,231,183,0.2)]">
      <Eye className="w-4 h-4" />
      {loading ? (
        <span className="text-sm animate-pulse">Loading...</span>
      ) : error ? (
        <span className="text-sm text-red-400">Error</span>
      ) : (
        <span className="text-sm font-code">{count?.toLocaleString() || '0'} visits</span>
      )}
    </div>
  );
};

export default VisitorCounter;