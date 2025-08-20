<template>
  <div class="home-view">
    <h1>Welcome to Cashier Local App</h1>
    <p>Select an option from the navigation menu.</p>

    <div class="quick-actions">
      <router-link to="/messages" class="action-button">
        📨 View Messages
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home view logic can be added here
</script>

<style scoped>
.home-view {
  text-align: center;
}

.quick-actions {
  margin-top: 40px;
}

.action-button {
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #45a049;
}
</style>
