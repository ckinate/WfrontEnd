import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowQueryDto, WorkflowQueryTrailsDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { DocumentsComponent } from '../documents/documents.component';
import { FileuploadComponent } from '../FileDocuments/fileupload/fileupload.component';
import { WorkflowDetailsComponent } from '../workflowapproval/workflow-details/workflow-details.component';
import { WorkflowquerytrailcommentmodalComponent } from './workflowquerytrailcommentmodal/workflowquerytrailcommentmodal.component';

@Component({
  selector: 'app-workflowquerytrail',
  templateUrl: './workflowquerytrail.component.html',
  styleUrls: ['./workflowquerytrail.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class WorkflowquerytrailComponent extends AppComponentBase implements OnInit, AfterViewInit  {

  opexapprovalForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

   saving = false;
   processing = false;
  //workflow: WorkflowDto= new WorkflowDto();
  records: WorkflowQueryDto[] = [];
  //workflowAction: WorkflowActionDto = new WorkflowActionDto();

  createworkflowtrail: WorkflowQueryTrailsDto = new WorkflowQueryTrailsDto();

   isChecked = false;
   @ViewChild('testvalue', {static: true}) testvalue: ElementRef;
   @ViewChild('rs', {static: true}) rs: ElementRef;

   selectedItems: WorkflowQueryTrailsDto[];

   searchText = '';
   comment=null;

   @ViewChild('appdocuments', { static: true}) appdocuments: DocumentsComponent
   @ViewChild('workflowQueryTrailCommentModal', { static: true}) workflowQueryTrailCommentModal: WorkflowquerytrailcommentmodalComponent;
   @ViewChild('workflowdetails', { static: true })    workflowdetails:WorkflowDetailsComponent;
   @ViewChild('fileUpload', { static: true }) fileUpload: FileuploadComponent;

   hideworkflow = false;
   hideapprovalbutton=true;

   selectedoperationId :any;



   approvalviewdetailmodalTableHelper = new PrimengTableHelper();




  constructor(injector: Injector,
    private _workflowService: WorkflowServiceServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,

)
{
super(injector);

}
  ngAfterViewInit(): void {
  //  throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getWorkflowquery();
  }

  showDocument(id: any,operationid:number){

   // this.appdocuments.ShowAttachmentforQuery(id,operationid);
    this.fileUpload.ShowAttachmentByRef(id, operationid);

  }


  add(refNo: string , queryInitiator: any,query:any,queryDate:any,transactionDate:any, OpID:any) {

    //this.workflowMainModal.show(this.selectedoperationId,refNo);
   this.workflowQueryTrailCommentModal.show(refNo,queryInitiator,query,queryDate,transactionDate,OpID);




   }


   viewmoredetails(refNo?: string,operationId?:any) {

    //this.workflowMainModal.show(this.selectedoperationId,refNo);
   this.workflowdetails.getData(refNo, operationId);




   }



  getWorkflowquery() {




   this.primengTableHelper.showLoadingIndicator();
   this._workflowService.getloginUserQuery().pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {



     this.primengTableHelper.hideLoadingIndicator();
     this.records= result;
      console.log(result);

   });

   }


}
