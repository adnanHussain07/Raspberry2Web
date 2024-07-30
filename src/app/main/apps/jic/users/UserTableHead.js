import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useDispatch } from 'react-redux'
import TableHead from '@mui/material/TableHead'
import i18next from 'i18next'

const rows = [
  {
    id: 'driver',
    align: 'left',
    disablePadding: false,
    label: 'DNAME',
    sort: false
  },
  {
    id: 'drivrrrer',
    align: 'left',
    disablePadding: false,
    label: 'EMAIL',
    sort: false
  },
  {
    id: 'vehicle',
    align: 'left',
    disablePadding: false,
    label: 'ROLE',
    sort: false
  },
  {
    id: 'vehasdicle',
    align: 'left',
    disablePadding: false,
    label: 'COMPANY',
    sort: false
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'ACTION',
    sort: false
  }
]

function UserTableHead (props) {
  const dispatch = useDispatch()

  return (
    <TableHead>
      <TableRow className='h-48 sm:h-64'>
        {rows.map(row => {
          return (
            <TableCell
              className='p-4 md:p-16'
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              style={{ paddingLeft: row.id == 'driver' ? 22 : '' }}
              // sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {i18next.t(`navigation:${row.label}`)}
            </TableCell>
          )
        }, this)}
      </TableRow>
    </TableHead>
  )
}

export default UserTableHead
