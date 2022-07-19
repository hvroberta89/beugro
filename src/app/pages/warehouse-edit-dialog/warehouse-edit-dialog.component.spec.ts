import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEditDialogComponent } from './warehouse-edit-dialog.component';

describe('WarehouseEditDialogComponent', () => {
  let component: WarehouseEditDialogComponent;
  let fixture: ComponentFixture<WarehouseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
