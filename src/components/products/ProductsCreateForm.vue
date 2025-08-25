<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div class="form-row">
      <div class="form-group">
        <label for="barCode">{{ messages.form.barCode.label }}</label>
        <input
          type="text"
          id="barCode"
          v-model="product.barCode"
          :placeholder="messages.form.barCode.placeholder"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="name">{{ messages.form.name.label }}</label>
        <input
          type="text"
          id="name"
          v-model="product.name"
          required
          :placeholder="messages.form.name.placeholder"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="description"
          >{{ messages.form.description.label }}:</label
        >
        <textarea
          id="description"
          v-model="product.description"
          rows="3"
          :placeholder="messages.form.description.placeholder"
        ></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">{{ messages.form.category.label }}:</label>
        <select id="category" v-model="product.category" required>
          <option value="" disabled>
            {{ messages.form.category.placeholder }}
          </option>
          <option v-for="type in productTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="quantity">{{ messages.form.quantity.label }}:</label>
        <input
          type="number"
          id="quantity"
          v-model.number="product.quantity"
          required
          min="0"
          step="1"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="priceWithVat"
          >{{ messages.form.priceWithVat.label }}:</label
        >
        <input
          type="number"
          id="priceWithVat"
          v-model.number="product.priceWithVat"
          required
          min="0"
          step="1"
          @input="calculateSalePrice"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="profitPercentage"
          >{{ messages.form.profitPercentage.label }}:</label
        >
        <input
          type="number"
          id="profitPercentage"
          v-model.number="product.profitPercentage"
          required
          min="0"
          step="1"
          @input="calculateSalePrice"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="salePrice">{{ messages.form.salePrice.label }}:</label>
        <input
          type="number"
          id="salePrice"
          v-model.number="product.salePrice"
          readonly
          :placeholder="messages.form.salePrice.placeholder"
        />
      </div>
    </div>

    <div class="form-actions">
      <button
        type="submit"
        :disabled="loading"
        class="btn-primary full-width"
      >
        {{ loading ? messages.actions.submitting : messages.actions.submit }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProducts } from '../../composables/useProducts'
import { PRODUCT_TYPES_ARRAY } from '../../infraestructure/constants'
import appMessages from '../../infraestructure/appMessages'
import type { CreateProductRequest } from '../../types/interfaces'

const { createProduct, loading, error, clearError } = useProducts()
const messages = appMessages.products.create

//TODO: Obtener de Base de datos.
const productTypes = PRODUCT_TYPES_ARRAY

const initialProduct: CreateProductRequest = {
  barCode: '',
  name: '',
  description: '',
  price: 0,
  stock: 0,
  productType: '',
  unitType: '',
  isActive: true,
  category: '',
  quantity: 0,
  priceWithVat: 0,
  profitPercentage: 0,
  salePrice: 0,
}

const product = ref<CreateProductRequest>({ ...initialProduct })

// Calculate sale price based on price with VAT and profit percentage
const calculateSalePrice = () => {
  if (product.value.priceWithVat && product.value.profitPercentage) {
    const profit =
      (product.value.priceWithVat * product.value.profitPercentage) / 100
    product.value.salePrice = Math.round(product.value.priceWithVat + profit)
  } else {
    product.value.salePrice = 0
  }
}

const resetForm = () => {
  product.value = { ...initialProduct }
  clearError()
}

const handleSubmit = async () => {
  try {
    clearError()
    // Set backward compatibility fields
    product.value.price = product.value.salePrice
    product.value.stock = product.value.quantity
    product.value.productType = product.value.category

    await createProduct(product.value)
    resetForm()
    console.log(messages.messages.success)
  } catch (err) {
    console.error(`${messages.messages.error}:`, err)
  }
}
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input[readonly] {
  background-color: #f8f9fa;
  color: #6c757d;
}

.form-actions {
  margin-top: 1.5rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #218838;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary.full-width {
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #f5c6cb;
}
</style>
