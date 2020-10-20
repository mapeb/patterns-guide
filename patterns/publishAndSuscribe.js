/*
 PUBLISH AND SUSCRIBE

 This pattern is a case of Observer pattern. The difference is that the observers subscribe to
 a particular event from an event manager and the subject can fire events that make the manager notify
 to the observers.

*/

// Subject
class BoardGameTable {
  constructor(maxPlayers, gameName) {
    this.spaceInTable = maxPlayers;
    this.game = gameName;
  }

  getGameName() {
    return this.game;
  }

  startGame(players) {
    const playersToPlayCount = Math.min(this.spaceInTable, players.length);

    players.slice(0, playersToPlayCount).forEach((player) => {
      player.play(this.game);
    });
    console.log(`Game: ${this.game} finished`);
  }
}

/*
  With a middleware between the subject and observer, we can dicoupled all the logic from observers
  from the subject and the same with the observer
*/

// Event manager
class GameMaster {
  constructor(tables) {
    this.tables = tables;
    this.players = [];
  }

  addPlayer(player, game) {
    this.players.push({ game, player });
  }

  startGame(game) {
    const playersForGame = this.players
      .filter((player) => player.game === game)
      .map((playerGame) => playerGame.player);

    this.tables
      .find((table) => table.getGameName() === game)
      .startGame(playersForGame);
  }
}

// Observer
class Player {
  constructor(name) {
    this.name = name;
  }

  play(game) {
    console.log(`I'm ${this.name} and I'm playing: ${game}`);
  }
}

// Events - Games
const Catan = "Catan";
const Pandemic = "Pandemic";
const Azul = "Azul";

const catanTable = new BoardGameTable(3, Catan);
const pandemicTable = new BoardGameTable(4, Pandemic);
const azulTable = new BoardGameTable(6, Azul);

const olzhas = new Player("Olzhas");
const marilu = new Player("Marilu");
const rahul = new Player("Rahul");
const dominik = new Player("Dominik");
const jm = new Player("JeanMarie");

const gameMaster = new GameMaster([catanTable, pandemicTable, azulTable]);
gameMaster.addPlayer(olzhas, Catan);
gameMaster.addPlayer(marilu, Catan);
gameMaster.addPlayer(rahul, Catan);
gameMaster.addPlayer(dominik, Catan);
gameMaster.addPlayer(marilu, Pandemic);
gameMaster.addPlayer(jm, Pandemic);
gameMaster.startGame(Catan);
gameMaster.startGame(Pandemic);

/* One disadvantage that we found with this pattern is that the subject doesn't know the observers,
so in this case we can send an event but, it doesn't make sense because any observer will be notify. */
gameMaster.startGame(Azul);
