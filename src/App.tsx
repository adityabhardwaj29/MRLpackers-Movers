import React, { useState, useEffect } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsConditionsView } from './components/TermsConditionsView';
import { Footer } from './components/Footer';

import { LeadCaptureModal } from './components/LeadCaptureModal';
import { FloatingBottomBar } from './components/FloatingBottomBar';

import { ServiceItem, PricingPlan, QuoteFormData } from './types';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [themeColor, setThemeColor] = useState<'indigo' | 'navy' | 'emerald'>('indigo');

  // Modals
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);

  // Success Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto trigger lead popup after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('rr_lead_popup_seen');
      if (!hasSeenPopup) {
        setIsLeadCaptureOpen(true);
        sessionStorage.setItem('rr_lead_popup_seen', 'true');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuoteFormSubmit = (data: QuoteFormData) => {
    setToastMessage(`✅ Quote Request Received for ${data.name || 'Customer'}! Our team will call you within 15 minutes.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleNavigatePage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          setIsLeadCaptureOpen(true);
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsLeadCaptureOpen(true);
      }
    }
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

        {currentPage === 'about' && (
          <AboutPage
            onOpenQuoteModal={handleScrollToContact}
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

      {/* Modals & Floating Mobile Bar */}
      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={() => setIsLeadCaptureOpen(false)}
        onSubmitQuoteForm={handleQuoteFormSubmit}
      />

      <FloatingBottomBar
        onOpenQuoteModal={handleScrollToContact}
      />
    </div>
  );
}
