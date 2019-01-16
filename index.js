// run from command line
// takes an argument
// saves it to file, appending it
// displays data, highlighing high, medium, and low priority tasks

const fs = require('fs');
const parseArgs = require('minimist');
const pureChalk = require('chalk');
const attenuateProcess = require('attenuate-process');
const attenuateOs = require('attenuate-os');
const attenuateFs = require('attenuate-fs');

const os = require('os');

const altProcess = attenuateProcess(process);
const altOs = attenuateOs(os);
const altFs = attenuateFs(fs);
const chalk = pureChalk(altOs, altProcess);

// when we logged from supports-color/index
// and supports-color/pure-supports-color, it logged twice
// this needs investigation

const todoFile = 'todo.txt';

const addTodoToFile = (todo, priority = 'Medium') => {
  altFs.appendFile(todoFile, `${priority}: ${todo} \n`, err => {
    if (err) throw err;
    console.log('Todo was added');
  });
};

const addTodo = args => {
  const { todo, priority } = args;
  addTodoToFile(todo, priority);
};

const highlightTodo = todoLine => {
  const [priority, todo] = todoLine.split(': ');
  switch (priority) {
    case 'High':
      return chalk.red(todo);
    case 'Medium':
      return chalk.yellow(todo);
    case 'Low':
      return chalk.green(todo);
  }
};

// note that if the file does not exist, an error is thrown,
// and somehow this doesn't catch it

const displayTodos = () => {
  try {
    const stream = altFs.createReadStream(todoFile);
    const lineReader = require('readline').createInterface({
      input: stream,
    });
    console.log(chalk.greenBright("****** TODAY'S TODOS ********"));
    lineReader.on('line', line => {
      console.log(highlightTodo(line));
    });
  } catch (err) {
    console.log(
      chalk.red(
        'There was an error, meaning that there was probably nothing to display. Please add a todo first',
      ),
    );
  }
};

/* we expect {
    _: [],
    'add'|'display': true,
    todo: todoText,
    priority:'Low'|'Medium'|'High'
}
todo is required if run is 'add', and priority defaults to Medium
*/

const args = parseArgs(process.argv.slice(2));
if (args.add) {
  addTodo(args);
} else if (args.display) {
  displayTodos();
} else {
  console.log('ERROR: not a valid command;');
}
