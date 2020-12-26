import { Product } from 'src/app/routes/product/product';

export interface ProductPageResult {
    totalCount: number;
    products: Product[];
}
