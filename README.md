# This folder will run two containers 1. for nodejs and 2. for postgres db. The db will create a table, insert million records  and write the data in the results.csv file. 
# To run the docker container
# Type docker compose up
# Go to localhost:16543 and EMAIL: "placeholder@example.com" PASSWORD: "fakepassword123!"
# Add new server by entering credentials: POSTGRES_USER='admin' POSTGRES_HOST='postgres' POSTGRES_DB='admin' POSTGRES_PASSWORD='mypassword' POSTGRES_PORT='5432'
# Finally go to localhost:3500/employee to fetch the records and write in the results.csv
# To exit the cli use ctrl+c
# To stop the container use docker compose down