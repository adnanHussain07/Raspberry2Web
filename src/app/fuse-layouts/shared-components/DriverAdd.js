import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import i18next from 'i18next';
import Dialog from '@mui/material/Dialog';
import { pink } from '@mui/material/colors';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { showMessage } from 'app/store/fuse/messageSlice';
import clsx from 'clsx';
import FormControl from '@mui/material/FormControl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { setRoles, setShowDriver, setStates } from 'app/auth/store/commonData';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import { setProfileLoader } from 'app/auth/store/loadersSlice';
import ds from '../../services/DataService';
import { Roles } from 'app/auth/store/constants';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function DriverAdd(props) {
	const dispatch = useDispatch();
	const loader = useSelector(({ auth }) => auth.loaders.createProfileLoader);
	const roles = useSelector(({ auth }) => auth.common.roles);
	const states = useSelector(({ auth }) => auth.common.states ? auth.common.states : []);
	const showDriver = useSelector(({ auth }) => auth.common.isShowDriver);
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const theme = useTheme();

	const [getUserName, setUserName] = useState('');
	const [getUserEmail, setUserEmail] = useState('');
	const [getUserPassword, setUserPassword] = useState('');
	const [getFullName, setFullName] = useState('');
	const [getPhone, setPhone] = useState('');
	const [getVehicleNo, setVehicleNo] = useState('');
	const [getIsDriver, setIsDriver] = useState(true);
	const [getState, setState] = useState([]);
	const [getRole, setRole] = useState('');

	async function postDriver(body) {
		const getReq = ds.createDriverService(body);
		await getReq
			.then(res => {
				dispatch(setProfileLoader(false));
				if (res && res != '') {
					dispatch(
						showMessage({
							message: `User has been created`,
							autoHideDuration: 2000,
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'center',
							},
							variant: 'success' //success error info warning null
						})
					);
					setToInitial();
				}
			})
			.catch(e => {
				let msg = '';
				if (e.response && e.response.data) {
					const err = e.response.data;
					msg = err.title ? err.title : err;
				}
				dispatch(setProfileLoader(false));
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
		setFullName('');
		setPhone('');
		setVehicleNo('');
		setIsDriver(true);
		setState('');
		setState([]);
		setRole('');
	}

	function onDriverFormSave() {
		const stateids = getState && getState.length > 0 ? getState.map(aa => {
			const fill = states.filter(ww => ww.nameAr == aa || ww.nameEn == aa);
			if (fill && fill.length > 0) {
				return fill[0].id;
			}
		}) : false;
		if (!getUserName || !getUserPassword || !getFullName || !stateids) {
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
			username: getUserName,
			fullName: getFullName,
			mobile: getPhone,
			email: getUserEmail,
			isDriver: getIsDriver,
			password: getUserPassword,
			vehicleNo: getVehicleNo,
			stateID: stateids,
			// roleID: Roles.driver,
			createdBy: 1,
			modifiedBy: 0,
		}
		dispatch(setProfileLoader(true));
		postDriver(body);
	}

	function getStyles(name, personName, theme) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setState(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={showDriver}
				// onClose={handleCloseProfile}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:CREATEDRIVER`)}</DialogTitle>
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
										// error={getNameFormUserError}
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
										label={i18next.t(`navigation:PASSWORD`)}
										value={getUserPassword}
										onChange={(e) => {
											setUserPassword(e.target.value)
										}}
										// validations={{
										// 	minLength: 30
										// }}
										// validationErrors={{
										// 	minLength: 'Min character length is 30'
										// }}
										variant="outlined"
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">account_circle</Icon>
									</div>
									<TextField
										// error={getSurnameFormUserError}
										className="mb-24"
										id="surname"
										name="surname"
										label={i18next.t(`navigation:FULLNAME`)}
										value={getFullName}
										onChange={(e) => {
											setFullName(e.target.value)
										}}
										// validations={{
										// 	minLength: 30
										// }}
										// validationErrors={{
										// 	minLength: 'Min character length is 30'
										// }}
										variant="outlined"
										fullWidth
										required
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">directions_car</Icon>
									</div>
									<TextField
										// error={getAddressFormUserError1}
										className="mb-24"
										id="address1"
										name="address1"
										label={i18next.t(`navigation:VEHNO`)}
										value={getVehicleNo}
										onChange={(e) => {
											setVehicleNo(e.target.value)
										}}
										variant="outlined"
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">phone</Icon>
									</div>
									<TextField
										// error={getAddressFormUserError1}
										className="mb-24"
										id="addreasdasss1"
										name="addreasdasdss1"
										label={i18next.t(`navigation:MOBNO`)}
										value={getPhone}
										onChange={(e) => {
											setPhone(e.target.value)
										}}
										variant="outlined"
										fullWidth
									/>
								</div>

								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">add_location</Icon>
									</div>
									<FormControl
										variant="outlined"
										// className={classes.formControl}
										style={{ width: '100%' }}
									>
										<InputLabel id="demo-simple-select-outlined-label">{i18next.t(`navigation:SELSTATE`)}</InputLabel>
										<Select
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											multiple
											value={getState}
											onChange={handleChange}
											input={<OutlinedInput label={i18next.t(`navigation:SELSTATE`)} />}
											renderValue={(selected) => selected.join(', ')}
											MenuProps={MenuProps}
										>
											{states &&
												states.length > 0 &&
												states.map(ee => {
													return (
														<MenuItem
															key={ee.code}
															value={ee.nameEn}
															style={getStyles(ee.nameEn, getState, theme)}
														>
															<Checkbox checked={getState.indexOf(ee.nameEn) > -1} />
															<ListItemText primary={ee.nameEn} />
															{language && language == 'ar' ? ee.nameAr : ee.nameEn}
														</MenuItem>
													);
												})}
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
							dispatch(setShowDriver(!showDriver));
						}}
					// color="primary"
					>
						{i18next.t(`navigation:CLOSE`)}
					</Button>
					<Button
						className='mr-8'
						variant="contained"
						color='primary'
						onClick={() => onDriverFormSave()}>
						{i18next.t(`navigation:SAVE`)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default DriverAdd;
