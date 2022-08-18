#!/usr/bin/env node

/**
 * create-md-cli
 * CLI Tool for generate New Project
 *
 * @author Mohamed <.>
 */

import inquirer from 'inquirer';
import * as fs from 'fs';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));


console.log(gradient.pastel.multiline(figlet.textSync('MD CLI', {
	font: 'Big',
	horizontalLayout: 'default',
	verticalLayout: 'default',
	width: 50,
	whitespaceBreak: true
})));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);


const QUESTIONS = [
	{
		name: 'project-choice',
		type: 'list',
		message: gradient.vice.multiline('What project template would you like to generate?'),
		choices: CHOICES,
	},
	{
		name: 'project-name',
		type: 'input',
		message: 'Project name:',
		validate: function (input) {
			if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
			else return gradient.morning.multiline('Project name may only include letters, numbers, underscores and hashes.');
		},
	},
];

inquirer.prompt(QUESTIONS).then(answers => {
	const projectChoice = answers['project-choice'];
	const projectName = answers['project-name'];
	const templatePath = `${__dirname}/templates/${projectChoice}`;

	fs.mkdirSync(`${CURR_DIR}/${projectName}`);

	createDirectoryContents(templatePath, projectName);
});
