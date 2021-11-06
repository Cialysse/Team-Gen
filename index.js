const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const OUTPUT_DIR = path.resolve(__dirname, 'output')
const output_path = path.join(OUTPUT_DIR, 'team.html')
const render = require('./src/page-template.js')
const { inheritInnerComments } = require('@babel/types')

const teamMembers = []
const idArray = []

function appMenu() {
    function manager() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'ManagerName',
                message: 'Name of Manger',
            },
            {
                type:'input',
                name:'id',
                message:'Manager ID',
            },
            {
                type:'input',
                name:'email',
                message:'Manager Email',
            }

        ])
        .then(answers => {
            const manager = new Manager(answers.ManagerName())
            teamMembers.push(manager)
            idArray.push(answers.managerId)
            createTeam()
        });
    }
}

const teamQuestions = () => {
    return inquirer.prompt([
        {
            type:'list',
            name:'role',
            message:'Select employye role',
            choices: ['Engineer', 'Intern']
        },
        {
            type:'input',
            name:'name',
            message:'Employees name',
        },
        {
            type:'input',
            name:'email',
            message:'Employee Id',
        },
        {
            type:'input',
            name: 'github',
            message:'Employees github username',
        },
        
    ])
    .then(teamAnswers => {
        let {role, name, id, email, github} = teamAnswers;
        let newTeam;

        if(role === "Engineer") {
            return teamQuestions(teamMembers);
        } else {
            return teamMembers;
        }
    });
}

init();