import { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';

export type ApiType = 'rest' | 'graphql';

interface ApiTypeContextType {
    apiType: ApiType;
    toggleApiType: () => void;
}

const ApiTypeContext = createContext<ApiTypeContextType | undefined>(undefined);

export const ApiTypeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [apiType, setApiType] = useState<ApiType>('rest');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedApiType = localStorage.getItem('preferredApiType') as ApiType;
            if (savedApiType && (savedApiType === 'rest' || savedApiType === 'graphql')) {
                setApiType(savedApiType);
            }
        }
    }, []);

    const toggleApiType = () => {
        const newApiType = apiType === 'rest' ? 'graphql' : 'rest';
        setApiType(newApiType);
        localStorage.setItem('preferredApiType', newApiType);
    };

    return (
        <ApiTypeContext.Provider value={{ apiType, toggleApiType }}>
            {children}
        </ApiTypeContext.Provider>
    );
};

export const useApiType = () => {
    const context = useContext(ApiTypeContext);
    if (!context) {
        throw new Error('useApiType must be used within an ApiTypeProvider');
    }
    return context;
};