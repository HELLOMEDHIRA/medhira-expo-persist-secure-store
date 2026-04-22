<p align="center">
  <img src="https://raw.githubusercontent.com/HELLOMEDHIRA/medhira/main/assets/medhira-logo.png" alt="MEDHIRA Logo" width="200"/>
</p>

<p align="center">
  <strong>Engineering Intelligence Across Everything</strong>
</p>

---

# medhira-expo-persist-secure-store

A secure storage integration for redux-persist using Expo SecureStore.

This package provides a secure storage engine for redux-persist that uses Expo's SecureStore to encrypt and persist sensitive data securely on device.

## Why MEDHIRA?

In mobile applications, sensitive data like authentication tokens, user credentials, and private information need to be stored securely. **MEDHIRA Expo Persist Secure Store** provides:

- **Encrypted Storage** - Uses device's secure enclave
- **Seamless Redux Persist Integration** - Drop-in storage engine
- **Cross-Platform** - Works on iOS and Android via Expo
- **Simple API** - Just replace your storage engine

## Installation

```bash
npm install medhira-expo-persist-secure-store
# or
yarn add medhira-expo-persist-secure-store
```

### Peer Dependencies

```bash
npx expo install expo-secure-store redux-persist
# or
npm install expo-secure-store redux-persist
```

## Usage

### As Global Storage Engine

Use as a `redux-persist` global storage engine:

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';

import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import reducers from './reducers';

// Secure storage
const storage = createSecureStore();

const config = {
  key: 'root',
  storage
};

const reducer = persistCombineReducers(config, reducers);

function configureStore() {
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
}
```

### Per-Reducer Storage

Use as an engine for only a specific reducer:

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from 'redux-persist/lib/storage';

import { mainReducer, secureReducer } from './reducers';

// Secure storage
const secureStorage = createSecureStore();

const securePersistConfig = {
  key: 'secure',
  storage: secureStorage
};

// Non-secure (AsyncStorage) storage
const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage
};

// Combine them together
const rootReducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  secure: persistReducer(securePersistConfig, secureReducer)
});

function configureStore() {
  let store = createStore(rootReducer);
  let persistor = persistStore(store);

  return { persistor, store };
}
```

## API

### `createSecureStore(options)`

Creates a secure storage engine for redux-persist.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `replaceCharacter` | string | `_` | Character to replace invalid key characters |
| `replacer` | function | defaultReplacer | Custom function to transform keys |

#### Returns

An object with `getItem`, `setItem`, and `removeItem` methods compatible with redux-persist storage engines.

### Default Replacer

The default replacer function replaces any character that is not alphanumeric, a dot, hyphen, or underscore:

```js
function defaultReplacer(key, replaceCharacter) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
```

### Custom Replacer

You can provide your own replacer function:

```js
const storage = createSecureStore({
  replaceCharacter: '-',
  replacer: (key, replaceCharacter) => {
    // Custom key transformation
    return key.toLowerCase().replace(/\s+/g, replaceCharacter);
  }
});
```

## Security Notes

- Data is encrypted using the device's Secure Enclave
- On iOS, uses Keychain
- On Android, uses EncryptedSharedPreferences
- Not all data needs to be secure - use for sensitive data only

## License

MIT

---

## Sponsor & Support

To keep this library maintained and up-to-date, please consider sponsoring it on GitHub.

Or, if you're looking for private support or help in customizing the experience, reach out to us at **hello.medhira@gmail.com**

## About MEDHIRA

**MEDHIRA** - Engineering Intelligence Across Everything

- Website: [https://medhira.readthedocs.io/en/latest/](https://medhira.readthedocs.io/en/latest/)
- GitHub: [https://github.com/HELLOMEDHIRA](https://github.com/HELLOMEDHIRA)
- Email: hello.medhira@gmail.com

---

Made with passion by MEDHIRA