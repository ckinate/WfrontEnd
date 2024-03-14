import { Component, Input, AfterViewInit, AfterContentChecked, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BaseControl } from '../base-control';
import { FormGroup } from '@angular/forms';
import { RaptorPropertyDescriptorModel } from '../../form/form.model';
import * as moment from 'moment';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styles:[`
    input.ng-valid[required], input.ng-valid.required, input.ng-valid  {
      border-left: 5px solid blue;
  }
   
  input.ng-invalid:not(form)  {
      border-left: 5px solid red;
  }
  `],
})
export class DateComponent
  extends BaseControl {
    @Input() detailsForm: FormGroup; 
    @Input() viewModelProperty: RaptorPropertyDescriptorModel;
    @Input() editable: boolean;
   
    

}
