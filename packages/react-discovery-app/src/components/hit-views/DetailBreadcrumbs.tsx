import {Breadcrumbs, Typography} from "@material-ui/core"
import React, {ReactElement} from "react"
import {setQueryInput, setSelectedFilters, setStart} from "@react-discovery/solr"
import {Link} from 'react-navi'
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

export const DetailBreadcrumbs: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation('vocab')
  const dispatch = useDispatch()

  const handleClick = () => {
    const filters = []
    dispatch(setQueryInput({stringInput: null}))
    dispatch(setStart({start: 0}))
    dispatch(setSelectedFilters({field: 'type_s', filters}))
  }

  return (
    <Breadcrumbs
      aria-label="search"
      component='nav'
    >
      <Link
        href='/'
        onClick={handleClick}
      >
        {t('search')}
      </Link>
      <Link
        href='/'
      >
        {t('result')}
      </Link>
      <Typography color="textPrimary" style={{display: 'flex'}}>
        {t('details')}
      </Typography>
    </Breadcrumbs>
  )
}
