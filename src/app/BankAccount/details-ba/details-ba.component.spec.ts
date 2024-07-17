import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBAComponent } from './details-ba.component';

describe('DetailsBAComponent', () => {
  let component: DetailsBAComponent;
  let fixture: ComponentFixture<DetailsBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsBAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
