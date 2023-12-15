import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AettingsComponent } from './aettings.component';

describe('AettingsComponent', () => {
  let component: AettingsComponent;
  let fixture: ComponentFixture<AettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AettingsComponent]
    });
    fixture = TestBed.createComponent(AettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
