import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { handleResponse } from 'app/auth/store/commonMethods';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, deleteRegister, deleteUser } from 'app/auth/store/commonServices';
import i18next from 'i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const dispatch = useDispatch();
  const { open, setOpen, headMsg, bodyMsg, type, data } = props;
  // const [open, setOpen] = React.useState(false);
  const userData = useSelector(({ auth }) => auth.shared.usersData ? auth.shared.usersData : []);
  const itemData = useSelector(({ auth }) => auth.common.driversData ? auth.common.driversData : []);
  const usersPagination = useSelector(({ auth }) => auth.shared.usersPagination);
  const itemPagination = useSelector(({ auth }) => auth.shared.itemPagination);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen();
  };

  function onAgree() {
    if (type && data) {
      if (type == "item") {
        const body = `${data._id}`;
        dispatch(deleteItem(body, itemData, itemPagination));
      }
      else if (type == "user") {
        const body = `${data._id}`;
        dispatch(deleteUser(body, userData, usersPagination));
      }
      else if (type == "register") {
        const body = `${data._id}`;
        dispatch(deleteRegister(body, userData, usersPagination));
      }
    }
    else {
      dispatch(handleResponse());
    }
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{i18next.t(`navigation:${headMsg}`)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {i18next.t(`navigation:${bodyMsg}`)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={onAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}