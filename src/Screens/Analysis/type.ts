export interface Itabs{
    tab: 'earn' | 'expend';
    active: boolean;
    details: any
}
export type Tanalysis={
    type:"source" | "earnBy" | "expendBy" | "expendType" | '';
    id?:string;
}