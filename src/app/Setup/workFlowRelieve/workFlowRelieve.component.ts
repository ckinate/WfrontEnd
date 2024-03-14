import { NgForm } from '@angular/forms';
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import {  UserListDto, UserServiceProxy, WorkFlowReliefDto, WorkflowServiceServiceProxy} from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import { finalize } from 'rxjs/operators';
import { Table } from 'primeng';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';

@Component({
  selector: 'app-workFlowRelieve',
  templateUrl: './workFlowRelieve.component.html',
  styleUrls: ['./workFlowRelieve.component.css'],
  encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class WorkFlowRelieveComponent  extends AppComponentBase implements OnInit {

  constructor( injector: Injector,    private _dateTimeService: DateTimeService,  private _userServiceProxy: UserServiceProxy,
    private _WorkflowService: WorkflowServiceServiceProxy) {
      super(injector)
  }
  startdate= new Date();
  maxDate = new Date();
  userWfDelegation: WorkFlowReliefDto = new WorkFlowReliefDto();
  usersList : UserListDto[];
  relieveNameList: UserListDto[];
  saving: boolean = false;
  loading : boolean = false;
  relieveusers: string;
  recordcount: number;
  endDateMin : DateTime;
  minPickDate:  Date;
  loginUserName: string;




  ngOnInit() {
      this.getRelieveName();
      this.getActiveDelegate();
      this.getReliveNameList();

      this.getLoginUser();





  }
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  primengTableHelper = new PrimengTableHelper();
  getAllUsers(){
      this._userServiceProxy.getUserList().subscribe((result)=>{
          this.usersList = result;
      })
  }
  getLoginUser(){
    this. userWfDelegation.requestorName = this.appSession.user.userName;
  }
  getReliveNameList(){
      this._userServiceProxy.getUserList().subscribe((result)=>{
        this.relieveNameList = result;
        console.log(`The users is ${JSON.stringify(this.relieveNameList) }`);
      })

  }
  getRelieveName(){
      this._userServiceProxy.getRelieveName().subscribe((result)=>{
        this.relieveusers = result;
        this.userWfDelegation.relieveName = result;
        this.CheckForEmptyUserName();
      })
  }
  CheckForEmptyUserName(){
    if(this.userWfDelegation.relieveName == null || this.userWfDelegation.relieveName == undefined){
      this.message.warn("No Relief has been Profiled for the User , Kindly Contact Admin to Profile the User Relief On User Interface")
    }

  }
  CheckForEmptyUserNameAndDisableSelect(){
    if(this.userWfDelegation.relieveName == null || this.userWfDelegation.relieveName == undefined){
      this.message.warn("No Relief has been Profiled for the User , Kindly Contact Admin to Profile the User Relief On User Interface")
    }
    // else if(!this.isGranted('Pages.Workflow.Delegation')){
    //     this.message.warn("you can not select, you are selected by Default");
    // }
  }

  setMinDate(value){
    var nextDay = new Date(value);
    nextDay.setDate(nextDay.getDate() + 1);
    this.minPickDate = nextDay;

  }






  save(workFlowRelieve:NgForm){
    let input = new WorkFlowReliefDto();
    input.relieveName = this.userWfDelegation.relieveName;
    input.requestorName = this.userWfDelegation.requestorName;
    input.startTime =  this._dateTimeService.getStartOfDayForDate(this.userWfDelegation.startTime);
    input.endTime = this._dateTimeService.getEndOfDayForDate(this.userWfDelegation.endTime);
    this.message.confirm("To Proceed",
    this.l("AreYouSure"),
    (isConfirmed) => {
        if(isConfirmed){
            this.showMainSpinner();
            this.saving = true;
    this._WorkflowService.delegateApprovalUser(input).pipe(finalize(() => { this.saving = false; })).subscribe(() => {
        this.getActiveDelegate();
        this.notify.info(this.l('Saved Successfully'));
    })
    this.hideMainSpinner();
 }
    }
 )
// workFlowRelieve.resetForm();
  }

 Terminate(reliefDto:WorkFlowReliefDto){
    this.message.confirm("To Proceed and Terminate",
    this.l("AreYouSure"),
    (isConfirmed)=>{
        if(isConfirmed){
            this._WorkflowService.terminateWfRelieve(reliefDto).pipe(finalize(()=>{this.loading = false})).subscribe(()=>{
                this.getActiveDelegate();
                this.notify.info(this.l('Stop successfully'));
            })
        }
    })
 }
 getActiveDelegate(){
    // this.primengTableHelper.showLoadingIndicator();
    // this._WorkflowService.getAllActiveDelegateForUser().pipe(
    //     finalize(() => this.primengTableHelper.hideLoadingIndicator())
    // ).subscribe((result)=>{
    //     this.primengTableHelper.records = result;
    //     this.primengTableHelper.totalRecordsCount = result.length;
    //     this.recordcount = result.length;
    //     console.log(this.recordcount);
    // })
    this.primengTableHelper.showLoadingIndicator();
    this._userServiceProxy.getAllActiveDelegateForUsers().pipe(finalize(()=>this.primengTableHelper.hideLoadingIndicator())).subscribe((res)=>{
        this.primengTableHelper.records = res;
        this.primengTableHelper.totalRecordsCount = res.length;
        this.recordcount = res.length;
    });
 }

}
