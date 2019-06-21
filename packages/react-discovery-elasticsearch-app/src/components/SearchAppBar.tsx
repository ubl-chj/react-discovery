import {AppBar, Badge, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Bookmark, Menu} from '@material-ui/icons'
import {
  IOverridableStyledComponent,
  LanguageSelectionMenu,
  ProfileMenu,
  ResetButton,
  SearchBox,
  SearchSettingsMenu,
  useSearchAppBarStyles
} from '@react-discovery/components'
import React, {ReactElement} from 'react'

export const SearchAppBar: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useSearchAppBarStyles({})

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
            <Menu />
          </IconButton>
          <Typography
            className={classes.title}
            noWrap variant="subtitle2"
          >
            Discovery App
          </Typography>
          <SearchBox/>
          <div className={classes.sectionDesktop}>
            <ResetButton/>
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
