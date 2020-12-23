FROM httpd:2.4

RUN apt update && apt upgrade -y && apt install -y wget gnupg ca-certificates && \
wget -qO - http://software.open-xchange.com/oxbuildkey.pub | apt-key add -

WORKDIR /usr/local/apache2
COPY configs/httpd.conf conf/httpd.conf
COPY configs/ox-vhost.conf conf/extra/httpd-vhosts.conf

COPY configs/open-xchange.list /etc/apt/sources.list.d/open-xchange.list
RUN apt update && apt install -y open-xchange-appsuite
RUN a2enmod proxy proxy_http proxy_balancer expires deflate headers rewrite mime setenvif lbmethod_byrequests

CMD ["httpd","-DFOREGROUND"]