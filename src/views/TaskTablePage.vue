<template>
  <div class="page-container">
    <main class="main-content">
      <Filters class="filters-card" />
      <TodoTable class="table-card" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Filters from '../components/Filters.vue'
import TodoTable from '../components/TodoTable.vue'
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f8fafc;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.filters-card {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Light cream background for the table */
.table-card {
  animation: fadeIn 0.4s ease-out forwards;
  background: #FFF9ED; /* light cream */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 1.5rem 1rem;
}
</style>