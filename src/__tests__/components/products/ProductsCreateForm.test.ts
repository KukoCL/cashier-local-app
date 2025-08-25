import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import ProductsCreateForm from '../../../components/products/ProductsCreateForm.vue'
import { useProductsStore } from '../../../stores/products'
import axios from 'axios'

// Mock axios
vi.mocked(axios)

describe('ProductsCreateForm', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useProductsStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useProductsStore()
    vi.clearAllMocks()

    wrapper = mount(ProductsCreateForm)
  })

  it('renders submit button with correct text', () => {
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('+ Crear Producto')
  })

  it('has required fields marked as required', () => {
    expect(wrapper.find('#name').attributes('required')).toBeDefined()
    expect(wrapper.find('#category').attributes('required')).toBeDefined()
    expect(wrapper.find('#quantity').attributes('required')).toBeDefined()
    expect(wrapper.find('#priceWithVat').attributes('required')).toBeDefined()
    expect(wrapper.find('#profitPercentage').attributes('required')).toBeDefined()
  })

  it('has salePrice field as readonly', () => {
    expect(wrapper.find('#salePrice').attributes('readonly')).toBeDefined()
  })

  it('updates form data when inputs change', async () => {
    const nameInput = wrapper.find('#name')
    const barCodeInput = wrapper.find('#barCode')
    const descriptionInput = wrapper.find('#description')

    await nameInput.setValue('Test Product')
    await barCodeInput.setValue('123456789')
    await descriptionInput.setValue('Test Description')

    expect((nameInput.element as HTMLInputElement).value).toBe('Test Product')
    expect((barCodeInput.element as HTMLInputElement).value).toBe('123456789')
    expect((descriptionInput.element as HTMLTextAreaElement).value).toBe('Test Description')
  })

  it('calculates sale price correctly when priceWithVat and profitPercentage change', async () => {
    const priceWithVatInput = wrapper.find('#priceWithVat')
    const profitPercentageInput = wrapper.find('#profitPercentage')
    const salePriceInput = wrapper.find('#salePrice')

    // Set price with VAT to 1000 and profit percentage to 20%
    await priceWithVatInput.setValue(1000)
    await priceWithVatInput.trigger('input')
    await profitPercentageInput.setValue(20)
    await profitPercentageInput.trigger('input')
    await nextTick()

    // Expected: 1000 + (1000 * 20 / 100) = 1000 + 200 = 1200
    expect(parseInt((salePriceInput.element as HTMLInputElement).value)).toBe(1200)
  })

  it('sets sale price to 0 when required fields for calculation are empty', async () => {
    const priceWithVatInput = wrapper.find('#priceWithVat')
    const profitPercentageInput = wrapper.find('#profitPercentage')
    const salePriceInput = wrapper.find('#salePrice')

    // First set values
    await priceWithVatInput.setValue(1000)
    await profitPercentageInput.setValue(20)
    await priceWithVatInput.trigger('input')

    // Then clear one of them
    await priceWithVatInput.setValue('')
    await priceWithVatInput.trigger('input')
    await nextTick()

    expect(parseInt((salePriceInput.element as HTMLInputElement).value) || 0).toBe(0)
  })

  it('renders category options correctly', () => {
    const categorySelect = wrapper.find('#category')
    const options = categorySelect.findAll('option')

    // Should have placeholder option plus PRODUCT_TYPES_ARRAY options
    expect(options.length).toBeGreaterThan(1)
    expect(options[0].text()).toBe('Seleccione')
    expect(options[0].attributes('value')).toBe('')
    expect(options[0].attributes('disabled')).toBeDefined()
  })

  it('calls createProduct when form is submitted with valid data', async () => {
    // Mock axios post to return a successful response
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        id: '1',
        name: 'Test Product',
        barCode: '',
        description: '',
        price: 1200,
        stock: 10,
        productType: 'Bebestible',
        unitType: '',
        isActive: true,
        creationDate: '2024-01-01',
        lastUpdateDate: '2024-01-01',
      },
    })

    // Fill required fields
    await wrapper.find('#name').setValue('Test Product')
    await wrapper.find('#category').setValue('Bebestible')
    await wrapper.find('#quantity').setValue(10)
    await wrapper.find('#priceWithVat').setValue(1000)
    await wrapper.find('#profitPercentage').setValue(20)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(axios.post).toHaveBeenCalledWith('/api/products', {
      barCode: '',
      name: 'Test Product',
      description: '',
      price: 1200, // calculated sale price
      stock: 10, // quantity
      productType: 'Bebestible', // category
      unitType: '',
      isActive: true,
      category: 'Bebestible',
      quantity: 10,
      priceWithVat: 1000,
      profitPercentage: 20,
      salePrice: 1200,
    })
  })

  it('clears error when form is submitted', async () => {
    // Mock axios post to return a successful response
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        id: '1',
        name: 'Test Product',
        barCode: '',
        description: '',
        price: 1200,
        stock: 10,
        productType: 'Bebestible',
        unitType: '',
        isActive: true,
        creationDate: '2024-01-01',
        lastUpdateDate: '2024-01-01',
      },
    })

    await wrapper.find('#name').setValue('Test Product')
    await wrapper.find('#category').setValue('Bebestible')
    await wrapper.find('#quantity').setValue(10)
    await wrapper.find('#priceWithVat').setValue(1000)
    await wrapper.find('#profitPercentage').setValue(20)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    // After successful submit, error should be cleared
    expect(store.error).toBe('')
  })

  it('resets form after successful submission', async () => {
    // Mock axios post to return a successful response
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        id: '1',
        name: 'Test Product',
        barCode: '',
        description: '',
        price: 1200,
        stock: 10,
        productType: 'Bebestible',
        unitType: '',
        isActive: true,
        creationDate: '2024-01-01',
        lastUpdateDate: '2024-01-01',
      },
    })

    // Fill form
    await wrapper.find('#name').setValue('Test Product')
    await wrapper.find('#barCode').setValue('123456789')
    await wrapper.find('#category').setValue('Bebestible')
    await wrapper.find('#quantity').setValue(10)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await nextTick() // Wait extra tick for form reset

    // Form should be reset
    expect((wrapper.find('#name').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('#barCode').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('#category').element as HTMLSelectElement).value).toBe('')
    expect((wrapper.find('#quantity').element as HTMLInputElement).value).toBe('0')
  })

  it('displays loading state on submit button when loading', async () => {
    // Set loading state
    store.loading = true
    await nextTick()

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('Creando...')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('displays error message when there is an error', async () => {
    const errorMessage = 'Error al crear el producto'

    // Set error state
    store.error = errorMessage
    await nextTick()

    const errorDiv = wrapper.find('.error-message')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toBe(errorMessage)
  })

  it('does not display error message when there is no error', () => {
    const errorDiv = wrapper.find('.error-message')
    expect(errorDiv.exists()).toBe(false)
  })

  it('handles submission error gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock axios to reject
    vi.mocked(axios.post).mockRejectedValue(new Error('Network error'))

    await wrapper.find('#name').setValue('Test Product')
    await wrapper.find('#category').setValue('Bebestible')
    await wrapper.find('#quantity').setValue(10)
    await wrapper.find('#priceWithVat').setValue(1000)
    await wrapper.find('#profitPercentage').setValue(20)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error creating product:',
      expect.any(Error),
    )

    consoleErrorSpy.mockRestore()
  })

  it('has correct input types for numeric fields', () => {
    expect(wrapper.find('#quantity').attributes('type')).toBe('number')
    expect(wrapper.find('#priceWithVat').attributes('type')).toBe('number')
    expect(wrapper.find('#profitPercentage').attributes('type')).toBe('number')
    expect(wrapper.find('#salePrice').attributes('type')).toBe('number')
  })

  it('has correct min and step attributes for numeric inputs', () => {
    const quantityInput = wrapper.find('#quantity')
    const priceWithVatInput = wrapper.find('#priceWithVat')
    const profitPercentageInput = wrapper.find('#profitPercentage')

    expect(quantityInput.attributes('min')).toBe('0')
    expect(quantityInput.attributes('step')).toBe('1')

    expect(priceWithVatInput.attributes('min')).toBe('0')
    expect(priceWithVatInput.attributes('step')).toBe('1')

    expect(profitPercentageInput.attributes('min')).toBe('0')
    expect(profitPercentageInput.attributes('step')).toBe('1')
  })

  it('textarea has correct attributes', () => {
    const textarea = wrapper.find('#description')
    expect(textarea.attributes('rows')).toBe('3')
    expect(textarea.element.tagName).toBe('TEXTAREA')
  })
})
