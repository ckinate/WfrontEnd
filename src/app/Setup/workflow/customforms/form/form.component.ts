import { Component, OnInit, Injector, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FormService } from '../services/form.service';
import { RaptorDetailModel } from './form.model';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import {  WFormServiceServiceProxy, WFFormListDto, CustomFormRequestDto } from '@shared/service-proxies/service-proxies';
// import { Options } from '@app/shared/common/options';

import { finalize } from 'rxjs/operators';
import { FileuploadComponent } from '@app/workflowapprovals/FileDocuments/fileupload/fileupload.component';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  animations: [appModuleAnimation()],
  styles:[`
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid blue;
}

.ng-invalid:not(form)  {
    border-left: 5px solid red;
}
`],
})

export class FormComponent extends AppComponentBase  implements OnInit, AfterViewInit {
  public detailsForm: FormGroup;
  public detail: RaptorDetailModel;
  saving = true;
  options = [];
  wfItem: WFFormListDto;
  selectedIndex: number;
  request = new CustomFormRequestDto();
  editable = false;
  @ViewChild('appfileupload', { static: true}) appfileupload: FileuploadComponent

  constructor( injector: Injector, private service: FormService,
    private wf: WFormServiceServiceProxy,
    private changeDetector: ChangeDetectorRef,)  { super(injector);  }

  ngOnInit() {

    this.showMainSpinner();
    this.detailsForm = new FormGroup({});
    //this.loadData();
    this.GetListofForms();

    this.hideMainSpinner();
  }

  showDocument(){


    let id = this.appSession.user.userName +'-'+ this.wfItem.uniqueID.substring(1,7);

this.request.attachmentID = id;

    this.appfileupload.ShowAttachment(id,9);

  }


  ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
        this.saving = false;
  }

  GetListofForms() {
    this.saving = true;
    this.wf.getWorkflowMappedList().pipe(
      finalize(() => {
        this.saving = false;
      })
    ).subscribe(x =>{
this.options = x;

    })
  }


GetFormDetails(id: any, index: number)
{
  this.saving = true;
  this.showMainSpinner();
this.selectedIndex = index;
  this.wfItem = id;
this.request = new CustomFormRequestDto();

this.request.madeby = this.appSession.user.userName;
this.request.operationID = this.wfItem.operationID;
this.request.workflowID = Number(this.wfItem.workflowID);
this.request.uniqueID = this.wfItem.uniqueID;
this.request.requestStatus = 2;

  this.detailsForm = new FormGroup({});
    forkJoin(
      this.wf.generateFormTags(this.wfItem.uniqueID),
      this.wf.generateFormFields(this.wfItem.uniqueID)
    ).pipe(
      finalize(() => {
        this.saving = false;
      })
    ).subscribe(result => {



      this.detail = {} as RaptorDetailModel;
      this.detail.viewModelSchema = JSON.parse(result[0]);
      this.detail.viewModelData = JSON.parse(result[1]);

    this.initDetail();

    this.hideMainSpinner();
  });
}



 loadData() {

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

  public submit() {


    if (this.detailsForm.valid) {
     // alert(JSON.stringify(this.detailsForm.value));
console.log(this.detailsForm.value);
this.request.rawDetails = JSON.stringify(this.detailsForm.value);


this.message.confirm(
  this.l('Request Submission'),
  this.l('AreYouSure'),
  isConfirmed => {
    if (isConfirmed) {

      this.saving = true;

this.wf.makeRequest(this.request).pipe(
  finalize(() => {
    this.saving = false;
  })
).subscribe((x) => {
  this.message.info(this.l('SavedSuccessfully') + ' Ref: ' + x);
  this.GetListofForms();
this.GetFormDetails(this.wfItem, this.selectedIndex);

});

    }
  });


    } else {
      Object.keys(this.detailsForm.controls).forEach(field => {
        const control = this.detailsForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }


  }
}
