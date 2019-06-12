import {
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core"
import {Domain, useHitViewStyles} from '.'
import {
  EntityDisplay,
  FieldLabel,
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  ViewSwitcherToggle,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields, personDisplayFields
} from '..'
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

// TODO add this to configuration
const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('titel_t', hit)
  const id = hit && hit._source.id
  const buildFieldValueDisplay = (field): ReactElement => {
    return (
      <>
        <FieldLabel label={field.label}/>
        <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
      </>)
  }

  return hit ? (
    <Card className={classes.root} key={i}>
      <ViewSwitcherToggle id={id}/>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
        <div className={classes.details}>
          <ValueDisplay
            field={'subtitel_t'}
            hit={hit}
            style={{display: 'flex', padding: '10px'}}
            variant='h6'
          />
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >{hit._source && hit._source[field.field] ?
                buildFieldValueDisplay(field) : null}
            </CardContent>)}
          <CardActions disableSpacing>
            <EntityDisplay
              displayFields={digitalisatDisplayFields}
              hit={hit}
              type={Domain.DIGITALISAT}
            />
          </CardActions>
          <CardActions disableSpacing>
            <EntityDisplay
              displayFields={beschreibungDisplayFields}
              hit={hit}
              isNested={true}
              nestedDisplayFields={facetDisplayFields}
              type={Domain.BESCHREIBUNG}
            />
          </CardActions>
          <CardActions disableSpacing>
            <EntityDisplay
              displayFields={personDisplayFields}
              hit={hit}
              type={Domain.PERSON}
            />
          </CardActions>
          <CardActions disableSpacing>
            <EntityDisplay
              displayFields={annotationDisplayFields}
              hit={hit}
              type={Domain.ANNOTATION}
            />
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default KulturobjektExpanded
