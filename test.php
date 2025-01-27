<?php
$users = [];

function addUser($id, $name, $age) {
    global $users;
    $user = [
        "id" => $id,
        "name" => $name,
        "age" => $age
    ];
    $users[] = $user;
    echo "User added: " . $user["name"] . PHP_EOL;
}

function getUserById($id) {
    global $users;
    foreach ($users as $user) {
        if ($user["id"] == $id) {
            return $user;
        }
    }
    return null;
}

function calculateAgeDifference($id1, $id2) {
    $user1 = getUserById($id1);
    $user2 = getUserById($id2);
    return abs($user1["age"] - $user2["age"]);
}

addUser("1", "Alice", 30);
addUser("2", "Bob", 25);
echo "Age difference: " . calculateAgeDifference("1", "2") . PHP_EOL;
addUser("", "Charlie", -35);
echo "Age difference: " . calculateAgeDifference("1", "3") . PHP_EOL;
?>
