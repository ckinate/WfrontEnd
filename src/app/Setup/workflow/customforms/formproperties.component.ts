import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ControlProperty, CustomFormsDto, GeneralOperationsServiceServiceProxy, TempTableDataDto, Validations, WFormServiceServiceProxy, Dependencies } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/public_api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Options, tempOptions } from './Options';


@Component({
  selector: 'app-formproperties',
  templateUrl: './formproperties.component.html',
  styles: [
  ],
})
export class FormpropertiesComponent extends AppComponentBase implements OnInit, AfterViewInit {

  saving = false;
  active = true;
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  controlType: string;
  isRadioActive = true;
  IsRequiredNeeded = false;
  IsStrengthNeeded = false;
  isRequiredfield = false;
  IsDataRequired = false;
  MaxLength = 0;
  MinLength = 0;
  slErrMsg = '';
  rqErrMsg = '';
  createForm: NgForm;
  fieldType: any;
  formProperty: ControlProperty = new ControlProperty();
  tempData: TempTableDataDto = new TempTableDataDto();
  validation: Validations = new Validations();
  validList: Validations[] = [];
  dataList: Dependencies [] = [];
  dataItem: Dependencies = new Dependencies();
  formPropertyList: ControlProperty[] = [];
  backList: ControlProperty[] = [];
  evnt: LazyLoadEvent;
  itemdisplayname: any;
  itemvalue: any;
  itemdisplayList: Dependencies[] = [];
  selectedIndex: number;

  cForm: CustomFormsDto = new CustomFormsDto();
  itemProperties: string = '';
  selectedOption: Options = new Options(0, 'NO');
  options = [
    new Options(0, this.l("None")),
    new Options(1, this.l("PlainText")),
    new Options(2, this.l("Number")),
    new Options(3, this.l("Email"))

  ];
  tempOption: tempOptions[] = [];

  constructor(injector: Injector, private _service: WFormServiceServiceProxy,
    private changeDetector: ChangeDetectorRef, private _generalService: GeneralOperationsServiceServiceProxy) { super(injector); }

  ngOnInit(): void {
    this.isRadioActive = false;
    this.fieldType = "0";
    this.IsRequiredNeeded = true;

  }

  ngAfterViewInit(): void {
    this.primengTableHelper.adjustScroll(this.dataTable);
    this.changeDetector.detectChanges();
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  addData(): void {

    this.dataItem = new Dependencies();
    this.dataItem.description = this.itemdisplayname;
    this.dataItem.id = this.itemvalue;
    this.dataList.push(this.dataItem);
    localStorage.setItem(this.cForm.id, JSON.stringify(this.dataList));
    this.itemvalue = '';
    this.itemdisplayname = '';
    this.getData();
  }
  getData() {
   
    this.itemdisplayList = JSON.parse(localStorage.getItem(this.cForm.id ));
  //this.dataList = this.itemdisplayList;

  }
  controlTypeChange() {

    this.formProperty = new ControlProperty();
    this.isRadioActive = true;
    this.fieldType = "0";
    this.IsStrengthNeeded = false;
    this.IsDataRequired = false;
    if (this.controlType === "TextBox") {
      this.isRadioActive = false;
      this.IsStrengthNeeded = true;

    }
    if (this.controlType === "TextArea") {
      this.IsStrengthNeeded = true;
    }

    if (this.controlType.toLowerCase() === "dropdown") {
      this.IsDataRequired = true;

    }

    this.formProperty.controlName = this.controlType;


  }

  show(fm: CustomFormsDto) {
    this.formProperty = new ControlProperty();
    this.formPropertyList = [];
    this.cForm = fm;
    this.gettTempData(this.evnt);
    this.modal.show();
    this.getData();
  }
  close(): void {
    this.modal.hide();
  }
  save() { }

  Remove(controlId: number) {
    this._service.removeCustomControl(this.cForm.id, controlId).subscribe(() => {
      this.formPropertyList = [];
      this.primengTableHelper.records = [];
    });
    this.gettTempData(this.evnt);
  }

  gettTempData(event?: LazyLoadEvent) {
    this.formPropertyList = [];
    this.primengTableHelper.records = [];
    this.primengTableHelper.showLoadingIndicator();
    this._generalService.getTempData(3, this.cForm.id)
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
        if (result.rData !== null) {
          this.formPropertyList = JSON.parse(result.rData);
          this.cForm.controlProperties = this.formPropertyList;
          this.primengTableHelper.records = this.formPropertyList;

        }
        this.primengTableHelper.hideLoadingIndicator();
      });
  }



  Check() {
    console.log(this.formPropertyList);
    this.AddDependencyAndValidation();
  console.log(this.formPropertyList);

    let formp = JSON.stringify(this.formPropertyList);
    this.tempData = new TempTableDataDto();
    this.tempData.coycode = this.appSession.companyCode;
    this.tempData.entryDataType = 3;
    this.tempData.rData = formp;
    this.tempData.tenantId = this.appSession.tenantId;
    this.tempData.username = this.appSession.user.userName;
    this.tempData.uniqueID = this.cForm.id;


    this._generalService.addTempData(this.tempData).subscribe(() => {

    });

    this._service.updateCustomForms(this.cForm.id, formp).subscribe(() => {

    })

    this.formProperty = new ControlProperty();
    this.formPropertyList = [];
    this.primengTableHelper.records = [];
    this.gettTempData(this.evnt);

  }

  AddDependencyAndValidation() {
    this.validation = new Validations();
    this.validList = [];
    this.validation.errorMessage = this.rqErrMsg;
    this.validation.maximumLength = 0;
    this.validation.minimumLength = 0;
    this.validation.value = "false";
    this.validation.validationType = "Required";
    this.validList.push(this.validation);

    if (this.MaxLength > 0) {
      this.validation = new Validations();
      this.validation.errorMessage = this.slErrMsg;
      this.validation.maximumLength = this.MaxLength;
      this.validation.minimumLength = this.MinLength;
      this.validation.value = "";
      this.validation.validationType = "StrengthLength";
      this.validList.push(this.validation);
    }

    if (this.fieldType == 2) {
      this.validation = new Validations();
      this.validation.errorMessage = "only numbers required";
      this.validation.maximumLength = 0;
      this.validation.minimumLength = 0;
      this.validation.value = "NumberV";
      this.validation.validationType = "RegularExpression";
      this.validList.push(this.validation);
    }

    if (this.fieldType == 3) {
      this.validation = new Validations();
      this.validation.errorMessage = "email not in the right format";
      this.validation.maximumLength = 0;
      this.validation.minimumLength = 0;
      this.validation.value = "emailv";
      this.validation.validationType = "Email";
      this.validList.push(this.validation);
    }


    this.formProperty.validation = this.validList;

    if (this.IsDataRequired) {
   //this.formProperty.data = this.itemdisplayList;  

   this.dataList = [];
   this.itemdisplayList.forEach( e => {
  this.dataItem = new Dependencies();
  this.dataItem.id = e.id;
  this.dataItem.description = e.description;
     this.dataList.push(this.dataItem);
   });
   this.formProperty.data = this.dataList; 
    }


    this.formProperty.id = Math.floor((Math.random() * 1000) + 1);
    this.formPropertyList.push(this.formProperty);
  }


  completed() {




  }

}
