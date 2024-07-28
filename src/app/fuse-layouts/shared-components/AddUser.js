import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import i18next from 'i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { showMessage } from 'app/store/fuse/messageSlice';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { setAddUserLoader } from 'app/auth/store/loadersSlice';
import ds from '../../services/DataService';
import { useTheme } from '@mui/material/styles';
import { changeshowAddUser, changeUsersPagination } from 'app/auth/store/sharedData';

function AddUser(props) {
	const { isEdit, idd, handleEdit } = props;
	const dispatch = useDispatch();
	const loader = useSelector(({ auth }) => auth.loaders.setAddUserLoader);
	const showAddUser = useSelector(({ auth }) => auth.shared.showAddUser);
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const usersPagination = useSelector(({ auth }) => auth.shared.usersPagination);
	const theme = useTheme();

	const [getUserName, setUserName] = useState('');
	const [getUserID, setUserID] = useState('');
	const [getDeptName, setDeptName] = useState('');
	const [getClgID, setClgID] = useState('');

	async function postUser(body) {
		const getReq = ds.addUserService(body);
		await getReq
			.then(res => {
				dispatch(setAddUserLoader(false));
				if (res && res != '') {
					const body = {
						pageNo: usersPagination.pageNo,
						pageSize: usersPagination.pageSize,
					}
					dispatch(changeUsersPagination(body));
					dispatch(
						showMessage({
							message: `User has been added`,
							autoHideDuration: 2000,
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'center',
							},
							variant: 'success' //success error info warning null
						})
					);
					setToInitial();
					dispatch(changeshowAddUser(false));
				}
			})
			.catch(e => {
				let msg = e && e.res && e.res.error;
				dispatch(setAddUserLoader(false));
				dispatch(
					showMessage({
						message: `${msg ? msg : 'Something went wrong'}`,
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center',
						},
						variant: `${msg ? 'warning' : 'error'}` //success error info warning null
					})
				);
			});
	}

	function setToInitial() {
		setUserName('');
		setUserID('');
		setDeptName('');
		setClgID('');
	}

	function onSave() {
		if (!getUserName || !getUserID || !getDeptName) {
			dispatch(
				showMessage({
					message: `Please provide proper information`,
					autoHideDuration: 3000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
					variant: 'warning' //success error info warning null
				})
			);
			return;
		}
		const body = {
			name: getUserName,
			userid: getUserID,
			department: getDeptName,
			collegeid: getClgID,
		}
		dispatch(setAddUserLoader(true));
		postUser(body);
	}

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={showAddUser}
				// onClose={handleCloseProfile}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:ADDNEWUSER`)}</DialogTitle>
				</AppBar>
				<DialogContent>
					{loader ? (
						<>
							<div style={{ height: '850px', textAlign: 'center', marginTop: '30%' }}>
								<CircularProgress />
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col md:overflow-hidden pt-20">
								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">account_circle</Icon>
									</div>
									<TextField
										className="mb-24"
										label={i18next.t(`navigation:USERNAME`)}
										id="name"
										name="name"
										value={getUserName}
										onChange={(e) => {
											setUserName(e.target.value)
										}}
										// maxLength="30"
										variant="outlined"
										required
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">account_circle</Icon>
									</div>
									<TextField
										className="mb-24"
										label={i18next.t(`navigation:USERID`)}
										id="id"
										name="id"
										value={getUserID}
										onChange={(e) => {
											setUserID(e.target.value)
										}}
										// maxLength="30"
										variant="outlined"
										required
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">account_circle</Icon>
									</div>
									<TextField
										className="mb-24"
										label={i18next.t(`navigation:DEPTNAME`)}
										id="nbr"
										name="nbr"
										value={getDeptName}
										onChange={(e) => {
											setDeptName(e.target.value)
										}}
										// maxLength="30"
										variant="outlined"
										required
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">account_circle</Icon>
									</div>
									<TextField
										className="mb-24"
										label={i18next.t(`navigation:CLGID`)}
										id="nbr"
										name="nbr"
										value={getClgID}
										onChange={(e) => {
											setClgID(e.target.value)
										}}
										// maxLength="30"
										variant="outlined"
										required
										fullWidth
									/>
								</div>
							</div>
						</>
					)}
				</DialogContent>
				<DialogActions style={{ padding: 15, paddingRight: 22, paddingLeft: 22 }}>
					<Button
						variant="contained" style={{ backgroundColor: 'rgb(134 141 134)' }}
						onClick={() => {
							setToInitial();
							dispatch(changeshowAddUser(false));
						}}
					>
						{i18next.t(`navigation:CLOSE`)}
					</Button>
					<Button
						className='mr-8'
						variant="contained"
						color='primary'
						onClick={() => onSave()}>
						{i18next.t(`navigation:SAVE`)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AddUser;
