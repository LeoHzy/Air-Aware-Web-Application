# Stage 2

# UML Diagram

![pt1-stage2.png](Stage%202%207ff67925c1104927af2e7d87878aad7d/pt1-stage2.png)

# Description

## Entities:

### PollutionRecord:

1. recordID: a unique identifier to distinguish between records. This should be an `int` attribute and the `primary key` for this table.
2. date: a `string` attribute, the date of the air pollution record.
3. gas: a `string` attribute, the name of the air pollutant.
4. unit: a `string` attribute, the unit of mean.
5. mean: a `float` attribute, the mean value of pollution.
6. AQI: an `int` attribute, the air quality index.
- We assume that each pollution record has a unique recordID.
- The other attributes can be identical for different pollution records.

### User:

1. userID: a unique identifier to distinguish between users. This should be an `int` attribute and the `primary key` for this table.
2. username: a `string` attribute, the username of the user.
3. email: a `string` attribute, the email address of the user.
4. password: a `string` attribute, the password for login.
- We assume that each user has a unique userID.
- The username, email, and password can be identical for different users.

### Comment:

  1. commentID: the `primary key` to identify the comment. 

1. content: a `string` attribute that contains the specific comments made by users.
2. time: a `timestamp` attribute, the date that the user created the comment.
- We assume each user can comment on each city at most once.
- Each comment might have an identical time or content.

### Rating:

1. ratingID: the `primary key` to identifying the rating.
2. score: an `int` attribute that contains the score of the city, which indicates the rating.
- We assume that users can comment on many locations.

### Location:

1. locationID:  a `primary key` to identify the location.
2. City:  a `string` attribute that contains the name of the city.
3. State: a `string` attribute that contains the name of the state to which the city belongs.
- Different cities can belong to the same state.
- There could be different cities with the same name.

## Relations

**We have one-one, one-many, and many-many included in our UML diagram.**

1. Comment — **many-to-many**
    
    `Comment` is a relation between `User` and `Location` to indicate the comments each user made on a certain city. This includes a **many-to-many relation.** Each user can comment on many different cities, and each city can have comments from different users.
    
2. Live in — **one-to-many**
    
    `Live in` is a relation between `User` and `Location` to indicate the location where the user lives. This includes a **one-to-many relation.** Each city can have multiple users as residents, and each user can only have one location to live in. However, we do have restrictions based on the following assumptions:
    
    One user can only live in one city. This will ensure that we can identify the desired records as quickly as possible.
    
3. Rate — **many-to-many**
    
    `Rate` is a relation between `User` and `Location` to indicate the rating each user made to a certain city. This includes a **many-to-many relation.** Each user can rate multiple cities, and each city can be rated by multiple users. However, we do have restrictions based on the following assumptions:
    
    One user can at most have one rating on each city. This will ensure that we can identify the desired records as quickly as possible.
    
4. At — **one-to-many**
    
    `At` is a relation between `Location` and `PollutionRecord` to indicate the location of records. This includes a **one-to-many relation.** Each location can have multiple records, and each record has exactly one location to take place.
    

# Normalization

We decided to use `3NF` because it can preserve dependencies, but we also noticed that `both BNCF and 3NF produced uniform results for all entities`. During the process, we found one dependency (City → State) transitive, which violated the rule for 3NF, so we created a new Table called Location that represented such dependency.

**The final schema adheres to the 3NF normal form as follows:**

## PollutionRecord:

### FDs:

- recordID → date, gas, unit, mean, AQI

### Minimal Basis:

- recordID → date
- recordID → gas
- recordID → unit
- recordID → mean
- recordID → AQI

## Users:

### FDs:

- userID → username, email, password

### Minimal Basis:

- userID → username
- userID → email
- userID → password

## Comment:

### FDs:

- commentID → time, content

### Minimal Basis:

- commentID → time
- commentID → content

## Rating:

### FDs:

- ratingID → score

### Minimal Basis:

- ratingID → score

## Location:

### FDs:

- locationID → city, state

### Minimal Basis:

- locationID → city
- locationID → state

# Relational Schema

### PollutionRecord

```scheme
PollutionRecord(
	recordID: INT[PK],  
	date: VARCHAR(255),
	gas: VARCHAR(255), 
	unit: VARCHAR(255),
	mean: INT, 
	AQI: INT,
  locationID: VARCHAR(255)[FK to Location.locationID]
)
```

### User

```scheme
User(
	userID: INT[PK],
	username: VARCHAR(255),
	email: VARCHAR(255),
	password: VARCHAR(255),
	locationID: INT[FK to Location.locationID]
)
```

### Location

```scheme
Location(
	locationID: INT[PK], 
	state: VARCHAR(255),
	city: VARCHAR(255)
)
```

### Comment

```scheme
Comment(
	commentID: VARCHAR(255)[PK]
	userID: INT[PK][FK to User.userID],
  locationID: VARCHAR(255)[PK][FK to Location.locationID], 
	time: TIMESTAMP, 
	content: VARCHAR(255)
)
```

### Rating

```scheme
Rating(
	ratingID: VARCHAR(255)[PK]
	userID: INT[PK][FK to Users.userID], 
  locationID: VARCHAR(255)[PK][FK to Location.locationID],  
	score: INT
)
```
