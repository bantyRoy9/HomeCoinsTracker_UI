
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
  title: string | number;
  fontSize?: number;
  color?: string;
  style?: any;
  viewStyle?:any
};
export interface IModals {
  Component:JSX.Element;
  modalVisible:boolean;
  type:string;
  modalVisibleHandler:()=>void;
  bottomView?:boolean;
  onDelete?:any;
  modalType?:'Primary'|'Secondary';
  style?:any
}
