import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCentersComponent } from './delete-centers.component';

describe('DeleteCentersComponent', () => {
  let component: DeleteCentersComponent;
  let fixture: ComponentFixture<DeleteCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
