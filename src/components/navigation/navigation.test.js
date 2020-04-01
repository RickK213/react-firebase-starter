/* global React */
import ShallowRenderer from 'react-test-renderer/shallow';
import { createMemoryHistory } from 'history';
import { Navigation } from './navigation';

describe('<Navigation />', () => {
  const renderer = new ShallowRenderer();
  const history = createMemoryHistory({ keyLength: 0 });

  it('should render correctly', () => {
    renderer.render(<Navigation history={history} />);
    const component = renderer.getRenderOutput();
    expect(component).toMatchSnapshot();
  });
});
