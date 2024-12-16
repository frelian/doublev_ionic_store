import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AboutTab.css';
import React from "react";

const AboutTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Acerca de</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="about-content">
                <div className="about-container">
                    <IonCard className="centered-card">
                        <IonCardHeader>
                            <IonCardTitle><strong>About</strong></IonCardTitle>
                            <IonCardSubtitle>Julian Niño</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            Aplicación Ionic V8 con React.

                            <IonList>
                                <IonListHeader>
                                    <IonLabel><strong>Funcionalidades</strong></IonLabel>
                                </IonListHeader>
                                <IonItem>
                                    <IonLabel>Consumo de APIs</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Listado de productos</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Productos deseados</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Lazy loading</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Test unitarios</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>

                    <ExploreContainer name="Platzi Fake Store API" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AboutTab;