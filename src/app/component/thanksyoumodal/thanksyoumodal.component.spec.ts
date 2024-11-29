import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksyoumodalComponent } from './thanksyoumodal.component';

describe('ThanksyoumodalComponent', () => {
  let component: ThanksyoumodalComponent;
  let fixture: ComponentFixture<ThanksyoumodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksyoumodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksyoumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
