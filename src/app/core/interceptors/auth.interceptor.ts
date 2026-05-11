import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the CSRF token from cookies
  const csrfToken = getCookie('onevo_csrf');

  let authReq = req.clone({
    withCredentials: true // Crucial for httpOnly cookies
  });

  // If CSRF token exists, add it to headers
  if (csrfToken) {
    authReq = authReq.clone({
      headers: authReq.headers.set('X-XSRF-TOKEN', csrfToken)
    });
  }

  return next(authReq);
};

/**
 * Helper function to get cookie by name
 */
function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null
  );
}
