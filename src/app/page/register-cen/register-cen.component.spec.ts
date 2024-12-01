import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCenComponent } from './register-cen.component';

describe('RegisterCenComponent', () => {
  let component: RegisterCenComponent;
  let fixture: ComponentFixture<RegisterCenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
