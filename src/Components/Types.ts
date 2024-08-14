
export interface ICustomerNavigationTabList {
    expendType: string
    active: boolean
    details: Details
  }
  
  export interface Details {
    source: string
    expendName: string
  }