'use client';

import React, { useState } from 'react';
import { useWalletContext } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export interface WalletConnectorProps {
  onConnect?: () => void;
}

// Format wallet address: "0x1234...5678"
function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const WalletConnector: React.FC<WalletConnectorProps> = ({ onConnect }) => {
  const { walletState, connect, disconnect } = useWalletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
      setIsModalOpen(false);
      onConnect?.();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsModalOpen(false);
  };

  if (walletState.isConnected && walletState.address) {
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          className="min-w-[44px] min-h-[44px]"
        >
          {formatWalletAddress(walletState.address)}
        </Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Account</h3>
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-sm text-white/60 mb-2">Connected Address</p>
              <p className="text-white font-mono text-sm break-all">
                {walletState.address}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleDisconnect}
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className="min-w-[44px] min-h-[44px]"
      >
        Connect Wallet
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Connect Wallet</h3>
          <p className="text-white/70 mb-6">
            Choose a wallet to connect to Merlin Swap
          </p>
          <div className="space-y-3">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="
                w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl
                border border-white/10 transition-all duration-200
                flex items-center gap-4
                disabled:opacity-50 disabled:cursor-not-allowed
                min-h-[44px]
              "
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                🦊
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-medium">MetaMask</p>
                <p className="text-white/60 text-sm">Connect using MetaMask</p>
              </div>
            </button>

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="
                w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl
                border border-white/10 transition-all duration-200
                flex items-center gap-4
                disabled:opacity-50 disabled:cursor-not-allowed
                min-h-[44px]
              "
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                🌈
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-medium">WalletConnect</p>
                <p className="text-white/60 text-sm">Scan with mobile wallet</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
