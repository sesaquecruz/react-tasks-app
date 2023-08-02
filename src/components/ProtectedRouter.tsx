import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export function ProtectedRouter({ children }: { children: React.ReactNode}) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
