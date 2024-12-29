import { dateFormat } from "./CommonAuthFunction";

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
export const formatGraphData =(graphData:any,year:any)=>{
  const labels = graphData.labels.map((label:any) => dateFormat("YYYY-MM",`${label} ${year}`,"DD MMM YYYY"));
  // Step 2: Group data by month for each dataset
  const monthlyTotals = graphData.datasets.map((dataset:any) => {
    const monthlyData = labels.reduce((acc:any, month:any, index:any) => {
      acc[month] = (acc[month] || 0) + dataset.data[index];
      return acc;
    }, {});
  
    // Convert the aggregated data back into arrays for chart compatibility
    return {
      data: Object.values(monthlyData),
      colorCode: dataset.colorCode,
      strokeWidth: dataset.strokeWidth,
      color:dataset.color
    };
  });
  console.log(monthlyTotals);
  
  // Step 3: Extract unique months for new labels
  const uniqueMonths = Array.from(new Set(labels)).map(el=>dateFormat("MMMM",el,"YYYY-MM"));
  
  // Create a new graphData object with aggregated data
  console.log({
    labels: uniqueMonths,
    datasets: monthlyTotals,
    legend: graphData.legend
  });
  
  return {
    labels: uniqueMonths,
    datasets: monthlyTotals,
    legend: graphData.legend
  };
}


  ///
  export const convertData =(data:any[])=>{
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format as YYYY-MM
    if (!acc[yearMonth]) {
      acc[yearMonth] = { totalAmount: 0, items: [] };
    }
    acc[yearMonth].totalAmount += item.amount;
    acc[yearMonth].items.push(item);
  
    return acc;
  }, {});
  const result = Object.keys(groupedData).map(key => ({
    month: key,
    totalAmount: groupedData[key].totalAmount,
    items: groupedData[key].items
  }));
  return result
}