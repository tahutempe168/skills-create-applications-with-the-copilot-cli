#!/usr/bin/env node
/*
Node.js CLI Calculator
Supported operations (from image and latest issue):
- Addition (+, add)
- Subtraction (-, sub)
- Multiplication (*, x, mul)
- Division (/, div)

This file implements a simple CLI calculator that accepts an operator and two operands,
or runs interactively if no arguments are provided.
Referenced issue: #${ISSUE_NUMBER}
*/

const readline = require('readline');

const opMap = {
  '+': 'add',
  'add': 'add',
  'plus': 'add',
  '-': 'sub',
  'sub': 'sub',
  'minus': 'sub',
  '*': 'mul',
  'x': 'mul',
  'X': 'mul',
  'mul': 'mul',
  '×': 'mul',
  '/': 'div',
  'div': 'div',
  '÷': 'div'
};

function calc(op, a, b) {
  a = Number(a);
  b = Number(b);
  if (!isFinite(a) || !isFinite(b)) throw new Error('Operands must be valid numbers');
  switch (op) {
    case 'add': return a + b;
    case 'sub': return a - b;
    case 'mul': return a * b;
    case 'div':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default: throw new Error('Unsupported operation');
  }
}

function printUsage() {
  console.log('Usage: node src/index.js <op> <a> <b>');
  console.log('  <op>: +, add, -, sub, *, mul, x, /, div');
  console.log('Examples:');
  console.log('  node src/index.js + 2 3');
  console.log('  node src/index.js mul 4 5');
}

function runFromArgs(args) {
  if (args.length < 3) {
    printUsage();
    process.exit(args.length === 0 ? 0 : 1);
  }
  const rawOp = args[0];
  const op = opMap[rawOp];
  const a = args[1];
  const b = args[2];
  if (!op) {
    console.error('Unknown operation:', rawOp);
    printUsage();
    process.exit(1);
  }
  try {
    const res = calc(op, a, b);
    console.log(res);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.setPrompt('calc> ');
  console.log('Simple CLI calculator. Enter expressions like: 2 + 3 or "add 2 3". Type q or quit to exit.');
  rl.prompt();
  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed) { rl.prompt(); return; }
    if (/^q(?:uit)?$/i.test(trimmed)) { rl.close(); return; }
    // try to parse either "a op b" or "op a b"
    let parts = trimmed.split(/\s+/);
    let op, a, b;
    if (parts.length === 3 && opMap[parts[1]]) {
      a = parts[0]; op = opMap[parts[1]]; b = parts[2];
    } else if (parts.length === 3 && opMap[parts[0]]) {
      op = opMap[parts[0]]; a = parts[1]; b = parts[2];
    } else {
      console.log('Could not parse. Try: 2 + 3  OR  add 2 3');
      rl.prompt();
      return;
    }
    try {
      const res = calc(op, a, b);
      console.log(res);
    } catch (err) {
      console.error('Error:', err.message);
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye');
    process.exit(0);
  });
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) runInteractive();
  else runFromArgs(args);
}
