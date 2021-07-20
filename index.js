const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ponceinlet8!',
        database: 'employee_db'
    },
    console.log('Connected to the employee database!')
);

const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'commandOptions',
            message: 'What would you like to do?',
            choices: [               
                    'View all departments',
                    'View all roles',                             
                    'View all employees',                                
                    'Add a department',                    
                    'Add a role',                
                    'Add an employee',                  
                    'Update an employee role',
                    'Exit'               
                    ]
        }
    ])
}

const departmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please choose a name for the department',
            validate: (nameInput) => {
                if (nameInput) {
                  return true;
                } else {
                  console.log("Please enter department name");
                  return false;
                }
            }
        }
    ])
    .then((answers) => {
        db.query(`INSERT INTO departments (name) VALUES ('${JSON.parse(answers)}');`, function (err, results) {
            console.log(results);
        })
    })
}

const rolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please choose a name for the role',
            validate: (nameInput) => {
                if (nameInput) {
                  return true;
                } else {
                  console.log("Please enter role name");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter a salary',
            validate: (salaryInput) => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log("Please enter a salary");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'departmentNumber',
            message: 'Please enter a department number for the role',
            validate: (departmentInput) => {
                if (departmentInput) {
                  return true;
                } else {
                  console.log("Please enter a department number");
                  return false;
                }
            }
        }
    ])
}

const employeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter their first name',
            validate: (firstNameInput) => {
                if (firstNameInput) {
                  return true;
                } else {
                  console.log("Please enter their first name");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter their last name',
            validate: (lastNameInput) => {
                if (lastNameInput) {
                  return true;
                } else {
                  console.log("Please enter their last name");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleNumber',
            message: 'Please enter their role number',
            validate: (roleNumberInput) => {
                if (roleNumberInput) {
                  return true;
                } else {
                  console.log("Please enter their role number");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerNumber',
            message: 'Please enter their managers number'
        }
    ])
}

initialPrompt()
    .then((choiceData) => {
        switch (choiceData.commandOptions) {
            case 'View all departments':
                db.query('SELECT * FROM departments', function(err, results) {
                    console.table(results);
                })
                break;

            case 'View all roles':
                db.query('SELECT * FROM roles', function(err, results) {
                    console.table(results);
                })
                break;

            case 'View all employees':
                db.query('SELECT * FROM employees', function(err, results) {
                    console.table(results);
                })
                break;

            case 'Add a department':
                departmentPrompt();
                break;

            case 'Add a role':
                rolePrompt();
                break;

            case 'Add an employee':
                employeePrompt();
                break;

            case 'Update an employee role':
                break;

            case 'Exit':
                break;
        }
        
            
        }
    )