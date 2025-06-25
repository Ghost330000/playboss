import React, { useState } from 'react';
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
  SupportPage
} = Components;

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  const handleOrderSubmit = () => {
    setShowOrderForm(false);
    setSelectedProduct(null);
    setCurrentPage('thank-you');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      case 'thank-you':
        return <ThankYouPage onBackToHome={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero />
            <ProductsSection onProductSelect={handleProductSelect} onBuyNow={handleBuyNow} />
            <StreamingSection onProductSelect={handleProductSelect} onBuyNow={handleBuyNow} />
          </>
        );
    }
  };

  return (
    <div className="App bg-gray-900 min-h-screen text-white">
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
                />
              )}
              
              {showOrderForm && selectedProduct && (
                <OrderForm 
                  product={selectedProduct}
                  onClose={() => setShowOrderForm(false)}
                  onSubmit={handleOrderSubmit}
                />
              )}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;