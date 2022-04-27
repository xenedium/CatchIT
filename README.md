# CatchIT
## Visit at [https://catchit.shop](https://catchit.shop)


# Steps :
- Make a copy of the ```.env.example```  file and rename it to ```.env.example```
- Create and fill github secrets with the corresponding values

# Description :

### This repository's subject will change as we decide which one will be chosen, currently it's a working boilerplate django-react app


# Infos :
- ### For each commit in this repository (or internal pull request) the commited code will pass through a linter then some tests to see if the code can be safely deployed.
- ### In these series of tests the required dependencies like python 3.10 and node modules will be installed, if successful the React App will be built and the moved into the static directory using [collectstatic](https://docs.djangoproject.com/en/4.0/ref/contrib/staticfiles/#django-admin-collectstatic) and then the ```./manage check --deploy``` will be run to see if the app is correctly setup for deployement
- ### If the linter and test workflow succeeds the code will go into production and will automatically be deployed to heroku.
- ### This CI was achieved using github actions.
- ### To see more about this check the [lint-build-deploy.yml](https://github.com/xenedium/django-react-boilerplate/blob/master/.github/workflows/lint-build-deploy.yml) file.
- ### Click [here](https://github.com/xenedium/django-react-boilerplate/actions/runs/2205077387) to see a run example.