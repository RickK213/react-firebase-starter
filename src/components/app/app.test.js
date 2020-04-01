/* global React, create */
import { App } from './app';

describe('<App />', () => {
  it('should render correctly', () => {
    const component = create(<App>test children</App>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
