import React, { FC } from 'react';

const GLoading: FC<{ isLoading: boolean; children: React.ReactNode }> = ({
  isLoading,
  children,
}) => {
  return (
    <div className='relative '>
      {isLoading && (
        <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 opacity-50 bg-gray-300'>
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default GLoading;
