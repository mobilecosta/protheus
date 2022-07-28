import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCertComponent } from './companies-cert.component';

describe('CompaniesCertComponent', () => {
  let component: CompaniesCertComponent;
  let fixture: ComponentFixture<CompaniesCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesCertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
