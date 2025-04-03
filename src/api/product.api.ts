// This file is deprecated. Import from productService directly.
// Re-exporting for backward compatibility
import productService, {
  Product as ProductType,
  ProductFilter as ProductFilterType,
  ProductsResponse as ProductsResponseType,
  CreateProductData as CreateProductDataType,
  UpdateProductData as UpdateProductDataType,
  InventoryUpdate as InventoryUpdateType,
  InventoryTransaction as InventoryTransactionType
} from './services/productService';

// Re-export the service
export default productService;

// Re-export types with export type for isolatedModules
export type Product = ProductType;
export type ProductFilter = ProductFilterType;
export type ProductsResponse = ProductsResponseType;
export type InventoryUpdate = InventoryUpdateType;
export type CreateProductData = CreateProductDataType;
export type UpdateProductData = UpdateProductDataType;
export type InventoryTransaction = InventoryTransactionType; 