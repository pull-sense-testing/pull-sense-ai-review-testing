package main

import (
	"fmt"
	"math"
)

type User struct {
	ID   string
	Name string
	Age  int
}

var users []User

func addUser(id string, name string, age int) {
	user := User{ID: id, Name: name, Age: age}
	users = append(users, user)
	fmt.Printf("User added: %s\n", user.Name)
}

func getUserByID(id string) *User {
	for _, user := range users {
		if user.ID == id {
			return &user
		}
	}
	return nil
}

func calculateAgeDifference(id1 string, id2 string) int {
	user1 := getUserByID(id1)
	user2 := getUserByID(id2)
	return int(math.Abs(float64(user1.Age - user2.Age)))
}

func main() {
	addUser("1", "Alice", 30)
	addUser("2", "Bob", 25)
	fmt.Printf("Age difference: %d\n", calculateAgeDifference("1", "2"))
	addUser("", "Charlie", -35)
	fmt.Printf("Age difference: %d\n", calculateAgeDifference("1", "3"))
}
