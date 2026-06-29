import React from 'react';

  fullScreen?;
  size?;
  text?;
}

export default function Loader({ fullScreen = false, size = 'md', text }) {
  const sizes = {
    sm,
    md,
    lg,
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent border-solid border-gray-200 ${sizes[size]}`}
      />
      {text && <span className="text-sm font-semibold text-muted-foreground">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
}
