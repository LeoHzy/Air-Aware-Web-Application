CREATE TABLE Locations
(
    locationID INT AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(255),
    city VARCHAR(255)
);

CREATE TABLE PollutionRecords
(
    recordID INT AUTO_INCREMENT PRIMARY KEY,
    dates DATE,
    gas VARCHAR(255),
    unit VARCHAR(255),
    mean FLOAT,
    AQI INT,
    locationID INT,
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

CREATE TABLE Users
(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    psword VARCHAR(255),
    locationID INT,
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

CREATE TABLE Comments
(
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    locationID INT,
    commentTime TIMESTAMP,
    content VARCHAR(255),
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

CREATE TABLE Ratings
(
    userID INT,
    locationID INT,
    score INT,
    PRIMARY KEY(userID, locationID),
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

-- Location Inserts
INSERT INTO Locations (locationID, state, city) VALUES (1, 'Florida', 'Miami');
INSERT INTO Locations (locationID, state, city) VALUES (2, 'Illinois', 'New York City');
INSERT INTO Locations (locationID, state, city) VALUES (3, 'Florida', 'Los Angeles');
INSERT INTO Locations (locationID, state, city) VALUES (4, 'Florida', 'Miami');
INSERT INTO Locations (locationID, state, city) VALUES (5, 'Texas', 'Miami');
INSERT INTO Locations (locationID, state, city) VALUES (6, 'Illinois', 'Chicago');
INSERT INTO Locations (locationID, state, city) VALUES (7, 'New York', 'Los Angeles');
INSERT INTO Locations (locationID, state, city) VALUES (8, 'New York', 'New York City');
INSERT INTO Locations (locationID, state, city) VALUES (9, 'Illinois', 'Houston');
INSERT INTO Locations (locationID, state, city) VALUES (10, 'New York', 'Miami');
INSERT INTO Locations (locationID, state, city) VALUES (11, 'Illinois', 'Houston');
INSERT INTO Locations (locationID, state, city) VALUES (12, 'California', 'Chicago');
INSERT INTO Locations (locationID, state, city) VALUES (13, 'Texas', 'Chicago');
INSERT INTO Locations (locationID, state, city) VALUES (14, 'Texas', 'Chicago');
INSERT INTO Locations (locationID, state, city) VALUES (15, 'Florida', 'Chicago');

-- PollutionRecords Inserts
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (1, '2022-03-07', 'CO2', 'ppb', 48.68, 131, 1);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (2, '2021-01-12', 'NO2', 'µg/m³', 39.98, 265, 2);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (3, '2020-02-24', 'O3', 'ppb', 95.99, 256, 3);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (4, '2021-01-03', 'CO2', 'ppb', 15.81, 486, 4);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (5, '2020-01-22', 'CO2', 'µg/m³', 84.07, 85, 5);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (6, '2021-12-08', 'SO2', 'ppb', 10.35, 251, 6);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (7, '2020-04-01', 'CO2', 'µg/m³', 8.39, 445, 7);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (8, '2020-04-14', 'O3', 'ppm', 77.95, 259, 8);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (9, '2022-05-11', 'O3', 'ppb', 32.97, 462, 9);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (10, '2022-11-29', 'NO2', 'ppm', 46.86, 5, 10);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (11, '2022-01-20', 'O3', 'ppm', 9.84, 251, 11);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (12, '2021-10-15', 'SO2', 'ppb', 63.98, 406, 12);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (13, '2021-05-29', 'CO2', 'ppb', 18.26, 30, 13);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (14, '2021-11-30', 'O3', 'ppb', 75.08, 474, 14);
INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES (15, '2020-12-02', 'SO2', 'ppm', 52.9, 39, 15);

-- User Inserts
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (1, 'user1', 'user1@example.com', 'password1', 1);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (2, 'user2', 'user2@test.com', 'password2', 2);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (3, 'user3', 'user3@example.com', 'password3', 3);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (4, 'user4', 'user4@mail.com', 'password4', 4);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (5, 'user5', 'user5@mail.com', 'password5', 5);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (6, 'user6', 'user6@test.com', 'password6', 6);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (7, 'user7', 'user7@mail.com', 'password7', 7);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (8, 'user8', 'user8@example.com', 'password8', 8);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (9, 'user9', 'user9@test.com', 'password9', 9);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (10, 'user10', 'user10@test.com', 'password10', 10);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (11, 'user11', 'user11@mail.com', 'password11', 11);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (12, 'user12', 'user12@example.com', 'password12', 12);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (13, 'user13', 'user13@mail.com', 'password13', 13);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (14, 'user14', 'user14@example.com', 'password14', 14);
INSERT INTO Users (userID, username, email, psword, locationID) VALUES (15, 'user15', 'user15@test.com', 'password15', 15);

-- Comment Inserts
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (1, 1, 1, '2021-08-19 10:00:00', 'Needs improvement.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (2, 2, 2, '2020-11-21 10:00:00', 'Great place!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (3, 3, 3, '2021-07-23 10:00:00', 'Loved it here!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (4, 4, 4, '2021-09-27 10:00:00', 'Not so great.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (5, 5, 5, '2021-10-29 10:00:00', 'Could be better.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (6, 6, 6, '2020-04-17 10:00:00', 'Great place!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (7, 7, 7, '2020-10-25 10:00:00', 'Not so great.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (8, 8, 8, '2022-09-05 10:00:00', 'Needs improvement.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (9, 9, 9, '2022-12-02 10:00:00', 'Loved it here!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (10, 10, 10, '2020-08-30 10:00:00', 'Needs improvement.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (11, 11, 11, '2022-05-25 10:00:00', 'Great place!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (12, 12, 12, '2020-10-13 10:00:00', 'Could be better.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (13, 13, 13, '2022-06-05 10:00:00', 'Not so great.');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (14, 14, 14, '2020-10-12 10:00:00', 'Great place!');
INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES (15, 15, 15, '2020-11-23 10:00:00', 'Needs improvement.');

-- Ratings Inserts
INSERT INTO Ratings (userID, locationID, score) VALUES (1, 1, 4);
INSERT INTO Ratings (userID, locationID, score) VALUES (2, 2, 2);
INSERT INTO Ratings (userID, locationID, score) VALUES (3, 3, 5);
INSERT INTO Ratings (userID, locationID, score) VALUES (4, 4, 5);
INSERT INTO Ratings (userID, locationID, score) VALUES (5, 5, 3);
INSERT INTO Ratings (userID, locationID, score) VALUES (6, 6, 2);
INSERT INTO Ratings (userID, locationID, score) VALUES (7, 7, 2);
INSERT INTO Ratings (userID, locationID, score) VALUES (8, 8, 5);
INSERT INTO Ratings (userID, locationID, score) VALUES (9, 9, 4);
INSERT INTO Ratings (userID, locationID, score) VALUES (10, 10, 5);
INSERT INTO Ratings (userID, locationID, score) VALUES (11, 11, 4);
INSERT INTO Ratings (userID, locationID, score) VALUES (12, 12, 4);
INSERT INTO Ratings (userID, locationID, score) VALUES (13, 13, 5);
INSERT INTO Ratings (userID, locationID, score) VALUES (14, 14, 4);
INSERT INTO Ratings (userID, locationID, score) VALUES (15, 15, 2);