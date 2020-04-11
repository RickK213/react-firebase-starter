/* global React, create */
import { App } from './app';

// TODO: Learn how to test Firebase
describe.skip('<App />', () => {
  it('should render correctly', () => {
    const component = create(<App>test children</App>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
