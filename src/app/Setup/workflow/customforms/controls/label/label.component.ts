import { Component, Input} from '@angular/core';
import { BaseControl } from '../base-control';
//import { RaptorPropertyDescriptorModel } from '@app/wforms/form/form.model';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styles: [
  ],
})
export class LabelComponent  extends BaseControl {
  @Input() detailsForm: FormGroup; 
  @Input() viewModelProperty: RaptorPropertyDescriptorModel
}