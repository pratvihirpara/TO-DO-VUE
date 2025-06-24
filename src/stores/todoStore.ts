import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { isWithinInterval, parseISO } from 'date-fns'


interface Todo {
  id: number
  name: string
  email: string
  description: string
  color: string
  status: string
  assignedDate: string
  completedDate: string
}

interface CustomRange {
  from: string
  to: string
}

interface Filters {
  name: string
  email: string
  color: string
  status: string
  assignedRange: string
  customRange: CustomRange
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filters = ref<Filters>({
    name: '',
    email: '',
    color: '',
    status: '',
    assignedRange: '',
    customRange: {
      from: '',
      to: ''
    }
  })

  const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
      // Filter by name
      if (filters.value.name && !todo.name.toLowerCase().includes(filters.value.name.toLowerCase())) {
        return false
      }
      
      // Filter by email
      if (filters.value.email && !todo.email.toLowerCase().includes(filters.value.email.toLowerCase())) {
        return false
      }
      
      // Filter by color
      if (filters.value.color && todo.color !== filters.value.color) {
        return false
      }
      
      // Filter by status
      if (filters.value.status && todo.status !== filters.value.status) {
        return false
      }
      
      // Date range filter
      if (filters.value.assignedRange && filters.value.assignedRange !== '') {
        const assignedDate = todo.assignedDate ? parseISO(todo.assignedDate) : null
        const from = filters.value.customRange.from ? parseISO(filters.value.customRange.from) : null
        const to = filters.value.customRange.to ? parseISO(filters.value.customRange.to) : null

        if (assignedDate && from && to) {
          if (!isWithinInterval(assignedDate, { start: from, end: to })) {
            return false
          }
        }
      }
      
      return true
    })
  })

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    todos.value.push({
      id: Date.now(),
      ...todo
    })
  }

  return {
    todos,
    filters,
    filteredTodos,
    addTodo
  }
})