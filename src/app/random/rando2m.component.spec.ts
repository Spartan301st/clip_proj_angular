import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rando2mComponent } from './rando2m.component';

describe('RandomComponent', () => {
  let component: Rando2mComponent;
  let fixture: ComponentFixture<Rando2mComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rando2mComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rando2mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
