import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfererComponent } from './transferer.component';

describe('TransfererComponent', () => {
  let component: TransfererComponent;
  let fixture: ComponentFixture<TransfererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransfererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
