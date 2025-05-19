import { create } from "zustand";


interface TGlobalAttributeStore {
    contextData: Record<string,any>;
    setContextData: (data: any[]) => void;
}


const useGlobalAtributeStore = create<TGlobalAttributeStore>((set) => {
    return {
        contextData: {},
        setContextData: (data: Record<string,any>) => set((value) => ({ contextData: {...value.contextData, ...data} })),
    }
});


export { useGlobalAtributeStore }