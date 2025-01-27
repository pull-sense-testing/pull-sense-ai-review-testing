#include <iostream>
#include <vector>
#include <string>
#include <cmath>

class User {
public:
    std::string id;
    std::string name;
    int age;

    User(std::string id, std::string name, int age)
        : id(id), name(name), age(age) {}
};

std::vector<User> users;

void addUser(const std::string& id, const std::string& name, int age) {
    User user(id, name, age);
    users.push_back(user);
    std::cout << "User added: " << user.name << std::endl;
}

User* getUserById(const std::string& id) {
    for (auto& user : users) {
        if (user.id == id) {
            return &user;
        }
    }
    return nullptr;
}

int calculateAgeDifference(const std::string& id1, const std::string& id2) {
    User* user1 = getUserById(id1);
    User* user2 = getUserById(id2);
    return std::abs(user1->age - user2->age);
}

int main() {
    addUser("1", "Alice", 30);
    addUser("2", "Bob", 25);
    std::cout << "Age difference: " << calculateAgeDifference("1", "2") << std::endl;
    addUser("", "Charlie", -35);
    std::cout << "Age difference: " << calculateAgeDifference("1", "3") << std::endl;
    return 0;
}
