import React, { useState, useEffect } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsConditionsView } from './components/TermsConditionsView';
import { Footer } from './components/Footer';
import { FloatingBottomBar } from './components/FloatingBottomBar';
import { ServiceItem, PricingPlan, QuoteFormData } from './types';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [themeColor, setThemeColor] = useState<'indigo' | 'navy' | 'emerald'>('indigo');

  // Success Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic SEO Title management per page
  useEffect(() => {
    switch (currentPage) {
      case 'home':
        document.title = 'MRL Packers & Movers Mumbai | Trusted Relocation Services';
        break;
      case 'about':
        document.title = 'About MRL Packers & Movers | Mumbai';
        break;
      case 'services':
        document.title = 'Packers & Movers Services in Mumbai | MRL';
        break;
      case 'gallery':
        document.title = 'MRL Packers & Movers Gallery | Mumbai';
        break;
      case 'contact':
        document.title = 'Contact MRL Packers & Movers | Mumbai';
        break;
      case 'quote':
        document.title = 'Get Free Relocation Quote | MRL Packers & Movers Mumbai';
        break;
      case 'privacy':
        document.title = 'Privacy Policy | MRL Packers & Movers';
        break;
      case 'terms':
        document.title = 'Terms & Conditions | MRL Packers & Movers';
        break;
      default:
        document.title = 'MRL Packers & Movers Mumbai';
    }
  }, [currentPage]);

  const handleQuoteFormSubmit = (data: QuoteFormData) => {
    setToastMessage(`✅ Quote Request Received for ${data.name || 'Customer'}! Our team will call you within 15 minutes.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleNavigatePage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setCurrentPage('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setCurrentPage('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    setCurrentPage('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-3 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-emerald-700 rounded-full cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Sticky Navbar on All Pages */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenQuoteModal={handleScrollToContact}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
      />

      {/* Active Page View */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            onOpenQuoteModal={handleScrollToContact}
            onSubmitQuoteForm={handleQuoteFormSubmit}
            onSelectService={handleSelectService}
            onSelectPlan={handleSelectPlan}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenQuoteModal={handleScrollToContact}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onSelectService={handleSelectService}
            onOpenQuoteModal={handleScrollToContact}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenQuoteModal={handleScrollToContact}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigatePage={handleNavigatePage}
            onSubmitQuoteForm={handleQuoteFormSubmit}
          />
        )}

        {currentPage === 'quote' && (
          <QuotePage
            onSubmitQuoteForm={handleQuoteFormSubmit}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyView
            onBackToHome={() => handleNavigatePage('home')}
          />
        )}

        {currentPage === 'terms' && (
          <TermsConditionsView
            onBackToHome={() => handleNavigatePage('home')}
          />
        )}
      </main>

      {/* Global Footer with Quick Links & Legal Pages */}
      <Footer
        onNavigatePage={handleNavigatePage}
      />

      {/* Floating Mobile Contact Bar */}
      <FloatingBottomBar
        onOpenQuoteModal={handleScrollToContact}
      />
    </div>
  );
}
