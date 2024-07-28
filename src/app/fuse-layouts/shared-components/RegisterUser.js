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
import { setRegisterLoader } from 'app/auth/store/loadersSlice';
import ds from '../../services/DataService';
import { useTheme } from '@mui/material/styles';
import { changeshowAddRegister } from 'app/auth/store/sharedData';

function RegisterUser(props) {
	const { isEdit, idd, handleEdit } = props;
	const dispatch = useDispatch();
	const loader = useSelector(({ auth }) => auth.loaders.registerLoader);
	const showAddRegister = useSelector(({ auth }) => auth.shared.showAddRegister);
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const theme = useTheme();

	const [getUserName, setUserName] = useState('');
	const [getUserEmail, setUserEmail] = useState('');
	const [getUserPassword, setUserPassword] = useState('');
	const [getRole, setRole] = useState('');
	const [passMsg, setPassMsg] = useState('');
	const [isPassValid, setIsPassValid] = useState(false);

	async function postRegister(body) {
		const getReq = ds.registerService(body);
		await getReq
			.then(res => {
				dispatch(setRegisterLoader(false));
				if (res && res != '') {
					dispatch(
						showMessage({
							message: `User has been Registered`,
							autoHideDuration: 2000,
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'center',
							},
							variant: 'success' //success error info warning null
						})
					);
					setToInitial();
					dispatch(changeshowAddRegister(false));
				}
			})
			.catch(e => {
				let msg = '';
				dispatch(setRegisterLoader(false));
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
		setUserEmail('');
		setUserPassword('');
		setRole('');
		setIsPassValid(false);
		setPassMsg('');
	}

	function onSave() {
		if (!getUserName || !getUserPassword || !getUserEmail || !getRole) {
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
			email: getUserEmail,
			password: getUserPassword,
			role: getRole,
		}
		dispatch(setRegisterLoader(true));
		postRegister(body);
	}

	function validatePassword(e) {
		setUserPassword(e.target.value);
		const passwordInputValue = e.target.value.trim();
		const uppercaseRegExp = /(?=.*?[A-Z])/;
		const lowercaseRegExp = /(?=.*?[a-z])/;
		const digitsRegExp = /(?=.*?[0-9])/;
		const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
		const minLengthRegExp = /.{8,}/;

		const passwordLength = passwordInputValue.length;
		const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
		const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
		const digitsPassword = digitsRegExp.test(passwordInputValue);
		const specialCharPassword = specialCharRegExp.test(passwordInputValue);
		const minLengthPassword = minLengthRegExp.test(passwordInputValue);

		let errMsg = "";
		if (passwordLength === 0) {
			errMsg = "Password is empty";
		} else if (!uppercasePassword) {
			errMsg = "At least one Uppercase";
		} else if (!lowercasePassword) {
			errMsg = "At least one Lowercase";
		} else if (!digitsPassword) {
			errMsg = "At least one digit";
		} else if (!specialCharPassword) {
			errMsg = "At least one Special Characters";
		} else if (!minLengthPassword) {
			errMsg = "At least minumum 8 characters";
		} else {
			errMsg = "";
		}
		if (errMsg == "") {
			setIsPassValid(true);
			errMsg = 'Password is strong';
		} else {
			setIsPassValid(false);
		}
		setPassMsg(errMsg);
	}

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={showAddRegister}
				// onClose={handleCloseProfile}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:REGISTERUSER`)}</DialogTitle>
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
										maxLength="30"
										variant="outlined"
										required
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">email</Icon>
									</div>
									<TextField
										// error={getEmailFormUserError}
										className="mb-16"
										id="email"
										name="email"
										label={i18next.t(`navigation:EMAIL`)}
										value={getUserEmail}
										onChange={(e) => {
											setUserEmail(e.target.value)
										}}
										variant="outlined"
										fullWidth
										required
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">lock</Icon>
									</div>
									<TextField
										className="mb-16"
										id="mailingName"
										name="mailingName"
										label={i18next.t(`navigation:${isEdit ? 'CHANGEPASS' : 'PASSWORD'}`)}
										value={getUserPassword}
										onChange={(e) => {
											setUserPassword(e.target.value);
											validatePassword(e);
										}}
										required={!isEdit}
										helperText={
											<span style={{ color: isPassValid ? 'green' : 'red' }}>
												{passMsg}
											</span>}
										variant="outlined"
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">people</Icon>
									</div>
									<FormControl
										variant="outlined"
										// className={classes.formControl}
										style={{ width: '100%' }}
									>
										<InputLabel id="demo-simple-select-outlined-label">{i18next.t(`navigation:SELROLE`)}</InputLabel>
										<Select
											className="mb-24"
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label={i18next.t(`navigation:SELROLE`)}
											value={getRole}
											onChange={(e) => {
												setRole(e.target.value)
											}}
										// disabled={isEdit}
										>
											<MenuItem key={0} value={'admin'}>
												Admin
											</MenuItem>
											<MenuItem key={1} value={'user'}>
												User
											</MenuItem>
										</Select>
									</FormControl>
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
							dispatch(changeshowAddRegister(false));
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

export default RegisterUser;
