import { Component, Input, OnInit} from '@angular/core';
import { BaseControl } from '../base-control';
//import { RaptorPropertyDescriptorModel } from '@app/wforms/form/form.model';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';

@Component({
    selector: 'app-textbox',
    templateUrl: 'textbox.component.html',
    styles:[`
  input.ng-valid[required], input.ng-valid.required, input.ng-valid  {
    border-left: 5px solid blue;    
}
 
input.ng-invalid:not(form)  {
    border-left: 5px solid red;
}
`],
})
export class TextboxComponent
  extends BaseControl  {
    @Input() detailsForm: FormGroup; 
    @Input() viewModelProperty: RaptorPropertyDescriptorModel;
    @Input() editable: boolean;

    
}

