// src/components/ui/skeleton.tsx
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={`bg-gray-700 animate-pulse rounded ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
