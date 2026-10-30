import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  type?: 'button' | 'submit';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'BOOK YOUR DETAIL',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #14161C 0%, #2C3340 45%, #606C80 80%, #B8C5D6 100%)',
        boxShadow:
          '0px 4px 16px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(255, 255, 255, 0.4), inset 0px -2px 6px rgba(0, 0, 0, 0.5)',
        outline: '2px solid rgba(215, 226, 234, 0.9)',
        outlineOffset: '-3px',
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-all duration-200 hover:scale-105 active:scale-95 hover:brightness-110 cursor-pointer inline-flex items-center justify-center select-none whitespace-nowrap ${className}`}
    >
      {label}
    </button>
  );
};
