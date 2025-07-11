import { useContext } from "react";
import { GameContext } from "./GameContext";


function BetSelection(betOption) {
    const {selectedBet, setSelectedBet} = useContext(GameContext);

    return (
        <div
          onClick={() => {
            playClickSound();
            setSelectedBet((selectedBet) => selectedBet !== "BLACK" ? "BLACK": "")
          }}
          style={{
            position: 'absolute',
            width: width,
            height: width,
            left: tableWidth/2,
            bottom: 99,
            color: 'white',
            background: selectedBet === "BLACK"? 'rgba(0, 183, 255, 0.5)': 'rgba(0, 0, 0, 0.5)',
          }}
        />
    );
}
