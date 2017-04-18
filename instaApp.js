const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaApp = {};

// ##Get all users + their activity
instaApp.getUsers = () => {
    return db.all(`SELECT * FROM users 
                    INNER JOIN activities ON activities.user_id = users.id`)
};

// ##Get a specified user via user.id + their activity
instaApp.getUser = (user_id) => {
    return db.all(`SELECT * FROM users 
            INNER JOIN activities ON activities.user_id = users.id
            WHERE users.id = ${user_id}`)
};

//Get users that $user_id follows
instaApp.getFollowed = (follower_id) => {
    return db.all(`SELECT 
                users.first_name AS user_fname,
                users.last_name AS user_lname,
                activities.image_url AS image,
                activities.descr AS description
            FROM users
                INNER JOIN followers ON followers.user_id = users.id 
                INNER JOIN activities ON activities.user_id = users.id
            WHERE followers.follower_id = ${follower_id}`)
};

instaApp.createPost = (req) => {
    return db.run(`INSERT INTO activities (user_id, image_url, descr) values ($user_id, $image_url, $descr)`, req)
};

instaApp.followUser = () => {
    console.log("hey how ya doing")
};


module.exports = instaApp