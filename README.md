# Introduction

This project provides an initial "seed" to build a web application. It includes
packaged solutions for the following:

* Website hosting ([Firebase](https://firebase.google.com/))
* Realtime Database ([Firebase](https://firebase.google.com/))
* User Authentication ([Firebase](https://firebase.google.com/))
* Search Engine ([Algolia](https://www.algolia.com/))
* Email sending ([Mailgun](https://www.mailgun.com/))
* Dev Environment ([webpack](https://webpack.js.org/))
* Basic UI ([React](https://reactjs.org/))

The codebase is mostly JavaScript. To get started, clone `fireboot` repository :

```
$ git clone https://github.com/bhirbec/fireboot.git
$ cd fireboot
```

# Setup Firebase

Open the [Firebase Console](https://console.firebase.google.com/) and
create two projects (we will use `fireboot` as a generic project name):

* `fireboot-staging`
* `fireboot-prod`

You'll also need to install the [Firebase CLI](https://firebase.google.com/docs/cli/):
```
$ npm install -g firebase-tools
```

Sign in using your Google account:
```
$ firebase login
```

We've already initialized the directory with `firebase init` command so we can
just set the active project:

```
$ firebase use firebase-staging
```

Optionally, you can set aliases by using `firebase use --add` command. We've added
three aliases: `default`, `staging` and `prod`. 

```
user@fireboot:~/fireboot$ firebase use staging
Now using alias staging (fireboot-staging)
user@fireboot:~/fireboot$ firebase use prod
Now using alias prod (fireboot-prod)
user@fireboot:~/fireboot$ firebase use default
Now using alias default (fireboot-staging)
```

# Deploy Static Web Site

## Staging

```
$ firebase use staging
$ firebase deploy
```

## Staging

```
$ firebase use prod
$ firebase deploy
```
