'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Token, SwapState } from '@/types';
import { MOCK_USD_PRICES } from '@/lib/tokens';

interface SwapContextType {
  swapState: SwapState;
  updateFromToken: (token: Token) => void;
  updateToToken: (token: Token) => void;
  updateFromAmount: (amount: string) => void;
  updateToAmount: (amount: string) => void;
  updateSlippage: (slippage: number, isAuto: boolean) => void;
  swapTokens: () => void;
  getFromUsdValue: () => string;
  getToUsdValue: () => string;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export function SwapProvider({ children }: { children: React.ReactNode }) {
  const [swapState, setSwapState] = useState<SwapState>({
    fromToken: null,
    toToken: null,
    fromAmount: '',
    toAmount: '',
    slippage: 0.5,
    isAutoSlippage: true,
  });

  // Calculate exchange rate (mock 1:1 ratio adjusted by token prices)
  const calculateToAmount = useCallback((fromToken: Token | null, toToken: Token | null, fromAmount: string): string => {
    if (!fromToken || !toToken || !fromAmount || fromAmount === '0') return '';
    
    const fromPrice = MOCK_USD_PRICES[fromToken.id] || 0;
    const toPrice = MOCK_USD_PRICES[toToken.id] || 0;
    
    if (toPrice === 0) return '';
    
    const numAmount = parseFloat(fromAmount);
    if (isNaN(numAmount)) return '';
    
    // Calculate based on USD value
    const usdValue = numAmount * fromPrice;
    const toAmount = usdValue / toPrice;
    
    return toAmount.toFixed(6);
  }, []);

  const updateFromToken = useCallback((token: Token) => {
    setSwapState(prev => {
      // If selecting the same token as "to", swap them
      if (prev.toToken?.id === token.id) {
        return {
          ...prev,
          fromToken: token,
          toToken: prev.fromToken,
          fromAmount: prev.toAmount,
          toAmount: prev.fromAmount,
        };
      }
      
      const toAmount = calculateToAmount(token, prev.toToken, prev.fromAmount);
      return {
        ...prev,
        fromToken: token,
        toAmount,
      };
    });
  }, [calculateToAmount]);

  const updateToToken = useCallback((token: Token) => {
    setSwapState(prev => {
      // If selecting the same token as "from", swap them
      if (prev.fromToken?.id === token.id) {
        return {
          ...prev,
          toToken: token,
          fromToken: prev.toToken,
          fromAmount: prev.toAmount,
          toAmount: prev.fromAmount,
        };
      }
      
      const toAmount = calculateToAmount(prev.fromToken, token, prev.fromAmount);
      return {
        ...prev,
        toToken: token,
        toAmount,
      };
    });
  }, [calculateToAmount]);

  const updateFromAmount = useCallback((amount: string) => {
    setSwapState(prev => {
      const toAmount = calculateToAmount(prev.fromToken, prev.toToken, amount);
      return {
        ...prev,
        fromAmount: amount,
        toAmount,
      };
    });
  }, [calculateToAmount]);

  const updateToAmount = useCallback((amount: string) => {
    setSwapState(prev => ({
      ...prev,
      toAmount: amount,
    }));
  }, []);

  const updateSlippage = useCallback((slippage: number, isAuto: boolean) => {
    setSwapState(prev => ({
      ...prev,
      slippage,
      isAutoSlippage: isAuto,
    }));
  }, []);

  const swapTokens = useCallback(() => {
    setSwapState(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }));
  }, []);

  const getFromUsdValue = useCallback((): string => {
    if (!swapState.fromToken || !swapState.fromAmount) return '$0.00';
    
    const price = MOCK_USD_PRICES[swapState.fromToken.id] || 0;
    const numAmount = parseFloat(swapState.fromAmount) || 0;
    const usdValue = price * numAmount;
    
    if (usdValue === 0) return '$0.00';
    if (usdValue < 0.01) return '<$0.01';
    
    return `$${usdValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }, [swapState.fromToken, swapState.fromAmount]);

  const getToUsdValue = useCallback((): string => {
    if (!swapState.toToken || !swapState.toAmount) return '$0.00';
    
    const price = MOCK_USD_PRICES[swapState.toToken.id] || 0;
    const numAmount = parseFloat(swapState.toAmount) || 0;
    const usdValue = price * numAmount;
    
    if (usdValue === 0) return '$0.00';
    if (usdValue < 0.01) return '<$0.01';
    
    return `$${usdValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }, [swapState.toToken, swapState.toAmount]);

  return (
    <SwapContext.Provider
      value={{
        swapState,
        updateFromToken,
        updateToToken,
        updateFromAmount,
        updateToAmount,
        updateSlippage,
        swapTokens,
        getFromUsdValue,
        getToUsdValue,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwapContext() {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error('useSwapContext must be used within a SwapProvider');
  }
  return context;
}
