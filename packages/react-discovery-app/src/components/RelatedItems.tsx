import {Button, Theme, createStyles, makeStyles} from "@material-ui/core"
import {Link, useCurrentRoute} from "react-navi"
import React, {ReactElement} from "react"
import {
  SolrParameters,
  setGroupField,
  setQueryInput,
  setSelectedFilters,
  setStart,
  setTypeDef
} from "@react-discovery/solr"

import MuiLink from '@material-ui/icons/Link';
import clsx from 'clsx';
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

interface IRelatedItems {
  id: string;
  primaryDocFilter: string;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export const RelatedItems: React.FC<IRelatedItems> = (props): ReactElement => {
  const dispatch = useDispatch()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const classes: any = useStyles({});
  const {id, primaryDocFilter} = props
  const filters = primaryDocFilter ? [primaryDocFilter] : []
  const {t} = useTranslation('vocab')

  const handleChange = (): void => {
    dispatch(setQueryInput({stringInput: id}))
    dispatch(setSelectedFilters({field: 'type_s', filters}))
    dispatch(setStart({start: 0}))
    dispatch(setGroupField({groupField: ''}))
    dispatch(setTypeDef({typeDef: SolrParameters.LUCENE}))
  }

  const handleContextReset = (): void => {
    dispatch(setQueryInput({stringInput: id}))
    dispatch(setSelectedFilters({field: 'type_s', filters: []}))
    dispatch(setStart({start: 0}))
    dispatch(setGroupField({groupField: ''}))
  }

  const buildRelatedItemsForPathName = (): ReactElement => {
    if (pathname === '/') {
      return (
        <Button
          className={classes.button}
          data-testid='relations'
          href=''
          onClick={handleChange}
          size="small"
          variant="contained"
        >
          <MuiLink className={clsx(classes.leftIcon, classes.iconSmall)} />
          {t('relations')}
        </Button>
      )
    } else {
      return (
        <Button
          className={classes.button}
          data-testid='relations'
          href=''
          onClick={handleContextReset}
          size="small"
          variant="contained"
        >
          <Link href={`/?q=${id}`}>
            {t('relations')}
          </Link>
        </Button>
      )
    }
  }

  return buildRelatedItemsForPathName()
}
