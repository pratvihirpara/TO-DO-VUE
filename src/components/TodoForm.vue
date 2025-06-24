<template>
  <form @submit.prevent="submitTodo" class="todo-form">
    <div class="form-header">
      <div class="form-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      </div>
      <h2 class="form-title">Create New Task</h2>
      <p class="form-subtitle">Fill in the details below to create a new task</p>
    </div>
    
    <div class="form-section">
      <h3 class="section-title">Basic Information</h3>
      <div class="form-grid">
        <div class="form-group">
          <label for="name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Task Name
          </label>
          <input 
            id="name" 
            v-model="formData.name" 
            placeholder="Enter task name" 
            required 
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="email">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Assignee Email
          </label>
          <input 
            id="email" 
            v-model="formData.email" 
            placeholder="assignee@example.com" 
            type="email"
            required 
            class="form-input"
          />
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h3 class="section-title">Task Details</h3>
      <div class="form-group">
        <label>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
          Description
        </label>
        <div class="editor-container">
          <QuillEditor 
            v-model:content="formData.description" 
            theme="snow" 
            :options="editorOptions"
            contentType="html"
          />
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h3 class="section-title">Task Settings</h3>
      <div class="form-grid">
        <div class="form-group color-picker-group">
          <label>Color Label</label>
          <div class="color-picker-wrapper">
            <label
              v-for="color in colorOptions"
              :key="color"
              class="color-swatch"
              :style="{ backgroundColor: color, border: formData.color === color ? '2px solid #6366f1' : '2px solid #e2e8f0' }"
            >
              <input
                type="radio"
                v-model="formData.color"
                :value="color"
                class="color-radio"
              />
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="status">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4l3 3"></path>
            </svg>
            Status
          </label>
          <select 
            id="status" 
            v-model="formData.status" 
            class="form-select"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div class="form-grid date-grid">
        <div class="form-group">
          <label for="assignedDate">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Start Date
          </label>
          <input 
            id="assignedDate" 
            type="datetime-local" 
            v-model="formData.assignedDate" 
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="completedDate">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Completion Date
          </label>
          <input 
            id="completedDate" 
            type="datetime-local" 
            v-model="formData.completedDate" 
            class="form-input"
            :disabled="formData.status !== 'Completed'"
          />
        </div>
      </div>
    </div>
    
    <div class="form-actions">
      <button type="button" class="cancel-btn" @click="resetForm">
        Clear Form
      </button>
      <button type="submit" class="submit-btn">
        <span>Create Task</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <transition name="fade">
      <div v-if="showSuccess" class="success-message">
        Task created successfully!
      </div>
    </transition>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

interface TodoFormData {
  id?: number;
  name: string;
  email: string;
  description: string;
  color: string;
  status: 'Pending'|'Completed';
  assignedDate: string;
  completedDate: string;
}

interface EditorOptions {
  modules: {
    toolbar: (string | { [key: string]: any })[][];
  };
  placeholder: string;
}

const todoStore = useTodoStore();

const formData = reactive<TodoFormData>({
  name: '',
  email: '',
  description: '',
  color: '#6366f1',
  status: 'Pending',
  assignedDate: '',
  completedDate: ''
});

const colorOptions = [
  '#6366f1', // Indigo
  '#f59e42', // Orange
  '#10b981', // Green
  '#f43f5e', // Red
  '#fbbf24', // Yellow
  '#3b82f6'  // Blue
];

const editorOptions: EditorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  },
  placeholder: 'Enter detailed task description...',
};

const showSuccess = ref(false);

watch(
  () => formData.status,
  (newStatus) => {
    if (newStatus !== 'Completed') {
      formData.completedDate = '';
    }
  }
);

function submitTodo() {
  if (!validateForm()) {
    return;
  }

  todoStore.addTodo({
    ...formData
  });

  resetForm();
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 2000); // Hide after 2 seconds
}

function validateForm(): boolean {
  if (!formData.name.trim()) {
    alert('Please enter a task name');
    return false;
  }

  if (!formData.email.trim()) {
    alert('Please enter an email');
    return false;
  }

  if (!formData.assignedDate) {
    alert('Please select a start date');
    return false;
  }

  if (formData.status === 'Completed' && !formData.completedDate) {
    alert('Please select a completion date');
    return false;
  }

  return true;
}

function resetForm() {
  formData.name = '';
  formData.email = '';
  formData.description = '';
  formData.color = '#6366f1';
  formData.status = 'Pending';
  formData.assignedDate = '';
  formData.completedDate = '';
}
</script>

<style scoped>
.todo-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9ff;
  border-radius: 12px;
  color: #0ea5e9;
  border: 1px solid #e0f2fe;
}

.form-title {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  letter-spacing: -0.5px;
}

.form-subtitle {
  color: #64748b;
  font-size: 0.9375rem;
  margin: 0;
}

.form-section {
  margin-bottom: 1.2rem;   /* reduced from 2rem */
  padding-bottom: 1rem;    /* reduced from 1.5rem */
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  color: #334155;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem;        /* reduced from 1.5rem */
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: "";
  display: block;
  width: 4px;
  height: 16px;
  background: #6366f1;
  border-radius: 2px;
}


.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;        
  margin-bottom: 1rem;
  justify-content: center;
}

.form-grid .form-group,
.date-grid .form-group {
  max-width: 200px;
  min-width: 0;
  width: 100%;
  flex: 1 1 0;
}

.date-grid {
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .date-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .form-grid .form-group,
  .date-grid .form-group {
    max-width: 100%;
  }
}

.form-group {
  margin-bottom: 0.75rem; /* reduced from 1.25rem */
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
  font-size: 0.875rem;
}

label svg {
  flex-shrink: 0;
  color: #64748b;
}

.form-input, .form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  background-color: white;
  color: #334155;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
  opacity: 1;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-color {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
}

.color-value {
  font-family: monospace;
  font-size: 0.8125rem;
  color: #64748b;
}

.editor-container {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.submit-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn svg {
  transition: transform 0.2s ease;
}

.submit-btn:hover svg {
  transform: translateX(2px);
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.success-message {
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 768px) {
  .todo-form {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem; /* reduced from 1rem */
  }
  
  .form-header {
    margin-bottom: 2rem;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
  }
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.todo-form {
  animation: fadeIn 0.3s ease-out forwards;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>