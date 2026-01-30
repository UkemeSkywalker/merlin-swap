# Design Document: Merlin Swap

## Overview

Merlin Swap is a Next.js-based frontend application that provides a token swap interface inspired by PancakeSwap. The application is built using TypeScript for type safety and Tailwind CSS for styling. It focuses exclusively on the user interface layer, using mock data for token information and wallet interactions.

The application follows a component-based architecture with clear separation between UI components, state management, and data models. The design emphasizes responsive layouts, accessibility, and a modern purple gradient aesthetic.

## Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **State Management**: React Context API + hooks
- **Wallet Integration**: RainbowKit (UI only, mock connections acceptable)
- **Icons**: Lucide React or similar icon library

### Application Structure

```
merlin-swap/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main swap page
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── swap/
│   │   ├── SwapInterface.tsx      # Main swap container
│   │   ├── TokenInput.tsx         # Token amount input field
│   │   ├── TokenSelector.tsx      # Token selection dropdown
│   │   ├── SwapButton.tsx         # Swap direction arrow
│   │   └── SlippageControl.tsx    # Slippage settings
│   ├── wallet/
│   │   └── WalletConnector.tsx    # Wallet connection button
│   ├── navigation/
│   │   └── TabNavigation.tsx      # Tab navigation component
│   └── ui/
│       ├── Modal.tsx              # Reusable modal component
│       ├── Button.tsx             # Reusable button component
│       └── Input.tsx              # Reusable input component
├── contexts/
│   ├── SwapContext.tsx            # Swap state management
│   └── WalletContext.tsx          # Wallet connection state
├── hooks/
│   ├── useTokens.tsx              # Token data hook
│   └── useSwap.tsx                # Swap logic hook
├── types/
│   └── index.ts                   # TypeScript type definitions
└── lib/
    ├── tokens.ts                  # Mock token data
    └── utils.ts                   # Utility functions
```

## Components and Interfaces

### Core Components

#### SwapInterface Component

The main container component that orchestrates the swap functionality.

**Props:**
```typescript
interface SwapInterfaceProps {
  className?: string;
}
```

**Responsibilities:**
- Renders TokenInput components for "from" and "to" tokens
- Manages swap state (selected tokens, amounts)
- Displays swap direction arrow
- Renders SlippageControl component
- Renders WalletConnector or swap action button

#### TokenInput Component

Displays token selection and amount input.

**Props:**
```typescript
interface TokenInputProps {
  label: 'From' | 'To';
  selectedToken: Token | null;
  amount: string;
  usdValue: string;
  onTokenSelect: (token: Token) => void;
  onAmountChange: (amount: string) => void;
  disabled?: boolean;
}
```

**Responsibilities:**
- Renders token selector button
- Renders amount input field
- Displays USD equivalent value
- Validates numeric input

#### TokenSelector Component

Modal/dropdown for selecting tokens.

**Props:**
```typescript
interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken: Token | null;
  excludeToken?: Token | null;
}
```

**Responsibilities:**
- Displays list of available tokens
- Implements search/filter functionality
- Shows token icon, symbol, name, and chain
- Handles token selection

#### SlippageControl Component

Settings component for slippage tolerance.

**Props:**
```typescript
interface SlippageControlProps {
  slippage: number;
  isAuto: boolean;
  onSlippageChange: (slippage: number, isAuto: boolean) => void;
}
```

**Responsibilities:**
- Displays current slippage setting
- Provides UI for changing slippage (auto/manual)
- Validates slippage values (0.1% - 50%)

#### WalletConnector Component

Handles wallet connection UI.

**Props:**
```typescript
interface WalletConnectorProps {
  onConnect?: () => void;
}
```

**Responsibilities:**
- Displays "Connect Wallet" button when disconnected
- Shows shortened wallet address when connected
- Opens wallet selection modal
- Handles connection state

#### TabNavigation Component

Navigation tabs for different swap modes.

**Props:**
```typescript
interface TabNavigationProps {
  activeTab: 'swap' | 'twap' | 'limit' | 'chart';
  onTabChange: (tab: string) => void;
}
```

**Responsibilities:**
- Renders navigation tabs
- Highlights active tab
- Handles tab switching

