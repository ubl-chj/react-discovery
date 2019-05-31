import {ExpertSearchBox, LanguageSelectionMenu, ProfileMenu, SearchBox, SearchSettingsMenu} from '.'
import React, {ReactElement} from 'react'
import {SolrParameters, getTypeDef} from "@react-discovery/solr"
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Bookmark from '@material-ui/icons/Bookmark'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme): any => ({
  colorPrimary: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
  },
  grow: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: '1000'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

export const SearchAppBar: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const typeDef = getTypeDef()

  return (
    <div className={classes.grow}>
      <AppBar
        className={classes.colorPrimary}
        position="static"
      >
        <Toolbar
          variant="dense"
        >
          <IconButton
            aria-label="Open drawer"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            href=''
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            noWrap variant="subtitle2"
          >
            Discovery App
          </Typography>
          {typeDef === SolrParameters.EDISMAX ? <SearchBox/> : <ExpertSearchBox/>}
          <div className={classes.sectionDesktop}>
            <SearchSettingsMenu/>
            <LanguageSelectionMenu/>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              href=''
            >
              <Badge
                badgeContent={4}
                color="secondary"
              >
                <Bookmark/>
              </Badge>
            </IconButton>
            <ProfileMenu/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

