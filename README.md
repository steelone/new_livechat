# First of all run these commands to deploy:

### Install Redis if you haven't got

sudo apt install redis-server

### Or check Redis status

sudo systemctl status redis

### ----------- FIRST DEPLOY -----------

```bash
sudo su - postgres

psql

CREATE DATABASE chat;

CREATE USER chatuser WITH PASSWORD 'chatpassword';

ALTER ROLE chatuser SET client_encoding TO 'utf8';

ALTER ROLE chatuser SET default_transaction_isolation TO 'read committed';

ALTER ROLE chatuser SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE chat TO chatuser;
```

### Don't forget to add .env and then:

```bash
mkdir .venv
pipenv shell
pipenv install
python drf/manage.py makemigrations
python drf/manage.py migrate
cd react && npm install
```

### ----------- END FIRST DEPLOY -----------

# Run backend DRF

```bash
pipenv shell
python drf/manage.py runserver
```

### Run front React

```bash
cd react && npm start
```
