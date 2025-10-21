// For server-side rendering, we need to get the hostname from headers
export function getServerBaseUrl(host?: string) {
  if (host) {
    const firstWord = host.split('.')[0];
    return `https://${firstWord}.coachingmanage.online/api/`;
  }
  return "https://demo.coachingmanage.online/api/";
}

// For client-side
export default function baseUrl() {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const firstWord = hostname.split('.')[0];
    return `https://${firstWord}.coachingmanage.online/api/`;
  }
  return "https://demo.coachingmanage.online/api/";
}

