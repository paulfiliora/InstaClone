-- UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    profile_pic TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL -- sha256 hash of the plain-text password
    -- salt TEXT NOT NULL -- salt that is appended to the password before it is hashed
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
    descr CHAR(140),
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT into users (first_name, last_name, profile_pic, email, password) VALUES ('Paul', 'Filiora','https://pbs.twimg.com/profile_images/378800000262587313/ded5133de40ef2e2f4e0815aef640c2b.jpeg', 'p@email.com', 'ppassword');
INSERT into users (first_name, last_name, profile_pic, email, password) VALUES ('Home', 'Fries', 'https://s-media-cache-ak0.pinimg.com/originals/76/62/99/76629960f3a3c5dd121c3501a605d576.jpg','h@email.com', 'epassword');
INSERT into users (first_name, last_name, profile_pic, email, password) VALUES ('Orange', 'Juice', 'https://s-media-cache-ak0.pinimg.com/originals/99/e4/1f/99e41f2691d4f4cca9bab8bda71b3427.jpg','o@email.com', 'opassword');
INSERT into users (first_name, last_name, profile_pic, email, password) VALUES ('Black', 'Coffee', 'https://s-media-cache-ak0.pinimg.com/originals/88/76/0b/88760b43d5cc8eb58838c7e3d0e8dc1b.jpg','b@email.come', 'bpassword');


INSERT into followers (user_id, followed_id) VALUES (1,2);
INSERT into followers (user_id, followed_id) VALUES (2,3);
INSERT into followers (user_id, followed_id) VALUES (3,1);

INSERT into posts (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard. Sometimes I wish I could fly!');
INSERT into posts (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard. Travel the world!');
INSERT into posts (user_id, image_url, descr) VALUES (2, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into posts (user_id, image_url, descr) VALUES (1, 'https://static.pexels.com/photos/237467/pexels-photo-237467.jpeg', 'Architecture can be so unique across the world.');
INSERT into posts (user_id, image_url, descr) VALUES (3, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');


-- DOWN

DROP TABLE users;
DROP TABLE followers;
DROP TABLE posts;