import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { create } from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.create = create;
global.shallow = shallow;
