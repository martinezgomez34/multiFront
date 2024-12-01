import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscribeComponent } from './suscribe.component';

describe('SuscribeComponent', () => {
  let component: SuscribeComponent;
  let fixture: ComponentFixture<SuscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
