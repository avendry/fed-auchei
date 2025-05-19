import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CoinStore = {
    coins: number;
    setCoins: (value: number) => void;
    addCoins: (amount: number) => void;
    removeCoins: (amount: number) => void;
};

export const useCoinStore = create(
    persist<CoinStore>(
        (set) => ({
            coins: 0,
            setCoins: (value) => set(() => ({ coins: value })),
            addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
            removeCoins: (amount) =>
                set((state) => ({ coins: Math.max(0, state.coins - amount) })),
        }),
        {
            name: 'coin-storage', // nome da chave no localStorage
        }
    )
);