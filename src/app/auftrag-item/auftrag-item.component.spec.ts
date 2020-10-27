import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragItemComponent } from './auftrag-item.component';

describe('AuftragItemComponent', () => {
  let component: AuftragItemComponent;
  let fixture: ComponentFixture<AuftragItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
