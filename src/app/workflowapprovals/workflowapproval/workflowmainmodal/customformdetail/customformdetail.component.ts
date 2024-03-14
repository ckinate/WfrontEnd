import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RaptorDetailModel, RaptorPropertyDescriptorModel } from '@app/setup/workflow/customforms/form/form.model';
import { FormService } from '@app/setup/workflow/customforms/services/form.service';
import { WFormServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-customformdetail',
  templateUrl: './customformdetail.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class CustomformdetailComponent implements OnInit {
   detailsForm: FormGroup;
   detail: RaptorDetailModel;
  uniqueID: any;
  tranRef: any;
  editable = true;

 
  @ViewChild('modal' , {static: true}) modal: ModalDirective;
  @ViewChild('viewContainer') viewContainer: ViewContainerRef;
  @Output() loadApprovalViewMoreDetails: EventEmitter<any> = new EventEmitter<any>();
  

  constructor(private service: FormService, 
    private wf: WFormServiceServiceProxy, private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
   this.GetFormDetails()
  }


  loadData() {

    this.detailsForm = new FormGroup({});
    forkJoin(
      this.service.getDefaultMetadata(),
      this.service.getDefaultData()
  
    ).subscribe(result => {
      this.detail = {} as RaptorDetailModel;
      this.detail.viewModelSchema = result[0];
      this.detail.viewModelData = result[1];
  

          this.initDetail();
     
    });
  
  }
  

  GetFormDetails() 
{
 
  this._activatedRoute.queryParams.subscribe(params =>{
    this.tranRef = params['newref'];  
   
  });

 

  this.detailsForm = new FormGroup({});
    forkJoin(
      this.wf.getCustomFormTagsByRef(this.tranRef),
      this.wf.getCustomFormDataByRef(this.tranRef)
    ).subscribe(result => {
      this.detail = {} as RaptorDetailModel;    
      this.detail.viewModelSchema = JSON.parse(result[0]);  
      this.detail.viewModelData = JSON.parse(result[1]);;

    this.initDetail(); 
  
  });
}



  private initDetail() {
    this.detail.viewModelDisplayName = this.detail.viewModelSchema['name'];
    this.detail.propertiesDescriptors = [];
    this.detail.viewModelProperties = this.detail.viewModelSchema['properties'];
    this.detail.viewModelPropertiesKeys = Object.keys(
      this.detail.viewModelSchema['properties']     
    );
 

 
    this.detail.viewModelPropertiesKeys.forEach(propertyKey => {
      this.detail.propertiesDescriptors.push({
        key: propertyKey,
        schema: this.detail.viewModelProperties[propertyKey],
        viewModelData: this.detail.viewModelData,
        order: this.detail.viewModelProperties[propertyKey].order,
        dependencies: this.detail.viewModelDependencies
      });
    });
   
  }


}
