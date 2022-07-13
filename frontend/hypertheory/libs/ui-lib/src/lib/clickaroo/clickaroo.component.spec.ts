import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ClickarooComponent } from './clickaroo.component';
import '@ngneat/spectator/jest';
import { tap } from 'rxjs';
describe('ClickarooComponent', () => {
  let spectator: Spectator<ClickarooComponent>;
  const createComponent = createComponentFactory(ClickarooComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
  it('clears out and focuses the input on button click', () => {
    spectator = createComponent();
    spectator.typeInElement('Hello, World', 'input[type="text"]');
    spectator.click('button');

    expect('input[type="text"]').toHaveValue('');
    expect('input[type="text"]').toBeFocused();
  });
  it('sends an output to the parent', () => {
    spectator = createComponent({ detectChanges: false });
    let result: string | undefined = undefined;
    spectator
      .output<string>('buttonClicked')
      .pipe(tap((value) => (result = value)))
      .subscribe();

    spectator.typeInElement('Hello, Tacos', 'input[type="text"]');
    spectator.click('button');

    spectator.detectChanges();
    expect(result).toBe('Hello, Tacos');
  });
  it('matches the snapshot', () => {
    spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
