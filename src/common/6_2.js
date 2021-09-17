"use strict";
exports.__esModule = true;
var Queue_1 = require("../classes/ts/Queue");
function log(msg) {
    console.log(msg);
}
function main() {
    var firstPlayer = new Queue_1.Queue(), secondPlayer = new Queue_1.Queue(), cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], iterations = 1;
    for (var i = 0; i < 10; i++) {
        var currentIndex = Math.floor(Math.random() * cards.length);
        if (i % 2 === 0) {
            firstPlayer.enqueue(cards[currentIndex]);
        }
        else {
            secondPlayer.enqueue(cards[currentIndex]);
        }
        cards.splice(currentIndex, 1);
    }
    log("game initialization...\nfp cards: " + firstPlayer.toString() + "\nsp cards: " + secondPlayer.toString());
    while (!firstPlayer.isEmpty() && !secondPlayer.isEmpty()) {
        var firstPlayerCard = firstPlayer.dequeue().value;
        var secondPlayerCard = secondPlayer.dequeue().value;
        if ((firstPlayerCard === 0 && secondPlayerCard === 9) || (firstPlayerCard === 9 && secondPlayerCard === 0)) {
            log('!!!!!');
        }
        if (firstPlayerCard > secondPlayerCard || (firstPlayerCard === 0 && secondPlayerCard === 9)) {
            firstPlayer.enqueue(firstPlayerCard);
            firstPlayer.enqueue(secondPlayerCard);
            log("-----iteration: <" + iterations + ">-----\nfp card: " + firstPlayerCard + " > sp card: " + secondPlayerCard + " => fp win");
        }
        else if (firstPlayerCard < secondPlayerCard || (firstPlayerCard === 9 && secondPlayerCard === 0)) {
            secondPlayer.enqueue(secondPlayerCard);
            secondPlayer.enqueue(firstPlayerCard);
            log("-----iteration: <" + iterations + ">-----\nfp card: " + firstPlayerCard + " < sp card: " + secondPlayerCard + " => sp win");
        }
        iterations++;
        if (iterations > 50)
            break;
        log("fp cards: " + firstPlayer.toString() + "\nsp cards: " + secondPlayer.toString());
    }
    log("-----<summary>-----\niterations count: " + (iterations - 1) + "\nwinner: " + (firstPlayer.isEmpty() ? 'second player' : 'first player'));
}
main();
