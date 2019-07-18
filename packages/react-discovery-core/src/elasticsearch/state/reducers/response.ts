import {IAggregations, IHit, IHits, IResponse} from "../../.."
import {fetchElasticSearchResponse} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

const initialState: IResponse = {
  aggregations: null,
  hits: null,
  url: null,
}

const buildInnerHitHighlight = (highlight) => {
  const ihHighlight = Object.entries(highlight).map(([k, v]) => {
    const field = k.split('.').pop()
    return {
      [field]: v[0]
    }
  })
  return ihHighlight[0]
}

const buildInnerHits = (hit): IHit[] => {
  const ih = Object.keys(hit.inner_hits).map((key): any => {
    return hit.inner_hits[key].hits.hits.map((hit) => {
      return {
        _source: hit._source,
        field: key,
        highlighting: buildInnerHitHighlight(hit.highlight),
        id: hit._id,
      }
    })
  })
  return [].concat(...ih)
}

const buildDocs = (result): IHit[] => {
  return result.hits.hits.map((hit): IHit => {
    return {
      _source: hit._source,
      highlighting: hit.highlight || {},
      id: hit._id,
      innerHits: hit.inner_hits ? buildInnerHits(hit) : [],
    }
  })
}

const buildHits = (result): IHits => {
  return {
    hits: result.hits && result.hits.hits ? buildDocs(result) : [],
    numFound: result.hits ? result.hits.total.value : null,
  }
}

export const response = reducerWithInitialState(initialState)
  .case(fetchElasticSearchResponse.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchElasticSearchResponse.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    aggregations: result.aggregations ? result.aggregations : state.aggregations,
    hits: buildHits(result),
    updating: false,
    url: params.url,
  }))
  .case(fetchElasticSearchResponse.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))
