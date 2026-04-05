/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router basename="/">
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
          <Route path="sea-to-sky-property-line-and-boundary-staking" element={<PropertyLineStaking />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
