import { connect } from 'react-redux';
import { Navigation } from './navigation';
import { selectAuthUser } from '../../store/auth-user/auth-user';

const mapStateToProps = state => ({
  authUser: selectAuthUser(state)
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
