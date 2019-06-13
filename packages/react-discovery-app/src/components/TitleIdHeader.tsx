import {Link, useCurrentRoute} from 'react-navi'
import React, {ReactElement} from "react"
import {CardHeader} from "@material-ui/core"
import {InnerHtmlValue} from "./InnerHtmlValue"
import {setStart} from "@react-discovery/solr"
import {useDispatch} from 'react-redux'

interface ITitleIdHeader {
  title: string;
  id: string;
}
export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, title} = props
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setStart({start: 0}))
  }
  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === '/') {
      return (
        <div style={{display: 'flex'}}>
          <Link
            href={`detail/${id}`}
            onClick={handleClick}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
        </div>
      )
    } else {
      return (
        <div style={{display: 'flex'}}>
          <Link href={`/?q=${id}`}>
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
        </div>
      )
    }
  }

  return (
    buildTitleHeaderForPathName()
  )
}
