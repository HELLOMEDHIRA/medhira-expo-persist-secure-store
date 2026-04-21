export default function createSecureStorage(options?: any): {
    getItem: (key: any) => Promise<string | null>;
    setItem: (key: any, value: any) => Promise<void>;
    removeItem: (key: any) => Promise<void>;
};
//# sourceMappingURL=index.d.ts.map