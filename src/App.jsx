import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import CustomCursor from './components/Layout/CustomCursor';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Quote from './pages/Quote';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonViewer from './pages/LessonViewer';
import Sandbox from './pages/Sandbox';
import FAQ from './pages/FAQ';
import Academy from './pages/Academy';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Legal from './pages/Legal';
import PublicLogin from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import DashboardLayout from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import DashboardCourses from './pages/DashboardCourses';
import DashboardBookmarks from './pages/DashboardBookmarks';
import DashboardCertificates from './pages/DashboardCertificates';
import DashboardAchievements from './pages/DashboardAchievements';
import DashboardSettings from './pages/DashboardSettings';
import { AuthProvider } from './contexts/AuthContext';

// Instructor
import InstructorLayout from './pages/Instructor';
import InstructorHome from './pages/InstructorHome';
import InstructorCourses from './pages/InstructorCourses';
import InstructorStudents from './pages/InstructorStudents';
import InstructorAssignments from './pages/InstructorAssignments';
import InstructorRevenue from './pages/InstructorRevenue';
import InstructorLive from './pages/InstructorLive';

// Role Dashboards
import ClientDashboard from './pages/ClientDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

// Phase 7 — Platform Modules
import CRM from './pages/CRM';
import ProjectManagement from './pages/ProjectManagement';
import Finance from './pages/Finance';
import Messages from './pages/Messages';
import KnowledgeBase from './pages/KnowledgeBase';
import Community from './pages/Community';
import CertificateVerify from './pages/CertificateVerify';

// Admin
import { AdminProvider } from './admin/AdminContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminServices from './admin/pages/Services';
import AdminPortfolio from './admin/pages/Portfolio';
import AdminBlog from './admin/pages/Blog';
import AdminTeam from './admin/pages/Team';
import AdminContacts from './admin/pages/Contacts';
import AdminQuotes from './admin/pages/Quotes';
import AdminCourses from './admin/pages/Courses';
import AdminUsers from './admin/pages/Users';
import AdminAnalytics from './admin/pages/Analytics';
import AdminSettingsPage from './admin/pages/Settings';
import AdminMedia from './admin/pages/Media';
import './admin/admin.css';

function Placeholder({ title }) {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">{title}</h1>
        <p className="section-desc" style={{ margin: '0 auto' }}>This section is currently under construction and pending final design details.</p>
      </div>
      <div className="content-sections">
        <div style={{ height: '30vh' }}></div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
    <Footer />
  </>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
    <AdminProvider>
    <Router>
      <ScrollToTop />
      <CustomCursor />

      <div className={`loading-screen ${!loading ? 'hidden' : ''}`} style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: '#060608',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        transition: 'opacity 0.8s ease, visibility 0.8s ease',
        opacity: loading ? 1 : 0, visibility: loading ? 'visible' : 'hidden'
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', background: 'var(--glow-green)',
          boxShadow: '0 0 40px var(--glow-green), 0 0 80px #00ff8840',
          animation: 'loadPulse 1.2s ease-in-out infinite'
        }} />
        <p style={{
          fontFamily: 'var(--font-mono)', color: 'var(--glow-green)', marginTop: '1.5rem',
          letterSpacing: '0.1em', animation: 'loadFade 1.2s ease-in-out infinite'
        }}>SEED INITIALIZING...</p>
        <style>{`
          @keyframes loadPulse { 0%, 100% { transform: scale(0.8); opacity: 0.6; } 50% { transform: scale(1.4); opacity: 1; } }
          @keyframes loadFade { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        `}</style>
      </div>

      <Routes>
        {/* Admin routes - no nav/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/portfolio/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/quote" element={<PublicLayout><Quote /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/courses/:slug" element={<PublicLayout><CourseDetail /></PublicLayout>} />
        <Route path="/courses/:slug/lessons/:lessonId" element={<PublicLayout><LessonViewer /></PublicLayout>} />
        <Route path="/courses/:slug/sandbox" element={<PublicLayout><Sandbox /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/academy" element={<PublicLayout><Academy /></PublicLayout>} />
        <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
        <Route path="/careers/:slug" element={<PublicLayout><CareerDetail /></PublicLayout>} />
        <Route path="/legal/:slug" element={<PublicLayout><Legal /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><PublicLogin /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
        <Route path="/reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />
        <Route path="/verify-email" element={<PublicLayout><VerifyEmail /></PublicLayout>} />
        <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />

        {/* Role dashboards */}
        <Route path="/client" element={<PublicLayout><ClientDashboard /></PublicLayout>} />
        <Route path="/developer" element={<PublicLayout><DeveloperDashboard /></PublicLayout>} />
        <Route path="/employer" element={<PublicLayout><EmployerDashboard /></PublicLayout>} />

        {/* Phase 7 — Platform Modules */}
        <Route path="/modules/crm" element={<PublicLayout><CRM /></PublicLayout>} />
        <Route path="/modules/project-management" element={<PublicLayout><ProjectManagement /></PublicLayout>} />
        <Route path="/modules/finance" element={<PublicLayout><Finance /></PublicLayout>} />
        <Route path="/modules/messages" element={<PublicLayout><Messages /></PublicLayout>} />
        <Route path="/modules/knowledge-base" element={<PublicLayout><KnowledgeBase /></PublicLayout>} />
        <Route path="/modules/community" element={<PublicLayout><Community /></PublicLayout>} />
        <Route path="/modules/certificate-verify" element={<PublicLayout><CertificateVerify /></PublicLayout>} />
        <Route path="/modules/certificate-verify/:id" element={<PublicLayout><CertificateVerify /></PublicLayout>} />

        {/* Instructor routes */}
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorHome />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="students" element={<InstructorStudents />} />
          <Route path="assignments" element={<InstructorAssignments />} />
          <Route path="revenue" element={<InstructorRevenue />} />
          <Route path="live" element={<InstructorLive />} />
        </Route>

        {/* Dashboard routes - no nav/footer, own sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<DashboardCourses />} />
          <Route path="bookmarks" element={<DashboardBookmarks />} />
          <Route path="certificates" element={<DashboardCertificates />} />
          <Route path="achievements" element={<DashboardAchievements />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        <Route path="*" element={<PublicLayout><Placeholder title="404 Not Found" /></PublicLayout>} />
      </Routes>
    </Router>
    </AdminProvider>
    </AuthProvider>
  );
}