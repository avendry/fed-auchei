import { motion, AnimatePresence } from 'framer-motion';
import { Coins, HandCoins } from 'lucide-react';
import { CoinDisplayFunctions } from './CoinDisplayFunctions';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";

export const CoinDisplay = () => {
    const { change, coins } = CoinDisplayFunctions();

    return (
        <HoverCard
            openDelay={0}
        >
            <HoverCardTrigger asChild>
                <div className="relative flex items-center gap-2 text-yellow-200 font-semibold text-lg bg-primary_light/75 rounded-md p-2 cursor-pointer">
                    <Coins className="w-5 h-5" />
                    <span>{coins}</span>
                    <AnimatePresence>
                        {change !== null && (
                            <motion.span
                                key="coin-change"
                                initial={{ opacity: 0, y: change > 0 ? 10 : -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: change > 0 ? -10 : 10 }}
                                className={`absolute -bottom-5 right-0 text-sm font-bold ${change > 0 ? 'text-green-500' : 'text-red-500'
                                    }`}
                            >
                                {change > 0 ? `+${change}` : `${change}`}
                            </motion.span>
                        )}
                    </AnimatePresence>

                </div>
            </HoverCardTrigger>
            <HoverCardContent
                className='bg-white flex gap-2'
            >
                <HandCoins />
                <p>Clique aqui para poder adicionar saldo!</p>
            </HoverCardContent>
        </HoverCard>
    );
};
