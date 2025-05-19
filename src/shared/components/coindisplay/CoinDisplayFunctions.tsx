import { useEffect, useState } from "react";
import { useCoinStore } from "../stores/CoinStore";

export const CoinDisplayFunctions = () => {
    const { coins } = useCoinStore.getState();
    const [change, setChange] = useState<number | null>(null);
    const [previous, setPrevious] = useState(coins);

    useEffect(() => {
        if (coins !== previous) {
            setChange(coins - previous);
            setPrevious(coins);
            const timeout = setTimeout(() => setChange(null), 1500);
            return () => clearTimeout(timeout);
        }
    }, [coins]);


    return {
        change,
        previous,
        coins
    }
}