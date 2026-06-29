import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

const ToastContext = createContext(undefined);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const success = useCallback((message, duration) => showToast(message, 'success', duration), [showToast]);
  const error = useCallback((message, duration) => showToast(message, 'error', duration), [showToast]);
  const info = useCallback((message, duration) => showToast(message, 'info', duration), [showToast]);
  const warning = useCallback((message, duration) => showToast(message, 'warning', duration), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start p-4 rounded-lg shadow-lg border text-sm font-semibold pointer-events-auto transition-all duration-300 transform translate-y-0 animate-slide-in ${
              toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
            role="alert"
          >
            <div className="flex-shrink-0 mr-3">
              {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {toast.type === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
              {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-600" />}
              {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
            </div>
            <div className="flex-grow mr-2">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 ml-auto text-gray-400 hover:text-gray-700 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
