import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
import reducer from '../store';
import LogHeader from './UserHeader';
import LogTable from './UserTable';
import FuseLoading from '@fuse/core/FuseLoading';
import Error401 from '../../../../fuse-layouts/shared-components/Error401';
import { Menus } from '../../../../auth/store/constants';
import { useDispatch, useSelector } from 'react-redux';
import { checkAccess } from '../../../../auth/store/loginSlice';
import * as React from 'react';

function Users() {
  const dispatch = useDispatch();
  const role = useSelector(({ auth }) => auth.user.roleid ? auth.user.roleid : 0);
  const userStatus = useSelector(({ auth }) => auth.shared.userStatus);
  const [allowed, setAllowed] = React.useState(false);
  const [checkLoader, setCheckLoader] = React.useState(true);

  const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
      minHeight: 72,
      height: 72,
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        minHeight: 136,
        height: 136,
      },
      [theme.breakpoints.down('lg')]: {
        minHeight: userStatus == "0" ? 200 : 160,
        height: 222,
      },
    },
    '& .FusePageCarded-content': {
      display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
      overflow: 'hidden',
    },
  }));

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      const check = dispatch(checkAccess(Menus.USERS));
      if (check && check != '') {
        setCheckLoader(false);
        if (check == 'allowed') {
          setAllowed(true);
        }
      }
    }

    return () => mounted = false;
  }, [role]);

  return checkLoader ? <FuseLoading /> :
    allowed ? <Root header={<LogHeader />} content={<LogTable />} innerScroll /> :
      <Error401 />;
}

export default withReducer('eCommerceApp', reducer)(Users);
