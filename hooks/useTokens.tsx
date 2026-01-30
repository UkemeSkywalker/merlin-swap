'use client';

import { useMemo } from 'react';
import { Token } from '@/types';
import { MOCK_TOKENS, MOCK_USD_PRICES } from '@/lib/tokens';

/**
 * Custom hook for token data access
 * Provides token list and utility functions
 */
export function useTokens() {
  const tokens = useMemo(() => MOCK_TOKENS, []);
  
  const getTokenById = (id: string): Token | undefined => {
    return tokens.find(token => token.id === id);
  };
  
  const getTokenPrice = (tokenId: string): number => {
    return MOCK_USD_PRICES[tokenId] || 0;
  };
  
  const searchTokens = (query: string): Token[] => {
    if (!query) return tokens;
    
    const lowerQuery = query.toLowerCase();
    return tokens.filter(token => 
      token.symbol.toLowerCase().includes(lowerQuery) ||
      token.name.toLowerCase().includes(lowerQuery)
    );
  };
  
  return {
    tokens,
    getTokenById,
    getTokenPrice,
    searchTokens,
  };
}
