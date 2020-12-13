FROM httpd:2.4

RUN apt update && apt upgrade -y

WORKDIR /usr/local/apache2
COPY configs/httpd.conf conf/httpd.conf
COPY configs/ox.conf conf/extra/httpd-vhosts.conf
COPY htdocs/appsuite htdocs/appsuite

CMD ["httpd","-DFOREGROUND"]