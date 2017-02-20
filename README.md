## Editing page content

The page content is located in the src/partials directory. The markdown files
are the main content includes, so the easiest way to edit the content is to edit
those files.

## Developing

From the root of the project run `npm install` to set up the buildchain. Be sure
you have gulp installed globally (run `npm install -g gulp` if you don't).

Run `gulp` to run the default task, which will build all css and html and watch
for changes to any files. It also will start a local server at http://localhost:1337/
that you can use to preview, and will minimize any image assets automatically.

* `src/index.pug` is the main template, where all the other content is assembled.
* `src/assets/js/main.js` holds custom js.
* `src/assets/css` holds CSS files that are processed via PostCSS, including local
  imports and CSSNext.

## Deploying

Run `gulp deploy` to build the CSS for production and publish to AWS. You'll need
to have AWS credentials with the iam permissions in `aws/iam-permissions.json`
attached.

## Updating the SSL cert

If you haven't, install https://github.com/dlapiduz/certbot-s3front.

I found the best way to do this was by setting up a virtualenv and then
running this command to install (on a Mac with homebrew openssl):

```
env LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install certbot-s3front
```

You can then run `sudo certbot.sh` and it should take care of everything.
