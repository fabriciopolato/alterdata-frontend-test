import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

//context utilizado para pegar informações do user

interface AuthState {
  accessToken: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('alterdata:accessToken');
    const user = localStorage.getItem('alterdata:user');

    if (accessToken && user) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem('alterdata:accessToken', token);
    localStorage.setItem('alterdata:user', JSON.stringify(user));

    setData({ accessToken: token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('alterdata:accessToken');
    localStorage.removeItem('alterdata:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
