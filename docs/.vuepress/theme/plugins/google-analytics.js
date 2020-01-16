import $script from 'scriptjs'
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/url-change-tracker';
$script('https://www.google-analytics.com/analytics.js')

const trackId = 'UA-155723570-1'
ga('create', trackId, 'auto');
// Only require the plugins you've imported above.
ga('require', 'eventTracker');
ga('require', 'outboundLinkTracker');
ga('require', 'urlChangeTracker');
ga('send', 'pageview');
