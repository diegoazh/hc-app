import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

import { Menu } from './components';
import { initStorage } from './hooks';
import { CreatePet, PetList } from './pages';

/* Theme variables */
import 'animate.css';
import './theme/tailwind.css';
import './theme/variables.css';

import './App.scss';

setupIonicReact();
initStorage();

const routes: { path: string; exact: boolean; component: React.ReactNode }[] = [
  { path: '/adoption', exact: true, component: <PetList /> },
  { path: '/create', exact: true, component: <CreatePet /> },
];

export const App: React.FC = () => {
  const RouteNodes = routes.map(({ path, exact, component }, index) => (
    <Route path={path} exact={exact} key={index}>
      {component}
    </Route>
  ));

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/adoption" />
            </Route>
            {RouteNodes}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};
