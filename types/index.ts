// Core type definitions for Merlin Swap

export interface Token {
  id: string;
  symbol: string;
  name: string;
  chain: string;
  icon: string;
  decimals: number;
  address?: string;
}

export interface SwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  isAutoSlippage: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}
