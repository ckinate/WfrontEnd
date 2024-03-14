import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { requestItems } from './data';
import { NotabledatadisplayComponent } from './notabledatadisplay.component';
import { TabledatadisplayComponent } from './tabledatadisplay.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'workflowdetails',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.css']
})
export class WorkflowDetailsComponent extends AppComponentBase implements OnInit {

  @ViewChild('modal', { static: true }) modal: ModalDirective;
  itemList = [];

  constructor(private injector: Injector, private _service: WorkflowServiceServiceProxy) {    super(injector); }

  ngOnInit(): void {
  }

  getData(ref: string, operationId: any) {

    this.showMainSpinner();
    this.itemList = [];
    this._service.getWorkflowItemDetails(ref, operationId).pipe(finalize(()=>{
        this.hideMainSpinner();
    })).subscribe((x)=>{

        x.forEach(l=>{
            this.itemList.push(new requestItems(l.title, JSON.parse(l.transactionDetails), l.isTable, true, false, false));
        })


    },error=>{
        this.message.error("Sorry! an error occur");
        this.hideMainSpinner();
    })
  console.log(this.itemList );
this.modal.show();
  }


  close(): void {



    this.modal.hide();

  }

  onShown(): void {

  }


}
