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
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-all duration-200 hover:scale-105 active:scale-95 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA] cursor-pointer inline-flex items-center justify-center select-none whitespace-nowrap ${className}`}
    >
      {label}
    </button>
  );
};
