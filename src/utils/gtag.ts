export const GA_TRACKING_ID = '';

type ContactEvent = {
  action: 'submit_form';
  category: 'Contact';
  label: string;
  value?: string;
};

type ClickEvent = {
  action: 'click';
  category: 'Other';
  label: string;
  value?: string;
};

export type Event = ContactEvent | ClickEvent;

/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }: Event): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
