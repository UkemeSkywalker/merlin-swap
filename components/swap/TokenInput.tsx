'use client';

import React from 'react';
import { Token } from '@/types';
import { Input } from '@/components/ui/Input';

export interface TokenInputProps {
  label: 'From' | 'To';
  selectedToken: Token | null;
  amount: string;
  usdValue: string;
  onTokenSelect: () => void;
  onAmountChange: (amount: string) => void;
  disabled?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  label,
  selectedToken,
  amount,
  usdValue,
  onTokenSelect,
  onAmountChange,
  disabled = false,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
      {/* Label */}
      <div className="text-sm text-white/60 mb-3">{label}</div>

      {/* Token Selector and Amount Input */}
      <div className="flex items-center gap-3">
        {/* Token Selector Button */}
        <button
          onClick={onTokenSelect}
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-white/10 hover:bg-white/20
            border border-white/20
            transition-all duration-200
            active:scale-95
            min-w-[140px]
          "
        >
          {selectedToken ? (
            <>
              <span className="text-2xl">{selectedToken.icon}</span>
              <span className="font-medium text-white">{selectedToken.symbol}</span>
            </>
          ) : (
            <span className="text-white/60">Select token</span>
          )}
          <svg
            className="w-4 h-4 text-white/60 ml-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Amount Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={onAmountChange}
            disabled={disabled || !selectedToken}
            numeric
            className="text-right text-2xl font-medium bg-transparent border-none focus:ring-0 p-0"
          />
        </div>
      </div>

      {/* USD Value */}
      <div className="text-right text-sm text-white/60 mt-2">
        {usdValue}
      </div>
    </div>
  );
};
