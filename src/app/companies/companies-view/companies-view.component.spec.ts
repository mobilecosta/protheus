import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { clienteViewComponent } from './cliente-view.component';

describe('clienteViewComponent', () => {
  let component: clienteViewComponent;
  let fixture: ComponentFixture<clienteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ clienteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(clienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
