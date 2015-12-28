import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Immutable from 'immutable';

import reducerFactory from './Reducers';
import initialStateFactory from './State/Factory';

import TopBar from './Containers/TopBar';
import FooterBar from './Containers/FooterBar';
import ContentView from './Containers/ContentView';

import { documentManager } from './Service';
import { nodeTypeManager } from './Service/TYPO3CR';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('appContainer');

    const initialState = initialStateFactory(
        JSON.parse(appContainer.querySelector('[data-json="initialState"]').innerHTML)
    );

    const nodeTypeSchema = JSON.parse(appContainer.querySelector('[data-json="nodeTypeSchema"]').innerHTML);

    const reducers = reducerFactory(initialState);
    const store = createStore(reducers);

    nodeTypeManager.initializeWithNodeTypeSchema(nodeTypeSchema);

    ReactDOM.render(
        <div>
            <Provider store={store}>
                <div>
                    <TopBar />
                    <ContentView />
                    <FooterBar />
                </div>
            </Provider>
        </div>,
        appContainer
    );

    window['@Neos:Backend'] = {
        documentManager: documentManager(store)
    };

    window.store = store;
});
