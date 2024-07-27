class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      }

      let roverStatus = {
         position: this.position,
         mode: this.mode,
         generatorWatts: this.generatorWatts
       }


      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];

         if (command.commandType === 'STATUS_CHECK') {
            response.results.push({completed: true, roverStatus: roverStatus});
         } else if (command.commandType === 'MODE_CHANGE') {
            roverStatus.mode = command.value;
            response.results.push({completed: true});
         } else if (command.commandType === 'MOVE') { 
               if (roverStatus.mode === 'LOW_POWER') {
                  response.results.push({completed: false});
               } else {
                  this.position = command.value;
                  roverStatus.position = command.value;
                  response.results.push({completed: true});
               }
         }
      };

      return response;
   }
}

module.exports = Rover;