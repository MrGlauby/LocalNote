import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteEditorDetail } from './note-editor-detail';

describe('NoteEditorDetail', () => {
  let component: NoteEditorDetail;
  let fixture: ComponentFixture<NoteEditorDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteEditorDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditorDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
