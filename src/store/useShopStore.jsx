import { create } from 'zustand';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  // Existing fetchProducts function
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ products: items, loading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ error: error.message, loading: false });
    }
  },
  
  // Add new product to Firestore
  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'products'), productData);
      const newProduct = { id: docRef.id, ...productData };
      
      // Update local state with the new product
      set(state => ({
        products: [...state.products, newProduct],
        loading: false
      }));
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Update existing product in Firestore
  updateProduct: async (updatedProduct) => {
    const { id, ...productData } = updatedProduct;
    set({ loading: true, error: null });
    
    try {
      // Update in Firestore
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, productData);
      
      // Update in local state
      set(state => ({
        products: state.products.map(product => 
          product.id === id ? updatedProduct : product
        ),
        loading: false
      }));
      
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Delete product from Firestore
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'products', productId));
      
      // Delete from local state
      set(state => ({
        products: state.products.filter(product => product.id !== productId),
        loading: false
      }));
      
      return productId;
    } catch (error) {
      console.error('Error deleting product:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));

export default useProductStore;