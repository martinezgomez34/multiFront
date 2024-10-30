import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNewsComponent } from './table-news.component';

describe('TableNewsComponent', () => {
  let component: TableNewsComponent;
  let fixture: ComponentFixture<TableNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
