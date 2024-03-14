import { AfterViewInit, Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowLeveInputDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { WorkflowdefinepropertiesComponent } from '../workflowdefineproperties/workflowdefineproperties.component';
import { ChildCommunicationService } from '@shared/utils/child-communication.service';

@Component({
  selector: 'workflowleveldefinition',
  templateUrl: './workflowleveldefinition.component.html',
  styleUrls: ['./workflowleveldefinition.component.css']
})
export class WorkflowleveldefinitionComponent extends AppComponentBase implements OnInit {

  WorkflowMappingForm: NgForm

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

   @ViewChild('modal' , {static: true}) modal: ModalDirective;
   active = false;

   @ViewChild('workFlowDefineProperties', { static: true }) workFlowDefineProperties: WorkflowdefinepropertiesComponent;
   
   
 workflowFormID: any;

   hidesla = false;
   saving= false;
 
   @ViewChild('dataTable', { static: true }) dataTable: Table;
   primengTableHelper = new PrimengTableHelper();
   @ViewChild('paginator', { static: true }) paginator: Paginator;

  
   //primengTableHelperSetupGL = new PrimengTableHelper();

   verifyAmount
   

   isUserMappedToRole = false;
   levelPosition : any;
   workflowDefinitionId : any;

  constructor(injector: Injector,
    private _WorkflowService: WorkflowServiceServiceProxy,
    private childCommunicationService: ChildCommunicationService
    // private _operationService: GeneralOperationsServiceServiceProxy,
    
    //private _stafService: UserServiceProxy
    ) {

super(injector);
}


  ngOnInit(): void {
    
  }

  show(workflowDefinitionId : any) : void {
    this.active = true;
     this.workflowDefinitionId = workflowDefinitionId;
     
     this.GetWorkflowLevels();
    this.modal.show();
  
   
  }

  close(): void {
    this.modal.hide();
    this.active = false;
  }
  
    onShown(): void {
  
    }

    add(opid? : any) {
   
      if(this.workflowDefinitionId > 0){

        this._WorkflowService.getlevelPosition(this.workflowDefinitionId )
        .subscribe(items => {
          this.levelPosition = items;
          
          //call any function in child component that is subscribe to it.
          this.childCommunicationService.callChildFunction();

         //open modal
          this.workFlowDefineProperties.show(this.workflowDefinitionId , this.levelPosition ,opid);
    
        });
        
      }
    }  
    
    GetWorkflowLevels() {

   
      this.primengTableHelper.showLoadingIndicator();
      this._WorkflowService.getListOfWorkflowSetup(this.workflowDefinitionId
      ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
  
        this.primengTableHelper.records = result;
  
        this.primengTableHelper.hideLoadingIndicator();
         console.log(result);
        // this.loadWorkflowMapping.emit();
  
      });

  
  
  
  
    }

   
   EditLevel(record : WorkflowLeveInputDto){
      this.workFlowDefineProperties.editModal(record);
   }

   deactivate(record: WorkflowLeveInputDto): void {
    this.message.confirm(
        this.l('Do you want to deactivate this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deactivateWorkflowMapping(record.workflowDefinitionId,record.levelPosition,record.levelId).subscribe(() => {
                   
                    this.message.info(this.l('Successfully Deactivated'));
                    this.GetWorkflowLevels();
                    //this.Workflowmapping = new CreateWorkflowMappingDto();
                   // this.refresh();
                });
            }
        }
    );
  }

  updateWorkflowDefinitionId(){

    this.saving = true;

    this.message.confirm(
      this.l('that workflow setup is complete'),
      this.l('AreYouSure'),
      isConfirmed => {
          if (isConfirmed) {
          //  this.Workflowmapping.tenantId= abp.session.tenantId;
            
            this._WorkflowService.updateWorkflowDefinitionIfWorkflowMappingisCompleted(this.workflowDefinitionId)
            .pipe(
              finalize(() => {
                this.saving = false;
              })
            ).subscribe(() => {

              this.notify.info(this.l('SavedSuccessfully'));
              this.message.info("Workflow Setup Completed successfully");
              //this.loadWorkflowDefineProperty();
              this.close();
               //this.loadWorkflowMapping() ;
              // this.WorkflowLevel = new CreateWorkflowLevelDto();
            });
          }
      }
  );

  }
}
