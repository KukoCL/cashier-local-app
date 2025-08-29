<template>
  <div class="container-fluid">
    <div class="mb-3">
      <ViewHeader :title="messages.title" />
    </div>
    <BaseCard variant="default">
      <ProductsCreateForm />
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import appMessages from '../../infraestructure/appMessages'
import ViewHeader from '../../components/ViewHeader.vue'
import BaseCard from '../../components/BaseCard.vue'
import ProductsCreateForm from '../../components/products/ProductsCreateForm.vue'

const messages = appMessages.products.create
</script>
