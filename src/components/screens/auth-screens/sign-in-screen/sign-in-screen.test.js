/* global React, create */
import { StaticRouter } from 'react-router-dom';
import { SignInScreen } from './sign-in-screen';

describe('<SignInScreen />', () => {
  it('should render correctly', () => {
    const component = create(
      <StaticRouter context={{}}>
        <SignInScreen />
      </StaticRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
