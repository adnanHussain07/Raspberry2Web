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
import FormControl from '@mui/material/FormControl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { displayPopup, setIsUpdateUser, setShowUser } from 'app/auth/store/commonData';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import { setProfileLoader } from 'app/auth/store/loadersSlice';
import ds from '../../services/DataService';
import { Roles } from 'app/auth/store/constants';
import { useTheme } from '@mui/material/styles';
import { onlyUnique } from 'app/auth/store/commonMethods';
import { handleResponse } from '../../auth/store/commonMethods';

const icon = <CheckBoxOutlineBlankIcon fontSize="large" />;
const checkedIcon = <CheckBoxIcon fontSize="large" />;
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

function MyProfileDialog(props) {
	const { isEdit, idd, handleEdit } = props;
	const dispatch = useDispatch();
	const loader = useSelector(({ auth }) => auth.loaders.createProfileLoader);
	const roles = useSelector(({ auth }) => auth.common.roles);
	const states = useSelector(({ auth }) => auth.common.states);
	const categories = useSelector(({ auth }) => auth.common.categories);
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const isShow = useSelector(({ auth }) => auth.common.isShowUser);
	const isUserUpdate = useSelector(({ auth }) => auth.common.isUserUpdate);
	const theme = useTheme();

	const [getUserName, setUserName] = useState('');
	const [getUserEmail, setUserEmail] = useState('');
	const [getUserPassword, setUserPassword] = useState('');
	const [getFullName, setFullName] = useState('');
	const [getPhone, setPhone] = useState('');
	const [getVehicleNo, setVehicleNo] = useState('');
	const [getIsDriver, setIsDriver] = useState(false);
	const [getState, setState] = useState([]);
	const [getCats, setCats] = useState([]);
	const [getRole, setRole] = useState('');
	// const [passMsg, setPassMsg] = useState('');
	// const [isPassValid, setIsPassValid] = useState(false);

	React.useEffect(() => {
		let mount = true
		if (mount && isEdit && idd) {
			dispatch(setProfileLoader(true))
			getUser(idd);
		}

		return () => mount = false;
	}, [isShow]);

	async function postUser(body) {
		const getReq = ds.createUserService(body);
		await getReq
			.then(res => {
				dispatch(setProfileLoader(false));
				if (res && res != '') {
					isUserListUpdate();
					dispatch(handleResponse('USERCERATED', true));
					dispatch(setShowUser(false));
					onClosing();
				}
			})
			.catch(e => {
				let msg = '';
				if (e.response && e.response.data) {
					const err = e.response.data;
					msg = err.title ? err.title : err;
				}
				dispatch(setProfileLoader(false));
				dispatch(handleResponse(e, false));
			});
	}

	async function getUser(id) {
		const getReq = ds.getUserByIDService(id);
		await getReq
			.then(res => {
				dispatch(setProfileLoader(false));
				if (res && res.length > 0) {
					const body = res[0];
					if (body && body.ur && body.ur.length > 0) {
						const lData = body.ur[0];
						if (lData && lData.Category) {
							const cats = lData.Category.split(',');
							const catIds = cats && cats.length > 0 ? cats.filter(onlyUnique).map(aa => {
								const fillCats = categories.filter(ww => ww.id == aa);
								if (fillCats && fillCats.length > 0) {
									return language == 'ar' ? fillCats[0].nameAr : fillCats[0].nameEn;
								}
							}) : false;

							if (catIds) {
								setCats(catIds);
							}
						}
						if (lData && lData.State) {
							const statesss = lData.State.split(',');
							const stateIds = statesss && statesss.length > 0 ? statesss.filter(onlyUnique).map(aa => {
								const fillStats = states.filter(ww => ww.id == aa);
								if (fillStats && fillStats.length > 0) {
									return language == 'ar' ? fillStats[0].nameAr : fillStats[0].nameEn;
								}
							}) : false;

							if (stateIds) {
								setState(stateIds);
							}
						}
						if (lData && lData.RoleID) {
							setRole(lData.RoleID);
							// if (lData.RoleID == Roles.driver) {
							// 	setIsDriver(true);
							// }
						}
					}
					setUserName(body.userName ? body.userName : '');
					setUserEmail(body.Email ? body.Email : '');
					setFullName(body.fullName ? body.fullName : '');
					setPhone(body.Mobile ? body.Mobile : '');
					setVehicleNo(body.VehicleNo ? body.VehicleNo : "");
				}
			})
			.catch(e => {
				dispatch(setProfileLoader(false));
				dispatch(handleResponse(e, false));
			});
	}

	async function updateUserService(body) {
		const getReq = ds.updateUser(body);
		await getReq
			.then(res => {
				dispatch(setProfileLoader(false));
				if (res && res != '') {
					isUserListUpdate();
					dispatch(handleResponse('USERUPDATED', true));
					dispatch(setShowUser(false));
					onClosing();
				}
			})
			.catch(e => {
				let msg = '';
				if (e.response && e.response.data) {
					const err = e.response.data;
					msg = err.title ? err.title : err;
				}
				dispatch(setProfileLoader(false));
				dispatch(handleResponse(e, false));
			});
	}

	function setToInitial() {
		setUserName('');
		setUserEmail('');
		setUserPassword('');
		setFullName('');
		setPhone('');
		setVehicleNo('');
		setIsDriver(false);
		setState([]);
		setCats([]);
		setRole('');
	}

	function onProfileFormSave() {
		const stateids = getState && getState.length > 0 ? getState.map(aa => {
			const fill = states.filter(ww => ww.nameAr == aa || ww.nameEn == aa);
			if (fill && fill.length > 0) {
				return fill[0].id;
			}
		}) : false;
		const catIds = getCats && getCats.length > 0 ? getCats.map(aa => {
			const fillCat = categories.filter(ww => ww.nameAr == aa || ww.nameEn == aa);
			if (fillCat && fillCat.length > 0) {
				return fillCat[0].id;
			}
		}) : false;

		// if (getUserPassword) {
		// 	if (!isPassValid) {
		// 		dispatch(displayPopup(`Password must contain ${passMsg}`, 'warning', 4000));
		// 		return;
		// 	}
		// }
		if (getIsDriver) {
			if (!getVehicleNo) {
				dispatch(handleResponse('PROVVEHNO', false));
				return;
			}
		}
		if (isEdit) {
			if (!getUserName || !getRole) {
				dispatch(handleResponse('PROVIDEINFO', false));
				return;
			}
			const body = {
				id: idd,
				// username: getUserName,
				fullName: getFullName,
				mobile: getPhone,
				email: getUserEmail,
				password: getUserPassword,
				vehicleNo: getVehicleNo,
				stateID: stateids ? stateids : [],
				catagoryId: catIds ? catIds : [],
				roleID: getRole,
				isDriver: getIsDriver,
			}
			dispatch(setProfileLoader(true));
			updateUserService(body);
		}
		else {
			if (!getUserName || !getUserPassword || !getRole) {
				dispatch(handleResponse('PROVIDEINFO', false));
				return;
			}
			const body = {
				username: getUserName,
				fullName: getFullName,
				mobile: getPhone,
				email: getUserEmail,
				password: getUserPassword,
				vehicleNo: getVehicleNo,
				stateID: stateids ? stateids : [],
				catagoryId: catIds ? catIds : [],
				roleID: getRole,
				isDriver: getIsDriver,
			}
			dispatch(setProfileLoader(true));
			postUser(body);
		}
	}

	function isUserListUpdate() {
		dispatch(setIsUpdateUser(!isUserUpdate));
	}

	function onClosing() {
		if (isEdit) {
			handleEdit();
		}
		setToInitial();
		dispatch(setProfileLoader(false));
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

	const handleChangeCategories = (event) => {
		const {
			target: { value },
		} = event;
		setCats(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	function getStyles(name, personName, theme) {
		if (personName) {
			return {
				fontWeight:
					personName.indexOf(name) === -1
						? theme.typography.fontWeightRegular
						: theme.typography.fontWeightMedium,
			};
		}
	}

	// function validatePassword(e) {
	// 	setUserPassword(e.target.value);
	// 	const passwordInputValue = e.target.value.trim();
	// 	const uppercaseRegExp = /(?=.*?[A-Z])/;
	// 	const lowercaseRegExp = /(?=.*?[a-z])/;
	// 	const digitsRegExp = /(?=.*?[0-9])/;
	// 	const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
	// 	const minLengthRegExp = /.{8,}/;

	// 	const passwordLength = passwordInputValue.length;
	// 	const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
	// 	const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
	// 	const digitsPassword = digitsRegExp.test(passwordInputValue);
	// 	const specialCharPassword = specialCharRegExp.test(passwordInputValue);
	// 	const minLengthPassword = minLengthRegExp.test(passwordInputValue);

	// 	let errMsg = "";
	// 	if (passwordLength === 0) {
	// 		errMsg = "Password is empty";
	// 	} else if (!uppercasePassword) {
	// 		errMsg = "At least one Uppercase";
	// 	} else if (!lowercasePassword) {
	// 		errMsg = "At least one Lowercase";
	// 	} else if (!digitsPassword) {
	// 		errMsg = "At least one digit";
	// 	} else if (!specialCharPassword) {
	// 		errMsg = "At least one Special Characters";
	// 	} else if (!minLengthPassword) {
	// 		errMsg = "At least minumum 8 characters";
	// 	} else {
	// 		errMsg = "";
	// 	}
	// 	if (errMsg == "") {
	// 		setIsPassValid(true);
	// 		errMsg = 'Password is strong';
	// 	} else {
	// 		setIsPassValid(false);
	// 	}
	// 	setPassMsg(errMsg);
	// }

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={isShow}
				// onClose={handleCloseProfile}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:${isEdit ? 'EDITUSER' : 'CREATEUSER'}`)}</DialogTitle>
				</AppBar>
				<DialogContent>
					{loader ? (
						<>
							<div style={{ height: '850px', textAlign: 'center', marginTop: '25%' }}>
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
										disabled={isEdit}
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
											// validatePassword(e);
										}}
										required={!isEdit}
										// helperText={
										// 	<span style={{ color: isPassValid ? 'green' : 'red' }}>
										// 		{passMsg}
										// 	</span>}
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
										variant="outlined"
										fullWidth
										required
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
										<Icon color="action">people</Icon>
									</div>
									<FormControl
										variant="outlined"
										// className={classes.formControl}
										style={{ width: '100%' }}
									>
										<InputLabel id="demo-simple-select-outlined-label">{i18next.t(`navigation:SELROLEE`)}</InputLabel>
										<Select
											className="mb-24"
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label={i18next.t(`navigation:SELROLEE`)}
											value={getRole}
											onChange={(e) => {
												// if (e.target.value == Roles.driver) {
												// 	setIsDriver(true);
												// } else {
												// 	setIsDriver(false);
												// }
												setRole(e.target.value)
											}}
											disabled={isEdit}
										>
											{roles &&
												roles.length > 0 &&
												roles.map(ee => {
													return (
														<MenuItem key={ee.id} value={ee.id}>
															{language && language == 'ar' ? ee.nameAr : ee.nameEn}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								</div>

								{getIsDriver && (
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
								)}

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
										{/* <Select
											className="mb-24"
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label={i18next.t(`navigation:SELSTATE`)}
											value={getState}
											onChange={(e) => {
												setState(e.target.value)
											}}
										>
											{states &&
												states.length > 0 &&
												states.map(ee => {
													return (
														<MenuItem key={ee.code} value={ee.id}>
															{language && language == 'ar' ? ee.nameAr : ee.nameEn}
														</MenuItem>
													);
												})}
										</Select> */}
									</FormControl>
								</div>

								<div className="flex mt-20">
									<div className="min-w-48 pt-20">
										<Icon color="action">category</Icon>
									</div>
									<FormControl
										variant="outlined"
										style={{ width: '100%' }}
									>
										<InputLabel id="demo-simple-select-outlined-label">{i18next.t(`navigation:CATEGORY`)}</InputLabel>
										<Select
											labelId="demo-multiple-name-label"
											id="demo-multiple-name"
											multiple
											value={getCats}
											onChange={handleChangeCategories}
											input={<OutlinedInput label={i18next.t(`navigation:CATEGORY`)} />}
											renderValue={(selected) => selected.join(', ')}
											MenuProps={MenuProps}
										>
											{categories &&
												categories.length > 0 &&
												categories.map(ee => {
													return (
														<MenuItem
															key={ee.code}
															value={ee.nameEn}
															style={getStyles(ee.nameEn, getCats, theme)}
														>
															<Checkbox checked={getCats.indexOf(ee.nameEn) > -1} />
															<ListItemText primary={ee.nameEn} />
															{language && language == 'ar' ? ee.nameAr : ee.nameEn}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								</div>

								{/* <div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">developer_board</Icon>
									</div>
									<FormControlLabel
										control={
											<Checkbox
												sx={{
													color: pink[800],
													'&.Mui-checked': {
														color: pink[600],
													},
												}}
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
												checked={getIsDriver}
												onClick={() => setIsDriver(!getIsDriver)}
											/>
										}
										label={i18next.t(`navigation:DRIVER`)}
									/>
								</div> */}
							</div>
						</>
					)}
				</DialogContent>
				<DialogActions style={{ padding: 15, paddingRight: 22, paddingLeft: 22 }}>
					<Button
						variant="contained" style={{ backgroundColor: 'rgb(134 141 134)' }}
						onClick={() => {
							dispatch(setShowUser(false));
							onClosing();
						}}
					// color="primary"
					>
						{i18next.t(`navigation:CLOSE`)}
					</Button>
					<Button
						variant="contained"
						color='primary'
						disabled={loader}
						onClick={() => onProfileFormSave()}>
						{i18next.t(`navigation:SAVE`)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default MyProfileDialog;
