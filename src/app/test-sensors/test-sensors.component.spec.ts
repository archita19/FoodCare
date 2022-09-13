import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSensorsComponent } from './test-sensors.component';

describe('TestSensorsComponent', () => {
  let component: TestSensorsComponent;
  let fixture: ComponentFixture<TestSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
