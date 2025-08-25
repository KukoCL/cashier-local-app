export const appMessages = {
  app: {
    title: '🚀 Cashier Local App - Electron.NET + Vue 3 + TypeScript',
  },

  common: {
    loading: 'Cargando...',
    error: 'Error: ',
    reset: 'Restablecer',
    required: 'Requerido',
    active: 'Activo',
  },

  products: {
    create: {
      title: 'Creación de Productos',
      form: {
        barCode: {
          label: 'Código de Barra',
          placeholder: 'Ingrese el código de barras',
        },
        name: {
          label: 'Nombre Producto',
          placeholder: 'Ingrese el nombre del producto',
        },
        description: {
          label: 'Descripción',
          placeholder: 'Ingrese la descripción del producto',
        },
        category: {
          label: 'Categoría',
          placeholder: 'Seleccione',
        },
        quantity: {
          label: 'Cantidad',
          placeholder: 'Ingrese la cantidad',
        },
        priceWithVat: {
          label: 'Precio de Compra',
          placeholder: 'Ingrese el precio de compra',
        },
        profitPercentage: {
          label: 'Porcentaje Ganancia',
          placeholder: 'Ingrese el porcentaje',
        },
        salePrice: {
          label: 'Precio de Venta',
          placeholder: 'Precio calculado automáticamente',
        },
        productType: {
          label: 'Tipo de Producto',
          placeholder: 'Seleccione el tipo de producto',
        },
        unitType: {
          label: 'Tipo de Unidad',
          placeholder: 'Seleccione el tipo de unidad',
        },
        isActive: {
          label: 'Producto Activo',
        },
      },
      actions: {
        submit: '+ Crear Producto',
        submitting: 'Creando...',
        reset: 'Restablecer',
      },
      messages: {
        success: 'Producto creado exitosamente',
        error: 'Error al crear el producto',
      },
    },
  },
}

export default appMessages
