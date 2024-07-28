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
    id: 'vehicle',
    align: 'center',
    disablePadding: false,
    label: 'CSTORENBR',
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
    id: 'weigssht',
    align: 'center',
    disablePadding: false,
    label: 'RENTEDAT',
    sort: false,
  },
  {
    id: 'weight',
    align: 'center',
    disablePadding: false,
    label: 'RETURNAT',
    sort: false,
  },
  {
    id: 'csseats',
    align: 'left',
    disablePadding: false,
    label: 'COMMENT',
    sort: false,
  },
];

function LogTableHead(props) {
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

export default LogTableHead;
