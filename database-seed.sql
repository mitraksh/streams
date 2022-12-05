CREATE TABLE employees(
    id SERIAL,
    name varchar,
    age int
);

INSERT INTO employees(id,name,age)
SELECT (random() * 99)::integer as id,
       substr(md5(random()::text), 0, 20) as name,
       (random() * 60)::integer as age
FROM generate_series(1, 1000000);
