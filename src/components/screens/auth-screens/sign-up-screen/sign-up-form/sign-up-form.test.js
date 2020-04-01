/* global React */
import ShallowRenderer from 'react-test-renderer/shallow';
import { createMemoryHistory } from 'history';
import { SignUpFormComponent } from './sign-up-form';

describe('<SignUpFormComponent />', () => {
  const renderer = new ShallowRenderer();
  const history = createMemoryHistory({ keyLength: 0 });

  it('should render correctly', () => {
    renderer.render(<SignUpFormComponent history={history} />);
    const component = renderer.getRenderOutput();
    expect(component).toMatchSnapshot();
  });
});
