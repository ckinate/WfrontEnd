
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule, FileUploadModule as PrimeNgFileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeDragDropService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SetupRoutingModule } from './setup-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { WorkflowComponent } from './workflow/workflow.component';


import { WorkflowgroupComponent } from './workflow/workflowgroup/workflowgroup.component';

import { WorkflowroleComponent } from './workflow/workflowrole/workflowrole.component';
import { WorkflowslaComponent } from './workflow/workflowsla/workflowsla.component';
import { WorkflowdefinitionComponent } from './workflow/workflowdefinition/workflowdefinition.component';
import { WorkflowRoleModalComponent } from './workflow/workflowrole/workflow-role-modal/workflow-role-modal.component';
import { ApprovalgroupComponent } from './workflow/approvalgroup/approvalgroup.component';
import { ApprovallevelComponent } from './workflow/approvallevel/approvallevel.component';
import { SlaintervalsetupComponent } from './workflow/slaintervalsetup/slaintervalsetup.component';
import { WorkflowdefinepropertiesComponent } from './workflow/workflowdefinition/workflowdefineproperties/workflowdefineproperties.component';

import {CheckboxModule} from 'primeng/checkbox';

import {MultiSelectModule} from 'primeng/multiselect';

import {RadioButtonModule} from 'primeng/radiobutton';

import { ControlContainerComponent } from './workflow/customforms/form/control-container/control-container.component';
import { CheckboxComponent } from './workflow/customforms/controls/checkbox/checkbox.component';
import { DropdownComponent } from './workflow/customforms/controls/dropdown/dropdown.component';
import { DateComponent } from './workflow/customforms/controls/date/date.component';
import { TextareaComponent } from './workflow/customforms/controls/textarea/textarea.component';
import { TextboxComponent } from './workflow/customforms/controls/textbox/textbox.component';
import { FormComponent } from './workflow/customforms/form/form.component';
import { ScrollToInvalidFieldDirective } from './workflow/customforms/form/scroll-to-invalid-field.directive';
import { FormpropertiesComponent } from './workflow/customforms/formproperties.component';
import { DyformsComponent } from './workflow/customforms/dyforms.component';
import { NewformsComponent } from './workflow/customforms/newforms.component';
import { FormsListComponent } from './workflow/customforms/forms-list.component';
import { AdminModule } from '@app/admin/admin.module';
import { LabelComponent } from './workflow/customforms/controls/label/label.component';


import { NgSelectModule } from '@ng-select/ng-select';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DynamicDataPopulateComponent } from './workflow/dynamic-data-populate/dynamic-data-populate.component';

import { LevelrolemappingComponent } from './workflow/approvallevel/levelrolemapping/levelrolemapping.component';
import { WorkFlowRelieveComponent } from './workFlowRelieve/workFlowRelieve.component';
import { InputNumberModule } from 'primeng';
import { CreateEditRoleModalComponent } from './workflow/workflowrole/CreateEditRoleModal/CreateEditRoleModal.component';
import { WorkflowleveldefinitionComponent } from './workflow/workflowdefinition/workflowleveldefinition/workflowleveldefinition.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { NgxOrgChartModule } from 'ngx-org-chart';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RadioButtonModule,
        AppCommonModule,
        UtilsModule,
        CheckboxModule,
        SetupRoutingModule,
        CountoModule,
        NgxChartsModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot(),
        UtilsModule,
        AppCommonModule,
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        PrimeNgFileUploadModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        NgxChartsModule,
        CountoModule,
        TextMaskModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        InputSwitchModule,
        MultiSelectModule,
        NgSelectModule,
        ReactiveFormsModule,
        AdminModule,
        NgMultiSelectDropDownModule.forRoot(),
        InputNumberModule,
        FileUploadModule,
        AppBsModalModule,
        NgxOrgChartModule
    ],
    declarations: [

        WorkflowComponent,
        WorkflowgroupComponent,  WorkflowroleComponent, WorkflowslaComponent,
        WorkflowdefinitionComponent, WorkflowRoleModalComponent, ApprovalgroupComponent,

        WorkflowgroupComponent, WorkflowroleComponent, WorkflowslaComponent,
        WorkflowdefinitionComponent, WorkflowRoleModalComponent, ApprovalgroupComponent,
        ApprovallevelComponent, SlaintervalsetupComponent, WorkflowdefinepropertiesComponent,
        WorkFlowRelieveComponent, CreateEditRoleModalComponent,



        ControlContainerComponent,
        CheckboxComponent,
        DropdownComponent,
        DateComponent,
        TextareaComponent,
        TextboxComponent,
        FormComponent,
        ScrollToInvalidFieldDirective,

        DyformsComponent,
        FormpropertiesComponent,
        NewformsComponent,
        FormsListComponent,
        LabelComponent,



DynamicDataPopulateComponent,

LevelrolemappingComponent,

WorkflowleveldefinitionComponent,

EmailSettingComponent






    ],
    exports: [
        ControlContainerComponent,
        CheckboxComponent,
        DropdownComponent,
        DateComponent,
        TextareaComponent,
        TextboxComponent,
        FormComponent,
        ScrollToInvalidFieldDirective,

        DyformsComponent,
        FormpropertiesComponent,
        NewformsComponent,
        FormsListComponent,
        LabelComponent

    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }

    ],
   schemas: [NO_ERRORS_SCHEMA]
})
export class SetupModule { }
