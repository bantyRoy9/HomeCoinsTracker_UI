import { GET_ANALYSIS_FAIL, GET_ANALYSIS_REQUEST, GET_ANALYSIS_SUCCESS, GET_ANALYSISEARNBY_FAIL, GET_ANALYSISEARNBY_REQUEST, GET_ANALYSISEARNBY_SUCCESS, GET_ANALYSISEXPENDBY_FAIL, GET_ANALYSISEXPENDBY_REQUEST, GET_ANALYSISEXPENDBY_SUCCESS, GET_ANALYSISEXPENDTYPE_FAIL, GET_ANALYSISEXPENDTYPE_REQUEST, GET_ANALYSISEXPENDTYPE_SUCCESS, GET_ANALYSISSOURCE_FAIL, GET_ANALYSISSOURCE_REQUEST, GET_ANALYSISSOURCE_SUCCESS, } from "../constants"
const dataResponse = {
    earn:{
        totalearn:0,
        earnBySource:[],
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
const initialState = {
    analysisData:dataResponse,
    analysisEarnBy:dataResponse,
    analysisExpendBy:dataResponse,
    analysisSource:dataResponse,
    analysisExpendType:dataResponse
}
export const analysisReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ANALYSIS_REQUEST:
        // case GET_ANALYSISEARNBY_REQUEST:
        // case GET_ANALYSISEXPENDBY_REQUEST:
        // case GET_ANALYSISEXPENDTYPE_REQUEST:
        // case GET_ANALYSISSOURCE_REQUEST:
            return {
                ...state,
                isLoading: true
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
                isLoading:false,
                analysisEarnBy:action.payload
            }
        case GET_ANALYSISEXPENDBY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                analysisExpendBy:action.payload
            }
        case GET_ANALYSISSOURCE_SUCCESS:
            return{
                ...state,
                isLoading:false,
                analysisSource:action.payload
            }
        case GET_ANALYSISEXPENDTYPE_SUCCESS:
            return{
                ...state,
                isLoading:false,
                analysisExpendType:action.payload
            }
        case GET_ANALYSIS_FAIL:
        case GET_ANALYSISEARNBY_FAIL:
        case GET_ANALYSISEXPENDBY_FAIL:
        case GET_ANALYSISSOURCE_FAIL:
        case GET_ANALYSISEXPENDTYPE_FAIL:
            return {
                isLoading: false,
                analysisData: null,
                analysisEarnBy:null,
                analysisExpendBy:null,
                analysisSource:null,
                analysisExpendType:null
            }
        default:
            return state
    }
}