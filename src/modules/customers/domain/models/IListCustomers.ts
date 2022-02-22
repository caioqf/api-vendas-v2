import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export interface IListCustomers {
  customers: Array<Customer>
}
