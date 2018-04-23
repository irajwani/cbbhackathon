# cbbhackathon - "Professor Know-It-All"
<img src="/img/Logo .png" alt="Great picture"/> 

## The following project by Ariel Soares, Tucker Barber, Imad Rajwani and Senyo Ohene won at the 2018 ColbyBatesBowdoin Hackathon.
## The motivation was to create a system that allows Professors to review what terms their students find to be difficult. 

The general flow is as follows:
- Person is reading textbook like 'Introductory essential biology'and encounters a page with a host of new concepts and terms.
- Open the app on your phone and take a picture of that page.
- Google's cloud vision API extracts all the text from the page. 
- Google's natural language API parses that text to find important keywords and their respective salience scores.
- A modal pops up on the camera screen with the text, and important keywords are highlighted.
- This data is pushed to a Firebase real time DB.
- Firebase updates words encountered in the past by incrementing their frequency of occurence.
- Then aggregare information is charted with PlotlyJS on site made with ReactJS which serves as the professor/teacher's portal of information.
- Swipe modal to left to close it and cotinue taking pictures.

The following screenshots demonstrate this process. The relevant code is in components/camera.js.
<img src="/img/home.png" /> 
<img src="/img/IMG-0692.PNG" /> 
<img src="/img/IMG-0693.PNG" /> 
<img src="/img/IMG-0694.PNG" /> 
<img src="/img/Teachers.png" /> 
