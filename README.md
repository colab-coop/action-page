![Action-Page Logo](content/assets/img/logo.png)

# Action Page

Action Page is a boilerplate for creating compelling, super-fast one-page action
landings for Action Network campaigns using just HTML, CSS and AWS.

## Installing

Run `git clone https://github.com/colab-coop/action-page.git` to download this
git repository.

Be sure to copy the `config-dev.js` file to `config.js` and customize as necessary.

## Prerequisites

From the root of the project run `npm install` to set up the project. You'll
want to have npm (the Node Package Manager) installed. If you don't have node
or npm, https://github.com/creationix/nvm is a good way to install them. Also be
sure you have gulp installed globally (run `npm install -g gulp` if you don't).

## Customizing Action Page for your project

The page content is located in the `/content` directory. The markdown (.md) files
are the main content files, so the easiest way to edit the content is to edit
those files. If you don't need one of the files, feel free to leave it blank.

If you need more customization, specifically around the Facebook / Twitter /
Action Network integrations, there are some .pug and .html files in
`/content/includes` you may want to take a look at.

Check `config.js`, the file you copied from `config-dev.js`. You will want to
customize the values for your project.

`src/index.pug` is the main template, where all the other content is assembled.

## Editing page style and header image

An easy way to customize the theme of your site is to edit the RGB colors and
main banner image (hero) as found in `/content/assets/css/base/variables.css`
Note that the main logo image is defined in the `config.js` file.

For more advanced CSS customization, `src/assets/css` holds CSS files that are
processed via PostCSS, including local imports and CSSNext.

## Editing javascript

If you wish to add/edit custom javascript for the page, see `src/assets/js/main.js`.

## Developing

Run `gulp` to run the default task, which will build all css and html and watch
for changes to any files. It also will start a local server at
http://localhost:CONFIG.PORT/ that you can use to preview, and will minimize any image
assets automatically.

## Deploying

Run `gulp deploy` to build the CSS for production and publish to AWS. You'll need
to have AWS credentials with the iam permissions in `aws/iam-permissions.json`
customized to your project.

## Updating the SSL cert

If you haven't, install https://github.com/dlapiduz/certbot-s3front.

I found the best way to do this was by setting up a virtualenv and then
running this command to install (on a Mac with homebrew openssl):

```
env LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install certbot-s3front
```

You can then run `sudo certbot.sh` and it should take care of everything,
assuming you have customized it for your project.
