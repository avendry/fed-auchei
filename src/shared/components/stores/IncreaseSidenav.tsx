import { create } from 'zustand';

type IncreaseSideNav = {
    sideNav: boolean;
    increaseSideNav: () => void
}



const useIncreaseSideNav = create<IncreaseSideNav>((set) => {
    return {
        sideNav: true,
        increaseSideNav: () => set((state: IncreaseSideNav) => ({ sideNav: !state.sideNav }))
    }
});


export { useIncreaseSideNav }