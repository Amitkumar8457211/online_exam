import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamlistComponent } from './examlist.component';

describe('ExamlistComponent', () => {
  let component: ExamlistComponent;
  let fixture: ComponentFixture<ExamlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
