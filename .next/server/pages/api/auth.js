module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/api/auth.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/firebase/firebaseAdmin.jsx":
/*!***************************************************!*\
  !*** ./src/components/firebase/firebaseAdmin.jsx ***!
  \***************************************************/
/*! exports provided: firebaseAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\n/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"firebaseAdmin\", function() { return firebase_admin__WEBPACK_IMPORTED_MODULE_0__; });\n/* harmony import */ var config_firebase_service_account_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config/firebase-service-account.json */ \"./src/config/firebase-service-account.json\");\nvar config_firebase_service_account_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! config/firebase-service-account.json */ \"./src/config/firebase-service-account.json\", 1);\n/* harmony import */ var config_firebase_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! config/firebase.config */ \"./src/config/firebase.config.jsx\");\n\n\n // Check whether firebase admin has been initialized\n\nif (!firebase_admin__WEBPACK_IMPORTED_MODULE_0__[\"apps\"].length) {\n  // Initialize firebase admin\n  firebase_admin__WEBPACK_IMPORTED_MODULE_0__[\"initializeApp\"]({\n    credential: firebase_admin__WEBPACK_IMPORTED_MODULE_0__[\"credential\"].cert(config_firebase_service_account_json__WEBPACK_IMPORTED_MODULE_1__),\n    databaseURL: config_firebase_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].databaseURL\n  });\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9maXJlYmFzZS9maXJlYmFzZUFkbWluLmpzeD9jOGZiIl0sIm5hbWVzIjpbImZpcmViYXNlQWRtaW4iLCJsZW5ndGgiLCJjcmVkZW50aWFsIiwiY2VydCIsInNlcnZpY2VBY2NvdW50IiwiZGF0YWJhc2VVUkwiLCJGSVJFQkFTRSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0NBR0E7O0FBQ0EsSUFBSSxDQUFDQSxtREFBQSxDQUFtQkMsTUFBeEIsRUFBZ0M7QUFDOUI7QUFDQUQsOERBQUEsQ0FBNEI7QUFDMUJFLGNBQVUsRUFBRUYseURBQUEsQ0FBeUJHLElBQXpCLENBQThCQyxpRUFBOUIsQ0FEYztBQUUxQkMsZUFBVyxFQUFFQyw4REFBUSxDQUFDRDtBQUZJLEdBQTVCO0FBSUQiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9maXJlYmFzZS9maXJlYmFzZUFkbWluLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZpcmViYXNlQWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCJcbmltcG9ydCBzZXJ2aWNlQWNjb3VudCBmcm9tIFwiY29uZmlnL2ZpcmViYXNlLXNlcnZpY2UtYWNjb3VudC5qc29uXCJcbmltcG9ydCBGSVJFQkFTRSBmcm9tIFwiY29uZmlnL2ZpcmViYXNlLmNvbmZpZ1wiXG5cbi8vIENoZWNrIHdoZXRoZXIgZmlyZWJhc2UgYWRtaW4gaGFzIGJlZW4gaW5pdGlhbGl6ZWRcbmlmICghZmlyZWJhc2VBZG1pbi5hcHBzLmxlbmd0aCkge1xuICAvLyBJbml0aWFsaXplIGZpcmViYXNlIGFkbWluXG4gIGZpcmViYXNlQWRtaW4uaW5pdGlhbGl6ZUFwcCh7XG4gICAgY3JlZGVudGlhbDogZmlyZWJhc2VBZG1pbi5jcmVkZW50aWFsLmNlcnQoc2VydmljZUFjY291bnQpLFxuICAgIGRhdGFiYXNlVVJMOiBGSVJFQkFTRS5kYXRhYmFzZVVSTFxuICB9KVxufVxuXG5leHBvcnQgeyBmaXJlYmFzZUFkbWluIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/firebase/firebaseAdmin.jsx\n");

/***/ }),

