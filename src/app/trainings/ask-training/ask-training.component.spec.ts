import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskTrainingComponent } from './ask-training.component';

describe('AskTrainingComponent', () => {
  let component: AskTrainingComponent;
  let fixture: ComponentFixture<AskTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
