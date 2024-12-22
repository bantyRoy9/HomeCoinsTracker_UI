export const stringTransform = (str:string,transform:"L"|"U"|"C") =>{
    let formatedStr = str;
    if(str && transform){
        switch(transform){
            case "L" :
                formatedStr = str.toLowerCase();
                break;
            case "U" :
                formatedStr = str.toUpperCase();
                break;
            case "C" :
                formatedStr = str.charAt(0).toUpperCase() + str.slice(1);
                break
            default :
                break;
        }
    }
    return formatedStr
}