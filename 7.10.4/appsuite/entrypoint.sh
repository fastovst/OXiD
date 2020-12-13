#!/usr/bin/env bash

until nc -z oxdb 3306 2>/dev/null
do
  echo 'Waiting for database to be ready...'
  sleep 1
done

sudo ./sbin/initconfigdb -a --configdb-pass="$OPENEXCHANGE_USER_PASS" \
--configdb-host=oxdb --mysql-root-passwd="$MYSQL_ROOT_PASS"

sudo ./sbin/oxinstaller --no-license --servername=ox \
--configdb-pass="$OPENEXCHANGE_USER_PASS" --configdb-readhost=oxdb \
--configdb-writehost=oxdb --servermemory="$OX_SERVER_MEMORY" \
--master-pass="$OXADMINMASTER_USER_PASS" --network-listener-host=*

./sbin/open-xchange