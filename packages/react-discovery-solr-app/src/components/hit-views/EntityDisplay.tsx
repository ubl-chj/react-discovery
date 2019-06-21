import {Book, ChatBubble, ExpandMore, Image, Person} from "@material-ui/icons"
import {
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  Typography,
} from "@material-ui/core"
import {Domain, IDisplayField, NestedEntityDisplay, useHitViewStyles} from '.'
import {FieldConstants, IHit} from "@react-discovery/solr"
import {FieldLabel, InnerHtmlValue, buildEntityCountForType} from "@react-discovery/components"
import React, {Fragment, ReactElement} from "react"
import {useTranslation} from "react-i18next"

interface IEntityDisplay {
  displayFields: IDisplayField[];
  hit: IHit;
  isNested?: boolean;
  nestedDisplayFields?: IDisplayField[];
  type: string;
}

const typeField = FieldConstants.TYPE_FIELD

export const EntityDisplay: React.FC<IEntityDisplay> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {displayFields, hit, isNested, nestedDisplayFields, type} = props
  const [isExpanded, setExpanded] = React.useState(true);
  const {t} = useTranslation('vocab')
  const entities = hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity[typeField] === type)
  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }

  const buildEntityIcon = (type): ReactElement => {
    switch (type) {
      case Domain.ANNOTATION:
        return <ChatBubble fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
      case Domain.BESCHREIBUNG:
        return <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
      case Domain.DIGITALISAT:
        return <Image fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
      case Domain.PERSON:
        return <Person fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
    }
  }

  const buildEntityFields = (entityFields, type): ReactElement[] => {
    return entities && entities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
          <Card className={classes.root}>
            <div style={{display: 'flex'}}>
              {buildEntityIcon(type)}
              <div>
                {entityFields.map((field, i): ReactElement => {
                  const value = [].concat(entity[field.field] || null).filter((v): any => v !== null).join(", ")
                  return (
                    <Fragment key={i}>
                      <CardContent
                        className={classes.content}
                        key={i}
                      >
                        <FieldLabel label={field.label}/>
                        <div style={{flex: 'auto'}}>
                          <Typography
                            className={classes.inline}
                            color="textSecondary"
                            component="span"
                          >
                            <InnerHtmlValue value={value}/>
                          </Typography>
                        </div>
                      </CardContent>
                      {isNested ?
                        <NestedEntityDisplay
                          displayFields={nestedDisplayFields}
                          entity={entity}
                          type={Domain.FASZIKEL}
                        /> : null}
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>)
    })
  }

  return (
    <ExpansionPanel
      TransitionProps={{ unmountOnExit: true }}
      defaultExpanded={Boolean(true)}
      expanded={Boolean(isExpanded)}
      onChange={handleExpandClick}
    >
      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        classes={{
          expanded: classes.expanded,
          root: classes.expansionSummaryRoot}}
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography
          className={classes.heading}>
          {t(type)} <i>({buildEntityCountForType(entities, type)})</i>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav">
          {buildEntityFields(displayFields, type)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

