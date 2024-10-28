// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// // Create the AuthContext
// export const AuthContext = createContext();

// // AuthProvider Component to wrap the entire application
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Login function
//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       setUser(res.data.user);
//     } catch (err) {
//       setError('Login failed, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register function
//   const register = async (email, password) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post('/api/auth/register', { email, password });
//       setUser(res.data.user);
//     } catch (err) {
//       setError('Registration failed, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     axios.post('/api/auth/logout');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
