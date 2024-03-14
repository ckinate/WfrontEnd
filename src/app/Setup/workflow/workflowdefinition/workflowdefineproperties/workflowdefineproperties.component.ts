import { Component, OnInit, Injector, AfterViewInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { WorkflowServiceServiceProxy, WorkflowGroupDto, WorkflowLevelDto, CreateWorkflowMappingDto, GeneralOperationsServiceServiceProxy, SLASetupDto, WorkflowRoleDto, WorkflowMappingDto,  WFormServiceServiceProxy, CustomFormsDto, WorkflowFormMappingDto, RoleServiceProxy, Role, CompanyStructureServiceProxy, CompanyCategoryStructureDto, WorkflowLeveInputDto, ValidateLevelMapToWorkflowDto} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm, NG_VALIDATORS, FormControl, Validator, ValidationErrors, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';

import { Paginator } from 'primeng/paginator';
import { timeStamp } from 'console';
import { ChildCommunicationService } from '@shared/utils/child-communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'workFlowDefineProperties',
  templateUrl: './workflowdefineproperties.component.html',
  styles: [`
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid blue;
}

.ng-invalid:not(form)  {
    border-left: 5px solid red;
}
::ng-deep input:required:invalid {
  border-left: 5px solid red !important;
}

::ng-deep input:required {
  border-left: 5px solid blue !important;
}
`],


})
export class WorkflowdefinepropertiesComponent extends AppComponentBase implements OnInit, AfterViewInit,OnDestroy {
  WorkflowMappingForm: NgForm

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

   @ViewChild('modal' , {static: true}) modal: ModalDirective;
   active = false;

   WorkflowGroupList:   WorkflowGroupDto[] = [];
   WorkflowLevelList:   WorkflowLevelDto[] = [];
   WorkflowRoleList:   WorkflowRoleDto[] = [];

   slaList:   SLASetupDto[] = [];
  workflowDefinitionId:  number;
  pid:number;
 wfFormList: CustomFormsDto[] = [];
 workflowFormID: any;
 wfFormMap: WorkflowFormMappingDto = new WorkflowFormMappingDto();

   Workflowmapping: CreateWorkflowMappingDto = new CreateWorkflowMappingDto();
   levelposition: any;
   groupposition: any;
   hidesla = false;
   saving= false;
   OPID = 0;
   @ViewChild('workflowDefinePropertiesTable', { static: true }) workflowDefinePropertiesTable: Table;
   workflowDefinePropertiesTableHelper = new PrimengTableHelper();
   @ViewChild('paginator', { static: true }) paginator: Paginator;

   @Output() loadWorkflowMapping: EventEmitter<any> = new EventEmitter<any>();

   verifyAmount
   
   products = new FormArray([]);
   isUserMappedToRole = false;
   systemrole: Role[] = [];

   customerInfo : FormGroup;
   companystructurecategory : CompanyCategoryStructureDto[]=[];
   hideuserfield:boolean;
 disabledamountfield =true;

 hidemiscategory:boolean;

   hideUsersmodal=true;
   workflowLeveInput: WorkflowLeveInputDto = new WorkflowLeveInputDto();
   levelId:number = 0;
   roleId: number = 0;
  basetypeExist = new ValidateLevelMapToWorkflowDto();
  private childFunctionSubscription: Subscription;