/***/ "./src/config/firebase-service-account.json":
/*!**************************************************!*\
  !*** ./src/config/firebase-service-account.json ***!
  \**************************************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"type\\\":\\\"service_account\\\",\\\"project_id\\\":\\\"teachingpath-co\\\",\\\"private_key_id\\\":\\\"1c913409e5a229b6b57ee4eb78a560e8ba29e94c\\\",\\\"private_key\\\":\\\"-----BEGIN PRIVATE KEY-----\\\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZ9lxlwt9uBrj+\\\\nrxG34d3eCLnSeBhi2mwRyIgGXSpoh0unVYyHhsY3JVi4oebqLnzuKO2n/8T7k5HK\\\\nfpW1rxrAkgfVJAFgS20YpSgj4CQlwX6WkwKWros5VWF5LMs3PcX2t3+zrjkCX++z\\\\nY80wUe3UJFeif926LVYdjnODmzVhtig9KYoU+7ceT1whrg8lj69oVI11ki0aC3QY\\\\nJ1Tc4FTpdzyv7Wk2mOVB9aSG+fLS81wTxjwiFoNjWafNlJKVmj/o4FwK1zb32xe+\\\\noK1uH7xmZ3IRKA6m5vLqETSPhr0mUGrxcmIkVGMj8Dq/9WwGxExmekoh8q0vDpiZ\\\\nfU8bK4JZAgMBAAECggEANU9pQfEelUXto34yF+Y1AS8rTJW59+yik+vIMc/rocML\\\\nLpdAMCM6Ghkr5c5lmvva1UpFtDCrX+MCjceUBhNqI3jNDn/HnDSxw2FYi0eOrKYZ\\\\ns4CW2l74pTMLq74XZXrVw65ZIPm4ErruUELD5zHPNHAbChDVUSRml5heJhlFfB3h\\\\nvAll/LjHMHrZg5sDYFushxn1EwdkKbd3/x0W57Bn+r+XL8jebkgrovJSuBLIQ3H/\\\\n3HjHD8DG7XiNXfT1lHtBgoPJuXhAsPD2g8k7mzxftkWrkxSrZ6hf+E/fn82DOPJa\\\\nji3ACdWdFrH0jP1SzQYjuo6KDuIZzCuc4LjNmUQ5gwKBgQDLqOmT40pjsBOluwYK\\\\nYdRp8/VWzxG6FRA2Xb5ex0T4AXTM5Gn++eEKFP4ecRgLNoELTaw9PFVTx9+WFjoO\\\\nuyScvq4L0G827bhmWCUAjEO3EKnsKOEfgL2V4gaHaEt0DBdAsJKvvK5jiNACCggK\\\\n23cDDyIIFf5swy21t4TTy3ow8wKBgQDBh8bkFKhI8/pQqsck0OszdqgTwIFlDsQz\\\\n/dNqqt2gjAbnoa6KcvlpmDfhqYr3sKMUuVi1NTuhd18TMafacvBa4ftZMC4XdRGf\\\\n+rAYTBEtwQg2XyI5oUD/BzhN3TVC1g4wZr3W4cK+dXZ/cdz6nlrA4vESmT0jSNQe\\\\n9/M7dtcygwKBgQCJfzKja7KPdxLss0WywLW+Cry6rPZU4V+etM+QAYzou2L16cg+\\\\nIsnyGpYuS0BmYZfh38DHXvJkq+6hz8PGqkZfpMSwqTpMpVX3ks74fbpB3/g4vqiu\\\\nsiZNCNpLlPhMEtWoEQ4Xo5VBEd8NYWRooB7La+4X83FgUK2Nn6cHrrqCTQKBgEgp\\\\njbL8NOfG+Z5cn5cNw7XT18ZNsLHy+Jv+WHfcsHkt3WE/e2qqhm+mT6f4ZRYIqjaP\\\\nChG/gLWrYisxB8q/svnga62M9pLOlzzU6BaXPoyV/q7veD6O70Jo+cim5DZAxNet\\\\nZ7oZQllsSTwqQ+C7bVGhDY0G0LI4dMf7YpnYrVNrAoGBAJ1sLir8b8ajW531VD72\\\\nU8BBiaPttilqH/U/CCtgROZMIhmC6A3V5xNROSBAQV6PRIuAPB9vRwZDPChfuTH6\\\\nc9pe4ACFrq9lHH1ZhgZi1snYLPt131FAUje2LZbslQ1L8xN3sw+93jgc/r2+cogl\\\\neqhXVbsVorVYSEi5B6abAaGh\\\\n-----END PRIVATE KEY-----\\\\n\\\",\\\"client_email\\\":\\\"firebase-adminsdk-jaymu@teachingpath-co.iam.gserviceaccount.com\\\",\\\"client_id\\\":\\\"105396186516948396591\\\",\\\"auth_uri\\\":\\\"https://accounts.google.com/o/oauth2/auth\\\",\\\"token_uri\\\":\\\"https://oauth2.googleapis.com/token\\\",\\\"auth_provider_x509_cert_url\\\":\\\"https://www.googleapis.com/oauth2/v1/certs\\\",\\\"client_x509_cert_url\\\":\\\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jaymu%40teachingpath-co.iam.gserviceaccount.com\\\"}\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3NyYy9jb25maWcvZmlyZWJhc2Utc2VydmljZS1hY2NvdW50Lmpzb24uanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/firebase-service-account.json\n");

/***/ }),

