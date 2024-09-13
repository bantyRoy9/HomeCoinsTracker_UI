export interface Itabs{
    tab: string;
    active: boolean;
    details: any
}
export type Tanalysis={
    type:"source" | "earnBy" | "expendBy" | "expendType";
    id:string;
}