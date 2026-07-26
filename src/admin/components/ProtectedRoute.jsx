import { Navigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAdmin();

  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'var(--bg-base)',color:'var(--text-muted)' }}>Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}