/***/ "./src/config/firebase.config.jsx":
/*!****************************************!*\
  !*** ./src/config/firebase.config.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Firebase Configuration\n * Get the configuration in your firebase console page\n */\nconst FIREBASE = {\n  apiKey: \"AIzaSyCTEUvOS5cYl_kj_-4HJweAgniYhR_clhM\",\n  authDomain: \"teachingpath-co.firebaseapp.com\",\n  projectId: \"teachingpath-co\",\n  storageBucket: \"teachingpath-co.appspot.com\",\n  messagingSenderId: \"654834840574\",\n  appId: \"1:654834840574:web:0bdd86943eaeb1f7af06af\"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (FIREBASE);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2ZpcmViYXNlLmNvbmZpZy5qc3g/MjM2MSJdLCJuYW1lcyI6WyJGSVJFQkFTRSIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLFFBQVEsR0FBRztBQUNmQyxRQUFNLEVBQUUseUNBRE87QUFFZkMsWUFBVSxFQUFFLGlDQUZHO0FBR2ZDLFdBQVMsRUFBRSxpQkFISTtBQUlmQyxlQUFhLEVBQUUsNkJBSkE7QUFLZkMsbUJBQWlCLEVBQUUsY0FMSjtBQU1mQyxPQUFLLEVBQUU7QUFOUSxDQUFqQjtBQVNlTix1RUFBZiIsImZpbGUiOiIuL3NyYy9jb25maWcvZmlyZWJhc2UuY29uZmlnLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBGaXJlYmFzZSBDb25maWd1cmF0aW9uXG4gKiBHZXQgdGhlIGNvbmZpZ3VyYXRpb24gaW4geW91ciBmaXJlYmFzZSBjb25zb2xlIHBhZ2VcbiAqL1xuXG5jb25zdCBGSVJFQkFTRSA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUNURVV2T1M1Y1lsX2tqXy00SEp3ZUFnbmlZaFJfY2xoTVwiLFxuICBhdXRoRG9tYWluOiBcInRlYWNoaW5ncGF0aC1jby5maXJlYmFzZWFwcC5jb21cIixcbiAgcHJvamVjdElkOiBcInRlYWNoaW5ncGF0aC1jb1wiLFxuICBzdG9yYWdlQnVja2V0OiBcInRlYWNoaW5ncGF0aC1jby5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCI2NTQ4MzQ4NDA1NzRcIixcbiAgYXBwSWQ6IFwiMTo2NTQ4MzQ4NDA1NzQ6d2ViOjBiZGQ4Njk0M2VhZWIxZjdhZjA2YWZcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBGSVJFQkFTRVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/firebase.config.jsx\n");

/***/ }),

/***/ "./src/pages/api/auth.jsx":
/*!********************************!*\
  !*** ./src/pages/api/auth.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var components_firebase_firebaseAdmin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/firebase/firebaseAdmin */ \"./src/components/firebase/firebaseAdmin.jsx\");\n\n\nasync function authenticatedHandler(req, res) {\n  if (req.method === \"POST\") {\n    // Try to verify token with firebase admin\n    try {\n      const firebaseData = await components_firebase_firebaseAdmin__WEBPACK_IMPORTED_MODULE_0__[\"firebaseAdmin\"].auth().verifyIdToken(req.body.token); // Return firebase data\n\n      res.status(200).json(firebaseData);\n    } catch (err) {\n      res.status(401).send(\"Invalid authentication\");\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (authenticatedHandler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpL2F1dGguanN4Pzc5ODUiXSwibmFtZXMiOlsiYXV0aGVudGljYXRlZEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJmaXJlYmFzZURhdGEiLCJmaXJlYmFzZUFkbWluIiwiYXV0aCIsInZlcmlmeUlkVG9rZW4iLCJib2R5IiwidG9rZW4iLCJzdGF0dXMiLCJqc29uIiwiZXJyIiwic2VuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOztBQUVBLGVBQWVBLG9CQUFmLENBQW9DQyxHQUFwQyxFQUF5Q0MsR0FBekMsRUFBOEM7QUFDNUMsTUFBSUQsR0FBRyxDQUFDRSxNQUFKLEtBQWUsTUFBbkIsRUFBMkI7QUFDekI7QUFDQSxRQUFJO0FBQ0YsWUFBTUMsWUFBWSxHQUFHLE1BQU1DLCtFQUFhLENBQUNDLElBQWQsR0FBcUJDLGFBQXJCLENBQW1DTixHQUFHLENBQUNPLElBQUosQ0FBU0MsS0FBNUMsQ0FBM0IsQ0FERSxDQUdGOztBQUNBUCxTQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQlAsWUFBckI7QUFDRCxLQUxELENBS0UsT0FBT1EsR0FBUCxFQUFZO0FBQ1pWLFNBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JHLElBQWhCLENBQXFCLHdCQUFyQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFY2IsbUZBQWYiLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXBpL2F1dGguanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlyZWJhc2VBZG1pbiB9IGZyb20gXCJjb21wb25lbnRzL2ZpcmViYXNlL2ZpcmViYXNlQWRtaW5cIlxuXG5hc3luYyBmdW5jdGlvbiBhdXRoZW50aWNhdGVkSGFuZGxlcihyZXEsIHJlcykge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAvLyBUcnkgdG8gdmVyaWZ5IHRva2VuIHdpdGggZmlyZWJhc2UgYWRtaW5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlyZWJhc2VEYXRhID0gYXdhaXQgZmlyZWJhc2VBZG1pbi5hdXRoKCkudmVyaWZ5SWRUb2tlbihyZXEuYm9keS50b2tlbilcblxuICAgICAgLy8gUmV0dXJuIGZpcmViYXNlIGRhdGFcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGZpcmViYXNlRGF0YSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKFwiSW52YWxpZCBhdXRoZW50aWNhdGlvblwiKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhdXRoZW50aWNhdGVkSGFuZGxlclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/api/auth.jsx\n");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS1hZG1pblwiPzg5M2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZmlyZWJhc2UtYWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS1hZG1pblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///firebase-admin\n");

/***/ })

/******/ });