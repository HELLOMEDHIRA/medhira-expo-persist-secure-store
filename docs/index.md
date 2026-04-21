---
title: MEDHIRA Expo Persist Secure Store
---

<p align="center">
  <img src="https://github.com/HELLOMEDHIRA/medhira/blob/main/assets/medhira-logo.png" alt="MEDHIRA Logo" width="150"/>
</p>

<p align="center">
  <strong>Engineering Intelligence Across Everything</strong>
</p>

---

A secure storage integration for redux-persist using Expo SecureStore.

!!! note
    This package requires **Expo SDK 52+** and works with **redux-persist**.

## Why MEDHIRA?

In mobile applications, sensitive data like authentication tokens, user credentials, and private information need to be stored securely. **MEDHIRA Expo Persist Secure Store** provides:

- **Encrypted Storage** - Uses device's secure enclave
- **Seamless Redux Persist Integration** - Drop-in storage engine
- **Cross-Platform** - Works on iOS and Android via Expo
- **Simple API** - Just replace your storage engine

## Key Features

- :material-shield-lock: **Encrypted Storage** - Device-level encryption
- :material-database: **Redux Persist Compatible** - Drop-in replacement
- :material-cellphone: **Cross-Platform** - iOS Keychain & Android EncryptedSharedPreferences
- :material-tune: **Customizable** - Configurable key transformation
- :material-language-typescript: **Full TypeScript Support**

## Quick Example

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
import { persistCombineReducers, persistStore } from 'redux-persist';

const storage = createSecureStore();

const config = {
  key: 'root',
  storage
};

const reducer = persistCombineReducers(config, reducers);
const store = createStore(reducer);
const persistor = persistStore(store);
```

## Sponsor & Support

To keep this library maintained and up-to-date, please consider sponsoring it on GitHub.

Or, if you're looking for private support or help in customizing the experience, reach out to us at **hello@medhira.io**

---

**MEDHIRA** - Engineering Intelligence Across Everything
