import {Card, CardContent} from "@material-ui/core"
import {FieldValueDisplay, Thumbnail, TitleIdHeader, buildHighlightedValueForHit} from '@react-discovery/components'
import {IHit, ISearchField, getSearchFields} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {Domain} from '../../enum'
import {useHitViewStyles} from '.'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = getSearchFields()
  const {hit, i} = props
  const {_source} = hit
  const title = buildHighlightedValueForHit('title', hit)
  const thumbnail = _source && _source.thumbnail + Domain.THUMBNAIL_API_REQUEST
  return (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={thumbnail}/>
        <div className={classes.details}>
          {searchFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >{hit._source && hit._source[field.field] ?
                <FieldValueDisplay field={field} hit={hit}/> : null}
            </CardContent>)}
        </div>
      </div>
    </Card>
  )
}

export default DefaultHitComponent
