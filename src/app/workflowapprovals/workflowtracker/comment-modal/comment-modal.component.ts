import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { CreateBeneficiarySplitCostDto, WorkflowDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'commentModal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent extends AppComponentBase implements OnInit {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: true }) modal: ModalDirective;
  active = false;

  //bensplitcost: CreateBeneficiarySplitCostDto = new CreateBeneficiarySplitCostDto();
  saving = false;

  //  taxtrans:  CreateTaxTransactionDto = new CreateTaxTransactionDto();

  splitcostForm: NgForm;
  @ViewChild('splitcostdataTable', { static: true }) splitcostdataTable: Table;
  splitcostprimengTableHelper = new PrimengTableHelper();
  //taxList: TaxationDto[] = [];
  paytransId: any;
  TransactionAmount: 0;
  totalAmount: number;
  //departList: CompanyStructureDto[] = [];

  //calculatebuget=new CalculateSpiltCostBudgetDto();
  transtypeId:any;
  requestDate:any;
  comment:any;
  refno:any;
  responsepersone:any;
  operationname:any;
  records: WorkflowDto[]=[];
  results: WorkflowDto[]=[];
  operationId:any;

  constructor(injector: Injector,
    private _workflowService: WorkflowServiceServiceProxy
  ) {

    super(injector);
  }

  ngOnInit(): void {
  }


  show(refNo: any, responsePerson: any,operationName:any,operationid:any): void {
    this.active = true;
    this.refno = refNo;
    this.responsepersone= responsePerson;
    this.operationname= operationName;
   this.operationId=operationid;
    //this.loadRole(id);
   
  

    this.modal.show();
  }


  close(): void {
    this.modal.hide();
    this.active = false;
  }

  onShown(): void {

  }

  save(){
    this.saving = true;

    this.message.confirm(
      this.l('To Continue'),
      this.l('Click on Yes'),
      isConfirmed => {
          if (isConfirmed) {
           
            
            this._workflowService.reminderMail(this.refno, this.comment,this.operationname)
            .pipe(
              finalize(() => {
                this.saving = false;
              })
            ).subscribe(() => {

             // this.notify.info(this.l('SavedSuccessfully'));
              this.message.info("Reminder Mail successfully Sent to the " + this.responsepersone);
              this.WorkflowTracker(this.operationId);
              this.close();
               //this.loadWorkflowMapping() ;
              // this.WorkflowLevel = new CreateWorkflowLevelDto();
            });
          }
      }
  );

  }


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
  
    this._workflowService.loginUserApprovedRequest(operationid
      ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
      
          this.records = result;
          this.primengTableHelper.hideLoadingIndicator();
          console.log(result);
      });
  
  
      this._workflowService.loginUserDeclinedRequest(operationid
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
        
            this.results = result;
            this.primengTableHelper.hideLoadingIndicator();
            console.log(result);
        });
  
  
  
   
  }

}
