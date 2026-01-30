// Utility functions for Merlin Swap

// Format wallet address to shortened format (0x1234...5678)
export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Format number with commas and decimal places
export function formatNumber(value: string | number, decimals: number = 6): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0';
  if (num === 0) return '0';
  
  // For very small numbers, use scientific notation
  if (num < 0.000001 && num > 0) {
    return num.toExponential(2);
  }
  
  // For normal numbers, format with appropriate decimals
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

// Validate numeric input
export function isValidNumericInput(value: string): boolean {
  if (value === '') return true;
  if (value === '.') return true;
  
  const regex = /^\d*\.?\d*$/;
  return regex.test(value);
}

// Clean numeric input (remove invalid characters)
export function cleanNumericInput(value: string): string {
  // Allow only digits and one decimal point
  let cleaned = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  
  return cleaned;
}

// Truncate number to specified decimal places
export function truncateDecimals(value: string, decimals: number): string {
  if (!value || value === '') return '';
  
  const parts = value.split('.');
  if (parts.length === 1) return value;
  
  const truncated = parts[1].slice(0, decimals);
  return truncated ? `${parts[0]}.${truncated}` : parts[0];
}

// Combine class names (simple version of clsx/classnames)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
