<?php
header("Content-Type: application/json");

$tasks = [];
$nextTaskId = 1;

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($requestUri[0] === 'tasks') {
    switch ($requestMethod) {
        case 'GET':
            if (isset($requestUri[1])) {
                $taskId = intval($requestUri[1]);
                $task = getTask($taskId);
                if ($task) {
                    echo json_encode($task);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Task not found"]);
                }
            } else {
                echo json_encode($tasks);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if ($input && isset($input['title']) && isset($input['description'])) {
                $newTask = addTask($input['title'], $input['description']);
                http_response_code(201);
                echo json_encode($newTask);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Invalid input"]);
            }
            break;

        case 'DELETE':
            if (isset($requestUri[1])) {
                $taskId = intval($requestUri[1]);
                if (deleteTask($taskId)) {
                    http_response_code(200);
                    echo json_encode(["message" => "Task deleted"]);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Task not found"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Task ID required"]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Method not allowed"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Invalid endpoint"]);
}

function addTask($title, $description)
{
    global $tasks, $nextTaskId;
    $newTask = [
        'id' => $nextTaskId++,
        'title' => $title,
        'description' => $description,
    ];
    $tasks[] = $newTask;
    return $newTask;
}

function getTask($id)
{
    global $tasks;
    foreach ($tasks as $task) {
        if ($task['id'] === $id) {
            return $task;
        }
    }
    return null;
}

function deleteTask($id)
{
    global $tasks;
    foreach ($tasks as $index => $task) {
        if ($task['id'] === $id) {
            array_splice($tasks, $index, 1);
            return true;
        }
    }
    return false;
}
?>
