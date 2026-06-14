/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactElement, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ThirdPartyScripts from './components/ThirdPartyScripts';
import { isValidLocation } from './config/locations';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Residential = lazy(() => import('./pages/Residential'));
const SurveyPricing = lazy(() => import('./pages/SurveyPricing'));
const TopographicSurveys = lazy(() => import('./pages/TopographicSurveys'));
const PropertyLineStaking = lazy(() => import('./pages/PropertyLineStaking'));
const SurveyTitleInsurance = lazy(() => import('./pages/SurveyTitleInsurance'));
const Subdivision = lazy(() => import('./pages/Subdivision'));
const DynamicService = lazy(() => import('./pages/DynamicService'));
const DynamicInsight = lazy(() => import('./pages/DynamicInsight'));
const DynamicProject = lazy(() => import('./pages/DynamicProject'));
const DynamicLocationService = lazy(() => import('./pages/DynamicLocationService'));
const DynamicLocationHome = lazy(() => import('./pages/DynamicLocationHome'));

interface LocationRouteGuardProps {
  children: ReactElement;
}

function LocationRouteGuard({ children }: LocationRouteGuardProps) {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = useLocation();

  if (!locationSlug || !isValidLocation(locationSlug)) {
    // Fallback to non-localized path if locationSlug is invalid
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      const fallbackPath = '/' + pathParts.slice(1).join('/');
      return <Navigate to={fallbackPath} replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ThirdPartyScripts />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="residential" element={<Residential />} />
          <Route path="survey-pricing" element={<SurveyPricing />} />
          <Route path="topographic-surveys" element={<TopographicSurveys />} />
          <Route path="sea-to-sky-property-line-and-boundary-staking" element={<PropertyLineStaking />} />
          <Route path="surveys-and-title-insurance" element={<SurveyTitleInsurance />} />
          <Route path="subdivision" element={<Subdivision />} />
          <Route path="services/:serviceSlug" element={<DynamicService />} />
          <Route path="insights/:postSlug" element={<DynamicInsight />} />
          <Route path="projects/:projectSlug" element={<DynamicProject />} />

          {/* Localized routes */}
          <Route
            path=":locationSlug"
            element={
              <LocationRouteGuard>
                <DynamicLocationHome />
              </LocationRouteGuard>
            }
          />
          <Route
            path=":locationSlug/services/:serviceSlug"
            element={
              <LocationRouteGuard>
                <DynamicLocationService />
              </LocationRouteGuard>
            }
          />
          <Route
            path=":locationSlug/insights/:postSlug"
            element={
              <LocationRouteGuard>
                <DynamicInsight />
              </LocationRouteGuard>
            }
          />
          <Route
            path=":locationSlug/projects/:projectSlug"
            element={
              <LocationRouteGuard>
                <DynamicProject />
              </LocationRouteGuard>
            }
          />
        </Route>
      </Routes>
    </Suspense>
    </>
  );
}