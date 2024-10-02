import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMagnifierComponent } from './icon-magnifier.component';

describe('IconMagnifierComponent', () => {
  let component: IconMagnifierComponent;
  let fixture: ComponentFixture<IconMagnifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconMagnifierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconMagnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
