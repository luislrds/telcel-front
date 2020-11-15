import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBasesComponent } from './radio-bases.component';

describe('RadioBasesComponent', () => {
  let component: RadioBasesComponent;
  let fixture: ComponentFixture<RadioBasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
