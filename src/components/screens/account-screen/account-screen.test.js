/* global React, create */
import { AccountScreen } from './account-screen';

// TODO: Fix this test. Need a <Router />
describe.skip('<AccountScreen />', () => {
  it('should render correctly', () => {
    const component = create(<AccountScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
