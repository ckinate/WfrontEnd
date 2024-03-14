



import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';

// import { SetupModuleComponent } from './setup-module/setup-module.component';
// import { WorkflowlevelComponent } from './workflow/workflowlevel/workflowlevel.component';
import { WorkflowgroupComponent } from './workflow/workflowgroup/workflowgroup.component';
import { WorkflowslaComponent } from './workflow/workflowsla/workflowsla.component';
import { WorkflowdefinitionComponent } from './workflow/workflowdefinition/workflowdefinition.component';
import { WorkflowroleComponent } from './workflow/workflowrole/workflowrole.component';
import { ApprovalgroupComponent } from './workflow/approvalgroup/approvalgroup.component';
import { SlaintervalsetupComponent } from './workflow/slaintervalsetup/slaintervalsetup.component';


 import { ApprovallevelComponent } from './workflow/approvallevel/approvallevel.component';

import { FormComponent } from './workflow/customforms/form/form.component';
import { DyformsComponent } from './workflow/customforms/dyforms.component';

import { DynamicDataPopulateComponent } from './workflow/dynamic-data-populate/dynamic-data-populate.component';
import { WorkFlowRelieveComponent } from './workFlowRelieve/workFlowRelieve.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
// import { ApprovalgroupComponent } from './approval/approvalgroup/approvalgroup.component';

// import { SlaintervalsetupComponent } from './approval/slaintervalsetup/slaintervalsetup.component';
// import { WorkflowdefinitionComponent } from './approval/workflowdefinition/workflowdefinition.component';
// import { RolemanagementComponent } from './approval/rolemanagement/rolemanagement.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'datap', component: DynamicDataPopulateComponent },
                    { path: 'workflow', component: WorkflowComponent, data: { permission: 'Pages.Workflow' }  },


                    //  {path: 'setupMode', component: SetupModuleComponent, data:{ permission: 'Pages.BankRecSetUpClassCode' }},

                     {path: 'level', component: ApprovallevelComponent, data:{ permission: 'Pages.Workflow' }},
                     {path: 'group', component: ApprovalgroupComponent, data:{ permission: 'Pages.Workflow' } },
                     {path: 'forms', component: DyformsComponent, data:{ permission: 'Pages.Workflow' } },
                     {path: 'useform', component: FormComponent, data:{ permission: 'Pages.Workflow' } },

                     {path: 'slaintervalsetup', component: SlaintervalsetupComponent, data:{ permission: 'Pages.Workflow' } },
                     {path: 'workflowdefinition', component: WorkflowdefinitionComponent, data:{ permission: 'Pages.Workflow' } },
                    {path: 'role', component: WorkflowroleComponent, data:{ permission: 'Pages.Workflow' } },
                    { path: 'workFlowRelieve', component: WorkFlowRelieveComponent, data: { permission: 'Pages.Workflow' } },
                    {path: 'emailSetting', component: EmailSettingComponent, data:{ permission: 'Pages.Workflow' } },



                     // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SetupRoutingModule {

    constructor(
        private router: Router
    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
