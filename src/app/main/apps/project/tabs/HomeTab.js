import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectWidgets } from '../store/widgetsSlice';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import i18next from 'i18next';
import { StoreLabs } from 'app/auth/store/constants';

function HomeTab() {
  const widgets = useSelector(selectWidgets);
  const dashData = useSelector(({ auth }) => auth.shared.dashbaordData);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
      {[1, 2, 3, 4].map(a => {
        return (
          <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
            <Paper key={a} className="w-full rounded-20 shadow flex flex-col justify-between">
              <div className="flex items-center justify-between px-4 pt-8">
                <Typography className="text-16 px-16 font-medium" color="textSecondary">
                  {StoreLabs.filter((c) => c.id == a).length > 0
                    ? StoreLabs.filter((c) => c.id == a)[0].name
                    : 'Store Number'}
                </Typography>
                <IconButton aria-label="more" size="large">
                  <Icon>shopping_cart</Icon>
                </IconButton>
              </div>
              <div className="text-center py-12">
                <Typography className={`text-72 font-semibold leading-none text-${a == 1 ? 'blue' : a == 2 ? "orange" : a == 3 ? "green" : a == 4 ? "red" : "green"} tracking-tighter`}>
                  {dashData ? <>
                    {a == 1 ?
                      ((dashData.countNotRentedStoreOne ? dashData.countNotRentedStoreOne : 0) + (dashData.countRentedStoreOne ? dashData.countRentedStoreOne : 0) + (dashData.countMaintenanceStoreOne ? dashData.countMaintenanceStoreOne : 0))
                      :
                      a == 2 ?
                        ((dashData.countNotRentedStoreTwo ? dashData.countNotRentedStoreTwo : 0) + (dashData.countRentedStoreTwo ? dashData.countRentedStoreTwo : 0) + (dashData.countMaintenanceStoreTwo ? dashData.countMaintenanceStoreTwo : 0))
                        :
                        a == 3 ?
                          ((dashData.countNotRentedStoreThree ? dashData.countNotRentedStoreThree : 0) + (dashData.countRentedStoreThree ? dashData.countRentedStoreThree : 0) + (dashData.countMaintenanceStoreThree ? dashData.countMaintenanceStoreThree : 0))
                          :
                          a == 4 ?
                            ((dashData.countNotRentedStoreFour ? dashData.countNotRentedStoreFour : 0) + (dashData.countRentedStoreFour ? dashData.countRentedStoreFour : 0) + (dashData.countMaintenanceStoreFour ? dashData.countMaintenanceStoreFour : 0))
                            :
                            0
                    }
                  </> : <>0</>}
                </Typography>
                <Typography className={`text-18 font-normal text-${a == 1 ? 'blue' : a == 2 ? "orange" : a == 3 ? "green" : a == 4 ? "red" : "green"}-800`}>
                  {i18next.t(`navigation:TOTALITEMS`)}
                </Typography>
              </div>
              <Typography
                className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
                color="textSecondary"
              >
                <span className="truncate">{"Available"}</span>:
                <b className="px-8">
                  {dashData ? <>
                    {a == 1 ? (dashData.countNotRentedStoreOne ? dashData.countNotRentedStoreOne : 0) :
                      a == 2 ? (dashData.countNotRentedStoreTwo ? dashData.countNotRentedStoreTwo : 0) :
                        a == 3 ? (dashData.countNotRentedStoreThree ? dashData.countNotRentedStoreThree : 0) :
                          a == 4 ? (dashData.countNotRentedStoreFour ? dashData.countNotRentedStoreFour : 0) : "0"}
                  </> : <>0</>}
                </b>
              </Typography>
              <Typography
                className="p-20 pt-0 h-4 flex justify-center items-end text-13 font-medium"
                color="textSecondary"
              >
                <span className="truncate">{"Rented"}</span>:
                <b className="px-8">
                  {dashData ? <>
                    {a == 1 ? (dashData.countRentedStoreOne ? dashData.countRentedStoreOne : 0) :
                      a == 2 ? (dashData.countRentedStoreTwo ? dashData.countRentedStoreTwo : 0) :
                        a == 3 ? (dashData.countRentedStoreThree ? dashData.countRentedStoreThree : 0) :
                          a == 4 ? (dashData.countRentedStoreFour ? dashData.countRentedStoreFour : 0) : "0"}
                  </> : <>0</>}
                </b>
              </Typography>
              <Typography
                className="p-20 pt-0 h-4 flex justify-center items-end text-13 font-medium"
                color="textSecondary"
              >
                <span className="truncate">{"Maintenance"}</span>:
                <b className="px-8">
                  {dashData ? <>
                    {a == 1 ? (dashData.countMaintenanceStoreOne ? dashData.countMaintenanceStoreOne : 0) :
                      a == 2 ? (dashData.countMaintenanceStoreTwo ? dashData.countMaintenanceStoreTwo : 0) :
                        a == 3 ? (dashData.countMaintenanceStoreThree ? dashData.countMaintenanceStoreThree : 0) :
                          a == 4 ? (dashData.countMaintenanceStoreFour ? dashData.countMaintenanceStoreFour : 0) : "0"}
                  </> : <>0</>}
                </b>
              </Typography>
            </Paper>
          </motion.div>
        )
      })}
    </motion.div>
  );
}

export default HomeTab;
