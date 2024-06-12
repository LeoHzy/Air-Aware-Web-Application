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
    weight INT DEFAULT 0,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

CREATE TABLE Ratings
(
    ratingID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    locationID INT,
    score INT,
    PRIMARY KEY(userID, locationID),
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);

-- Stored Procedure: Create and select all from PollutionRankTable with each city and its pollution level: High, Medium, Low.
CREATE PROCEDURE PollutionRank()
BEGIN
    DECLARE finished INT DEFAULT 0;
    DECLARE Pollution_Status VARCHAR(50);
    DECLARE total INT DEFAULT 0;
    DECLARE cityID INT;
    DECLARE cur CURSOR FOR SELECT DISTINCT p.locationID, SUM(p.mean) 
				FROM PollutionRecords p
                GROUP BY p.locationID;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
    DROP TABLE IF EXISTS PollutionRankTable;
    CREATE TABLE PollutionRankTable (cityID VARCHAR(255), pollutionStatus VARCHAR(50));
    OPEN cur;
    FETCH cur INTO cityID, total;
    REPEAT
        IF total > 20 THEN SET Pollution_Status = "High";
        ELSEIF total > 10 THEN SET Pollution_Status = "Medium";
        ELSE SET Pollution_Status = "Low";
        END IF;
        INSERT IGNORE INTO PollutionRankTable VALUES(cityID, Pollution_Status);
        FETCH cur INTO cityID, total;
            
    UNTIL finished
    END REPEAT;
    
    CLOSE cur;
    
    SELECT * FROM PollutionRankTable;
END //
DELIMITER ;

-- Stored Procedure: Create and select all from UserRankTable with each user and their active level: 0, 1, 2.
DELIMITER //
CREATE PROCEDURE UserRank()
BEGIN
    DECLARE finished INT DEFAULT 0;
    DECLARE User_Status INT DEFAULT 0;
    DECLARE total INT DEFAULT 0;
    DECLARE userID INT;
    DECLARE username VARCHAR(255);
    DECLARE cur CURSOR FOR SELECT DISTINCT u.userID, u.username, COUNT(c.commentID)
				FROM Users u
                LEFT OUTER JOIN Comments c ON u.userID = c.userID
                GROUP BY u.userID;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
    DROP TABLE IF EXISTS UserRankTable;
    CREATE TABLE UserRankTable (userID INT, username VARCHAR(255), activeLevel INT);
    OPEN cur;
    FETCH cur INTO userID, username, total;
    REPEAT
        IF total > 10 THEN SET User_Status = 2;
        ELSEIF total > 5 THEN SET User_Status = 1;
        ELSE SET User_Status = 0;
        END IF;
        INSERT IGNORE INTO UserRankTable VALUES(userID, username, User_Status);
        FETCH cur INTO userID, username, total;
            
    UNTIL finished
    END REPEAT;
    
    CLOSE cur;
    
    SELECT * FROM UserRankTable;
END //
DELIMITER ;

-- Trigger: Update weight on a comment according to its author's previous comment count before inserting it.
DELIMITER //
CREATE TRIGGER WeightOnCommentTrig
BEFORE INSERT ON Comments
FOR EACH ROW
	BEGIN
		SET @count = (SELECT COUNT(c.commentID)
					  FROM Comments c
                      WHERE c.userID = new.userID
                      GROUP BY c.commentID);
		SET @weight = 0;
		IF @count > 5 THEN SET @weight = 1;
        END IF;
        SET new.weight = @weight;
	END //
DELIMITER ;