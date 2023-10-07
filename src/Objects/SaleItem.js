export function SaleItem(data)
{
    //Set proper parameters
    this.lookup_code      = data.lookup_code;
    this.product_name     = data.product_name;
    this.selling_price    = data.selling_price;
    this.tax_applied      = data.tax_applied;
    this.tax_amount       = 0;
    this.discount_applied = 0;
    this.discount_reason  = ""

    //Functions to work on data
    this.apply_discount = (amount,reason) => {
        this.discount_applied = amount;
        this.reason = reason;
    }
}