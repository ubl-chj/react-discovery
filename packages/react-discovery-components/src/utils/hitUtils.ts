import {FieldConstants} from '@react-discovery/solr'

const typeField = FieldConstants.TYPE_FIELD

export const buildHighlightedValueForHit = (field, hit): string => {
  const {_source, highlighting} = hit
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  return [].concat(source[field] || null).filter((v): any => v !== null).join(", ");
}

export const buildDateFormat = (field, hit): string => {
  const {_source, highlighting} = hit
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  const date = source[field] && new Date(source[field])
  return date ? `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}` : null
}

export const buildEntityCountForType = (entities, type): number => {
  return entities && entities.filter((entity): boolean => entity[typeField] === type).length
}

export const getTypeForId = (hit, id): string => {
  const {_source} = hit
  if (_source.id === id) {
    return _source[typeField]
  }
}
