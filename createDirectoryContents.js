import * as fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import gradient from 'gradient-string';

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
    const spinner = ora(gradient.pastel.multiline('Loading..')).start();

    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = ('Loading....');
    }, 2000);

    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Rename
            if (file === '.npmignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
    setTimeout(() => {
        const projectName = chalk.hex('#F63073').bold(newProjectPath)
        spinner.succeed(chalk.hex('#68D5E9')`YOur project ` + projectName + chalk.hex('#68D5E9')` is Done!!`)
    }, 2000);
};

export default createDirectoryContents;