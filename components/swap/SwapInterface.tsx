'use client';

import React, { useState } from 'react';
import { TokenInput } from './TokenInput';
import { SlippageControl } from './SlippageControl';
import { useSwap } from '@/hooks/useSwap';
import { Button } from '@/components/ui/Button';
import { useWalletContext } from '@/contexts/WalletContext';
import { Token } from '@/types';
import { TokenSelector } from './TokenSelector';

export interface SwapInterfaceProps {
  className?: string;
}

type TokenSelectorMode = 'from' | 'to' | null;

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ className }) => {
  const [selectorMode, setSelectorMode] = useState<TokenSelectorMode>(null);
  
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippage,
    isAutoSlippage,
    updateFromToken,
    updateToToken,
    updateFromAmount,
    updateSlippage,
    swapTokens,
    getFromUsdValue,
    getToUsdValue,
  } = useSwap();

  const { walletState, connect } = useWalletContext();

  const handleTokenSelect = (token: Token) => {
    if (selectorMode === 'from') {
      updateFromToken(token);
    } else if (selectorMode === 'to') {
      updateToToken(token);
    }
    setSelectorMode(null);
  };

  const handleSwapClick = () => {
    if (!walletState.isConnected) {
      connect();
    } else {
      // In a real app, this would execute the swap transaction
      console.log('Executing swap:', { fromToken, toToken, fromAmount, toAmount, slippage });
      alert('Swap executed! (Mock implementation)');
    }
  };

  const isSwapDisabled = !fromToken || !toToken || !fromAmount || parseFloat(fromAmount) === 0;

  return (
    <div className={className}>
      {/* Card Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl max-w-md w-full">
        {/* Header with Slippage Control */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Swap</h2>
          <SlippageControl
            slippage={slippage}
            isAuto={isAutoSlippage}
            onSlippageChange={updateSlippage}
          />
        </div>

        {/* From Token Input */}
        <TokenInput
          label="From"
          selectedToken={fromToken}
          amount={fromAmount}
          usdValue={getFromUsdValue()}
          onTokenSelect={() => setSelectorMode('from')}
          onAmountChange={updateFromAmount}
        />

        {/* Swap Direction Arrow */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            onClick={swapTokens}
            disabled={!fromToken || !toToken}
            className="
              bg-gradient-to-br from-purple-600 to-purple-500
              hover:from-purple-700 hover:to-purple-600
              disabled:from-gray-600 disabled:to-gray-500
              disabled:cursor-not-allowed
              p-3 rounded-xl
              border-4 border-[var(--bg-gradient-start)]
              transition-all duration-200
              active:scale-90
              shadow-lg
            "
            aria-label="Swap tokens"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* To Token Input */}
        <TokenInput
          label="To"
          selectedToken={toToken}
          amount={toAmount}
          usdValue={getToUsdValue()}
          onTokenSelect={() => setSelectorMode('to')}
          onAmountChange={updateFromAmount}
          disabled={true}
        />

        {/* Swap Button */}
        <div className="mt-6">
          {!walletState.isConnected ? (
            <Button
              variant="primary"
              onClick={handleSwapClick}
              className="w-full text-lg py-4"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSwapClick}
              disabled={isSwapDisabled}
              className="w-full text-lg py-4"
            >
              {isSwapDisabled ? 'Enter an amount' : 'Swap'}
            </Button>
          )}
        </div>

        {/* Exchange Rate Info */}
        {fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0 && (
          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Rate</span>
              <span className="text-white">
                1 {fromToken.symbol} ≈ {toAmount && parseFloat(toAmount) > 0 
                  ? (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)
                  : '0'
                } {toToken.symbol}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Centralized Token Selector Modal */}
      <TokenSelector
        isOpen={selectorMode !== null}
        onClose={() => setSelectorMode(null)}
        onSelect={handleTokenSelect}
        selectedToken={selectorMode === 'from' ? fromToken : toToken}
        excludeToken={selectorMode === 'from' ? toToken : fromToken}
      />
    </div>
  );
};
