# Marvel Superhero Genie

### An app by GROUP D: [Jess](https://github.com/Key16), [Andrew](https://github.com/straightbot), [Helen](https://github.com/grace-anderson), and [Deano](https://github.com/DeanoHayne)

## Purpose
The Marvel Superhero Genie app was created collaboratively by the GROUP D team. The real-world problem the app solves is how to access top quality Marvel Superhero information with one click in one place. 

Without the Marvel Superhero Genie you need to search for info about your favourite superhero on Google and then find a quality video starring that superhero in YouTube. The Marvel Superhero app gets all its superhero information from the source of superhero truth, **[Marvel](https://www.marvel.com/)**, so the best information available to you with one click. Even better, the search minimises typing because you only need to enter the first few letters of your superhero name to get your superhero's info and video.

[Deployed Marvel Superhero Genie](https://grace-anderson.github.io/marvel-superhero-genie/)

## Project Requirements

The requirements guiding this initial build of the Marvel Superhero Genie app were:

* As a Marvel fan, I can enter one or more letters in a superhero name search so that I can see the first superhero name that matches the entered letters.
* As a Marvel fan, I can read more about the superhero returned by my search, such as their bio, so that I can learn more about that superhero.
* As a Marvel fan, I can see an image of the superhero returned by my search, so that I can learn more abut about my superhero.
* * As a Marvel fan who has completed at least one search, I can see my previous search in the app so that I can choose to repeat my previous search if I wish one click
* As a Marvel fan, I can watch the Youtube video of my superhero in the app, so that I don’t need to spend effort opening up Google or YouTube and entering another search.
* As a Marvel fan, I can choose to open the YouTube video starring the superhero on the YouTube site so that I can continue searching for and watching the superhero’s movies on Youtube.
* As a Marvel fan whose search did not get any results, I see a message and an entertaining gif so that I am informed when my search did not get  results. 

The application code is available on [GitHub](https://github.com/grace-anderson/marvel-superhero-genie)

## Technology
* HTML5
* CSS3
* JavaScript
* Marvel API
* YouTube API
* Materialize CSS library
* Local browser storage

## Features
The Marvel Superhero Genie app uses two APIs to retrieve data
1. **The Marvel API**  - The Marvel API [Marvel Data API](https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0/) is configured to: 
a. Search for the super hero name starting with any letter/s
b. Return that super hero's bio and image with the returned super hero name 
2. **The YouTube Data API** - The YouTube API [YouTube Data API](https://developers.google.com/youtube/v3/) is configured to use the superhero's name, returned from the Marvel API, to retrieve videos from the Marvel Entertainment YouTube channel. 

We used Materialize CSS library was used to format the visual display. Browser local storage stores the most recent search to display to the user. 

## Future Work

User stories planned for the future may include: 
* As a Marvel fan, I want to complete a quiz so that I find out what superhero I am and learn more about that superhero
* As a Marvel fan, I can search using several criteria to find a superhero so that I can see which superheroes meet that criteria (e.g. search by superpower, weapons, vehicle, etc …)
* As a Marvel fan, I can choose to receive more information about my searched superhero such as their stories and comics, movies they star in, their weapons, trivia and habits (etc) so that I can fulfil my curiosity about Marvel superheroes.
* As a Marvel fan, I can enter one or more letters in a superhero name search to see a list of ALL superheroes starting with that letter, so that I learn which superheroes’' names start with those letters
* As a Marvel fan whose search has received a list of superheroes, I can choose to see more the listed superheroes by clicking on their search result so that I can learn more about that superhero  
* As a Marvel fan, I can watch the Youtube video of my superhero autoplay in the app so I don’t need to click onto the video to start playing the video.

## Mock-Ups

### Mock up 1: App demonstration
The gif demonstrates the Marvel Superhero Genie application's appearance and functionality

![A Marvel fan searches for their favourite superhero. The superhero's bio and image is returned, with an official Marvel channel YouTube video staring the Marvel hero. The user can play and pause the video. In the event of leaving or refreshing the page, the previous search is notified](./assets/Marvel-Superhero-Genie.gif) 

### Mock up 2: Retrieved superhero bio, image and video

![Bio, image and video retrieved by searching for "aveng" (first letters of "avengers")](./assets/avengers-search.png)

### Mock up 3: Amusing modal when no hero found

![Amusing modal appears when search retrieves no results. Close modal by clicking "Close" or by clicking outside the modal)](./assets/marvel-superhero-genie-modal.gif)

## Contact

#### Helen G Anderson
Email: [helen.g.anderson@me.com](mailto:helen.g.anderson@me.com)
Phone: +61450010325
[GitHub](https://github.com/grace-anderson)

#### Jess Huang
[GitHub](https://github.com/Key16)

#### Dean Hay
[GitHub](https://github.com/DeanoHayne)

#### Andrew S
[GitHub](https://github.com/straightbot)
