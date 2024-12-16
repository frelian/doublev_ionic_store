import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import { listOutline } from 'ionicons/icons';
import { heartOutline } from 'ionicons/icons';
import { informationCircleOutline } from 'ionicons/icons';
import ProductsTab from './pages/ProductsTab';
import WishlistTab from "./pages/WishlistTab";
import AboutTab from './pages/AboutTab';
import ProductDetails from './pages/ProductDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import {WishlistProvider} from "./context/WishlistContext";

setupIonicReact();

const App: React.FC = () => (
    <WishlistProvider>
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/productos" component={ProductsTab}/>
                        <Route exact path="/deseados" component={WishlistTab}/>
                        <Route exact path="/acercade" component={AboutTab}/>

                        <Route exact path="/producto/:id" component={ProductDetails}/>

                        <Route exact path="/" render={() => <Redirect to="/productos"/>}/>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="productos" href="/productos">
                            <IonIcon aria-hidden="true" icon={listOutline}/>
                            <IonLabel>Productos</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="deseados" href="/deseados">
                            <IonIcon aria-hidden="true" icon={heartOutline}/>
                            <IonLabel>Deseados</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="acercade" href="/acercade">
                            <IonIcon aria-hidden="true" icon={informationCircleOutline}/>
                            <IonLabel>Acerca de</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    </WishlistProvider>
);

export default App;