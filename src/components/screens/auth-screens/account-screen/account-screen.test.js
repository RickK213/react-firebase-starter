/* global React, create */
import { StaticRouter } from 'react-router-dom';
import { AccountScreen } from './account-screen';

// TODO: Learn how to test Firebase. Getting 'Cannot read property 'auth' of null' error
describe.skip('<AccountScreen />', () => {
  it('should render correctly', () => {
    const component = create(
      <StaticRouter context={{}}>
        <AccountScreen />
      </StaticRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
