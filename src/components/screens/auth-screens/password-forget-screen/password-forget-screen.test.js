/* global React, create */
import { StaticRouter } from 'react-router-dom';
import { PasswordForgetScreen } from './password-forget-screen';

describe('<PasswordForgetScreen />', () => {
  it('should render correctly', () => {
    const component = create(
      <StaticRouter context={{}}>
        <PasswordForgetScreen />
      </StaticRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
