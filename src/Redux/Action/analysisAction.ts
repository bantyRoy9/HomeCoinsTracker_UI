import axios from "axios"
import { accountControllerURL, getAxiosHeader, showAlert, stringTransform, userControllerURL } from "../../Utils"

export const getAnalysisData = (isUserType:boolean,type:'source' | 'earnBy' | 'expendBy' | 'expendType' | '',daterange?:string,id?:string,recentlimit?:string) =>async(dispatch:any) =>{
    try{
        dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_REQUEST`});
        console.log(`GET_ANALYSIS${stringTransform(type,'U')}_REQUEST`,`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}${type ? `&${type}=${id}`:''}${(recentlimit&&id)?`&recentlimit=${recentlimit}`:''}`);
        const {data} = await axios.get(`${isUserType?userControllerURL:accountControllerURL}/getAnalysisData?dateRange=${daterange}${type ? `&${type}=${id}`:''}${(recentlimit&&id)?`&recentlimit=${recentlimit}`:''}`, await getAxiosHeader());
        if(data.status){
            // console.log(`GET_ANALYSIS${stringTransform(type,'U')}_SUCCESS`,data.data);
            dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_SUCCESS`,payload:data.data});
        }
    }catch(err:any){
        showAlert(err.response?.data.message??"Something wrong happend");
        dispatch({type:`GET_ANALYSIS${stringTransform(type,'U')}_FAIL`});
    }
};