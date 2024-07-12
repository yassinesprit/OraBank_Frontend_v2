import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BAChooseComponent } from './ba-choose.component';

describe('BAChooseComponent', () => {
  let component: BAChooseComponent;
  let fixture: ComponentFixture<BAChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BAChooseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BAChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
