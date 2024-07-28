import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slide from '@mui/material/Slide';
import { handleResponse, isEmptyObject } from 'app/auth/store/commonMethods';
import { useDispatch, useSelector } from 'react-redux';
import { editStatusItem } from 'app/auth/store/commonServices';
import CheckBox from '@mui/icons-material/CheckBox';
import { Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material';
import i18next from 'i18next';
import { Row } from 'react-day-picker';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog(props) {
  const dispatch = useDispatch();
  const { open, setOpen, data } = props;
  const itemsData = useSelector(({ auth }) => auth.common.driversData ? auth.common.driversData : []);
  const itemPagination = useSelector(({ auth }) => auth.shared.itemPagination);
  const usersData = useSelector(({ auth }) => auth.shared.usersDataList);
  const loader = useSelector(({ auth }) => auth.loaders.rentUsersListLoader);

  const [rentedCheck, setRentedCheck] = React.useState(false);
  const [maintainCheck, setMaintainCheck] = React.useState(false);
  const [availableCheck, setAvailableCheck] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (data && !isEmptyObject(data)) {
        if (data.status == 'rented') {
          setRentedCheck(true);
          setMaintainCheck(false);
          setAvailableCheck(false);
        }
        else if (data.status == 'available' || data.status == 'not_rented') {
          setAvailableCheck(true);
          setMaintainCheck(false);
          setRentedCheck(false);
        }
        else if (data.status == 'maintenance') {
          setMaintainCheck(true);
          setRentedCheck(false);
          setAvailableCheck(false);
        }
      }
    }
    return () => mounted = false;
  }, [data]);

  const handleClose = () => {
    setSelectedUser("");
    setOpen();
  };

  function onAgree() {
    const type = availableCheck ? 'avail' : rentedCheck ? 'rent' : maintainCheck ? 'maint' : "";

    if (type && data && !isEmptyObject(data)) {
      const body = {
        itemid: data.itemid ? data.itemid : "",
        present_storenumber: data.present_storenumber ? data.present_storenumber : "",
        comment: note,
        userid: (type == 'rent' || type == 'maint') ? selectedUser : data.userid ? data.userid : "",
      };
      dispatch(editStatusItem(body, itemsData, type, itemPagination));
    }
    else {
      dispatch(handleResponse());
    }
    handleClose();
  }

  function onChangeValue(n) {
    if (n == "avail") {
      setAvailableCheck(true);
      setMaintainCheck(false);
      setRentedCheck(false);
    }
    else if (n == "rent") {
      setRentedCheck(true);
      setMaintainCheck(false);
      setAvailableCheck(false);
    }
    else if (n == "maint") {
      setMaintainCheck(true);
      setRentedCheck(false);
      setAvailableCheck(false);
    }
  }

  function onSelectUser(e, ee) {
    setSelectedUser(ee && ee.id ? ee.id : 0);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{i18next.t(`navigation:STATUSCHANGEHEAD`)}</DialogTitle>
        <DialogContent>
          {loader ? (
            <>
              <div style={{ height: '850px', textAlign: 'center', marginTop: '30%' }}>
                <CircularProgress />
              </div>
            </>
          ) : (
            <>
              <TextField
                className='w-full'
                id="filled-multiline-static"
                label={i18next.t(`navigation:STATUSACTCOMMENT`)}
                multiline
                rows={3}
                placeholder={i18next.t(`navigation:ENTERCOMMENT`)}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                variant="filled"
              />
              <FormGroup>
                <FormControlLabel checked={availableCheck} onChange={() => onChangeValue("avail")} control={<Checkbox />} label={i18next.t(`navigation:AVAIL`)} />
                <FormControlLabel checked={rentedCheck} onChange={() => onChangeValue("rent")} control={<Checkbox />} label={i18next.t(`navigation:RENTEDGONE`)} />
                <FormControlLabel checked={maintainCheck} onChange={() => onChangeValue("maint")} control={<Checkbox />} label={i18next.t(`navigation:MENT`)} />
              </FormGroup>
              {(rentedCheck || maintainCheck) && (
                <Autocomplete
                  style={{ width: '100%', marginTop: 8, marginBottom: 14 }}
                  disablePortal
                  id="combo-box-demo"
                  options={usersData}
                  sx={{ width: 300 }}
                  onChange={onSelectUser}
                  renderInput={(params) => <TextField {...params} label={i18next.t(`navigation:RENTEEUSERS`)} />}
                />
              )}
              <DialogContentText id="alert-dialog-slide-description">
                {i18next.t(`navigation:STATUSCHANGEMSG`)}
              </DialogContentText>
            </>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={onAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}