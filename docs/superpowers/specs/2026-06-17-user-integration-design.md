# Design Doc: User Integration with Dedicated Store

## Goal
Integrate the new `/api/user/me` endpoint to fetch user data on application load, display the user's name in the header, and utilize the user ID for financial operations (creating wallets and transactions).

## Proposed Changes

### 1. Type Definitions (`src/types/index.ts`)
Update the `User` interface to match the backend response:
```typescript
export interface User {
  id: string;
  name: string;
}
```

### 2. Service Layer (`src/services/authService.ts`)
Add a `getMe` method to fetch the current user's profile:
- Endpoint: `/user/me`
- Use the standard axios instance from `src/api/axios.ts`.

### 3. User Store (`src/stores/user.ts`)
Create a new Pinia store to manage user state:
- **State**: `user: User | null`
- **Actions**: `fetchUser()` - Calls `authService.getMe()` and updates the state.
- **Initialization**: Trigger `fetchUser()` when the app loads (e.g., in `App.vue` or `MainLayout.vue`).

### 4. Finance Store (`src/stores/finance.ts`)
Modify creation actions to automatically inject the `userId`:
- Update `addTransaction` and `addWallet` to fetch the current `userId` from `useUserStore`.
- This removes the responsibility from UI components.

### 5. UI Updates
- **`AppHeader.vue`**: Access `useUserStore` and display `user.name` next to the wallet icon or in a dedicated user section.
- **`TransactionFormModal.vue` & `WalletFormModal.vue`**: Remove manual `userId` logic and rely on the store's automatic injection.

## Data Flow
1. App initializes in `MainLayout.vue` or `App.vue`.
2. `useUserStore.fetchUser()` is called.
3. User data (ID and Name) is stored in Pinia.
4. `AppHeader` displays the name.
5. When a user creates a wallet/transaction, the `financeStore` retrieves the `userId` from the `userStore` and includes it in the API payload.

## Success Criteria
- User name is visible in the header.
- Creating a wallet or transaction successfully sends the correct `userId` to the backend.
- App handles cases where user data fails to load (e.g., redirect to login or show error).
