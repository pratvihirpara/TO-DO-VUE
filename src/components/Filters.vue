<template>
  <div class="filters-card">
    <div class="filters-header">
      <h3 class="filters-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
        </svg>
        Filter Tasks
      </h3>
      <button class="reset-btn" @click="resetFilters">
        Reset
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 4 1 10 7 10"></polyline>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
      </button>
    </div>

    <div class="filters-grid">
      <!-- Name Search -->
      <div class="filter-group">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            v-model="todoStore.filters.name"
            placeholder="Search by name..." 
            class="search-input"
          />
        </div>
      </div>

      <!-- Email Search -->
      <div class="filter-group">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <input 
            v-model="todoStore.filters.email" 
            placeholder="Search by email..." 
            class="search-input"
          />
        </div>
      </div>

      <!-- Status Filter -->
      <div class="filter-group">
        <div class="select-wrapper">
          <select v-model="todoStore.filters.status" class="status-select">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <svg class="select-arrow" viewBox="0 0 24 24" width="16" height="16">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      <!-- Date Range Filter -->
      <div class="filter-group">
        <div class="select-wrapper">
          <select v-model="todoStore.filters.assignedRange" class="status-select" @change="handleDateRangeChange">
            <option value="">All Dates</option>
            <option value="2h">Last 2 hours</option>
            <option value="1d">Last 1 day</option>
            <option value="today">Today</option>
            <option value="custom">Custom Range</option>
          </select>
          <svg class="select-arrow" viewBox="0 0 24 24" width="16" height="16">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      <!-- Color Filter -->
      <div class="filter-group">
        <div class="color-filter-wrapper">
          <label
            v-for="color in colorOptions"
            :key="color"
            class="color-swatch"
            :style="{ backgroundColor: color, border: todoStore.filters.color === color ? '2px solid #6366f1' : '2px solid #e2e8f0' }"
          >
            <input
              type="radio"
              v-model="todoStore.filters.color"
              :value="color"
              class="color-radio"
            />
          </label>
          <button v-if="todoStore.filters.color" @click="todoStore.filters.color = ''" class="clear-color-btn">✕</button>
        </div>
      </div>
    </div>

    <!-- Custom Date Range Picker -->
    <div v-if="todoStore.filters.assignedRange === 'custom'" class="custom-date-range">
      <div class="date-range-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Select Date Range</span>
      </div>
      <div class="date-range-grid">
        <div class="date-input-group">
          <label class="date-label">From</label>
          <div class="date-input-wrapper">
            <input
              type="date"
              v-model="todoStore.filters.customRange.from"
              class="date-input"
            />
          </div>
        </div>
        <div class="date-separator">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <div class="date-input-group">
          <label class="date-label">To</label>
          <div class="date-input-wrapper">
            <input
              type="date"
              v-model="todoStore.filters.customRange.to"
              class="date-input"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'
import { subHours, subDays, startOfDay, endOfDay } from 'date-fns'

const todoStore = useTodoStore()

const colorOptions = [
  '#6366f1', // Indigo
  '#f59e42', // Orange
  '#10b981', // Green
  '#f43f5e', // Red
  '#fbbf24', // Yellow
  '#3b82f6'  // Blue
];

const resetFilters = () => {
  todoStore.filters.name = ''
  todoStore.filters.email = ''
  todoStore.filters.status = ''
  todoStore.filters.assignedRange = ''
  todoStore.filters.customRange = { from: '', to: '' }
  todoStore.filters.color = ''
}

const handleDateRangeChange = () => {
  const now = new Date()
  switch (todoStore.filters.assignedRange) {
    case '2h':
      todoStore.filters.customRange = {
        from: subHours(now, 2).toISOString(),
        to: now.toISOString()
      }
      break
    case '1d':
      todoStore.filters.customRange = {
        from: subDays(now, 1).toISOString(),
        to: now.toISOString()
      }
      break
    case 'today':
      todoStore.filters.customRange = {
        from: startOfDay(now).toISOString(),
        to: endOfDay(now).toISOString()
      }
      break
    case 'custom':
      todoStore.filters.customRange = { from: '', to: '' }
      break
    default:
      todoStore.filters.customRange = { from: '', to: '' }
      break
  }
}
</script>

<style scoped>
.filters-card {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.filters-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #64748b;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #e5e7eb;
  color: #334155;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

/* Search Input Styles */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #334155;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  height: 38px;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.13);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: #94a3b8;
  pointer-events: none;
}

/* Select Styles */
.select-wrapper {
  position: relative;
  width: 100%;
}

.status-select {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #334155;
  font-size: 0.85rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 38px;
}

.status-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.13);
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

/* Color Filter Styles */
.color-filter-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.color-radio {
  display: none;
}

.clear-color-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.clear-color-btn:hover {
  color: #dc2626;
}

/* Custom Date Range Styles */
.custom-date-range {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.date-range-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #475569;
  font-weight: 500;
  font-size: 0.9rem;
}

.date-range-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0.4rem; /* reduce gap */
  align-items: end;
  width: 100%;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.date-input-wrapper {
  position: relative;
}

.date-input {
  width: 110px;           /* reduce width */
  min-width: 80px;
  max-width: 130px;
  padding: 0.3rem 0.5rem; /* smaller padding */
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #334155;
  font-size: 0.8rem;      /* smaller font */
  transition: all 0.2s ease;
  height: 32px;           /* smaller height */
}

.date-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.13);
}

.date-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1.25rem;
  color: #94a3b8;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-card {
    padding: 0.75rem;
  }
  
  .search-input,
  .status-select,
  .date-input {
    height: 36px;
    font-size: 0.8rem;
  }
  
  .date-range-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .date-separator {
    padding: 0;
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
}
</style>