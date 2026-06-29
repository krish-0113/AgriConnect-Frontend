import React from 'react';



export default function PrimaryButton({
  children,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center py-2.5 px-4 font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  
  const variants = {
    primary: 'bg-primary hover:bg-opacity-90 text-white focus:ring-primary',
    secondary: 'bg-secondary hover:bg-opacity-90 text-white focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const opacityStyles = (disabled || loading) ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${opacityStyles} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
