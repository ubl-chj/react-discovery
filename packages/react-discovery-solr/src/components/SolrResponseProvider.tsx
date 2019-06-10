import React, {ReactElement, useEffect, useState} from "react"
import {fetchSolrResponseWorker, fetchSolrSuggestionsWorker, getFilters, getRootContext, getSelectedIndex, getSize, getSortFields,
  getStart, getStringInput, getSuggest, setQueryFields, setSelectedIndex} from "../state"
import {queryBuilder, suggestQueryBuilder} from "../query-builders"
import {useCurrentRoute, useNavigation} from 'react-navi'
import {IQuery} from ".."
import {getInitialQuery} from "../state/selectors"
import {stringify} from 'query-string'
import {useDispatch} from 'react-redux'
import {usePrevious} from "../hooks"

export const SolrResponseProvider: React.FC<any> = (props): ReactElement => {
  const rootContext = getRootContext()
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const urlStart = route.url.query.start ? Number.parseInt(route.url.query.start) : 0
  const qString = {
    start: urlStart,
    stringInput: route.url.query.q ? route.url.query.q : null
  }
  const start = getStart()
  const query: IQuery = getInitialQuery()
  const dispatch = useDispatch()
  const stringInput = getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const selectedIndex = getSelectedIndex()
  const prevSelectedIndex = usePrevious(selectedIndex)
  const size = getSize()
  const suggest = getSuggest()
  const filters = getFilters()
  const prevFilters = usePrevious(filters)
  const sortFields = getSortFields()
  const prevSortFields = usePrevious(sortFields)
  const [isInitialized, setIsInitialized] = useState(false)

  const pushHistory = (): any => {
    const search = (stringInput && start) ? {
      q: stringInput,
      start
    } : !start && stringInput ? {q: stringInput} : start ? {start} : null

    const url = {
      pathname: rootContext,
      search: `?${stringify(search)}`,
    }
    navigation.navigate(url)
  }

  const fetchResponse = (requestURI): boolean => {
    dispatch(fetchSolrResponseWorker({requestURI}))
    return true
  }

  const fetchSuggestions = (requestURI): boolean => {
    dispatch(fetchSolrSuggestionsWorker({requestURI}))
    return true
  }

  useEffect((): void => {
    if (!isInitialized) {
      const mergedQuery = {...query, ...qString}
      dispatch(setQueryFields({...mergedQuery}))
      const currentPage = urlStart ? urlStart / size : 0
      dispatch(setSelectedIndex({selectedIndex: currentPage}))
      const responseRequestURI = queryBuilder({...mergedQuery})
      fetchResponse(responseRequestURI)
      setIsInitialized(true)
    }
    if (isInitialized) {
      if (prevSelectedIndex !== selectedIndex || prevStringInput !== stringInput
        || prevFilters !== filters || prevSortFields !== sortFields) {
        pushHistory()
        const responseRequestURI = queryBuilder({...query})
        fetchResponse(responseRequestURI)
        console.log('did update')
      }
    }

    if (suggest && prevStringInput !== stringInput) {
      const suggestionsRequestURI = suggestQueryBuilder({...query})
      fetchSuggestions(suggestionsRequestURI)
    }
  }, [fetchResponse, fetchSuggestions, isInitialized, prevSelectedIndex, selectedIndex, prevStringInput,
    pushHistory, prevFilters, filters, prevSortFields, sortFields, qString, query, stringInput])

  return (
    <>
      {props.children}
    </>
  )
}

