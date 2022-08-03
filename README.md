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

| method   | url                        | body                                                                                  | description            |
| -------- | -------------------------- | ------------------------------------------------------------------------------------- | ---------------------- |
| GET      | /articles                  |                                                                                       | get articles           |
| POST\*   | /articles                  | {articles: {title: string, description: string, body: string, tagList?: string[]}}    | create article         |
| GET      | /articles/:slug            |                                                                                       | get article by slug    |
| PUT\*    | /articles/:slug            | {articles: {title?: string, description?: string, body?: string, tagList?: string[]}} | update article         |
| DELETE\* | /articles/:slug            |                                                                                       | delete article by slug |
| POST\*   | /articles/:slug/favorite   |                                                                                       | like article           |
| DELETE\* | /articles/:slug/unfavorite |                                                                                       | unlike article         |
