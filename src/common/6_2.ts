import {Queue} from "../classes/ts/Queue";

function log(msg: string): void {
    console.log(msg)
}

function main(): void {
    let firstPlayer: Queue<number> = new Queue(),
        secondPlayer: Queue<number> = new Queue(),
        cards: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        iterations: number = 1;

    for (let i = 0; i < 10; i++) {
        let currentIndex: number = Math.floor(Math.random() * cards.length);

        if (i % 2 === 0) {
            firstPlayer.enqueue(cards[currentIndex]);
        } else {
            secondPlayer.enqueue(cards[currentIndex]);
        }

        cards.splice(currentIndex, 1);
    }

    log(`game initialization...\nfp cards: ${firstPlayer.toString()}\nsp cards: ${secondPlayer.toString()}`);

    while (!firstPlayer.isEmpty() && !secondPlayer.isEmpty()) {
        let firstPlayerCard = firstPlayer.dequeue().value;
        let secondPlayerCard = secondPlayer.dequeue().value;

        if ((firstPlayerCard === 0 && secondPlayerCard === 9) || (firstPlayerCard === 9 && secondPlayerCard === 0)) {
            log('!!!!!');
        }

        if (firstPlayerCard > secondPlayerCard || (firstPlayerCard === 0 && secondPlayerCard === 9)) {
            firstPlayer.enqueue(firstPlayerCard);
            firstPlayer.enqueue(secondPlayerCard);
            log(`-----iteration: <${iterations}>-----\nfp card: ${firstPlayerCard} > sp card: ${secondPlayerCard} => fp win`);
        } else if (firstPlayerCard < secondPlayerCard || (firstPlayerCard === 9 && secondPlayerCard === 0)) {
            secondPlayer.enqueue(secondPlayerCard);
            secondPlayer.enqueue(firstPlayerCard);
            log(`-----iteration: <${iterations}>-----\nfp card: ${firstPlayerCard} < sp card: ${secondPlayerCard} => sp win`);
        }

        iterations++;

        if (iterations > 50) break;
        log(`fp cards: ${firstPlayer.toString()}\nsp cards: ${secondPlayer.toString()}`);
    }

    log(`-----<summary>-----\niterations count: ${iterations - 1}\nwinner: ${firstPlayer.isEmpty() ? 'second player' : 'first player'}`);
}

main();