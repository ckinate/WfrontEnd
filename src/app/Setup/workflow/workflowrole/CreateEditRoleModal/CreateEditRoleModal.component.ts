import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompanyCategoryStructureDto, CompanyStructureServiceProxy, WorkflowRoleDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-CreateEditRoleModal',
  templateUrl: './CreateEditRoleModal.component.html',
  styleUrls: ['./CreateEditRoleModal.component.css']
})
export class CreateEditRoleModalComponent extends AppComponentBase implements OnInit {

  constructor(injector:Injector,   private _approvalService: WorkflowServiceServiceProxy,
    private _companystructurecategorey:CompanyStructureServiceProxy) {
    super(injector)
   }
   @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

   @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
   active = false;
   saving = false;
   //roleDto: WorkflowRoleDto = new WorkflowRoleDto();
   role: WorkflowRoleDto = new WorkflowRoleDto();
   roleid: any;
 valuess: any;

 hideuserfield:boolean;
 disabledamountfield =true;

 hidemiscategory:boolean;

   hideUsersmodal=true;
 companystructurecategory : CompanyCategoryStructureDto[]=[];
   
  ngOnInit() {
    this.getcompanycategory();
  }
  handleChangeMis(e) {    
    this.role.baseType=1;
    this.hideuserfield = false;
    this.hidemiscategory=true;
    this.role.amountLimityType = 0;
    
    this.role.jointApprovalCount = 2;
    
    }
    handleChangeUser(e) {
  
          this.role.baseType=2;
      this.hideuserfield = true;
      this.hidemiscategory =false;
      
      this.role.jointApprovalCount = 2;
      }
      disableamountfield(e) {
  
        this.role.minimumAmount=0;
        this.role.maximumAmount=0;
        this.disabledamountfield = false;
        this.role.amountLimityType = 2;
        this.role.amountLimityTypeName = 'User'
        }
        dontdisableamountfield(e) {
  
          this.role.minimumAmount=0;
          this.role.maximumAmount=0;
          this.disabledamountfield = true;
          this.role.jointApprovalCount = 2;
          this.role.amountLimityType = 3;
          this.role.amountLimityTypeName = 'Global'
          }
  
  show(Id?: number): void {
    this.hideuserfield = false;
    this.hidemiscategory=false;

    if (!Id) {
        this.role = new WorkflowRoleDto();
        this.role.id = Id;
        this.active = true;
        this.modal.show();
    } else {
             this._approvalService.getRoleById(Id).subscribe(result => {
           
            this.role = result;
            if(this.role.baseType == 2){
              this.hideuserfield = true;
          }
          if(this.role.baseType == 1){
            this.hidemiscategory=true;
          }

          console.log(this.role);
            this.active = true;
            this.modal.show();
        });
    }   
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

            //  this.loadRole();
              this.role = new WorkflowRoleDto();
              this.close();
              this.modalSave.emit(null);

            });


        } else {
         
          
          this._approvalService
            .updateWorkflowRole(this.role)
            .subscribe(() => {
           //   this.loadRole();
              this.notify.info('Updated Successfully');
              this.role = new WorkflowRoleDto();
              this.close();
              this.modalSave.emit(null);
            });


        }
  }

//roleForm.resetForm();

}

close(): void {
  this.active = false;
  this.modal.hide();
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
  this.hideuserfield = false;
  this.hidemiscategory=false;

  console.log(f);

  this.role.roleName = f.roleName;
  this.role.id = f.id;
  this.role.tenantId = f.tenantId;
  this.role.baseType=f.baseType;

  this.role.amountLimityType=f.amountLimityType;
  this.role.maximumAmount=f.maximumAmount;
  this.role.minimumAmount=f.minimumAmount;
  this.role.misBaseTypeLimit=f.misBaseTypeLimit;
  this.role.isJointApproval = f.isJointApproval;

  if(f.baseType == 2){
      this.hideuserfield = true;
  }
  if(f.baseType ==1){
    this.hidemiscategory=true;
  }



}


}
