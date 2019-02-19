const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
var chalk = require("chalk");

let name, yob, age, homeTown;

readLine.question("What's your name?", name => {
  name = name;
  readLine.question("What's your year of birth?", yob => {
    yob = yob;
    readLine.question("What's your hometown?", homeTown => {
      homeTown = homeTown;
      readLine.close();

      age = new Date().getFullYear() - parseInt(yob);

      console.log(
        `Thank you. Hello ${chalk.red(name)}, so you are ${chalk.blue(
          age
        )} year old and from ${chalk.yellow(homeTown)}.`
      );
    });
  });
});
