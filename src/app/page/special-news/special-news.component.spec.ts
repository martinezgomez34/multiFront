import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialNewsComponent } from './special-news.component';

describe('SpecialNewsComponent', () => {
  let component: SpecialNewsComponent;
  let fixture: ComponentFixture<SpecialNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
