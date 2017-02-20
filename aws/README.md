# Setting Up AWS Management

1. Install VirtualEnv
2. Run `source ./bin/activate`
3. Run `pip install -r requirements.txt`
4. Run `./certbot.sh`

On OS X with homebrew you may need to specify the path for the openssl libs:

1. `brew install openssl`
2. `env LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install certbot-s3front`
