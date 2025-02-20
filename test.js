const users = [];

function addUser(userData) {
    const user = JSON.parse(userData);
    users.push(user);
    console.log(`User added: ${user.name}`);
}

function getUserById(userId) {
    return users.find(user => user.id == userId);
}

function calculateAgeDifference(userId1, userId2) {
    const user1 = getUserById(userId1);
    const user2 = getUserById(userId2);

    if (!user1 || !user2) {
        console.log("One of the users does not exist");
    }

    return Math.abs(user1.age - user2.age); // No check if age is undefined
}

function main() {
    addUser('{"id": 1, "name": "Alice", "age": 30}');
    addUser('{"id": 2, "name": "Bob", "age": 25}');
    console.log("Age difference: " + calculateAgeDifference(1, 2));
    addUser({ id: 3, name: "Charlie", age: 35 }); // Incorrect input format
}

main()
