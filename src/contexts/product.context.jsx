import { useState } from 'react';
import {createContext} from 'react';
import PRODUCT from "./../shop-data.json"

export const ProductsContext = createContext({
    product: []
});

export const ProductProvider = ({children})=>{
    const [products, setProducts] = useState(PRODUCT);
    const value = {products}
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}