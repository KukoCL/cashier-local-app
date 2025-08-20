<template>
  <div class="home-view">
    <h1>Bienvenido al Sistema de Caja</h1>
    <p>Selecciona una opción del menú principal para comenzar.</p>

    <div class="quick-stats">
      <div class="stat-card">
        <h3>📦 Productos</h3>
        <p>Gestiona tu inventario</p>
        <router-link to="/productos" class="stat-link">
          Ver Productos
        </router-link>
      </div>

      <div class="stat-card">
        <h3>💰 Ventas</h3>
        <p>Próximamente</p>
        <span class="stat-link disabled">
          Próximamente
        </span>
      </div>

      <div class="stat-card">
        <h3>📊 Reportes</h3>
        <p>Próximamente</p>
        <span class="stat-link disabled">
          Próximamente
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home view logic
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.home-view h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.home-view p {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.stat-card p {
  color: #7f8c8d;
  margin: 0 0 1.5rem 0;
}

.stat-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.stat-link:hover {
  background-color: #2980b9;
}

.stat-link.disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
