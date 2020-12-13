#!/usr/bin/env bash

./sbin/initconfigdb -a --configdb-pass=1q2w3e4r5t \
--configdb-host=oxdb --mysql-root-passwd=1q2w3e4r5t

./sbin/oxinstaller --no-license --servername=ox \
--configdb-pass=1q2w3e4r5t --configdb-readhost=oxdb \
--configdb-writehost=oxdb --servermemory=1024 \
--master-pass=1q2w3e4r5t --network-listener-host=*

sudo -u open-xchange ./sbin/open-xchange

# sudo -u open-xchange ./sbin/open-xchange &
# sleep 60

# ./sbin/registerserver -A oxadminmaster -P 1q2w3e4r5t -n ox

# mkdir -p /var/opt/filestore && \
# chown open-xchange:open-xchange /var/opt/filestore

# ./sbin/registerfilestore -A oxadminmaster -P 1q2w3e4r5t \
# -t file:/var/opt/filestore -s 1000000

# ./sbin/registerdatabase -A oxadminmaster -P 1q2w3e4r5t \
# -n oxdatabase -p 1q2w3e4r5t -m true -H oxdb -u openexchange

# ./sbin/createcontext -A oxadminmaster -P 1q2w3e4r5t \
# -c 1 -u oxadmin -d "Context Admin" -g Admin -s User \
# -p 1q2w3e4r5t -L defaultcontext -e oxadmin@example.com \
# -q 1024 --access-combination-name=groupware_standard

# ./sbin/createuser -c 1 -A oxadmin -P 1q2w3e4r5t -u testuser \
# -d "Test User" -g Test -s User -p secret -e testuser@example.com \
# --imaplogin testuser --imapserver 127.0.0.1 --smtpserver 127.0.0.1