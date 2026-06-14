# Finance Dashboard - Project Context

Comprehensive dashboard for financial control using modern web technologies.

## Project Overview

*   **Framework:** [Quasar Framework](https://quasar.dev/) v2 (Vue 3 + TypeScript).
*   **Cookie Management:** [js-cookie](https://github.com/js-cookie/js-cookie) for secure authentication token storage.
*   **Styling:** [TailwindCSS](https://tailwindcss.com/) combined with Quasar's internal component library.
*   **State Management:** [Pinia](https://pinia.vuejs.org/) for centralized state.
*   **Internationalization:** [vue-i18n](https://vue-i18n.intlify.dev/) for multi-language support (en-US, pt-BR, pt-PT, es-ES).
*   **HTTP Client:** [Axios](https://axios-http.com/) for API communication.
*   **Architecture:** Modular design with a clear separation between components, services, and state management via composables.

## Building and Running

### Development
```bash
# Using Quasar CLI directly (preferred)
quasar dev

# Or via npm scripts
npm run dev
```

### Production Build
```bash
# Build for SPA (Single Page Application)
quasar build

# Or via npm scripts
npm run build
```

### Linting
```bash
npm run lint
```

## Architecture & Directory Structure

*   `src/boot/`: Initialization logic (e.g., Axios, i18n setup).
*   `src/i18n/`: Translation files for multiple languages.
*   `src/layouts/`: Common application layouts (e.g., `MainLayout.vue`, `SimpleLayout.vue`).
*   `src/components/`: Reusable Vue components.
    *   `ui/`: Base layout and shared UI elements (Header, Drawer, Dialog).
*   `src/composables/`: Reusable business logic using Vue's Composition API.
    *   `useWalletApi.ts`, `useTransactionApi.ts`, `useAuthApi.ts`: Domain-specific API composables.
    *   `useApi.ts`: Generic API handling composable.
*   `src/services/`: API client and domain-specific services (Transactions, Wallets, Auth).
*   `src/stores/`: Pinia stores. Note: Stores typically wrap composables to bridge local logic with global state.
*   `src/types/`: Centralized TypeScript interfaces and types.
*   `src/pages/`: Main application views (e.g., `DashboardPage.vue`).
*   `src/router/`: Routing configuration using layout-based nesting.

## Development Conventions

*   **Vue API:** Exclusively use the **Composition API** with `<script setup lang="ts">`.
*   **Typing:** Ensure all data structures are strictly typed using interfaces in `src/types/index.ts`.
*   **Styling:**
    *   Use Quasar components for complex UI elements (Layout, Dialogs, Selects).
    *   Use TailwindCSS for layout, spacing, and fine-grained styling adjustments.
*   **State:** Encapsulate complex logic in composables (`src/composables`) and expose them via Pinia stores if global access is needed.
*   **API Interaction:** Always use the service layer (`src/services`) instead of calling Axios directly in components.
*   **Formatting:** Follow Prettier and ESLint rules defined in the project root.

## Testing
*   *Note: No automated testing framework is currently configured in the root directory.* Implementation of Vitest or Cypress is a potential improvement area.
