# Instagram Clone Assignmnet - Group Project

[Assignment Instruction Page](https://medium.com/@the_taqquikarim/implement-an-instagram-clone-6bebeb51b8a1)


This is a group project to clone Instagram using SQLite, Express, and a simple CSS Frontend Framework.

## Collaborators:
Paul Filiora  [@PFiliora](https://github.com/pfiliora)

Dzhamshed Shoismatuloev   [@Dzhama](https://github.com/Dzhama)

Cynthia Elliot   [@CNElliott](https://github.com/cnelliott)

## Features:
Supports 4 core features: Authentication, Post Creation, User Following, and Activity Feed Generation.
1) Authenticating Users — allows for a user to register for, log into, and deactivate an account.
2) Creating Posts — includes uploading photos with captions, and viewing previously uploaded photos on a profile page.
3) Supporting Followers — users can navigate to another user profile page and choose to follow them and their updates.
4) Supporting Feeds — on log in, a feed is generated that contains all the activity performed by users that you have chosen to follow. So if your app contains 4 users: A, B, C, and D — if you choose to follow users A and C your feed page should display only updates from users A and C but not updates from users B and D.


## Installation Instructions
Here's how to get started through node.js and git

Clone Project

`$ git clone git@github.com:pfiliora/InstaClone.git && cd InstaClone`

Install Modules

`$ npm install`

Initiate Server

`$ npm start`

Test Log In

`test@email.com` / `password`

## API Documentation

### GET('/users/')
* Get all users + their activity

### GET ('/user/:user_id')
* Get a specified user via user.id + their activity

### GET ('/post/:post_id')
* Get a specified post ## url feeds post_id

### GET ('/:user_id/followedusers)
* Get users that $user_id follows

### POST ('/:user_id/post)
* Create a post

### POST ('/:user_id/follow/:followed_id')
* Follow a user

### PUT ('/:user_id/update/:post_id')
* Edit a post

### DELETE ('/:user_id/delete/:post_id')
* Delete a post

### DELETE ('/:user_id/unfollow/:followed_id')
* Unfollow a user

## Passport Authentication
### GET ('/auth/logout')
### POST ('/auth/login')

# FE framework
* Semantic UI

## DB Schemas
### Tables:
#### users
* ID
* email
* first_name
* last_name
* profile_pic

#### followers
* user_id
* followed_id

#### posts 
* post_id
* user_id
* activity_id
* image_url
* descr
* timestamp


## README 