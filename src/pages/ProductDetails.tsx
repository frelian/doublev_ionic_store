import React, {useState} from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonText,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonBadge,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import {useLocation} from 'react-router-dom';
import {pricetag} from 'ionicons/icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay} from 'swiper/modules';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductDetails.css';
import {cleanImageUrls} from "../utils/formatData";

const ProductDetails: React.FC = () => {
    const location = useLocation<{ product: any }>();
    const product = location.state?.product;
    const [activeIndex, setActiveIndex] = useState(0);

    if (!product) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/productos" data-testid="back-button" />
                        </IonButtons>
                        <IonTitle>Detalles</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonText className="ion-padding">Producto no encontrado.</IonText>
                </IonContent>
            </IonPage>
        );
    }

    // Limpia las URLs de imágenes
    const cleanedImages = cleanImageUrls(product.images);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/productos"/>
                    </IonButtons>
                    <IonTitle>Detalles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            <IonCard className="product-details-card">

                                <IonText color="dark">
                                    <h4 className="product-title">{product.title}</h4>
                                </IonText>

                                <div style={{position: 'relative'}}>
                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true
                                        }}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                        style={{
                                            height: '350px',
                                            width: '100%',
                                        }}
                                    >
                                        {cleanedImages.map((image: string, index: number) => (
                                            <SwiperSlide key={index + "a1"}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '100%',
                                                    padding: '20px'
                                                }}>
                                                    <IonImg
                                                        src={image}
                                                        alt={`${product.title} - Image ${index + 1}`}
                                                        style={{
                                                            maxHeight: '300px',
                                                            objectFit: 'contain',
                                                            maxWidth: '100%'
                                                        }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Indicador del slider */}
                                {cleanedImages.length >= 2 && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '5px'
                                    }}>
                                        {cleanedImages.map((_: any, index: number) => (
                                            <div
                                                key={index}
                                                onClick={() => setActiveIndex(index)}
                                                style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    backgroundColor: index === activeIndex ? '#007bff' : '#e0e0e0',
                                                    margin: '0 5px',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                <IonCardHeader>
                                    <IonBadge color="light" style={{fontSize: '1.3em'}}>
                                        <IonIcon icon={pricetag}/> $ {product.price.toFixed(2)}
                                    </IonBadge>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonCardSubtitle
                                        className="ion-padding-bottom"
                                        style={{
                                            fontSize: '1.2em',
                                            color: '#333',
                                            marginTop: '12px'
                                        }}
                                    >
                                        Descripción
                                    </IonCardSubtitle>
                                    <IonText>
                                        <p className="">
                                            {product.description}
                                        </p>
                                    </IonText>

                                    {/* Mostrar categoría como un badge */}
                                    {product.category && (
                                        <div className="ion-padding-top">
                                            <IonBadge color="light" style={{fontSize: '1em'}}>
                                                {product.category.name}
                                            </IonBadge>
                                        </div>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ProductDetails;