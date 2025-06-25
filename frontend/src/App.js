import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './components';

const {
  Header,
  Hero,
  ProductsSection,
  StreamingSection,
  Footer,
  ProductModal,
  OrderForm,
  ThankYouPage,
  ContactPage,
  SupportPage,
  OrderTrackingPage,
  NewsletterPopup,
  SocialProof
} = Components;

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [stockData, setStockData] = useState({});

  // Initialize stock data
  useEffect(() => {
    const initialStock = {
      1: { available: true, quantity: 15 },
      2: { available: true, quantity: 8 },
      3: { available: true, quantity: 22 },
      4: { available: true, quantity: 5 },
      5: { available: true, quantity: 30 },
      6: { available: true, quantity: 12 },
      7: { available: true, quantity: 18 },
      8: { available: true, quantity: 0 } // Out of stock example
    };
    setStockData(initialStock);
  }, []);

  // Show newsletter popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('newsletter-shown')) {
        setShowNewsletter(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate stock updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (Math.random() < 0.1 && updated[key].quantity > 0) {
            updated[key].quantity -= 1;
            if (updated[key].quantity === 0) {
              updated[key].available = false;
            }
          }
        });
        return updated;
      });
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    if (!stockData[product.id]?.available) {
      alert('Produto esgotado! Tente novamente mais tarde.');
      return;
    }
    setSelectedProduct(product);
    setShowOrderForm(true);
    
    // Track purchase intent for analytics
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          price: product.price,
          quantity: 1
        }]
      });
    }
  };

  const handleOrderSubmit = (orderData) => {
    // Update stock
    if (selectedProduct) {
      setStockData(prev => ({
        ...prev,
        [selectedProduct.id]: {
          ...prev[selectedProduct.id],
          quantity: Math.max(0, prev[selectedProduct.id].quantity - 1)
        }
      }));
    }
    
    setShowOrderForm(false);
    setSelectedProduct(null);
    setCurrentPage('thank-you');
    
    // Track purchase for analytics
    if (window.gtag && selectedProduct) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: selectedProduct.price,
        currency: 'BRL',
        items: [{
          item_id: selectedProduct.id,
          item_name: selectedProduct.name,
          category: selectedProduct.category,
          price: selectedProduct.price,
          quantity: 1
        }]
      });
    }
  };

  const handleNewsletterClose = () => {
    setShowNewsletter(false);
    localStorage.setItem('newsletter-shown', 'true');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'thank-you':
        return <ThankYouPage onBackToHome={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero />
            <ProductsSection 
              onProductSelect={handleProductSelect} 
              onBuyNow={handleBuyNow}
              stockData={stockData}
            />
            <StreamingSection 
              onProductSelect={handleProductSelect} 
              onBuyNow={handleBuyNow}
              stockData={stockData}
            />
            <SocialProof />
          </>
        );
    }
  };

  return (
    <div className="App bg-gray-900 min-h-screen text-white font-inter">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
              {renderCurrentPage()}
              <Footer />
              
              {selectedProduct && !showOrderForm && (
                <ProductModal 
                  product={selectedProduct} 
                  onClose={handleCloseModal}
                  onBuyNow={handleBuyNow}
                  stockData={stockData}
                />
              )}
              
              {showOrderForm && selectedProduct && (
                <OrderForm 
                  product={selectedProduct}
                  onClose={() => setShowOrderForm(false)}
                  onSubmit={handleOrderSubmit}
                />
              )}
              
              {showNewsletter && (
                <NewsletterPopup onClose={handleNewsletterClose} />
              )}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;