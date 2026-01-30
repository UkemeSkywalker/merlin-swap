'use client';

import { useSwapContext } from '@/contexts/SwapContext';

/**
 * Custom hook for swap operations
 * Provides access to swap state and operations
 */
export function useSwap() {
  const context = useSwapContext();
  
  return {
    // State
    fromToken: context.swapState.fromToken,
    toToken: context.swapState.toToken,
    fromAmount: context.swapState.fromAmount,
    toAmount: context.swapState.toAmount,
    slippage: context.swapState.slippage,
    isAutoSlippage: context.swapState.isAutoSlippage,
    
    // Operations
    updateFromToken: context.updateFromToken,
    updateToToken: context.updateToToken,
    updateFromAmount: context.updateFromAmount,
    updateToAmount: context.updateToAmount,
    updateSlippage: context.updateSlippage,
    swapTokens: context.swapTokens,
    
    // Computed values
    getFromUsdValue: context.getFromUsdValue,
    getToUsdValue: context.getToUsdValue,
  };
}
