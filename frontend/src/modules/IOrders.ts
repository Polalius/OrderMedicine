import { MedicineInterface } from "./IMedicine";
import { CompanyInterface } from "./ICompany";
import { EmployeeInterface } from "./IEmployees";

export interface OrdersInterface {
    ID: number,

    MedicineID: number,
    Medicine: MedicineInterface,

    OrderAmount: number,
    
    MedicineCompanyID: number,
    MedicineCompany: CompanyInterface,

    OrderTime: Date,

    EmployeeID: number,
    Employee: EmployeeInterface
}