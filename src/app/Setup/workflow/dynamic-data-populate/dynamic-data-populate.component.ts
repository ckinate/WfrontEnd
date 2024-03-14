import { Component, OnInit } from '@angular/core';
// import { TabledatadisplayComponent } from './tabledatadisplay.component';
// import { NotabledatadisplayComponent } from './notabledatadisplay.component';
// import { requestItems } from './data';
@Component({
  selector: 'app-dynamic-data-populate',
  templateUrl: './dynamic-data-populate.component.html',
  styleUrls: ['./dynamic-data-populate.component.css']
})
export class DynamicDataPopulateComponent implements OnInit {
  titlee = 'Sample Data 2';
   sampleData = [
    {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"", car:1, lucky_no:5, cheese:"Cheader"},
    {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true, lucky_no:10, cheese:"Gouda"},
    {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true", lucky_no:12, cheese:"Manchego"},
    {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980", lucky_no:18, cheese:"Brie"},
    {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999", lucky_no:33, cheese:"Cheader"},
  ];
 
  title1 = 'Sample 1';
  sampleData1 = [
   {name:"Oli Bob", progress:12, gender:"male"},
   {name:"white", progress:0, gender:"female"},
   {name:"Linus", progress:3, gender:"male"},
   {name:"Mike", progress:8, gender:"male"},
 ];
 
  title2 = 'Sample Data 1';
  obj = {
    key1: "val1",
    key2: "val2",
    key3: "val3",
    key4: "val4",
    key5: "val5",
    key6: "val6"
};
title3 = 'Sample Data 10';
obj2 = {
  "Name": "Chinwendu",
  "Address": "12 Lagos Str, A",
  "Sex": "Male",
  "Nationality": "Nigeria",
  "LGA": "Somolu",
  "State": "Lagos"
};
  itemList = [];
  constructor() { }

  ngOnInit(): void {

   
    
    // this.itemList.push(new requestItems(this.titlee, this.sampleData, true));
    // this.itemList.push(new requestItems(this.title1, this.sampleData1, true));
    // this.itemList.push(new requestItems(this.title2, this.obj, false));
    // this.itemList.push(new requestItems(this.title3, this.obj2, false));
    
  }

}
