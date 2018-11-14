/**
 * When example
 */

'use strict';
var inquirer = require('..');

var questions = [
  {
    type: 'confirm',
    name: 'bacon',
    message: 'Do you like bacon?'
  },
  {
    type: 'input',
    name: 'favorite',
    message: 'Bacon lover, what is your favorite type of bacon?',
    when: function(answers) {
      return answers.bacon;
    }
  },
  {
    type: 'confirm',
    name: 'medi',
    message: 'Ok... Do you like medi?',
    when: function(answers) {
      return !likesFood('bacon')(answers);
    }
  },
  {
    type: 'input',
    name: 'favorite',
    message: 'Whew! What is your favorite type of medi?',
    when: likesFood('medi')
  }
];

function likesFood(aFood) {
  return function(answers) {
    return answers[aFood];
  };
}

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});
