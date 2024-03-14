import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowServiceServiceProxy, WorkflowTrailDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-workflow-audit-trail',
  templateUrl: './workflow-audit-trail.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class WorkflowAuditTrailComponent extends AppComponentBase implements OnInit, AfterViewInit {

  workflowForm: NgForm;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  primengTableHelper = new PrimengTableHelper();

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  me: WorkflowTrailDto;
//Filters
public dateRange: moment.Moment[] = [moment().startOf('day'), moment().endOf('day')];
  constructor(injector: Injector,
    
    private _workflowService: WorkflowServiceServiceProxy
) 
{ 
super(injector);

}

ngOnInit(): void {
    this.WorkflowAuditTrail();
}

ngAfterViewInit(): void {

}

exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'epltable.xlsx');
 }

  WorkflowAuditTrail() {
  // if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(0);

  //     return;
  // }
  
  this.primengTableHelper.showLoadingIndicator();
  this._workflowService.workflowAuditTrail(
  ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
  
      this.primengTableHelper.records = result;
      this.primengTableHelper.hideLoadingIndicator();
      console.log(result);
  });

//  this._workflowService.getWorkflow().subscribe(record =>{
//   this.records= record;
//   console.log(this.records)
//  })
 
}


onDateSelect(value) {
  this.dataTable.filter(this.formatDate(value), 'date', 'equals')
}

formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
      month = '0' + month;
  }

  if (day > 10) {
      day = '0' + day;
  }

  return date.getFullYear() + '-' + month + '-' + day;
}

onRepresentativeChange(event) {
  this.dataTable.filter(event.value, 'representative', 'in')
}

onActivityChange(event) {
  const value = event.target.value;
  if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
          this.dataTable.filter(activity, 'activity', 'gte');
      }
  }
}

}
