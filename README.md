# Medium resource clone

## implemented with the next tech features:

- nest
- node
- typeorm
- postgress
- typescript

## users

| method | url          | body                                                                      | description           |
| ------ | ------------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | /users       | {user: {email: string, username: string, password: string}}               | create user           |
| POST   | /users/login | {user: {email: string, password: string}}                                 | login user            |
| GET\*  | /user        |                                                                           | get current user data |
| PUT\*  | /user        | {user: {email?: string, username?: string, bio?: string, image?: string}} | get current user data |

\* requires Authorisation Header 'Token <token>'

## tags

## articles

| method   | url             | body                                                                               | description            |
| -------- | --------------- | ---------------------------------------------------------------------------------- | ---------------------- |
| POST\*   | /articles       | {articles: {title: string, description: string, body: string, tagList?: string[]}} | create article         |
| GET      | /articles/:slug |                                                                                    | get article by slug    |
| DELETE\* | /articles/:slug |                                                                                    | delete article by slug |
