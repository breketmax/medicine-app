import { ModalState } from './../store/reducers/ModalSlice';
import { IInDay } from './../types/ISchedule';

import { ISupplement, IPurpose, ISupp } from '../types/ISupplement';



export const getCatalog = (suppliment:ISupplement ) =>{
  let categoriesNames = new Set();
  let categoriesIcons = new Set();
  suppliment.SupplementsList.forEach(s => {
    s.Purposes.forEach(
      p=>{
        categoriesNames.add(p.Purpose);
        categoriesIcons.add(p.PurposePicture);
      }
    )
  })
  let categories:IPurpose[] = [];
  let categoriesNamesArray = Array.from(categoriesNames);
  let categoriesIconsArray = Array.from(categoriesIcons);
  categoriesNamesArray.forEach( (cat,i) => {
    let newObj:IPurpose = {
      Purpose:"" + cat,
      PurposePicture:"" + categoriesIconsArray[i]
    };
    categories.push(newObj);
  })

  categories.sort((a,b) => a.Purpose > b.Purpose ? 1 : -1)
  return categories;
}


const sortSupplements = (supplements:ISupp[],filter:string) =>{
  let regExp = /(\w+)_(\w+)/;
  let params:RegExpMatchArray | null = filter.match(regExp);
  let sort:string;
  let field:string;

  if(params){
    field = params[1];
    sort = params[2]
  }
  else{
    return supplements
  }
  

  if(sort === "increase"){
    supplements.sort((a,b) => (
      a[field as keyof ISupp ] > b[field as keyof ISupp] ? 1 : -1
    ))
  }else{
    supplements.sort((a,b) => (
      a[field as keyof ISupp ] < b[field as keyof ISupp] ? 1 : -1
    ))
  }

  return supplements;

}


export const getFilteredSupplements = (supplements:ISupp[],activeCatalog:string,filter:string) => {
  let filteredSupplements:ISupp[] = [];
  
  if(activeCatalog !== "all"){
    filteredSupplements = supplements.filter(s => {
      let contain:number = 0;
      for (let i = 0; i < s.Purposes.length; i++) {
        if(s.Purposes[i].Purpose === activeCatalog){
          contain++
        }
      }
      return contain; 
    })
  }
  else{
    filteredSupplements = [...supplements];
  }

  sortSupplements(filteredSupplements,filter);

  return filteredSupplements;
}



export const calcNextScheduleTime = (lastTime:string,index:number):string =>{
  let lastHour = Number(lastTime.match(/^\d+/gm));
  lastHour+=index;
  if(lastHour >= 24){
    return `${lastHour-24 < 10 ? "0" : ""}${lastHour-24}:00`
  }
  return `${lastHour < 10 ? "0" : ""}${lastHour}:00`
};


export const getWordsEnd = (value:number):string => {
  let lastTwoNumbers = value % 100;
  let str = `${value} ??????????`;
  if(lastTwoNumbers >=11 && lastTwoNumbers<=19){
    return str + "????"
  }
  else{
    let lastNumber = value %10;
    switch(lastNumber){
      case 1:
        return str + ""
      case 2:
      case 3:
      case 4:
        return str +"??"
      default:
        return str + "????"
    }
  }  
}


export const getScheduleString = (supplementSchedule:IInDay[]):string => {
  let suppString:string = getWordsEnd(supplementSchedule.length) + ": ";
  suppString += supplementSchedule.map(taking => {
    let takeStr:string = "";
    takeStr+= " " + taking.time;
    takeStr+= taking.doza >= 1 ? ` ${taking.doza} ????` : taking.doza === 0.25 ? " ?? ????" : " ?? ????";
    return takeStr ;
  })


  return suppString;

}

export const validateTime =(prev:string,value:string):string =>{
  if(/[^:\d]/gm.test(value)){   //ban for non digit characters
    return prev
  }
  const [hours,minutes]:string[] = value.split(":")    //calculate correct of hrs and min

  switch (value.length){
    case 0:
      return value
    case 1:
      if(+value >= 0 && +value < 3){
        return value
      }
      else{
        return "0" + value + ":"
      }
    case 2:
      if (+value > 23){
        return value.slice(0,1) + ":" + value.slice(1)
      }
      else{
        return value + ":"
      }
    case 3:
      if(prev.length > value.length){
        return value.slice(0,2)
      }
      return value
    case 4:
      if(+minutes > 5){
        return prev
      }
      return value
    case 5:
      if(+minutes > 59){
        return prev
      }
      return value
    default:
      return prev

  }
  
  // if(value.length===1){
  //   if( +value <3 || +value>9){
  //     timeStr = timeStr.length ===1 ? value + ":" : value
  //   }
  //   else{
  //     timeStr = `0${value}:`
  //   }
  //   return timeStr;
  // }
  

  // if(+hours >23 || +minutes > 59){
  //   if(+hours > 99  ){
  //     return value.slice(0,2) + ":" + value.slice(2)
  //   }
  //   return prev.length === 2 ? prev + ":": prev
  // }
  // return value;
};

export const getCourseString = (timeSchedule:ModalState[],time:string):string =>{
  let sumDoze:number = 0;
  timeSchedule.forEach(ts => {
    sumDoze += ts.inDay.filter( t => t.time === time)[0].doza;
  })
  let courseString = sumDoze + " ????: ";
  courseString += timeSchedule.map(sup => (" " + sup.supplement.GoodsCommercialName+ " " + sup.inDay.filter(t => t.time === time)[0].doza + "????"));
  return courseString;
};