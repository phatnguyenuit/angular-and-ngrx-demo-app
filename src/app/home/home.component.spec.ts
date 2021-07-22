import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let container: HTMLDivElement;

  const typeValue = async (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('keyup'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const getByTestId = <TElement extends Element>(testId: string) => {
    const element: TElement | null = container.querySelector(
      `[data-testid="${testId}"]`
    );
    if (!element)
      throw new Error(
        `Cannot find element with data-testid=${JSON.stringify(testId)}`
      );

    return element;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    container = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default title', () => {
    const titleElement: HTMLSpanElement = getByTestId('title');
    const titleInput: HTMLInputElement = getByTestId('title-input');

    expect(titleElement.textContent).toEqual(JSON.stringify('Home'));
    expect(titleInput.value).toEqual('Home');
  });

  it('should update title', async () => {
    const titleElement: HTMLSpanElement = getByTestId('title');
    const titleInput: HTMLInputElement = getByTestId('title-input');

    await typeValue(titleInput, 'Changed title');

    expect(component.title).toEqual('Changed title');
    expect(titleInput.value).toEqual('Changed title');
    expect(titleElement.textContent).toEqual(JSON.stringify('Changed title'));
  });
});
