import { Component, OnInit, Output, EventEmitter, Injector, ViewChild } from '@angular/core';
import { CashRetirementServiceServiceProxy, OpexPaymentApprovalDetailsDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CashretirementviewdetailsmodalComponent } from '../cashretirementviewdetailsmodal/cashretirementviewdetailsmodal.component';


@Component({
  selector: 'app-cashretirementpaymentdetails',
  templateUrl: './cashretirementpaymentdetails.component.html',
  styleUrls: ['./cashretirementpaymentdetails.component.css']
})
export class CashretirementpaymentdetailsComponent extends AppComponentBase implements OnInit {


  @ViewChild('cashretirementViewDetailsModal', { static: true })    cashretirementViewDetailsModal:CashretirementviewdetailsmodalComponent;
  @Output() loadApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();
  selectedrefNo :any;

  appViewDetail = new OpexPaymentApprovalDetailsDto();
  constructor(injector: Injector,
    private _details: CashRetirementServiceServiceProxy,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    //private _stafService: UserServiceProxy
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this.getCPaymentDetails();

  }

  getCPaymentDetails() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.selectedrefNo = params['newref']      
    });
    this._details.getCARApprovalPaymentDetails(this.selectedrefNo).subscribe(result => {     
     this.appViewDetail = result;     
     this.cashretirementViewDetailsModal.getCARDetails(result.opexRequest.requestNumber);
    });
  }
//Prepayment
//Accrual
//Payment Details
//Posting



}
