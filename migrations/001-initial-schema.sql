-- UP
CREATE TABLE User(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
CREATE table Follower(
    user_id INTEGER,
    follower_id INTEGER
);
CREATE table Activity(
    user_id INTEGER NOT NULL,
    activity_type_id TEXT NOT NULL,
    activity_payload NOT NULL
);

-- INSERT into user (name) VALUES ('defaultUser');

-- DOWN

DROP TABLE User;
DROP TABLE Follower;
DROP TABLE Activity;