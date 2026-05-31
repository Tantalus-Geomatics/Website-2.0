/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactElement } from 'react';
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Residential from './pages/Residential';
import SurveyPricing from './pages/SurveyPricing';
import TopographicSurveys from './pages/TopographicSurveys';
import PropertyLineStaking from './pages/PropertyLineStaking';
import SurveyTitleInsurance from './pages/SurveyTitleInsurance';
import Subdivision from './pages/Subdivision';
import DynamicService from './pages/DynamicService';
import DynamicInsight from './pages/DynamicInsight';
import DynamicProject from './pages/DynamicProject';
import DynamicLocationService from './pages/DynamicLocationService';
import { isValidLocation } from './config/locations';

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

export default function App() {
  return (
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
  );
}