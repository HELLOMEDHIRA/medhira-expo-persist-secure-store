# createSecureStore

Creates a secure storage engine for redux-persist using Expo SecureStore.

## Import

```js
import { createSecureStore } from 'medhira-expo-persist-secure-store';
```

## Syntax

```js
const storage = createSecureStore(options);
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `replaceCharacter` | string | `_` | Character to replace invalid key characters |
| `replacer` | function | see below | Custom function to transform keys |
| `...expoOptions` | object | `{}` | Additional options passed to Expo SecureStore |

## Returns

Returns a storage engine object with the following methods:

### `getItem(key: string): Promise<string | null>`

Retrieves a value from secure storage.

```js
const value = await storage.getItem('authToken');
```

### `setItem(key: string, value: string): Promise<void>`

Stores a value in secure storage.

```js
await storage.setItem('authToken', 'your-token-value');
```

### `removeItem(key: string): Promise<void>`

Removes a value from secure storage.

```js
await storage.removeItem('authToken');
```

## Default Replacer

The default replacer function replaces any character that is not alphanumeric, a dot, hyphen, or underscore:

```js
function defaultReplacer(key, replaceCharacter) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
```

## Custom Replacer

You can provide your own replacer function:

```js
const storage = createSecureStore({
  replaceCharacter: '-',
  replacer: (key, replaceCharacter) => {
    return key.toLowerCase().replace(/\s+/g, replaceCharacter);
  }
});
```

## Expo Options

Additional options are passed to Expo SecureStore:

```js
const storage = createSecureStore({
  keychainService: 'my-app-secure-storage',
  accessibility: SecureStore.WHEN_UNLOCKED
});
```

See [Expo SecureStore Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/) for available options.

## TypeScript

The package includes TypeScript definitions:

```ts
import { createSecureStore } from 'medhira-expo-persist-secure-store';

interface SecureStoreOptions {
  replaceCharacter?: string;
  replacer?: (key: string, replaceCharacter: string) => string;
}

const storage = createSecureStore<SecureStoreOptions>();
```

## Next Section

- [Global Storage](../usage/global-storage.md)