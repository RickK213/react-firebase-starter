/* global React, create, shallow */
import { INITIAL_STATE, SignInFormComponent } from './sign-in-form';
import { ROUTES } from '../../../../../constants/routes';

describe('<SignInFormComponent />', () => {
  it('should render correctly', () => {
    const component = create(<SignInFormComponent />).toJSON();
    expect(component).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should return undefined if event is not set', () => {
      const component = shallow(<SignInFormComponent />);
      const results = component.instance().handleOnChange();
      expect(results).toEqual(undefined);
    });

    it('should call this.setState with the correct arguments if event is set', () => {
      const event = { target: { name: 'testName', value: 'testValue' } };
      const setState = jest.fn();
      const component = shallow(<SignInFormComponent />);
      component.instance().setState = setState;
      component.instance().handleOnChange(event);
      expect(setState).toHaveBeenCalledWith({
        [event.target.name]: event.target.value
      });
    });
  });

  describe('handleOnSubmit', () => {
    it('should call this.setState, history.push, and event.preventDefault() if firebase call succeeds', async () => {
      const push = jest.fn();
      const history = { push };
      const doSignInWithEmailAndPassword = jest
        .fn()
        .mockResolvedValue('default');
      const firebase = { doSignInWithEmailAndPassword };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(
        <SignInFormComponent firebase={firebase} history={history} />
      );
      component.instance().setState = setState;
      await component.instance().handleOnSubmit(event);
      expect(setState).toHaveBeenCalledWith({ ...INITIAL_STATE });
      expect(push).toHaveBeenCalledWith(ROUTES.HOME.path);
      expect(preventDefault).toHaveBeenCalled();
    });

    it('should call this.setState with the correct arguments and event.preventDefault() if firebase call fails', async () => {
      const testError = 'testError';
      const doSignInWithEmailAndPassword = jest
        .fn()
        .mockRejectedValue(testError);
      const firebase = { doSignInWithEmailAndPassword };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(<SignInFormComponent firebase={firebase} />);
      component.instance().setState = setState;
      try {
        await component.instance().handleOnSubmit(event);
      } catch (error) {
        expect(setState).toHaveBeenCalledWith({
          ...INITIAL_STATE,
          error: testError
        });
      }
      expect(preventDefault).toHaveBeenCalled();
    });
  });
});
