## OXiD - Open-Xchange in Docker (WIP)

This is a simple OX appsuite implementation in Docker containers. It is aimed for testing purposes mostly and currently it does not have additional features like Document Converter and Collaboration services, Spellchecker service, IMAP/SMTP servers etc. But this is a far-from-complete project, so they will definitely appear here in future.

After running `docker-compose up`, you will have 3 running containers: database (MySQL Percona), OX appsuite and a web frontend (Apache) running on localhost:8080. The appsuite container will have configdb initialized, 'openexchange' database user created and 'oxinstaller' script run (which creates 'oxadminmaster' admin user, sets up read/write DB hosts, memory limit and license).

Then you'll probably want to get into OX container's shell and do the following to be able to login and use the appsuite functionality:

- register current server instance
```
./sbin/registerserver -A oxadminmaster -P "$OXADMINMASTER_USER_PASS" -n ox
```

- register filestore for OX Drive
```
mkdir -p /var/opt/filestore && \
chown open-xchange:open-xchange /var/opt/filestore
./sbin/registerfilestore -A oxadminmaster -P "$OXADMINMASTER_USER_PASS" \
-t file:/var/opt/filestore -s 5000000
```
- register database for creating contexts
```
./sbin/registerdatabase -A oxadminmaster -P "$OXADMINMASTER_USER_PASS" \
-n oxdatabase -u openexchange -p "$OPENEXCHANGE_USER_PASS" -m true -H oxdb
```
- create context
```
./sbin/createcontext -A oxadminmaster -P "$OXADMINMASTER_USER_PASS" \
-c 1 -u oxadmin -d "Context Admin" -g Admin -s User \
-p "$OXADMIN_USER_PASS" -L defaultcontext -e oxadmin@example.com \
-q 1024 --access-combination-name=groupware_standard
```
- create user
```
./sbin/createuser -c 1 -A oxadmin -P "$OXADMINMASTER_USER_PASS" -u testuser \
-d "Test User" -g Test -s User -p secret -e testuser@example.com \
--imaplogin testuser --imapserver 127.0.0.1 --smtpserver 127.0.0.1
```

Logging in to the appsuite - open localhost:8080 in a web-browser and enter 'testuser/secret' as a user and password combination.

The project will change in future in order to put some of the configuration stuff under the hood and add new services, these changes will be reflected here.
