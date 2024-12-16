export const getWishlist = () => {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
};

export const addToWishlist = (product: any) => {
    const wishlist = getWishlist();

    const isProductInWishlist = wishlist.some((item: { id: any; }) => item.id === product.id);

    if (!isProductInWishlist) {
        wishlist.push({
            ...product,
            addedAt: new Date().toISOString(), // Fecha de agregado
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
};


export const removeFromWishlist = (id: number) => {
    const existingWishlist = getWishlist();
    const updatedWishlist = existingWishlist.filter((item: any) => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
};