  constructor(injector: Injector,
    private _WorkflowService: WorkflowServiceServiceProxy,
     private _operationService: GeneralOperationsServiceServiceProxy,
     private _service: WFormServiceServiceProxy,
     private  formBuilder : FormBuilder,
     private _roleService: RoleServiceProxy,
    private _companystructurecategorey: CompanyStructureServiceProxy,
    private childCommunicationService: ChildCommunicationService
    ) {

    super(injector);

    this.childFunctionSubscription = this.childCommunicationService.childFunctionCalled$.subscribe(() => {
      
      this.customerInfo = this.formBuilder.group({
        levelName: new FormControl(null, [Validators.required]),
        levelPosition: this.levelposition,
        workflowDefinitionId: this.workflowDefinitionId,
        enforceComment: new FormControl(false),
        enforceAmountLimit: new FormControl(false),
        workflowSLASetupId: new FormControl(null, [Validators.required]),
        workflowRoles: this.formBuilder.array([])
      });

     });
    
 
}
  ngOnDestroy(): void {
    this.childFunctionSubscription.unsubscribe();
  }

ngOnInit(): void {
  this.getSlaList() ;
  
  this.getWorkflowRole();
 
  this.refresh();
  this.getRoles();
  this.getcompanycategory();

  this.customerInfo = this.formBuilder.group({
    levelName : new FormControl(null, [Validators.required]),
    levelPosition : this.levelposition,
    workflowDefinitionId : this.workflowDefinitionId,
    enforceComment : new FormControl(false),
    enforceAmountLimit : new FormControl(false),
    workflowSLASetupId : new FormControl(null, [Validators.required]),
    workflowRoles : this.formBuilder.array([])
  })


}

addProduct(){
  
  // if(this.products.length > 0){
   
   if( this.products.length > 0  && this.products.value[0].baseType === 1){
    this.message.error("you cannot add two MIS based type to a level");

   }else{
    this.products = this.customerInfo.get('workflowRoles') as FormArray;
    this.products.push(this.formBuilder.group({
      roleName : new FormControl(null, [Validators.required]),
      misBaseTypeLimit : [0],
      maximumAmount : [0],
      minimumAmount : [0],
      baseType :new FormControl(null, [Validators.required]),
      userManagementRoleID : [0],
      id: [0]                                                                   
    }));
   }

}

createCustomerInfo(){
  
  this.workflowLeveInput = this.customerInfo.value;
  this.workflowLeveInput.levelPosition = this.levelposition
  this.workflowLeveInput.workflowDefinitionId = this.workflowDefinitionId;

    if(this.workflowLeveInput.workflowRoles.length == 0){
          this.message.error(" Please add atleast one role information");
          return;
    }

      if(this.levelId > 0){
        this.UpdateWorkflowSetup();
      }
      else{
        this._WorkflowService
        .createWorkflowSetup(this.workflowLeveInput)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {

          this.notify.info(this.l('Saved Successfully'));
          this.modalSave.emit(null);
          this.products = new FormArray([]);
          this.workflowLeveInput = new WorkflowLeveInputDto();
          
          
          
        
          this.close();
          
        });
         
       }

  //console.log('data is ', this.customerInfo.value, this.levelposition , this.workflowDefinitionId);
}

  UpdateWorkflowSetup(){
    this.workflowLeveInput.levelId = this.levelId;

  this._WorkflowService
  .updateWorkflowSetup(this.workflowLeveInput)
  .pipe(
    finalize(() => {
      this.saving = false;
    })
  )
  .subscribe(() => {

    this.notify.info(this.l('Updated Successfully'));
    this.workflowLeveInput = new WorkflowLeveInputDto();
    this.levelId = 0
    
    this.modalSave.emit(null);
    this.products = new FormArray([]);
  
   this.close();
    
  });
}

deleteworkflowrole(id: any){
  
  this.products = this.customerInfo.get('workflowRoles') as FormArray;
  this.products.removeAt(id);
}
handleChangeMis(e, id: number) {    
  

  this.products = this.customerInfo.get('workflowRoles') as FormArray;
  var item = this.products.value[0].baseType == 2;
   if(this.products.length > 1 && item == true ){
      this.message.error("you can not add two different base type to a level");
      this.products.at(id).get('baseType').setValue(0);
     // ((this.products.get('controls') as FormArray).at(id) as FormGroup).get('baseType').patchValue(0);
     return;
   }
   
    //Check if Mis Base has been add to another level of thesame operationID
   this._WorkflowService.checkIfMisBaseExist(this.workflowDefinitionId,1)
      .subscribe(items => {
        this.basetypeExist = items;
       
        if(this.basetypeExist.isExist ==true  && this.basetypeExist.baseTypeId == 1 && this.basetypeExist.workflowDefinitionId == this.workflowDefinitionId){
          this.message.error("Sorry you cannot have more than one MIS Base in an operation");
          
            console.log(this.products.at(id).get('baseType'));
            this.products.at(id).get('baseType').setValue(0);
        //  ((this.products.get('controls') as FormArray).at(id) as FormGroup).get('baseType').patchValue(0);
         return
        }
      });
  
  this.hideuserfield = true;
      this.hidemiscategory=true;

  }

  handleChangeUser(e, id: number) {

    //     this.role.baseType=2;
     //let b =1;
     this.hideuserfield = false;
     this.hidemiscategory =false;
  
    }

