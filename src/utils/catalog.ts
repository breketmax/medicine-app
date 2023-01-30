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



  return filteredSupplements;
}