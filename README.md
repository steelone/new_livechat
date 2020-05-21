# First of all run these commands to deploy:

### Install Redis if you haven't got

sudo apt install redis-server

### Or check Redis status

sudo systemctl status redis

### Install dependences

mkdir .venv
pipenv install

cd react && npm install

# Run backend DRF

```bash
pipenv shell
python drf/manage.py runserver
```

### run front React

```bash
cd react && npm start
```
