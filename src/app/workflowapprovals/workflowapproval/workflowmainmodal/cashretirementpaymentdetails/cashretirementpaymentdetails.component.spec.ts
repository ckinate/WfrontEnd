import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashretirementpaymentdetailsComponent } from './cashretirementpaymentdetails.component';

describe('CashretiremntpaymentdetailsComponent', () => {
  let component: CashretirementpaymentdetailsComponent;
  let fixture: ComponentFixture<CashretirementpaymentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashretirementpaymentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashretirementpaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
