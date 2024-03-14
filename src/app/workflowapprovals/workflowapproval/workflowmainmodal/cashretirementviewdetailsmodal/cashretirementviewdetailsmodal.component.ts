import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { PaymentTransactionDto, CashRetirementServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'cashretirementViewDetailsModal',
  templateUrl: './cashretirementviewdetailsmodal.component.html',
  styleUrls: ['./cashretirementviewdetailsmodal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class CashretirementviewdetailsmodalComponent extends AppComponentBase implements OnInit, AfterViewInit  {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
 
  @ViewChild('modal' , {static: true}) modal: ModalDirective;

  @ViewChild('viewContainer') viewContainer: ViewContainerRef;
  @ViewChild('isLoggedInTemplate') template: TemplateRef<any>;
  @ViewChild('pRef', {static: false}) pRef: ElementRef;

  

  paymentTransactionList: PaymentTransactionDto[];
   paymentTransaction = new PaymentTransactionDto();


  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

   @Output() loadCARApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();

   active = false;
   gId:  string;
   nestedForm: FormGroup;
   Id:number;
   selectedrefNo :any;

  constructor(injector: Injector,
    private _approvalService: CashRetirementServiceServiceProxy,
     private _fb: FormBuilder,
     private _activatedRoute: ActivatedRoute,
    private _router: Router
    //private _stafService: UserServiceProxy
    ) {

super(injector);
}

ngOnInit(): void {
  
 this.getCashretirement();
  
}


   






getCashretirement(id?:number,refNo?: string){

  this._activatedRoute.queryParams.subscribe(params =>{
    this.selectedrefNo = params['newref']  

  });
  this.getCARDetails(this.selectedrefNo);
 
}
  
  getCARDetails(refNo: string) {
    console.log(refNo);
    this._approvalService.getCARRequisitionDetails(refNo).subscribe(result=>{

      this.paymentTransaction = result;
      console.log(this.paymentTransaction);

  });

}




  ngAfterViewInit(): void {
  
  }


}
