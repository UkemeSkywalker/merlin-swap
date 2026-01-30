# Implementation Tasks: Merlin Swap

## Task List

- [] 1: Project Setup and Configuration
**Status:** Not Started

**Description:**
Initialize the Next.js 15 project with TypeScript, configure Tailwind CSS, and set up the project structure with all necessary directories and configuration files.

**Acceptance Criteria:**
- Next.js 15 project initialized with TypeScript
- Tailwind CSS configured with custom purple gradient theme
- Project directory structure created (components/, contexts/, hooks/, lib/, types/)
- Basic layout.tsx and page.tsx files created
- Development server runs without errors

**Implementation Notes:**
- Use `npx create-next-app@latest` with TypeScript and Tailwind options
- Configure Tailwind with custom colors in tailwind.config.ts
- Add CSS variables for theme colors in globals.css
- Install required dependencies: lucide-react for icons

**Preview After Completion:**
Run `npm run dev` and visit http://localhost:3000 to see the basic Next.js app with purple gradient background

---

- [x] 2: Core UI Components and Mock Data
**Status:** Not Started

**Description:**
Create reusable UI components (Button, Input, Modal) and implement mock data for tokens and USD prices. Set up TypeScript types and utility functions.

**Acceptance Criteria:**
- Button, Input, and Modal components created in components/ui/
- Token and SwapState TypeScript interfaces defined in types/index.ts
- Mock token data (BNB, CAKE, USDT, ETH) created in lib/tokens.ts
- Mock USD price conversion map implemented
- Utility functions for formatting (wallet address, numbers) created in lib/utils.ts

**Implementation Notes:**
- Button component should support variants (primary, secondary)
- Input component should handle numeric validation
- Modal component should support backdrop click to close
- Include token icons (can use placeholder SVGs or emoji initially)

**Preview After Completion:**
Run `npm run dev` - you'll see the UI components are ready but not yet integrated into the main page

---

- [x] 3: State Management and Context Providers
**Status:** Not Started

**Description:**
Implement React Context providers for swap state and wallet connection state. Create custom hooks for accessing and managing state.

**Acceptance Criteria:**
- SwapContext created with state management for tokens, amounts, and slippage
- WalletContext created with mock wallet connection logic
- useSwap hook implemented for swap operations
- useTokens hook implemented for token data access
- Context providers wrapped in layout.tsx
- State persists wallet connection to localStorage

**Implementation Notes:**
- SwapContext should handle token swapping (swap from/to tokens)
- Mock wallet connection should generate a random address
- Implement basic amount calculation (1:1 ratio for simplicity)
- USD value calculation based on mock prices

**Preview After Completion:**
Run `npm run dev` - state management is in place but UI still shows basic page (contexts work behind the scenes)

---

- [x] 4: Swap Interface Components
**Status:** Not Started

**Description:**
Build the main swap interface including TokenInput, TokenSelector, SlippageControl, and SwapInterface container components.

**Acceptance Criteria:**
- SwapInterface component renders complete swap UI
- TokenInput component displays token selector and amount input with USD value
- TokenSelector modal displays searchable token list with icons and chain names
- SlippageControl component shows current slippage and allows modification
- Swap direction arrow button swaps from/to tokens
- Token display format follows "[SYMBOL] - [CHAIN]" pattern
- Real-time amount updates when user types

**Implementation Notes:**
- TokenSelector should filter tokens by search query (case-insensitive)
- Prevent selecting same token for from/to (auto-swap if attempted)
- Slippage validation: 0.1% - 50% range
- Display "Auto: 0.50%" for automatic slippage mode

**Preview After Completion:**
Run `npm run dev` - you'll see the main swap interface with token inputs, selector modals, and slippage controls working!

---

- [x] 5: Navigation, Wallet Connection, and Final Polish
**Status:** Not Started

**Description:**
Implement tab navigation, wallet connector button, apply final styling with purple gradient theme and decorative background, and ensure responsive design.

**Acceptance Criteria:**
- TabNavigation component with Swap, TWAP, Limit, and chart icon tabs
- WalletConnector button displays "Connect Wallet" or shortened address
- Purple gradient background with decorative elements applied
- Responsive design works on mobile (320px+), tablet, and desktop
- All interactive elements have hover and active states
- Color contrast meets WCAG AA standards
- Page matches reference design aesthetic

**Implementation Notes:**
- Use Tailwind gradient utilities for background
- Implement glassmorphism effect on cards (backdrop-blur)
- Wallet address format: "0x1234...5678" (first 6 + last 4 chars)
- Tab navigation should highlight active tab (Swap by default)
- Add decorative elements using CSS or SVG shapes
- Test responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)

**Preview After Completion:**
Run `npm run dev` - you'll see the complete Merlin Swap interface matching the reference design with full functionality!

---

## Testing Tasks

### Property-Based Testing

**Framework:** @fast-check/jest

**Test Files to Create:**
- `__tests__/properties/token-display.test.ts` - Property 1: Token Display Format
- `__tests__/properties/token-search.test.ts` - Property 2: Token Search Filtering
- `__tests__/properties/wallet-format.test.ts` - Property 3: Wallet Address Formatting
- `__tests__/properties/slippage-validation.test.ts` - Property 4: Slippage Validation
- `__tests__/properties/tab-navigation.test.ts` - Property 5: Tab Navigation State
- `__tests__/properties/responsive-layout.test.ts` - Property 6: Responsive Layout Integrity
- `__tests__/properties/interactive-feedback.test.ts` - Property 7: Interactive Element Feedback
- `__tests__/properties/color-contrast.test.ts` - Property 8: Color Contrast Accessibility
- `__tests__/properties/amount-reactivity.test.ts` - Property 9: Amount Input Reactivity

**Unit Testing:**
- Component rendering tests for all major components
- State management tests for contexts
- Edge case tests (empty inputs, invalid values, disconnected wallet)
- Integration tests for SwapInterface component

**Testing Notes:**
- Each property test must run minimum 100 iterations
- Use tag format: `// Feature: merlin-swap, Property {number}: {description}`
- Install @fast-check/jest, @testing-library/react, @testing-library/jest-dom
- Configure Jest for Next.js 15 with TypeScript

---

## Notes

- All tasks are frontend-only with no backend or smart contract implementation
- Mock data is used throughout for tokens, prices, and wallet connections
- Focus on UI/UX matching the reference design aesthetic
- Ensure accessibility compliance (WCAG AA) for all interactive elements
- Property-based tests validate correctness properties from design document
