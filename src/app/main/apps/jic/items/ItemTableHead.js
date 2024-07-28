import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import i18next from 'i18next';

const rows = [
  {
    id: 'driver',
    align: 'left',
    disablePadding: false,
    label: 'NAME',
    sort: false,
  },
  {
    id: 'vehisscle',
    align: 'center',
    disablePadding: false,
    label: 'OSTORENBR',
    sort: false,
  },
  {
    id: 'vehicle',
    align: 'center',
    disablePadding: false,
    label: 'CSTORENBR',
    sort: false,
  },
  {
    id: 'emirates',
    align: 'left',
    disablePadding: false,
    label: 'STATUS',
    sort: false,
  },
  {
    id: 'cats',
    align: 'left',
    disablePadding: false,
    label: 'RENTEE',
    sort: false,
  },
  {
    id: 'cassts',
    align: 'center',
    disablePadding: false,
    label: 'SERNOCAP',
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

function DriverTableHead(props) {
  const dispatch = useDispatch();

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row, o) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={o}
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

export default DriverTableHead;
