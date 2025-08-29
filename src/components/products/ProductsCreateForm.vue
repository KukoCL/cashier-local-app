<template>
  <form @submit.prevent="handleSubmit" class="row g-3">
    <div class="col-12">
      <label for="barCode" class="form-label">{{ messages.form.barCode.label }}</label>
      <input
        type="text"
        id="barCode"
        class="form-control"
        v-model="createFormData.barCode"
        :placeholder="messages.form.barCode.placeholder"
      />
    </div>

    <div class="col-12">
      <label for="name" class="form-label">{{ messages.form.name.label }}</label>
      <input
        type="text"
        id="name"
        class="form-control"
        v-model="createFormData.name"
        required
        :placeholder="messages.form.name.placeholder"
      />
    </div>

    <div class="col-12">
      <label for="description" class="form-label">{{ messages.form.description.label }}:</label>
      <textarea
        id="description"
        class="form-control"
        v-model="createFormData.description"
        rows="3"
        :placeholder="messages.form.description.placeholder"
      ></textarea>
    </div>

    <div class="col-md-6">
      <label for="productType" class="form-label">{{ messages.form.category.label }}:</label>
      <select id="productType" class="form-select" v-model="createFormData.productType" required>
        <option value="" disabled>
          {{ messages.form.category.placeholder }}
        </option>
        <option v-for="type in productTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div class="col-md-6">
      <label for="stock" class="form-label">{{ messages.form.quantity.label }}:</label>
      <input
        type="number"
        id="stock"
        class="form-control"
        v-model.number="createFormData.stock"
        required
        min="0"
        step="1"
      />
    </div>

    <div class="col-md-6">
      <label for="priceWithVat" class="form-label">{{ messages.form.priceWithVat.label }}:</label>
      <input
        type="number"
        id="priceWithVat"
        class="form-control"
        v-model.number="createFormData.purchasePrice"
        required
        min="0"
        step="1"
        @input="calculateSalePrice"
      />
    </div>

    <div class="col-md-6">
      <label for="profitPercentage" class="form-label">{{ messages.form.profitPercentage.label }}:</label>
      <input
        type="number"
        id="profitPercentage"
        class="form-control"
        v-model.number="createFormData.profitPercentage"
        required
        min="0"
        step="1"
        @input="calculateSalePrice"
      />
    </div>

    <div class="col-12">
      <label for="price" class="form-label">{{ messages.form.salePrice.label }}:</label>
      <input
        type="number"
        id="price"
        class="form-control"
        v-model.number="createFormData.price"
        readonly
        :placeholder="messages.form.salePrice.placeholder"
      />
    </div>

    <div class="col-12">
      <button type="submit" :disabled="loading" class="btn btn-success w-100">
        {{ loading ? messages.actions.submitting : messages.actions.submit }}
      </button>
    </div>

    <div v-if="error" class="alert alert-danger mt-2" role="alert">
      {{ error }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useProducts } from '../../composables/useProducts'
import { useProductCreateForm } from '../../composables/useProductCreateForm'
import { PRODUCT_TYPES_ARRAY } from '../../infraestructure/constants'
import appMessages from '../../infraestructure/appMessages'

const { createProduct, loading, error, clearError } = useProducts()
const { createFormData, resetCreateFormData, calculateSalePrice } = useProductCreateForm()
const messages = appMessages.products.create

//TODO: Obtener de Base de datos.
const productTypes = PRODUCT_TYPES_ARRAY

const handleSubmit = async () => {
  try {
    clearError()

    await createProduct(createFormData.value)
    resetCreateFormData()
    console.log(messages.messages.success)
  } catch (err) {
    console.error(`${messages.messages.error}:`, err)
  }
}
</script>

