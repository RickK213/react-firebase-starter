/* global React, create */
import { StaticRouter } from 'react-router-dom';
import { AccountScreen } from './account-screen';

describe('<AccountScreen />', () => {
  it('should render correctly', () => {
    const component = create(
      <StaticRouter context={{}}>
        <AccountScreen />
      </StaticRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
