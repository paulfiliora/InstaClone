const express = require('express');

let app = express();

const router = express.Router();

const instaApp = require('./instaApp')

const db = require('sqlite');
const DB_NAME = './database.sqlite';


const parser = require('body-parser');
router.use(parser.json())

// router.use((req, res, next) => {
// 	console.log("in the use")
// 	let args = {};
// 	for (const prop in req.body) {
// 		// console.log(prop, req.body[prop]);
// 		args['$' + prop] = req.body[prop];
// 	}
// 	req.body = args;
// 	next();
// })

// Get all users + their activity
router.get('/users', (req, res, next) => {
	instaApp.getUsers(req, res)
	// next(data);
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

<<<<<<< HEAD
// Get a specified user ## url feeds user_id
router.get('/user/:user_id', (req, res, next) => {
	const id = parseInt(req.params.user_id, 10);
=======
// Get a specified user via user.id + their activity
router.get('/user/:user_id', (req, res, next) => {
	const id = parseInt(req.params.user_id, 10);
	console.log(id)
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
	instaApp.getUser(id)
	    .then((data) => {
	        // SocketInst.broadcast('LOAD_BUFFER');
	        res.header('Content-Type', 'application/json');
	        res.send({
	            user: data,
	            numResults: data.length
		        });
		    })
	    .catch((e) => {
	        console.log(e)
	        res.status(401);
    });
});

<<<<<<< HEAD
// Get a specified post ## url feeds post_id
router.get('/post/:post_id', (req, res, next) => {
	const id = parseInt(req.params.post_id, 10);
	instaApp.getPost(id)
	    .then((data) => {
	        // SocketInst.broadcast('LOAD_BUFFER');
	        res.header('Content-Type', 'application/json');
	        res.send({
	            user: data,
	            numResults: data.length
		        });
		    })
	    .catch((e) => {
	        console.log(e)
	        res.status(401);
    });
});

// get users that $user_id follows
router.get('/:user_id/followedusers', (req, res) => {
	const id = parseInt(req.params.user_id, 10);
=======
// get users that $user_id follows
router.get('/:follower_id/followedusers', (req, res) => {
	const id = parseInt(req.params.follower_id, 10);
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
	instaApp.getFollowed(id)
    .then((data) => {
        // SocketInst.broadcast('LOAD_BUFFER');
        res.header('Content-Type', 'application/json');
        res.send({
            followed_users: data,
            numResults: data.length
        });
    })
    .catch((e) => {
        console.log(e)
        res.status(401);
    });
});

<<<<<<< HEAD
// create a post. ##url feeds the user_id + followed_id. req targets posts table columns
=======
// create a post
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
router.post('/:user_id/post', (req, res, next) => {
	let args = {};
    for (const prop in req.body) {
        args['$' + prop] = req.body[prop];
    }
    req.body = args;
    const user_id = parseInt(req.params.user_id, 10);
	instaApp.createPost(user_id, req.body)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ post: data });
        })
        .catch((e) => {
        	console.log(e)
            res.status(401);
        });
});

<<<<<<< HEAD
// Follow a user ##url feeds the user_id + followed_id.
router.post('/:user_id/follow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.followed_id, 10);
=======
// Follow a user
router.post('/:user_id/follow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.follower_id, 10);
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
	instaApp.followUser(user_id, followed_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
            	followed_users: data,
            	numResults: data.length
        	});
        })
        .catch((e) => {
        	console.log(e)
            res.status(401);
        });
});

<<<<<<< HEAD
// Edit a post ##url feeds the user_id + post_id. req  posts table column 'descr'
router.put('/:user_id/update_post/:post_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const post_id = parseInt(req.params.post_id, 10);
    const updatedText = req.body.descr

	instaApp.updatePost(user_id, post_id, updatedText)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
            	update: data,
=======
// Edit a post
router.put('/:user_id/follow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.follower_id, 10);
	instaApp.followUser(user_id, followed_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
            	followed_users: data,
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
            	numResults: data.length
        	});
        })
        .catch((e) => {
        	console.log(e)
            res.status(401);
        });
});

<<<<<<< HEAD
// Delete a post ##url feeds the user_id + post_id.
router.delete('/:user_id/delete_post/:post_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const post_id = parseInt(req.params.post_id, 10);
	instaApp.deletePost(user_id, post_id)
=======
// Delete a post
router.delete('/:user_id/:post_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const post_id = parseInt(req.params.follower_id, 10);
	instaApp.followUser(user_id, post_id)
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
            	followed_users: data,
            	numResults: data.length
        	});
        })
        .catch((e) => {
        	console.log(e)
            res.status(401);
        });
});

<<<<<<< HEAD
// Unfollow a user ##url feeds the user_id + followed_id.
router.delete('/:user_id/unfollow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.followed_id, 10);
	instaApp.unfollow(user_id, followed_id)
=======
// Unfollow a user
router.delete('/:user_id/unfollow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.follower_id, 10);
	instaApp.followUser(user_id, followed_id)
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
            	followed_users: data,
            	numResults: data.length
        	});
        })
        .catch((e) => {
        	console.log(e)
            res.status(401);
        });
});



// router.use((req, res) => {
// 		res.header('Content-Type', 'application/json');
//         res.send({
//            	followed_users: data,
//            	numResults: data.length
//         });
// 	.catch((e) => {
// 		console.log(e)
// 		res.status(401);
// 	});
// });

// Promise.resolve()
// 	.then(() => db.open(DB_NAME, {
// 		Promise
// 	}))
// 	// .then(() => db.migrate({ force: 'last' }))
// 	.then(() => app.listen(port))
// 	.then(() => {
// 		console.log(`Server started on port ${port}`)
// 	})
// 	.catch(err => console.error(err.stack))

module.exports = router;