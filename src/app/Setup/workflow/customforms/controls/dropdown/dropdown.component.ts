import { Component, Input } from '@angular/core';
import { BaseControl } from '../base-control';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styles:[`
  select.ng-valid[required], select.ng-valid.required, select.ng-valid  {
    border-left: 5px solid blue;
   
}
 
select.ng-invalid:not(form)  {
    border-left: 5px solid red; 

}
`],
})
export class DropdownComponent extends BaseControl {
  @Input() detailsForm: FormGroup; 
  @Input() viewModelProperty: RaptorPropertyDescriptorModel;
  @Input() editable: boolean;
}
