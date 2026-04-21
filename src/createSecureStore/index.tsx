import * as SecureStore from 'expo-secure-store';
export default function createSecureStorage(options: any = {}) {
  const replaceCharacter = options.replaceCharacter || '_';
  const replacer = options.replacer || defaultReplacer;

  return {
    getItem: (key: any) =>
      SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
    setItem: (key: any, value: any) =>
      SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
    removeItem: (key: any) =>
      SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options),
  };
}

function defaultReplacer(key: any, replaceCharacter: any) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
