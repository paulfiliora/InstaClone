const express = require('express');
const db = require('sqlite');

let app = express();
const port = 4001;

const parser = require('body-parser');
app.use(parser.json())

const DB_NAME = './database.sqlite';

const socket = require('./sqliteui/websocket');
app.use('/', express.static( 'public', {
    'index': [ 'index.html' ]
}));

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;

app.get('/users', (req, res, next) => {
    db.all('SELECT * FROM users')
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ employees: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

app.use((req, res, next) => {
    let args = {};
    for (const prop in req.body) {
        args['$' + prop] = req.body[prop];
    }
    req.body = args;
    next();
})

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
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`Server started on port ${port}`)
     })
    .catch(err => console.error(err.stack))