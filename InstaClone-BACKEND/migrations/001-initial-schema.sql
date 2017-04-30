-- UP
CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
CREATE table Followers(
    user_id INTEGER,
    follower_id INTEGER
);
CREATE table Activities(
    user_id INTEGER NOT NULL,
    activity_type_id TEXT NOT NULL,
    activity_payload NOT NULL
);

-- INSERT into user (name) VALUES ('defaultUser');

-- DOWN

DROP TABLE Users;
DROP TABLE Followers;
DROP TABLE Activities;