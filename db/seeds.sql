
 INSERT INTO department (id, dept_name)
VALUES
  (1, 'Furniture'),
  (2, 'Clothing'),
  (3, 'Produce'),
  (4, 'Electronics'),
  (5, 'Deli');

  INSERT INTO roles (id, title, salary, department_id)
VALUES
  (101, 'Salesperson', 20.000, 1),
  (101, 'Salesperson', 20.000, 1),
  (102, 'Cashier', 15.000, 1),
  (201, 'Manager', 28.000, 1),
  (101, 'Salesperson', 18.000, 2),
  (101, 'Salesperson', 18.000, 2),
  (102, 'Cashier', 15.000, 2),
  (103, 'Stocker', 16.000, 3),
  (102, 'Cashier', 15.000, 3),
  (104, 'Technician', 35.000, 4),
  (101, 'Salesperson', 21.000, 4),
  (105, 'GeekTeam', 25.000, 4),
  (202, 'Manager', 30.000, 4),
  (102, 'Cashier', 14.500, 4),
  (106, 'Butcher', 33.000, 5),
  (106, 'Butcher', 35.000, 5),
  (102, 'Cashier', 15.500, 5);

  INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
  VALUES
  (0001, 'Emily', 'Rios', 101, 201),
  (0002, 'Henri', 'Matisse', 101, 201),
  (0003, 'Pablo', 'Picasso', 102, 201),
  (0004, 'Amadeus', 'Mozart', 201, null),
  (0005, 'Jazz', 'Jones', 101, 201),
  (0006, 'Captain', 'America', 101, 201),
  (0007, 'Debbie', 'Downer', 102, 201),
  (0008, 'Bert', 'Ernie', 104, 202),
  (0009, 'Salt', 'Pepa', 101, 201),
  (0010, 'Peter', 'Griffin', 105, 202),
  (0011, 'Mia', 'Martin', 202, null),
  (0012, 'Sharon', 'Osborne', 102, 202),
  (0013, 'Claire', 'Van', 106, 202),
  (0014, 'Bianca', 'Bedendi', 106, 202),
  (0015, 'Gabriella', 'Papadakis', 102, 202);

