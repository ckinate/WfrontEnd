import { Component, OnInit, ViewEncapsulation, Injector, AfterViewInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from 'primeng/table';
import { NgForm } from '@angular/forms';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { CreateWorkflowLevelDto, WorkflowLevelDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { Paginator } from 'primeng/paginator';
import { LevelrolemappingComponent } from './levelrolemapping/levelrolemapping.component';

@Component({

  templateUrl: './approvallevel.component.html',
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
export class ApprovallevelComponent extends AppComponentBase implements OnInit, AfterViewInit {

  approvalLevelForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

  approvalLevel:  CreateWorkflowLevelDto = new CreateWorkflowLevelDto();
  saving = false;

  @ViewChild('levelRoleMapping', { static: true }) levelRoleMapping: LevelrolemappingComponent;


  constructor(injector: Injector,
              private _approvalService: WorkflowServiceServiceProxy
              ) {

    super(injector);
   }

  ngOnInit(): void {
    this.loadApprovalLevel() ;
  }

  ngAfterViewInit(): void {

  }


  save(approvalLevelForm: NgForm) {

    if (this.approvalLevel.id === 0 || this.approvalLevel.id == null) {
      this.saving = true;
      this.approvalLevel.tenantId = abp.session.tenantId;
      this._approvalService
        .createLevel(this.approvalLevel)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {

          this.notify.info(this.l('SavedSuccessfully'));
        
           this.loadApprovalLevel() ;
          this.approvalLevel = new CreateWorkflowLevelDto();
        });


    } else {
      this._approvalService
        .updateWorkflowLevel(this.approvalLevel)
        .subscribe(() => {
          this.loadApprovalLevel() ;
          this.notify.info('Updated Successfully');
          this.approvalLevel = new CreateWorkflowLevelDto();
        });


    }
    approvalLevelForm.resetForm();

  }

  loadApprovalLevel() {

    this.primengTableHelper.showLoadingIndicator();
    this._approvalService.getWorkflowLevel(
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

      this.primengTableHelper.records = result;
      this.primengTableHelper.hideLoadingIndicator();

    });
  }

  edit(f:CreateWorkflowLevelDto): void {

    this.approvalLevel.levelName = f.levelName;
    this.approvalLevel.id = f.id;
    this.approvalLevel.tenantId = f.tenantId;
  }


  delete(d: WorkflowLevelDto): void {
    this.message.confirm(
        this.l('Do you want to delete this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._approvalService.deleteWorkflowLevel(d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deleted'));
                    this.loadApprovalLevel();

                });
            }
        }
    );
  }

  deactivate(d: WorkflowLevelDto): void {
    this.message.confirm(
        this.l('Do you want to deactivate this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._approvalService.deactivateWorkflowLevel(d.id).subscribe(() => {
                   
                    this.message.info(this.l('Successfully Deactivated'));
                    this.loadApprovalLevel();

                });
            }
        }
    );
  }

  activate(d: WorkflowLevelDto): void {
    this.message.confirm(
        this.l('Do you want to activate this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._approvalService.activateWorkflowLevel(d.id).subscribe(() => {
                   
                    this.message.info(this.l('Successfully activated'));
                    this.loadApprovalLevel();

                });
            }
        }
    );
  }

}
