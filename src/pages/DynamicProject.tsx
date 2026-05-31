import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import ProjectTemplate from '../templates/ProjectTemplate';

// Dynamically import all MDX files in the projects content directory recursively
const modules = import.meta.glob('../content/projects/**/*.mdx');

export default function DynamicProject() {
  const params = useParams<{ locationSlug?: string; projectSlug: string }>();
  const { locationSlug, projectSlug } = params;
  const [moduleData, setModuleData] = useState<{
    Component: React.ComponentType<any> | null;
    frontmatter?: any;
    metadata?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { locationSlug, projectSlug } = params;
    if (!projectSlug) {
      setModuleData(null);
      setLoading(false);
      return;
    }

    const key = locationSlug
      ? `../content/projects/${locationSlug}/${projectSlug}.mdx`
      : `../content/projects/${projectSlug}.mdx`;
    if (key in modules) {
      setLoading(true);
      // Call the glob function to import the MDX module dynamically
      (modules[key] as () => Promise<any>)()
        .then((mod) => {
          setModuleData({
            Component: mod.default,
            frontmatter: mod.frontmatter,
            metadata: mod.metadata,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load project MDX module:', err);
          setModuleData(null);
          setLoading(false);
        });
    } else {
      setModuleData(null);
      setLoading(false);
    }
  }, [locationSlug, projectSlug]);

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading project...</div>
        </div>
      </PageShell>
    );
  }

  if (!moduleData || !moduleData.Component) {
    return (
      <PageShell>
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-brand-black px-4">
          <h1 className="text-6xl font-bold mb-4 text-brand-green">404</h1>
          <p className="text-xl mb-8 text-slate-300">Project not found</p>
          <Link to="/" className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all">
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  const { Component, frontmatter, metadata } = moduleData;
  const meta = frontmatter || metadata || {};

  // Format slug to a readable title as fallback
  const fallbackTitle = projectSlug
    ? projectSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Project';

  return (
    <Suspense fallback={
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading project...</div>
        </div>
      </PageShell>
    }>
      <ProjectTemplate
        title={meta.title || fallbackTitle}
        client={meta.client}
        location={meta.location || 'British Columbia'}
        completionDate={meta.completionDate || ''}
        heroImage={meta.heroImage}
        galleryImages={meta.galleryImages}
        projectScope={meta.projectScope}
        finalDeliverables={meta.finalDeliverables}
      >
        <Component />
      </ProjectTemplate>
    </Suspense>
  );
}
