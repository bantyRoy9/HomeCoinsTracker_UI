import axios from "axios"
import { accountControllerURL, getAxiosHeader, showAlert, userControllerURL } from "../../Utils"
import { GET_ANALYSIS_FAIL, GET_ANALYSIS_REQUEST, GET_ANALYSIS_SUCCESS } from "../constants";

export const getAnalysisData = (daterange,isUserType) =>async(dispatch) =>{
    try{
        dispatch({type:GET_ANALYSIS_REQUEST});
        console.log(`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}`);
        const {data} = await axios.get(`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}`, await getAxiosHeader());
        if(data.status){
            dispatch({type:GET_ANALYSIS_SUCCESS,payload:data.data});
        }
    }catch(err){
        showAlert(err.response?.data.message??"Something wrong happend");
        dispatch({type:GET_ANALYSIS_FAIL,payload:[]});
    }
}