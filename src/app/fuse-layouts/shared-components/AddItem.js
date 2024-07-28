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
import { setAddItemLoader } from 'app/auth/store/loadersSlice';
import ds from '../../services/DataService';
import { useTheme } from '@mui/material/styles';
import { changeItemPagination, changeshowAddItem } from 'app/auth/store/sharedData';
import { StoreLabs } from 'app/auth/store/constants';

function AddItem(props) {
	const { isEdit, idd, handleEdit } = props;
	const dispatch = useDispatch();
	const loader = useSelector(({ auth }) => auth.loaders.registerLoader);
	const showAddItem = useSelector(({ auth }) => auth.shared.showAddItem);
	const itemPagination = useSelector(({ auth }) => auth.shared.itemPagination);
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const theme = useTheme();

	const [getItemName, setItemName] = useState('');
	const [getItemID, setItemID] = useState('');
	const [getStoreNbr, setStoreNbr] = useState('0');
	const [getSerNo, setSerNo] = useState('');

	async function postItem(body) {
		const getReq = ds.addItemService(body);
		await getReq
			.then(res => {
				dispatch(setAddItemLoader(false));
				if (res && res != '') {
					const bossdy = {
						changsrre: true,
						pageNo: itemPagination.pageNo,
						pageSize: itemPagination.pageSize,
					}
					dispatch(changeItemPagination(bossdy));
					dispatch(
						showMessage({
							message: `Item has been entered`,
							autoHideDuration: 2000,
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'center',
							},
							variant: 'success' //success error info warning null
						})
					);
					setToInitial();
					dispatch(changeshowAddItem(false));
				}
			})
			.catch(e => {
				let msg = e && e.response ? e.response.data : "";
				dispatch(setAddItemLoader(false));
				dispatch(
					showMessage({
						message: `${msg ? msg : 'Something went wrong'}`,
						autoHideDuration: 3000,
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
		setItemID('');
		setItemName('');
		setStoreNbr('0');
		setSerNo('');
	}

	function onSave() {
		if (!getItemName || !getItemID || (!getStoreNbr || getStoreNbr == '0')) {
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
			name: getItemName,
			itemid: getItemID,
			original_storenumber: getStoreNbr,
			SerialNo: getSerNo,
		}
		dispatch(setAddItemLoader(true));
		postItem(body);
	}

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={showAddItem}
				// onClose={handleCloseProfile}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:ADDNEWITEMS`)}</DialogTitle>
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
											label={i18next.t(`navigation:ITEMNAME`)}
											id="name"
											name="name"
											value={getItemName}
											onChange={(e) => {
												setItemName(e.target.value)
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
											label={i18next.t(`navigation:ITEMID`)}
											id="id"
											name="id"
											value={getItemID}
											onChange={(e) => {
												setItemID(e.target.value)
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
											label={i18next.t(`navigation:SERNO`)}
											id="id"
											name="id"
											value={getSerNo}
											onChange={(e) => {
												setSerNo(e.target.value)
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
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={getStoreNbr}
											label={i18next.t(`navigation:SELECTSTORE`)}
											onChange={(e) => setStoreNbr(e.target.value)}
											// size="small"
											fullWidth
										>
											<MenuItem autoFocus={false} value="0">{i18next.t(`navigation:SELECTSTORE`)}</MenuItem>
											{StoreLabs.map((a, i) => {
												return (
													<MenuItem
														key={i}
														autoFocus={false}
														value={a.id}
													>
														{a.name}
													</MenuItem>
												)
											})}
											{/* <MenuItem autoFocus={false} value="1">{i18next.t(`navigation:STORE1`)}</MenuItem>
										<MenuItem autoFocus={false} value="2">{i18next.t(`navigation:STORE2`)}</MenuItem>
										<MenuItem autoFocus={false} value="3">{i18next.t(`navigation:STORE3`)}</MenuItem>
										<MenuItem autoFocus={false} value="4">{i18next.t(`navigation:STORE4`)}</MenuItem> */}
										</Select>
										{/* <TextField
										className="mb-24"
										label={i18next.t(`navigation:STORENBR`)}
										id="nbr"
										name="nbr"
										value={getStoreNbr}
										onChange={(e) => {
											setStoreNbr(e.target.value)
										}}
										// maxLength="30"
										variant="outlined"
										required
										fullWidth
									/> */}
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
							dispatch(changeshowAddItem(false));
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

export default AddItem;
