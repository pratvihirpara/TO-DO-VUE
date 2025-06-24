<template>
  <div class="page-container">
    <main class="main-content">
      <h2 class="page-title">Create New To-Do</h2>
      <p class="page-desc">
        Fill in the details below to add a new to-do item. All fields are required.
      </p>
      <TodoForm class="form-card" />
      <!-- Removed the default color in the first column as requested -->
    </main>
  </div>
</template>

<script setup lang="ts">
import TodoForm from '../components/TodoForm.vue';
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  padding: 1rem;
  background: #f8fafc;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.main-content {
  width: 100%;
  max-width: 600px;
  margin: 2rem 0;
  padding: 0;
  background: none !important;
  border-radius: 0;
  box-shadow: none;
  border: none;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #334155;
}

.page-desc {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .main-content {
    padding: 1.75rem;
    margin: 1rem 0;
    border-radius: 8px;
  }
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>