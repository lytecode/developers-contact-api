# API for Developers contact directory.

### This api has the following endpoints:

- GET      /api/v1/developers           - This returns the list of all developers contact details
- GET      /api/v1/developers/:id       - Return a single developer's contact details by ID
- POST     /api/v1/developers           - To create a developer's contact resource
- PUT      /api/v1/developers/:id       - Modify or edit a conatct 
- DELETE   /api/v1/developers/:id       - to remove a contact

-GET      /api/v1/category/?category=frontend  - return developers contact details based on category 


#### To use this api:
1. Clone the api using this link `https://github.com/mbonubasil/developers-contact-api.git`
2. Make sure you have MongoDB installed and `mongod` is running
3. Goto the root directory and type `npm install`
4. After that, run the project using `npm start`
5. Then hit the endpoints



_Mbonu Basil_