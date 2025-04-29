import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "./styles/theme.ts";
import { ThemeProvider } from "styled-components";

const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const SmallFooter = React.lazy(() => import("./components/SmallFooter"));
const ScrollToTop = React.lazy(() => import("./components/ScrollToTop"));

const Home = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./pages/Auth/Login"));
const Logout = React.lazy(() => import("./pages/Auth/Logout"));
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDashboard"));

import GlobalStyles from "./GlobalStyles";

import Loader from "./components/Loader";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const FooterWrapper: React.FC = () => {
  const location = useLocation();
  return location.pathname === "/" ? <Footer /> : <SmallFooter />;
};

const ConditionalHeader = () => {
  const location = useLocation();
  if (
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/logout" ||
    location.pathname === "/Login"
  ) {
    return null;
  }
  return <Header />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/logout") {
    return null;
  }
  return <FooterWrapper />;
};

export const PrivateRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyles />
          <Suspense fallback={<Loader />}>
            <ConditionalHeader />
            <ScrollToTop />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/admin/*"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </ContentWrapper>
            <ConditionalFooter />
          </Suspense>
        </AppContainer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />

</ThemeProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
