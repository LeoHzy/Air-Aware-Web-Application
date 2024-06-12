# Stage 3

# Part1:

## DDL commands for the tables:

Locations:

```sql
CREATE TABLE Locations
(
	locationID INT PRIMARY KEY,
	state VARCHAR(255),
	city VARCHAR(255)
);
```

PollutionRecords:

```sql
CREATE TABLE PollutionRecords
(
	recordID INT PRIMARY KEY,
	dates DATE,
	gas VARCHAR(255),
	unit VARCHAR(255),
	mean FLOAT,
	AQI INT,
	locationID INT,
	FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);
```

Users:

```sql
CREATE TABLE Users
(
	userID INT PRIMARY KEY,
	username VARCHAR(255),
	email VARCHAR(255),
	psword VARCHAR(255),
	locationID INT,
	FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);
```

Comments:

```sql
CREATE TABLE Comments
(
	commentID VARCHAR(255) PRIMARY KEY,
	userID INT,
	locationID INT,
	commentTime TIMESTAMP,
	content VARCHAR(255),
	FOREIGN KEY(userID) REFERENCES Users(userID),
	FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);
```

Ratings:

```sql
CREATE TABLE Ratings
(
	ratingID VARCHAR(255),
	userID INT,
	locationID INT,
	score INT,
	PRIMARY KEY(ratingID, userID, locationID),
	FOREIGN KEY(userID) REFERENCES Users(userID),
	FOREIGN KEY(locationID) REFERENCES Locations(locationID)
);
```

## Screenshots of Database & Tables:

(The name of our database is mysqldb)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%201.png)

## Screenshots of the length of the row in tables:

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%202.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%203.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%204.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%205.png)

## First Advanced Query:

### Find locations (city & state) whose average rating scores are greater than 7 out of 10 ordered by city and state as the most favorited cities for the recommendation functionality of our APP:

```sql
SELECT l.city, l.state
FROM Locations l
JOIN Ratings r ON l.locationID = r.locationID
GROUP BY l.locationID
HAVING SUM(r.score)/COUNT(r.ratingID) > 7
ORDER BY l.city, l.state
LIMIT 15;
```

### Screenshots of the top 15 rows of the result:

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%206.png)

## Second Advanced Query:

### Find the number of comments for each location in descending order of this count and ascending order of city and state to help create a ranking of mostly discussed cities in our APP:

```sql
SELECT l.city, l.state, COUNT(c.commentID) AS NumberOfComments
FROM Locations l
JOIN Comments c ON l.locationID = c.locationID
GROUP BY l.locationID
ORDER BY NumberOfComments DESC, l.city, l.state
LIMIT 15;
```

### Screenshots of the top 15 rows of the result:

![10.png](Stage%203%20b621acb464574771bed3177899de3421/10.png)

## Other Interesting Queries:

### Find the mean AQI of CO for each location and return the location name and the mean for us to visualize data and analyze the air pollution situation:

```sql
SELECT DISTINCT l.city, l.state, AVG(p.AQI) as MeanAQIofCO
FROM Locations l
JOIN PollutionRecords p ON l.locationID = p.locationID
WHERE p.gas = "CO" AND p.AQI != 0
GROUP BY p.locationID
HAVING MeanAQIofCO < 50
ORDER BY MeanAQIofCO, l.city, l.state
LIMIT 15;
```

### Screenshots of the top 15 rows of the result:

![11.png](Stage%203%20b621acb464574771bed3177899de3421/11.png)

### Find the most active users:

```sql
SELECT DISTINCT u.username, COUNT(c.commentID) AS NumberOfComments, COUNT(r.ratingID) AS NumberOFRatings 
FROM Users u
JOIN Comments c ON u.userID = c.userID
JOIN Ratings r ON u.userID = r.userID
GROUP BY u.userID, u.username
ORDER BY NumberOfComments DESC, NumberOFRatings DESC, u.username
LIMIT 15;
```

### Screenshots of the top 15 rows of the result:

![100.png](Stage%203%20b621acb464574771bed3177899de3421/100.png)

# Part2:

## Executing EXPLAIN ANALYZE on the first advance query:

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%207.png)

We tried to apply INDEXING on its three attribute state, city, locationID, yet all of the result have the same cost. 

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%208.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%209.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%2010.png)

Later we tried to index all the attribute in the Comment table, yet the cost remains unchanged. We believe this is because our query might not be written in an efficient way or we achieved max efficiency. 

## Executing EXPLAIN ANALYZE on the second advance query:

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%2011.png)

We tried to apply INDEXING on its three attribute commentID, commentTime, and content — yet all of the result have the same cost.

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%2012.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%2013.png)

![Untitled](Stage%203%20b621acb464574771bed3177899de3421/Untitled%2014.png)

Later we tried to index all the attribute in the Comment table, yet the cost remains unchanged. We believe this is because our query might not be written in an efficient way or we achieved max efficiency.
