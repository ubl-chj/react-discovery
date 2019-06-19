import {AppBar, Tab, Tabs, Theme, makeStyles} from '@material-ui/core'
import {
  FieldConstants,
  SolrParameters,
  getDocTypes,
  getFilters,
  getPrimaryTypeField,
  getStringInput,
  setGroupField,
  setIsViewExpanded,
  setSelectedFilters, setStart, setSuggest, setTypeDef, usePrevious
} from "@react-discovery/solr"
import React, {ReactElement, useEffect} from 'react'
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const typeField = FieldConstants.TYPE_FIELD

export const useTabsAppBarStyles = makeStyles((theme: Theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export const TabsAppBar: React.FC<any> = (): ReactElement => {
  const classes: any = useTabsAppBarStyles({})
  const dispatch = useDispatch()
  const docTypes = getDocTypes()
  const stringInput = getStringInput()
  const filters = getFilters()
  const prevFilters = usePrevious(filters)
  const primaryTypeField = getPrimaryTypeField()
  const {t} = useTranslation('vocab')
  const [value, setValue] = React.useState(0)
  const docTypesKeys = docTypes.reduce((accumulator, currentValue): string[] => {
    return [...accumulator, currentValue.key];
  }, [])
  const docTypesGroupFields = docTypes.reduce((accumulator, currentValue): string[] => {
    return [...accumulator, currentValue.groupField];
  }, [])

  useEffect((): void => {
    const [typeFilter] = filters[typeField]
    if (prevFilters !== filters && typeFilter !== docTypesKeys[value]) {
      const index = typeFilter ? docTypesKeys.indexOf(typeFilter) : 0
      setValue(index)
    }
  }, [docTypesKeys, filters, prevFilters, setValue, value])

  const handleChange = ({}: React.ChangeEvent<{}>, newValue: number): void => {
    const typeObject = docTypes[newValue]
    const groupField = docTypesGroupFields[newValue]
    const newFilters = typeObject.key ? Array.of(typeObject.key) : []
    dispatch(setSuggest({stringInput, suggest: false}))
    dispatch(setSelectedFilters({field: typeField, filters: newFilters}))
    dispatch(setIsViewExpanded({isViewExpanded: false}))
    dispatch(setStart({start: 0}))
    dispatch(setGroupField({groupField}))
    // fix this
    if (newFilters.includes(primaryTypeField)) {
      dispatch(setTypeDef({typeDef: SolrParameters.LUCENE}))
    } else {
      dispatch(setTypeDef({typeDef: SolrParameters.EDISMAX}))
    }
    setValue(newValue)
  }

  const buildTabs = (): ReactElement[] => {
    return docTypes.map((ft, i): ReactElement =>
      <Tab data-testid={`tab-${i}`} href='' key={i} label={t(ft.label)} />)
  }

  return docTypes ? (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Tabs
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={value}
          variant="scrollable"
        >
          {buildTabs()}
        </Tabs>
      </AppBar>
    </div>
  ) : null
}

