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
import DriverTableHead from './LogTableHead';
import { setRequestLoader } from 'app/auth/store/loadersSlice';
import { setDriverPagination, setReqRadio } from 'app/auth/store/commonData';
import Button from '@mui/material/Button';
import history from '@history';
import { DateTimeFormat, DefFilters } from 'app/auth/store/constants';
import moment from 'moment';
import { changeItemPagination, changeLogsPagination } from 'app/auth/store/sharedData';
import { getStoreName } from 'app/auth/store/commonMethods';

function LogTable(props) {
  const dispatch = useDispatch();
  const loader = useSelector(({ auth }) => auth.loaders.logsLoader);
  const data = useSelector(({ auth }) => auth.shared.logsData ? auth.shared.logsData : []);
  const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
  const totalCount = useSelector(({ auth }) => auth.shared.logsTotalCount ? auth.shared.logsTotalCount : 0);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
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
    dispatch(changeLogsPagination(body));
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    const body = {
      pageNo: page + 1,
      pageSize: event.target.value
    }
    dispatch(changeLogsPagination(body));
    setRowsPerPage(event.target.value);
  }

  return loader ? <FuseLoading /> : (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
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
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    <strong
                      style={{ cursor: 'pointer', color: 'linear-gradient(to right, #194a4f 0%, #24585d 100%)', textDecoration: 'underline' }}
                    >
                      {n.name ? n.name : ""}
                    </strong>
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                  {n.present_storenumber ? getStoreName(n.present_storenumber) : ""}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.rentee ? n.rentee : ""}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                    {n.serialNo ? n.serialNo : ""}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                    {n.rented_at ? moment(n.rented_at).format(DateTimeFormat) : "--"}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row" align='center'>
                    {n.return_at ? moment(n.return_at).format(DateTimeFormat) : "--"}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.comment ? n.comment : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
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

export default withRouter(LogTable);
