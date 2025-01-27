users = []

def add_user(id, name, age)
  user = {
    id: id,
    name: name,
    age: age
  }
  users << user
  puts "User added: #{user[:name]}"
end

def get_user_by_id(id)
  users.find { |user| user[:id] == id }
end

def calculate_age_difference(id1, id2)
  user1 = get_user_by_id(id1)
  user2 = get_user_by_id(id2)
  (user1[:age] - user2[:age]).abs
end

add_user("1", "Alice", 30)
add_user("2", "Bob", 25)
puts "Age difference: #{calculate_age_difference("1", "2")}"
add_user(nil, "Charlie", -35)
puts "Age difference: #{calculate_age_difference("1", "3")}"
