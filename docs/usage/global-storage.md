# Global Storage

Use MEDHIRA Expo Persist Secure Store as your default storage engine for all reducers.

## When to Use Global Storage

- All your state contains sensitive data
- Simplicity is preferred over granular control
- You want everything encrypted by default

## Setup

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

// Create secure storage
const storage = createSecureStore();

// Configure persist
const config = {
  key: 'root',
  storage
};

// Combine reducers with persist
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

const persistedReducer = persistCombineReducers(config, rootReducer);

// Create store
export function configureStore() {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor };
}
```

## Example: Full App Setup

```js
// store/index.js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from './reducers/auth';
import settingsReducer from './reducers/settings';

// Secure storage
const storage = createSecureStore({
  replaceCharacter: '-' // Optional: customize key replacement
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Only persist auth, settings is non-sensitive
};

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer
});

// Persisted reducer
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

// Store enhancer for redux-persist
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

export default store;
```

```js
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';
import store, { persistor } from './store';
import MainScreen from './screens/MainScreen';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<View><ActivityIndicator /></View>}
        persistor={persistor}
      >
        <MainScreen />
      </PersistGate>
    </Provider>
  );
}

export default App;
```

## Next Section

- [Per-Reducer Storage](./per-reducer-storage.md)