# RESTful Online Store

**Authors:**
- Erik Storås Sommer, s341870
- Adrian Tokle Storset, s341859
- Mats Nome Sommervold, s341829

# How to run

**Production:**
```
DB_GATEWAY="mongodb" \
DB_PROTOCOL="mongodb" \
DB_HOST="mongodb" \
DB_PORT="27017" \
DB_NAME="production" \
DB_ROOT_USER="root" \
DB_ROOT_PWD="rootpassword" \
DB_AUTH_USER="fullaccessuser" \
DB_AUTH_PWD="fullaccesspassword" \
DB_USER="regularuser" \
DB_PWD="regularpassword" \
AUTH_SERVER_PORT="3000" \
AUTH_SERVER_ACTIONS="server, mode, fatal, tips, database" \
AUTH_SERVER_ERRORS="all" \
AUTH_SERVER_TRACEBACKS="all" \
RESOURCE_SERVER_PORT="3000" \
RESOURCE_SERVER_ACTIONS="server, mode, fatal, tips, database" \
RESOURCE_SERVER_ERRORS="critical" \
RESOURCE_SERVER_TRACEBACKS="none" \
RESOURCE_SERVER_FLAGS="--inspect=0.0.0.0" \
FRONTEND_SERVER_PORT="3000" \
docker-compose up --build
```

**Development:**
```
DB_GATEWAY="mongodb" \
DB_PROTOCOL="mongodb" \
DB_HOST="mongodb" \
DB_PORT="27017" \
DB_NAME="development" \
DB_ROOT_USER="root" \
DB_ROOT_PWD="rootpassword" \
DB_AUTH_USER="fullaccessuser" \
DB_AUTH_PWD="fullaccesspassword" \
DB_USER="regularuser" \
DB_PWD="regularpassword" \
AUTH_SERVER_PORT="3000" \
AUTH_SERVER_ACTIONS="server, mode, fatal, tips, database, accept, reject" \
AUTH_SERVER_ERRORS="all" \
AUTH_SERVER_TRACEBACKS="all" \
RESOURCE_SERVER_PORT="3000" \
RESOURCE_SERVER_ACTIONS="server, mode, fatal, tips, database, accept, reject" \
RESOURCE_SERVER_ERRORS="all" \
RESOURCE_SERVER_TRACEBACKS="all" \
RESOURCE_SERVER_FLAGS="--inspect=0.0.0.0" \
FRONTEND_SERVER_PORT="3000" \
docker-compose up --build
```