'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WalletState } from '@/types';

interface WalletContextType {
  walletState: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WALLET_STORAGE_KEY = 'merlin_swap_wallet';

// Generate a random Ethereum-style address
function generateMockAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Initialize wallet state from localStorage immediately
  const [walletState, setWalletState] = useState<WalletState>(() => {
    if (typeof window === 'undefined') {
      return {
        isConnected: false,
        address: null,
        chainId: null,
      };
    }
    
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isConnected && parsed.address) {
          return parsed;
        }
      } catch (error) {
        console.error('Failed to parse stored wallet state:', error);
        localStorage.removeItem(WALLET_STORAGE_KEY);
      }
    }
    
    return {
      isConnected: false,
      address: null,
      chainId: null,
    };
  });

  // Persist wallet state to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (walletState.isConnected) {
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletState));
    } else {
      localStorage.removeItem(WALLET_STORAGE_KEY);
    }
  }, [walletState]);

  const connect = useCallback(async () => {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock wallet data
    const mockAddress = generateMockAddress();
    const mockChainId = 56; // BNB Chain
    
    setWalletState({
      isConnected: true,
      address: mockAddress,
      chainId: mockChainId,
    });
  }, []);

  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletState,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}
