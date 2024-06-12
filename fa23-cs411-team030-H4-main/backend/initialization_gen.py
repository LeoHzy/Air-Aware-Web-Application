import random
import datetime

# Function to generate random dates


def random_dates(start, end, n=10):
    span = end - start
    return [start + datetime.timedelta(days=random.randint(0, span.days)) for _ in range(n)]


# Constants for the data
STATES = ["New York", "California", "Texas", "Florida", "Illinois"]
CITIES = ["New York City", "Los Angeles", "Houston", "Miami", "Chicago"]
GASES = ["CO2", "SO2", "NO2", "O3"]
UNITS = ["ppm", "ppb", "µg/m³"]
USERNAMES = ["user" + str(i) for i in range(1, 16)]
EMAIL_DOMAINS = ["@example.com", "@mail.com", "@test.com"]
COMMENTS_CONTENT = ["Great place!", "Needs improvement.",
                    "Loved it here!", "Not so great.", "Could be better."]
NUM_RECORDS = 15

# Generate mock data
start_date = datetime.date(2020, 1, 1)
end_date = datetime.date(2023, 1, 1)
random_dates_list = random_dates(start_date, end_date, NUM_RECORDS)

# Generating mock data
locations_data = [{"locationID": i, "state": random.choice(
    STATES), "city": random.choice(CITIES)} for i in range(1, NUM_RECORDS + 1)]
pollution_records_data = [{"recordID": i, "dates": random_dates_list[i-1], "gas": random.choice(GASES), "unit": random.choice(UNITS),
                           "mean": round(random.uniform(0.1, 100.0), 2), "AQI": random.randint(0, 500), "locationID": i} for i in range(1, NUM_RECORDS + 1)]
users_data = [{"userID": i, "username": f"user{i}", "email": f"user{i}{random.choice(EMAIL_DOMAINS)}",
               "psword": f"password{i}", "locationID": i} for i in range(1, NUM_RECORDS + 1)]
comments_data = [{"commentID": f"c{i}", "userID": i, "locationID": i,
                  "commentTime": random_dates_list[i-1].isoformat() + " 10:00:00", "content": random.choice(COMMENTS_CONTENT)} for i in range(1, NUM_RECORDS + 1)]
ratings_data = [{"ratingID": f"r{i}", "userID": i, "locationID": i,
                 "score": random.randint(1, 5)} for i in range(1, NUM_RECORDS + 1)]

# SQL Insert Queries
locations_inserts = "\n".join(
    [f"INSERT INTO Locations (locationID, state, city) VALUES ({d['locationID']}, '{d['state']}', '{d['city']}');" for d in locations_data])
pollution_records_inserts = "\n".join(
    [f"INSERT INTO PollutionRecords (recordID, dates, gas, unit, mean, AQI, locationID) VALUES ({d['recordID']}, '{d['dates']}', '{d['gas']}', '{d['unit']}', {d['mean']}, {d['AQI']}, {d['locationID']});" for d in pollution_records_data])
users_inserts = "\n".join(
    [f"INSERT INTO Users (userID, username, email, psword, locationID) VALUES ({d['userID']}, '{d['username']}', '{d['email']}', '{d['psword']}', {d['locationID']});" for d in users_data])
comments_inserts = "\n".join(
    [f"INSERT INTO Comments (commentID, userID, locationID, commentTime, content) VALUES ('{d['commentID']}', {d['userID']}, {d['locationID']}, '{d['commentTime']}', '{d['content']}');" for d in comments_data])
ratings_inserts = "\n".join(
    [f"INSERT INTO Ratings (ratingID, userID, locationID, score) VALUES ('{d['ratingID']}', {d['userID']}, {d['locationID']}, {d['score']});" for d in ratings_data])

(locations_inserts, pollution_records_inserts,
 users_inserts, comments_inserts, ratings_inserts)
