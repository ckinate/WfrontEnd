import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { WorkflowServiceServiceProxy, User, UserServiceProxy, RoleUserMappingDto, WorkflowRoleDto, CreateRoleUserMappingDto, UserRole, RoleListDto, RoleServiceProxy, UserListDto, CreateWorkflowUserManagementRoleMapDto, Role } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'workflowrolemodal',
  templateUrl: './workflow-role-modal.component.html',
   styles: [`
//   .ng-valid[required], .ng-valid.required  {
//     border-left: 5px solid blue;
// }

// .ng-invalid:not(form)  {
//     border-left: 5px solid red;
// }
`],

})
export class WorkflowRoleModalComponent extends AppComponentBase implements OnInit {

  roleuserForm: NgForm;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
   @Input() valueFromChild: any ;
  @ViewChild('modal' , {static: true}) modal: ModalDirective;
  
  active = false;
  staffuser: UserListDto[] = [];
 
  systemrole: Role[] = [];

  mm : any;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();
   
  //roleusercreate : CreateRoleUserMappingDto = new CreateRoleUserMappingDto();
  roleusercreate : CreateWorkflowUserManagementRoleMapDto = new CreateWorkflowUserManagementRoleMapDto();
  saving = false;

  @Input() id: number; 
  @Input() role: WorkflowRoleDto; 
  hidesla = false;
  hidesla2 = false;

  roleid:  number;
  user: any;

 
  constructor(injector: Injector,
    private _WorkflowService: WorkflowServiceServiceProxy,
    private _stafService: UserServiceProxy,
    private _roleService: RoleServiceProxy
    ) {

super(injector);
}

ngOnInit(): void {
   //this.getStaff();
   this.getRoles();
 
}

ngAfterViewInit(): void {

}

show(id: number): void {
  this.active = true;
  this.roleid = id;
  //console.log(id);
  
  this.loadRole(id);

 

 
  this.modal.show();
}



togglech(event){

  this.hidesla = !this.hidesla;
  this.hidesla2 = false;
}
togglech2(event){

  this.hidesla2 = !this.hidesla2;
  this.hidesla = false;
}

getStaff() {
  
  
  this._stafService.getUserList()
    .subscribe(items => {
      this.staffuser = items;
      for (let user of this.staffuser) {
        user['custom'] = user.firstName + ' ' + user.lastName;
      }

      console.log( this.user);
      console.log(this.staffuser);
    });
}


getRoles() {
  
  this._roleService.getRoleList()
    .subscribe(items => {
      this.systemrole = items;
      
    //  console.log(this.systemrole);
    });
}



close(): void {
  this.modal.hide();
  this.active = false;
  this.refresh();
}

  onShown(): void {

  }

  save(roleuserForm: NgForm) {

    if(this.roleusercreate.minimumAmount> this.roleusercreate.maximumAmount){
       this.message.error(this.l('Minimum Amount cannot be greater than Maximum Amount'));
       return;
    }
    else{
          if (this.roleusercreate.id === 0 || this.roleusercreate.id == null) {
     
      this.saving = true;
      //this.roleusercreate.tenantId = abp.session.tenantId;
      this.roleusercreate.workflowRoleID= this.roleid;
      this._WorkflowService
       .createWorkflowUserManagementRoleMap(this.roleusercreate)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {
  
          this.notify.info(this.l('Saved Successfully'));        
           this.loadRole(this.roleid ) ;  
           this.roleusercreate = new CreateWorkflowUserManagementRoleMapDto(); 
           this.modalSave.emit(null);      
        });
  
  
    } else {
      // this._WorkflowService
      //   .updateStaffRoleMap(this.roleusercreate)
      //   .subscribe(() => {
      //     this.loadRole(this.roleid )
      //     this.notify.info('Updated Successfully');
      //     this.roleusercreate = new CreateWorkflowUserManagementRoleMapDto(); 
      //   });
      
  
    }

    }
  

    roleuserForm.resetForm();
  
  }
  
  loadRole(id : number) {

    this.primengTableHelper.showLoadingIndicator();
    this._WorkflowService.getWorkflowUserManagementRoleMapDto(id
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
  
      this.primengTableHelper.records = result;
   
      this.primengTableHelper.hideLoadingIndicator();
      // console.log(result);
    });



  }
  

  edit(f:CreateWorkflowUserManagementRoleMapDto): void {
  
    this.roleusercreate.id = f.id;
    //this.roleusercreate.r = f.userFullName;
    this.roleusercreate.workflowRoleID = f.workflowRoleID;
    this.roleusercreate.userManagementRoleID = f.userManagementRoleID;
    // this.roleusercreate.userName = f.userName;
    //this.roleusercreate.tenantId = f.tenantId;
    this.roleusercreate.maximumAmount = f.maximumAmount;
    this.roleusercreate.minimumAmount = f.minimumAmount;
   // this.roleusercreate.isActive = true;
   
    
  }

  delete(d: CreateWorkflowUserManagementRoleMapDto): void {
    this.message.confirm(
        this.l('Do you want to unMap this role?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
              
                // this._WorkflowService.deleteStaffMapToRole(d.roleId,d.id).subscribe(() => {
                   this._WorkflowService.unMapUserManagementRole(d.workflowRoleID).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully UnMapped'));
                    this.loadRole(this.roleid);
                    this.modalSave.emit(null);
                    
                });
            }
        }
    );
  }

  refresh(): void {
    window.location.reload();
  }
  deactivate(d: RoleUserMappingDto): void {
    this.message.confirm(
        this.l('Do you want to deactivate this staff?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deactivateStaffMapToRole(d.roleId,d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deactivated'));
                    this.loadRole(this.roleid);
                    
                });
            }
        }
    );
  }

  activate(d: RoleUserMappingDto): void {
    this.message.confirm(
        this.l('Do you want to activate this staff?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.activateStaffMapToRole(d.id).subscribe(() => {
                   
                    this.message.info(this.l('Successfully activated'));
                    this.loadRole(this.roleid);
                    
                });
            }
        }
    );
  }
 

}
