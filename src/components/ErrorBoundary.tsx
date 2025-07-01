import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="text-center p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                خطأ غير متوقع / Unexpected Error
              </h2>
              <p className="text-gray-600 mb-4">
                عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
              </p>
              <p className="text-gray-600 text-sm">
                Sorry, something unexpected happened. Please try again.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-damac-gold text-damac-navy px-6 py-3 rounded-lg font-semibold hover:bg-damac-gold/90 transition-colors"
              >
                المحاولة مرة أخرى / Try Again
              </button>
              <button
                onClick={this.handleRefresh}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                إعادة تحميل الصفحة / Refresh Page
              </button>
            </div>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  تفاصيل الخطأ / Error Details (Development Only)
                </summary>
                <div className="mt-3 p-4 bg-gray-50 rounded border text-xs">
                  <div className="mb-2">
                    <strong>Error:</strong>
                    <pre className="text-red-600 mt-1 overflow-auto whitespace-pre-wrap">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="text-gray-600 mt-1 overflow-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ===============================
// 2. UPDATE: src/pages/Index.tsx
// ===============================

import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { ErrorBoundary } from '../components/ErrorBoundary'; // Add this import
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { ProjectGallery } from '../components/ProjectGallery';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

function IndexContent() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        isRTL 
          ? 'استثمر في مشروع DAMAC Riverside في دبي ساوث. معرض حصري في القاهرة الجديدة 28-29 يونيو'
          : 'Invest in DAMAC Riverside project in Dubai South. Exclusive exhibition in New Cairo June 28-29'
      );
    }
  }, [isRTL]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProjectGallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <ErrorBoundary> {/* Wrap the entire app */}
      <LanguageProvider>
        <IndexContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default Index;

// ===============================
// 3. UPDATE: src/App.tsx (Optional - for additional protection)
// ===============================

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary"; // Add this import
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.message?.includes('4')) return false;
        return failureCount < 3;
      },
    },
  },
});

const App = () => (
  <ErrorBoundary> {/* Wrap the entire app */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
