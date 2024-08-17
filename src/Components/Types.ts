
export interface ICustomerNavigationTabList {
  tab: string;
  active: boolean;
  details: Details;
};
export interface Details {
  source: string;
  expendName: string;
};
export type TCustomNavigationTab = {
  tabs: ICustomerNavigationTabList[];
  tabHandler: (expendType: string) => void;
  activeTab: string;
};
export interface ICustomText {
  title: string;
  fontSize?: number;
  color?: string;
  style?: any;
  viewStyle?:any
};

