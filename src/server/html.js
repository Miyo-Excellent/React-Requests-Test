export default function html(options) {
  const {
    app = 'main',
    appleFavicon = './images/logo/logo.ico',
    charset = 'utf-8',
    description = 'Test Aplication',
    favicon = './images/logo/logo.ico',
    initialState = {},
    markup,
    rootElement = 'root',
    scalable = 'no',
    stylesheet = '/css/style.css',
    themeColor = 'black',
    title = 'React Request',
    vendor = 'vendor'
  } = options;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="${charset}">
        <title>${title}</title>
        <meta name="description" content="${description}">

        <!-- Mobile -->
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=${scalable}">

        <!-- Chrome / Android -->
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="theme-color" content="${themeColor}">
        <link rel="icon" href="${favicon}">

        <!-- Safari / iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon-precomposed" href="${appleFavicon}">

        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="${stylesheet}" />

        <style>
          div#root.root {
            width: 100%;
            height: 100%;
          }
        </style>

        <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

      </head>
      <body>

        <div id="${rootElement}" class="${rootElement}">${markup}</div>

        <script>
          window.initialState = ${JSON.stringify(initialState)};
        </script>

        <script src="/app/${vendor}.bundle.js"></script>

        <script src="/app/${app}.bundle.js"></script>

      </body>
    </html>
        `;
}
