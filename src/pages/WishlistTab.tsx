import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonImg,
    IonText,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
} from '@ionic/react';
import { trashBin } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../utils/wishlistStorage';
import './WishlistTab.css';
import { useWishlist } from "../context/WishlistContext";
import {cleanImageUrls} from "../utils/formatData";

const WishlistTab: React.FC = () => {
    const { wishlist: wishlistIds, updateWishlist } = useWishlist();
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<string>('name');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const history = useHistory();

    // Actualizar la lista de deseados
    useEffect(() => {
        const fullWishlist = getWishlist().filter((product: any) =>
            wishlistIds.includes(product.id)
        );

        const uniqueWishlist = fullWishlist.filter(
            (item: any, index: number, self: any[]) =>
                index === self.findIndex((t) => t.id === item.id)
        );

        setWishlist(uniqueWishlist);
    }, [wishlistIds]);

    const handleRemove = (id: number) => {
        removeFromWishlist(id);
        updateWishlist();
    };

    const sortWishlist = (wishlist: any[], criterion: string) => {
        switch (criterion) {
            case 'name':
                return [...wishlist].sort((a, b) => a.title.localeCompare(b.title));
            case 'price':
                return [...wishlist].sort((a, b) => a.price - b.price);
            case 'date':
                return [...wishlist].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
            default:
                return wishlist;
        }
    };

    const filteredWishlist = wishlist.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedWishlist = sortWishlist(filteredWishlist, sortBy);

    const handleProductClick = (product: any) => {
        history.push(`/producto/${product.id}`, { product });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Productos deseados</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {wishlist.length === 0 ? (
                    <IonText className="ion-text-center">
                        <h6>No existen productos en la lista de deseados.</h6>
                    </IonText>
                ) : (
                    <>
                        <div className="controls-container">
                            <IonSearchbar
                                value={searchQuery}
                                placeholder="Buscar por nombre"
                                onIonChange={(e) => setSearchQuery(e.detail.value!)}
                                showClearButton="always"
                                className="search-input"
                            />
                            {
                                sortedWishlist.length > 1 && (
                                    <div className="sort-container-wrapper">
                                        <div className="sort-container">
                                            <IonLabel>Ordenar por:</IonLabel>
                                            <IonSelect
                                                value={sortBy}
                                                placeholder="Seleccionar"
                                                onIonChange={(e) => setSortBy(e.detail.value)}
                                            >
                                                <IonSelectOption value="name">Nombre</IonSelectOption>
                                                <IonSelectOption value="price">Precio</IonSelectOption>
                                                <IonSelectOption value="date">Fecha agregado</IonSelectOption>
                                            </IonSelect>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <IonList>
                            {sortedWishlist.map((product: any, index: number) => (
                                <IonItem key={product.id || index}>
                                    <IonImg
                                        src={cleanImageUrls(product.images)}
                                        style={{
                                            width: '90px',
                                            height: '90px',
                                            objectFit: 'cover',
                                            marginRight: '10px',
                                            borderRadius: '5px',
                                        }}
                                        onClick={() => handleProductClick(product)}
                                    />
                                    <IonLabel
                                        onClick={() => handleProductClick(product)}
                                    >
                                        <h2><strong>{product.title}</strong></h2>
                                        <p>$ {product.price.toFixed(2)}</p>
                                        <p style={{fontSize: '0.8rem', color: 'gray'}}>
                                            Agregado el: {new Date(product.addedAt).toLocaleString()}
                                        </p>
                                    </IonLabel>

                                    <IonButton
                                        color="danger"
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        <IonIcon slot="icon-only" icon={trashBin}/>
                                    </IonButton>
                                </IonItem>
                            ))}
                        </IonList>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WishlistTab;