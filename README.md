# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 17:

In this section we've finally deployed our ready app to Vercel.

## Topics covered in Section 17:

- Changing the budget limitations in Angular
- Deploying app in Vercel

## Notes for the entire Section 17:

### vid.285

Angular introduces a feature called budgets, which are the file sized threshholds that are checked against your bundles. If a file size exceeds the budget, angular will stop building your project. The purpose of this limitation is to prevent you from deploying heavy files. We can increase the threshhold set by the angular. In angular.json file search budgets option. The type prop will tell the angular the type of file to apply the given budget to, maximumWarning is the max file size for which angular throws a warning, and the maximumError throws an error once the limit is reached. type: initial is for script files and type: anyComponentStyle is for stylesheets.

### vid.286

The DB rules in firebase aren't entirely secure. Change rules in firestore database. By def firebase will use write rules for all writes, creates, and deletes, unless we seperate them.

### vid.287

Vercel is a service for deploying your apps. It supports dozens of frameworks and langs out of the box, including Angular. 1st we need to config our project for vercel. By deploying our app on vercel the headers we've defined in our app won't be available. Luckily Vercel allows devs to modify the headers given by their servers. We can create a file called vercel.json for config settings.
