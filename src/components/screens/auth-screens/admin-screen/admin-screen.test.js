/* global React, create */
import { AdminScreen } from './admin-screen';

// TODO: Research testing firebase
describe.skip('<AdminScreen />', () => {
  it('should render correctly', () => {
    const component = create(<AdminScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
