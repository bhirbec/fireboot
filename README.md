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

## Create Your Projects

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

## Create Firebase configs

From the Firebase console copy/paste the Staging and Production configurations in the following files:
- `config/web.prod.json`
- `config/web.staging.json`

Expected format:
```
{
  "apiKey": "<your-key>",
  "authDomain": "<your-domain>",
  "databaseURL": "<your-db-url>",
  "projectId": "<your-project-id>",
  "storageBucket": "<your-bucket>",
  "messagingSenderId": "<your-sender-id>"
}
```

For more informations, please read ("Add Firebase to your JavaScript Project")[https://firebase.google.com/docs/web/setup] in Firebase documentation.

# Deploy Static Web Site

## Staging

```
$ sh ./deploy.sh
```

You'll be prompted to deploy on 'staging' or 'prod'.
