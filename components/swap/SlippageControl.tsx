'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export interface SlippageControlProps {
  slippage: number;
  isAuto: boolean;
  onSlippageChange: (slippage: number, isAuto: boolean) => void;
}

const PRESET_SLIPPAGES = [0.1, 0.5, 1.0];
const MIN_SLIPPAGE = 0.1;
const MAX_SLIPPAGE = 50;

export const SlippageControl: React.FC<SlippageControlProps> = ({
  slippage,
  isAuto,
  onSlippageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState(slippage.toString());
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePresetClick = (value: number) => {
    setCustomValue(value.toString());
    setValidationError(null);
    onSlippageChange(value, false);
  };

  const handleAutoClick = () => {
    setCustomValue('0.5');
    setValidationError(null);
    onSlippageChange(0.5, true);
  };

  const handleCustomChange = (value: string) => {
    setCustomValue(value);
    
    if (!value) {
      setValidationError(null);
      return;
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setValidationError('Please enter a valid number');
      return;
    }

    if (numValue < MIN_SLIPPAGE) {
      setValidationError(`Slippage too low (min ${MIN_SLIPPAGE}%), transaction may fail`);
    } else if (numValue > MAX_SLIPPAGE) {
      setValidationError(`Slippage too high (max ${MAX_SLIPPAGE}%), you may lose funds`);
    } else {
      setValidationError(null);
      onSlippageChange(numValue, false);
    }
  };

  const displayValue = isAuto ? `Auto: ${slippage}%` : `${slippage}%`;

  return (
    <>
      {/* Slippage Display Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/5 hover:bg-white/10
          border border-white/10
          transition-all duration-200
          text-sm text-white/80
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Slippage: {displayValue}</span>
      </button>

      {/* Slippage Settings Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Slippage Settings"
      >
        <div className="p-6 space-y-4">
          {/* Auto Button */}
          <button
            onClick={handleAutoClick}
            className={`
              w-full px-4 py-3 rounded-lg font-medium
              transition-all duration-200
              ${isAuto
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
              }
            `}
          >
            Auto: 0.50%
          </button>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {PRESET_SLIPPAGES.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`
                  px-4 py-3 rounded-lg font-medium
                  transition-all duration-200
                  ${!isAuto && slippage === preset
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }
                `}
              >
                {preset}%
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div>
            <label className="block text-sm text-white/60 mb-2">
              Custom Slippage (%)
            </label>
            <Input
              type="text"
              placeholder="0.50"
              value={customValue}
              onChange={handleCustomChange}
              numeric
            />
            {validationError && (
              <div className="mt-2 text-sm text-yellow-400">
                ⚠️ {validationError}
              </div>
            )}
          </div>

          {/* Info Text */}
          <div className="text-xs text-white/50 pt-2">
            Slippage tolerance is the maximum price change you&apos;re willing to accept.
            Higher slippage increases the chance of success but may result in worse rates.
          </div>
        </div>
      </Modal>
    </>
  );
};
