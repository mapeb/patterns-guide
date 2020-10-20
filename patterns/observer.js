/*
 OBSERVER

 Observer is a pattern where several entities called observer are attached to a subject, and this
 notify to the observers when something happens.

 For this case I can use the example of having only one board game table in a house with many people
 trying to play it. 

*/

// Subject
class BoardGameTable {
  constructor(maxPlayers, gameName) {
    this.players = [];
    this.spaceInTable = maxPlayers;
    this.game = gameName;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  startGame() {
    const playersToPlayCount = Math.min(this.spaceInTable, this.players.length);

    Array.from({ length: playersToPlayCount }).forEach(() => {
      const player = this.players.shift();
      player.play(this.game);
    });
    console.log(`Game: ${this.game} finished`);
  }
}

// Observer
class Player {
  constructor() {}

  sitIn(table) {
    table.addPlayer(this);
  }

  play(game) {
    console.log("I'm playing: ", game);
  }
}

const catanTable = new BoardGameTable(4, "Catan");
new Player(catanTable).sitIn(catanTable);
new Player(catanTable).sitIn(catanTable);
new Player(catanTable).sitIn(catanTable);
new Player(catanTable).sitIn(catanTable);
new Player(catanTable).sitIn(catanTable);
new Player(catanTable).sitIn(catanTable);

// This is only going to print 4 times. Because it is only notifying 4 observers, from all the list.
catanTable.startGame();

// This is only going to print 2 times. Because after notifying, this is removing from the list the players.
catanTable.startGame();
