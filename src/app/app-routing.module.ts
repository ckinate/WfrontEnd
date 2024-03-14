import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkflowapprovalComponent } from './workflowapprovals/workflowapproval/workflowapproval.component';
import { WorkflowquerytrailComponent } from './workflowapprovals/workflowquerytrail/workflowquerytrail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        children: [
                          
                            { path: 'notifications', component: NotificationsComponent },
                            { path: 'workflowapproval', component: WorkflowapprovalComponent},
                            { path: 'workflowquery', component: WorkflowquerytrailComponent},
                            { path: '', redirectTo: '/app/main/dashboard', pathMatch: 'full' }
                        ]
                    },
                   
                    {
                        path: 'main',
                        loadChildren: () => import('app/main/main.module').then(m => m.MainModule), 
                        data: { preload: true }
                    },
                    
                    {
                        path: 'setup',
                        loadChildren: () => import('app/setup/setup.module').then(m => m.SetupModule), 
                        data: { preload: true } 
                    },
                    {
                        path: 'workflowapprovals',
                        loadChildren: () => import('app/workflowapprovals/workflowapprovals.module').then(m => m.WorkflowapprovalsModule), //Lazy load main module
                        data: { preload: true }
                    },
                    // {
                    //     path: 'operation',
                    //     loadChildren: () => import('app/operation/operation.module').then(m => m.OperationModule), 
                    //     data: { preload: true }
                    // },
                    // {
                    //     path: 'admin',
                    //     loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), 
                    //     data: { preload: true },
                    //     canLoad: [AppRouteGuard]
                    // },
                    {
                        path: '**', redirectTo: 'notifications'
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor(
        private router: Router,
        private spinnerService: NgxSpinnerService
    ) {
        router.events.subscribe((event) => {

            if (event instanceof RouteConfigLoadStart) {
                spinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                spinnerService.hide();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
