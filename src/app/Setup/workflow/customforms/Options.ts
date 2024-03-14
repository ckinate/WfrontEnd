export class Options {
   constructor(
 public   id: number,
 public   name: string) {}
}

export class tempOptions {
  constructor(
public text: string, public value: string
  ){}
}

export class displayItem { 
  constructor( public title: string, public itemvalue: string, public col: number) {}
}