/* global React */
import ShallowRenderer from 'react-test-renderer/shallow';
import { createMemoryHistory } from 'history';
import { SignUpScreen } from './sign-up-screen';

describe('<SignUpScreen />', () => {
  const renderer = new ShallowRenderer();
  const history = createMemoryHistory({ keyLength: 0 });

  it('should render correctly', () => {
    renderer.render(<SignUpScreen history={history} />);
    const component = renderer.getRenderOutput();
    expect(component).toMatchSnapshot();
  });
});
