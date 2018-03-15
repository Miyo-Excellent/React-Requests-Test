export function getCurrentDevice(ua) {
  return /mobile/i.test(ua) ? 'mobile' : 'desktop';
}

export function isBot(ua) {
  return /curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|crawler|spider|robot|crawling/i.test(ua);
}

export function isPlayStation(ua) {
  return /PlayStation/i.test(ua);
}

export function isDesktop(ua) {
  return /(Windows|Linux|Macintosh)/i.test(ua);
}

export function isCurl(ua) {
  return /curl/i.test(ua);
}

export function isMobile(ua) {
  return /mobile/i.test(ua);
}
