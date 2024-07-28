import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import i18next from 'i18next';

const rows = [
  {
    id: 'driver',
    align: 'center',
    disablePadding: false,
    label: 'DUSERID',
    sort: false,
  },
  {
    id: 'vehicle',
    align: 'left',
    disablePadding: false,
    label: 'DNAME',
    sort: false,
  },
  {
    id: 'cats',
    align: 'left',
    disablePadding: false,
    label: 'DDEPT',
    sort: false,
  },
  {
    id: 'caddts',
    align: 'center',
    disablePadding: false,
    label: 'CLGIDCAP',
    sort: false,
  },
  {
    id: 'weight',
    align: 'center',
    disablePadding: false,
    label: 'CREATEDAT',
    sort: false,
  },
  {
    id: 'nbrOfReq',
    align: 'center',
    disablePadding: false,
    label: 'UPDATEDAT',
    sort: false,
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'ACTION',
    sort: false,
  },
];

function UserTableHead(props) {
  const dispatch = useDispatch();

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              style={{ paddingLeft: row.id == 'driver' ? 22 : '' }}
            // sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {i18next.t(`navigation:${row.label}`)}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UserTableHead;
