/* global React, create, shallow */
import { ROUTES } from '../../../../../constants/routes';
import { INITIAL_STATE, SignUpFormComponent } from './sign-up-form';

describe('<SignUpFormComponent />', () => {
  it('should render correctly', () => {
    const component = create(<SignUpFormComponent />).toJSON();
    expect(component).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should return undefined if event is not set', () => {
      const component = shallow(<SignUpFormComponent />);
      const results = component.instance().handleOnChange();
      expect(results).toEqual(undefined);
    });

    it('should call this.setState with the correct arguments if event is set', () => {
      const event = { target: { name: 'testName', value: 'testValue' } };
      const setState = jest.fn();
      const component = shallow(<SignUpFormComponent />);
      component.instance().setState = setState;
      component.instance().handleOnChange(event);
      expect(setState).toHaveBeenCalledWith({
        [event.target.name]: event.target.value
      });
    });
  });

  // TODO: Research testing firebase
  describe.skip('handleOnSubmit', () => {
    it('should call this.setState, history.push, and event.preventDefault() if firebase call succeeds', async () => {
      const push = jest.fn();
      const history = { push };
      const doCreateUserWithEmailAndPassword = jest
        .fn()
        .mockResolvedValue('default');
      const firebase = { doCreateUserWithEmailAndPassword };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(
        <SignUpFormComponent firebase={firebase} history={history} />
      );
      component.instance().setState = setState;
      await component.instance().handleOnSubmit(event);
      expect(setState).toHaveBeenCalledWith({ ...INITIAL_STATE });
      expect(push).toHaveBeenCalledWith(ROUTES.ACCOUNT.path);
      expect(preventDefault).toHaveBeenCalled();
    });

    it('should call this.setState with the correct arguments and event.preventDefault() if firebase call fails', async () => {
      const testError = 'testError';
      const doCreateUserWithEmailAndPassword = jest
        .fn()
        .mockRejectedValue(testError);
      const firebase = {
        doCreateUserWithEmailAndPassword
      };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(<SignUpFormComponent firebase={firebase} />);
      component.instance().setState = setState;
      try {
        await component.instance().handleOnSubmit(event);
      } catch (error) {
        expect(setState).toHaveBeenCalledWith({
          error: testError
        });
      }
      expect(preventDefault).toHaveBeenCalled();
    });
  });
});
