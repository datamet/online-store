# RESTful Online Store

**Authors:**
- Erik Storås Sommer, s341870
- Adrian Tokle Storset, s341859
- Mats Nome Sommervold, s341829

**How to run:**
```
DB_GATEWAY="mongodb" \
DB_URI="<protocol>://<username>:<password>@<host>:<port>/<database>?authSource=admin" \
DB_PROTOCOL="mongodb" \
DB_HOST="mongodb" \
DB_PORT="27017" \
DB_NAME="production" \
DB_USERNAME="root" \
DB_PASSWORD="rootpassword" \
DB_AUTH_USER="fullaccessuser" \
DB_AUTH_PWD="fullaccesspassword" \
DB_USER="regularuser" \
DB_PWD="regularpassword" \
PORT="3000" \
AUTO_PORT="false" \
ACTIONS_TO_LOG="server, mode, fatal, tips, database, error" \
ERRORS_TO_LOG="all" \
TRACEBACKS_TO_LOG="all" \
docker-compose up --build
```
