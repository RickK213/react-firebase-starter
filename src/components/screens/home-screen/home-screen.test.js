/* global React, create */
import { HomeScreen } from './home-screen';

describe.skip('<HomeScreen />', () => {
  it('should render correctly', () => {
    const component = create(<HomeScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
