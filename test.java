import java.util.ArrayList;
import java.util.List;

public class TaskManager {
    static List<Task> tasks = new ArrayList<>();

    public static void main(String[] args) {
        addTask("Task 1", "First task description");
        addTask("Task 2", "Second task description");
        deleteTask(3);
        getTask(1);
        calculate(10, 0);
    }

    public static void addTask(String title, String description) {
        Task task = new Task(tasks.size() + 1, title, description);
        tasks.add(task);
        System.out.println("Task added: " + task);
    }

    public static void getTask(int id) {
        for (Task task : tasks) {
            if (task.getId() == id) {
                System.out.println("Task found: " + task);
                return;
            }
        }
        System.out.println("Task not found");
    }

    public static void deleteTask(int id) {
        tasks.removeIf(task -> task.getId() == id);
        System.out.println("Task deleted: " + id);
    }

    public static void calculate(int a, int b) {
        int result = a / b;
        System.out.println("Result: " + result);
    }
}

class Task {
    private int id;
    private String title;
    private String description;

    public Task(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
