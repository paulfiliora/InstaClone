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

//Create a post 
//Needs to be adapted to grab user_id via session
// instaApp.createPost = (req) => {
//     let args = {};
//      for (const prop in req.body) {
//          args['$' + prop] = req.body[prop];
//      }
//      req.body = args;
//      console.log(args)
//     return db.run("INSERT INTO activities (user_id, image_url, descr) values ($user_id, $image_url, $descr)", req.body)
//     console.log("did the insert")
//              .then((user) => {

// //             SocketInst.broadcast('LOAD_BUFFER');
//             return db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
//         })

        // .then(() => {
        //     console.log("at step 2 app.js")
        //     console.log(user_id)
        //     return db.run("INSERT INTO activities (user_id, image_url, descr) values ($user_id, $image_url, $descr)", req.body)
        //     console.log("at step 2.5 app.js")
        // })
        // .then((user) => {
        //     console.log("at step 3 app.js")
        //     // SocketInst.broadcast('LOAD_BUFFER');
        //     return db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
        //      console.log("at step 4 app.js")
        // })
        // .then((data) => {
        //     res.header('Content-Type', 'application/json');
        //     res.send({
        //         activities: data
        //     });
        // })
        // .catch((e) => {
        //     res.status(401);
        // });
// };

// instaApp.followUser = () => {
//     console.log("hey how ya doing")
// };

// Promise.resolve()
//     .then(() => db.open(DB_NAME, {
//         Promise
//     }))
//     // .then(() => db.migrate({ force: 'last' }))
//     .then(() => app.listen(port))
//     .then(() => {
//         console.log(`Server started on port ${port}`)
//     })
//     .catch(err => console.error(err.stack))

module.exports = instaApp