import React from 'react';
import { cn, isValidNumericInput, cleanNumericInput } from '@/lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  numeric?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, numeric = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      
      if (numeric) {
        // Validate and clean numeric input
        if (!isValidNumericInput(value)) {
          value = cleanNumericInput(value);
        }
      }
      
      if (onChange) {
        onChange(value);
      }
    };
    
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3',
          'text-white placeholder:text-white/40',
          'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
