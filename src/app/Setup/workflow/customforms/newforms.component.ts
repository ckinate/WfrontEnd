import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import {  CustomFormsDto, WFormServiceServiceProxy} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-newforms',
  templateUrl: './newforms.component.html',
  styles:[`
		input.ng-invalid {
			border-left: 5px solid red;
		}
		input.ng-valid {
			border-left: 5px solid blue;
		}
	`],
})
export class NewformsComponent extends AppComponentBase implements OnInit {

  saving = false;
  active = true;
  @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  createForm: NgForm;
  formName: any;
  formDisplayName: any;
   cForm: CustomFormsDto = new CustomFormsDto();
  constructor( injector: Injector, private _service: WFormServiceServiceProxy 
    ) { super(injector); }

  ngOnInit(): void {

  }




  show(id?: any) {
    //this.saving = true;
  

    

  this.modal.show();
  //this.saving = false;
}
close(): void {
  this.modal.hide();
}

save() {
  


this.cForm.aggregrateForm = true;
this.cForm.coycode = this.getCompanyCode();
this.cForm.isItemNew = true;
this.cForm.tenantId = this.appSession.tenantId;
this.cForm.formProperties = "";

  this._service.createWForm(this.cForm).subscribe((r) => {
   this.cForm = new CustomFormsDto();
   this.modalSave.emit(null);
   
  
  })
  
   }


   
}
