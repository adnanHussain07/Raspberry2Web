import * as React from 'react'
import { amber } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { memo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUserShortcuts } from 'app/auth/store/userSlice'
import i18next from 'i18next'
import Popover from '@mui/material/Popover'
import { Menus } from 'app/auth/store/constants'
import { assignTiesto } from 'app/auth/store/loginSlice'
import { isEmptyObject } from 'app/auth/store/commonMethods'
import { setShowChangePass } from 'app/auth/store/commonData'
import {
  changeshowAddItem,
  changeshowAddRegister,
  changeshowAddModule
} from 'app/auth/store/sharedData'

function useForceUpdate () {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

function FuseShortcuts (props) {
  const dispatch = useDispatch()
  const shortcuts =
    useSelector(({ auth }) =>
      auth.user.data && auth.user.data.shortcuts ? auth.user.data.shortcuts : []
    ) || []
  const role = useSelector(({ auth }) =>
    auth.user.roleid ? auth.user.roleid : 0
  )
  const navigation = useSelector(selectFlatNavigation)
  const forceUpdate = useForceUpdate()

  const searchInputRef = useRef(null)
  const [addMenu, setAddMenu] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [settings, setSettings] = useState(null)
  const [getMenus, setMenus] = useState([])
  const [settingBgColor, setSettingBgColor] = useState('')
  // const shortcutItems = shortcuts
  //   ? shortcuts.map((id) => navigation.find((item) => item.id === id))
  //   : [];

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      const shortss = dispatch(assignTiesto(navigation, true))
      if (
        shortss &&
        !isEmptyObject(shortss) &&
        shortss.shorts &&
        shortss.shorts.length > 0
      ) {
        const shortcutItems = shortss.shorts
          ? shortss.shorts.map(id => navigation.find(item => item.id === id))
          : []
        const agreedMenus = shortcutItems.map(e => {
          return {
            auth: e.auth,
            icon: e.icon,
            id: e.id,
            title: e.title,
            type: e.type,
            url: e.url,
            bgColor: window.location.pathname == e.url ? 'rgb(209 209 209)' : ''
          }
        })
        setMenus(agreedMenus)
        const matchSettingUrl =
          agreedMenus.filter(
            qw =>
              qw.id == Menus.USERS ||
              qw.id == Menus.NOTIFICATION ||
              qw.id == Menus.NOTIFYASSIGN
          ).length > 0
            ? agreedMenus.filter(
                qw =>
                  qw.id == Menus.USERS ||
                  qw.id == Menus.NOTIFICATION ||
                  qw.id == Menus.NOTIFYASSIGN
              )[0].url
            : ''
        setSettingBgColor(
          window.location.pathname == matchSettingUrl ? 'rgb(209 209 209)' : ''
        )
      } else {
        setMenus([])
      }
    }

    return () => (mounted = false)
  }, [role])

  const settingClick = (event, id) => {
    let data = [...getMenus]
    data.map(ww => (ww.bgColor = ''))
    setMenus(getMenus)
    forceUpdate()
    setSettingBgColor('rgb(209 209 209)')
    setSettings(event.currentTarget)
  }

  const settingClose = () => {
    setSettings(null)
  }

  function addMenuClick (event) {
    setAddMenu(event.currentTarget)
  }

  function addMenuClose () {
    setAddMenu(null)
  }

  function search (ev) {
    const newSearchText = ev.target.value

    setSearchText(newSearchText)

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(
        navigation.filter(item =>
          item.title.toLowerCase().includes(newSearchText.toLowerCase())
        )
      )
      return
    }
    setSearchResults(null)
  }

  function toggleInShortcuts (id) {
    let newShortcuts = [...shortcuts]
    newShortcuts = newShortcuts.includes(id)
      ? newShortcuts.filter(_id => id !== _id)
      : [...newShortcuts, id]
    dispatch(updateUserShortcuts(newShortcuts))
  }

  function ShortcutMenuItem ({ item, onToggle }) {
    return (
      <Link to={item.url} role='button'>
        <MenuItem key={item.id}>
          <ListItemIcon className='min-w-40'>
            {item.icon ? (
              <Icon>{item.icon}</Icon>
            ) : (
              <span className='text-20 font-semibold uppercase text-center'>
                {item.title[0]}
              </span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={ev => {
              ev.preventDefault()
              ev.stopPropagation()
              onToggle(item.id)
            }}
            size='large'
          >
            <Icon color='action'>
              {shortcuts.includes(item.id) ? 'star' : 'star_border'}
            </Icon>
          </IconButton>
        </MenuItem>
      </Link>
    )
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 }
  }

  function checkSetBgColor (e) {
    if (e.id && e.id == 'userregister') dispatch(changeshowAddRegister(true))
    else if (e.id && e.id == 'itemcreate') dispatch(changeshowAddItem(true))
    else if (e.id && e.id == 'modulecreate') dispatch(changeshowAddModule(true))
    setSettingBgColor('')
    let data = [...getMenus]
    data.map(ww => (ww.bgColor = ''))
    data.filter(qq => qq.id == e.id)[0].bgColor = 'rgb(209 209 209)'
    setMenus(getMenus)
    forceUpdate()
  }

  return (
    <div
      className={clsx(
        'flex flex-1',
        props.variant === 'vertical' && 'flex-col flex-grow-0 flex-shrink',
        props.className
      )}
    >
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className={clsx(
          'flex flex-1',
          props.variant === 'vertical' && 'flex-col'
        )}
      >
        {getMenus.map(_item => {
          return (
            _item && (
              <Link to={_item.url} key={_item.id} role='button'>
                <Tooltip
                  title={_item.title}
                  placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
                >
                  <IconButton
                    className='w-40 h-40 p-0'
                    style={{ background: _item.bgColor }}
                    component={motion.div}
                    variants={item}
                    size='large'
                    onClick={() => checkSetBgColor(_item)}
                  >
                    {_item.icon ? (
                      <Icon>{_item.icon}</Icon>
                    ) : (
                      <span className='text-20 font-semibold uppercase'>
                        {_item.title[0]}
                      </span>
                    )}
                  </IconButton>
                </Tooltip>
              </Link>
            )
          )
        })}
      </motion.div>
    </div>
  )
}

FuseShortcuts.propTypes = {}
FuseShortcuts.defaultProps = {
  variant: 'horizontal'
}

export default memo(FuseShortcuts)
