import { GET_ANALYSIS_FAIL, GET_ANALYSIS_REQUEST, GET_ANALYSIS_SUCCESS, GET_ANALYSISEARNBY_FAIL, GET_ANALYSISEARNBY_REQUEST, GET_ANALYSISEARNBY_SUCCESS, GET_ANALYSISEXPENDBY_FAIL, GET_ANALYSISEXPENDBY_REQUEST, GET_ANALYSISEXPENDBY_SUCCESS, GET_ANALYSISEXPENDTYPE_FAIL, GET_ANALYSISEXPENDTYPE_REQUEST, GET_ANALYSISEXPENDTYPE_SUCCESS, GET_ANALYSISSOURCE_FAIL, GET_ANALYSISSOURCE_REQUEST, GET_ANALYSISSOURCE_SUCCESS, } from "../constants"
import { IAnalysisData, IinitalAnalysisState } from "../type"
const dataResponse:IAnalysisData = {
    earn:{
        totalearn:0,
        earnBySources:[],
        earnByMembers:[],
        recentearn:[]
    },
    expend:{
        totalexpend:0,
        expendByTypes: [],
        expendByMembers: [],
        recentexpend: []
    },
    graphdata:[]
}
const initialState:IinitalAnalysisState = {
    isIndvidualLoading:true,
    isLoading:false,
    analysisData:dataResponse,
    analysisearnBy:dataResponse,
    analysisexpendBy:dataResponse,
    analysissource:dataResponse,
    analysisexpendType:dataResponse
}
export const analysisReducer = (state:IinitalAnalysisState = initialState, action:any):IinitalAnalysisState => {
    switch (action.type) {
        case GET_ANALYSIS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_ANALYSISEARNBY_REQUEST:
        case GET_ANALYSISEXPENDBY_REQUEST:
        case GET_ANALYSISEXPENDTYPE_REQUEST:
        case GET_ANALYSISSOURCE_REQUEST:
            return{
                ...state,
                isIndvidualLoading:true
            }
        case GET_ANALYSIS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                analysisData: action.payload,
            }
        case GET_ANALYSISEARNBY_SUCCESS:
            return {
                ...state,
                isIndvidualLoading:false,
                analysisearnBy:action.payload
            }
        case GET_ANALYSISEXPENDBY_SUCCESS:
            return{
                ...state,
                isIndvidualLoading:false,
                analysisexpendBy:action.payload
            }
        case GET_ANALYSISSOURCE_SUCCESS:
            return{
                ...state,
                isIndvidualLoading:false,
                analysissource:action.payload
            }
        case GET_ANALYSISEXPENDTYPE_SUCCESS:
            return{
                ...state,
                isIndvidualLoading:false,
                analysisexpendType:action.payload
            }
        case GET_ANALYSIS_FAIL:
        case GET_ANALYSISEARNBY_FAIL:
        case GET_ANALYSISEXPENDBY_FAIL:
        case GET_ANALYSISSOURCE_FAIL:
        case GET_ANALYSISEXPENDTYPE_FAIL:
            return {
                isLoading: false,
                isIndvidualLoading:false,
                analysisData: null,
                analysisearnBy:null,
                analysisexpendBy:null,
                analysissource:null,
                analysisexpendType:null
            }
        default:
            return state
    }
}