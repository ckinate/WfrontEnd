import { Component, OnInit, Injector, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WorkflowServiceServiceProxy, CreateWorkflowGroupDto,  WorkflowMappingDto, CreateWorkflowMappingDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Paginator } from 'primeng/paginator';

@Component({
  
  templateUrl: './approvalgroup.component.html',
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
export class ApprovalgroupComponent  extends AppComponentBase implements OnInit, AfterViewInit {

  approvalGroupForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  approvalGroup:  CreateWorkflowGroupDto = new CreateWorkflowGroupDto();
  saving = false;

  
 
  constructor(injector: Injector,
    private _approvalService: WorkflowServiceServiceProxy
    ) {

super(injector);
}

  ngOnInit(): void {
    this.loadApprovalGroup();
  }

  ngAfterViewInit(): void {

  }


  

  
    
  save(approvalGroupForm: NgForm) {
    
    
    if (this.approvalGroup.id === 0 || this.approvalGroup.id == null) {
      this.saving = true;
      this.approvalGroup.tenantId = abp.session.tenantId;
      this._approvalService
        .createGroup(this.approvalGroup)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {

          this.notify.info(this.l('SavedSuccessfully'));
      
           this.loadApprovalGroup() ;
          // this.approvalLevel = new CreateApprovalLevelDto();
          this.approvalGroup = new CreateWorkflowGroupDto();
        });


    } else {
      this._approvalService
        .updateWorkflowGroup(this.approvalGroup)
        .subscribe(() => {
          this. loadApprovalGroup() ;
          this.notify.info('Updated Successfully');
          this.approvalGroup = new CreateWorkflowGroupDto();
        });
      // this.getAuthdesignation();

    }
    approvalGroupForm.resetForm();

  }
  
  loadApprovalGroup() {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator.changePage(0);

    //     return;
    // }
    this.primengTableHelper.showLoadingIndicator();
    this._approvalService.getWorkflowGroup(
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

      this.primengTableHelper.records = result;
      this.primengTableHelper.hideLoadingIndicator();
       console.log(result);
    });
  }


  edit(f:CreateWorkflowGroupDto): void {

    this.approvalGroup.groupName = f.groupName;
    this.approvalGroup.id = f.id;
    this.approvalGroup.tenantId = f.tenantId;
  }
  
}
