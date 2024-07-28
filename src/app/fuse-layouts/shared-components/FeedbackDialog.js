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

function FeedbackDialog(props) {
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
						key: 'Request No',
						value: dataProp.ReqNo ? dataProp.ReqNo : ""
					},
					{
						key: 'Customer Name',
						value: dataProp.CustomerName ? dataProp.CustomerName : ""
					},
					{
						key: 'Customer Mobile',
						value: dataProp.CustomerMobile ? dataProp.CustomerMobile : ""
					},
					{
						key: 'Emirates',
						value: language == 'ar' ? dataProp.EmiratesAr : dataProp.EmiratesEn,
					},
					{
						key: 'Feedback Date',
						value: dataProp.FeedBackDate ? dataProp.FeedBackDate : ""
					},
					{
						key: 'Rating',
						value: language == 'ar' ? dataProp.RatingAr : dataProp.RatingEn,
					},
					{
						key: 'Customer Remarks',
						value: dataProp.CustomerNotes ? dataProp.CustomerNotes : ""
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
					<DialogTitle id="form-dialog-title">{i18next.t(`navigation:CUSFEEDBACK`)}</DialogTitle>
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

export default FeedbackDialog;
