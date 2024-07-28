import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import DriverTableHead from './UserTableHead';
import { setRequestLoader } from 'app/auth/store/loadersSlice';
import { setDriverPagination, setReqRadio } from 'app/auth/store/commonData';
import Button from '@mui/material/Button';
import history from '@history';
import { DateTimeFormat, DefFilters, Permissions } from 'app/auth/store/constants';
import moment from 'moment';
import { changeItemPagination, changeLogsPagination, changeUsersPagination } from 'app/auth/store/sharedData';
import RegisterTableHead from './RegisterTableHead';
import AlertDialog from 'app/fuse-layouts/shared-components/AlertDialog';
import { Icon, IconButton } from '@mui/material';
import { checkPermission } from 'app/auth/store/loginSlice';

const msg = "USERDELMSG";
const headmsg = "ITEMDELHEAD";

function UserTable(props) {
  const dispatch = useDispatch();
  const loader = useSelector(({ auth }) => auth.loaders.usersListLoader);
  const data = useSelector(({ auth }) => auth.shared.usersData ? auth.shared.usersData : []);
  const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
  const totalCount = useSelector(({ auth }) => auth.shared.usersTotalCount ? auth.shared.usersTotalCount : 0);
  const userStatus = useSelector(({ auth }) => auth.shared.userStatus);
  const usersPagination = useSelector(({ auth }) => auth.shared.usersPagination);

  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [detData, setDelData] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // setTimeout(() => {
      //   dispatch(setRequestLoader(false));
      // }, 2000);
    }
  }, []);

  function handleChangePage(event, value) {
    const body = {
      pageNo: value + 1,
      pageSize: rowsPerPage
    }
    dispatch(changeUsersPagination(body));
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    const body = {
      changwwe: true,
      pageNo: usersPagination.pageNo,
      pageSize: usersPagination.pageSize
    }
    dispatch(changeUsersPagination(body));
    setRowsPerPage(event.target.value);
  }

  const handleClickOpen = (n) => {
    if (!open) {
      setDelData(n);
    } else {
      setDelData({});
    }
    setOpen(!open);
  };

  return loader ? <FuseLoading /> : (
    <div className="w-full flex flex-col">
      <AlertDialog
        open={open}
        setOpen={handleClickOpen}
        headMsg={headmsg}
        bodyMsg={msg}
        type={userStatus == "0" ? "user" : "register"}
        data={detData}
      />
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          {userStatus == "0" ?
            <>
              <DriverTableHead />
              <TableBody>
                {data && data.length > 0 && data.map((n, key) => {
                  return (
                    <TableRow
                      className="h-72 cursor-pointer"
                      hover
                      // tabIndex={-1}
                      key={key}
                    >
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {n.userid ? n.userid : ""}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        <strong
                          style={{ cursor: 'pointer', color: 'linear-gradient(to right, #194a4f 0%, #24585d 100%)', textDecoration: 'underline' }}
                        >
                          {n.name ? n.name : ""}
                        </strong>
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {n.department ? n.department : ""}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {n.collegeid ? n.collegeid : ""}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {n.createdAt ? moment(n.createdAt).format(DateTimeFormat) : "--"}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {n.updatedAt ? moment(n.updatedAt).format(DateTimeFormat) : "--"}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {dispatch(checkPermission(Permissions.DELETEUSER)) && dispatch(checkPermission(Permissions.DELETEUSER)) == "allowed"
                          && (
                            <IconButton onClick={() => handleClickOpen(n)} color="inherit">
                              <Icon color="inherit">
                                delete
                              </Icon>
                            </IconButton>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
            :
            <>
              <RegisterTableHead />
              <TableBody>
                {data && data.length > 0 && data.map((n, key) => {
                  return (
                    <TableRow
                      className="h-72 cursor-pointer"
                      hover
                      // tabIndex={-1}
                      key={key}
                    >
                      <TableCell className="p-4 md:p-16" component="th" scope="row" style={{ paddingLeft: 22 }}>
                        <strong
                          style={{ cursor: 'pointer', color: 'linear-gradient(to right, #194a4f 0%, #24585d 100%)', textDecoration: 'underline' }}
                        >
                          {n.name ? n.name : ""}
                        </strong>
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {n.email ? n.email : ""}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {n.role ? n.role : ""}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                        {dispatch(checkPermission(Permissions.DELETEREGISTER)) && dispatch(checkPermission(Permissions.DELETEREGISTER)) == "allowed"
                          && (
                            <IconButton disabled={n.role && n.role == 'superadmin'} onClick={() => handleClickOpen(n)} color="inherit">
                              <Icon color="inherit">
                                delete
                              </Icon>
                            </IconButton>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          }
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(UserTable);
