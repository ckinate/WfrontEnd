import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpexpaymentdetailsComponent } from './opexpaymentdetails.component';

describe('OpexpaymentdetailsComponent', () => {
  let component: OpexpaymentdetailsComponent;
  let fixture: ComponentFixture<OpexpaymentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpexpaymentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpexpaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
