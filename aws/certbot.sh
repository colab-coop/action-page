./bin/certbot --agree-tos \
--authenticator certbot-s3front:auth \
--certbot-s3front:auth-s3-bucket nosunoco.com \
--certbot-s3front:auth-s3-region us-east-1 \
--certbot-s3front:auth-s3-directory "" \
--installer certbot-s3front:installer \
--certbot-s3front:installer-cf-distribution-id E1CYKWAL96AI52 \
-d nosunoco.com
--renew-by-default --text
