import { Component, Input } from '@angular/core';
import { BaseControl } from '../base-control';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styles:[`
  textarea.ng-valid[required], textarea.ng-valid.required, textarea.ng-valid  {
    border-left: 5px solid blue;
    
}
 
textarea.ng-invalid:not(form)  {
    border-left: 5px solid red;
   
}
`],

})
export class TextareaComponent  extends BaseControl {
  @Input() detailsForm: FormGroup; 
  @Input() viewModelProperty: RaptorPropertyDescriptorModel;
  @Input() editable: boolean;
}
