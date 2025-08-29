<template>
  <div class="container py-4">
    <h1 class="display-6 text-center mb-2">Bienvenido al Sistema de Caja</h1>
    <p class="text-center text-muted mb-4">Selecciona una opción del menú principal para comenzar.</p>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <BaseCard variant="stat">
          <h3 class="h5">📦 Productos</h3>
          <p class="text-muted">Gestiona tu inventario</p>
          <router-link to="/products" class="btn btn-primary">
            Ver Productos
          </router-link>
        </BaseCard>
      </div>

      <div class="col-12 col-md-4">
        <BaseCard variant="stat">
          <h3 class="h5">💰 Ventas</h3>
          <p class="text-muted">Próximamente</p>
          <span class="btn btn-secondary disabled">
            Próximamente
          </span>
        </BaseCard>
      </div>

      <div class="col-12 col-md-4">
        <BaseCard variant="stat">
          <h3 class="h5">📊 Reportes</h3>
          <p class="text-muted">Próximamente</p>
          <span class="btn btn-secondary disabled">
            Próximamente
          </span>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../components/BaseCard.vue'
// Home view logic
</script>

