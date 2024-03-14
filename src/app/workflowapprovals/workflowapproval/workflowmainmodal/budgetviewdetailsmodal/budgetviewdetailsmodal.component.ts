import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { BudGetDto, BudgetManagerServiceServiceProxy, CompanyStructureDto, CompanyStructureServiceProxy, OperatingExpenseServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';

@Component({
  selector: 'budgetViewDetailsModal',
  templateUrl: './budgetviewdetailsmodal.component.html',
  styleUrls: ['./budgetviewdetailsmodal.component.css']
})
export class BudgetviewdetailsmodalComponent extends AppComponentBase implements OnInit  {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: true }) modal: ModalDirective;
  active = false;

  // bensplitcost: CreateBeneficiarySplitCostDto = new CreateBeneficiarySplitCostDto();
  saving = false;



  accrualForm: NgForm;
  @ViewChild('accrualdataTable', { static: true }) accrualdataTable: Table;
  accrualprimengTableHelper = new PrimengTableHelper();
  //taxList: TaxationDto[] = [];
  paytransId: any;
  TransactionAmount: 0;
  totalAmount: number;
  refno:string;
  transtypr:string;
  amountUtilizing:any;
  opextotalAmount:any;

 

  
  companystructureList: CompanyStructureDto[]=[] ;
  mainRefNo:string;

  totalaccruedamount:any;
  totalutilizingamount = 0;
  records: BudGetDto[] = [];

  Id:number;
  selectedrefNo :any;


  // departList: CompanyStructureDto[] = [];

  constructor(injector: Injector,
    private _opex: OperatingExpenseServiceServiceProxy,
    private _companystructure: CompanyStructureServiceProxy,
    private _bugetservice:BudgetManagerServiceServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    
  ) {

    super(injector);
  }

  ngOnInit(): void {
this.getBudget();
  }


  show(refno:string): void {
    
    this.active = true;
  
    this.modal.show();
  }


  close(): void {
    this.modal.hide();
    this.active = false;
  }

  onShown(): void {

  }

  loadBudgetviewdetails(refno:string){
     
    
    this._bugetservice.getBudgetviewdetail(refno
    ).subscribe(result => {

      this.records = result;
      // this.primengTableHelper.hideLoadingIndicator();
       console.log(result);
    });
   }


   getBudget(id?:number,refNo?: string){

    this._activatedRoute.queryParams.subscribe(params =>{
      this.selectedrefNo = params['newref']  
  
    });
    this.loadBudgetviewdetails(this.selectedrefNo);
   
  }
    
    


}
