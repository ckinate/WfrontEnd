import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { WorkflowServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { JournaldetailsviewmodalComponent } from './journaldetailsviewmodal/journaldetailsviewmodal.component';
import { OpexpostingviewmodalComponent } from './opexpostingviewmodal/opexpostingviewmodal.component';
import { OpexviewdetailsmodalComponent } from './opexviewdetailsmodal/opexviewdetailsmodal.component';
import { CustomformdetailComponent } from './customformdetail/customformdetail.component';
import { OpexpaymentdetailsComponent } from './opexpaymentdetails/opexpaymentdetails.component';
import { BudgetviewdetailsmodalComponent } from './budgetviewdetailsmodal/budgetviewdetailsmodal.component';
import { TaxationviewdetailsmodalComponent } from './taxationviewdetailsmodal/taxationviewdetailsmodal.component';
import { CashretirementviewdetailsmodalComponent } from './cashretirementviewdetailsmodal/cashretirementviewdetailsmodal.component';
import { CashretirementpaymentdetailsComponent } from './cashretirementpaymentdetails/cashretirementpaymentdetails.component';

import { FixedassetdetailsmodalComponent } from './fixedassetdetailsmodal/fixedassetdetailsmodal.component';
@Component({
  selector: 'workflowMainModal',
  templateUrl: './workflowmainmodal.component.html',
  styleUrls: ['./workflowmainmodal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class WorkflowmainmodalComponent extends AppComponentBase implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;


  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal', { static: true }) modal: ModalDirective;


  @ViewChild('approvalviewdetailmodalTable', { static: true }) approvalviewdetailmodalTable: Table;
  approvalviewdetailmodalTableHelper = new PrimengTableHelper();

  @Output() loadApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  @Input() gId: string;
  Id: number;


  components = [];
  // Expose class so that it can be used in the template
  jourdetailviewClass = JournaldetailsviewmodalComponent;
  opexdetailviewClass = OpexviewdetailsmodalComponent;
  opexpostingviewClass = OpexpostingviewmodalComponent;
  customdetailClass = CustomformdetailComponent;
  opexPaymentClass = OpexpaymentdetailsComponent;
  budgetClass = BudgetviewdetailsmodalComponent;
  taxationClass = TaxationviewdetailsmodalComponent;
  cashretirementviewClass = CashretirementviewdetailsmodalComponent;
  cashretirementPaymentClass=CashretirementpaymentdetailsComponent;
  fixedassetDetailsview = FixedassetdetailsmodalComponent;

 selectedoperationId: any;

  constructor(injector: Injector,
    private _approvalService: WorkflowServiceServiceProxy,
    private componentFactoryResolver: ComponentFactoryResolver,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    //private _stafService: UserServiceProxy
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.selectedoperationId = params['OPD']
    });


  }

  ngOnDestroy() {
    // clearInterval(this.interval);
  }


  addComponent(componentClass: Type<any>, gid?: string) {
    this.container.clear();
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }




  show(operationId?: number, refNo?: string): void {

    this.active = true;
   

    this.gId = refNo;
    this.Id = operationId;
    
    switch(this.selectedoperationId) {
      case '1':
        this.addComponent( this.jourdetailviewClass);
        break;
      case '9':
        this.addComponent(this.customdetailClass);
      break;
      case '7':
        this.addComponent(this.opexdetailviewClass);        
      break; 
      case '6':
        
        this.addComponent(this.opexPaymentClass);        
      break;
      case '50':
        
        this.addComponent(this.budgetClass);        
      break;
        case '21':
           this.addComponent(this.cashretirementviewClass);
            break;
     
        case '51':

            this.addComponent(this.taxationClass);
            break;
        case '22': 
          this.addComponent (this.cashretirementPaymentClass);
          break;
        case '33': 
          this.addComponent (this.fixedassetDetailsview);
          break;
        default:
     break;
    }


    //  if(this.Id ==1){
      
    //  }else{
    //    if(this.Id ==9)
    //    {
    //     console.log(refNo);
        
    //     console.log(this.Id);
    //    }
    //    else
    //    {
    //       this.addComponent(this.opexdetailviewClass);
    //    }
    //  }


    // switch (operationId) {
    //   case 2:
    //     this.addComponent(this.jourdetailviewClass);
    //     break;
    //   case 7:
    //     this.addComponent(this.opexdetailviewClass);
    //     break;
    //   case 9:
    //    this.addComponent(this.customdetailClass);
    //     break;
    //   default:
    //     break;
    // }


    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        newref: this.gId
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      //skipLocationChange: true
      // do not trigger navigation
    });

    this.modal.show();

    const mm = operationId;





  }


  close(): void {

    const params = { ...this._activatedRoute.snapshot.queryParams };
    delete params['newref'];
    this._router.navigate([], { queryParams: params });



    this.modal.hide();
    this.active = false;
    const reload = () => window.location.reload();
  }

  onShown(): void {

  }











  ngAfterViewInit(): void {

  }

}
