import React, {ReactElement} from "react"
import {SolrParameters, getRootContext, setQueryInput, setStart, setTypeDef} from "@react-discovery/solr"
import {IconButton} from "@material-ui/core"
import {Redo} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import {useNavigation} from 'react-navi'
import {useResetButtonStyles} from "../styles"

export const ResetButton: React.FC<any> = (): ReactElement => {
  const classes: any = useResetButtonStyles({})
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const rootContext = getRootContext()
  const handleChange = (): void => {
    dispatch(setQueryInput({stringInput: ''}))
    dispatch(setStart({start: 0}))
    dispatch(setTypeDef({typeDef: SolrParameters.EDISMAX}))
    navigation.navigate(rootContext)
  }

  return (
    <IconButton
      className={classes.menuButton}
      color="inherit"
      data-testid='reset'
      href=''
      onClick={handleChange}
    >
      <Redo/>
    </IconButton>
  )
}
