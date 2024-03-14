import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'outstandingAuthorizersModal',
  templateUrl: './outstandingauthorizers-modal.component.html',
  styleUrls: ['./outstandingauthorizers-modal.component.css']
})
export class OutstandingauthorizersModalComponent extends AppComponentBase implements OnInit{

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal' , {static: true}) modal: ModalDirective;
  active = false;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
 primengTableHelper = new PrimengTableHelper();



  constructor(injector: Injector,
    private _workflow: WorkflowServiceServiceProxy,
    ) {

    super(injector);
   }
  ngOnInit(): void {
  }

  
  show(refNo: any,operationid:any,workflowdefinitionid:any,amount:any): void {
    this.active = true;
   // this.paytransId = id;
    console.log(refNo);
    
    //this.loadRole(id);
    
  
    this.loadOpexWorkflowTrail(refNo,operationid,workflowdefinitionid,amount) ;
  
   
    this.modal.show();
  }
  
  
close(): void {
  this.modal.hide();
  this.active = false;
}

  onShown(): void {

  }


  
  loadOpexWorkflowTrail(refNo?: any,operationid?:any,workflowdefinitionid?:any,amount?:any) {
    this.primengTableHelper.showLoadingIndicator();
    this._workflow.getapprovingAuthoritiesStatus(operationid,refNo,workflowdefinitionid,amount
    ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

      this.primengTableHelper.records = result;
      this.primengTableHelper.hideLoadingIndicator();
       console.log(result);
    });
  }

}
