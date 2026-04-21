# Installation

This guide will help you install MEDHIRA Expo Persist Secure Store.

## Requirements

- **React Native** 0.81+
- **Expo SDK** 52+
- **Node.js** 18+

## Install the Package

```bash
npm install medhira-expo-persist-secure-store
# or
yarn add medhira-expo-persist-secure-store
```

## Install Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install expo-secure-store redux-persist
# or
yarn add expo-secure-store redux-persist
```

If using Expo:

```bash
npx expo install expo-secure-store redux-persist
```

## Verify Installation

To verify the installation was successful:

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';

const storage = createSecureStore();

// Test the storage
storage.setItem('test', 'value').then(() => {
  storage.getItem('test').then(value => {
    console.log('Storage works:', value);
  });
});
```

## Next Steps

- [Quick Start](quick-start.md) - Get up and running
- [Global Storage](../usage/global-storage.md) - Use as default storage
- [Per-Reducer Storage](../usage/per-reducer-storage.md) - Use for specific reducers