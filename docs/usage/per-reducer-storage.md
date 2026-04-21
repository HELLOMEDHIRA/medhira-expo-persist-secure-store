# Per-Reducer Storage

Use MEDHIRA Expo Persist Secure Store only for specific reducers while using AsyncStorage for others.

## When to Use Per-Reducer Storage

- Mixed sensitive and non-sensitive data
- Need to control which data gets encrypted
- Want to optimize storage size/performance

## Setup

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import settingsReducer from './reducers/settingsReducer';

// Secure storage for sensitive data
const secureStorage = createSecureStore();

// Non-secure storage for general data
const mainStorage = AsyncStorage;

// Persist config for secure reducer
const securePersistConfig = {
  key: 'auth',
  storage: secureStorage
};

// Persist config for regular reducer
const mainPersistConfig = {
  key: 'main',
  storage: mainStorage
};

// Persist individual reducers
const persistedAuthReducer = persistReducer(securePersistConfig, authReducer);
const persistedUserReducer = persistReducer(mainPersistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  user: persistedUserReducer,
  settings: settingsReducer // Not persisted
});

// Create store
export function configureStore() {
  const store = createStore(rootReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
```

## Example: Mixed Storage Configuration

```js
// store/index.js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import uiReducer from './reducers/ui';

// Secure storage for sensitive data
const secureStorage = createSecureStore({
  replaceCharacter: '_'
});

// Persist config - sensitive (encrypted)
const securePersistConfig = {
  key: 'secure',
  storage: secureStorage,
  whitelist: ['tokens', 'credentials']
};

// Persist config - non-sensitive (unencrypted)
const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage,
  whitelist: ['preferences', 'history']
};

// Wrap reducers with persist
const persistedAuthReducer = persistReducer(securePersistConfig, authReducer);
const persistedUserReducer = persistReducer(mainPersistConfig, userReducer);

// Combine all reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  user: persistedUserReducer,
  ui: uiReducer
});

// Create and export store
export const store = createStore(rootReducer);
export const persistor = persistStore(store);
```

## Storage Comparison

| Storage Type | Use Case | Encryption |
|-------------|----------|-------------|
| `createSecureStore()` | Auth tokens, credentials, sensitive data | Yes |
| `AsyncStorage()` | Preferences, history, caching | No |

## Best Practices

1. **Sensitive Data**: Auth tokens, API keys, user credentials
2. **Non-Sensitive**: UI preferences, cached data, history

## Next Section

- [License](../about/license.md)