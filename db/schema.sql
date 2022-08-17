DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE department (
  id INT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  CONSTRAINT fk_roles FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
  CONSTRAINT fk_employee FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);
