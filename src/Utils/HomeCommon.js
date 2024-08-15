export const stringTransform = (str,transform) =>{
    let formatedStr = str;
    if(str && transform){
        transform = transform.toUpperCase();
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