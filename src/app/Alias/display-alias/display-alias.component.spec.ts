import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAliasComponent } from './display-alias.component';

describe('DisplayAliasComponent', () => {
  let component: DisplayAliasComponent;
  let fixture: ComponentFixture<DisplayAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayAliasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