IsUsermanagementIsMapToExistingLevel(userManagementRoleId: any , roleid : any, id:any){

  let userRoleId = userManagementRoleId.value;
 
  this.products = this.customerInfo.get('workflowRoles') as FormArray;
//  console.log(this.products.controls.find(f => f.value ["id"] = id).value );

  if(userRoleId > 0 ){
        
       
        //Check if Mis Base has been add to another level of thesame operationID
   this._WorkflowService.checkIfUserRoleExist(this.workflowDefinitionId,userRoleId)
   .subscribe(items => {
     this.basetypeExist = items;

     if(this.basetypeExist.isExist==true  && this.basetypeExist.userRoleId == userRoleId  && this.basetypeExist.workflowDefinitionId == this.workflowDefinitionId && this.basetypeExist.workflowRoleId != roleid  )
     {

      this.message.error("User management role has been map to existing level ");
        console.log(this.products.at(id).get('userManagementRoleID').setValue(0))
      this.products.at(id).get('userManagementRoleID').setValue(0);
    
       // ((this.products.get('controls') as FormArray).at(id) as FormGroup).get('userManagementRoleID').patchValue("0");
        
     }
   });
 
   
  }
    
}

    getRoles() {
  
      this._roleService.getRoleList()
        .subscribe(items => {
          this.systemrole = items;
        });
    }

    getcompanycategory(){

      this._companystructurecategorey.getAllCompanyCategory()
      .subscribe(items => {
        this.companystructurecategory = items;
      });
    }

refresh(){
  
  this.Workflowmapping.levelId=0;
  this.Workflowmapping.enforceComment = false;
  this.Workflowmapping.enforceAmountLimit = false;
}


Addform(id: number){
this.saving = true;
  this.wfFormMap.workflowID = this.workflowDefinitionId.toString();
  this.wfFormMap.operationID = this.OPID;
  this.wfFormMap.uniqueID = this.workflowFormID;

  this._service.mapFormToWorkflow(this.wfFormMap).pipe(
    finalize(() => {
      this.saving = false;
    })
  ).subscribe(() => {
this.notify.success("Form successfully mapped");
  });

}


ngAfterViewInit(): void {

}


validate(min: number, max: number): ValidationErrors {


  const minAmountControl = min;
  const maxAmountControl = max;

  if (minAmountControl != null && maxAmountControl != null) {
    const min = minAmountControl;
    const max = maxAmountControl;
    let error = null;

    if (min > max ) {
      error = 'Minimum Amount Cannot be greater than Maximum Amount';
    }

    const message = {
      'workFlowDefineProperties': {
        'message': error
      }
    };

    return error ? message : null;
  }
}


togglech(event){

  this.hidesla = !this.hidesla;
}

show(workflowDefinitionId?: number,levelPosition?: number, opid?: number, ): void {
  this.active = true;
 this.OPID = opid;
 this.levelposition = levelPosition;
 this.workflowDefinitionId = workflowDefinitionId;

 
  this.modal.show();

  this.loadWorkflowDefineProperty(this.workflowDefinitionId);
 // this.getWorkflowform();
}

editModal(record?: WorkflowLeveInputDto){
  
  this.levelposition = record.levelPosition;
 this.workflowDefinitionId = record.workflowDefinitionId;
 this.levelId = record.levelId;
 
//map value of form array back
  for(const skill of record.workflowRoles) {
    this.products.push(this.formBuilder.group({
      roleName : [skill.roleName],
      misBaseTypeLimit : [skill.misBaseTypeLimit],
      maximumAmount : [skill.maximumAmount],
      minimumAmount : [skill.minimumAmount],
      baseType : [skill.baseType],
      userManagementRoleID : [skill.userManagementRoleID],
      id: [skill.id],
    }));
  }
 
  // add it to the form group
 this.customerInfo = this.formBuilder.group({
  levelName : record.levelName,
  levelPosition : this.levelposition,
  workflowDefinitionId : this.workflowDefinitionId,
  enforceComment : record.enforceComment,
  enforceAmountLimit : record.enforceAmountLimit,
  workflowSLASetupId : record.workflowSLASetupId,
  workflowRoles :  this.formBuilder.array(this.products.controls)
   });
   

   //Control the MIS type radio button on modal pop up
   this.products = this.customerInfo.get('workflowRoles') as FormArray;
  var item = this.products.value[0].baseType == 1;
   if(item == true ){
      this.hideuserfield = true;
      this.hidemiscategory=true;
   }else{
    this.hideuserfield = false;
      this.hidemiscategory=false;
   }

  this.modal.show();
}

 validateIfUserIsMappedToRole(){

 }


