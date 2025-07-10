const PAYOUT_FACTOR_BY_BET_TYPE = {
    STRAIGHT: 35,
    SPLIT: 17,
    STREET: 11,
    CORNER: 8,
    BASKET: 6,
    LINE: 5,
    DOZEN: 2,
    COLUMN: 2,
    PARITY: 1,
    COLOR: 1,
    RANGE: 1
}

const BET_TYPES = {
    STRAIGHT: "STRAIGHT",
    SPLIT: "SPLIT",
    STREET: "STREET",
    CORNER: "CORNER",
    BASKET: "BASKET",
    LINE: "LINE",
    DOZEN: "DOZEN",
    COLUMN: "COLUMN",
    PARITY: "PARITY",
    COLOR: "COLOR",
    RANGE: "RANGE"
}

export class Bet {
    /**
     * @param {string[]} squaresBet The squares involved in the bet.
     * @param {number} betAmount The amount bet.
     * @param {string} betType The type of bet. 
     */
    constructor(squaresBet, betAmount, betType) {
        this.squaresBet = squaresBet;
        this.betAmount = betAmount;
        this.betType = betType;
    };

    /**
     * 
     * @param {*} spin_result 
     * @returns The payout of the bet given the spin result.
     */
    calcPayout(spin_result) {
        const betWon = spin_result in this.squaresBet;
        let payout = 0;

        if(betWon){
            payout = this.betAmount + this.betAmount * PAYOUT_FACTOR_BY_BET_TYPE[this.betType];
        }
        return payout;
    }
}

/**
 * Given the bets placed by the player, and the result of a spin, calculates the
 * payout that the player should receive.
 * 
 * @param {Bet[]} bets Array of the bets placed.
 * @param {string} spin_result The number that the ball landed on after the spin.
 */
export function calcPayout(bets, spin_result) {
    let totalPayout = 0;

    // calculate the total payout of a spin by summing the individual payouts of
    // each bed made for that spin.
    for (let i = 0; i < bets.length; i++) {
        totalPayout += bets[i].calcPayout(spin_result);
    }

    return totalPayout;
}
