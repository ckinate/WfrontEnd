import { Component, OnInit, Injector, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WorkflowServiceServiceProxy, WorkflowRoleDto, CompanyStructureServiceProxy, CompanyCategoryStructureDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Paginator } from 'primeng/paginator';
import { WorkflowRoleModalComponent } from './workflow-role-modal/workflow-role-modal.component';
import { CreateEditRoleModalComponent } from './CreateEditRoleModal/CreateEditRoleModal.component';
@Component({
  selector: 'app-workflowrole',
  templateUrl: './workflowrole.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
  styles: [`
//   .ng-valid[required], .ng-valid.required, .ng-valid.p-inputNumber.span  {
//     border-left: 5px solid blue;
// }

// .ng-invalid:not(form), .ng-invalid.span, .ng-invalid.p-inputNumber.span  {
//     border-left: 5px solid red;
// }

`],

})
export class WorkflowroleComponent extends AppComponentBase implements OnInit {

  roleForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  mmm: any;
  role: WorkflowRoleDto = new WorkflowRoleDto();
  saving = false;
  @ViewChild('workflowrolemodal', { static: true }) workflowrolemodal: WorkflowRoleModalComponent;
  @ViewChild('RoleCreateAndEdit', { static: true }) RoleCreateAndEdit: CreateEditRoleModalComponent;

 roleid: any;
 valuess: any;

 hideuserfield:boolean;
 disabledamountfield =true;

 hidemiscategory:boolean;

   hideUsersmodal=true;
 companystructurecategory : CompanyCategoryStructureDto[]=[];

 constructor(injector: Injector,
  private _approvalService: WorkflowServiceServiceProxy,
  private _companystructurecategorey:CompanyStructureServiceProxy
) {

  super(injector);
}

ngOnInit(): void {
  this.loadWorkflowRole();
  this.getcompanycategory();
}

ngAfterViewInit(): void {

}

handleChangeMis(e) {

  console.log(e.target.value);
  this.role.baseType=1;
  this.hideuserfield = false;
  this.hidemiscategory=true;
  }
  handleChangeUser(e) {

    console.log(e.target.value);
    this.role.baseType=2;
    this.hideuserfield = true;
    this.hidemiscategory =false;
    }
    disableamountfield(e) {

      console.log(e.target.value);
      //this.role.baseType=2;
      this.role.minimumAmount=0;
      this.role.maximumAmount=0;
      this.disabledamountfield = false;
      }
      dontdisableamountfield(e) {

        console.log(e.target.value);
        //this.role.baseType=2;
        this.role.minimumAmount=0;
        this.role.maximumAmount=0;
        this.disabledamountfield = true;
        }
 

save() {
    //console.log(this.role);
 
    if(this.role.minimumAmount > this.role.maximumAmount){
        this.message.error(this.l('Minimum Amount cannot be greater than Maximum Amount'));
        return;
    }
    else{
        if (this.role.id === 0 || this.role.id == null) {
            this.saving = true;
            this.role.tenantId = abp.session.tenantId;

            this._approvalService
              .createWorkflowRole(this.role)
              .pipe(
                finalize(() => {
                  this.saving = false;
                })
              )
              .subscribe(() => {

                this.notify.info(this.l('SavedSuccessfully'));

                this.loadWorkflowRole();
                this.role = new WorkflowRoleDto();
              });


          } else {
            this._approvalService
              .updateWorkflowRole(this.role)
              .subscribe(() => {
                this.loadWorkflowRole();
                this.notify.info('Updated Successfully');
                this.role = new WorkflowRoleDto();
              });


          }
    }

  //roleForm.resetForm();

}

loadWorkflowRole() {

  this.primengTableHelper.showLoadingIndicator();
  this._approvalService.getWorkflowRole(
  ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

    this.primengTableHelper.records = result;

    this.primengTableHelper.hideLoadingIndicator();
      // debugger;
      //   result.forEach(x=>{
      //     if(x.baseType==1){
      //       this.hideUsersmodal=false;
      //   }


      // });
  });

}

getRoles(id: number) {
  this._approvalService.getWorkflowRolename(id)
    .subscribe(items => {
      this.valuess = 1;

    });
}

getcompanycategory(){

  this._companystructurecategorey.getAllCompanyCategory()
  .subscribe(items => {
    this.companystructurecategory = items;

  });
}

edit(f: WorkflowRoleDto): void {

  this.role.roleName = f.roleName;
  this.role.id = f.id;
  this.role.tenantId = f.tenantId;
  this.role.baseType=f.baseType;

  this.role.amountLimityType=f.amountLimityType;
  this.role.maximumAmount=f.maximumAmount;
  this.role.minimumAmount=f.minimumAmount;
  this.role.misBaseTypeLimit=f.misBaseTypeLimit;
  this.role.isJointApproval = f.isJointApproval;

  if(this.role.baseType == 2){
      this.hideuserfield = true;
  }else{
    this.hidemiscategory=true;
  }



}

delete(d: WorkflowRoleDto): void {
  this.message.confirm(
      this.l('Do you want to delete this Role?'),
      this.l('Are You Sure'),
      isConfirmed => {
          if (isConfirmed) {
              // this._approvalService.deleteworkflowRole(d.id).subscribe(() => {

              //     this.message.info(this.l('Successfully Deleted'));
              //     this.loadWorkflowRole();

              // });
          }
      }
  );
}
deactivate(d: WorkflowRoleDto): void {
  this.message.confirm(
      this.l('Do you want to deactivate this Role?'),
      this.l('Are You Sure'),
      isConfirmed => {
          if (isConfirmed) {
              this._approvalService.deactivateWorkflowRole(d.id).subscribe(() => {

                  this.message.info(this.l('Successfully Deactivated'));
                  this.loadWorkflowRole();

              });
          }
      }
  );
}
activate(d: WorkflowRoleDto): void {
  this.message.confirm(
      this.l('Do you want to activate this Role?'),
      this.l('Are You Sure'),
      isConfirmed => {
          if (isConfirmed) {
              this._approvalService.activateWorkflowRole(d.id).subscribe(() => {

                  this.message.info(this.l('Successfully activated'));
                  this.loadWorkflowRole();

              });
          }
      }
  );
}

createOrEditRole(): void {
  this.RoleCreateAndEdit.show();        
}


}
