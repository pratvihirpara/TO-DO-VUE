import { createRouter, createWebHistory } from 'vue-router'
import CreateTodoPage from '../views/CreateTodoPage.vue'
import TaskTablePage from '../views/TaskTablePage.vue'

const routes = [
  { path: '/', component: CreateTodoPage },
  { path: '/tasks', component: TaskTablePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
