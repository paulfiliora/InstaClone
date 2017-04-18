-- UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);
CREATE table followers(
    user_id INTEGER,
    follower_id INTEGER
);
CREATE table activities(
    -- id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    -- activity_type_id TEXT NOT NULL,
    -- activity_payload NOT NULL
    image_url TEXT NOT NULL,
    descr CHAR(140)
    -- date 
);

INSERT into users (first_name, last_name) VALUES ('Paul', 'Filiora');
INSERT into users (first_name, last_name) VALUES ('Emily', 'Fox');
INSERT into users (first_name, last_name) VALUES ('Orange', 'Juice');
INSERT into users (first_name, last_name) VALUES ('Black', 'Coffee');


INSERT into followers (user_id, follower_id) VALUES (1,2);
INSERT into followers (user_id, follower_id) VALUES (2,3);
INSERT into followers (user_id, follower_id) VALUES (3,1);

INSERT into activities (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into activities (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');
INSERT into activities (user_id, image_url, descr) VALUES (2, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into activities (user_id, image_url, descr) VALUES (3, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');


-- DOWN

DROP TABLE users;
DROP TABLE followers;
DROP TABLE activities;