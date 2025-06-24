<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-brand">
        <h1 class="app-title">
          <span class="title-icon">📝</span>
          Todo Manager
        </h1>
        <p class="app-subtitle">Streamline your productivity with smart task management</p>
      </div>
      <nav class="nav-bar">
        <router-link to="/" class="nav-link">Create Todo</router-link>
        <router-link to="/tasks" class="nav-link">Tasks & Filters</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(214, 220, 230, 0.15);
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-brand {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.title-icon {
  font-size: 1.8rem;
}

.app-subtitle {
  font-size: 1.05rem;
  margin: 0;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

.nav-bar {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  text-decoration: none;
  font-size: 1.05rem;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 600;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .header-brand {
    align-items: center;
  }
  
  .nav-bar {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 1rem;
  }
  
  .app-title {
    font-size: 1.7rem;
  }
  
  .app-subtitle {
    font-size: 0.95rem;
  }
  
  .nav-bar {
    gap: 0.75rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
  }
}
</style>