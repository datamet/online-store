# RESTful Online Store

**Authors:**
- Erik Storås Sommer, s341870
- Adrian Tokle Storset, s341859
- Mats Nome Sommervold, s341829

# How to run

**Production:**
```
DB_GATEWAY="mongodb" DB_PROTOCOL="mongodb" DB_HOST="mongodb" DB_PORT="27017" DB_NAME="production" DB_ROOT_USER="root" \
DB_ROOT_PWD="rootpassword" DB_AUTH_USER="fullaccessuser" DB_AUTH_PWD="fullaccesspassword" DB_USER="regularuser" \
DB_PWD="regularpassword" ADMIN_USER="Admin" ADMIN_EMAIL="admin@sahara.com" ADMIN_PWD="Password1#" \
HASHING_SECRET="thisisthehashingsecret" PUBLIC_HOST="localhost" PUBLIC_PORT="80" AUTH_SERVER_PORT="3000" \
AUTH_SERVER_EVENTS="server, mode, fatal, tips, database, accept, reject" AUTH_SERVER_ERRORS="critical" \
AUTH_SERVER_TRACEBACKS="none" RESOURCE_SERVER_PORT="3000" \
RESOURCE_SERVER_EVENTS="server, mode, fatal, tips, database, accept, reject" \
RESOURCE_SERVER_ERRORS="critical" RESOURCE_SERVER_TRACEBACKS="none" AUTH_SERVER_FLAGS="--" RESOURCE_SERVER_FLAGS="--" \
FRONTEND_SERVER_PORT="3000" CART_TIMEOUT="3600000" \
docker-compose up --build
```
