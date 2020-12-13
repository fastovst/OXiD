FROM centos:7

COPY configs/ox.repo /etc/yum.repos.d/ox.repo
COPY entrypoint.sh /entrypoint.sh

RUN rpm --import http://software.open-xchange.com/oxbuildkey.pub

RUN yum update -y --nogpgcheck && yum install -y --nogpgcheck \
open-xchange open-xchange-authentication-database open-xchange-grizzly \
open-xchange-admin open-xchange-appsuite open-xchange-appsuite-backend \
open-xchange-appsuite-manifest sudo nc

RUN echo 'open-xchange ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

WORKDIR /opt/open-xchange
USER open-xchange

ENTRYPOINT ["/entrypoint.sh"]