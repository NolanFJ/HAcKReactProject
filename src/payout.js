import {BET_OPTIONS} from './bet-info'

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
     * @param {string} betOption The type of bet. 
     */
    constructor(betAmount, betOption) {
        this.betAmount = betAmount;
        this.betOption = betOption;
        this.squaresBet = BET_OPTIONS[betOption].SQUARES_INCLUDED;
    };

    /**
     * 
     * @param {*} spinResult 
     * @returns The payout of the bet given the spin result.
     */
    calcPayout(spinResult) {
        const betWon = spinResult in this.squaresBet;
        let payout = 0;

        if(betWon){
            payout = this.betAmount + this.betAmount * BET_OPTIONS[this.betOption].PAYOUT_FACTOR;
        }
        return payout;
    }
}

/**
 * Given the bets placed by the player, and the result of a spin, calculates the
 * payout that the player should receive.
 * 
 * @param {Bet[]} bets Array of the bets placed.
 * @param {string} spinResult The number that the ball landed on after the spin.
 */
export function calcPayout(bets, spinResult) {
    let totalPayout = 0;

    // calculate the total payout of a spin by summing the individual payouts of
    // each bed made for that spin.
    for (let i = 0; i < bets.length; i++) {
        totalPayout += bets[i].calcPayout(spinResult);
    }

    return totalPayout;
}
