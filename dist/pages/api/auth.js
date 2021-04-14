(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["self"] = factory();
	else
		root["self"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("eYUh");


/***/ }),

/***/ "7n/8":
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"service_account\",\"project_id\":\"teachingpath-co\",\"private_key_id\":\"1c913409e5a229b6b57ee4eb78a560e8ba29e94c\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZ9lxlwt9uBrj+\\nrxG34d3eCLnSeBhi2mwRyIgGXSpoh0unVYyHhsY3JVi4oebqLnzuKO2n/8T7k5HK\\nfpW1rxrAkgfVJAFgS20YpSgj4CQlwX6WkwKWros5VWF5LMs3PcX2t3+zrjkCX++z\\nY80wUe3UJFeif926LVYdjnODmzVhtig9KYoU+7ceT1whrg8lj69oVI11ki0aC3QY\\nJ1Tc4FTpdzyv7Wk2mOVB9aSG+fLS81wTxjwiFoNjWafNlJKVmj/o4FwK1zb32xe+\\noK1uH7xmZ3IRKA6m5vLqETSPhr0mUGrxcmIkVGMj8Dq/9WwGxExmekoh8q0vDpiZ\\nfU8bK4JZAgMBAAECggEANU9pQfEelUXto34yF+Y1AS8rTJW59+yik+vIMc/rocML\\nLpdAMCM6Ghkr5c5lmvva1UpFtDCrX+MCjceUBhNqI3jNDn/HnDSxw2FYi0eOrKYZ\\ns4CW2l74pTMLq74XZXrVw65ZIPm4ErruUELD5zHPNHAbChDVUSRml5heJhlFfB3h\\nvAll/LjHMHrZg5sDYFushxn1EwdkKbd3/x0W57Bn+r+XL8jebkgrovJSuBLIQ3H/\\n3HjHD8DG7XiNXfT1lHtBgoPJuXhAsPD2g8k7mzxftkWrkxSrZ6hf+E/fn82DOPJa\\nji3ACdWdFrH0jP1SzQYjuo6KDuIZzCuc4LjNmUQ5gwKBgQDLqOmT40pjsBOluwYK\\nYdRp8/VWzxG6FRA2Xb5ex0T4AXTM5Gn++eEKFP4ecRgLNoELTaw9PFVTx9+WFjoO\\nuyScvq4L0G827bhmWCUAjEO3EKnsKOEfgL2V4gaHaEt0DBdAsJKvvK5jiNACCggK\\n23cDDyIIFf5swy21t4TTy3ow8wKBgQDBh8bkFKhI8/pQqsck0OszdqgTwIFlDsQz\\n/dNqqt2gjAbnoa6KcvlpmDfhqYr3sKMUuVi1NTuhd18TMafacvBa4ftZMC4XdRGf\\n+rAYTBEtwQg2XyI5oUD/BzhN3TVC1g4wZr3W4cK+dXZ/cdz6nlrA4vESmT0jSNQe\\n9/M7dtcygwKBgQCJfzKja7KPdxLss0WywLW+Cry6rPZU4V+etM+QAYzou2L16cg+\\nIsnyGpYuS0BmYZfh38DHXvJkq+6hz8PGqkZfpMSwqTpMpVX3ks74fbpB3/g4vqiu\\nsiZNCNpLlPhMEtWoEQ4Xo5VBEd8NYWRooB7La+4X83FgUK2Nn6cHrrqCTQKBgEgp\\njbL8NOfG+Z5cn5cNw7XT18ZNsLHy+Jv+WHfcsHkt3WE/e2qqhm+mT6f4ZRYIqjaP\\nChG/gLWrYisxB8q/svnga62M9pLOlzzU6BaXPoyV/q7veD6O70Jo+cim5DZAxNet\\nZ7oZQllsSTwqQ+C7bVGhDY0G0LI4dMf7YpnYrVNrAoGBAJ1sLir8b8ajW531VD72\\nU8BBiaPttilqH/U/CCtgROZMIhmC6A3V5xNROSBAQV6PRIuAPB9vRwZDPChfuTH6\\nc9pe4ACFrq9lHH1ZhgZi1snYLPt131FAUje2LZbslQ1L8xN3sw+93jgc/r2+cogl\\neqhXVbsVorVYSEi5B6abAaGh\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"firebase-adminsdk-jaymu@teachingpath-co.iam.gserviceaccount.com\",\"client_id\":\"105396186516948396591\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jaymu%40teachingpath-co.iam.gserviceaccount.com\"}");

/***/ }),

/***/ "I2G7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Firebase Configuration
 * Get the configuration in your firebase console page
 */
const FIREBASE = {
  apiKey: "AIzaSyCTEUvOS5cYl_kj_-4HJweAgniYhR_clhM",
  authDomain: "teachingpath-co.firebaseapp.com",
  projectId: "teachingpath-co",
  storageBucket: "teachingpath-co.appspot.com",
  messagingSenderId: "654834840574",
  appId: "1:654834840574:web:0bdd86943eaeb1f7af06af"
};
/* harmony default export */ __webpack_exports__["a"] = (FIREBASE);

/***/ }),

/***/ "NWFc":
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),

/***/ "eYUh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "firebase-admin"
var external_firebase_admin_ = __webpack_require__("NWFc");

// EXTERNAL MODULE: ./src/config/firebase-service-account.json
var firebase_service_account = __webpack_require__("7n/8");

// EXTERNAL MODULE: ./src/config/firebase.config.jsx
var firebase_config = __webpack_require__("I2G7");

// CONCATENATED MODULE: ./src/components/firebase/firebaseAdmin.jsx


 // Check whether firebase admin has been initialized

if (!external_firebase_admin_["apps"].length) {
  // Initialize firebase admin
  external_firebase_admin_["initializeApp"]({
    credential: external_firebase_admin_["credential"].cert(firebase_service_account),
    databaseURL: firebase_config["a" /* default */].databaseURL
  });
}


// CONCATENATED MODULE: ./src/pages/api/auth.jsx


async function authenticatedHandler(req, res) {
  if (req.method === "POST") {
    // Try to verify token with firebase admin
    try {
      const firebaseData = await external_firebase_admin_.auth().verifyIdToken(req.body.token); // Return firebase data

      res.status(200).json(firebaseData);
    } catch (err) {
      res.status(401).send("Invalid authentication");
    }
  }
}

/* harmony default export */ var auth = __webpack_exports__["default"] = (authenticatedHandler);

/***/ })

/******/ });
});