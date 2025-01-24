package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"
)

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

var (
	tasks      = []Task{}
	taskMutex  sync.Mutex
	nextTaskID = 1
)

func main() {
	http.HandleFunc("/tasks", handleTasks)
	http.HandleFunc("/tasks/", handleTaskByID)

	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", nil)
}

func handleTasks(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(tasks)

	case http.MethodPost:
		var task Task
		json.NewDecoder(r.Body).Decode(&task)
		task.ID = nextTaskID
		nextTaskID++

		taskMutex.Lock()
		tasks = append(tasks, task)
		taskMutex.Unlock()

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(task)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleTaskByID(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/tasks/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		task, found := getTaskByID(id)
		if !found {
			http.Error(w, "Task not found", http.StatusNotFound)
			return
		}
		json.NewEncoder(w).Encode(task)

	case http.MethodDelete:
		taskMutex.Lock()
		index := -1
		for i, t := range tasks {
			if t.ID == id {
				index = i
				break
			}
		}
		if index == -1 {
			taskMutex.Unlock()
			http.Error(w, "Task not found", http.StatusNotFound)
			return
		}

		tasks = append(tasks[:index], tasks[index+1:]...)
		taskMutex.Unlock()

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Task deleted"))

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func getTaskByID(id int) (Task, bool) {
	for _, t := range tasks {
		if t.ID == id {
			return t, true
		}
	}
	return Task{}, false
}
