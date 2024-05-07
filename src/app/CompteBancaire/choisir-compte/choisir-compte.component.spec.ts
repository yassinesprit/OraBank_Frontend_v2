import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirCompteComponent } from './choisir-compte.component';

describe('ChoisirCompteComponent', () => {
  let component: ChoisirCompteComponent;
  let fixture: ComponentFixture<ChoisirCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoisirCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoisirCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
