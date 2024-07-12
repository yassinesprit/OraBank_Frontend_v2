import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasDisplayComponent } from './alias-display.component';

describe('AliasDisplayComponent', () => {
  let component: AliasDisplayComponent;
  let fixture: ComponentFixture<AliasDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AliasDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
