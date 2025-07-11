import { useContext } from "react";
import { GameContext } from "./GameContext";
import { BET_OPTIONS } from "./bet-info";


// Play sound function
const playClickSound = () => {
  const audio = new Audio('/short-break-wood.mp3');
  audio.play();
};

const DEFAULT_WIDTH = '50px'
const DEFAULT_HEIGHT = '50px'
export function BetSelection({betOption}) {
    console.log(betOption)
    console.log(BET_OPTIONS[betOption])
    const {selectedBet, setSelectedBet} = useContext(GameContext);
    const left = BET_OPTIONS[betOption].left ? BET_OPTIONS[betOption].left : '0px' ;
    const bottom = BET_OPTIONS[betOption].bottom ? BET_OPTIONS[betOption].bottom : '0px';
    const width = BET_OPTIONS[betOption].width ? BET_OPTIONS[betOption].width : DEFAULT_WIDTH;
    const height = BET_OPTIONS[betOption].height ? BET_OPTIONS[betOption].height : DEFAULT_HEIGHT;

    return (
        <div
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
            color: 'white',
            background: selectedBet === betOption? 'rgba(0, 183, 255, 0.5)': 'rgba(0, 0, 0, 0.5)',
          }}
        />
    );
}
