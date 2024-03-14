import { Component, OnInit, Injector, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { WorkflowServiceServiceProxy, CreateWorkFlowDefinitionDto, OperationsDto, GeneralOperationsServiceServiceProxy, WorkflowGroupDto, WorkflowLevelDto, CreateWorkflowMappingDto, WorkFlowDefinitionDto } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';
import { WorkflowdefinepropertiesComponent } from './workflowdefineproperties/workflowdefineproperties.component';
import { Paginator } from 'primeng/paginator';

import { WorkflowleveldefinitionComponent } from './workflowleveldefinition/workflowleveldefinition.component';

@Component({
  
  templateUrl: './workflowdefinition.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
  styles: [`
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid blue;
}

.ng-invalid:not(form)  {
    border-left: 5px solid red;
}
`],

})
export class WorkflowdefinitionComponent extends AppComponentBase implements OnInit, AfterViewInit {


  workflowDefinitionForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  workflowdefinition:  CreateWorkFlowDefinitionDto = new CreateWorkFlowDefinitionDto();
  operationList: OperationsDto[] = [];
  saving = false;

  WorkflowGroupList:   WorkflowGroupDto[] = [];
  WorkflowLevelList:   WorkflowLevelDto[] = [];
  hidesla = true;
  Workflowmapping: CreateWorkflowMappingDto = new CreateWorkflowMappingDto();
  mmm: WorkFlowDefinitionDto
   levelposition: any;
   groupposition: any;

  // @ViewChild('workFlowDefineProperties', { static: true }) workFlowDefineProperties: WorkflowdefinepropertiesComponent;
   
   @ViewChild('workflowleveldefinition', { static: true }) workflowleveldefinition: WorkflowleveldefinitionComponent;

   //@ViewChild('workflowDefinePropertiesTable', { static: true }) workflowDefinePropertiesTable: Table;
   workflowDefinePropertiesTableHelper = new PrimengTableHelper();

  constructor(injector: Injector,
    private _WorkflowService: WorkflowServiceServiceProxy,
     private _operationService: GeneralOperationsServiceServiceProxy
    ) {

super(injector);
}

ngOnInit(): void {
  this.getOperation();
  this.loadworkflowDefinition();
}

ngAfterViewInit(): void {

}

addForm(id?: number) {
  
}

addLevelModal(workflowDefinitionId :any){
  this.workflowleveldefinition.show(workflowDefinitionId);
}

add(id?: number, opid?: number) {
  //let id = 0;
  //this.workFlowDefineProperties.show(id, opid);

  this.workflowDefinePropertiesTableHelper.showLoadingIndicator();
  this._WorkflowService.getWorkflowMapping(id
  ).pipe(finalize(() => this.workflowDefinePropertiesTableHelper.hideLoadingIndicator())).subscribe(result => {

    this.workflowDefinePropertiesTableHelper.records = result;
 
    this.workflowDefinePropertiesTableHelper.hideLoadingIndicator();
    
  });

}



   


  
 




getOperation() {
  
  this._operationService.getListOperation()
    .subscribe(items => {
      this.operationList = items;
     

 
    });
}

save(workflowDefinitionForm: NgForm) {
 
  if (this.workflowdefinition.id === 0 || this.workflowdefinition.id == null) {
    this.saving = true;
    this.workflowdefinition.tenantId = abp.session.tenantId;
    this._WorkflowService
      .createWorkflowDefinition(this.workflowdefinition)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {

        this.notify.info(this.l('SavedSuccessfully'));
        // this.getAuthdesignation();
         this.loadworkflowDefinition()  ;
         this.workflowdefinition = new CreateWorkFlowDefinitionDto();
      });


  } else {
    this._WorkflowService
      .updateWorkflowDefinition(this.workflowdefinition)
      .subscribe(() => {
        this.loadworkflowDefinition()  ;
        this.notify.info('Updated Successfully');
        this.workflowdefinition = new CreateWorkFlowDefinitionDto();

      });
    // this.getAuthdesignation();

  }
  workflowDefinitionForm.resetForm();

}

loadworkflowDefinition() {
  // if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);

  //     return;
  // }
  this.primengTableHelper.showLoadingIndicator();
  this._WorkflowService.getWorkflowDefinition(
  ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

    this.primengTableHelper.records = result;
    this.primengTableHelper.hideLoadingIndicator();
    // console.log(result);
  });
}
 
Edit(f: CreateWorkFlowDefinitionDto): void {

  this.workflowdefinition.operationId = f.operationId;
  this.workflowdefinition.tenantId = f.tenantId;
  this.workflowdefinition.id = f.id;
  this.workflowdefinition.workflowDefinitionName = f.workflowDefinitionName;
  this.workflowdefinition.workflowDescription = f.workflowDescription;
  

 
  
}

}
