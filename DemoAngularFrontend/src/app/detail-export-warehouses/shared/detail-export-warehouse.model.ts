import { Product } from '../../products/shared/product.model';

export class DetailExportWarehouse {
    ExportID: number;
    ProductID: number;
    Count:number;
    Price: number;
}

export class Item {

    product: Product;
    quantity: number;

}