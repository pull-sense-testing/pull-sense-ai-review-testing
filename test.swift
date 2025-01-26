import Foundation

struct Task: Codable {
    var id: Int
    var title: String
    var description: String
}

class TaskManager {
    private var tasks: [Task] = []
    
    func addTask(title: String, description: String) -> Task {
        let newTask = Task(id: tasks.count + 1, title: title, description: description)
        tasks.append(newTask)
        return newTask
    }
    
    func getTask(by id: Int) -> Task? {
        return tasks.first { $0.id == id }
    }
    
    func deleteTask(by id: Int) -> Bool {
        if let index = tasks.firstIndex(where: { $0.id == id }) {
            tasks.remove(at: index)
            return true
        }
        return false
    }
    
    func listTasks() -> [Task] {
        return tasks
    }
}

let taskManager = TaskManager()

// Adding tasks
let task1 = taskManager.addTask(title: "Task 1", description: "Description for Task 1")
let task2 = taskManager.addTask(title: "Task 2", description: "Description for Task 2")

// Listing tasks
print("All Tasks: \(taskManager.listTasks())")

// Fetching a task
if let fetchedTask = taskManager.getTask(by: 1) {
    print("Fetched Task: \(fetchedTask)")
} else {
    print("Task not found")
}

// Deleting a task
if taskManager.deleteTask(by: 2) {
    print("Task deleted")
} else {
    print("Task not found")
}

// Listing tasks after deletion
print("Tasks after deletion: \(taskManager.listTasks())")
