import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { StatusIndicatorComponent } from './status-indicator.component';
import '@ngneat/spectator/jest';
describe('The Status Indicator', () => {
  const selectors = {
    success: '[data-test-id="success-indicator"]',
    error: '[data-test-id="error-indicator"]',
    optional: '[data-test-id="optional-indicator"]',
  };
  let spectator: Spectator<StatusIndicatorComponent>;
  const createComponent = createComponentFactory(StatusIndicatorComponent);

  describe('The Defaults (no inputs set)', () => {
    beforeEach(() => (spectator = createComponent()));

    it('displays success', () => {
      // const indicator = spectator.query(selectors.success);

      expect(selectors.success).toExist();
      expect(selectors.success).toHaveClass('badge bg-success rounded-pill');
    });

    it('should not show the other indicators', () => {
      expect(selectors.optional).not.toExist();
      expect(selectors.error).not.toExist();
    });

    it('shows the default title', () => {
      const attr = spectator?.query(selectors.success)?.getAttribute("title");
      expect(attr).toBe("success");
    });
  });

  describe('Error State', () => {
    beforeEach(() => spectator = createComponent({
      props: {
        status: 'error'
      }
    }));

    it('displays error', () => {

      expect(selectors.error).toExist();
      expect(selectors.optional).not.toExist();
      expect(selectors.success).not.toExist();

      const attr = spectator?.query(selectors.error)?.getAttribute("title");
      expect(attr).toBe("error");
    })
    it('does not update the status text automatically', () => {
      spectator.setInput('status', 'optional');
      const attr = spectator?.query(selectors.optional)?.getAttribute("title");
      expect(attr).toBe("error");

    });
  })
});
