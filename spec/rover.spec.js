const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //test 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(1);
    expect(testRover.position).toBe(1);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
  //test 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover = new Rover(1);
    let response = testRover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });
  //test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover = new Rover(1);
    let response = testRover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
  //test 10
  test("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message: STATUS_CHECK', commands);
    let testRover = new Rover(1);
    let response = testRover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual({"position": 1, "mode": 'NORMAL', "generatorWatts": 110})
  });
  //Test 11
  test("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with MODE_CHANGE', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({completed: true});
    expect(response.results[1].roverStatus.mode).toBe('LOW_POWER');
  });
  //Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({completed: false});
  });
  //Test 13
  test("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 12000)];
    let message = new Message('Test message for "MOVE"', commands);
    let rover = new Rover(25);    
    let response = rover.receiveMessage(message);
    expect(rover.position).toBe(12000);
  });
});
