import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FileuploadComponent } from '@app/workflowapprovals/FileDocuments/fileupload/fileupload.component';

import { AppComponentBase } from '@shared/common/app-component-base';
import { WorkflowQueryTrailsDto, WorkflowQueryTrailsInput, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'workflowQueryTrailCommentModal',
  templateUrl: './workflowquerytrailcommentmodal.component.html',
  styleUrls: ['./workflowquerytrailcommentmodal.component.css']
})
export class WorkflowquerytrailcommentmodalComponent  extends AppComponentBase implements OnInit {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: true }) modal: ModalDirective;
  @ViewChild('fileUpload', { static: true }) fileUpload: FileuploadComponent;
  active = false;


  saving = false;
  querytraillist:  WorkflowQueryTrailsDto[] = [];

  paytransId: any;
  TransactionAmount: 0;
  totalAmount: number;

  transtypeId:any;
  requestDate:any;
  comment:any;
  refno:any;
  responsepersone:any;
  operationname:any;

  operationId:any;
  concurrenceResponse=" ";

  createworkflowtrail:  WorkflowQueryTrailsInput = new  WorkflowQueryTrailsInput();

  constructor(injector: Injector,
    private _workflowService: WorkflowServiceServiceProxy,

  ) {

    super(injector);
  }

  ngOnInit(): void {
  }
  loadWorkflowqueryTrail(){
    this.showMainSpinner();
    // this._workflowService.getworkflowquerytrails(this.refno,this.operationId).subscribe((res)=>{
    //  this.querytraillist = res;
    //  this.hideMainSpinner();
    // })
    this._workflowService.getQueryTrailsHistory(this.refno, this.operationId).subscribe((res)=>{
        this.querytraillist = res;
        this.hideMainSpinner();
    })

  }


  show(refNo: any, queryInitiator: any,query:any,queryDate:any,transactionDate:any, OPID: any): void {
    this.active = true;


    //this.loadRole(id);

    this.createworkflowtrail.refNo = refNo;
    this.refno = refNo;

       //this.createworkflowtrail.queryDate=queryDate;
       //this.createworkflowtrail.query=query;
       //this.createworkflowtrail.queryInitiator=queryInitiator;
       //this.createworkflowtrail.id=record.id;

       //this.createworkflowtrail.transactionDate=transactionDate;
       this.operationId = OPID;
       this.loadWorkflowqueryTrail();

    this.modal.show();
  }
  showDocument(id: any,operationid:number){

    id = this.createworkflowtrail.refNo ;
    operationid =  this.operationId;
     this.fileUpload.ShowAttachment(id, operationid);

   }



  close(): void {
    this.modal.hide();
    this.active = false;
  }

  onShown(): void {

  }


  noResponse(){
    this.comment="No"
    this.createworkflowtrail.concurrenceResponse="No";
     console.log(this.createworkflowtrail.concurrenceResponse)
  }
  yesResponse(){
    this.comment="Yes"
    this.createworkflowtrail.concurrenceResponse="Yes";
     console.log(this.createworkflowtrail.concurrenceResponse)
  }

  save(){



    this.message.confirm(this.l('You Want To Respond To This Query'),
          this.l('AreYouSure'),
          isConfirmed => {
            if (isConfirmed) {
              this.saving = true;

              this. createworkflowtrail.queryResponse= this.comment;
              //this.createworkflowtrail.tenantId = abp.multiTenancy.getTenantIdCookie();
              this._workflowService.workflowQueryTrail(this.createworkflowtrail)
                .pipe(
                  finalize(() => {
                    this.saving = false;
                  })
                )
                .subscribe(() => {

                  this.message.info("Query Successfully Responded To ");

                  this.comment = null;
                  this.createworkflowtrail = new  WorkflowQueryTrailsInput();
                  this.modalSave.emit(null);
                  this.loadWorkflowqueryTrail();
                  this.close();
                });







            }
          });


  } //end of approveWorkFlow...



  WorkflowTracker(operationid:any) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator.changePage(0);

    //     return;
    // }



    this.primengTableHelper.showLoadingIndicator();
    this._workflowService.loginUserPendingRequest(operationid
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

        this.primengTableHelper.records = result;
        this.primengTableHelper.hideLoadingIndicator();
        console.log(result);
    });





  }


}
