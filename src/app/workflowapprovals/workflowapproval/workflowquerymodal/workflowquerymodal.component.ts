import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileuploadComponent } from '@app/workflowapprovals/FileDocuments/fileupload/fileupload.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { CommentDto, UserListDto, UserServiceProxy, WorkflowDto, WorkflowQueryDto, WorkflowQueryTrailsDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';

import { DateTime } from 'luxon';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'workflowQueryModal',
  templateUrl: './workflowquerymodal.component.html',
  styleUrls: ['./workflowquerymodal.component.css'],
  
})
export class WorkflowquerymodalComponent extends AppComponentBase implements OnInit {
  workflowqueryform= {
    query:'',
    queryresponse:''
  };
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal' , {static: true}) modal: ModalDirective;
  active = false;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('fileUpload', { static: true }) fileUpload: FileuploadComponent;
 primengTableHelper = new PrimengTableHelper();
createquery:  WorkflowQueryDto = new WorkflowQueryDto();
isReady = false;
 saving = false;
 records: WorkflowDto[] = [];
 selectedoperationid:any;
 ParentRef: string;

 querytraillist:  WorkflowQueryTrailsDto[] = [];
 commentlist:CommentDto[]=[]


//  apiForm = {
//   query:'',
//   queryresponse:''
// }

@Input() isactiveq : number;

activeQuery : number;

staffuser: UserListDto[] = [];
@Output() getWorkflowbasedOnId: EventEmitter<any> = new EventEmitter<any>();

usertoquery : any;
  constructor(injector: Injector,
    private _workflow: WorkflowServiceServiceProxy,
    private _stafService: UserServiceProxy
    ) {

    super(injector);
   }
  ngOnInit(): void {
  }


  // ngOnChanges(changes:SimpleChanges){
  //   for (const propName of Object.keys(changes)){
  //     console.log( propName);
  //   }

  // }

  show(refNo:string,initiator:string,TransactionDate:any,operationid:any, activeQuery: any): void {
    this.getStaff();
    this.active = true;

   // console.log(refNo);
    this.selectedoperationid = operationid;

   this.activeQuery = activeQuery;
    this.createquery.operationId=operationid;
    this.createquery.transactionDate=TransactionDate;
    debugger
    this.createquery.refNo=refNo;
    this.usertoquery = initiator;
   this.createquery.queryResponder=initiator;
   //console.log(this.createquery.queryResponder)
   //this.RequestInitiator(username:any)

   this.loadWorkflowqueryTrail(refNo, operationid) ;
   this.getParentRef();
   

    this.modal.show();
  }
  showDocument(){
    this.fileUpload.ShowAttachmentByRefOnly(this.ParentRef);

  }

  getParentRef(){
    this.showMainSpinner();
    this._workflow.getOpexQueryHistoryRef(this.createquery.refNo).subscribe(res=>{
      this.ParentRef = res;
      this.hideMainSpinner();
    })
  }

  getStaff() {
  
     this.staffuser = [];
    this._stafService.getUserList()
      .subscribe(items => {
        this.staffuser = items;
      
        console.log(this.staffuser)
      });
  }

  RequestInitiator(username:any) {
  
    this._workflow.getRequestInitiatorUserName(username)
      .subscribe(items => {
       // this.createquery.queryResponder= items;
        
      });
  }

close(): void {
  this.createquery.queryResponder= this.usertoquery;
  this.modal.hide();
  this.active = false;
}

  onShown(): void {

  }


  save(reset:NgForm ) {
   // console.log(workflowqueryform.value);

    this.primengTableHelper.isLoading = true;
    this.message.confirm( 'You want to send enquiry ',
    this.l('AreYouSure'),
    isConfirmed => {
      if (isConfirmed) {
        this.saving = true;
        //this.createquery.query= workflowqueryform.control.
      //  debugger;
    this._workflow
      .workflowQuery(this.createquery)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((r) => {
        //this.notify.info(this.l('SavedSuccessfully'));
        this.message.info(this.l('Enquiry Successfully Sent  To') + ' ' + this.createquery.queryResponder.toUpperCase() );
        // this.message.info(this.l('SavedSuccessfully') + ' Ref: ' + r );
       // this.loadPayTransaction();

        this.createquery = new WorkflowQueryDto();
       
        this.close();
        this.modalSave.emit(null);


      this.isReady = true;
        reset.resetForm();
      });

    }
  });
this.primengTableHelper.isLoading =false;
//this.getWorkflowbasedOnId.emit("jhihj");

  // workflowqueryform.reset();
  }




   loadWorkflowqueryTrail(refNo, OpId: number) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator.changePage(0);

    //     return;
    // }
    this.primengTableHelper.showLoadingIndicator();
    this._workflow.getQueryTrailsHistory(refNo, OpId
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
      this.querytraillist= result;
      this.primengTableHelper.records = result;
      this.primengTableHelper.hideLoadingIndicator();
      // console.log(result);
    });
  }


  loadcomments(refNo) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator.changePage(0);

    //     return;
    // }
   // this.primengTableHelper.showLoadingIndicator();
    this._workflow.getAuthorizersComments(refNo,this.selectedoperationid
    ).subscribe(result => {
      this.commentlist=result;

      // console.log(result);
    });
  }



}
