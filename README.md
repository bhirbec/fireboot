# Introduction

This project provides a base repository that can be forked to quickly bootstrap a web-based software. It is built on top of [Firebase](https://firebase.google.com/) and [React](https://reactjs.org/). 

Our philosophy is to use 3rd-party providers as much as possible so you can focus on building your features. For instance, we use:

* [Firebase](https://firebase.google.com/): 
  * Realtime database
  * Cloud storage
  * Hosting 
  * User Authentication (with password reset)
* [Algolia](https://www.algolia.com/) for Full-text search 
* [Mailgun](https://www.mailgun.com/) to send emails 

This project is 100% JavaScript. The main reason being the great support of this language 
for all the providers we use. 

To get started, please clone `fireboot` repository :

```
$ git clone https://github.com/bhirbec/fireboot.git
$ cd fireboot
```

# Setup Firebase

Open the [Firebase Console](https://console.firebase.google.com/) and
create two projects (we will use `fireboot` as a generic example):

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

We've already initialize the directory with `firebase init` command so we can
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
