import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';

function WidgetWeather(props) {
  const dashData = useSelector(({ auth }) => auth.shared.dashbaordData);

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-0">
        <div className="flex items-center px-16">
          <Icon color="action">location_on</Icon>
          <Typography className="text-16 mx-8 font-medium" color="textSecondary">
            {i18next.t(`navigation:TOTALSTORES`)}
          </Typography>
        </div>
        <IconButton aria-label="more" size="large">
          <Icon>layers</Icon>
        </IconButton>
      </div>
      <div className="flex items-center justify-center p-6">
        <Typography className="text-44 font-medium tracking-tighter" color="textSecondary">
          {"4"}
        </Typography>
      </div>
      <div className="flex items-center justify-center pb-12">
        <Typography className="font-semibold">
          {i18next.t(`navigation:TOTALNBROFSTORES`)}
        </Typography>
      </div>
      <Divider />
      <div className="w-full py-2">
        <div className="flex items-center justify-between w-full py-16 px-24" key={1}>

          <div>
            <div className="flex items-center">
              <Typography className="text-12 font-medium tracking-tighter">
                {i18next.t(`navigation:TOTALITEM`)}:
              </Typography>
              <Typography className="text-12 ml-12 font-medium">
                {dashData ?
                  ((dashData.countTotalNotRented ? dashData.countTotalNotRented : 0) + (dashData.countTotalRented ? dashData.countTotalRented : 0))
                  : 0}
              </Typography>
            </div>
            <div className="flex items-center">
              <Typography className="text-12 font-medium tracking-tighter">
                {i18next.t(`navigation:TOTALRENTED`)}:
              </Typography>
              <Typography className="text-12 ml-12 font-medium">
                {dashData && dashData.countTotalRented ? dashData.countTotalRented : 0}
              </Typography>
            </div>
            <div className="flex items-center">
              <Typography className="text-12 font-medium tracking-tighter">
                {i18next.t(`navigation:TOTAAVAIL`)}:
              </Typography>
              <Typography className="text-12 ml-12 font-medium">
                {dashData && dashData.countTotalNotRented ? dashData.countTotalNotRented : 0}
              </Typography>
            </div>
            <div className="flex items-center">
              <Typography className="text-12 font-medium tracking-tighter">
                {i18next.t(`navigation:TOTLAMAINT`)}:
              </Typography>
              <Typography className="text-12 ml-12 font-medium">
                {dashData && dashData.countTotalMaintained ? dashData.countTotalMaintained : 0}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(WidgetWeather);
