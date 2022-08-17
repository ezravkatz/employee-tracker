const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const Connection = require('mysql2/typings/mysql/lib/Connection');
const e = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee'
  },
  console.log('Connected to the employee database.')
);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  console.log(`🄴🄼🄿🄻🄾🅈🄴🄴 🅃🅁🄰🄲🄺🄴🅁`)

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
      "End"]
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
        db.end
        break;
    }
  });
}

function viewDepartments() {
  console.log("Displaying all departments:");

  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.table(result)
    promptOne();
  })
  
function viewRoles() {
  console.log("Displaying all roles:")
  const roleData = `SELECT roles.title AS title, roles.id AS roles_id, department.name AS department, roles.salary AS salary FROM roles JOIN department ON department.id = roles.department_id`

  db.query(roleData, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    promptOne();
  })
}

function viewEmployees() {
  console.log('Displaying all employees:')
  const employeeData = `SELECT employee.id AS employee_id, employee.last_name AS last_name, employee.first_name AS first_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name, " ", m.last_name) AS manager
  FROM employee e
  JOIN  roles ON roles.id = employee.role_id
  JOIN department ON department.id = roles.department_id
  LEFT JOIN employee m ON m.id = employee.manager_id`

  db.query(roleData, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    promptOne();
  })
}

// GET all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// GET a single department
app.get('/api/department/:id', (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// create a department
app.post('/api/department', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'id',
    'name',
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO department (id, name)
    VALUES (?,?,?)`;
  const params = [body.id, body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// error message for any other request 
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
