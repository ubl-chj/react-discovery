import {createStyles, makeStyles, Theme} from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import {FacetViewSwitcher} from "./FacetViewSwitcher"
import Grid from "@material-ui/core/Grid"
import {GroupSelectedFilters} from "./GroupSelectedFilters"
import {HitStats} from "./HitStats"
import {Pagination} from "./Pagination"
import React from "react"
import {SortingSelector} from "./SortingSelector"
import {TabsAppBar} from "./TabsAppBar"
import {getHits} from "@react-discovery/solr"

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    gridActions: {
      alignItems: 'center',
      marginTop: '50px',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const MinWidthResultsGrid = () => {
  const classes: any = useStyles({})
  const hits = getHits()
  return (
    <Grid
      item xs={12}
    >
      <Grid
        className={classes.gridActions}
        container
        direction="row"
      >
        <HitStats/>
        <SortingSelector/>
      </Grid>
      <Grid
        container
        direction="row"
      >
        <GroupSelectedFilters/>
      </Grid>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="center"
      >
        <Pagination/>
      </Grid>
      <Grid
        className={classes.gridContent}
      >
        {hits ?
          <>
            <TabsAppBar/>
            <FacetViewSwitcher/>
          </> : <CircularProgress className={classes.progress}/>}
      </Grid>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="center"
      >
        <Pagination/>
      </Grid>
    </Grid>
  )
}
