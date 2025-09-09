export const appMessages = {
  app: {
    title: '🚀 Cashier Local App - Electron.NET + Vue 3 + TypeScript',
    name: 'Cashier App',
  },

  navigation: {
    home: 'Inicio',
    products: 'Productos',
  },

  common: {
    loading: 'Cargando...',
    error: 'Error: ',
    reset: 'Restablecer',
    required: 'Requerido',
    active: 'Activo',
    edit: 'Editar',
    delete: 'Eliminar',
    refresh: 'Actualizar',
    code: 'Código',
    stock: 'Stock',
    category: 'Categoría',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },

  products: {
    list: {
      title: 'Lista de Productos',
      sidebar: {
        allProducts: 'Todos los Productos',
        addProduct: 'Agregar Producto',
      },
      search: {
        placeholder: 'Búsqueda por texto',
      },
      barcodeSearch: {
        placeholder: 'Código de barras',
      },
      filters: {
        sortBy: {
          label: 'Ordenar por',
          options: {
            alphabetical: 'Orden alfabético',
            priceDesc: 'Mayor a menor precio',
            priceAsc: 'Menor a mayor precio',
          },
        },
        category: {
          label: 'Categoría',
          all: 'Todas',
        },
      },
      messages: {
        noProducts: 'No hay productos que coincidan con los filtros aplicados',
      },
      actions: {
        refresh: 'Actualizar',
        edit: 'Editar',
        delete: 'Eliminar',
        modifyStock: '📦 Modificar stock de Productos',
      },
      deleteDialog: {
        title: 'Eliminar Producto',
        message: '¿Está seguro de que desea eliminar el producto',
        details: 'Esta acción no se puede deshacer.',
        confirm: 'Eliminar',
        cancel: 'Cancelar',
      },
    },
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
    editStock: {
      title: 'Modificar Stock',
      operationType: {
        label: 'Tipo de operación',
        update: 'Actualizar (reemplazar stock actual)',
        add: 'Agregar (sumar al stock actual)',
      },
      quantity: {
        label: 'Cantidad',
        placeholder: 'Ingrese la cantidad',
      },
      newTotal: {
        label: 'Nuevo total',
      },
      actions: {
        confirm: 'Confirmar cambios',
      },
    },
    store: {
      errors: {
        loadingProducts: 'Error al cargar productos',
        creatingProduct: 'Error al crear producto',
        updatingProduct: 'Error al actualizar producto',
        deletingProduct: 'Error al eliminar producto',
        gettingProduct: 'Error al obtener producto',
        gettingProductByBarcode: 'Error al obtener producto por código de barras',
      },
    },
  },
}

export default appMessages
