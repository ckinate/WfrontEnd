import { Component, Input } from '@angular/core';
import { BaseControl } from '../base-control';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'checkbox.component.html'
})


export class CheckboxComponent
  extends BaseControl {
    @Input() detailsForm: FormGroup; 
    @Input() viewModelProperty: RaptorPropertyDescriptorModel;
    @Input() editable: boolean;
}
