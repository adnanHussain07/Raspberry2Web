import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { isEmptyObject } from 'app/auth/store/commonMethods';
import { DateTimeFormat, DefFilters, ReqSource } from 'app/auth/store/constants';
import moment from 'moment';

function RequestDialog(props) {
	const { isShow, handleChange, dataProp } = props;
	const dispatch = useDispatch();
	const language = useSelector(({ i18n }) => i18n.language ? i18n.language : "");
	const theme = useTheme();

	const [getData, setData] = useState('');

	React.useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (dataProp && !isEmptyObject(dataProp)) {
				const getDatas = [
					{
						key: 'Type',
						value: dataProp.isDuplicate ? "This request is marked duplicate" : "No Answer for this request",
					},
					{
						key: 'Request No',
						value: dataProp.reqNo ? dataProp.reqNo : ""
					},
					{
						key: 'Customer Name',
						value: dataProp.customerName ? dataProp.customerName : ""
					},
					{
						key: 'Customer Mobile',
						value: dataProp.customerMobile ? dataProp.customerMobile : ""
					},
					{
						key: 'Emirates',
						value: language == 'ar' ? dataProp.stateNameAr : dataProp.stateNameEn,
					},
					{
						key: 'Request Source',
						value: dataProp.requestSourceID == ReqSource.WEB ?
							"Website" :
							dataProp.requestSourceID == ReqSource.MOB ?
								"Mobile Application" :
								dataProp.requestSourceID == ReqSource.EMAIL ?
									"Email" :
									dataProp.requestSourceID == ReqSource.PHONE ?
										"Phone call" :
										""
					},
					{
						key: 'Category',
						value: language == 'ar' ? dataProp.categoryNameAr : dataProp.categoryNameEn,
					},
					{
						key: 'Status',
						value: dataProp.statusId == DefFilters.NEW ?
							"New" :
							dataProp.statusId == DefFilters.COMPLETED ?
								"Completed" : ""
					},
					// {
					// 	key: 'Action by',
					// 	value: dataProp.actionBy ? dataProp.actionBy : ""
					// },
					{
						key: 'Submission Date',
						value: dataProp.createdAt ? moment(dataProp.createdAt).format(DateTimeFormat) : ""
					},
					// {
					// 	key: 'Driver Pickup Date',
					// 	value: dataProp.actualpickupAt ? moment(dataProp.actualpickupAt).format(DateTimeFormat) : ""
					// },
					{
						key: 'Requested Pickup Date',
						value: dataProp.requestedPickUpDate ? moment(dataProp.requestedPickUpDate).format(DateTimeFormat) : ""
					},
				];
				setData(getDatas);
			} else {
				setData([]);
			}
		}

		return () => mounted = false;
	}, [dataProp]);

	return (
		<>
			<Dialog
				classes={{
					paper: 'm-24 rounded-8'
				}}
				open={isShow}
				onClose={handleChange}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="xs"
			>
				<AppBar position="static" elevation={1}>
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:REQDET`)}</DialogTitle>
				</AppBar>
				<DialogContent>
					<Table>
						<TableBody>
							{getData && getData.length > 0 && getData.map((n, key) => {
								return (
									<TableRow
										className=""
										hover
										key={key}
									>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.key}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.value}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</DialogContent>
				<DialogActions style={{ padding: 15, paddingRight: 22, paddingLeft: 22 }}>
					<Button
						variant="contained"
						color='primary'
						onClick={() => handleChange()}>
						{i18next.t(`navigation:CLOSE`)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default RequestDialog;
