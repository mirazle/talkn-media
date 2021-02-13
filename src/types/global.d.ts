declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: React.ComponentType;
  export default content;
}

/* for Google Analytics */
interface Window {
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    },
  );
}