## Data Models

### Token Model

```typescript
interface Token {
  id: string;
  symbol: string;
  name: string;
  chain: string;
  icon: string;
  decimals: number;
  address?: string;
}
```

**Example:**
```typescript
{
  id: 'bnb',
  symbol: 'BNB',
  name: 'BNB',
  chain: 'BNB Chain',
  icon: '/tokens/bnb.svg',
  decimals: 18,
  address: '0x...'
}
```

### Swap State Model

```typescript
interface SwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  isAutoSlippage: boolean;
}
```

### Wallet State Model

```typescript
interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}
```

## Mock Data

### Token List

The application will use a predefined list of popular tokens:

```typescript
const MOCK_TOKENS: Token[] = [
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    chain: 'BNB Chain',
    icon: '/tokens/bnb.svg',
    decimals: 18
  },
  {
    id: 'cake',
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    chain: 'BNB Chain',
    icon: '/tokens/cake.svg',
    decimals: 18
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    chain: 'BNB Chain',
    icon: '/tokens/usdt.svg',
    decimals: 6
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'Ethereum',
    icon: '/tokens/eth.svg',
    decimals: 18
  }
];
```

### USD Conversion

For mock USD values, use a simple conversion map:

```typescript
const MOCK_USD_PRICES: Record<string, number> = {
  'bnb': 300,
  'cake': 2.5,
  'usdt': 1,
  'eth': 2000
};
```

## Styling and Theme

### Color Palette

```css
/* Primary Colors */
--primary-purple: #7B3FE4;
--primary-purple-light: #9D5FFF;
--primary-purple-dark: #5A2DB0;

/* Background */
--bg-gradient-start: #1A0B2E;
--bg-gradient-end: #2D1B4E;

/* UI Elements */
--card-bg: rgba(255, 255, 255, 0.05);
--card-border: rgba(255, 255, 255, 0.1);
--input-bg: rgba(0, 0, 0, 0.2);
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.7);
```

### Responsive Breakpoints

