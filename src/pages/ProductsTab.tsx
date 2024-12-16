import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonButton,
    IonIcon,
    IonSpinner,
    IonSearchbar,
    IonToast,
    IonNote,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {heart, heartOutline} from 'ionicons/icons';
import {useWishlist} from "../context/WishlistContext";
import './ProductsTab.css';
import {extractUrl} from "../utils/formatData";

const ProductsTab: React.FC = () => {
    const history = useHistory();
    const {wishlist, toggleWishlist} = useWishlist();

    const [products, setProducts] = useState<any[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showToastApiError, setShowToastApiError] = useState<boolean>(false);
    const [showToastApiErrorMsg, setShowToastApiErrorMsg] = useState<string>("");
    const ITEMS_PER_PAGE = 10;

    // Función para cargar más productos
    const loadMoreProducts = (e: CustomEvent<void>) => {
        const nextPage = currentPage + 1;
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        const newProducts = products.slice(startIndex, endIndex);
        if (newProducts.length > 0) {
            setDisplayedProducts(prev => [...prev, ...newProducts]);
            setCurrentPage(nextPage);
        }

        (e.target as HTMLIonInfiniteScrollElement).complete();
    };

    // Modificar fetchProducts
    const fetchProducts = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.statusCode) {
                setShowToastApiError(true);
                setShowToastApiErrorMsg(data.message || "Error desconocido");
                setProducts([]);
                setDisplayedProducts([]);
            } else {
                setProducts(data);

                // Inicialmente mostrar solo los primeros ITEMS_PER_PAGE elementos
                setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            setShowToastApiError(true);
            setShowToastApiErrorMsg("Error de conexión");
            setProducts([]);
            setDisplayedProducts([]);
        }
    };

    // Cargar productos al inicio
    useEffect(() => {
        fetchProducts('https://api.escuelajs.co/api/v1/products/');
    }, []);

    // Para la búsqueda
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            fetchProducts(`https://api.escuelajs.co/api/v1/products/?title=${encodeURIComponent(searchTerm)}`);
        } else {
            fetchProducts('https://api.escuelajs.co/api/v1/products/');
        }
    }, [searchTerm]);

    // Botón de deseados
    const handleWishlistToggle = (product: any) => {
        toggleWishlist(product);
        const message = wishlist.includes(product.id) ?
            `${product.title} ha sido eliminado de deseados...` :
            `${product.title} ha sido añadido a deseados...`;
        setToastMessage(message);
        setShowToast(true);
    };

    // Detalles del producto
    const handleProductClick = (product: any) => {
        history.push(`/producto/${product.id}`, {product});
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Productos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                {/* Toast para errores de API */}
                <IonToast
                    isOpen={showToastApiError}
                    onDidDismiss={() => setShowToastApiError(false)}
                    message={`Error: ${showToastApiErrorMsg}`}
                    duration={3000}
                    color="danger"
                />

                {loading ? (
                    <div className="ion-text-center ion-padding">
                        <IonSpinner role="status"/>
                    </div>
                ) : products.length === 0 ? (
                    <>
                        <IonSearchbar
                            placeholder="Buscar por nombre"
                            showClearButton="always"
                            className="search-input"
                            value={searchTerm}
                            onIonChange={(e) => setSearchTerm(e.detail.value!)}
                        />
                        <div className="ion-text-center">
                            <p>No se encontraron productos</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="controls-container">
                            <IonSearchbar
                                placeholder="Buscar por nombre"
                                showClearButton="always"
                                className="search-input"
                                value={searchTerm}
                                onIonChange={(e) => setSearchTerm(e.detail.value!)}
                            />
                        </div>

                        <IonGrid>
                            <IonRow>
                                {displayedProducts.map((product: any) => (
                                    <IonCol
                                        size="6"
                                        sizeMd="4"
                                        sizeXs="12"
                                        key={product.id}
                                    >
                                        <IonCard button onClick={() => handleProductClick(product)}>
                                            <div className="product-image-wrapper">
                                                <IonImg
                                                    src={extractUrl(product.images[0])}
                                                    alt={product.title}
                                                    onIonError={() => {
                                                        console.log(`Error cargando imagen para ${product.title} Url: ${extractUrl(product.images[0])}`);
                                                    }}
                                                />
                                                <IonButton
                                                    className="wishlist-button"
                                                    fill="clear"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleWishlistToggle(product);
                                                    }}
                                                >
                                                    <IonIcon
                                                        icon={wishlist.includes(product.id) ? heart : heartOutline}
                                                        style={{
                                                            color: wishlist.includes(product.id) ? 'red' : 'white'
                                                        }}
                                                    />
                                                </IonButton>
                                            </div>
                                            <IonCardHeader>
                                                <IonCardTitle>{product.title}</IonCardTitle>
                                                <IonCardSubtitle>
                                                    ${product.price.toFixed(2)}
                                                </IonCardSubtitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>

                        <IonInfiniteScroll
                            onIonInfinite={(e: CustomEvent<void>) => {
                                loadMoreProducts(e);
                            }}
                            threshold="100px"
                            disabled={displayedProducts.length >= products.length}
                        >
                            <IonInfiniteScrollContent
                                loadingSpinner="bubbles"
                                loadingText="Cargando más productos..."
                            />
                        </IonInfiniteScroll>
                    </>
                )}

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    position="top"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default ProductsTab;