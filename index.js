#!/usr/bin/env node
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const commandLineArgs = require("command-line-args");

const appDirectory = fs.realpathSync(process.cwd());
const arrPath = appDirectory.split("/");
const len = arrPath.length;
const res = [];

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'cmd', alias: 'n', type: String },
  { name: 'timeout', alias: 't', type: Number }
]

const options = commandLineArgs(optionDefinitions);

for (let i = 0; i < len; i++) {
  res.push(arrPath.join("/"));
  arrPath.pop();
}
res.pop();

const match = res.filter(path => fs.existsSync(`${path}/dev.sh`));
console.log(options.src.join(' '))
if (match.length) {
  shell.exec(`${match}/dev.sh ${options.src.join(' ')}`)
  console.log("found it", match[0]);
}
console.log("hello")
console.log("hello2")