```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

### Component Styling Guidelines

- Use Tailwind utility classes for styling
- Apply backdrop blur effects for glassmorphism
- Use rounded corners (rounded-xl, rounded-2xl)
- Apply subtle shadows and borders
- Implement smooth transitions for interactive elements
- Ensure minimum touch target size of 44x44px for mobile

## State Management

### SwapContext

Manages the swap interface state using React Context:

```typescript
interface SwapContextType {
  swapState: SwapState;
  updateFromToken: (token: Token) => void;
  updateToToken: (token: Token) => void;
  updateFromAmount: (amount: string) => void;
  updateToAmount: (amount: string) => void;
  updateSlippage: (slippage: number, isAuto: boolean) => void;
  swapTokens: () => void;
}
```

**Key behaviors:**
- When fromToken or toToken changes, recalculate amounts
- When fromAmount changes, calculate toAmount (mock 1:1 ratio for simplicity)
- When swapTokens is called, swap fromToken with toToken and amounts

### WalletContext

Manages wallet connection state:

```typescript
interface WalletContextType {
  walletState: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
}
```

**Key behaviors:**
- connect() simulates wallet connection (mock implementation)
- disconnect() clears wallet state
- Persists connection state to localStorage


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Token Display Format Consistency

*For any* token in the token selector list, the displayed text should follow the format "[TOKEN_SYMBOL] - [CHAIN_NAME]" and include the token icon, name, and blockchain network.

**Validates: Requirements 2.2, 2.3**

### Property 2: Token Search Filtering

*For any* search query string, the filtered token list should only include tokens whose symbol or name contains the search query (case-insensitive).

**Validates: Requirements 2.5**

### Property 3: Wallet Address Formatting

*For any* valid Ethereum-style wallet address (0x followed by 40 hexadecimal characters), the displayed format should show the first 6 characters, an ellipsis, and the last 4 characters (e.g., "0x1234...5678").

**Validates: Requirements 3.4**

### Property 4: Slippage Validation

*For any* custom slippage value entered by the user, the system should accept values between 0.1% and 50% (inclusive) and reject values outside this range with appropriate validation feedback.

**Validates: Requirements 4.5**

### Property 5: Tab Navigation State

*For any* tab selection in the navigation component, exactly one tab should be highlighted as active at any given time.

**Validates: Requirements 5.2**

### Property 6: Responsive Layout Integrity

*For any* viewport width between 320px and 2560px, all interactive elements should remain accessible and functional without overlapping or breaking out of their containers.

**Validates: Requirements 5.4, 5.5**

### Property 7: Interactive Element Feedback

*For any* interactive element (buttons, inputs, clickable areas), the element should have defined hover and active states with visual feedback (color change, scale, or opacity transition).

**Validates: Requirements 6.4**

### Property 8: Color Contrast Accessibility

*For any* text element displayed on a background, the color contrast ratio should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 6.5**

### Property 9: Amount Input Reactivity

*For any* valid numeric input in the token amount field, the displayed value and USD equivalent should update immediately without requiring form submission or additional user action.

**Validates: Requirements 1.4**

## Error Handling

### Input Validation

**Invalid Amount Input:**
- Non-numeric characters: Prevent entry or strip invalid characters
- Negative numbers: Reject and show validation message
- Excessive decimal places: Truncate to token's decimal precision
- Empty input: Treat as "0" for calculations

**Invalid Slippage:**
- Values < 0.1%: Show warning "Slippage too low, transaction may fail"
- Values > 50%: Show warning "Slippage too high, you may lose funds"
- Non-numeric input: Prevent entry or revert to previous valid value

### Wallet Connection Errors

**Connection Failures:**
- User rejection: Show message "Wallet connection cancelled"
- No wallet detected: Show message "No wallet found. Please install MetaMask or another Web3 wallet"
- Network mismatch: Show message "Please switch to [EXPECTED_NETWORK]"
- Timeout: Show message "Connection timeout. Please try again"

### Token Selection Errors

**Invalid Token Selection:**
- Same token for from/to: Automatically swap tokens when user selects the same token
- No token selected: Disable swap button until both tokens are selected
- Token not found in search: Show "No tokens found" message

### UI Error States

**Component Loading:**
- Show skeleton loaders while components initialize
- Display error boundary fallback if component crashes
- Provide retry mechanism for failed operations

**Network Issues:**
- Show offline indicator if network connection lost
- Queue actions and retry when connection restored
- Display appropriate error messages for failed requests

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, error conditions, and integration points
- **Property tests**: Verify universal properties across all inputs through randomization

This dual approach ensures that specific behaviors are validated while also testing general correctness across a wide range of inputs.

### Unit Testing Focus

Unit tests should focus on:
- Specific examples demonstrating correct behavior (e.g., rendering with specific tokens)
- Component integration points (e.g., SwapInterface coordinating TokenInput components)
- Edge cases (e.g., empty token list, disconnected wallet state)
- Error conditions (e.g., invalid slippage, connection failures)

Avoid writing excessive unit tests for scenarios that property tests will cover through randomization.

### Property-Based Testing

**Framework**: Use `@fast-check/jest` for TypeScript property-based testing

**Configuration**:
- Minimum 100 iterations per property test
- Each test must reference its design document property
- Tag format: `// Feature: merlin-swap, Property {number}: {property_text}`

**Property Test Implementation**:
- Property 1: Generate random tokens, verify display format
- Property 2: Generate random search queries and token lists, verify filtering
- Property 3: Generate random wallet addresses, verify formatting
- Property 4: Generate random slippage values, verify validation
- Property 5: Generate random tab selections, verify single active state
- Property 6: Generate random viewport widths, verify layout integrity
- Property 7: Generate random interactive elements, verify feedback states
- Property 8: Generate random text/background combinations, verify contrast ratios
- Property 9: Generate random numeric inputs, verify reactivity

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property Testing**: @fast-check/jest
- **Component Testing**: React Testing Library
- **Accessibility Testing**: jest-axe
- **Visual Regression**: Chromatic or Percy (optional)

### Test Coverage Goals

- Component coverage: 80%+ for all UI components
- Property coverage: 100% of defined correctness properties
- Edge case coverage: All error handling paths tested
- Accessibility coverage: All interactive elements tested with jest-axe
