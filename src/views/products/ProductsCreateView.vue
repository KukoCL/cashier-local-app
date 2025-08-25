<template>
  <ViewHeader :title="messages.title" />
  <BaseCard variant="default">
    <ProductsCreateForm />
  </BaseCard>
</template>

<script lang="ts" setup>
import appMessages from '../../infraestructure/appMessages'
import ViewHeader from '../../components/ViewHeader.vue'
import BaseCard from '../../components/BaseCard.vue'
import ProductsCreateForm from '../../components/products/ProductsCreateForm.vue'

const messages = appMessages.products.create
</script>
