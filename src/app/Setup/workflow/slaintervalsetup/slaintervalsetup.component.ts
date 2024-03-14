import { Component, OnInit, Injector, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { WorkflowServiceServiceProxy, SLASetupDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { NgForm } from '@angular/forms';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Paginator } from 'primeng/paginator';

@Component({

  templateUrl: './slaintervalsetup.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class SlaintervalsetupComponent  extends AppComponentBase implements OnInit, AfterViewInit {
  slaForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

  slainterval:  SLASetupDto = new SLASetupDto();
  saving = false;
  isHierarchical = false;
  constructor(injector: Injector,
    private _approvalService: WorkflowServiceServiceProxy
    ) {

super(injector);
}

ngOnInit(): void {
 this.loadSlaInterval();
}

ngAfterViewInit(): void {

}

  
 save(slaForm: NgForm) {
 
  
  if (this.slainterval.id === 0 || this.slainterval.id == null) {
    this.saving = true;
    //this.approvalLevel.tenantId = abp.session.tenantId;
    this._approvalService
      .createSla(this.slainterval)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.loadSlaInterval();
        })
      )
      .subscribe(() => {

        this.notify.info(this.l('SavedSuccessfully'));
        // this.getAuthdesignation();
         this.loadSlaInterval() ;
         this.slainterval= new SLASetupDto();
      });


  } else {
    this._approvalService
      .updateSlaSetup(this.slainterval)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.loadSlaInterval();
        })
      )
      .subscribe(() => {
        
        this.notify.info('Updated Successfully');
        this.slainterval= new SLASetupDto();
        this.loadSlaInterval() ;
      });
    // this.getAuthdesignation();

  }
  slaForm.resetForm();

}

loadSlaInterval() {
 this.slainterval.action = '0';
  this.primengTableHelper.showLoadingIndicator();
  this._approvalService.getSlaSetup(
  ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

    this.primengTableHelper.records = result;
    this.primengTableHelper.hideLoadingIndicator();
    
  });
}

edit(f: SLASetupDto): void {

  this.slainterval.slaName = f.slaName;
  this.slainterval.duration = f.duration;
  this.slainterval.id = f.id;
  this.slainterval.action = f.action;
  this.slainterval.email = f.email;
}

ChangeType(){
  this.isHierarchical = false;
  this.slainterval.email  = '';
  if (this.slainterval.action === 'H') {
    this.isHierarchical = true;
    this.slainterval.email = 'yourcompany@hierarchy.com'
  }


}

}
