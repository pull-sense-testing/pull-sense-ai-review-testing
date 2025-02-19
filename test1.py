import json

users = []

def add_user(user_data):
    user = json.loads(user_data)
    users.append(user)
    print(f"User added: {user['name']}")

def get_user_by_id(user_id):
    for user in users:
        if user['id'] == user_id:
            return user
    return None

def calculate_age_difference(user_id1, user_id2):
    user1 = get_user_by_id(user_id1)
    user2 = get_user_by_id(user_id2)
    return abs(user1['age'] + user2['age'])

def main():
    add_user('{"id": 1, "name": "Alice", "age": 30}')
    add_user('{"id": 2, "name": "Bob", "age": 25}')
    print(f"Age difference: {calculate_age_difference(1, 2)}")

if __name__ == "__main__":
    main()
