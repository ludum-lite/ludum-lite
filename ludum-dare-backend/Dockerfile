FROM mattrayner/lamp:latest-1604

# Your custom commands
RUN git clone https://github.com/ludumdare/dairybox.git ludumdare

WORKDIR /ludumdare/www

RUN git init
RUN git remote add origin https://github.com/ludumdare/ludumdare.git
RUN git fetch
RUN git checkout -t origin/master

# RUN /ludumdare/provision/bootstrap.sh
RUN add-apt-repository ppa:builds/sphinxsearch-rel22

RUN apt-get -y update

RUN apt-get -y install \
  php7.3 \
  php7.3-dev \
  php-redis \
  php-apcu

RUN apt-get -y install \
  ffmpeg \
  imagemagick \
  pngquant \
  gifsicle \
  freeglut3 \
  webp \
  sphinxsearch

RUN echo "\nConfiguring PHP"
RUN sed -i "s/opache\.enable.*/opcache.enable = 1/" /etc/php/$PHP_VERSION/apache2/conf.d/user.ini
RUN sed -i '/mongo.so/d' /etc/php/$PHP_VERSION/apache2/conf.d/user.ini
RUN echo "session.save_handler = redis" >> /etc/php/$PHP_VERSION/apache2/conf.d/user.ini
RUN echo "session.save_path = tcp://127.0.0.1:6379" >> /etc/php/$PHP_VERSION/apache2/conf.d/user.ini

RUN echo YES | php ./src/shrub/tools/table-create

CMD ["/run.sh"]