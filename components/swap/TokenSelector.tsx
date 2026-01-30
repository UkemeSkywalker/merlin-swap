'use client';

import React, { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Token } from '@/types';
import { useTokens } from '@/hooks/useTokens';

export interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken: Token | null;
  excludeToken?: Token | null;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedToken,
  excludeToken,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchTokens } = useTokens();

  // Filter tokens based on search query
  const filteredTokens = useMemo(() => {
    return searchTokens(searchQuery);
  }, [searchQuery, searchTokens]);

  const handleSelectToken = (token: Token) => {
    onSelect(token);
    onClose();
    setSearchQuery(''); // Reset search on close
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select a token">
      <div className="p-6">
        {/* Search Input */}
        <Input
          placeholder="Search by name or symbol"
          value={searchQuery}
          onChange={setSearchQuery}
          className="mb-4"
        />

        {/* Token List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTokens.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No tokens found
            </div>
          ) : (
            filteredTokens.map((token) => {
              const isSelected = selectedToken?.id === token.id;
              const isExcluded = excludeToken?.id === token.id;

              return (
                <button
                  key={token.id}
                  onClick={() => handleSelectToken(token)}
                  disabled={isExcluded}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg
                    transition-all duration-200
                    ${isSelected 
                      ? 'bg-purple-600/30 border border-purple-500/50' 
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }
                    ${isExcluded 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer'
                    }
                  `}
                >
                  {/* Token Icon */}
                  <div className="text-2xl">{token.icon}</div>

                  {/* Token Info */}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">
                      {token.symbol} - {token.chain}
                    </div>
                    <div className="text-sm text-white/60">{token.name}</div>
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="text-purple-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};
