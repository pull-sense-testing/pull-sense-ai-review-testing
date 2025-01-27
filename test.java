import java.util.ArrayList;
import java.util.List;

public class UserManager {
    private static List<User> users = new ArrayList<>();

    public static void addUser(String id, String name, int age) {
        User user = new User(id, name, age);
        users.add(user);
        System.out.println("User added: " + user.getName());
    }

    public static User getUserById(String id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null;
    }

    public static int calculateAgeDifference(String id1, String id2) {
        User user1 = getUserById(id1);
        User user2 = getUserById(id2);
        return Math.abs(user1.getAge() - user2.getAge());
    }

    public static void main(String[] args) {
        addUser("1", "Alice", 30);
        addUser("2", "Bob", 25);
        System.out.println("Age difference: " + calculateAgeDifference("1", "2"));
        addUser(null, "Charlie", 35);
    }
}

class User {
    private String id;
    private String name;
    private int age;

    public User(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
