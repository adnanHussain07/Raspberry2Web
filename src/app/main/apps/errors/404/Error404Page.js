import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { signedInDefaultRedirect } from 'app/auth/store/loginSlice';

function Error404Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography variant="h5" color="textSecondary" className="mb-16 font-normal">
            {i18next.t(`navigation:ERRORNOTIFY`)}
          </Typography>
        </motion.div>

        {/* <Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16 shadow">
          <Icon color="action">search</Icon>
          <Input
            placeholder="Search for anything"
            className="px-16"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
          />
        </Paper> */}

        {/* <Link className="font-normal" onClick={signedInDefaultRedirect}>
          {i18next.t(`navigation:GOHOME`)}
        </Link> */}
      </div>
    </div>
  );
}

export default Error404Page;
