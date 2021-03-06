import '@react-discovery/i18n'
import {AnyAction, Store, applyMiddleware, createStore} from "redux"
import {DiscoveryApp, Landing, ResultsList, Settings, Workspace} from './components'
import {Router, View} from 'react-navi'
import {getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap} from "@react-discovery/workspace"
import {mount, route} from 'navi'
import thunkMiddleware, {ThunkMiddleware} from 'redux-thunk'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {DetailView} from '@react-discovery/views'
import {ElasticSearchProvider} from "@react-discovery/core"
import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from "./state"

const detailViewActions = {
  getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap
}
const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware
const routes =
  mount({
    '/': route({
      title: "Home",
      view: <DiscoveryApp component={<Landing />}/>,
    }),
    '/detail/:collection/:id': route((req): any => {
      let id = req.params.id
      const collection = req.params.collection
      return {
        view: <DiscoveryApp component={<DetailView actions={detailViewActions} collection={collection} id={id}/>}/>,
      }
    }),
    '/search/:collection': route({
      title: "React Discovery",
      view: <DiscoveryApp component={<ResultsList />}/>,
    }),
    '/settings': route((): any => {
      return {
        view: <DiscoveryApp component={<Settings />}/>,
      }
    }),
    '/workspace': route((): any => {
      return {
        view: <DiscoveryApp component={<Workspace />}/>,
      }
    })
  })

const store: Store = createStore(
  rootReducer(),
  ((window as any).Cypress && (window as any).initialState),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  ),
)

const client = new ApolloClient({
  uri: 'https://apollo.iiif.cloud'
});

ReactDOM.render(
  <Router routes={routes}>
    <Provider store={store}>
      <ElasticSearchProvider
        useHistory={true}
      >
        <ApolloProvider client={client}>
          <View/>
        </ApolloProvider>
      </ElasticSearchProvider>
    </Provider>
  </Router>,
  document.getElementById("app")
)

if ((window as any).Cypress) {
  (window as any).store = store
}
