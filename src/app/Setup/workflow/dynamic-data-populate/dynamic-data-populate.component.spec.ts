import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDataPopulateComponent } from './dynamic-data-populate.component';

describe('DynamicDataPopulateComponent', () => {
  let component: DynamicDataPopulateComponent;
  let fixture: ComponentFixture<DynamicDataPopulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDataPopulateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDataPopulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
