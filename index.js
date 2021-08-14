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
    .then((choiceData) => {
        switch (choiceData.commandOptions) {
            case 'View all departments':
                db.query('SELECT * FROM departments', function(err, results) {
                    console.table(results);
                    return initialPrompt();
                })        
                break;

            case 'View all roles':
                db.query('SELECT * FROM roles', function(err, results) {
                    console.table(results);
                    initialPrompt();
                })
                break;

            case 'View all employees':
                db.query('SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id', function(err, results) {
                    console.table(results)
                    initialPrompt();
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
                updateEmployee();
                break;

            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
            }            
        }
    )
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
        db.query(`INSERT INTO departments (dept_name) VALUES ('${answers.departmentName}');`, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('Department added!');
            initialPrompt();
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
    .then((answers) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleName}', '${answers.salary}', '${answers.departmentNumber}');`, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('Role added!');
            initialPrompt();
        })
    })
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
    .then((answers) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.roleNumber}', '${answers.managerNumber}');`, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('Employee added!');
            initialPrompt();
        })
    })
}

const updateEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'selectEmployee',
            message: 'Please enter the ID of the employee you want to update.',
            validate: (idInput) => {
                if (idInput) {
                  return true;
                } else {
                  console.log("Please enter their ID");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the new first name.',
            validate: (firstNameInput) => {
                if (firstNameInput) {
                  return true;
                } else {
                  console.log("Please enter a first name");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the new last name.',
            validate: (lastNameInput) => {
                if (lastNameInput) {
                  return true;
                } else {
                  console.log("Please enter a last name");
                  return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleNumber',
            message: 'Please enter the new role number.',
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
            message: 'Please enter the new manager number'
        }
    ])
    .then((answers) => {
        db.query(`UPDATE employees
        SET first_name = '${answers.firstName}', last_name = '${answers.lastName}', role_id = ${answers.roleNumber}, manager_id = ${answers.managerNumber}
        WHERE id = ${answers.selectEmployee};`, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('Employee updated!');
            initialPrompt();
        })
    })
}


initialPrompt()
