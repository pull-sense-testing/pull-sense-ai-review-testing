use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Serialize, Deserialize)]
struct Task {
    id: usize,
    title: String,
    description: String,
}

struct AppState {
    tasks: Mutex<Vec<Task>>,
    next_id: Mutex<usize>,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let data = web::Data::new(AppState {
        tasks: Mutex::new(Vec::new()),
        next_id: Mutex::new(1),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(data.clone())
            .route("/tasks", web::get().to(get_tasks))
            .route("/tasks", web::post().to(add_task))
            .route("/tasks/{id}", web::get().to(get_task_by_id))
            .route("/tasks/{id}", web::delete().to(delete_task))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn get_tasks(data: web::Data<AppState>) -> impl Responder {
    let tasks = data.tasks.lock().unwrap();
    HttpResponse::Ok().json(&*tasks)
}

async fn add_task(data: web::Data<AppState>, task: web::Json<Task>) -> impl Responder {
    let mut tasks = data.tasks.lock().unwrap();
    let mut next_id = data.next_id.lock().unwrap();

    let new_task = Task {
        id: *next_id,
        title: task.title.clone(),
        description: task.description.clone(),
    };
    *next_id += 1;
    tasks.push(new_task.clone());

    HttpResponse::Created().json(new_task)
}

async fn get_task_by_id(data: web::Data<AppState>, id: web::Path<usize>) -> impl Responder {
    let tasks = data.tasks.lock().unwrap();
    if let Some(task) = tasks.iter().find(|t| t.id == id.into_inner()) {
        HttpResponse::Ok().json(task)
    } else {
        HttpResponse::NotFound().json("Task not found")
    }
}

async fn delete_task(data: web::Data<AppState>, id: web::Path<usize>) -> impl Responder {
    let mut tasks = data.tasks.lock().unwrap();
    if let Some(pos) = tasks.iter().position(|t| t.id == id.into_inner()) {
        tasks.remove(pos);
        HttpResponse::Ok().json("Task deleted")
    } else {
        HttpResponse::NotFound().json("Task not found")
    }
}
