import { BET_OPTIONS } from "./bet-info";
import { GameContextProvider, GameContext } from "./GameContext"
import { calcPayout, Bet } from './payout'
import {useContext} from 'react'
import {BetSelection} from './RouletteTable'

/**
 * Generates and returns a random pocket that the ball has landed in as a result
 * of a spin. 
 * @returns {string} A randomly generated pocket that the ball landed on.
 */
function generateRandomSpinResult() {
  const TOTAL_POSSIBLE_SPIN_RESULTS = 38;

  // generate a random integer in the inclusive range: [0, 37]
  let spinResult = Math.floor(Math.random() * TOTAL_POSSIBLE_SPIN_RESULTS);

  // A result of 37 implies that the ball landed on the "00" pocket, while
  // all other results imply that the ball landed on the generated pocket.
  if (spinResult === 37) {
    spinResult = "00";
  } else {
    spinResult = spinResult.toString();
  }

  return spinResult;
}





function PlaceBet() { 
  const {pendingBet, setPendingBet, bets, setBets, balance, setBalance, selectedBet} = useContext(GameContext)
  
    /**
     * 
     * @param {Bet} bet 
     * @returns 
     */
    function placeBet(bet) {
      const betAmount = bet;
      console.log(betAmount);

      if (betAmount <= 0) {
        // bet amount must be positive.
        // TODO: Cause an error to display
        return;
      }
      else if (betAmount > balance) {
        // bet amount cannot be greater than the player's balance.
        return;
      }
      setBalance((balance) => balance - betAmount);
      setBets(bets.concat(new Bet(parseInt(pendingBet), selectedBet)));
      setPendingBet("");

    }
    console.log("Place bet");
  return (
    <div>
        <input name="betAmount" type="number" value={pendingBet} placeholder="Bet amount" onChange={
          e => {
            setPendingBet(e.target.value)
          }
        }/>
        <button type="button" onClick={e => {placeBet(pendingBet)}}>Place bet</button>
    </div>
  )
}

function SpinWheel() {
  /**
   * Start the game by spinning the roulette wheel and submitting all bets
   * @param {Bet[]} bets 
   */
  function beginSpin(bets) {
    const spinResult = generateRandomSpinResult();
    const payout = calcPayout(bets, spinResult);
    setBalance((balance) => balance + payout);
  }
  /**
   * 
   * @param {Bet[]} bets The bets to submit for the current spin.
   */
  function submitBets(bets) {
    beginSpin(bets);
    setBets([]);
  }


  const {setBalance, bets, setBets} = useContext(GameContext);

  return (
    <button type="button" onClick={ e => {submitBets(bets)}}>Spin</button>
  );
}

function StatusOverlay() {
  const {balance} = useContext(GameContext)
  return (
    <div>
      <div>Balance: {balance.toString()}</div>
    </div>
  )
}

export default function RouletteGame() {
  return (
    <GameContextProvider>
      <div>
        <StatusOverlay />
      </div>
      <div width='1000px' style={{display: 'inline'}}>
        <RouletteTable />
      </div>
      <div width='300px' style={{display: 'inline'}}>Hello</div>
      <div>
        <PlaceBet />
      </div>
      <div>
        <SpinWheel /> 
      </div>
    </GameContextProvider>
  )
}



function RouletteTable() {
  const {selectedBet, setSelectedBet} = useContext(GameContext);
  const tableWidth = 1000;

  return (
    <div style={{position: 'relative', width: tableWidth}}>
      <img
        src='roulette_table.jpg' 
        style={{
          width: '100%',
          position: 'relative',
        }}
      />
      <div style={{
        position: 'absolute',
      }}>  
      {
        betOptions.map((betOption) => <BetSelection betOption={betOption}/>)
      }
      </div>
    </div>
  );
}


