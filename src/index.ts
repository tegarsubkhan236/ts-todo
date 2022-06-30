import {v4 as uuidV4} from 'uuid'

type Task = {
  id: string, 
  title:string, 
  completed:boolean, 
  createdAt:Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("todo-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#todo-input")
const tasks:Task[] = loadTask()
tasks.forEach(addNewTodoItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask : Task = {
    id: uuidV4(),
    title: input.value,
    completed: true,
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTask()

  addNewTodoItem(newTask)
  input.value = ""
})

function addNewTodoItem(task : Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    console.log(task.completed);
    saveTask()
  })

  checkbox.type = "checkbox"
  checkbox.checked = task.completed

  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTask(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTask(): Task[]{
  const taskJSON = localStorage.getItem("TASKS")
  // const taskJSON = localStorage.clear()
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}