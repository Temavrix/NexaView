# NexaView <img width ="30" height="30" src="https://user-images.githubusercontent.com/69076784/236990283-83859a95-c9fa-4d2a-8729-4afb3900789d.png">

## Current Status : [![Netlify Status](https://api.netlify.com/api/v1/badges/8214a672-052e-407c-9c7d-0300b4294f53/deploy-status)](https://app.netlify.com/projects/nexaview/deploys)

###### An All In One Web based Dashboard For News, Weathers and More...


[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Temavrix/NexaView) [![Documentation Status](https://readthedocs.org/projects/ansicolortags/badge/?version=latest)](https://github.com/Temavrix/NexaView) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Temavrix/NexaView/issues)

## Our Project is now live: [NexaView](https://nexaview.netlify.app/)

## Built With:  <img width ="20" height="20" src="./src/pages/assets/react.svg"> + <img width="20" height="20" src="https://github.com/user-attachments/assets/06395346-45bf-4101-b176-245ab2825ca7"> + <img width="20" height="20" src="https://github.com/user-attachments/assets/8616be1a-d803-4ea7-808a-b19736af9de1"> + <img width="60" height="20" src="https://github.com/user-attachments/assets/b2ff8604-70e9-489c-9eb3-3d5d850169a3">

**This Program Is CPU-Intensive Please Make Sure That You're Using A Mid To High Range PC.**

ATTENTION : This codebase has been updated in-line with Project-WrapSpeed (Upgrading of Infrasturcture and Services) for users wishing to go back to the Vanilla Js version head to: [Commit 0b9d90](https://github.com/Temavrix/NexaView/tree/0b9d90cb93b83920100099202fe27f8b99fd7efa)

##### Desktop:
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/acb2cd97-49f1-45fd-8972-aea40672ad7c" /> 
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/bc734942-f077-45f3-9111-b736a6601f3f" /> 
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/7382748d-848f-4271-8bad-7a919e4de6ac" />

##### Mobile:
<img width="80" alt="Image" src="https://github.com/user-attachments/assets/fe379479-7911-46a0-8896-6658a3b6496e" />
<img width="80" alt="Image" src="https://github.com/user-attachments/assets/aec1af39-0981-4b63-97b2-c4165e98b417" />




## Table Of Contents
- [What's New?](#whats-new)
- [Introduction to NexaView](#introducing-nexaview)
- [Running NexaView On Your Computer](#running-nexaview-on-your-local-computer)
- [What APIs Does NexaView Use?](#what-apis-does-nexaview-use)
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
For the project's future: Our resources at Temavrix are diverted
to other new projects so NexaView will be recieving updates less 
often.

We are planning to add more UI/UX changes and soon a page to make Donations 
to help with our organisation's fundings.

NexaView Changelogs:-

QUALITY UPDATE:-

1. Typescript Support:-
1.1 Updated several files to Typescript under project WrapSpeed.

2. REDIS Updates:-
2.1 With the Successful implementation of Redis under project WrapSpeed 
    for News Headlines we have expanded it to now help users get 
    Current Weather and Forecast 
2.2 Removed the need for users to register for GNewsAPI and 
    OpenWeatherApi.

3. Multi-Factor Authentication:-
3.1 Added the option for users to Authenticate using 
    their google account to sign up and login.
3.2 Improved Sign-up and Login page.

4. UI/UX Changes:-
4.1 Improved styling and responsiveness across various components.
4.2 Improved Messaging and Signalling.
4.3 New About-Us page!!!

NOTE: README.md Will be updated in the next update

Code Checks Manifest:-
All Checks Status: ✅
-----------------------------------------
UX (User Experience) Checks: ✅
BackEnd Code-FrontEnd UI Integration Checks: ✅
(All evaluations are done by the R&D Department)

Last Updated: 13-Novemeber-2025 19:50 HRS (Singapore Standard Time)
Publisher: Temavrix
```
Keep up-to-date with what's happening on this repository by clicking the 'Star' and 'Watch' button on the top right corner of this repository.


## Introducing NexaView
NexaView is an all-in-one web-based Dashboard to get essential day-to-day information such as current weather, weather forecast, global news headlines, store To-do tasks and more for users.   
This product is built primarily using React JS as the frontend framework, Redis for caching data and Firebase as the backend database to store and retrieve user's information. 


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
> vite --host

  VITE v6.3.6  ready in 497 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.***.1.5:5173/
  ➜  press h + enter to show help
```
Now you can enjoy using the web-app.

## What APIs Does NexaView Use?
Upon opening, by default you can get Weather, Weather Forecast info, News Headlines thanks to Redis caching and also track To-Do tasks in Firebase hence it is best to activate an API to get Curated news and Live changing Background Wallpaper (If you mind about the lack of wallpapers).  

Users could copy the API key and paste it in the respective input-bars present in the settings page (accessible through the taskbar on the left side). 

### Main NexaView Features
Nexaview uses mainly these Apis to help improve User's experience :

1. https://openweathermap.org/ : If not stored in Redis previously then NexaView uses this to   get current weather information and weather forecast for your city and display in WeatherCard.  
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/1025fa05-ac6f-4e80-875a-59f921c71802" /> <img width="150" alt="Image" src="https://github.com/user-attachments/assets/95b4d882-f1bd-488b-8f35-a7122a8a4c3a" />

2. https://gnews.io/ : If not stored in Redis previously then NexaView uses this to get current news headlines for your country (chosen in the drop-down list) and display it for you in the NewsCard.   
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/cb50f616-7117-4b36-9b54-c0b4081795bf" /> <img width="150" alt="Image" src="https://github.com/user-attachments/assets/35d245f5-8d0b-414c-aca1-2d5079db5f0a" />

3. https://unsplash.com/developers : For NexaView to get a random background image which is based on your city.

   #### Where Do I Paste The APIs?
   <img width="200" alt="Image" src="https://github.com/user-attachments/assets/43a33e39-aa7d-48cf-a273-d9e332f1be6b" />
   
   Users should then copy the API key and paste it in the respective input-bars present in the settings page (accessible through the taskbar on the left side).



## Other Functions Available
Apart from APIs to retreive information NexaView also comes with some more functionalities for users to use:-
1. Tasks-Tracker:  
NexaView allows you to track tasks which will be stored in FireBase to prevent erasure of tasks if you exit or if you had reloaded the page.  
   <img width="100"  alt="Image" src="https://github.com/user-attachments/assets/2c0ad27d-d79d-43e3-8324-a954ee306e75" />
   
2. Calender:  
NexaView has an in-built calander.  
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/a9877bd8-208a-4cd2-bee1-b5a91c307b93" />

3. Latest Natural Disasters:  
You can visualize recent natural disasters with the help of a globe.  
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/df8fca87-f408-41cf-85e0-df23c2bbe84b" />

4. Current Stock-Price Viewer



## How Your Data Is Handled With Firebase?
In NexaView only your Api-keys and your To-Do tasks are saved in the database for easy retrieval. All these information are saved under the E-Mail address or Google Gmail address which is used for registering in the login page at the start.

<img width="300" alt="Image" src="https://github.com/user-attachments/assets/4d9ec621-24d4-4fff-87cd-0c28f066e432" />  

Once users had registered their Apikeys in the settings page then the user's To-Do will be stored in Firestore database as shown below.

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

Version 3.8.0
