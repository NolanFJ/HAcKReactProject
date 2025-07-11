import React, {useState, createContext,} from 'react'
const STARTING_BALANCE = 1000;

export const GameContext = createContext();

export function GameContextProvider({children}) {
    const [balance, setBalance] = useState(STARTING_BALANCE);
    const [bets, setBets] = useState([]);
    const [pendingBet, setPendingBet] = useState(null);
    const [selectedBet, setSelectedBet] = useState("");

    return (
        <GameContext.Provider value={{balance, setBalance, bets, setBets, pendingBet, setPendingBet, selectedBet, setSelectedBet}}>
            {children}
        </GameContext.Provider>
    );
}
