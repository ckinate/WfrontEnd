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
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
//import { SetupRoutingModule } from './setup-routing.module';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ColorPickerModule} from 'primeng/colorpicker';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
// ghfgf
//import { DashboardComponent } from '@app/main/dashboard/dashboard.component';

import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';


import { WorkflowapprovalsRoutingModule } from './workflowapprovals-routing.module';
import { WorkflowAuditTrailComponent } from './workflow-audit-trail/workflow-audit-trail.component';

import { WorkflowtrackerComponent } from './workflowtracker/workflowtracker.component';

import { WorkflowapprovalComponent } from './workflowapproval/workflowapproval.component';

import { OpexviewdetailsmodalComponent } from './workflowapproval/workflowmainmodal/opexviewdetailsmodal/opexviewdetailsmodal.component';
import { WorkflowmainmodalComponent } from './workflowapproval/workflowmainmodal/workflowmainmodal.component';
import { JournaldetailsviewmodalComponent } from './workflowapproval/workflowmainmodal/journaldetailsviewmodal/journaldetailsviewmodal.component';
import { OpexpostingviewmodalComponent } from './workflowapproval/workflowmainmodal/opexpostingviewmodal/opexpostingviewmodal.component';
import { AdminModule } from '@app/admin/admin.module';
import { CustomformdetailComponent } from './workflowapproval/workflowmainmodal/customformdetail/customformdetail.component';
import { SetupModule } from '@app/setup/setup.module';
import { ControlContainerComponent } from '@app/setup/workflow/customforms/form/control-container/control-container.component';
import { CheckboxComponent } from '@app/setup/workflow/customforms/controls/checkbox/checkbox.component';
import { DropdownComponent } from '@app/setup/workflow/customforms/controls/dropdown/dropdown.component';
import { DateComponent } from '@app/setup/workflow/customforms/controls/date/date.component';
import { TextareaComponent } from '@app/setup/workflow/customforms/controls/textarea/textarea.component';
import { TextboxComponent } from '@app/setup/workflow/customforms/controls/textbox/textbox.component';
import { FormComponent } from '@app/setup/workflow/customforms/form/form.component';
import { ScrollToInvalidFieldDirective } from '@app/setup/workflow/customforms/form/scroll-to-invalid-field.directive';
import { DyformsComponent } from '@app/setup/workflow/customforms/dyforms.component';
import { FormpropertiesComponent } from '@app/setup/workflow/customforms/formproperties.component';
import { NewformsComponent } from '@app/setup/workflow/customforms/newforms.component';
import { FormsListComponent } from '@app/setup/workflow/customforms/forms-list.component';
import { LabelComponent } from '@app/setup/workflow/customforms/controls/label/label.component';
import { OpexpaymentdetailsComponent } from './workflowapproval/workflowmainmodal/opexpaymentdetails/opexpaymentdetails.component';
import { BudgetviewdetailsmodalComponent } from './workflowapproval/workflowmainmodal/budgetviewdetailsmodal/budgetviewdetailsmodal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommentModalComponent } from './workflowtracker/comment-modal/comment-modal.component';
import { TaxationviewdetailsmodalComponent } from './workflowapproval/workflowmainmodal/taxationviewdetailsmodal/taxationviewdetailsmodal.component';
import { CashretirementviewdetailsmodalComponent } from './workflowapproval/workflowmainmodal/cashretirementviewdetailsmodal/cashretirementviewdetailsmodal.component';
import { CashretirementpaymentdetailsComponent } from './workflowapproval/workflowmainmodal/cashretirementpaymentdetails/cashretirementpaymentdetails.component'
import { OutstandingauthorizersModalComponent } from './workflowtracker/outstandingauthorizers-modal/outstandingauthorizers-modal.component';
import { OpexworkflowtrailmodalComponent } from './workflowtracker/opexworkflowtrailmodal/opexworkflowtrailmodal.component';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { WorkflowquerymodalComponent } from './workflowapproval/workflowquerymodal/workflowquerymodal.component';
import { WorkflowquerytrailComponent } from './workflowquerytrail/workflowquerytrail.component';

import { WorkflowDetailsComponent } from './workflowapproval/workflow-details/workflow-details.component'
import { NotabledatadisplayComponent } from './workflowapproval/workflow-details/notabledatadisplay.component';
import { TabledatadisplayComponent } from './workflowapproval/workflow-details/tabledatadisplay.component';
import { DocumentsComponent, FINSafePipe } from './documents/documents.component';
import { WorkflowquerytrailcommentmodalComponent } from './workflowquerytrail/workflowquerytrailcommentmodal/workflowquerytrailcommentmodal.component';
import { FixedassetdetailsmodalComponent } from './workflowapproval/workflowmainmodal/fixedassetdetailsmodal/fixedassetdetailsmodal.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ProgressBarModule, TreeDragDropService } from 'primeng';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { CoreModule } from '@metronic/app/core/core.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { CustomService } from '@app/shared/services/CustomService.Service';
import { FileuploadComponent } from './FileDocuments/fileupload/fileupload.component';
import { DocviewerComponent } from './FileDocuments/fileupload/docviewer.component';
import { DocumentloadComponent } from './FileDocuments/fileupload/documentload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { WorkflowlpoviewdetailsComponent } from './workflowapproval/workflow-details/workflowlpoviewdetails/workflowlpoviewdetails.component';







NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  imports: [
    TableModule,
    PaginatorModule,
    ToggleButtonModule,
    ColorPickerModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    MultiSelectModule,
    TabsModule,
    TooltipModule,
    AppCommonModule,
    UtilsModule,
    CalendarModule,
    WorkflowapprovalsRoutingModule,
    CountoModule,
    NgxChartsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    AdminModule,
    SetupModule,
    AppBsModalModule,
    NgSelectModule,

    HttpClientModule,
    HttpClientJsonpModule,
    ServiceProxyModule,
   
    ProgressBarModule,
    PerfectScrollbarModule,
    CoreModule,
    TextMaskModule,
    ImageCropperModule,
    NgxSpinnerModule,
    FileUploadModule,
],
declarations: [
    
    FINSafePipe,
    //DashboardComponent
    WorkflowAuditTrailComponent,
    WorkflowtrackerComponent, WorkflowapprovalComponent, OpexviewdetailsmodalComponent, WorkflowmainmodalComponent, JournaldetailsviewmodalComponent, OpexpostingviewmodalComponent, CustomformdetailComponent, OpexpaymentdetailsComponent, BudgetviewdetailsmodalComponent, CommentModalComponent, TaxationviewdetailsmodalComponent, CashretirementviewdetailsmodalComponent, CashretirementpaymentdetailsComponent, 
    WorkflowDetailsComponent, OutstandingauthorizersModalComponent, OpexworkflowtrailmodalComponent, WorkflowquerymodalComponent, NotabledatadisplayComponent, TabledatadisplayComponent, DocumentsComponent,WorkflowquerytrailComponent, WorkflowquerytrailcommentmodalComponent
   ,FixedassetdetailsmodalComponent,
   FileuploadComponent,
   DocviewerComponent,
   DocumentloadComponent,
   WorkflowlpoviewdetailsComponent,
   
       
],

providers: [
    { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
    { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
    { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
    ImpersonationService,
    TreeDragDropService,
    CustomService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
],
schemas: [NO_ERRORS_SCHEMA]
})
 
export class WorkflowapprovalsModule { }
