import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
   transform(items: any[], searchText: string): any[] {
    
    let item2:any[];
     
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

      // items.map(it => {
      //   return it.toString().toLocaleLowerCase()});
      //let vv=  items[0].ref.toString().toLocaleLowerCase().includes(searchText);
    return items.filter(it => {
        
      if(it.ref !== null || it.nextRoleName !== null || it.status !== null ||  it.state !== null 
        || it.transactionDate !== null )
       {
            if(it.ref.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.nextRoleName.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.status.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.state.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.transactionDate.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.initiator.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
            else if(it.operationName.toString().toLocaleLowerCase().includes(searchText)){
              return  true; 
            }
       }
     
      // else if(it.initiator.toString().toLocaleLowerCase().includes(searchText)){
      //   return  true; 
      // }else{
      //   return false;
      // }
      

      
      // it.ref.toString().toLocaleLowerCase().includes(searchText);

       

     

    });






    
  //   if (searchText) {
  //     searchText = searchText.toLocaleLowerCase();
  //     return items.filter( movie =>
  //         movie.title.toString().toLocaleLowerCase().indexOf(searchText) !== -1);
  // } else {
  //     return [];
  // }
  }

}
