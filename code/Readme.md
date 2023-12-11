
### Project Structure
<img width="234" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/81250843/01ff889a-252f-4110-bf30-2ce456def969">

The entire repo is divided into these three directories 
1. Frontend: This directory hosts the React code for the Web UI application.
2. Backend: This directory hosts the Python/Flask code for the Server
3. Tests: This directory hosts all the UI & API test cases written in cypress

#### Frontend Code Structure
<img width="209" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/81250843/8b8579b0-4637-4a90-af81-72712e7f7b4f">

1. Assets: This directory hosts all the images & media files used on the UI
2. Components: This directory hosts all the React Components used in the project
2.1. Charts: This directory inside the Components holds all the React Components for the Dashboard/Insights page
3. Styles: This directory holds all the css files that are used to design each web page
4. Utils: This directory holds all the util code. For example,
4.1. axiosAPIUtils contains reusable functions to send GET requests to the python server, chartsUtil
4.2. chartsUtils contains reusable functions to get data to be displayed in Charts.

#### Backend Code Structure
<img width="231" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/81250843/e00bd19d-33c1-4fdb-84c0-69c379149d20">

1. configs: This directory holds the code to integrate firebase with the Flask app
2. helpers: This directory holds all the helper functions. eg. youtube_api_helper which holds functions to call the YouTubeAPI, parse the data to send it to the client
3. tests: This directory holds unit tests for the Flask code
4. app.py is the entry point for the backend server

#### Cypress Test Code Structure
<img width="238" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/81250843/5bd3ab00-4053-4826-858e-6b60dce6e0f7">

1. e2e: This directory holds all the cypress test cases
1.1. api-tests: This directory holds all the test cases to test API endpoints which are mentioned in (app.py)
1.2. ui-tests: This directory holds all the test cases to test React Components (Web Pages) which are mentioned in the (Components directory)
