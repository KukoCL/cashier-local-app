<template>
  <div class="home-view">
    <h1>Welcome to the Cashier System</h1>
    <p>Select an option from the main menu to get started.</p>

    <div class="quick-stats">
      <BaseCard variant="stat">
        <h3>📦 Products</h3>
        <p>Manage your inventory</p>
        <router-link to="/products" class="stat-link">
          View Products
        </router-link>
      </BaseCard>

      <BaseCard variant="stat">
        <h3>💰 Sales</h3>
        <p>Coming soon</p>
        <span class="stat-link disabled">
          Coming soon
        </span>
      </BaseCard>

      <BaseCard variant="stat">
        <h3>📊 Reports</h3>
        <p>Coming soon</p>
        <span class="stat-link disabled">
          Coming soon
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
