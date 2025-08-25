<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div class="form-row">
      <div class="form-group">
        <label for="barCode">{{ messages.form.barCode.label }}</label>
        <input
          type="text"
          id="barCode"
          v-model="formData.barCode"
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
          v-model="formData.name"
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
          v-model="formData.description"
          rows="3"
          :placeholder="messages.form.description.placeholder"
        ></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="productType">{{ messages.form.category.label }}:</label>
        <div class="select-wrapper">
          <select id="productType" v-model="formData.productType" required>
            <option value="" disabled>
              {{ messages.form.category.placeholder }}
            </option>
            <option v-for="type in productTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="stock">{{ messages.form.quantity.label }}:</label>
        <input
          type="number"
          id="stock"
          v-model.number="formData.stock"
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
          v-model.number="formData.purchasePrice"
          required
          min="0"
          step="1"
          @input="store.calculateSalePrice"
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
          v-model.number="formData.profitPercentage"
          required
          min="0"
          step="1"
          @input="store.calculateSalePrice"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="price">{{ messages.form.salePrice.label }}:</label>
        <input
          type="number"
          id="price"
          v-model.number="formData.price"
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
import { useProducts } from '../../composables/useProducts'
import { useProductsStore } from '../../stores/products'
import { PRODUCT_TYPES_ARRAY } from '../../infraestructure/constants'
import appMessages from '../../infraestructure/appMessages'
import { storeToRefs } from 'pinia'

const { createProduct, loading, error, clearError } = useProducts()
const store = useProductsStore()
const { formData } = storeToRefs(store)
const messages = appMessages.products.create

//TODO: Obtener de Base de datos.
const productTypes = PRODUCT_TYPES_ARRAY

const handleSubmit = async () => {
  try {
    clearError()

    await createProduct(formData.value)
    store.resetFormData()
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

.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #6b7280;
  pointer-events: none;
}

select {
  appearance: none;
  padding-right: 2.5rem;
  width: 100%;
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
