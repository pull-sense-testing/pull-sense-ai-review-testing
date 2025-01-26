require 'sinatra'
require 'json'

tasks = []
next_task_id = 1

# Get all tasks
get '/tasks' do
  content_type :json
  tasks.to_json
end

# Add a new task
post '/tasks' do
  content_type :json
  begin
    data = JSON.parse(request.body.read)
    task = {
      id: next_task_id,
      title: data['title'],
      description: data['description']
    }
    next_task_id += 1
    tasks << task
    status 201
    task.to_json
  rescue JSON::ParserError
    status 400
    { error: 'Invalid JSON' }.to_json
  end
end

# Get a specific task
get '/tasks/:id' do
  content_type :json
  task = tasks.find { |t| t[:id] == params['id'].to_i }
  if task
    task.to_json
  else
    status 404
    { error: 'Task not found' }.to_json
  end
end

# Delete a task
delete '/tasks/:id' do
  content_type :json
  task = tasks.find { |t| t[:id] == params['id'].to_i }
  if task
    tasks.delete(task)
    { message: 'Task deleted' }.to_json
  else
    status 404
    { error: 'Task not found' }.to_json
  end
end
