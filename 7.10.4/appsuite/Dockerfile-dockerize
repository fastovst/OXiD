FROM centos:7

ENV DOCKERIZE_VERSION v0.6.1

COPY configs/ox.repo /etc/yum.repos.d/ox.repo
COPY entrypoint.sh /entrypoint.sh

RUN rpm --import http://software.open-xchange.com/oxbuildkey.pub

RUN yum update -y --nogpgcheck && yum install -y --nogpgcheck \
    sudo wget open-xchange open-xchange-authentication-database \
    open-xchange-grizzly open-xchange-admin open-xchange-appsuite \
    open-xchange-appsuite-backend open-xchange-appsuite-manifest

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /opt/open-xchange

ENTRYPOINT ["dockerize","-wait","tcp://oxdb:3306","/entrypoint.sh"]