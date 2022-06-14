# CatchIT
## Visit at [https://catchit.herokuapp.com/](https://catchit.herokuapp.com/)


# Steps :
- Make a copy of the ```.env.example```  file and rename it to ```.env```
- Create all of these github secrets.
```
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    DATABASE_HOST
    DATABASE_NAME
    DATABASE_PASSWORD
    DATABASE_PORT
    DATABASE_USER
    DEBUG_MODE
    HEROKU_API_KEY
    HEROKU_APP
    HEROKU_EMAIL
    SECRET_KEY
```

# Description :
### An open source Django React school project that uses JWT authentication and a REST API. The topic is an e-commerce website that lets users create, edit and delete their own articles and also discover other users products.


# Infos :
- ### For each commit in this repository (or internal pull request) the commited code will pass through a linter then some tests to see if the code can be safely deployed.
- ### If the linter and test workflow succeeds the code will go into production and will automatically be deployed to heroku.
- ### For commits in side branchs, only the linter and build process will be run.
- ### This project supports image uploading, but since Heroku blocks FileSystem Syscalls, image uploading won't work in the Heroku deployed app. Fixing this issue is pretty easy, it requires a storage server like Amazon s3 or an integrated Heroku Add-on ( Bucketeer ), but since they are paid options and this is only a school project we will be using a storage server only the first week of deployment. Normally we should also put the media and other static files in the storage server but we are close to the deadline so we'll be using the S3 only for image uploading.

# API routes documentation:

| Route|Method|Params| Description|
|------|-------|------|------------|
|```/api/users/?id=#```| GET |id: the id of the requested user profile (Required)| Returns a response containing the user profile of the provided id, will throw a bad request (400) if no id is provided or a not found (404) if no user has the id.|
|```/api/users/```|POST|(firstname, lastname, email, phone_number, password, city) (Required)|Will create a new user if the request headers doesn't contain a valid JWT, If a valid user token is provided, this route will updated the concerned user. Note: The email and phone_number fields are not changeable. Not all the fields are required if a JWT is provided only the fields that needs to be changed|
|```/api/auth-login/```|POST|(email, password) Required|Returns a valid JWT if the user is valid|
|```/api/categories/```|GET|id: the id of the category (Optional)|Returns a category name if the id is provided, if not will return all the registrated categories|
|```/api/categories/```|POST|name (Required)|Will create a new category. Note that this route is secured and a JWT (with admin privileges) needs to be provided in the headers section, will throw a forbidden (403) if the user requesting is not an admin |
|```/api/articles/```|GET|id, title, seller, category_id (One of them is required)|Returns one or more article depending on the query, one of the params is REQUIRED if more than one is provided, only one will be taken into consideration, more filtering must be done client side.|
|```/api/articles```|POST|title, description, category, seller, condition, price, quantity, city, image (optional)|Will create an article if all of the fields are provided or edit an article if the id is provided (Body), returns a Bad Request (400) if one of the required fields is missing, or an Unauthorized (403) if no JWT is provided|
|```/api/validate-jwt```|GET|Authorization header|Will validate the token. Example of response payload if valid: {"status": 200, "message": "JWT token is valid"}|