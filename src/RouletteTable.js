import { useContext } from "react";
import { GameContext } from "./GameContext";
import { BET_OPTIONS } from "./bet-info";
import './App.css'

// Play sound function
const playClickSound = () => {
  const audio = new Audio('/short-break-wood.mp3');
  audio.play();
};

const DEFAULT_WIDTH = '64px'
const DEFAULT_HEIGHT = '79px'
export function BetSelection({betOption}) {
    const {selectedBet, setSelectedBet} = useContext(GameContext);
    const left = BET_OPTIONS[betOption].left ? BET_OPTIONS[betOption].left : '0px' ;
    const bottom = BET_OPTIONS[betOption].bottom ? BET_OPTIONS[betOption].bottom : '0px';
    const width = BET_OPTIONS[betOption].width ? BET_OPTIONS[betOption].width : DEFAULT_WIDTH;
    const height = BET_OPTIONS[betOption].height ? BET_OPTIONS[betOption].height : DEFAULT_HEIGHT;

    return (
        <div className="Bet-Selection-Square"
          onClick={() => {
            playClickSound();
            setSelectedBet((selectedBet) => selectedBet !== betOption ? betOption: "")
          }}
          style={{
            position: 'absolute',
            width: width,
            height: height,
            left: left,
            bottom: bottom,
            background: selectedBet === betOption? 'rgba(148, 80, 80, 0.42)': undefined,
          }}
        />
    );
}
