import { Component, OnInit, ViewChild, Injector, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { GeneralOperationsServiceServiceProxy, OperationsDto, WorkflowDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CommentModalComponent } from './comment-modal/comment-modal.component';

import { OutstandingauthorizersModalComponent } from './outstandingauthorizers-modal/outstandingauthorizers-modal.component';
import { OpexworkflowtrailmodalComponent } from './opexworkflowtrailmodal/opexworkflowtrailmodal.component';

@Component({
  
  templateUrl: './workflowtracker.component.html',
  styleUrls: ['./workflowtracker.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class WorkflowtrackerComponent extends AppComponentBase implements OnInit, AfterViewInit {


 workflowForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();
  @ViewChild('dataTableApproved', { static: true }) dataTableApproved: Table;
  @ViewChild('paginatorApproved', { static: true }) paginatorApproved: Paginator;
  primengTableHelperApproved = new PrimengTableHelper();
  @ViewChild('dataTableDeclined', { static: true }) dataTableDeclined: Table;
  @ViewChild('paginatorDeclined', { static: true }) paginatorDeclined: Paginator;
  primengTableHelperDeclined = new PrimengTableHelper();
  operationList: OperationsDto[] = [];
  hidetab = false;

  operationId = 0;
  @ViewChild('commentModal', { static: true }) commentModal: CommentModalComponent;
  @ViewChild('opexWorkflowTrailModal', { static: true }) opexWorkflowTrailModal: OpexworkflowtrailmodalComponent;
  @ViewChild('outstandingAuthorizersModal', { static: true }) outstandingAuthorizersModal: OutstandingauthorizersModalComponent;

  //@ViewChild('epltable', { static: false }) epltable: ElementRef;
  pendingrecords: WorkflowDto[]=[];
  approvedrecords: WorkflowDto[]=[];
  declinerecords: WorkflowDto[]=[];
  results: WorkflowDto[]=[];
  searchText = '';
  constructor(injector: Injector,
    
    private _workflowService: WorkflowServiceServiceProxy,
    private _operationService: GeneralOperationsServiceServiceProxy
) 
{ 
super(injector);

}

ngOnInit(): void {
  
    this.getOperation();
  //  this.WorkflowTracker(this.operationId);
}

ngAfterViewInit(): void {

}

WorkflowTracker(operationid:number) {
 


  this.operationId = operationid;


  
 
 this.getloginUserPendingRequest(operationid)

  this.getloginUserApprovedRequest(operationid)
   
     
    
  this.getLoginUserDeclinedRequest(operationid);




     
 
}


getloginUserPendingRequest(operationid:number){
  this._workflowService.loginUserPendingRequest(operationid
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
    
        this.pendingrecords = result;
        this.primengTableHelper.hideLoadingIndicator();
        console.log(result);
    });
}


  getloginUserApprovedRequest(operationid:number){
    this._workflowService.loginUserApprovedRequest(operationid
      ).pipe(finalize(() => this. primengTableHelperApproved.hideLoadingIndicator())).subscribe(result => {
      
          this.approvedrecords = result;
          this. primengTableHelperApproved.hideLoadingIndicator();
          console.log(result);
      });
  }

   getLoginUserDeclinedRequest(operationid:number){
           
    this._workflowService.loginUserDeclinedRequest(operationid
      ).pipe(finalize(() => this. primengTableHelperDeclined.hideLoadingIndicator())).subscribe(result => {
      
          this.declinerecords= result;
          this. primengTableHelperDeclined.hideLoadingIndicator();
          console.log(result);
      });
   }



getOperation() {
  
  this._operationService.getListOperation()
    .subscribe(items => {
      this.operationList = items;
     

 
    });
}



   
  delete(d: WorkflowDto): void {
  
    this.message.confirm(
        this.l('Do you want to delete this request?'),
        this.l('AreYouSure'),
        isConfirmed => {
            if (isConfirmed) {
                this._workflowService.deleteWorkflowByRef(d.ref,d.operationId).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deleted'));
                    this.WorkflowTracker(this.operationId);
                });
            }
        }
    );
  }

  view(f:WorkflowDto ){
       
     this.commentModal.show(f.ref,f.nextRoleName,f.operationName,this.operationId);
  }

  add(refNo?: any) {
     
  
    this.opexWorkflowTrailModal.show(refNo);


  }

  outstandingauthorizermodal(refno:any,operationid:any,workflowdefinitionid:any,amount:any){
  
    this.outstandingAuthorizersModal.show(refno,operationid,workflowdefinitionid,amount);
  }




}
