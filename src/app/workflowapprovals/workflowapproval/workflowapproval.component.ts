import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import {DocumentServiceProxy, WorkflowDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

import { JournaldetailsviewmodalComponent } from './workflowmainmodal/journaldetailsviewmodal/journaldetailsviewmodal.component';
import { WorkflowmainmodalComponent } from './workflowmainmodal/workflowmainmodal.component';

import * as moment from 'moment';
import { WorkflowquerymodalComponent } from './workflowquerymodal/workflowquerymodal.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { DocumentsComponent } from '../documents/documents.component';
import { WorkflowlpoviewdetailsComponent } from './workflow-details/workflowlpoviewdetails/workflowlpoviewdetails.component';
import { FileuploadComponent } from '../FileDocuments/fileupload/fileupload.component';

@Component({
  selector: 'app-workflowapproval',
  templateUrl: './workflowapproval.component.html',
  styleUrls: ['./workflowapproval.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class WorkflowapprovalComponent  extends AppComponentBase implements OnInit, AfterViewInit, OnChanges {

  opexapprovalForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

   saving = false;
   processing = false;
  workflow: WorkflowDto = new WorkflowDto();
  records: WorkflowDto[] = [];
  //workflowAction: WorkflowActionDto = new WorkflowActionDto();

   isChecked = false;
   @ViewChild('testvalue', {static: true}) testvalue: ElementRef;
   @ViewChild('rs', {static: true}) rs: ElementRef;

  // selectedItems: WorkflowActionDto[];
  selectedItems: WorkflowDto[];
   //newSelectedItems: WorkflowActionDto[];
   searchText = '';

   @Input() isactiveq: number;

   @ViewChild('workflowdetails', { static: true })    workflowdetails: WorkflowDetailsComponent;
   @ViewChild('workflowLpoViewDetails', { static: true })    workflowLpoViewDetails: WorkflowlpoviewdetailsComponent;
   @ViewChild('workflowMainModal', { static: true })    workflowMainModal: WorkflowmainmodalComponent;
  //  @ViewChild('appdocuments', { static: true}) appdocuments: DocumentsComponent;
   @ViewChild('fileUpload', { static: true }) fileUpload: FileuploadComponent;
   @ViewChild('workflowQueryModal', { static: true}) workflowQueryModal: WorkflowquerymodalComponent;
 
   comment :any;
   actionStatus: any;

   hideworkflow = false;
   hideapprovalbutton = true;
   hideViewDetails: boolean;

   selectedoperationId: any;



   approvalviewdetailmodalTableHelper = new PrimengTableHelper();



   advancedFiltersAreShown = false;
    filterText = '';
    refFilter = '';
    initiatorFilter = '';
    narrationFilter = '';
    addressFilter = '';
    amountFilter = 0;
    operationNameFilter = '';
    customerTypeFilter = '';
    maxTransactionDateFilter: moment.Moment;
    minTransactionDateFilter: moment.Moment;


  constructor(injector: Injector,
    private _workflowService: WorkflowServiceServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _documentService: DocumentServiceProxy,
    private cdr: ChangeDetectorRef

) {
super(injector);

}


ngOnChanges(changes: SimpleChanges) {
  for (const propName of Object.keys(changes)) {
    console.log( propName);
  }

}
ngOnInit(): void {
  this.processing = true;

  this.selectedItems = new Array<WorkflowDto>();
  let xId = 0;
  xId = this._activatedRoute.snapshot.queryParams['id'];

  this._activatedRoute.queryParams.subscribe(params => {
    this.selectedoperationId = params['OPD'];
  });


  this.getWorkflowbasedOnId();
  this.selectedItems = new Array<WorkflowDto>();
  this.processing = false;
  if (this.selectedoperationId === 19) {
    this.hideViewDetails = true;
} else {

       this.hideViewDetails = true;
}
}

refresh(){
  this.ngOnInit();
  this.comment = "";
}
ngAfterViewInit(): void {
this.primengTableHelper.adjustScroll(this.dataTable);
}


showDocument(id: any, isExternalDocument: any) {
  console.log("The Ref No and OPID is", id + " "+ this.selectedoperationId )
 
 
    this.fileUpload.ShowAttachmentByParentRef(id,isExternalDocument);
  
  
// this.fileUpload.ShowAttachmentByRef(id, this.selectedoperationId);

//   this._documentService.getFilesByUniqueIDAndOPID(id, this.selectedoperationId, 2).subscribe(x => {
//     if (x.length > 0) {
//       this.fileUpload.ShowAttachmentByRef(id, this.selectedoperationId);


//     } else {
//       this.message.warn(
//         'No attachment was added'
//     );
//     }
//   });
}

selectWorkflow(e){

  
  if(e ){

      this.hideapprovalbutton = false;

  }else{
    if(this.selectedItems.length > 0){
      this.hideapprovalbutton = false;

    }else{
      this.hideapprovalbutton = true;
    }

  }

  this.selectedItems = this.selectedItems.filter(x=>x.isQueryActive != 1);
  console.log(this.selectedItems);
}

// singleselect(record, e) {

//   this.processing = true;


//     if (e) {



//      this.workflowAction.id = record.id;
//      this.workflowAction.ref = record.ref;
//      this.workflowAction.comment = this.workflowAction.comment;
//      this.workflowAction.actionStatus = this.workflowAction.actionStatus;

//     this.selectedItems.push(this.workflowAction);  //you push it here right...

//      this.hideapprovalbutton = false;

//     } else {
//       this.hideapprovalbutton = true;
// this.selectedItems.filter(m => m === e.id);
//      this.hideapprovalbutton = true;
//      this.hideapprovalbutton = false;
//      this.workflowAction.ref = !this.workflowAction.ref
//   }
// console.log(this.selectedItems);
//   this.processing = false;
// }

// selectAll(records, e) {


//   this.processing = true;
//     this.selectedItems = [];

//             records.forEach(v => {

//          if (e) {
//            let workflowitem = new WorkflowDto();
//            workflowitem.id = v.id;
//            workflowitem.ref = v.ref;
//            workflowitem.comment = this.workflowAction.comment;
//            workflowitem.actionStatus = this.workflowAction.actionStatus;

//            this.selectedItems.push(workflowitem);  //you push it here right...

//            this.hideapprovalbutton = false;

//            console.log(workflowitem);
//          } else {
//            console.log(v.id + 'UNChecked');
//             this.selectedItems = this.selectedItems.filter(m => m !== v.id);
//             this.hideapprovalbutton = true;

//         }


//             });





//         this.newSelectedItems =  this.selectedItems;  //assign as newSelectedItem.

//          this.processing = false;

// }




 getWorkflowbasedOnId() {


 this.hideworkflow = true;

this.saving = true;
//this.cdr.detectChanges();

console.log(this.selectedoperationId);
this.primengTableHelper.showLoadingIndicator();
this._workflowService.getWorkflowListForUser(this.selectedoperationId)
.pipe(finalize(() =>
this.saving = false)).subscribe(result => {



  this.primengTableHelper.hideLoadingIndicator();
  this.records = result;
  console.log(this.records);


});

}




// approveWorkflow() {



//   this.message.confirm(this.l('Proceed to process?'),
//         this.l('AreYouSure'),
//         isConfirmed => {
//           if (isConfirmed) {
//             this.processing = true;
//  let ar = [];

//  this.selectedItems.forEach(mm =>  {
//    let workflowitemList = new WorkflowDto();

//    this.workflowAction.actionStatus = 2;


//   let o = {
//      'id'          : mm.id,
//      'comment'     : this.comment,
//      'ref'         : mm.ref,
//      'actionStatus': this.workflowAction.actionStatus,
//    };

//    this.newSelectedItem.push(o as WorkflowActionDto);
//   ar.push(o);

//  });  //end of forEAch...

//  this.newSelectedItems = ar;  //assign as newSelectedItem.


//  this.workFlowUpdateService();

//  this.processing = false;
//           }
//         });


// } //end of approveWorkFlow...


workflowInlineApproval(record : any){

this.selectedItems = [];
this.selectedItems.push(record);
//this.selectedItems = record;
  this.workFlowUpdateService();
}

workFlowUpdateService() {
 
  // if(this.selectedItems.length > 0){
  //   this.hideapprovalbutton = false;
    
  //  }
   console.log(this.selectedItems);
   this.message.confirm(this.l('Proceed to process?'),
   this.l('AreYouSure'),
   isConfirmed => {
     if (isConfirmed) {
       this.processing = true;

       this.saving = true;

       this.actionStatus = "authorized";
               this.workflow.tenantId = abp.multiTenancy.getTenantIdCookie();
               this._workflowService.updateWorkflow(this.actionStatus,this.comment,this.selectedItems)
                 .pipe(
                   finalize(() => {
                     this.saving = false;
                   })
                 )
                 .subscribe(() => {
                   this.notify.success(this.l('SavedSuccessfully'));
                   this.message.success('Request Successfully Approved ');
                   this.getWorkflowbasedOnId();
                   this.comment = null;
                   this.hideapprovalbutton = true;
                   this.selectedItems = [];
     
                 });
     
this.processing = false;
     }
   });









}


declineWorkflowService(): void {

  
   this.message.confirm(this.l('Proceed to process?'),
   this.l('AreYouSure'),
   isConfirmed => {
     if (isConfirmed) {
       this.processing = true;

       this.saving = true;
       this.actionStatus = "declined";
       this.workflow.tenantId = abp.multiTenancy.getTenantIdCookie();
       this._workflowService
       .updateWorkflow(this.actionStatus, this.comment,this.selectedItems)
         .pipe(
           finalize(() => {
             this.saving = false;
           })
         )
         .subscribe(() => {
           this.message.info(this.l('Declined Successfully'));
            this.getWorkflowbasedOnId();
            this.comment = null;
            this.hideapprovalbutton = true;
            this.selectedItems = [];
         });
     
this.processing = false;
     }
   });


}

// declineWorkflow() {


//   this.message.confirm(this.l('Proceed to process?'),
//         this.l('AreYouSure'),
//         isConfirmed => {
//           if (isConfirmed) {
//             this.showMainSpinner();
//             this.processing = true;
// let ar = [];

// this.selectedItems.forEach(mm =>  {
//   let workflowitemList = new WorkflowDto();

//   this.workflowAction.actionStatus = 1;


//  let o = {
//     'id'          : mm.id,
//     'comment'     : this.comment,
//     'ref'         : mm.ref,
//     'actionStatus': this.workflowAction.actionStatus,
//   };

//  this.newSelectedItem.push(o as WorkflowActionDto);
//  ar.push(o);

// });  //end of forEAch...

// his.newSelectedItems = ar;  //assign as newSelectedItem.

// console.log(this.newSelectedItems);

// this.declineWorkflowService();


// this.workflow = new WorkflowDto();

// this.processing = false;
// this.hideMainSpinner();
//           }
//         });

// } //end of approveWorkFlow...


add(refNo?: string) {

 let opID= Number(this.selectedoperationId);
 if(opID == 40|| opID==38 ){
      this.workflowLpoViewDetails.getData(refNo,opID);
    }
    else{
     this.workflowdetails.getData(refNo,opID );

       }




}
history(refNo?: string) {

  //this.workflowMainModal.show(this.selectedoperationId,refNo);
 //this.workflowdetails.getData(refNo);




 }

querymodal(refNo?: string, initiator?: string, TransactionDate?: any, activeQuery?: number) {
  this.workflowQueryModal.show(refNo, initiator, TransactionDate, this.selectedoperationId, activeQuery);
}



getWorkflow(event?: LazyLoadEvent) {



 }

 onRowSelect(event) {
  console.log(event);
}




}
