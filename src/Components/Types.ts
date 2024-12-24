import { StyleProp, TextStyle } from "react-native";
import { Itabs } from "../Screens/Analysis/type";

export interface ICustomerNavigationTabList {
  tab: Itabs['tab'];
  active: boolean;
  details: Details;
};
export interface Details {
  source: string;
  expendName: string;
};
export type TCustomNavigationTab = {
  tabs: ICustomerNavigationTabList[];
  tabHandler: (expendType: Itabs['tab']) => void;
  activeTab: string;
};
export interface ICustomText {
  title: string | number;
  fontSize?: number;
  color?: string;
  style?: TextStyle | undefined;
  viewStyle?:any
};
export interface IModals {
  Component:JSX.Element;
  modalVisible:boolean;
  type?:string;
  modalVisibleHandler:()=>void;
  bottomView?:boolean;
  onDelete?:any;
  modalType?:'Primary'|'Secondary';
  style?:any
}
