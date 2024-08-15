import { GET_ANALYSIS_FAIL, GET_ANALYSIS_REQUEST, GET_ANALYSIS_SUCCESS, GET_ANALYSISEARNBY_FAIL, GET_ANALYSISEARNBY_REQUEST, GET_ANALYSISEARNBY_SUCCESS, GET_ANALYSISEXPENDBY_FAIL, GET_ANALYSISEXPENDBY_REQUEST, GET_ANALYSISEXPENDBY_SUCCESS, GET_ANALYSISEXPENDTYPE_FAIL, GET_ANALYSISEXPENDTYPE_REQUEST, GET_ANALYSISEXPENDTYPE_SUCCESS, GET_ANALYSISSOURCE_FAIL, GET_ANALYSISSOURCE_REQUEST, GET_ANALYSISSOURCE_SUCCESS, } from "../constants"

export const analysisReducer = (state = {}, action:any) => {
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
                isLoading:false,
                analysisSource:action.payload
            }
        case GET_ANALYSISEXPENDTYPE_SUCCESS:
            return{
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