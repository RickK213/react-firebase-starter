/* global React, create, shallow */
import {
  INITIAL_STATE,
  PasswordChangeFormComponent
} from './password-change-form';

describe('<PasswordChangeFormComponent />', () => {
  it('should render correctly', () => {
    const component = create(<PasswordChangeFormComponent />).toJSON();
    expect(component).toMatchSnapshot();
  });

  describe('handleOnChange', () => {
    it('should return undefined if event is not set', () => {
      const component = shallow(<PasswordChangeFormComponent />);
      const results = component.instance().handleOnChange();
      expect(results).toEqual(undefined);
    });

    it('should call this.setState with the correct arguments if event is set', () => {
      const event = { target: { name: 'testName', value: 'testValue' } };
      const setState = jest.fn();
      const component = shallow(<PasswordChangeFormComponent />);
      component.instance().setState = setState;
      component.instance().handleOnChange(event);
      expect(setState).toHaveBeenCalledWith({
        [event.target.name]: event.target.value
      });
    });
  });

  describe('handleOnSubmit', () => {
    it('should call this.setState with the correct arguments and event.preventDefault() if firebase call succeeds', async () => {
      const doPasswordUpdate = jest.fn().mockResolvedValue('default');
      const firebase = { doPasswordUpdate };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(
        <PasswordChangeFormComponent firebase={firebase} />
      );
      component.instance().setState = setState;
      await component.instance().handleOnSubmit(event);
      expect(setState).toHaveBeenCalledWith({ ...INITIAL_STATE });
      expect(preventDefault).toHaveBeenCalled();
    });

    it('should call this.setState with the correct arguments and event.preventDefault() if firebase call fails', async () => {
      const testError = 'testError';
      const doPasswordUpdate = jest.fn().mockRejectedValue(testError);
      const firebase = { doPasswordUpdate };
      const setState = jest.fn();
      const preventDefault = jest.fn();
      const event = { preventDefault };
      const component = shallow(
        <PasswordChangeFormComponent firebase={firebase} />
      );
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