saveMapping(WorkflowMappingForm: NgForm) {
  this.saving = true;

   if (this.Workflowmapping.id === 0 || this.Workflowmapping.id == null) {

      this.Workflowmapping.tenantId= abp.session.tenantId;
      this.Workflowmapping.workflowDefinitionId = this.workflowDefinitionId;
      
        this._WorkflowService
        .createMapping(this.Workflowmapping)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {

          this.notify.info(this.l('SavedSuccessfully'));

          this.loadWorkflowDefineProperty(this.workflowDefinitionId);
          this.hidesla = false;
           //this.loadWorkflowMapping() ;
           this.Workflowmapping = new CreateWorkflowMappingDto();
          WorkflowMappingForm.resetForm();
          this.refresh();
          
        });


      }
       else {
      // this._WorkflowService
      //   .updateWorkflowMapping(this.Workflowmapping).pipe(
      //     finalize(() => {
      //       this.saving = false;
      //     })
      //   )
      //   .subscribe(() => {
      //     this.loadWorkflowDefineProperty(this.workflowDefinitionId); ;
      //     this.notify.info('Updated Successfully');
      //     this.Workflowmapping = new CreateWorkflowMappingDto();
      //     WorkflowMappingForm.resetForm();
      //     this.refresh();
         
      //   });


    }


  }


 


  loadWorkflowDefineProperty(id?: number) {




    this. workflowDefinePropertiesTableHelper.showLoadingIndicator();
    this._WorkflowService.getWorkflowMapping(this.workflowDefinitionId
    ).pipe(finalize(() => this. workflowDefinePropertiesTableHelper.hideLoadingIndicator())).subscribe(result => {

      this. workflowDefinePropertiesTableHelper.records = result;

      this. workflowDefinePropertiesTableHelper.hideLoadingIndicator();
      
       this.loadWorkflowMapping.emit();

    });



  }

getSlaList() {


  this._WorkflowService.getSlaSetup()
    .subscribe(items => {
      this.slaList = items;



    });
}


getWorkflowLevel() {

  this._WorkflowService.getWorkflowLevel()
    .subscribe(items => {
      this.WorkflowLevelList = items;




    });
}

getWorkflowGroup() {

  this._WorkflowService.getWorkflowGroupExcludeInitiation()
    .subscribe(items => {
      this.WorkflowGroupList = items;



    });
}


getWorkflowRole() {

  this._WorkflowService.getWorkflowRole()
    .subscribe(items => {
      this.WorkflowRoleList = items;



    });
}



close(): void {
  this.modal.hide();
  this.products.clear();
  this.customerInfo.reset();
  this.active = false;
}

  onShown(): void {

  }

  edit(f:CreateWorkflowMappingDto): void {


    this.Workflowmapping.id = f.id;
    this.Workflowmapping.tenantId= f.tenantId;
    
    this.Workflowmapping.levelId= f.levelId;
    this.Workflowmapping.levelPosition= f.levelPosition;
    this.Workflowmapping.enforceComment=f.enforceComment;
    this.Workflowmapping.enforceAmountLimit = f.enforceAmountLimit;
    this.Workflowmapping.isActive = f.isActive;
     
    this.Workflowmapping.workflowDefinitionId= f.workflowDefinitionId;
    this.Workflowmapping.workflowSLASetupId =  f.workflowSLASetupId;




  }


  delete(d: WorkflowMappingDto): void {
    this.message.confirm(
        this.l('Do you want to delete this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deleteWorkflowMapping(d.workflowDefinitionId,d.levelPosition,d.id).subscribe(() => {
                   // this.reloadPage();
                    this.message.info(this.l('Successfully Deleted'));
                    this.loadWorkflowDefineProperty(this.workflowDefinitionId);
                    this.Workflowmapping = new CreateWorkflowMappingDto();
                    this.refresh();
                    
                });
            }
        }
    );
  }

  deactivate(d: WorkflowMappingDto): void {
    this.message.confirm(
        this.l('Do you want to deactivate this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.deactivateWorkflowMapping(d.workflowDefinitionId,d.levelPosition,d.levelId).subscribe(() => {
                   
                    this.message.info(this.l('Successfully Deactivated'));
                    this.loadWorkflowDefineProperty(this.workflowDefinitionId);
                    this.Workflowmapping = new CreateWorkflowMappingDto();
                    this.refresh();
                });
            }
        }
    );
  }

  activate(d: WorkflowMappingDto): void {
    this.message.confirm(
        this.l('Do you want to activate this level?'),
        this.l('Are You Sure'),
        isConfirmed => {
            if (isConfirmed) {
                this._WorkflowService.activateWorkflowMapping(d.workflowDefinitionId,d.levelPosition).subscribe(() => {
                    this.message.info(this.l('Successfully activated'));
                    this.loadWorkflowDefineProperty(this.workflowDefinitionId);
                    this.Workflowmapping = new CreateWorkflowMappingDto();
                    this.refresh();
                });
            }
        }
    );
  }


}
