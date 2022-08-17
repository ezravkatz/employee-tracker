DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  CONSTRAINT fk_roles FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

