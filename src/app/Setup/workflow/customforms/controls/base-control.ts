import { Injectable, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ViewModelProperty } from './controls.model';
import { stringify } from 'querystring';

@Injectable()
export abstract class BaseControl implements OnInit {
  @Input() viewModelProperty: ViewModelProperty;
  @Input() detailsForm: FormGroup;

  public controlType: string;
  public controlKey: string;
  public controlLabel: string;
  public controlValue: any;
  public controlOption: any;
  public controlPlaceHolder: string;

  ngOnInit() {


    this.controlType = this.viewModelProperty.schema.uiControlType;
    this.controlKey = this.viewModelProperty.key;
    this.controlLabel = this.viewModelProperty.schema['displayName'];
    this.controlValue = this.viewModelProperty.viewModelData[this.viewModelProperty.key];
    this.controlOption = this.viewModelProperty.schema['dependencies'];
    this.controlPlaceHolder = this.viewModelProperty.schema['placeholder'];

  }
}
