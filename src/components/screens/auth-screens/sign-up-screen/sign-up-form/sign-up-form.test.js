/* global React, shallow */
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

  describe('this.handleOnChange', () => {
    it('should return undefined if event is not set', () => {
      const component = shallow(<SignUpFormComponent />);
      const result = component.instance().handleOnChange();
      expect(result).toEqual(undefined);
    });

    it('should call this.setState with the correct arguments if event is set', () => {
      const event = {
        target: { name: 'testName', value: 'testValue' }
      };
      const setState = jest.fn();
      const component = shallow(<SignUpFormComponent />);
      component.instance().setState = setState;
      component.instance().handleOnChange(event);
      expect(setState).toHaveBeenCalledWith({ testName: 'testValue' });
    });
  });
});
