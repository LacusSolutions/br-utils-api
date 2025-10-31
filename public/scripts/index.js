'use strict';

window.onload = function () {
  window.ui = SwaggerUIBundle({
    url: './v1.openapi.yaml',
    dom_id: '#swagger-ui',
    queryConfigEnabled: true,
    tryItOutEnabled: true,
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: 'StandaloneLayout',
    requestInterceptor(request) {
      // Add authentication information
      if (!request.headers.Authorization) {
        console.warn('⚠️ Remember to include the Authorization: Bearer <token> header');
      }

      return request;
    },
    onComplete() {
      const authButton = document.querySelector('.auth-btn-wrapper .btn.authorize');

      if (authButton) {
        authButton.addEventListener('click', function () {
          setTimeout(() => {
            const authModal = document.querySelector('.auth-container');

            if (authModal) {
              const info = document.createElement('div');
              info.className = 'auth-info';
              info.innerHTML = `
                                  <strong>💡 Tip:</strong> Use the token configured in the <code>API_TOKEN</code> environment variable.
                                  Example: <code>your-token-here</code>
                              `;
              authModal.appendChild(info);
            }
          }, 100);
        });
      }
    },
  });
};
