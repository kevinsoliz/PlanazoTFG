import React from 'react';

interface Props {
  notaMedia: number;
}

export default function MediaPlanBadge({ notaMedia }: Props) {
  return (
    <div className="bg-blue-50 border border-blue-200 px-2 py-1.5 rounded-xl flex flex-col items-center min-w-60px">
      <span className="text-[9px] font-black uppercase text-blue-600 leading-none mb-1">
        Media
      </span>
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-blue-800">
          {notaMedia ? notaMedia.toFixed(1) : "0.0"}
        </span>
        <span className="text-blue-500 text-xs">★</span>
      </div>
    </div>
  );
}