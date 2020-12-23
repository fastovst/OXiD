FROM debian:buster

RUN apt update && apt upgrade -y && apt install -y wget gnupg ca-certificates sudo netcat
RUN wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - && \
wget -qO - http://software.open-xchange.com/oxbuildkey.pub | apt-key add -

COPY entrypoint.sh /entrypoint.sh
COPY configs/adoptopenjdk.list /etc/apt/sources.list.d/adoptopenjdk.list
COPY configs/open-xchange.list /etc/apt/sources.list.d/open-xchange.list

RUN apt update && apt install -y open-xchange open-xchange-authentication-database \
open-xchange-grizzly open-xchange-admin open-xchange-appsuite \
open-xchange-appsuite-backend open-xchange-appsuite-manifest

RUN echo 'open-xchange ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

WORKDIR /opt/open-xchange
USER open-xchange

ENTRYPOINT ["/entrypoint.sh"]