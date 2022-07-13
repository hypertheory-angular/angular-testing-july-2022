import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { StatusIndicatorComponent } from './status-indicator.component';

export default {
  title: 'StatusIndicator',
  component: StatusIndicatorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    status: {
      options: ['success', 'error', 'optional'],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<StatusIndicatorComponent>;

const Template: Story<StatusIndicatorComponent> = (
  args: StatusIndicatorComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  status: 'success',
  statusText: '',
};

export const Success = Template.bind({});
Success.args = {
  status: 'success',
  statusText: 'That Worked Real Good!',
};

export const Error = Template.bind({});
Error.args = {
  status: 'error',
  statusText: 'Blammo',
};

export const Optional = Template.bind({});
Optional.args = {
  status: 'optional',
  statusText: 'Meh',
};
