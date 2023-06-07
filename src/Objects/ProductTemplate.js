import StockCategoryTemplate from "./StockCategoryTemplate";
import SupplierTemplate from "./SupplierTemplate";
import TaxTemplate from "./TaxTemplate";

export default function ProductTempate() {
    return {
        product_id: 0,
        lookup_code: "",
        product_name: "",
        selling_price: 0,
        purchase_price: 0,
        stock_level: 0,
        creation_date: "",
        last_updated: "",
        tax_applied: new TaxTemplate(),
        supplier: new SupplierTemplate(),
        stock_category: new StockCategoryTemplate(),
    }
}