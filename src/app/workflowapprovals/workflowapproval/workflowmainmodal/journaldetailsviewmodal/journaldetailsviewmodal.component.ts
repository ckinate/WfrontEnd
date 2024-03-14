import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { WorkflowmainmodalComponent } from '../workflowmainmodal.component';

@Component({
  selector: 'journalDetailsViewModal',
  templateUrl: './journaldetailsviewmodal.component.html',
  styleUrls: ['./journaldetailsviewmodal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class JournaldetailsviewmodalComponent extends AppComponentBase implements OnInit, AfterViewInit {
  
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
 
  @ViewChild('modal' , {static: true}) modal: ModalDirective;
  @Input() gId: any;


  @ViewChild('approvalviewdetailmodalTable', { static: true }) approvalviewdetailmodalTable: Table;
  approvalviewdetailmodalTableHelper = new PrimengTableHelper();

   @Output() loadApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();

   active = false;
 
   Id:number;

 
   selectedrefNo :any;

  constructor(injector: Injector,
    private _approvalService: WorkflowServiceServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
     
    //private _stafService: UserServiceProxy
    ) {

super(injector);
}

ngOnInit(): void {
  
 
  
this.ApprovalViewMoreDetails();

   
}





  ApprovalViewMoreDetails(refNo?: string) {
   
    


    this._activatedRoute.queryParams.subscribe(params =>{
      this.selectedrefNo = params['newref']
    
      
    });

    
    this.approvalviewdetailmodalTableHelper.showLoadingIndicator();
    this._approvalService.getJournalEntryByRef(this.selectedrefNo
    ).pipe(finalize(() => this.approvalviewdetailmodalTableHelper.hideLoadingIndicator())).subscribe(result => {
  
      this.approvalviewdetailmodalTableHelper.records = result;
   
      this.approvalviewdetailmodalTableHelper.hideLoadingIndicator();
      
    });

    
    
  


  }


ngAfterViewInit(): void {

}
}
