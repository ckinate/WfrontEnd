import { Component, OnInit, Injector } from '@angular/core';

import { DashboardChartBase } from '../dashboard-chart-base';
import { TenantDashboardServiceProxy, GetPendingWorkflowOutput, WorkflowQueryTrailsDto, WorkflowServiceServiceProxy, WorkflowQueryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { WidgetComponentBaseComponent } from '../widget-component-base';
import { finalize } from 'rxjs/operators';
import { timeStamp } from 'console';


class WorkflowTable extends DashboardChartBase {

 pendingWF: GetPendingWorkflowOutput[] = [];
 


  constructor(private _dashboardService: TenantDashboardServiceProxy,
   
    ) {
    super();
  }

  init() {
    this.reload(); 
  }

  reload() {
    this.showLoading();
    this._dashboardService
      .getPendingWorkflow().pipe(finalize(() =>
      this.hideLoading()))
      .subscribe(result => {
        this.pendingWF = result;
        
     
      });
  }

}

@Component({
  selector: 'app-widget-pending-workflow',
  templateUrl: './widget-pending-workflow.component.html',
  styles: [
  ],
})
export class WidgetPendingWorkflowComponent extends WidgetComponentBaseComponent implements OnInit {

  
workflowTable: WorkflowTable;
  workflowquerylist: WorkflowQueryDto[]=[];
selectedoperationId :any;
appBaseUrl = AppConsts.appBaseUrl;
hidequerylink :boolean;
constructor(injector: Injector,
  private _dashboardService: TenantDashboardServiceProxy,
  private router: Router,

  private _activatedRoute: ActivatedRoute,
  private _workflow: WorkflowServiceServiceProxy,
  
  
  ) {
  super(injector);
  this.workflowTable = new WorkflowTable(this._dashboardService);
}

ngOnInit() {
  this.workflowTable.init();

  this._activatedRoute.queryParams.subscribe(params =>{
    this.selectedoperationId = params['OPD']

   
  });

  this.loadWorkflowqueryTrail();

}

loadWorkflowqueryTrail() {
  

  this._workflow.getloginUserQuery().subscribe(result => {
      this.workflowquerylist=result;
      if(result.length >0){
          this.hidequerylink=true;
      }
 
    });
}

}
