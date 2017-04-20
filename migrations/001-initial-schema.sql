-- UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL, -- sha256 hash of the plain-text password
    salt TEXT NOT NULL -- salt that is appended to the password before it is hashed
);
CREATE table followers(
    user_id INTEGER,
    followed_id INTEGER
);
CREATE table posts(
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    -- activity_type_id TEXT NOT NULL,
    -- activity_payload NOT NULL
    image_url TEXT NOT NULL,
    descr CHAR(140)
    -- date 
);

INSERT into users (first_name, last_name, username, password, salt) VALUES ('Paul', 'Filiora','pusername', 'ppassword', 'salad');
INSERT into users (first_name, last_name, username, password, salt) VALUES ('Emily', 'Fox','eusername', 'epassword', 'fsalad');
INSERT into users (first_name, last_name, username, password, salt) VALUES ('Orange', 'Juice','ousername', 'opassword', 'salad');
INSERT into users (first_name, last_name, username, password, salt) VALUES ('Black', 'Coffee','busername', 'bpassword', 'salad');


INSERT into followers (user_id, followed_id) VALUES (1,2);
INSERT into followers (user_id, followed_id) VALUES (2,3);
INSERT into followers (user_id, followed_id) VALUES (3,1);

INSERT into posts (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into posts (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');
INSERT into posts (user_id, image_url, descr) VALUES (2, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into posts (user_id, image_url, descr) VALUES (3, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');


-- DOWN

DROP TABLE users;
DROP TABLE followers;
DROP TABLE posts;