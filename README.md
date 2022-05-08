# CatchIT
## Visit at [https://catchit.herokuapp.com/](https://catchit.herokuapp.com/)


# Steps :
- Make a copy of the ```.env.example```  file and rename it to ```.env```
- Create and fill github secrets with the corresponding values

# Description :

### CatchIT, a webapp for buying and selling any type of valuable items.
### Create your account and start selling right away !
### This app is an academic project still under development.

# Infos :
- ### For each commit in this repository (or internal pull request) the commited code will pass through a linter then some tests to see if the code can be safely deployed.
- ### If the linter and test workflow succeeds the code will go into production and will automatically be deployed to heroku.
- ### For commits in side branchs, only the linter and build process will be run.

# API routes documentation:

| Route|Method|Params| Description|
|------|-------|------|------------|
|```/api/users/?id=#```| GET |id: the id of the requested user profile (Required)| Returns a response containing the user profile of the provided id, will throw a bad request (400) if no id is provided or a not found (404) if no user has the id.|
|```/api/users/```|POST|(firstname, lastname, email, phone_number, password, city) (Required)|Will create a new user if the request headers doesn't contain a valid JWT, If a valid user token is provided, this route will updated the concerned user. Note: The email and phone_number fields are not changeable. Not all the fields are required if a JWT is provided only the fields that needs to be changed|
|```/api/auth-login/```|POST|(email, password) Required|Returns a valid JWT if the user is valid|
|```/api/categories/```|GET|id: the id of the category (Optional)|Returns a category name if the id is provided, if not will return all the registrated categories|
|```/api/categories/```|POST|name (Required)|Will create a new category. Note that this route is secured and a JWT (with admin privileges) needs to be provided in the headers section, will throw a forbidden (403) if the user requesting is not an admin |
|```/api/articles/```|GET|id, title, user_id, category_id (One of them is required)|Returns one or more article depending on the query, one of the params is REQUIRED if more than one is provided, only one will be taken into consideration, more filtering must be done client side.|
|```/api/articles```|POST|Not yet implemented|Not yet implemented|
