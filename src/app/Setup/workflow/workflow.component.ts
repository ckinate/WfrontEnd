import { Component, OnInit, ViewEncapsulation, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';

import { Paginator } from 'primeng/paginator';
import * as moment from 'moment';
//import { id } from '@swimlane/ngx-charts/release/utils';
import { Subject } from 'rxjs';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
//import { CreateAuthorizationDesignationMappingDto, CreateAuthorizationDesignationDto, CreateAuthorizationSettingDto, WorkflowManagementServiceServiceProxy, AuthorizationDesignationDto, AuthorizationDesignationMappingDto, AuthorizationSettingDto, OperationDto, GeneralOperationsServiceServiceProxy, UserListDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionTreeModalComponent } from '@app/admin/shared/permission-tree-modal.component';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import Stepper from 'bs-stepper';

@Component({

  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class WorkflowComponent extends AppComponentBase implements OnInit, AfterViewInit {

  approvalForm: NgForm;
  approvalFilterForm: NgForm;
  authsettingForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('dataTableAuthSetting', { static: true }) dataTableAuthSetting: Table;
  @ViewChild('dataTableAuthMapping', { static: true }) dataTableAuthMapping: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();
  primengTableHelperAuthSetting = new PrimengTableHelper();
  primengTableHelperAuthMapping = new PrimengTableHelper();

  dtTrigger: Subject<any> = new Subject();
  saving = false;
  isReady = true;


  // authdesignation: CreateAuthorizationDesignationDto = new CreateAuthorizationDesignationDto();
  // authdesignationmapping: CreateAuthorizationDesignationMappingDto = new CreateAuthorizationDesignationMappingDto();
  // selectedUsername: string;
  // getdesignmapping: AuthorizationDesignationDto[] = [];
  // //  authmaping: GetAuthorizationDesignationMappingDto[] = [];
  // authSetting: CreateAuthorizationSettingDto = new CreateAuthorizationSettingDto();

  // operations: OperationDto[] = [];
  // staffuser: UserListDto[] = [];
  filterText = '';
  role = '';
  onlyLockedUsers = false;

  @ViewChild('permissionFilterTreeModal', { static: true }) permissionFilterTreeModal: PermissionTreeModalComponent;

  private stepper: Stepper;

  constructor(injector: Injector,
    private _activatedRoute: ActivatedRoute,
    // private _workflowService: WorkflowManagementServiceServiceProxy,
    // private _opService: GeneralOperationsServiceServiceProxy,
    // private _stafService: UserServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.loadAuthDesignation();

    // this.getAuthdesignation();
    // this.getStaff();
    // this.getOperation();
   // this.loadMapping();
    this.mee();

  }



  ngAfterViewInit(): void {

  }





  // getStaff() {
  
  //   this._stafService.getUserList()
  //     .subscribe(items => {
  //       this.staffuser = items;
  //       for (let user of this.staffuser) {
  //         user['custom'] = user.firstName + ' ' + user.name;
  //       }

  //       console.log(items);
  //       console.log(this.staffuser);
  //     });
  // }







  //Authorization Designation Starts hear

  // save(approvalForm: NgForm) {
  //   debugger;
  //   if (this.authdesignation.id === 0 || this.authdesignation.id == null) {
  //     this.saving = true;
  //     this.authdesignation.tenantId = abp.session.tenantId;
  //     this._workflowService
  //       .createItem(this.authdesignation)
  //       .pipe(
  //         finalize(() => {
  //           this.saving = false;
  //         })
  //       )
  //       .subscribe(() => {

  //         this.notify.info(this.l('SavedSuccessfully'));
  //         this.getAuthdesignation();
  //         this.loadAuthDesignation();
  //     //    this.authdesignation = new CreateAuthorizationDesignationDto();
  //       });


  //   } else {
  //     this._workflowService
  //       .updateAuthDesignationItem(this.authdesignation)
  //       .subscribe(() => {
  //         this.loadAuthDesignation();
  //         this.notify.info('Updated Successfully');

  //       });
  //     // this.getAuthdesignation();

  //   }
  //   approvalForm.resetForm();

  // }


  // loadAuthDesignation() {
  //   // if (this.primengTableHelper.shouldResetPaging(event)) {
  //   //     this.paginator.changePage(0);

  //   //     return;
  //   // }
  //   this.primengTableHelper.showLoadingIndicator();
  //   this._workflowService.getAuthDesignationsItem(
  //   ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

  //     this.primengTableHelper.records = result;
  //     this.primengTableHelper.hideLoadingIndicator();
  //     // console.log(result);
  //   });
  // }

  // getAuthdesignation() {
  //   // debugger;
  //   this._workflowService
  //     .getAuthDesignationsItem()
  //     .subscribe((result: []) => {
  //       this.getdesignmapping = result;
  //     });
  // }


  // deleteAuthDesignation(authdesignation: CreateAuthorizationDesignationDto): void {
  //   this.message.confirm(
  //     this.l('AcctChartDeleteWarningMessage', authdesignation.id),
  //     this.l('AreYouSure'),
  //     isConfirmed => {
  //       if (isConfirmed) {
  //         this._workflowService.deleteDesignation(authdesignation.id).subscribe(() => {
  //           // this.reloadPage();
  //           this.loadAuthDesignation();
  //           this.notify.success(this.l('SuccessfullyDeleted'));
  //         });
  //       }
  //     }
  //   );
  // }



  // Authorization Designation Mapping Starts Here
  // map(approvalFilterForm: NgForm): void {
    
  //   // const user = this.authdesignationmapping.username;
  //   console.log(this.authdesignationmapping);
  //   if (this.authdesignationmapping.id === 0 || this.authdesignationmapping.id == null) {
     
  //     this._workflowService
  
  //       .createAuthDesigMapping(this.authdesignationmapping)
  //       .pipe(
  //         finalize(() => {
  //           this.saving = false;
  //         })
  //       )
  //       .subscribe(() => {
  //         this.notify.info(this.l('Approval mapped successfully'));
  //         this.loadMapping();
  //       //  this.authdesignationmapping = new CreateAuthorizationDesignationMappingDto();
  //       });
  //   }
  //   else {
  //     this._workflowService
  //       .updateAuthMapping(this.authdesignationmapping)
  //       .subscribe(() => {
  //         this.loadMapping();
  //         this.notify.info('Updated Successfully');

  //       });
  //   }
  //   approvalFilterForm.resetForm();

  // }


  //Authorization Designation Mapping Loading Table
  // loadMapping() {

  //   this.primengTableHelperAuthMapping.showLoadingIndicator();

  //   this._workflowService.getListAuthDesignMapping(

  //   ).pipe(finalize(() => this.primengTableHelperAuthMapping.hideLoadingIndicator())).subscribe((results: AuthorizationDesignationMappingDto[]) => {
  //     this.primengTableHelperAuthMapping.records = results;
  //     this.primengTableHelperAuthMapping.hideLoadingIndicator();
  //     console.log(results);

  //   });
  // }


  // deleteAuthMapping(authdesignationmapping: AuthorizationDesignationMappingDto): void {
  //   this.message.confirm(
  //     this.l('AcctChartDeleteWarningMessage', authdesignationmapping.id),
  //     this.l('AreYouSure'),
  //     isConfirmed => {
  //       if (isConfirmed) {
  //         this._workflowService.deleteMapping(authdesignationmapping.id).subscribe(() => {
  //           this.loadMapping();
  //           this.notify.success(this.l('SuccessfullyDeleted'));
  //         });
  //       }
  //     }
  //   );
  // }


  // getOperation() {

  //   this._opService
  //     .getListOperation()
  //     .subscribe(result => {
  //       this.operations = result;
  //       console.log(this.operations);
  //     });


  // }

  //Authorization Designation Setting Create Start Here
  // createAuthSetting(authsettingForm: NgForm): void {

  //   if (this.authSetting.operationId !== 0 && this.authSetting.id == null) {
  //     this.saving = true;
  //     this.authSetting.tenantId = abp.session.tenantId;
  //     this._workflowService
  //       .createSetting(this.authSetting)
  //       .pipe(
  //         finalize(() => {
  //           this.saving = false;
  //         })
  //       )
  //       .subscribe(() => {
  //         this.notify.info(this.l('SavedSuccessfully'));
  //        // this.authSetting = new CreateAuthorizationSettingDto();
  //         this.loadAuthSetting(this.authSetting.operationId);
  //         // this.authSetting.authorizationDesignationId = 0;
  //       });
  //     //  this.selectOperation(id);
  //   }
  //   else {
  //     this._workflowService
  //       .updateAuthSetting(this.authSetting)
  //       .subscribe(() => {

  //         this.notify.info('Updated Successfully');

  //       });
  //   }
  //   authsettingForm.resetForm();
  // }


  // loadAuthSetting(id: any) {
  //   this.authSetting.tenantId = abp.session.tenantId;
  //   this.primengTableHelperAuthSetting.showLoadingIndicator();

  //   this._workflowService.getAuthorizationSettingsByOperationId(id

  //   ).pipe(finalize(() => this.primengTableHelperAuthSetting.hideLoadingIndicator())).subscribe((results: AuthorizationSettingDto[]) => {
  //     //4this.primengTableHelper.totalRecordsCount = result.totalCount;
  //     this.primengTableHelperAuthSetting.records = results;
  //     this.primengTableHelperAuthSetting.hideLoadingIndicator();
  //     console.log(results);

  //   });
  // }

  // selectOperation(id: any) {

  //   this.loadAuthSetting(id);
  //   console.log('the selected value is ' + id);
  // }

  // reloadPage(): void {
  //   this.paginator.changePage(this.paginator.getPage());
  // }

  // deleteAuthSetting(authSetting: AuthorizationSettingDto): void {
  //   this.message.confirm(
  //     this.l('AcctChartDeleteWarningMessage', authSetting.operationId),
  //     this.l('AreYouSure'),
  //     isConfirmed => {
  //       if (isConfirmed) {
  //         this._workflowService.deleteSetting(authSetting.id).subscribe(() => {
  //           this.reloadPage();
  //           this.notify.success(this.l('SuccessfullyDeleted'));
  //         });
  //       }
  //     }
  //   );
  // }



  // edit(f: CreateAuthorizationDesignationDto): void {

  //   this.authdesignation.description = f.description;
  //   this.authdesignation.id = f.id;
  //   this.authdesignation.tenantId = f.tenantId;
  // }

  // editAuthSetting(f: CreateAuthorizationSettingDto): void {

  //   this.authSetting.approvalLevel = f.approvalLevel;
  //   this.authSetting.authorizationDesignationId = f.authorizationDesignationId;
  //   this.authSetting.operationId = f.operationId;
  //   this.authSetting.maxAmount = f.maxAmount;
  //   this.authSetting.minAmount = f.minAmount;
  //   this.authSetting.approvalLevel = f.approvalLevel;
  //   this.authSetting.id = f.id;
  //   this.authSetting.tenantId = f.tenantId;

  // }

  // editAuthMapping(f: CreateAuthorizationDesignationMappingDto): void {

  //   this.authdesignationmapping.username = f.username;
  //   this.authdesignationmapping.authorizationDesignationId = f.authorizationDesignationId;
  //   this.authdesignationmapping.id = f.id;
  //   this.authdesignationmapping.tenantId = f.tenantId;
  // }

  searchChange($event) {

    console.log($event);
  }


//   save1(approvalForm: any): boolean {
//     if (!approvalForm.valid) {
//         return false;
//     }
//     this.workflowService.validateStep(STEPS.workflow);
//      this.formDataService.setPersonal(this.personal);
//     return true;
// }

// goToNext(approvalForm: any) {
 
//     if (this.save1(approvalForm)) {
//          Navigate to the work page
//         this.router.navigate(['/app/setup/accountperiod']);
//     }
// }

next() {
  this.stepper.next();
}

prev(){
    this.stepper.previous();
}

// onSubmit() {
//   return false;
// }

mee() {
  this.stepper = new Stepper(document.querySelector('#stepper1'), {
    linear: false,
    animation: true
  })
}

}
