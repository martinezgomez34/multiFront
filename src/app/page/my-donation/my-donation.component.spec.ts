import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDonationComponent } from './my-donation.component';

describe('MyDonationComponent', () => {
  let component: MyDonationComponent;
  let fixture: ComponentFixture<MyDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
