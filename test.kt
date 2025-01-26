import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

data class Task(val id: Int, val title: String, val description: String)

val tasks = mutableListOf<Task>()
var nextTaskId = 1

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            route("/tasks") {
                get {
                    call.respond(tasks)
                }

                post {
                    val task = call.receive<Task>()
                    val newTask = task.copy(id = nextTaskId++)
                    tasks.add(newTask)
                    call.respond(HttpStatusCode.Created, newTask)
                }

                get("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull()
                    val task = tasks.find { it.id == id }
                    if (task != null) {
                        call.respond(task)
                    } else {
                        call.respond(HttpStatusCode.NotFound, "Task not found")
                    }
                }

                delete("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull()
                    val task = tasks.find { it.id == id }
                    if (task != null) {
                        tasks.remove(task)
                        call.respond(HttpStatusCode.OK, "Task deleted")
                    } else {
                        call.respond(HttpStatusCode.NotFound, "Task not found")
                    }
                }
            }
        }
    }.start(wait = true)
}
