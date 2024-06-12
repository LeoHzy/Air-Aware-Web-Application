import json
import random
from datetime import datetime, timedelta

# Function to write the data to a json file


def write_json(data, file_name):
    with open(file_name, 'w') as f:
        json.dump(data, f, indent=4)

# Generate mock data for each table


def generate_mock_data(num_records):
    mock_data = {
        "Locations": [],
        "PollutionRecords": [],
        "Users": [],
        "Comments": [],
        "Ratings": []
    }

    for i in range(1, num_records + 1):
        # Locations
        mock_data["Locations"].append({
            "locationID": i,
            "state": "State" + str(random.randint(1, 10)),
            "city": "City" + str(random.randint(1, 10))
        })

        # PollutionRecords
        mock_data["PollutionRecords"].append({
            "recordID": i,
            "dates": (datetime.now() - timedelta(days=random.randint(0, 365))).strftime('%Y-%m-%d'),
            "gas": "Gas" + str(random.randint(1, 5)),
            "unit": "Unit" + str(random.randint(1, 3)),
            "mean": round(random.uniform(0, 100), 2),
            "AQI": random.randint(0, 500),
            "locationID": random.randint(1, num_records)
        })

        # Users
        mock_data["Users"].append({
            "userID": i,
            "username": "user" + str(i),
            "email": "user" + str(i) + "@example.com",
            "psword": "hashed_password" + str(i),
            "locationID": random.randint(1, num_records)
        })

        # Comments
        mock_data["Comments"].append({
            "commentID": str(i),
            "userID": random.randint(1, num_records),
            "locationID": random.randint(1, num_records),
            "commentTime": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "content": "Comment content " + str(i)
        })

        # Ratings
        mock_data["Ratings"].append({
            "ratingID": str(i),
            "userID": random.randint(1, num_records),
            "locationID": random.randint(1, num_records),
            "score": random.randint(1, 5)
        })

    return mock_data


# Generate the mock data
num_records = 100
mock_data = generate_mock_data(num_records)

# Assuming you have created a 'data' folder under the 'backend' directory
# Adjust the file paths to the new "data" directory under "backend"
for table_name in mock_data:
    file_name = f"./{table_name}.json"
    write_json(mock_data[table_name], file_name)
