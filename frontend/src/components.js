import React, { useState, useEffect } from 'react';

// Header Component
const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Games', id: 'games' },
    { name: 'Streaming', id: 'streaming' },
    { name: 'Support', id: 'support' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'games') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('games-section');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (sectionId === 'streaming') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('streaming-section');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentPage(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 6v12l10-6z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PlayBoss
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-purple-400 transition-colors duration-200 font-medium ${
                  currentPage === item.id ? 'text-purple-400' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-white hover:text-purple-400 transition-colors duration-200 py-2 ${
                    currentPage === item.id ? 'text-purple-400' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616341316676-fb436b96f99a" 
          alt="Gaming Controller"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          PlayBoss
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Sua loja digital de games e streaming. Gift cards, assinaturas e muito mais com os melhores preços do mercado!
        </p>
        
        {/* Weekly Offer Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-yellow-300 font-semibold">OFERTA DA SEMANA</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Combo Streaming Premium</h3>
          <p className="text-white/90 mb-4">Netflix + Disney+ + HBO Max por apenas R$ 89,90/mês</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Aproveitar Oferta
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Ver Games
          </button>
          <button 
            onClick={() => document.getElementById('streaming-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            Ver Streaming
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// Products Section (Games)
const ProductsSection = ({ onProductSelect, onBuyNow }) => {
  const gameProducts = [
    {
      id: 1,
      name: 'Steam Gift Card R$ 50',
      price: 54.90,
      originalPrice: 50.00,
      category: 'Steam',
      description: 'Gift card da Steam para comprar seus jogos favoritos',
      image: 'https://images.unsplash.com/photo-1555581064-8ce820e50679',
      popular: true
    },
    {
      id: 2,
      name: 'Xbox Game Pass Ultimate',
      price: 56.90,
      originalPrice: 49.90,
      category: 'Xbox',
      description: 'Acesso a centenas de jogos no Xbox e PC',
      image: 'https://images.unsplash.com/photo-1610366398516-46da9dec5931',
      popular: true
    },
    {
      id: 3,
      name: 'PSN Plus Essential 12 meses',
      price: 199.90,
      originalPrice: 179.90,
      category: 'PlayStation',
      description: 'PlayStation Plus Essential por 12 meses',
      image: 'https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg'
    },
    {
      id: 4,
      name: 'PSN Plus Extra',
      price: 299.90,
      originalPrice: 269.90,
      category: 'PlayStation',
      description: 'PlayStation Plus Extra com catálogo de jogos',
      image: 'https://images.unsplash.com/photo-1548686304-5c3be888a00b'
    }
  ];

  return (
    <section id="games-section" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Games & Gift Cards
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Os melhores preços em gift cards e assinaturas de jogos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameProducts.map((product) => (
            <div key={product.id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50">
              {product.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-1 text-sm font-semibold">
                  MAIS POPULAR
                </div>
              )}
              
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => onProductSelect(product)}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Detalhes
                  </button>
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-sm"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Streaming Section
const StreamingSection = ({ onProductSelect, onBuyNow }) => {
  const streamingProducts = [
    {
      id: 5,
      name: 'Spotify Premium 1 mês',
      price: 21.90,
      originalPrice: 19.90,
      category: 'Spotify',
      description: 'Spotify Premium sem anúncios por 1 mês',
      image: 'https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6',
      popular: true
    },
    {
      id: 6,
      name: 'Spotify Premium 3 meses',
      price: 54.90,
      originalPrice: 49.90,
      category: 'Spotify',
      description: 'Spotify Premium sem anúncios por 3 meses',
      image: 'https://images.unsplash.com/photo-1714623300280-038a07bab1fa'
    },
    {
      id: 7,
      name: 'Netflix Premium 1 mês',
      price: 29.90,
      originalPrice: 26.90,
      category: 'Netflix',
      description: 'Netflix Premium 4K por 1 mês',
      image: 'https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6',
      popular: true
    },
    {
      id: 8,
      name: 'Office 365 Personal',
      price: 34.90,
      originalPrice: 29.90,
      category: 'Microsoft',
      description: 'Office 365 Personal por 1 mês',
      image: 'https://images.unsplash.com/photo-1579571373349-65609ec0fec7'
    }
  ];

  return (
    <section id="streaming-section" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Streaming & Assinaturas
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Todas as suas plataformas favoritas com os melhores preços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streamingProducts.map((product) => (
            <div key={product.id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50">
              {product.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center py-1 text-sm font-semibold">
                  MAIS POPULAR
                </div>
              )}
              
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => onProductSelect(product)}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Detalhes
                  </button>
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-semibold text-sm"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Modal
const ProductModal = ({ product, onClose, onBuyNow }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg">
              {product.category}
            </span>
            {product.popular && (
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                POPULAR
              </span>
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
          <p className="text-gray-300 mb-6 text-lg">{product.description}</p>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-3">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-right">
                  <span className="text-green-400 font-semibold">
                    Economize R$ {(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-1">Entrega Instantânea</h4>
                <p className="text-gray-300 text-sm">
                  Receba seu produto por email em até 5 minutos após a confirmação do pagamento via PIX.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Fechar
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Form
const OrderForm = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    proofOfPayment: null,
    additionalNotes: ''
  });
  const [pixKey] = useState('14998549828');
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [pixKeyCopied, setPixKeyCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      proofOfPayment: e.target.files[0]
    }));
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setPixKeyCopied(true);
    setTimeout(() => setPixKeyCopied(false), 2000);
  };

  const generateQRCode = () => {
    setQrCodeGenerated(true);
    // In a real app, this would generate an actual QR code
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to verdugo111xx@gmail.com
    console.log('Order submitted:', { product, formData });
    onSubmit();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Finalizar Pedido</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product Summary */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{product.category}</span>
              <span className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
            </div>
          </div>

          {/* PIX Payment */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Pagamento via PIX</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chave PIX:
                </label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={pixKey} 
                    readOnly 
                    className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
                  />
                  <button 
                    onClick={copyPixKey}
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {pixKeyCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={generateQRCode}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                >
                  Gerar QR Code PIX
                </button>
                {qrCodeGenerated && (
                  <div className="mt-4 p-4 bg-white rounded-lg inline-block">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-600">
                      QR Code PIX<br/>R$ {product.price.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo *
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Comprovante de Pagamento *
              </label>
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Observações Adicionais
              </label>
              <textarea 
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Informações adicionais sobre seu pedido..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
              >
                Enviar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Thank You Page
const ThankYouPage = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Pedido Confirmado!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Obrigado pela sua compra! Você receberá seu produto por email em breve.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Próximos Passos:</h3>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Verificaremos seu pagamento em até 5 minutos</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Enviaremos seu produto para o email informado</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Entre em contato conosco se tiver dúvidas</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBackToHome}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Voltar ao Início
          </button>
          <a 
            href={`https://wa.me/5514998549828?text=Olá! Fiz um pedido no PlayBoss e gostaria de acompanhar o status.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contato
          </h1>
          <p className="text-xl text-gray-300">
            Entre em contato conosco pelos canais abaixo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">WhatsApp</h3>
            <p className="text-gray-300 mb-4">
              Fale conosco diretamente pelo WhatsApp para suporte rápido
            </p>
            <a 
              href="https://wa.me/5514998549828"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>(14) 99854-9828</span>
            </a>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Email</h3>
            <p className="text-gray-300 mb-4">
              Envie suas dúvidas por email e responderemos em breve
            </p>
            <a 
              href="mailto:verdugo111xx@gmail.com"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>verdugo111xx@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Support Page
const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Como funciona a entrega dos produtos?",
      answer: "Após a confirmação do pagamento via PIX, enviamos seu produto por email em até 5 minutos. Você receberá todas as instruções necessárias para ativar sua compra."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Atualmente aceitamos apenas pagamentos via PIX. É a forma mais rápida e segura para processar seu pedido."
    },
    {
      question: "Posso cancelar minha compra?",
      answer: "Sim, você pode cancelar sua compra antes da entrega do produto. Entre em contato conosco pelo WhatsApp para solicitar o cancelamento."
    },
    {
      question: "Os produtos têm garantia?",
      answer: "Sim, todos os nossos produtos têm garantia de funcionamento. Se houver algum problema, oferecemos suporte completo ou reembolso."
    },
    {
      question: "Como posso acompanhar meu pedido?",
      answer: "Você pode acompanhar seu pedido pelo WhatsApp ou email. Sempre mantemos nossos clientes informados sobre o status de seus pedidos."
    },
    {
      question: "Vocês oferecem suporte pós-venda?",
      answer: "Sim, oferecemos suporte completo pós-venda. Se tiver dúvidas sobre a ativação ou uso do produto, estamos aqui para ajudar."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Suporte
          </h1>
          <p className="text-xl text-gray-300">
            Encontre respostas para as perguntas mais frequentes
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 hover:bg-gray-700/50 transition-colors flex items-center justify-between"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Não encontrou sua resposta?
          </h3>
          <p className="text-gray-300 mb-6">
            Entre em contato conosco e nossa equipe te ajudará rapidamente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5514998549828"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a 
              href="mailto:verdugo111xx@gmail.com"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 6v12l10-6z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PlayBoss
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Sua loja digital de games e streaming com os melhores preços do mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#games-section" className="text-gray-400 hover:text-white transition-colors">Games</a></li>
              <li><a href="#streaming-section" className="text-gray-400 hover:text-white transition-colors">Streaming</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://wa.me/5514998549828" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="mailto:verdugo111xx@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pagamento</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PIX</span>
                </div>
                <span className="text-gray-400 text-sm">Pagamento instantâneo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 PlayBoss. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export all components
const Components = {
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
};

export default Components;