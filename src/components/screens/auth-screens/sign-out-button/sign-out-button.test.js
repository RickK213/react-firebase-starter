/* global React, create, shallow */
import { SignOutButtonComponent } from './sign-out-button';
import { ROUTES } from '../../../../constants/routes';

describe('<SignOutButtonComponent />', () => {
  it('should render correctly', () => {
    const component = create(<SignOutButtonComponent />).toJSON();
    expect(component).toMatchSnapshot();
  });

  describe('this.handleOnSignOutClick', () => {
    it('should call history.push if firebase call succeeds', async () => {
      const push = jest.fn();
      const history = { push };
      const doSignOut = jest.fn().mockResolvedValue('default');
      const firebase = { doSignOut };
      const component = shallow(
        <SignOutButtonComponent firebase={firebase} history={history} />
      );
      await component.instance().handleOnSignOutClick();
      expect(push).toHaveBeenCalledWith(ROUTES.SIGN_IN.path);
    });
  });
});
