class Command {
    constructor(commandType, value) {
      this.commandType = commandType;
      if (!commandType) {
        throw Error("Command type required.");
      }
      this.value = value;
    }
  
  }

  class Message {
    constructor(name, commands) {
       this.name = name;
       if (!name) {
          throw Error("Message name required.");
       }
       this.commands = commands;
    }
 }

 class Rover {
    // Write code here!
    constructor(position) {
       this.position = position;
       this.mode = 'NORMAL';
       this.generatorWatts = 110;
    }
 
    receiveMessage(message) {
       let response = {
          name: message.name,
          results: message.commands
       }
 
       for (let i = 0; i < message.commands.length; i++) {
          let command = message.commands[i];
          let roverStatus = {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
          }
 
          if (command.commandType === 'STATUS_CHECK') {
            //  response.results.push(roverStatus);
          }
       }
       
       return response;
    }
 }

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

// console.log(commands);
// console.log(message);
// console.log(rover);
console.log(response.results.length);