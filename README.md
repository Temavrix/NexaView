# NexaView <img width ="30" height="30" src="https://user-images.githubusercontent.com/69076784/236990283-83859a95-c9fa-4d2a-8729-4afb3900789d.png">

###### An All In One Web based Dashboard For News, Weathers and More...
[![Netlify Status](https://api.netlify.com/api/v1/badges/8214a672-052e-407c-9c7d-0300b4294f53/deploy-status)](https://app.netlify.com/projects/nexaview/deploys)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Temavrix/NexaView) [![Documentation Status](https://readthedocs.org/projects/ansicolortags/badge/?version=latest)](https://github.com/Temavrix/NexaView) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Temavrix/NexaView/issues)

## Our Project is now live: [NexaView](https://nexaview.netlify.app/)

**This Program Is CPU-Intensive Please Make Sure That You're Using A Mid To High Range PC.**

ATTENTION : This codebase has been updated in-line with Project-WrapSpeed (Upgrading of Infrasturcture and Services) for users wishing to go back to the Vanilla Js version head to: [Commit 0b9d90](https://github.com/Temavrix/NexaView/tree/0b9d90cb93b83920100099202fe27f8b99fd7efa)
 
<img width="250" src="https://github.com/user-attachments/assets/1cf8f51c-04bb-4969-8a1a-42e6766288bf"> <img width="250" src="https://github.com/user-attachments/assets/d3f74745-3b2a-4238-afcb-fe8bb3991094"> <img width="250" src="https://github.com/user-attachments/assets/60901731-8ed1-49cc-af7b-95c5feefb1e2">


## Table Of Contents
- [What's New?](#whats-new)
- [Introduction to NexaView](#introducing-nexaview)
- [Running NexaView On Your Computer](#running-nexaview-on-your-local-computer)
- [What APIs Should I Subscribe To?](#what-apis-should-i-subscribe-to)
   * [Where Do I Paste The APIs?](#where-do-i-paste-the-apis)
- [How Firebase Handles Your Data?](#how-your-data-is-handled-with-firebase)
   * [Private Firebase Database For Devs](#for-devs-who-want-to-have-a-private-firebase-database)
- [Other Functions Available](#other-functions-available)
- [Issues](#issues)
- [License](#license)


## What's New?
Here at Temavrix we are committed in keeping NexaView up-to-date and up-to-speed with the growing tech solutions, services and algorithms. Hence this new commit includes:


```
ANNOUNCEMENT:- 
Going forward ComDash will been renamed to NexaView 
as part of our larger rebranding initiative.  
As for the project's future: Our resources at Temavrix are diverted
to other new projects so NexaView will be recieving updates less 
often.

NexaView Changelogs:-
1. CI/CD Implementations.
2. Monthly Bug fixes, Code and Aesthetic improvements.

Code Checks Manifest:-
All Checks Status: ✅
-----------------------------------------
UX (User Experience) Checks: ✅
BackEnd Code-FrontEnd UI Integration Checks: ✅
(All evaluations are done by the R&D Department)

Last Updated: 7-September-2025 19:30 HRS (Singapore Standard Time)
Publisher: Temavrix
```
Keep up-to-date with what's happening on this repository by clicking the 'Star' and 'Watch' button on the top right corner of this webpage.


## Introducing NexaView
NexaView is an all-in-one web-based Dashboard to get essential day-to-day information such as current weather, weather forecast, global news headlines and store To-do tasks for users. This product is built primarily using React JS as the frontend framework and Firebase as the backend database to store and retrieve user's information. 


## Running NexaView On Your Local Computer
NexaView can be exectued on you localhost by installing node.js and after initializing npm, Head to pages sub-folder 
```
>>> cd NexaView
```
Then run the following command in you command line to start your localhost server.
```
>>> npm run dev
```
Once the command is executed you will get the following output. You will need to go to the localhost link (here is is http://localhost:5173/) or you can press ctrl + click on the link.
```
npm run dev

> package.json@0.0.0 dev
> vite

  VITE v6.2.6  ready in 195 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Now you can enjoy using the web-app.

## What APIs Should I Subscribe To?
Upon opening, by default you can track your To-Do tasks so it is best to activate an API. Users should then copy the API key and paste it in the respective input-bars present in the settings page (accessible through the taskbar on the left side). 

To do that users will need to head to and register for the following API services :

1. https://openweathermap.org/ : For NexaView to get current weather information and weather forecast for your city and display in WeatherCard.  
   <img width="149" src="https://github.com/user-attachments/assets/bb66c0eb-d41f-442b-bc3c-59b7380638c6"> <img width="150" src="https://github.com/user-attachments/assets/9d827f8d-ae1b-41d4-8859-04867e3392de">

2. https://gnews.io/ : For NexaView to get current news headlines for your country (chosen in the drop-down list) and display it for you in the NewsCard.   
   <img width="150" src="https://github.com/user-attachments/assets/bf297798-f784-4cfc-a90c-13a5267fcc69"> <img width="150" src="https://github.com/user-attachments/assets/a5a57409-bdce-465c-9278-633869cfcabe"> 

3. https://unsplash.com/developers : For NexaView to get a random background image which is based on your city.

   #### Where Do I Paste The APIs?
   <img width="200" src="https://github.com/user-attachments/assets/45bd5732-ae4a-447d-a390-b532d9d144c7">
   
   Users should then copy the API key and paste it in the respective input-bars present in the settings page (accessible through the taskbar on the left side).


## How Your Data Is Handled With Firebase?
In NexaView only your Api-keys and your To-Do tasks are saved in the database for easy retrieval. All these information are saved under the E-Mail address which is used for registering in the login page at the start.

<img width="250" src="https://github.com/user-attachments/assets/98e87416-f183-4b11-a7c0-af1fc56c5e22">

Once registered User's Apikeys in the settings page and To-Do list in the Taskcard will be stored in Firestore database as shown below.

<img width="500" src="https://github.com/user-attachments/assets/047b8404-70ee-41e4-b551-541939b5e178">

   #### For Devs Who Want To Have A Private Firebase Database
   For Devs who want to have a private database without storing your info on our databases you can go to [Firebase](https://firebase.google.com/) and create a project followed by adding an app.  
   Then copy the Api keys and other Project keys provided once successful registeration of the app and paste it in the .env file

   ```
   VITE_API_KEY={your api key}
   VITE_AUTH_DOMAIN={your auth domain}
   VITE_PROJECT_ID={your project id}
   VITE_STORAGE_BUCKET={your storage bucket}
   VITE_MESSAGING_SENDER_ID={your sender id}
   VITE_APP_ID={your app id}
   ```
   Enter the following code snippet in your "Rules" section of the Firestore Database.
   ```
   service cloud.firestore {
      match /databases/{database}/documents {
         match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
         }
      }
   }
   ```



## Other Functions Available
Apart from APIs to retreive information NexaView also comes with some more functionalities for users to use:-
1. Tasks-Tracker:  
NexaView allows you to track tasks which will be stored in FireBase to prevent erasing the tasks if you exit or reloaad the page.  
   <img width="100" alt="tasks" src="https://github.com/user-attachments/assets/507d6884-4077-435c-a171-5bbdaa511c27">  
   
2. Calender:  
NexaView has an in-built calander which allows you to see what day and date it is.  
   <img width="100" alt="calender" src="https://github.com/user-attachments/assets/8be73a88-4506-4e0f-9e1a-d332ce7d3b24">


## Issues
As this project is still in constant development, if you run into any issues while operating or have any suggestions or features, please feel free to drop by our [issues](https://github.com/Temavrix/NexaView/issues) section and open a issue and we'll respond within 2-4 working days, Thank you for your understanding.


## License

IMPORTANT NOTE: Any User who are willing to Share or Re-Distribute NexaView are kindly advised to:

1. A reference to us by keeping a "(C) Temavrix" text in the 'Modified program'.

2. A link to this repository from the user's 'Modified program' README file. 

This will be helpful for us as users will know it's original source and about our startup.
Please also refer to LICENSE file for clarifications.  
Thank you for your kind co-operation :-)

NexaView Copyright (C) Temavrix 2025  
All Rights Reserved

Version 3.4.2



## Built using = <img width ="30" height="30" src="./src/pages/assets/react.svg"> + <img width="30" height="30" src="https://github.com/user-attachments/assets/06395346-45bf-4101-b176-245ab2825ca7"> + <img width="30" height="30" src=https://github.com/user-attachments/assets/8616be1a-d803-4ea7-808a-b19736af9de1>
