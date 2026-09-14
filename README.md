# NexaView <img height="20" src="https://user-images.githubusercontent.com/69076784/236990283-83859a95-c9fa-4d2a-8729-4afb3900789d.png">

An All In One Web based Dashboard For News, Weathers and More...

**PRE-EOS ANNOUNCEMENT:- Our resources at Temavrix are currently diverted to other new projects and endeavours hence this Project's live deployment has now been taken offline. Only Crucial Security Updates and patches will be rolled out going forward.**

**This Is CPU-Intensive Make Sure That You're Using A Mid To High Range PC.**  
ATTENTION : This codebase has been updated in-line with Project-WrapSpeed (Upgrading of Infrasturcture and Services) for users wishing to go back to the Vanilla Js version head to: [Commit 0b9d90](https://github.com/Temavrix/NexaView/tree/0b9d90cb93b83920100099202fe27f8b99fd7efa)

##### Desktop:
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/43f29e28-65f3-4375-9e9e-0f9cf7c63064" />
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/adeddd48-1e8e-4316-a419-846cb326fbe9" />
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/b9111d56-14c8-484e-99ba-36cf1a96d223" /> 

##### Mobile:
<img width="80" alt="Image" src="https://github.com/user-attachments/assets/f561a76e-76b4-4c71-81b4-2f52e709dee4" />
<img width="80" alt="Image" src="https://github.com/user-attachments/assets/3ae38e9d-5f12-4248-b9c3-4233ef59929e" />
<img width="80" alt="Image" src="https://github.com/user-attachments/assets/91ac3634-5352-47ad-857e-3f151d88a710" />


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
- [Support Us](#support-us)
- [License](#license)


## What's New?
Here at Temavrix we are committed in keeping NexaView up-to-date and up-to-speed with the growing tech solutions, services and algorithms. Hence this new commit includes:


```
NexaView Changelogs:-

ANNOUNCEMENT:- 
For the project's future: Our resources at Temavrix are currently diverted to other new projects and endeavours hence this Project's live deployment has now been taken offline. Only Crucial Security Updates and patches will be rolled out going forward.

1. PRE-EOS [End of Service] introduction 
   [This project will start it's EOS path till end-2027]

Code Checks Manifest:-
All Checks Status: ✅
-----------------------------------------
UX (User Experience) Checks: ✅
BackEnd Code-FrontEnd UI Integration Checks: ✅
(All evaluations are done by the R&D Department)

Last Updated: 14-September-2026 18:20 HRS (Singapore Standard Time)
Publisher: Temavrix
```
Keep up-to-date with what's happening on this repository by clicking the 'Star' and 'Watch' button on the top right corner of this repository.


## Introducing NexaView
NexaView is an all-in-one web-based Dashboard to get essential day-to-day information such as current weather, weather forecast, global news headlines, store To-do tasks and more for users.   
This product is built primarily using React JS as the frontend framework, Redis for caching data and Firebase as the backend database to store and retrieve user's information. 


## Running NexaView On Your Local Computer
User shall download this repository and [Temalith](https://github.com/Temavrix/Temalith) that is used to facilate backend services. User should also initialize their own Firebase and Redis Database instances.

Once created copy the Firebase API keys and paste it in the .env file in this Nexaview codebase and Redis API keys 'REDIS_URL' in Temalith's config.env file.
Now NexaView can be exectued on you localhost by installing node.js and after initializing npm.

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
Now you can enjoy using the web-app in your browser.

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
View the calander to plan your week.   
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/28e91fb3-5382-4154-8f72-4777af72ea0a" />


3. Latest Natural Disasters:  
You can visualize recent natural disasters with an interactive globe.  
   <img width="150" alt="Image" src="https://github.com/user-attachments/assets/df8fca87-f408-41cf-85e0-df23c2bbe84b" />

4. Current Stock-Price Viewer:  
You can look up live stock prices.   
   <img width="120" alt="Image" src="https://github.com/user-attachments/assets/626b60bd-ded3-4436-826a-5f5a3c31ebd5" />



## How Your Data Is Handled With Firebase?
In NexaView only your Api-keys and your To-Do tasks are saved in the database for easy retrieval. All these information are saved under the E-Mail address or Google Gmail address or Github Authentication which can be used for registering in the login page at the start.

<img width="300" alt="Image" src="https://github.com/user-attachments/assets/fca40cd6-6d17-44a7-a115-1723d1888384" />


NOTE: For users who have logged in using Github and want to unlink their account you can head to [Authorized-OAuth-Apps](https://github.com/settings/applications) to revoke the app.

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
As this project has entered it's Pre-End-of-Support (EOS), if you run into any issues setting up or operating this program then please feel free to drop by our [issues](https://github.com/Temavrix/NexaView/issues) section and open a issue and we'll respond within 3-5 working days, Thank you for your understanding.

## Support Us
Please consider donating some money to our organization to help fund this project:  
<a href="https://buymeacoffee.com/mahadhevha" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height="30"/>
</a>

Or you can also support us in our web-app:  
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/6f37bdce-5292-4536-9156-fc0624240737" /> 

## License

IMPORTANT NOTE: Any User who are willing to Share or Re-Distribute NexaView are kindly advised to:

1. A reference to us by keeping a "(C) Temavrix" text in the 'Modified program'.

2. A link to this repository from the user's 'Modified program' README file. 

This will be helpful for us as users will know it's original source and about our startup.
Please also refer to LICENSE file for clarifications.  
Thank you for your kind co-operation :-)

NexaView Copyright (C) Temavrix 2026  
All Rights Reserved


**Built With:  <img width ="20" height="20" src="./src/pages/assets/react.svg"> + <img width="20" height="20" src="https://github.com/user-attachments/assets/06395346-45bf-4101-b176-245ab2825ca7"> + <img width="20" height="20" src="https://github.com/user-attachments/assets/8616be1a-d803-4ea7-808a-b19736af9de1"> + <img width="60" height="20" src="https://github.com/user-attachments/assets/b2ff8604-70e9-489c-9eb3-3d5d850169a3">**


Version 4.0
