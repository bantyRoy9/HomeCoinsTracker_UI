import axios from "axios"
import { accountControllerURL, getAxiosHeader, showAlert, stringTransform, userControllerURL } from "../../Utils"

export const getAnalysisData = (daterange:string,isUserType:boolean,type:'source' | 'earnBy' | 'expendBy' | 'expendtype',id?:string) =>async(dispatch:any) =>{
    try{
        dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_REQUEST`});
        
        console.log(`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}${type? `&${type}=${id}`:''}`);
        const {data} = await axios.get(`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}${type? '&='+id+'':''}`, await getAxiosHeader());
        if(data.status){
            dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_SUCCESS`,payload:data.data});
        }
    }catch(err:any){
        showAlert(err.response?.data.message??"Something wrong happend");
        dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_FAIL`});
    }
};