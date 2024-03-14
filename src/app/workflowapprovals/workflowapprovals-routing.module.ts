import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowAuditTrailComponent } from './workflow-audit-trail/workflow-audit-trail.component';
import { WorkflowapprovalComponent } from './workflowapproval/workflowapproval.component';
import { WorkflowquerytrailComponent } from './workflowquerytrail/workflowquerytrail.component';
import { WorkflowtrackerComponent } from './workflowtracker/workflowtracker.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
          path: '',
          children: [
             // { path: 'journalapproval', component: JournalapprovalComponent},
              { path: 'workflowaudittrail', component: WorkflowAuditTrailComponent},
              { path: 'workflowtracker', component: WorkflowtrackerComponent},
            
             { path: 'workflowapproval', component: WorkflowapprovalComponent},
             { path: 'workflowquery', component: WorkflowquerytrailComponent},
             
              
          ]
      }
  ])
  ],
  exports: [RouterModule]
})
export class WorkflowapprovalsRoutingModule { }
