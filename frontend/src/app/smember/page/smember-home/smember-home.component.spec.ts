import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmemberHomeComponent } from './smember-home.component';

describe('SmemberHomeComponent', () => {
  let component: SmemberHomeComponent;
  let fixture: ComponentFixture<SmemberHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmemberHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmemberHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
