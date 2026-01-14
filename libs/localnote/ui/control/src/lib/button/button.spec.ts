import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'test button');
  });

  describe('Create Component - Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Outputs', () => {
    it('should emit clicked event when button is clicked', () => {
      const spy = jest.spyOn(component.clicked, 'emit');
      const btn = fixture.nativeElement.querySelector('button');
      btn.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Inputs - Rendering', () => {
    it('should apply [primary] variant by default -  primary', () => {
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('button');
      expect(btn.classList).toContain('nl-button-primary');
    });

    it('should apply [disabled] variant by disabled btn', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const btnDisabled = fixture.nativeElement.querySelector('button');
      expect(btnDisabled.classList).toContain('nl-button-disabled');
    });

    it('should apply [secondary] variant - btn', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      const btnSecondary = fixture.nativeElement.querySelector('button');
      expect(btnSecondary.classList).toContain('nl-button-secondary');
    });

    it('should show the correct [label]', () => {
      fixture.componentRef.setInput('label', 'testLabel');
      fixture.detectChanges();
      const labelBtn = fixture.nativeElement.querySelector('button');
      expect(labelBtn.textContent.trim()).toBe('testLabel');
    });

    it('should set input [type] correctly', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('button');
      expect(btn.getAttribute('type')).toBe('submit');
    });
  });

  describe('Edge Cases and Errors', () => {
    it('should NOT emit clicked event when disabled button is clicked', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const spy = jest.spyOn(component.clicked, 'emit');
      const btn = fixture.nativeElement.querySelector('button');
      btn.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

