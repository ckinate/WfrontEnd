import { Component, OnInit, AfterViewInit, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NewformsComponent } from './newforms.component';

import { FormpropertiesComponent } from './formproperties.component';
import { WFormServiceServiceProxy, CustomFormsDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-dyforms',
  templateUrl: './dyforms.component.html',
  animations: [appModuleAnimation()]
})
export class DyformsComponent extends AppComponentBase implements OnInit, AfterViewInit {
  saving = true;
  @ViewChild('app-newforms', { static: true }) modalUp: NewformsComponent;
    @ViewChild('app-formproperties', { static: true }) modalProperty: FormpropertiesComponent;
  constructor( injector: Injector,   private changeDetector: ChangeDetectorRef, private _service: WFormServiceServiceProxy 
    )  { super(injector);  }

  ngOnInit() {

    this.loadPage();
  }

  ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
        this.saving = false;
  }
  loadPage () {
this.primengTableHelper.showLoadingIndicator();

    this._service.getWForm().subscribe((r) => {
this.primengTableHelper.records = r;


   });
this.primengTableHelper.hideLoadingIndicator();
  }

 getUsers() {

 }
AddProperties(item: CustomFormsDto)
{
  console.log(item);

}

 removeRecord(Rrecords: CustomFormsDto) {

 }
 EditRecord(Erecord: CustomFormsDto) 
 {

 }
 
}
