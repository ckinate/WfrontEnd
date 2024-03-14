import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { LeveRoleMappingDto, WorkflowRoleDto, WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'levelRoleMapping',
  templateUrl: './levelrolemapping.component.html',
  styleUrls: ['./levelrolemapping.component.css']
})
export class LevelrolemappingComponent extends AppComponentBase implements OnInit {
  roleuserForm: NgForm;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
   @Input() valueFromChild: any ;
  @ViewChild('modal' , {static: true}) modal: ModalDirective;

  active = false;
  //staffuser: UserListDto[] = [];

  systemrole: WorkflowRoleDto[] = [];

  mm : any;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();

  levelrolecreate : LeveRoleMappingDto = new LeveRoleMappingDto();
  saving = false;

  @Input() id: number;
  @Input() role: WorkflowRoleDto;
  hidesla = false;
  hidesla2 = false;

  levelid:  number;
  user: any;


  constructor(injector: Injector,
    private _WorkflowService: WorkflowServiceServiceProxy,

    ) {

super(injector);
}

ngOnInit(): void {
   this.getrole();


}

ngAfterViewInit(): void {

}

show(id: number): void {
  this.active = true;
  this.levelid = id;
 

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

getrole() {


  this._WorkflowService.getWorkflowRoleMappedToUserRole()
    .subscribe(items => {
      this.systemrole = items;

      console.log(this.systemrole);
    });
}





close(): void {
  this.levelrolecreate.workflowRoleId=0;
  this.levelrolecreate.workflowLevelId=0;
  this.modal.hide();
  this.active = false;
}

  onShown(): void {

  }

  save(roleuserForm: NgForm) {

    if (this.levelrolecreate.id === 0 || this.levelrolecreate.id == null) {

      this.saving = true;
      this.levelrolecreate.tenantId = abp.session.tenantId;
      this.levelrolecreate.workflowLevelId = this.levelid;
      this._WorkflowService
       .createWorkflowLevelRoleMap(this.levelrolecreate)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {

          this.notify.info(this.l('SavedSuccessfully'));
           this.loadRole(this.levelrolecreate.workflowLevelId ) ;
           this.levelrolecreate = new LeveRoleMappingDto();
        });


    } else {
      // this._WorkflowService
      //   .updateLevelRoleMap(this.levelrolecreate)
      //   .subscribe(() => {
      //     this.loadRole(this.levelrolecreate.workflowLevelId )
      //     this.notify.info('Updated Successfully');
      //     this.levelrolecreate = new LeveRoleMappingDto();
      //   });


    }
    roleuserForm.resetForm();

  }

  loadRole(id : number) {




    this.primengTableHelper.showLoadingIndicator();
    this._WorkflowService.getLevelRoleMap(this.levelid
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

      this.primengTableHelper.records = result;

      this.primengTableHelper.hideLoadingIndicator();
      // console.log(result);
    });



  }


  edit(f:LeveRoleMappingDto): void {

    this.levelrolecreate.id = f.id;
    this.levelrolecreate.workflowRoleId = f.workflowRoleId;
    this.levelrolecreate.workflowLevelId = f.workflowLevelId;

    // this.roleusercreate.tenantId = f.tenantId;


  }

  delete(d: LeveRoleMappingDto): void {
    this.message.confirm(
        this.l('Do you want to delete this Role?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deleteworkflowLevelRoleMapping(d.workflowLevelId,d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deleted'));
                    this.loadRole(this.levelid);

                });
            }
        }
    );
  }

  deactivate(d: LeveRoleMappingDto): void {
    this.message.confirm(
        this.l('Do you want to deactivate this Role?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deactivateworkflowLevelRoleMapping(d.workflowLevelId,d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deactivated'));
                    this.loadRole(this.levelid);

                });
            }
        }
    );
  }

  activate(d: LeveRoleMappingDto): void {
    this.message.confirm(
        this.l('Do you want to activate this Role?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.activateworkflowLevelRoleMapping(d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully activated'));
                    this.loadRole(this.levelid);

                });
            }
        }
    );
  }


}
