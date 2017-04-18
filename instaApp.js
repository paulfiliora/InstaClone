const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaApp = {};

// Get all users + their activity
instaApp.getUsers = () => {
    return db.all(`SELECT * FROM users 
                    INNER JOIN activities ON activities.user_id = users.id`)
};

// Get a specified user via user.id + their activity
instaApp.getUser = (user_id) => {
    return db.all(`SELECT * FROM users 
            INNER JOIN activities ON activities.user_id = users.id
            WHERE users.id = ${user_id}`)
};

// Get users that $user_id follows
instaApp.getFollowed = (user_id) => {
    return db.all(`SELECT 
                users.first_name AS user_fname,
                users.last_name AS user_lname,
                activities.image_url AS image,
                activities.descr AS description
            FROM users
                INNER JOIN followers ON followers.followed_id = users.id 
                INNER JOIN activities ON activities.user_id = users.id
            WHERE followers.user_id = ${user_id}`)
};

// Create a post
instaApp.createPost = (user_id, req) => {
    return db.run(`INSERT INTO activities (user_id, image_url, descr) values (${user_id}, $image_url, $descr)`, req)
};

// Follow a user
instaApp.followUser = (user_id, followed_id) => {
    return db.run(`INSERT INTO followers (user_id, followed_id) VALUES (${user_id}, ${followed_id})`)
};

// Edit a post
instaApp.updatePost = (post_id, updatedText) => {
    return db.run(`UPDATE activities SET descr = ${updatedText} WHERE ID = ${post_id}`)
};

// Delete a post
instaApp.deletePost = (post_id) => {
    return db.run(`DELETE FROM activities WHERE ID = ${post_id}`)
};

// Unfollow a user
instaApp.unfollow = (user_id, followed_id) => {
    return db.run(`DELETE FROM followers WHERE user_id = ${user_id} AND followed_id = ${followed_id}`)
};

module.exports = instaApp