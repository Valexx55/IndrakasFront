import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnopaginaComponent } from './alumnopagina.component';

describe('AlumnopaginaComponent', () => {
  let component: AlumnopaginaComponent;
  let fixture: ComponentFixture<AlumnopaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnopaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnopaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
