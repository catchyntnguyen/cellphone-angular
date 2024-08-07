import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmemberOrderComponent } from './smember-order.component';

describe('SmemberOrderComponent', () => {
  let component: SmemberOrderComponent;
  let fixture: ComponentFixture<SmemberOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmemberOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmemberOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
