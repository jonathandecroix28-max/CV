FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock* ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

FROM php:8.3-cli-alpine
WORKDIR /app

RUN apk add --no-cache \
    libpng-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" gd mbstring dom

COPY . .
COPY --from=vendor /app/vendor ./vendor

EXPOSE 10000
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-10000} -t ."]
