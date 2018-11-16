import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTrainerComponent } from './become-trainer.component';

describe('BecomeTrainerComponent', () => {
  let component: BecomeTrainerComponent;
  let fixture: ComponentFixture<BecomeTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
