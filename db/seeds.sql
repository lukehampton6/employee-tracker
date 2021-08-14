INSERT INTO departments (dept_name)
VALUES ("test");

INSERT INTO roles (title, salary, department_id)
VALUES ("admin", 80, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("test", "user", 1, NULL);