import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getWishlist, removeFromWishlist, addToWishlist } from '../utils/wishlistStorage';

interface WishlistContextType {
    wishlist: number[];
    updateWishlist: () => void;
    toggleWishlist: (product: any) => void;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    updateWishlist: () => {},
    toggleWishlist: () => {}
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<number[]>([]);

    const updateWishlist = useCallback(() => {
        const storedWishlist = getWishlist();
        const wishlistIds = storedWishlist.map((product: any) => product.id);

        // Usar un comparador para evitar actualizaciones innecesarias
        setWishlist(prevWishlist => {
            const isEqual = prevWishlist.length === wishlistIds.length &&
                prevWishlist.every((id, index) => id === wishlistIds[index]);
            return isEqual ? prevWishlist : wishlistIds;
        });
    }, []);

    const toggleWishlist = useCallback((product: any) => {
        const storedWishlist = getWishlist();
        const isInWishlist = storedWishlist.some((item: any) => item.id === product.id);

        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }

        updateWishlist();
    }, [updateWishlist]);

    useEffect(() => {
        updateWishlist();
    }, [updateWishlist]);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            updateWishlist,
            toggleWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);