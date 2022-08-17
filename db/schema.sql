DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  CONSTRAINT fk_roles FOREIGN KEY (id) REFERENCES roles(department_id) ON DELETE SET NULL
);