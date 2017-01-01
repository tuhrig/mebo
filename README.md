MEBO
====

Coursera Full Stack Web Development Capstone Project
----------------------------------------------------

This project is an academic work. 
It's my final capstone project for the **Full Stack Web Development** course on Coursera. 
Read more at: https://www.coursera.org/learn/web-development-project.

[![Build Status](https://travis-ci.org/tuhrig/mebo.svg?branch=master)](https://travis-ci.org/tuhrig/mebo)

## Introduction

- MEBO is an online message board
- You can create a board and share it's link to anyone else
- No login, no users - full collaboration

## Demo

See the running demo at:

http://mebo.mybluemix.net

## Development

Install all dependencies:

```
npm install
```

Run the app:

```
npm start
```

Run the tests:

```
npm test
```

## Deployment

The application can be deployt to a Cloud Foundry server, e.g. at IBM Bluemix.


```
cf api https://api.ng.bluemix.net
cf login
cf create-service mongodb 100 mebo-mongo
cf push
```

Show logs:

```
cf logs mebo
```


## Resources

- IBM Bluemix example: https://github.com/IBM-Bluemix/node-helloworld