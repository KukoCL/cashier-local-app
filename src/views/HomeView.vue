<template>
  <div class="home-view">
    <h1>Bienvenido al Sistema de Caja</h1>
    <p>Selecciona una opción del menú principal para comenzar.</p>

    <div class="quick-stats">
      <BaseCard variant="stat">
        <h3>📦 Productos</h3>
        <p>Gestiona tu inventario</p>
        <router-link to="/productos" class="stat-link">
          Ver Productos
        </router-link>
      </BaseCard>

      <BaseCard variant="stat">
        <h3>💰 Ventas</h3>
        <p>Próximamente</p>
        <span class="stat-link disabled">
          Próximamente
        </span>
      </BaseCard>

      <BaseCard variant="stat">
        <h3>📊 Reportes</h3>
        <p>Próximamente</p>
        <span class="stat-link disabled">
          Próximamente
        </span>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../components/BaseCard.vue'
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
</style>
