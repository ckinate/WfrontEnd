import { CompanyStructureDto, CompanyStructureServiceProxy, CreateCompanyStructureInputDto, UpdateCompanyStructureInputDto, CompanyCategoryStructureDto, CompanyCategoryStructureInputDto, UserServiceProxy, UserListDto } from './../../../shared/service-proxies/service-proxies';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';


export interface IEdit {
    id?: number;
    parentId?: number;
    displayName?: string;
    customCode?: string;
    unitTypeId?: number;
    headUser?: string;
}
export interface ICatEdit {
    categoryOrder?: number;
    categoryName?: string;
    id?: number;
}
@Component({
    selector: 'createOrEditCompanyModalComponent',
    templateUrl: './create-or-edit-company-modal.component.html'
})
export class CreateOrEditCompanyModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('organizationUnitDisplayName', { static: true }) organizationUnitDisplayNameInput: ElementRef;
    @ViewChild('organizationUnitCustomCode', { static: true }) organizationUnitCustomCodeInput: ElementRef;
    @ViewChild('organizationUnitUnitTypeId', { static: true }) organizationUnitUnityTypeIdInput: ElementRef;
     @ViewChild('OrganizationUnitHead', { static: true }) OrganizationUnitHeadInput: ElementRef;
    @Output() unitCreated: EventEmitter<CompanyStructureDto> = new EventEmitter<CompanyStructureDto>();
    @Output() unitUpdated: EventEmitter<CompanyStructureDto> = new EventEmitter<CompanyStructureDto>();

    active = false;
    saving = false;
    organizationUnit: IEdit = {};
    organizationCategory: ICatEdit = {};
    category: CompanyCategoryStructureDto[] = [];
    users: UserListDto[] =[];;

    constructor(
        injector: Injector,
        private _Service: CompanyStructureServiceProxy,
        private _user: UserServiceProxy,
        private _changeDetector: ChangeDetectorRef
    ) {
        super(injector);
    }

    onShown(): void {
        document.getElementById('OrganizationUnitDisplayName').focus();
        document.getElementById('OrganizationUnitCustomCode').focus();
        //  document.getElementById('OrganizationUnitUnitTypeId').focus();
        //  document.getElementById('OrganizationUnitHead').focus();
    }

    show(organizationUnit: IEdit): void {
        this.getCategoryList();
        this.getUsers();
        this.organizationUnit = {};
        this._changeDetector.detectChanges();
        this.organizationUnit = organizationUnit;
        this.active = true;
        this.modal.show();
        console.log(this.organizationUnit);
        
        
        
    }

    save(): void {
        if (!this.organizationUnit.id) {
            this.createUnit();
        } else {
            this.updateUnit();
        }
    }
getUsers() {

    this._user.getUserList().subscribe((x) => {
this.users = x;
console.log(x);
    } )
}

    getCategoryList() {
        this._Service.getAllCompanyCategory().subscribe((x) => {
            this.category = x;
            
        })
    }
    createCategory() {

        const createInput = new CompanyCategoryStructureInputDto();
        createInput.companyCode = this.getCompanyCode();
        createInput.categoryName = this.organizationCategory.categoryName;
        createInput.id = this.organizationCategory.id;
        createInput.categoryOrder = this.organizationCategory.categoryOrder;
        this._Service.createCompanyCategory(createInput).subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.getCategoryList();
            this.organizationCategory = {};
        });
    }
    updateCategory() {

        const updateInput = new CompanyCategoryStructureInputDto();
        updateInput.categoryName = this.organizationCategory.categoryName;
        updateInput.id = this.organizationCategory.id;
        this._Service.updateCompanyCategory(updateInput).subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.getCategoryList();
        });
    }

    saveCategory(): void {
        if (!this.organizationCategory.id) {
            this.createCategory();
        } else {
            this.updateCategory();
        }

    }

    createUnit() {
        const createInput = new CreateCompanyStructureInputDto();
        createInput.parentId = this.organizationUnit.parentId;
        createInput.displayName = this.organizationUnit.displayName;
        createInput.customCode = this.organizationUnit.customCode;
        createInput.headUser = this.organizationUnit.headUser;
        createInput.unitTypeId = this.organizationUnit.unitTypeId;
        this.saving = true;
        this._Service
            .createCompanyStructure(createInput)
            .pipe(finalize(() => this.saving = false))
            .subscribe((result: CompanyStructureDto) => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.unitCreated.emit(result);
            });
    }

    updateUnit() {
        const updateInput = new UpdateCompanyStructureInputDto();
        updateInput.id = this.organizationUnit.id;
        updateInput.displayName = this.organizationUnit.displayName;
        updateInput.customCode = this.organizationUnit.customCode;
        updateInput.headUser = this.organizationUnit.headUser;
        updateInput.unitTypeId = this.organizationUnit.unitTypeId;
        this.saving = true;
        this._Service
            .updateCompanyStructure(updateInput)
            .pipe(finalize(() => this.saving = false))
            .subscribe((result: CompanyStructureDto) => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.unitUpdated.emit(result);
            });
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

}
