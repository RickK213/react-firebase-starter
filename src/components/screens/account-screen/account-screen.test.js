/* global React, create */
import { AccountScreen } from './account-screen';

describe('<AccountScreen />', () => {
  it('should render correctly', () => {
    const component = create(<AccountScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
