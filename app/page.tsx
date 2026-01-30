'use client';

import { useState } from 'react';
import { SwapInterface } from '@/components/swap/SwapInterface';
import { TabNavigation } from '@/components/navigation/TabNavigation';
import { WalletConnector } from '@/components/wallet/WalletConnector';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'swap' | 'twap' | 'limit' | 'chart'>('swap');

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        {/* Medium gradient orb - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
        
        {/* Small accent orb - center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧙</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white hidden sm:block">
                Merlin Swap
              </h1>
            </div>

            {/* Wallet Connector */}
            <WalletConnector />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md space-y-6">
            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Swap Interface */}
            {activeTab === 'swap' && <SwapInterface />}
            
            {/* Placeholder for other tabs */}
            {activeTab === 'twap' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <p className="text-white/60">TWAP coming soon...</p>
              </div>
            )}
            {activeTab === 'limit' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <p className="text-white/60">Limit orders coming soon...</p>
              </div>
            )}
            {activeTab === 'chart' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <p className="text-white/60">Charts coming soon...</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full p-4 sm:p-6">
          <div className="max-w-7xl mx-auto text-center text-white/40 text-sm">
            <p>Merlin Swap - A magical token swap experience ✨</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
