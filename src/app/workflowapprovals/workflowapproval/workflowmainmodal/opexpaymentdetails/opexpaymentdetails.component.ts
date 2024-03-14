import { Component, OnInit, Output, EventEmitter, Injector, ViewChild } from '@angular/core';
import { OperatingExpenseServiceServiceProxy, OpexPaymentApprovalDetailsDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { OpexviewdetailsmodalComponent } from '../opexviewdetailsmodal/opexviewdetailsmodal.component';


@Component({
  selector: 'app-opexpaymentdetails',
  templateUrl: './opexpaymentdetails.component.html',
  styleUrls: ['./opexpaymentdetails.component.css']
})
export class OpexpaymentdetailsComponent extends AppComponentBase implements OnInit {


  @ViewChild('opexViewDetailsModal', { static: true })    opexViewDetailsModal:OpexviewdetailsmodalComponent;
  @Output() loadApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();
  selectedrefNo :any;

  appViewDetail = new OpexPaymentApprovalDetailsDto();
  constructor(injector: Injector,
    private _details: OperatingExpenseServiceServiceProxy,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    //private _stafService: UserServiceProxy
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this.getPaymentDetails();

  }

  getPaymentDetails() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.selectedrefNo = params['newref']      
    });
    this._details.getApprovalPaymentDetails(this.selectedrefNo).subscribe(result => {     
     this.appViewDetail = result;     
     this.opexViewDetailsModal.getOpexDetails(result.opexRequest.requestNumber);
    });
  }
//Prepayment
//Accrual
//Payment Details
//Posting



}
