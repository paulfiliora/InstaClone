const db = require('sqlite');
const DB_NAME = './database.sqlite';

const socket = require('./sqliteui/websocket');
app.use('/', express.static('./sqliteui/public', {
    'index': ['index.html']
}));

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;

const InstaCloneDB = {}

InstaCloneDB.getUsers() => {
db.all(`SELECT * FROM users 
        INNER JOIN activities ON activities.user_id = users.id`)
    .then((data) => {
        res.header('Content-Type', 'application/json');
        res.send({
            users: data
        });
    })
    .catch((e) => {
        console.log(e)
        res.status(401);
    });
});

//get users that $user_id follows
InstaCloneDB.getFollowed() => {
    const follower_ID = req.params.follower_id;
    db.all(`SELECT 
                users.first_name AS user_fname,
                users.last_name AS user_lname,
                activities.image_url AS image,
                activities.descr AS description
            FROM users
                INNER JOIN followers ON followers.user_id = users.id 
                INNER JOIN activities ON activities.user_id = users.id
            WHERE followers.follower_id = ${follower_ID}`)
    .then((data) => {
        SocketInst.broadcast('LOAD_BUFFER');
        res.header('Content-Type', 'application/json');
        res.send({
            users: data,
            numResults: data.length
        });
    })
    .catch((e) => {
        console.log(e)
        res.status(401);
    });
});

InstaCloneDB.getUser() => {
    const follower_ID = req.params.follower_id;
    db.all(`SELECT * FROM users 
            INNER JOIN activities ON activities.user_id = users.id
            WHERE users.follower_id = ${user_ID}`)
    .then((data) => {
        SocketInst.broadcast('LOAD_BUFFER');
        res.header('Content-Type', 'application/json');
        res.send({
            users: data,
            numResults: data.length
        });
    })
    .catch((e) => {
        console.log(e)
        res.status(401);
    });
});

//create a post
app.post('/:user_id/post', (req, res, next) => {
    db.all('SELECT * FROM activities')
        .then(() => {
            console.log(req.body)
            return db.run("INSERT INTO activities (user_id, image_url, descr) values ($user_id, $image_url, $descr)", req.body)
        })
        .then((user) => {

            SocketInst.broadcast('LOAD_BUFFER');
            return db.get('SELECT * FROM activities WHERE activities.id = ?', [activities.lastID])
        })
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                activities: data
            });
        })
        .catch((e) => {
            res.status(401);
        });
});

// app.post('/user', (req, res, next) => {
//     db.all('SELECT * FROM user')
//         .then(() => {
//             console.log(req.body)
//             return db.run("INSERT INTO user (name) values ($name)", req.body)
//         })
//         .then((user) => {

//             // *SUPER IMPORTANT* always broadcast to update the UI
//             SocketInst.broadcast('LOAD_BUFFER');
//             // END 

//             return db.get('SELECT * FROM user WHERE user.id = ?', [user.lastID])
//         })
//         .then((data) => {
//             res.header('Content-Type', 'application/json');
//             res.send({ user: data });
//         })
//         .catch((e) => {
//             res.status(401);
//         });
// });

// app.get('/follower/:follower_id/user', (req, res, next) => {
//             const d_ID = req.params.dept_id
//             const query = `select user.name as user_name,
//                             user.id as user_id,
//                             dept.name as dept_name,
//                             dept.id as dept_id
//                             from employee
//                             inner join user_dept on user_dept.user_id = user.id
//                             inner join dept on dept.id = employee_dept.dept_id
//                         where dept.id = ${d_ID}`;
//     db.all(query)
//         .then((data) => {
//             SocketInst.broadcast('LOAD_BUFFER');
//             res.header('Content-Type', 'application/json');
//             res.send({ data });
//         })
//         .catch((e) => {
//             console.log(e)
//             res.status(401);
//         });
// });

// app.get('/employees/:employee_id/depts', (req, res, next) => {
//     const e_ID = req.params.employee_id
//     const query = `select employee.name as employee_name,
//                             employee.id as employee_id,
//                             dept.name as dept_name,
//                             dept.id as dept_id
//                             from employee
//                             inner join employee_dept on employee_dept.user_id = employee.id
//                             inner join dept on dept.id = employee_dept.dept_id
//                         where employee.id = ${e_ID}`;
//     db.all(query)
//         .then((data) => {
//             SocketInst.broadcast('LOAD_BUFFER');
//             res.header('Content-Type', 'application/json');
//             res.send({ departments: data });
//         })
//         .catch((e) => {
//             console.log(e)
//             res.status(401);
//         });
// });

Promise.resolve()
    .then(() => db.open(DB_NAME, {
        Promise
    }))
    // .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`Server started on port ${port}`)
    })
    .catch(err => console.error(err.stack))