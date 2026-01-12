/**
 * Simple Analytics Utility
 * Wraps GA4 events and provides specific helper functions for our growth metrics.
 */

// Initialize global if not present (for robustness)
const gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };

export const analytics = {
    // Track specific button clicks
    trackCTA: (ctaId, location) => {
        console.log(`[Analytics] CTA Clicked: ${ctaId} at ${location}`);
        gtag('event', 'click', {
            event_category: 'CTA',
            event_label: ctaId,
            page_location: location
        });
    },

    // Track start of signup flow
    trackSignupStart: (source) => {
        console.log(`[Analytics] Signup Started from: ${source}`);
        gtag('event', 'begin_checkout', {
            event_category: 'Conversion',
            event_label: source
        });
    },

    // Track successful signup
    trackSignupComplete: (userId) => {
        console.log(`[Analytics] Signup Complete: ${userId}`);
        gtag('event', 'sign_up', {
            method: 'email',
            user_id: userId
        });
    },

    // Track page views (useful for SPA transitions)
    trackPageView: (path) => {
        console.log(`[Analytics] Page View: ${path}`);
        gtag('config', 'G-PLACEHOLDER', {
            page_path: path
        });
    },

    // Track custom user actions (for retention dashboard)
    trackUserAction: (actionType) => {
        console.log(`[Analytics] User Action: ${actionType}`);
        gtag('event', actionType, {
            event_category: 'Engagement'
        });
    }
};

export default analytics;
