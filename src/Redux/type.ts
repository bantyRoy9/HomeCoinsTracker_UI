export interface IAnalysisData {
    earn: Earn
    expend: Expend
    graphdata: Graphdaum[][]
  }
  
  export interface Earn {
    totalearn: number
    earnBySources: EarnBySource[]
    earnByMembers: EarnByMember[]
    recentearn: Recentearn[]
  }
  
  export interface EarnBySource {
    _id: Id
    totalAmount: number
  }
  
  export interface Id {
    id: string
    sourceType: string
    sourceName: string
    sourceInv: number
  }
  
  export interface EarnByMember {
    _id: Id2
    totalAmount: number
  }
  
  export interface Id2 {
    id: string
    name: string
    photo: string
  }
  
  export interface Recentearn {
    _id: string
    amount: number
    date: string
    earnBy: EarnBy
    sourceType: SourceType
  }
  
  export interface EarnBy {
    _id: string
    name: string
  }
  
  export interface SourceType {
    _id: string
    sourceName: string
  }
  
  export interface Expend {
    totalexpend: number
    expendByTypes: any[]
    expendByMembers: any[]
    recentexpend: any[]
  }
  
  export interface Graphdaum {
    name: string
    earn: number
    color: string
    legendFontColor: string
    legendFontSize: number
  }
  