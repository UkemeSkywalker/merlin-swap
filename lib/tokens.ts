import { Token } from '@/types';

// Mock token data for the application
export const MOCK_TOKENS: Token[] = [
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    chain: 'BNB Chain',
    icon: '🟡',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    id: 'cake',
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    chain: 'BNB Chain',
    icon: '🥞',
    decimals: 18,
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    chain: 'BNB Chain',
    icon: '💵',
    decimals: 6,
    address: '0x55d398326f99059fF775485246999027B3197955'
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'Ethereum',
    icon: '💎',
    decimals: 18,
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
  }
];

// Mock USD price conversion map
export const MOCK_USD_PRICES: Record<string, number> = {
  'bnb': 300,
  'cake': 2.5,
  'usdt': 1,
  'eth': 2000
};

// Get USD value for a token amount
export function getUsdValue(tokenId: string, amount: string): string {
  const price = MOCK_USD_PRICES[tokenId] || 0;
  const numAmount = parseFloat(amount) || 0;
  const usdValue = price * numAmount;
  
  if (usdValue === 0) return '$0.00';
  if (usdValue < 0.01) return '<$0.01';
  
  return `$${usdValue.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
}
