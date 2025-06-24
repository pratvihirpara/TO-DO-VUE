<template>
  <div>
    <table class="todo-table" ref="table">
      <thead>
        <tr class="table-header">
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            :style="{ width: column.width + 'px' }"
            ref="headers"
          >
            <div class="header-content">
              <span class="header-label">{{ column.label }}</span>
              <div
                class="resize-handle"
                @mousedown="startResize(index, $event)"
                @touchstart="startResize(index, $event)"
              ></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          class="table-row"
          :style="{ backgroundColor: todo.color }"
          :class="{
            'completed-row': todo.status === 'Completed',
            'hover-effect': todo.status !== 'Completed'
          }"
        >
          <td v-for="column in columns" :key="column.key" 
              :style="{ width: column.width + 'px' }">
            <template v-if="column.key === 'status'">
              <span class="status-badge" :class="todo.status.toLowerCase()">
                {{ todo.status }}
              </span>
            </template>
            <template v-else-if="column.key.includes('Date')">
              <span class="date-cell">
                {{ formatDate(todo[column.key as keyof TodoItem] as string) }}
              </span>
            </template>
            <template v-else-if="column.key === 'description'">
              <div class="description-cell" v-html="todo.description"></div>
            </template>
            <template v-else>
              <span class="cell-content">
                {{ todo[column.key as keyof TodoItem] }}
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, nextTick } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { format } from 'date-fns'

interface TodoItem {
  id: number
  name: string
  email: string
  description: string
  color: string
  status: string
  assignedDate: string
  completedDate: string
}

interface TableColumn {
  key: string
  label: string
  width: number
}

const todoStore = useTodoStore()

const table = ref<HTMLTableElement | null>(null)
const headers = ref<(HTMLTableCellElement | null)[]>([])
const columns = ref<TableColumn[]>([
  { key: 'name', label: 'Name', width: 180 },
  { key: 'email', label: 'Email', width: 220 },
  { key: 'description', label: 'Description', width: 320 },
  { key: 'status', label: 'Status', width: 140 },
  { key: 'assignedDate', label: 'Assigned Date', width: 160 },
  { key: 'completedDate', label: 'Completed Date', width: 160 }
])

let activeIndex: number | null = null
let startX = 0
let startWidth = 0

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
}

const startResize = (index: number, e: MouseEvent | TouchEvent) => {
  activeIndex = index
  startX = 'touches' in e ? e.touches[0].clientX : e.clientX
  startWidth = headers.value[index]?.offsetWidth || 0

  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)

  e.preventDefault()
}

const handleResize = (e: MouseEvent | TouchEvent) => {
  if (activeIndex === null) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const newWidth = startWidth + clientX - startX
  if (newWidth > 50) {
    columns.value[activeIndex].width = newWidth
  }
}

const stopResize = () => {
  activeIndex = null
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
}

onMounted(() => {
  nextTick(() => {
    // Fill headers array with th e 
    headers.value = Array.from(table.value?.querySelectorAll('th') || [])
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<style scoped>
.table-container,
.table-card {
  background: transparent !important; /* Remove any background color */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
  background: #1E293B; /* Dark blue base */
  color: #f8fafc; /* Light cream text */
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.table-header {
  background: linear-gradient(135deg, #0f205a 0%, #1E3A8A 100%);
  color: white;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-header th {
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  position: relative;
  border-bottom: 2px solid #334155;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-label {
  flex-grow: 1;
}

.resize-handle {
  width: 4px;
  height: 24px;
  background: rgba(255, 255, 255, 0.4);
  cursor: col-resize;
  margin-left: 12px;
  border-radius: 3px;
  transition: background 0.2s ease;
}

.resize-handle:hover {
  background: rgba(255, 255, 255, 0.8);
}

.table-row {
  transition: all 0.2s ease;
  border-bottom: 1px solid #334155;
}

.table-row:last-child {
  border-bottom: none;
}

.hover-effect:hover {
  background: #2A3547 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.completed-row {
  background: #2A3547;
  opacity: 0.9;
}

.completed-row:hover {
  opacity: 1;
}

td {
  padding: 16px 12px;
  vertical-align: middle;
  word-break: break-word;
  border-bottom: 1px solid #334155;
}

.cell-content {
  display: block;
  padding: 4px 0;
}

.name-cell {
  font-weight: 500;
  color: #E2E8F0;
}

.email-cell {
  color: #CBD5E1;
  font-size: 0.9em;
}

.description-cell {
  color: #E2E8F0;
  max-height: 100px;
  overflow-y: auto;
  line-height: 1.5;
}

.description-cell ::v-deep p {
  margin: 0;
  padding: 4px 0;
}

.description-cell ::v-deep a {
  color: #93C5FD;
  text-decoration: none;
}

.description-cell ::v-deep a:hover {
  text-decoration: underline;
}

.date-cell {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.85em;
  color: #CBD5E1;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-badge.completed {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}

.status-badge.pending {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
}

/* Scrollbar styling */
.description-cell::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.description-cell::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.description-cell::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.description-cell::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .table-header th {
    padding: 14px 10px;
    font-size: 0.85rem;
  }
  
  td {
    padding: 12px 10px;
    font-size: 0.9rem;
  }
  
  .status-badge {
    padding: 4px 8px;
    font-size: 0.75em;
  }
}
</style>

<style>
.main-content {
  background: transparent !important; /* Remove any background color */
  /* keep other styles as needed */
}
</style>