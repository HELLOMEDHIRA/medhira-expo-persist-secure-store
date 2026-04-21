# Quick Start

Get started with MEDHIRA Expo Persist Secure Store in 5 minutes.

## Basic Setup

Step 1: Import the secure store creator:

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
```

Step 2: Create the storage engine:

```js
const storage = createSecureStore();
```

Step 3: Use with redux-persist:

```js
import { persistCombineReducers, persistStore } from 'redux-persist';
import { createStore } from 'redux';

const config = {
  key: 'root',
  storage
};

const reducer = persistCombineReducers(config, yourReducers);
const store = createStore(reducer);
export const persistor = persistStore(store);
```

Step 4: Wrap your app:

```js
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <YourApp />
      </PersistGate>
    </Provider>
  );
}
```

## Complete Example

```js
// store.js
import { createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { createSecureStore } from 'medhira-expo-persist-secure-store';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

const storage = createSecureStore();

const config = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Only persist auth reducer securely
};

const rootReducer = persistCombineReducers(config, {
  auth: authReducer,
  user: userReducer
});

export function configureStore() {
  const store = createStore(rootReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
```

## Next Steps

- [API Reference](../api/createsecurestore.md) - Full API documentation
- [Global Storage](../usage/global-storage.md) - Use as default storage
- [Per-Reducer Storage](../usage/per-reducer-storage.md) - Use for specific reducers