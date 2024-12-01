import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriberDialogComponent } from './suscriber-dialog.component';

describe('SuscriberDialogComponent', () => {
  let component: SuscriberDialogComponent;
  let fixture: ComponentFixture<SuscriberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscriberDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscriberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
