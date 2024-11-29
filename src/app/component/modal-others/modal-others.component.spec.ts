import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOthersComponent } from './modal-others.component';

describe('ModalOthersComponent', () => {
  let component: ModalOthersComponent;
  let fixture: ComponentFixture<ModalOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
