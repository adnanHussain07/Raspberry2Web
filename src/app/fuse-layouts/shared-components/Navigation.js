import * as React from 'react'
import FuseNavigation from '@fuse/core/FuseNavigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import { navbarCloseMobile } from '../../store/fuse/navbarSlice';
import { assignTiesto } from 'app/auth/store/loginSlice';
import { isEmptyObject } from 'app/auth/store/commonMethods';
import { useTheme } from '@mui/material/styles';
import { setShowChangePass } from 'app/auth/store/commonData';
import { Menus } from 'app/auth/store/constants';
import { changeshowAddItem, changeshowAddRegister, changeshowAddModule } from 'app/auth/store/sharedData';

function Navigation(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useSelector(selectNavigation);
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const role = useSelector(({ auth }) => auth.user.roleid ? auth.user.roleid : 0);

  const [getMenus, setMenus] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      const shortss = dispatch(assignTiesto(navigation));
      if (shortss && !isEmptyObject(shortss) &&
        shortss.navigation && shortss.navigation.length > 0) {
        setMenus(shortss.navigation);
      } else {
        setMenus([]);
      }
    }

    return () => mounted = false;
  }, [role]);

  function handleItemClick(item) {
    if (item && item.id == Menus.REGISTERUSER) dispatch(changeshowAddRegister(true));
    else if (item && item.id == Menus.CREATEITEM) dispatch(changeshowAddItem(true));
    else if (item && item.id == Menus.CREATMODULE) dispatch(changeshowAddModule(true));
    if (mdDown) {
      dispatch(navbarCloseMobile());
    }
  }

  return (
    <FuseNavigation
      className={clsx('navigation', props.className)}
      navigation={getMenus}
      layout={props.layout}
      dense={props.dense}
      active={props.active}
      onItemClick={handleItemClick}
    />
  );
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default memo(Navigation);
