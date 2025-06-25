import React, { useState, useEffect, useCallback } from 'react';

// Lazy Image Component
const LazyImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => setIsError(true);
    img.src = src;
  }, [src]);

  if (isError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Erro ao carregar imagem</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          {...props}
        />
      )}
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ expired: true });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return <span className="text-primary-500 font-semibold">Oferta Expirada</span>;
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-primary-400 font-semibold">🔥 Termina em:</span>
      <div className="flex space-x-1">
        {timeLeft.days > 0 && (
          <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
            {timeLeft.days}d
          </span>
        )}
        <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
          {String(timeLeft.hours || 0).padStart(2, '0')}h
        </span>
        <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
          {String(timeLeft.minutes || 0).padStart(2, '0')}m
        </span>
        <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
          {String(timeLeft.seconds || 0).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
};

// Review Stars Component
const ReviewStars = ({ rating, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
};

// Header Component with new Zer0Play branding
const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Games', id: 'games' },
    { name: 'Streaming', id: 'streaming' },
    { name: 'Rastrear Pedido', id: 'order-tracking' },
    { name: 'Suporte', id: 'support' },
    { name: 'Contato', id: 'contact' }
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
    <header className="bg-black/95 backdrop-blur-sm border-b border-primary-600/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with fire effect */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                {/* Game Controller Icon */}
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.97 16c-.18 0-.35-.06-.49-.16-.7-.5-.7-1.18 0-1.68.14-.1.31-.16.49-.16s.35.06.49.16c.7.5.7 1.18 0 1.68-.14.1-.31.16-.49.16zm8.03 0c-.18 0-.35-.06-.49-.16-.7-.5-.7-1.18 0-1.68.14-.1.31-.16.49-.16s.35.06.49.16c.7.5.7 1.18 0 1.68-.14.1-.31.16-.49.16zm-.51-5.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm1.5-1.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 8.5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-11 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
                </svg>
                {/* Fire effect pixels */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-sm animate-fire opacity-80"></div>
                <div className="absolute -top-2 right-1 w-2 h-2 bg-yellow-500 rounded-sm animate-fire animation-delay-300 opacity-60"></div>
                <div className="absolute -top-1 right-2 w-1 h-1 bg-orange-500 rounded-sm animate-fire animation-delay-700 opacity-80"></div>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Zer0Play
              </span>
              <div className="text-xs text-gray-400 -mt-1">Loja Digital #1</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-primary-400 transition-colors duration-200 font-medium ${
                  currentPage === item.id ? 'text-primary-400' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-primary-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-white hover:text-primary-400 transition-colors duration-200 py-2 ${
                    currentPage === item.id ? 'text-primary-400' : ''
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

// Enhanced Hero Component
const Hero = () => {
  const offerEndDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000); // 2 days from now

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pixel-pattern">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <LazyImage 
          src="https://images.unsplash.com/photo-1616341316676-fb436b96f99a" 
          alt="Gaming Controller"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-primary-900/30 to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
            Zer0Play
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            🎮 A loja digital #1 do Brasil! Gift cards, assinaturas e games com os <span className="text-primary-400 font-semibold">melhores preços</span> e entrega instantânea via PIX!
          </p>
        </div>
        
        {/* Weekly Offer Banner with Countdown */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 mb-8 max-w-3xl mx-auto border border-primary-500/30 shadow-2xl animate-slide-up">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-2xl">🔥</span>
            <span className="text-yellow-300 font-bold text-lg">OFERTA RELÂMPAGO</span>
            <span className="text-2xl">🔥</span>
          </div>
          <CountdownTimer targetDate={offerEndDate} />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 mt-3">Combo Streaming Premium</h3>
          <p className="text-white/90 mb-4 text-lg">Netflix + Disney+ + HBO Max por apenas <span className="text-yellow-300 font-bold">R$ 89,90/mês</span></p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            🚀 Aproveitar Oferta
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button 
            onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🎮 Ver Games</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button 
            onClick={() => document.getElementById('streaming-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-white/10 border-2 border-primary-600/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-600/20 hover:border-primary-500 transition-all duration-200 backdrop-blur-sm"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>📺 Ver Streaming</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>Entrega em 5 minutos</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>100% Seguro</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PIX</span>
            </div>
            <span>Pagamento Instantâneo</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// Enhanced Products Section with stock management
const ProductsSection = ({ onProductSelect, onBuyNow, stockData }) => {
  const gameProducts = [
    {
      id: 1,
      name: 'Steam Gift Card R$ 50',
      price: 54.90,
      originalPrice: 50.00,
      category: 'Steam',
      description: 'Gift card da Steam para comprar seus jogos favoritos na maior plataforma de PC gaming',
      image: 'https://images.unsplash.com/photo-1555581064-8ce820e50679',
      popular: true,
      rating: 4.9,
      reviewCount: 1247,
      features: ['Ativação instantânea', 'Válido mundialmente', 'Sem taxa extra']
    },
    {
      id: 2,
      name: 'Xbox Game Pass Ultimate',
      price: 56.90,
      originalPrice: 49.90,
      category: 'Xbox',  
      description: 'Acesso a centenas de jogos no Xbox e PC + Xbox Live Gold incluído',
      image: 'https://images.unsplash.com/photo-1610366398516-46da9dec5931',
      popular: true,
      rating: 4.8,
      reviewCount: 856,
      features: ['100+ jogos', 'Xbox + PC', 'EA Play incluído']
    },
    {
      id: 3,
      name: 'PSN Plus Essential 12 meses',
      price: 199.90,
      originalPrice: 179.90,
      category: 'PlayStation',
      description: 'PlayStation Plus Essential por 12 meses com jogos grátis mensais',
      image: 'https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg',
      rating: 4.7,
      reviewCount: 432,
      features: ['Jogos grátis mensais', 'Multiplayer online', 'Descontos exclusivos']
    },
    {
      id: 4,
      name: 'PSN Plus Extra',
      price: 299.90,
      originalPrice: 269.90,
      category: 'PlayStation',
      description: 'PlayStation Plus Extra com catálogo de centenas de jogos',
      image: 'https://images.unsplash.com/photo-1548686304-5c3be888a00b',
      rating: 4.8,
      reviewCount: 234,
      features: ['400+ jogos', 'Catálogo premium', 'Downloads ilimitados']
    }
  ];

  const getRecommendations = (currentProductId) => {
    return gameProducts.filter(p => p.id !== currentProductId).slice(0, 2);
  };

  return (
    <section id="games-section" className="py-20 bg-secondary-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            🎮 Games & Gift Cards
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Os menores preços em gift cards e assinaturas de jogos com entrega instantânea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {gameProducts.map((product) => {
            const stock = stockData[product.id];
            const isOutOfStock = !stock?.available || stock?.quantity === 0;
            const isLowStock = stock?.quantity > 0 && stock?.quantity <= 5;

            return (
              <div key={product.id} className="group bg-secondary-900/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-secondary-700/50 hover:border-primary-500/50 shadow-xl hover:shadow-2xl">
                {/* Stock & Popular Badges */}
                <div className="relative">
                  {product.popular && !isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-800 text-white text-center py-2 text-sm font-bold z-10">
                      🏆 MAIS POPULAR
                    </div>
                  )}
                  {isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-gray-600 text-white text-center py-2 text-sm font-bold z-10">
                      😞 ESGOTADO
                    </div>
                  )}
                  {isLowStock && !isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-orange-600 text-white text-center py-2 text-sm font-bold z-10">
                      ⚡ RESTAM {stock.quantity}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <LazyImage 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full font-bold">
                    R$ {product.price.toFixed(2)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-lg text-sm font-semibold">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ReviewStars rating={product.rating} />
                      <span className="text-sm text-gray-400">({product.reviewCount})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, index) => (
                        <span key={index} className="bg-secondary-800 text-gray-300 px-2 py-1 rounded text-xs">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-400 font-semibold text-sm">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onProductSelect(product)}
                      className="flex-1 bg-secondary-700 text-white py-3 px-4 rounded-xl hover:bg-secondary-600 transition-colors text-sm font-semibold"
                    >
                      📋 Detalhes
                    </button>
                    <button 
                      onClick={() => onBuyNow(product)}
                      disabled={isOutOfStock}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                        isOutOfStock 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transform hover:scale-105'
                      }`}
                    >
                      {isOutOfStock ? '😞 Esgotado' : '🚀 Comprar'}
                    </button>
                  </div>

                  {/* You may also like */}
                  <div className="mt-6 pt-4 border-t border-secondary-700">
                    <p className="text-sm text-gray-400 mb-3">👥 Você também pode gostar:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {getRecommendations(product.id).map((rec) => (
                        <button
                          key={rec.id}
                          onClick={() => onProductSelect(rec)}
                          className="text-left p-2 bg-secondary-800/50 rounded-lg hover:bg-secondary-700/50 transition-colors"
                        >
                          <div className="text-xs text-primary-400 font-semibold truncate">{rec.name}</div>
                          <div className="text-xs text-gray-400">R$ {rec.price.toFixed(2)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Enhanced Streaming Section
const StreamingSection = ({ onProductSelect, onBuyNow, stockData }) => {
  const streamingProducts = [
    {
      id: 5,
      name: 'Spotify Premium 1 mês',
      price: 21.90,
      originalPrice: 19.90,
      category: 'Spotify',
      description: 'Spotify Premium sem anúncios, downloads offline e qualidade superior',
      image: 'https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6',
      popular: true,
      rating: 4.9,
      reviewCount: 2156,
      features: ['Sem anúncios', 'Download offline', 'Qualidade alta']
    },
    {
      id: 6,
      name: 'Spotify Premium 3 meses',
      price: 54.90,
      originalPrice: 49.90,
      category: 'Spotify',
      description: 'Spotify Premium sem anúncios por 3 meses completos',
      image: 'https://images.unsplash.com/photo-1714623300280-038a07bab1fa',
      rating: 4.8,
      reviewCount: 987,
      features: ['3 meses completos', 'Economia garantida', 'Renovação fácil']
    },
    {
      id: 7,
      name: 'Netflix Premium 1 mês',
      price: 29.90,
      originalPrice: 26.90,
      category: 'Netflix',
      description: 'Netflix Premium 4K com até 4 telas simultâneas',
      image: 'https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6',
      popular: true,
      rating: 4.9,
      reviewCount: 3421,
      features: ['Qualidade 4K', '4 telas simultâneas', 'HDR disponível']
    },
    {
      id: 8,
      name: 'Office 365 Personal',
      price: 34.90,
      originalPrice: 29.90,
      category: 'Microsoft',
      description: 'Office 365 Personal com Word, Excel, PowerPoint e 1TB OneDrive',
      image: 'https://images.unsplash.com/photo-1579571373349-65609ec0fec7',
      rating: 4.7,
      reviewCount: 567,
      features: ['Apps completos', '1TB OneDrive', 'Suporte premium']
    }
  ];

  const getRecommendations = (currentProductId) => {
    return streamingProducts.filter(p => p.id !== currentProductId).slice(0, 2);
  };

  return (
    <section id="streaming-section" className="py-20 bg-secondary-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            📺 Streaming & Assinaturas
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Todas as suas plataformas favoritas com preços imbatíveis e ativação instantânea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {streamingProducts.map((product) => {
            const stock = stockData[product.id];
            const isOutOfStock = !stock?.available || stock?.quantity === 0;
            const isLowStock = stock?.quantity > 0 && stock?.quantity <= 5;

            return (
              <div key={product.id} className="group bg-secondary-900/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-secondary-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl">
                {/* Stock & Popular Badges */}
                <div className="relative">
                  {product.popular && !isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold z-10">
                      🏆 MAIS POPULAR
                    </div>
                  )}
                  {isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-gray-600 text-white text-center py-2 text-sm font-bold z-10">
                      😞 ESGOTADO
                    </div>
                  )}
                  {isLowStock && !isOutOfStock && (
                    <div className="absolute top-0 left-0 right-0 bg-orange-600 text-white text-center py-2 text-sm font-bold z-10">
                      ⚡ RESTAM {stock.quantity}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <LazyImage 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                    R$ {product.price.toFixed(2)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-lg text-sm font-semibold">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ReviewStars rating={product.rating} />
                      <span className="text-sm text-gray-400">({product.reviewCount})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, index) => (
                        <span key={index} className="bg-secondary-800 text-gray-300 px-2 py-1 rounded text-xs">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-400 font-semibold text-sm">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onProductSelect(product)}
                      className="flex-1 bg-secondary-700 text-white py-3 px-4 rounded-xl hover:bg-secondary-600 transition-colors text-sm font-semibold"
                    >
                      📋 Detalhes
                    </button>
                    <button 
                      onClick={() => onBuyNow(product)}
                      disabled={isOutOfStock}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                        isOutOfStock 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                      }`}
                    >
                      {isOutOfStock ? '😞 Esgotado' : '🚀 Comprar'}
                    </button>
                  </div>

                  {/* You may also like */}
                  <div className="mt-6 pt-4 border-t border-secondary-700">
                    <p className="text-sm text-gray-400 mb-3">👥 Você também pode gostar:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {getRecommendations(product.id).map((rec) => (
                        <button
                          key={rec.id}
                          onClick={() => onProductSelect(rec)}
                          className="text-left p-2 bg-secondary-800/50 rounded-lg hover:bg-secondary-700/50 transition-colors"
                        >
                          <div className="text-xs text-blue-400 font-semibold truncate">{rec.name}</div>
                          <div className="text-xs text-gray-400">R$ {rec.price.toFixed(2)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Social Proof Component
const SocialProof = () => {
  const [notifications, setNotifications] = useState([]);

  const purchaseNotifications = [
    "João comprou Xbox Game Pass Ultimate há 2 minutos",
    "Maria adquiriu Netflix Premium há 5 minutos", 
    "Pedro comprou Steam Gift Card há 8 minutos",
    "Ana adquiriu Spotify Premium há 12 minutos",
    "Carlos comprou PSN Plus há 15 minutos"
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = purchaseNotifications[Math.floor(Math.random() * purchaseNotifications.length)];
      const id = Date.now();
      
      setNotifications(prev => [...prev, { id, text: randomNotification }]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      }, 5000);
    };

    const interval = setInterval(showNotification, 8000);
    showNotification(); // Show first notification immediately
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Social Proof Notifications */}
      <div className="fixed bottom-6 left-6 z-40 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-secondary-800/95 backdrop-blur-sm border border-primary-600/30 text-white p-4 rounded-xl shadow-lg animate-slide-up"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">{notification.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">50K+</div>
              <div className="text-gray-400">Clientes Satisfeitos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">99.9%</div>
              <div className="text-gray-400">Taxa de Sucesso</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">5min</div>
              <div className="text-gray-400">Entrega Média</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">24/7</div>
              <div className="text-gray-400">Suporte Ativo</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Enhanced Product Modal with reviews
const ProductModal = ({ product, onClose, onBuyNow, stockData }) => {
  if (!product) return null;

  const stock = stockData[product.id];
  const isOutOfStock = !stock?.available || stock?.quantity === 0;

  const mockReviews = [
    { name: "João S.", rating: 5, comment: "Entrega super rápida, produto funcionou perfeitamente!", date: "2 dias atrás" },
    { name: "Maria L.", rating: 5, comment: "Melhor preço que encontrei, recomendo!", date: "1 semana atrás" },  
    { name: "Pedro M.", rating: 4, comment: "Bom atendimento e produto de qualidade.", date: "2 semanas atrás" }
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <LazyImage 
            src={product.image} 
            alt={product.name}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-2xl"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-600/20 text-primary-300 px-4 py-2 rounded-xl font-semibold">
                  {product.category}
                </span>
                {product.popular && (
                  <span className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-4 py-2 rounded-xl text-sm font-bold">
                    🏆 POPULAR
                  </span>
                )}
              </div>

              <h2 className="text-4xl font-bold text-white mb-4">{product.name}</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">✨ Características:</h4>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">⭐ Avaliações:</h4>
                <div className="space-y-4">
                  {mockReviews.map((review, index) => (
                    <div key={index} className="bg-secondary-800/50 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{review.name}</span>
                        <div className="flex items-center space-x-2">
                          <ReviewStars rating={review.rating} />
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-secondary-800/50 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-white mb-2">R$ {product.price.toFixed(2)}</div>
                {product.originalPrice && (
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-xl text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Info */}
              {!isOutOfStock && stock?.quantity <= 10 && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400">⚡</span>
                    <span className="text-orange-300 font-semibold">
                      Apenas {stock.quantity} unidades restantes!
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div>
                    <h4 className="text-green-400 font-semibold mb-1">🚀 Entrega Instantânea</h4>
                    <p className="text-gray-300 text-sm">
                      Receba seu produto por email em até 5 minutos após a confirmação do pagamento via PIX.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => onBuyNow(product)}
                  disabled={isOutOfStock}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                    isOutOfStock 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary-600 to-primary-800 text-white hover:from-primary-700 hover:to-primary-900 transform hover:scale-105 shadow-lg'
                  }`}
                >
                  {isOutOfStock ? '😞 Produto Esgotado' : '🛒 Comprar Agora'}
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full bg-secondary-700 text-white py-3 px-6 rounded-xl hover:bg-secondary-600 transition-colors font-semibold"
                >
                  Continuar Navegando
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-secondary-700">
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Garantido</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PIX</span>
                    </div>
                    <span>PIX Seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Order Form
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setPixKeyCopied(true);
      setTimeout(() => setPixKeyCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setPixKeyCopied(true);
      setTimeout(() => setPixKeyCopied(false), 2000);
    }
  };

  const generateQRCode = () => {
    setQrCodeGenerated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would send data to verdugo111xx@gmail.com
    console.log('Order submitted:', { product, formData });
    
    onSubmit(formData);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🛒 Finalizar Pedido</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product Summary */}
          <div className="bg-secondary-800/50 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-4">
              <LazyImage 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-gray-400 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <ReviewStars rating={product.rating} />
                  <span className="text-3xl font-bold text-primary-400">R$ {product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PIX Payment */}
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-primary-400 mb-6 flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">PIX</span>
              </div>
              <span>Pagamento via PIX</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  📱 Chave PIX (Celular):
                </label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="text" 
                    value={pixKey} 
                    readOnly 
                    className="form-input flex-1 bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 font-mono text-lg"
                  />
                  <button 
                    onClick={copyPixKey}
                    className={`px-6 py-4 rounded-xl font-bold transition-all ${
                      pixKeyCopied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {pixKeyCopied ? '✅ Copiado!' : '📋 Copiar'}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={generateQRCode}
                  className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-900 transition-all font-bold text-lg"
                >
                  📱 Gerar QR Code PIX
                </button>
                {qrCodeGenerated && (
                  <div className="mt-6 p-6 bg-white rounded-xl inline-block">
                    <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-600 rounded-lg">
                      <div className="text-6xl mb-4">📱</div>
                      <div className="text-center">
                        <div className="font-bold">QR Code PIX</div>
                        <div className="text-2xl font-bold text-primary-600">R$ {product.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 mt-2">Escaneie com seu banco</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  👤 Nome Completo *
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  📧 Email *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📄 Comprovante de Pagamento PIX *
              </label>
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
                className="form-input w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-600 file:text-white file:font-semibold"
              />
              <p className="text-sm text-gray-400 mt-2">
                Aceito: JPG, PNG, PDF (máx. 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📝 Observações Adicionais
              </label>
              <textarea 
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                className="form-textarea w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none resize-none"
                placeholder="Informações adicionais sobre seu pedido..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-secondary-700 text-white py-4 px-6 rounded-xl hover:bg-secondary-600 transition-colors font-bold"
              >
                ❌ Cancelar
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-800 text-white hover:from-primary-700 hover:to-primary-900 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </span>
                ) : (
                  '🚀 Enviar Pedido'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Newsletter Popup
const NewsletterPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary-900 rounded-2xl p-8 max-w-md w-full border border-primary-600/30">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">Ganhe 5% OFF!</h3>
              <p className="text-gray-300">
                Cadastre seu email e receba um cupom de desconto exclusivo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                required
                className="form-input w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-900 transition-all"
              >
                🎁 Quero Meu Desconto!
              </button>
            </form>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Obrigado!</h3>
            <p className="text-gray-300">
              Seu cupom de 5% OFF foi enviado para seu email!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Order Tracking Page
const OrderTrackingPage = () => {
  const [email, setEmail] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock order status
    setOrderStatus({
      orderId: '#ZP' + Date.now().toString().slice(-6),
      status: 'processing',
      product: 'Xbox Game Pass Ultimate',
      amount: 'R$ 56,90',
      date: new Date().toLocaleDateString('pt-BR'),
      steps: [
        { name: 'Pedido Recebido', completed: true, time: '10:30' },
        { name: 'Pagamento Confirmado', completed: true, time: '10:35' },
        { name: 'Processando Entrega', completed: false, time: '10:40' },
        { name: 'Produto Entregue', completed: false, time: '--:--' },
      ]
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            🔍 Rastrear Pedido
          </h1>
          <p className="text-xl text-gray-300">
            Digite seu email para acompanhar o status do seu pedido
          </p>
        </div>

        <div className="bg-secondary-800/50 rounded-2xl p-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📧 Email do Pedido
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input w-full bg-secondary-800 text-white p-4 rounded-xl border border-secondary-700 focus:border-primary-500 focus:outline-none"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-900 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Consultando...</span>
                </span>
              ) : (
                '🔍 Consultar Status'
              )}
            </button>
          </form>

          {orderStatus && (
            <div className="mt-8 space-y-6">
              <div className="bg-secondary-900/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Pedido {orderStatus.orderId}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Produto:</span>
                    <div className="text-white font-semibold">{orderStatus.product}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Valor:</span>
                    <div className="text-white font-semibold">{orderStatus.amount}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Data:</span>
                    <div className="text-white font-semibold">{orderStatus.date}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <div className="text-primary-400 font-semibold">Em Processamento</div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-900/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Status do Pedido</h4>
                <div className="space-y-4">
                  {orderStatus.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {step.completed ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                          {step.name}
                        </div>
                        <div className="text-sm text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Thank You Page (existing component with minor updates)
const ThankYouPage = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-primary-400 bg-clip-text text-transparent">
            🎉 Pedido Confirmado!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Obrigado pela sua compra! Você receberá seu produto por email em até 5 minutos.
          </p>
        </div>

        <div className="bg-secondary-800/50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">📋 Próximos Passos:</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <span className="text-white font-semibold">Verificação do Pagamento</span>
                <p className="text-gray-300 text-sm">Analisaremos seu comprovante PIX em até 5 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <span className="text-white font-semibold">Entrega por Email</span>
                <p className="text-gray-300 text-sm">Seu produto será enviado para o email informado</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <span className="text-white font-semibold">Suporte Disponível</span>
                <p className="text-gray-300 text-sm">Nossa equipe está pronta para ajudar se precisar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBackToHome}
            className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-900 transition-all transform hover:scale-105"
          >
            🏠 Voltar ao Início
          </button>
          <a 
            href={`https://wa.me/5514998549828?text=Olá! Fiz um pedido no Zer0Play e gostaria de acompanhar o status.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

// Contact Page (existing with minor updates)
const ContactPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            📞 Contato
          </h1>
          <p className="text-xl text-gray-300">
            Entre em contato conosco pelos canais abaixo. Estamos sempre prontos para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-secondary-800/50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">💬 WhatsApp</h3>
            </div>
            <p className="text-gray-300 mb-6 text-center">
              Fale conosco diretamente pelo WhatsApp para suporte rápido e personalizado
            </p>
            <a 
              href="https://wa.me/5514998549828"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-center hover:bg-green-700 transition-colors"
            >
              📱 (14) 99854-9828
            </a>
          </div>

          <div className="bg-secondary-800/50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">📧 Email</h3>
            </div>
            <p className="text-gray-300 mb-6 text-center">
              Envie suas dúvidas por email e nossa equipe responderá em até 2 horas
            </p>
            <a 
              href="mailto:verdugo111xx@gmail.com"
              className="block w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-bold text-center hover:bg-primary-700 transition-colors"
            >
              📬 verdugo111xx@gmail.com
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-secondary-800/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">🕒 Horário de Atendimento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-primary-400 font-semibold mb-2">Segunda a Sábado</h4>
              <p className="text-gray-300">08:00 às 22:00</p>
            </div>
            <div>
              <h4 className="text-primary-400 font-semibold mb-2">Domingo</h4>
              <p className="text-gray-300">10:00 às 20:00</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            💡 Entregas automáticas funcionam 24/7, mesmo fora do horário de atendimento!
          </p>
        </div>
      </div>
    </div>
  );
};

// Support Page (existing with minor updates)  
const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "🚀 Como funciona a entrega dos produtos?",
      answer: "Após a confirmação do pagamento via PIX, enviamos seu produto por email automaticamente em até 5 minutos. Você receberá todas as instruções necessárias para ativar sua compra, incluindo códigos, links de ativação e tutoriais quando necessário."
    },
    {
      question: "💳 Quais formas de pagamento vocês aceitam?",
      answer: "Atualmente aceitamos apenas pagamentos via PIX. É a forma mais rápida, segura e econômica para processar seu pedido. O PIX permite confirmação instantânea, garantindo que você receba seu produto o mais rápido possível."
    },
    {
      question: "❌ Posso cancelar minha compra?",
      answer: "Sim, você pode cancelar sua compra antes da entrega do produto digital. Entre em contato conosco pelo WhatsApp em até 30 minutos após a compra para solicitar o cancelamento. Após a entrega, aplicam-se nossas políticas de reembolso."
    },
    {
      question: "🛡️ Os produtos têm garantia?",
      answer: "Sim, todos os nossos produtos têm garantia de funcionamento por 30 dias. Se houver algum problema técnico com o produto, oferecemos suporte completo, substituição ou reembolso integral. Sua satisfação é nossa prioridade."
    },
    {
      question: "📍 Como posso acompanhar meu pedido?",
      answer: "Você pode acompanhar seu pedido de 3 formas: (1) Pela página 'Rastrear Pedido' usando seu email, (2) Pelo WhatsApp enviando mensagem para (14) 99854-9828, ou (3) Por email. Sempre mantemos nossos clientes informados sobre cada etapa."
    },
    {
      question: "🆘 Vocês oferecem suporte pós-venda?",
      answer: "Sim! Oferecemos suporte completo pós-venda 24/7. Se tiver dúvidas sobre ativação, uso do produto, problemas técnicos ou qualquer questão, nossa equipe está sempre disponível pelo WhatsApp e email para ajudar."
    },
    {
      question: "🔒 Meus dados estão seguros?",
      answer: "Absolutamente! Utilizamos criptografia SSL/TLS em todas as transações e seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados). Seus dados pessoais e de pagamento são protegidos com os mais altos padrões de segurança."
    },
    {
      question: "⚡ Por que alguns produtos ficam 'Esgotados'?",
      answer: "Trabalhamos com fornecedores premium e nossa demanda é muito alta. Alguns produtos têm estoque limitado por questões de licenciamento. Quando um produto fica esgotado, reabastecemos rapidamente - geralmente em 24-48 horas."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            🆘 Central de Ajuda
          </h1>
          <p className="text-xl text-gray-300">
            Encontre respostas rápidas para as perguntas mais frequentes
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-secondary-800/50 rounded-xl overflow-hidden border border-secondary-700/50 hover:border-primary-600/30 transition-colors">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 hover:bg-secondary-700/30 transition-colors flex items-center justify-between"
              >
                <span className="text-white font-semibold text-lg pr-4">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 text-primary-400 transform transition-transform flex-shrink-0 ${
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
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 border border-primary-500/30 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Nossa equipe está online 24/7 e responde em menos de 5 minutos!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a 
              href="https://wa.me/5514998549828"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a 
              href="mailto:verdugo111xx@gmail.com"
              className="flex-1 bg-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors inline-flex items-center justify-center space-x-2"
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

// Enhanced Footer with Zer0Play branding
const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-secondary-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.97 16c-.18 0-.35-.06-.49-.16-.7-.5-.7-1.18 0-1.68.14-.1.31-.16.49-.16s.35.06.49.16c.7.5.7 1.18 0 1.68-.14.1-.31.16-.49.16zm8.03 0c-.18 0-.35-.06-.49-.16-.7-.5-.7-1.18 0-1.68.14-.1.31-.16.49-.16s.35.06.49.16c.7.5.7 1.18 0 1.68-.14.1-.31.16-.49.16zm-.51-5.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm1.5-1.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 8.5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-11 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-sm animate-fire opacity-80"></div>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Zer0Play
                </span>
                <div className="text-sm text-gray-400">Loja Digital #1 do Brasil</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              🎮 A maior loja digital do Brasil especializada em gift cards, games e streaming. 
              Mais de 50.000 clientes satisfeitos, entrega em 5 minutos e suporte 24/7.
            </p>
            <div className="flex space-x-4 mt-6">
              <div className="flex items-center space-x-2 text-green-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm">Entrega Garantida</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-400">
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PIX</span>
                </div>
                <span className="text-sm">Pagamento Seguro</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">🔗 Links Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">🏠 Home</a></li>
              <li><a href="#games-section" className="text-gray-400 hover:text-primary-400 transition-colors">🎮 Games</a></li>
              <li><a href="#streaming-section" className="text-gray-400 hover:text-primary-400 transition-colors">📺 Streaming</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">🔍 Rastrear Pedido</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">💬 Suporte</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">📞 Contato</h4>
            <div className="space-y-4 text-sm">
              <div>
                <a 
                  href="https://wa.me/5514998549828" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>(14) 99854-9828</span>
                </a>
              </div>
              <div>
                <a 
                  href="mailto:verdugo111xx@gmail.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>verdugo111xx@gmail.com</span>
                </a>
              </div>
              <div className="pt-2">
                <div className="text-gray-400 mb-2">⏰ Atendimento:</div>
                <div className="text-gray-500 text-xs">
                  Seg-Sáb: 08:00-22:00<br/>
                  Dom: 10:00-20:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Zer0Play. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Política de Reembolso
              </a>
            </div>
          </div>
          
          {/* Trust Seals */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1z"/>
              </svg>
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>LGPD Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>Loja Verificada</span>
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
  SupportPage,
  OrderTrackingPage,
  NewsletterPopup,
  SocialProof,
  LazyImage,
  CountdownTimer,
  ReviewStars
};

export default Components;