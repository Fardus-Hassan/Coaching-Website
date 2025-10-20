export default function baseUrl(): string | null {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname; // e.g. fardus.website.com or localhost
    const subdomain = hostname.split(".")[0];  // "fardus"

    // ✅ localhost handle
    if (hostname.includes("localhost")) {
      const localSubdomain = subdomain === "localhost" ? null : subdomain;
      if (localSubdomain) {
        return `https://${localSubdomain}.coachingmanage.online/api/`;
      } else {
        // No subdomain → show message
        document.body.innerHTML = `<h2 style="text-align:center;margin-top:40px;">No subdomain found!</h2>`;
        return null;
      }
    }

    // ✅ Production handle
    if (subdomain && subdomain !== "www") {
      return `https://${subdomain}.coachingmanage.online/api/`;
    } else {
      // No subdomain
      document.body.innerHTML = `<h2 style="text-align:center;margin-top:40px;">No subdomain found!</h2>`;
      return null;
    }
  }

  // SSR er khetre window thake na
  return "https://demo.coachingmanage.online/api/";
}

