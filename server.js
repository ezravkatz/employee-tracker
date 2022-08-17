import express, { urlencoded, json } from "express";
import { createConnection } from "mysql2";
import inquirer from "inquirer";
// import {Connection} from 'mysql2/typings/mysql/lib/Connection';
// import e from 'express';
// import { query } from 'express';
// const PORT = process.env.PORT || 3001;
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
// db connection
const db = createConnection(
 {
   host: "localhost",
   user: "root",
   password: "password",
   database: "employee",
 },
 console.log("Connected to the employee database.")
);

db.connect(function (err) {
 if (err) throw err;
 console.log("Connected!");
 promptOne();
});

function promptOne() {
 inquirer
   .prompt({
     type: "list",
     name: "task",
     message: "Please select from the menu.",
     choices: [
       "View all departments",
       "View all roles",
       "View all employees",
       "Add a department",
       "Add a role",
       "Add an employee",
       "Update an employee role",
       "End",
     ],
   })
   .then(function ({ choice }) {
     switch (choice) {
       case "View all departments":
         viewDepartments();
         break;
       case "View all roles":
         viewRoles();
         break;
       case "View all employees":
         viewEmployees();
         break;
       case "Add a department":
         addDepartment();
         break;
       case "Add a role":
         addRole();
         break;
       case "Add an employee":
         addEmployee();
         break;
       case "Update employee role":
         updateEmployeeRole();
         break;
       case "End":
         db.end;
         break;
     }
   });
}

function viewDepartments() {
 console.log("Displaying all departments:");
 db.query(SELECT * FROM department, (err, result) => {
   if (err) {
     console.log(err);
   }
   console.table(result);
   promptOne();
 });
 function viewRoles() {
   console.log("Displaying all roles:");
   const roleData = SELECT roles.title AS title, roles.id AS roles_id, department.name AS department, roles.salary AS salary FROM roles JOIN department ON department.id = roles.department_id;
   db.query(roleData, (err, result) => {
     if (err) {
       console.log(err);
     }
     console.table(result);
     promptOne();
   });
 }
 function viewEmployees() {
   console.log("Displaying all employees:");
   const employeeData = `SELECT employee.id AS employee_id, employee.last_name AS last_name, employee.first_name AS first_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name, " ", m.last_name) AS manager
 FROM employee e
 JOIN  roles ON roles.id = employee.role_id
 JOIN department ON department.id = roles.department_id
 LEFT JOIN employee m ON m.id = employee.manager_id`;
   db.query(roleData, (err, result) => {
     if (err) {
       console.log(err);
     }
     console.table(results);
     promptOne();
   });
 }
 const newDepartment = () => {
   return inquirer
     .prompt([
       {
         type: "input",
         name: "department",
         message: "What is the department name which you would like to add?",
         validate: (answer) => {
           if (answer) {
             return true;
           }
           console.log("Error! Please provide the department name.");
           return false;
         },
       },
     ])
     .then((input) => {
       const dept = INSERT INTO department (name) VALUES(?);
       const param = [input.department];
       db.query(dept, param, (err, result) => {
         if (err) {
           console.log(err);
         }
         console.log(${input.department} added!);
         promptOne();
       });
     });
 };
New

const addRole = () => {
   return db
     .promise()
     .query(SELECT department.id, department.name FROM department)
     .then(([department]) => {
       let deptOptions = departments.map(({ id, name }) => ({
         name: name,
         value: id,
       }));
     });
 };
 inquirer
   .prompt([
     {
       type: "input",
       name: "role",
       message: "Please enter the role you want to add.",
       validate: (answer) => {
         if (answer) {
           return true;
         }
         console.log("Error! Please enter a valid role name.");
         return false;
       },
     },
     {
       type: "list",
       name: "department",
       message: "In which department should this role be assigned?",
       choices: deptOptions,
     },
     {
       type: "input",
       name: "salary",
       message: "Please enter the salary for this role.",
       validate: (answer) => {
         if (answer) {
           return true;
         }
         console.log("Error! Please enter the salary for this role.");
         return false;
       },
     },
   ])
   .then(({ role, department, salary }) => {
     db.promise().query(
       `INSERT INTO roles (title, salary, department_id)
   VALUES (?, ?, ?)`,
       [role, salary, department],
       (err, result) => {
         if (err) {
           console.log(err);
         }
       }
     );
     console.log("Role added successfully.");
     promptOne();
   });
}

const addEmployee = () => {
 return db
   .promise()
   .query(SELECT roles.id, roles.title FROM roels)
   .then(([roles]) => {
     let roleOptions = roles.map(({ id, title }) => ({
       name: title,
       value: id,
     }));
     db.promise()
       .query(
         SELECT E.id CONCAT (first_name, ' ', last_name) AS manager FROM emplyee E
       )
       .then(([manager]) => {
         let managerOptions = manager.map(({ id, manager }) => ({
           name: manager,
           value: id,
         }));
         inquirer
           .prompt([
             {
               type: "input",
               name: "firstName",
               message:
                 "Please enter the first name of the employee you wish to add.",
               validate: (answer) => {
                 if (answer) {
                   return true;
                 }
                 console.log("Error! Please provide a valid first name.");
               },
             },
             {
               type: "input",
               name: "lastName",
               message:
                 "Please enter the last name of the employee you wish to add.",
               validate: (answer) => {
                 if (answer) {
                   return true;
                 }
                 console.log("Error! Please provide a valid last name.");
               },
             },
             {
               type: "input",
               name: "roleTitle",
               message:
                 "Please enter the role of the employee you wish to add.",
               choices: roleOptions,
             },
             {
               type: "input",
               name: "roleTitle",
               message: "Please enter new employee manager ID.",
               choices: managerOptions,
             },
           ])
           .then(({ firstName, lastName, roleTitle, manager }) => {
             db.promise().query(
               `INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES (?, ?, ?, ?)`,
               [firstName, lastName, roleTitle, manager],
               (err, result) => {
                 if (err) {
                   console.log(err);
                 }
               }
             );
             console.log(New employee successfully added!);
             promptOne();
           });
       });
   });
};

const updateEmployeeRole = () => {
 return db
   .promise()
   .query(
     SELECT E.id, CONCAT(E.first_name, ' ', last_name) AS employee FROM employee E
   )
   .then(([employee]) => {
     let allEmployees = employee.map(({ id, employee }) => ({
       value: id,
       name: employee,
     }));
     db.promise()
       .query(SELECT roles.id, roles.title FROM roles)
       .then(([roles]) => {
         let allRoles = roles.map(({ id, title }) => ({
           value: id,
           name: title,
         }));
         inquirer
           .prompt([
             {
               type: "list",
               name: "employeelist",
               message: "Please select which employee to update.",
               choices: allEmployees,
             },
             {
               type: "list",
               name: "newrole",
               message: "Please select which new role to assign the employee.",
               choices: allRoles,
             },
           ])
           .then(({ employee, updateEmployeeRole }) => {
             db.promise().query(
               `UPDATE employee SET role_id = ?
         WHERE id = ?`,
               [updateEmployeeRole, employee],
               (err, result) => {
                 if (err) {
                   console.log(err);
                 }
                 console.log(
                   "The employee role has been changed successfully."
                 );
                 promptOne();
               }
             );
           });
       });
   });
};