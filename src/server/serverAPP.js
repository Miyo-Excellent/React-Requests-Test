////////////////////////////////////////////////////////////////////////////////////////////////////////
/*****************************************Dependencies************************************************/
import cors from 'cors';
import express from 'express';
import path from 'path';

/*****************************************Middlewares************************************************/
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import flash from 'connect-flash';
// import formidable from 'express-formidable';
// import methodOverride from 'method-override';
import morgan from 'morgan';
// import passport from 'passport';
// import serveFavicon from 'serve-favicon';
// import session from 'express-session';
// import validator from 'express-validator';

/*******************************************Webpack**************************************************/
import webpack from 'webpack';

// Webpack Configuration
import webpackConfig from '../../webpack.config';

// Webpack Middlewares
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

/*********************************************Routes************************************************/

/*********************************************API***************************************************/
import api from './api';

/////////////////////////////////////////////////////////////////////////////////////////////////////
/*****************************************Client Render********************************************/
import clientRender from './clientRender';

/********************************************Utils*************************************************/
import {
  isDesktop,
  isBot,
  isCurl,
  isMobile,
  isPlayStation
} from "../shared/utils/devices";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**********************************Variables de Entorno*******************************************/
// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Webpack Compiler
const compiler = webpack(webpackConfig);

/***************************************Express app*******************************************/
const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////////
/*****************************************Middlewares*********************************************/
app // ↓↓↓↓↓↓↓↓ APP Middlewares ↓↓↓↓↓↓↓↓
  // Favicon Middlewares
  //.use(serveFavicon(path.join(__dirname, '../../public/images/logo/logo.ico')))

  // Headers & Bodies Parsers Middlewares
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json

  //.use(methodOverride('_method'))

  // Cookies Middlewares
  .use(cookieParser())

  // Connect Flash
  // .use(flash())

  // CORS 'Access-Control-Allow-Origin'
  .use(cors())

  // Public Static
  .use(express.static(path.join(__dirname, '../../public/www')))
  .use(express.static(path.join(__dirname, './public')))

  .use('/', (req, res, next) => { // Own Middlewares
    // Bots Detection
    req.isBot = isBot(req.headers["user-agent"]);

    // Curl Detection
    req.isCurl = isCurl(req.headers["user-agent"]);

    // Device Detection
    req.isMobile = isMobile(req.headers["user-agent"]);

    // Desktop Detection
    req.isDesktop = isDesktop(req.headers["user-agent"]);

    // Desktop Detection
    req.isPlayStation = isPlayStation(req.headers["user-agent"]);

    // Mesage Success
    //res.success_msg = req.flash('success_msg');

    // Mesage Error
    //res.error_msg = req.flash('error_msg');

    // Error
    //res.error = req.flash('error');

    // Next Middleware
    return next();
  })

  // Run API
  .use('/api', api)

  /*
  .use(session({// Session
    secret: 'TOP SECRECT',
    resave: true,
    saveUnitialized : true
  }))


  /*
  .use(validator({ // Express Validator
    errorFormatter: (param, msg, value) => {
      const namespace = param.split('.');
      const Root = namespace.shift();
      let formParam = Root;

      while (namespace.length) {
        formParam += `[${namespace}]`;
      }
      return {
        msg,
        param: formParam,
        value
      };
    }
  }))
  */

  /*
  // Passport
  .use(passport.initialize())
  .use(passport.session())
  */

  // Morgan Middlewares
  .use(morgan('dev'));

////////////////////////////////////////////////////////////////////////////////////////////////////
/****************************Middlewares Only for Development mode********************************/
if (isDevelopment) { // ↓↓↓↓↓↓↓↓ Development Middlewares ↓↓↓↓↓↓↓↓
  app
    // Hot Module Replacement
    .use(webpackDevMiddleware(compiler))
    .use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/************************************Client Side Rendering****************************************/
// If a robot makes the request, the clientRender () function will return the next () method.
app.use(clientRender());

///////////////////////////////////////////////////////////////////////////////////////////////////
/****************************Middlewares Only for Production mode********************************/
if (!isDevelopment) { // ↓↓↓↓↓↓↓↓ Production Middlewares ↓↓↓↓↓↓↓↓
  try { // Server Side Rendering
    const serverRender = require('../../dist/server.js').default;
    app.use(serverRender());
  } catch (err) {
    throw err;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/***********************For Server Side Rendering on Developmnent Mode***************************/
app.use(webpackHotServerMiddleware(compiler));

///////////////////////////////////////////////////////////////////////////////////////////////////
export default app;
