import * as React from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setProductsSearchText } from '../store/productsSlice';
import i18next from 'i18next';
import ds from 'app/services/DataService';
import { setProductsLoader, setUsersListLoader } from 'app/auth/store/loadersSlice';
import { setProductsData, setProductsTotalCount } from 'app/auth/store/commonData';
import { getUsers } from 'app/auth/store/commonServices';
import { isEmptyObject } from 'app/auth/store/commonMethods';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { changeItemStatus, changeStoreNbr, changeUsersPagination, changeUserStatus } from 'app/auth/store/sharedData';
import { Permissions } from 'app/auth/store/constants';
import { checkPermission } from 'app/auth/store/loginSlice';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function UserHeader(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const usersPagination = useSelector(({ auth }) => auth.shared.usersPagination);
  const itemStatus = useSelector(({ auth }) => auth.shared.itemStatus);
  const storeNbr = useSelector(({ auth }) => auth.shared.storeNbr);
  const itemRentee = useSelector(({ auth }) => auth.shared.itemRentee);
  const itemName = useSelector(({ auth }) => auth.shared.itemName);
  const itemID = useSelector(({ auth }) => auth.shared.itemID);
  const userStatus = useSelector(({ auth }) => auth.shared.userStatus);

  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

  const [valueFrom, setValueFrom] = React.useState(moment().subtract(6, 'months'));
  const [valueTo, setValueTo] = React.useState(moment());
  const [getSearchRentee, setSearchRentee] = React.useState("");
  const [getSearchID, setSearchID] = React.useState("");
  const [getSearchName, setSearchName] = React.useState("");
  const [renteeID, setRenteeID] = React.useState("");
  const [getUserID, setUserID] = React.useState("");

  // React.useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     callGo();
  //   }

  //   return () => mounted = false;
  // }, []);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (usersPagination && !isEmptyObject(usersPagination) && usersPagination.pageNo && usersPagination.pageSize) {
        callGo();
      }
    }

    return () => mounted = false;
  }, [usersPagination]);

  function callGo() {
    dispatch(setUsersListLoader(true));
    // const status = itemStatus && itemStatus != '0' ? `&status=${itemStatus}` : "";
    const renteeid = renteeID && renteeID != '' ? `&rentee_id=${renteeID}` : "";
    const userid = getUserID && getUserID != '' ? `&userid=${getUserID}` : "";
    // const store = storeNbr && storeNbr != '0' ? `&present_storenumber=${storeNbr}` : "";
    const rentee = getSearchRentee && getSearchRentee != '' ? `&rentee=${getSearchRentee}` : "";
    const itemid = getSearchID && getSearchID != '' ? `&itemid=${getSearchID}` : "";
    const itemName = getSearchName && getSearchName != '' ? `&name=${getSearchName}` : "";
    const body = `?pageNo=${usersPagination.pageNo}&count=${usersPagination.pageSize}${renteeid + rentee + itemid + itemName + userid}`;
    dispatch(getUsers(body, userStatus == "1"));
  }

  const handleChangeFrom = (newValue) => {
    setValueFrom(newValue);
  };
  const handleChangeTo = (newValue) => {
    setValueTo(newValue);
  };

  function changeStatusUser(event) {
    dispatch(changeUsersPagination({
      changeCame: true,
      pageNo: 1,
      pageSize: 10,
    }));
    dispatch(changeUserStatus(event.target.value));
  }

  return (
    mdDown ? <FuseScrollbars className="">
      <motion.div variants={item} className="widget flex w-full">
        <div className="w-full flex flex-col justify-between">
          <div className="">
            <Icon
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className="text-15 md:text-18"
            >
              people
            </Icon>
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="text-12 md:text-24 mx-2 font-semibold"
            >
              {i18next.t(`navigation:${userStatus == "0" ? "RENTUSERS" : "REGUSERS"}`)}
            </Typography>
          </div>
          <div className="flex flex-col justify-between px-64 mt-8">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Box className="mx-4 mt-8">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {i18next.t(`navigation:SELUSERS`)}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userStatus}
                    label={i18next.t(`navigation:SELUSERS`)}
                    onChange={changeStatusUser}
                    size="small"
                  >
                    <MenuItem autoFocus={false} value="0">{i18next.t(`navigation:RENTUSERS`)}</MenuItem>
                    {dispatch(checkPermission(Permissions.SEEREGISTERUSERS)) && dispatch(checkPermission(Permissions.SEEREGISTERUSERS)) == "allowed"
                      && (
                        <MenuItem autoFocus={false} value="1">{i18next.t(`navigation:REGUSERS`)}</MenuItem>
                      )}
                  </Select>
                </FormControl>
              </Box>
            </motion.div>
          </div>
          <div className="flex px-64 mt-8">
            <ThemeProvider theme={mainTheme}>
              <Tooltip
                title={i18next.t(`navigation:PRESSENTER`)}
                placement={'top'}
              >
                <Paper
                  component={motion.div}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                  className="flex items-center w-full max-w-224 px-8 py-4 rounded-16 shadow"
                >
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search Rentee ID"
                    className="flex flex-1 mx-8"
                    disableUnderline
                    fullWidth
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key == 'Enter') {
                        callGo();
                      }
                    }}
                    value={getSearchName}
                    inputProps={{
                      'aria-label': 'Search',
                    }}
                    size='small'
                  />
                </Paper>
              </Tooltip>
            </ThemeProvider>
          </div>
          {userStatus == "0" && (
            <div className="flex px-64 mt-8">
              <ThemeProvider theme={mainTheme}>
                <Tooltip
                  title={i18next.t(`navigation:PRESSENTER`)}
                  placement={'top'}
                >
                  <Paper
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex items-center w-full max-w-224 px-8 py-4 rounded-16 shadow"
                  >
                    <Icon color="action">search</Icon>
                    <Input
                      placeholder="Search Rentee ID"
                      className="flex flex-1 mx-8"
                      disableUnderline
                      fullWidth
                      onChange={(e) => setUserID(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                          callGo();
                        }
                      }}
                      value={getUserID}
                      inputProps={{
                        'aria-label': 'Search',
                      }}
                      size='small'
                    />
                  </Paper>
                </Tooltip>
              </ThemeProvider>
            </div>
          )}
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
              <Button
                className="whitespace-nowrap"
                variant="contained"
                color="secondary"
                size='small'
                onClick={callGo}
              >
                {i18next.t(`navigation:GO`)}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </FuseScrollbars>

      :






      <div className="flex flex-1 w-full items-center justify-between">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center">
            <Icon
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className="text-54 md:text-72"
            >
              people
            </Icon>
            <div className="flex flex-col items-center sm:items-start mb-16 sm:mb-0">
              <Typography
                component={motion.span}
                initial={{ x: -20 }}
                animate={{ x: 0, transition: { delay: 0.2 } }}
                delay={300}
                className="text-16 md:text-24 mx-12 font-semibold"
              >
                {i18next.t(`navigation:${userStatus == "0" ? "RENTUSERS" : "REGUSERS"}`)}
              </Typography>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-1 items-center justify-center px-12">
          <div className={`flex flex-col min-w-${userStatus == "0" ? "xs" : "xs"} mx-8 sm:mc-16`}>
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Box className="mx-4 mt-8">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {i18next.t(`navigation:SELUSERS`)}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userStatus}
                    label={i18next.t(`navigation:SELUSERS`)}
                    onChange={changeStatusUser}
                    size="small"
                  >
                    <MenuItem autoFocus={false} value="0">{i18next.t(`navigation:RENTUSERS`)}</MenuItem>
                    {dispatch(checkPermission(Permissions.SEEREGISTERUSERS)) && dispatch(checkPermission(Permissions.SEEREGISTERUSERS)) == "allowed"
                      && (
                        <MenuItem autoFocus={false} value="1">{i18next.t(`navigation:REGUSERS`)}</MenuItem>
                      )}
                  </Select>
                </FormControl>
              </Box>
            </motion.div>
          </div>
          <ThemeProvider theme={mainTheme}>
            <Tooltip
              title={i18next.t(`navigation:PRESSENTER`)}
              placement={'top'}
            >
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className={`flex items-center w-full max-w-${userStatus == "0" ? "224" : "md"} px-8 py-4 rounded-16 shadow mx-8 mt-5`}
              >
                <Icon color="action">search</Icon>
                <Input
                  placeholder="Search by Name"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  fullWidth
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key == 'Enter') {
                      callGo();
                    }
                  }}
                  value={getSearchName}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  size='small'
                />
              </Paper>
            </Tooltip>
          </ThemeProvider>
          {userStatus == "0" && (
            <ThemeProvider theme={mainTheme}>
              <Tooltip
                title={i18next.t(`navigation:PRESSENTER`)}
                placement={'top'}
              >
                <Paper
                  component={motion.div}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                  className={`flex items-center w-full max-w-224 px-8 py-4 rounded-16 shadow mx-8 mt-5`}
                >
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search by ID"
                    className="flex flex-1 mx-8"
                    disableUnderline
                    fullWidth
                    onChange={(e) => setUserID(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key == 'Enter') {
                        callGo();
                      }
                    }}
                    value={getUserID}
                    inputProps={{
                      'aria-label': 'Search',
                    }}
                    size='small'
                  />
                </Paper>
              </Tooltip>
            </ThemeProvider>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
            size='large'
            onClick={callGo}
          >
            {i18next.t(`navigation:GO`)}
          </Button>
        </motion.div>
      </div>);
}

export default UserHeader;
