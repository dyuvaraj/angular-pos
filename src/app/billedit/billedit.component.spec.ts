import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleditComponent } from './billedit.component';

describe('BilleditComponent', () => {
  let component: BilleditComponent;
  let fixture: ComponentFixture<BilleditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilleditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
