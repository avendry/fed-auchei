import { create } from 'zustand';

interface TableState {
    data: any[];
    setData: (newData: any[]) => void;
}

export const useTableStore = create<TableState>((set) => {
    return {
        data: [],
        setData: (newData: any[]) => set(() => ({ data: newData })),
    }
})