export default class Customer {
    constructor() {
        // Identification
        this.id          = 0
        this.lookup_code = ""
        this.name        = ""
        this.phone       = ""
        this.email       = ""
        this.join_date   = ""

        // Other Items
        this.tax_exempt = false
        this.tax_exempt_number = ""
        this.note = ""
        
        // State
        this.active          = true;
        this.editable        = false
        this.isStoreCustomer = false

        // Nested items
        this.transactions = [];
    }

    static Blank() {
        return new Customer()
    }

    static Load(customer_data) {
        let c = new Customer()

        for(const [key, value] of Object.entries(customer_data)) {
            try {
                c[key] = value
            } catch(e) {
                console.error(`\'${key}\' is NOT a valid Customer property`)
            }
        }

        return c;
    }
    

}