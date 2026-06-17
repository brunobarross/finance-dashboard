# User Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the `/api/user/me` endpoint to fetch user data on load, display it in the header, and use it for finance operations.

**Architecture:** Use a dedicated Pinia store (`useUserStore`) for user data. Initialize data fetching in `MainLayout.vue`. Inject `userId` from `useUserStore` into `useFinanceStore` for wallet and transaction creation.

**Tech Stack:** Vue 3, Pinia, TypeScript, Quasar, Axios.

---

### Task 1: Update User Type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Update User interface**
Replace the existing `User` interface with the one from the design.

```typescript
// src/types/index.ts
export interface User {
  id: string;
  name: string;
}
```

- [ ] **Step 2: Commit**
```bash
git add src/types/index.ts
git commit -m "types: update User interface to match backend response"
```

---

### Task 2: Update Auth Service

**Files:**
- Modify: `src/services/authService.ts`

- [ ] **Step 1: Add getMe method**
Add the `getMe` method to `authService`.

```typescript
// src/services/authService.ts
import api from '../api/axios'; // Use the standard axios instance
import type { LoginRequest, LoginResponse, User } from '../types';

export const authService = {
  // ... existing login method ...
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/user/me');
    return response.data;
  },
};
```

- [ ] **Step 2: Commit**
```bash
git add src/services/authService.ts
git commit -m "feat: add getMe method to authService"
```

---

### Task 3: Create User Store

**Files:**
- Create: `src/stores/user.ts`

- [ ] **Step 1: Implement useUserStore**
Create the Pinia store to manage user state and fetching.

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import { authService } from '../services/authService';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const userId = computed(() => user.value?.id);
  const userName = computed(() => user.value?.name);

  const fetchUser = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      user.value = await authService.getMe();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user';
      console.error('Error fetching user:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    userId,
    userName,
    isLoading,
    error,
    fetchUser,
  };
});
```

- [ ] **Step 2: Commit**
```bash
git add src/stores/user.ts
git commit -m "feat: create useUserStore for managing user state"
```

---

### Task 4: Initialize User Fetching

**Files:**
- Modify: `src/layouts/MainLayout.vue`

- [ ] **Step 1: Add onMounted to fetch user**
Import `useUserStore` and call `fetchUser` on mount.

```vue
// src/layouts/MainLayout.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
// ... existing imports ...

const { fetchUser } = useUserStore();
const showTransactionModal = ref(false);
const drawer = ref(false);

onMounted(() => {
  fetchUser();
});
</script>
```

- [ ] **Step 2: Commit**
```bash
git add src/layouts/MainLayout.vue
git commit -m "feat: initialize user fetching in MainLayout"
```

---

### Task 5: Update AppHeader UI

**Files:**
- Modify: `src/components/ui/AppHeader.vue`

- [ ] **Step 1: Display user name**
Import `useUserStore` and display the user's name in the toolbar.

```vue
// src/components/ui/AppHeader.vue
<template>
  <!-- ... existing template ... -->
  <div class="flex items-center gap-1 sm:gap-2">
    <div v-if="userName" class="text-white text-sm font-medium mr-2 hidden sm:block">
      {{ userName }}
    </div>
    <!-- ... rest of toolbar ... -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/user';
// ... existing imports ...

const { userName } = storeToRefs(useUserStore());
// ... rest of script ...
</script>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/AppHeader.vue
git commit -m "feat: display user name in AppHeader"
```

---

### Task 6: Inject UserId in Finance Store

**Files:**
- Modify: `src/stores/finance.ts`

- [ ] **Step 1: Update creation actions**
Use `useUserStore` to get the current user ID and inject it into `addTransaction` and `addWallet`.

```typescript
// src/stores/finance.ts
import { useUserStore } from './user';
// ... existing imports ...

export const useFinanceStore = defineStore('finance', () => {
  const userStore = useUserStore();
  // ... existing state ...

  const {
    // ...
    addTransaction: originalAddTransaction,
    addWallet: originalAddWallet,
    // ...
  } = useFinance();

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!userStore.userId) throw new Error('User not authenticated');
    return originalAddTransaction({
      ...transaction,
      userId: userStore.userId,
    });
  };

  const addWallet = async (wallet: Omit<Wallet, 'id' | 'userId'>) => {
    if (!userStore.userId) throw new Error('User not authenticated');
    return originalAddWallet({
      ...wallet,
      userId: userStore.userId,
    });
  };

  // Ensure these are returned in the store object
  return {
    // ...
    addTransaction,
    addWallet,
    // ...
  };
});
```

- [ ] **Step 2: Commit**
```bash
git add src/stores/finance.ts
git commit -m "feat: inject userId from userStore in finance operations"
```

---

### Task 7: Cleanup UI Modals

**Files:**
- Modify: `src/components/TransactionFormModal.vue`
- Modify: `src/components/WalletFormModal.vue`

- [ ] **Step 1: Remove userId logic from TransactionFormModal**
Update `handleSubmit` to call `addTransaction` without `userId`.

- [ ] **Step 2: Remove userId logic from WalletFormModal**
Update `handleSubmit` to call `addWallet` without `userId`.

- [ ] **Step 3: Commit**
```bash
git add src/components/TransactionFormModal.vue src/components/WalletFormModal.vue
git commit -m "refactor: remove manual userId handling from UI modals"
```
