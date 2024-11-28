import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonorComponent } from './edit-donor.component';

describe('EditDonorComponent', () => {
  let component: EditDonorComponent;
  let fixture: ComponentFixture<EditDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDonorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
