import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureGeneratorComponent } from './lecture-generator.component';

describe('LectureGeneratorComponent', () => {
  let component: LectureGeneratorComponent;
  let fixture: ComponentFixture<LectureGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
