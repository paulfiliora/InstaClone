// const instaApp.db = require('sqlite');
// const DB_NAME = './database.sqlite';

const instaApp = {};

instaApp.init = function (db) {
    instaApp.db = db;
}

// Get all users + their activity
// instaApp.getUsers = () => {
//     return instaApp.db.all(`SELECT 
//                     users.id AS id,
//                     users.first_name AS firstName,
//                     users.last_name AS lastName,
//                     posts.image_url AS image,
//                     posts.descr AS description,
//                     posts.timestamp
//                 FROM users 
//                     INNER JOIN posts ON posts.user_id = users.id 
//                     ORDER BY id ASC`)
// };

instaApp.getUsers = () => {
    return instaApp.db.all(`SELECT 
                    users.id AS id,
                    users.first_name AS firstName,
                    users.last_name AS lastName
                FROM users 
                    ORDER BY id ASC`)
};

// Get a specified user via user.id + their activity
instaApp.getUser = (user_id) => {
    return instaApp.db.all(`SELECT 
                    users.first_name AS firstName,
                    users.last_name AS lastName,
                    users.profile_pic AS profile_pic,
                    posts.image_url AS image,
                    posts.descr AS description,
                    posts.timestamp
                FROM users 
                    INNER JOIN posts ON posts.user_id = users.id
                WHERE users.id = ${user_id}
                ORDER BY posts.Timestamp DESC`)
};

// Get a specified post via post.post_id
instaApp.getPost = (post_id) => {
    return instaApp.db.all(`SELECT
                    users.first_name AS firstName,
                    users.last_name AS lastName,
                    posts.image_url AS image,
                    posts.descr AS description,
                    posts.timestamp
                FROM posts
                    INNER JOIN users ON posts.user_id = users.id
                WHERE posts.post_id = ${post_id}`)
};

// Get users that $user_id follows ## this is for the feed
instaApp.getFollowed = (user_id) => {
    return instaApp.db.all(`SELECT 
                    users.first_name AS user_fname,
                    users.last_name AS user_lname,
                    users.profile_pic AS profile_pic,
                    posts.image_url AS image,
                    posts.descr AS description,
                    posts.timestamp
                FROM users
                    INNER JOIN followers ON followers.followed_id = users.id 
                    INNER JOIN posts ON posts.user_id = users.id
                WHERE followers.user_id = ${user_id}
                ORDER BY posts.timestamp DESC`)
};

//Create User
instaApp.createUser = (req) => {
    return instaApp.db.run(`INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, req.first_name, req.last_name, req.email, req.password)    
};
// Create a post
instaApp.createPost = (user_id, req) => {
    return instaApp.db.run(`INSERT INTO posts (user_id, image_url, descr) values (${user_id}, $image_url, $descr)`, req)
};

// Follow a user
instaApp.followUser = (user_id, followed_id) => {
    return instaApp.db.run(`INSERT INTO followers (user_id, followed_id) VALUES (${user_id}, ${followed_id})`)
};

// Edit a post
instaApp.updatePost = (user_id, post_id, updatedText) => {
    return instaApp.db.run(`UPDATE posts SET descr = "${updatedText}" WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Delete a post
instaApp.deletePost = (user_id, post_id) => {
    return instaApp.db.run(`DELETE FROM posts WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Unfollow a user
instaApp.unfollow = (user_id, followed_id) => {
    return instaApp.db.run(`DELETE FROM followers WHERE user_id = ${user_id} AND followed_id = ${followed_id}`)
};

module.exports = instaApp