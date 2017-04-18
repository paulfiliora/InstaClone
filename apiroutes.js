const express = require('express');

let app = express();

const router = express.Router();

const instaApp = require('./instaApp')

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
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

// Get a specified user via user.id + their activity
router.get('/user/:user_id', (req, res, next) => {
	const id = parseInt(req.params.user_id, 10);
	console.log(id)
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

// get users that $user_id follows
router.get('/:follower_id/followedusers', (req, res) => {
	console.log("hey")
	const id = parseInt(req.params.follower_id, 10);
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

// create a post
// router.post('/:user_id/post', (req, res, next) => {
// 	// const requestBody = req.body;
// 	instaApp.createPost(req)
//  	// .then((user) => {
//   //           // SocketInst.broadcast('LOAD_BUFFER');
//   //           return db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
//   //       })
//         .then((data) => {
//         	console.log("at step 5 route.js")
//             res.header('Content-Type', 'application/json');
//             res.send({
//                 activities: data
//             });
//         })
//         .catch((e) => {
//             res.status(401);
//         });
// });

// router.post('/:user_id/post', (req, res, next) => {
// 	    let args = {};
//      for (const prop in req.body) {
//          args['$' + prop] = req.body[prop];
//      }
//      req.body = args;
//     db.all('SELECT * FROM activities')
//         .then(() => {
//             console.log(req.body)
//             db.run("INSERT INTO activities (user_id, image_url, descr) values ($user_id, $image_url, $descr)", req.body)
//         })
//         .then((user) => {
//         	console.log("after insert")
//             // SocketInst.broadcast('LOAD_BUFFER');
//             // db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
//         })
//         .then((data) => {
//         	console.log("after where")
//             res.header('Content-Type', 'application/json');
//             res.send({ activities: data });
//         })
//         .catch((e) => {
//             res.status(401);
//         });
// });

// router.follow('/:user_id/follow', (req, res, next) => {
// 	// const requestBody = req.body;
// 	instaApp.follow(req)
//  	// .then((user) => {
//   //           // SocketInst.broadcast('LOAD_BUFFER');
//   //           return db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
//   //       })
//         .then((data) => {
//         	console.log("at step 5 route.js")
//             res.header('Content-Type', 'application/json');
//             res.send({
//                 activities: data
//             });
//         })
//         .catch((e) => {
//             res.status(401);
//         });
// });


// router.use((req, res) => {
// 		res.header('Content-Type', 'application/json');
//         res.send({ results: data });
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