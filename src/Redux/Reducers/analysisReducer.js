import { GET_ANALYSIS_FAIL, GET_ANALYSIS_REQUEST, GET_ANALYSIS_SUCCESS } from "../constants"

export const analysisReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ANALYSIS_REQUEST:
            return {
                isLoading: true
            }
        case GET_ANALYSIS_SUCCESS:
            return {
                isLoading: false,
                analysisData: action.payload,
            }
        case GET_ANALYSIS_FAIL:
            return {
                isLoading: false,
                analysisData: null
            }
        default:
            return state
    }
}