// ==UserScript==
// @name                monkey-kintone-copy-record-number
// @namespace           https://github.com/bxu/monkey-monkey-kintone-copy-record-number
// @version             0.0.1
// @description         copy record number quickly
// @author              bxu
// @copyright           bxu
// @license             MIT
// @match               https://*.cybozu.cn

// @run-at              document-end
// @supportURL          https://github.com/forestsheep911/monkey-kintone-copy-record-number/issues
// @homepage            https://github.com/forestsheep911/monkey-kintone-copy-record-number#readme
// @grant               GM_addStyle
// @icon                https://img.icons8.com/ios/50/000000/happy-eyes.png
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 752:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var app = function () {
    GM_addStyle("\n    #myMenu {\n      position: absolute;\n      background-color: #fff;\n      border: 1px solid #ccc;\n      padding: 5px;\n    }\n    \n    #myMenu li {\n      list-style-type: none;\n      padding: 5px;\n    }\n    \n    #myMenu li:hover {\n      background-color: #ccc;\n    }");
    function addContextMenu(link) {
        var ul1 = document.createElement('ul');
        ul1.innerHTML = "<ul id=\"myMenu\" style=\"display:none;\">\n    <li><a href=\"#\">copy</a></li>\n  </ul>";
        document.body.appendChild(ul1);
        var menu = document.getElementById('myMenu');
        if (!link)
            return;
        if (!menu)
            return;
        link.addEventListener('contextmenu', function (e) {
            // 阻止默认的上下文菜单
            e.preventDefault();
            // 计算菜单的位置并显示出来
            var ee = e;
            menu.style.left = ee.pageX + 'px';
            menu.style.top = ee.pageY + 'px';
            menu.style.display = 'block';
        });
        // 当菜单中的选项被点击时，执行相应的操作
        menu.addEventListener('click', function (e) {
            // 阻止链接的默认行为
            e.preventDefault();
            // 执行相应的操作
            console.log('执行操作：' + e.target.innerText);
            // 隐藏菜单
            menu.style.display = 'none';
        });
    }
    kintone.events.on('app.record.index.show', function (ke) {
        // const r1 = ke.recor+ds[0]
        // console.log(r1)
        // console.log(ke)
        for (var _i = 0, _a = ke.records; _i < _a.length; _i++) {
            var kk = _a[_i];
            for (var pn in kk) {
                if (kk[pn].type === 'RECORD_NUMBER') {
                    console.log(kk[pn].value);
                }
            }
        }
        var els = document.querySelectorAll('td.recordlist-cell-gaia a.recordlist-show-gaia');
        // console.log(els)
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            addContextMenu(el);
            console.log(els[i]);
        }
        // const button = document.createElement('button')
        // button.innerText = 'CP'
        // button.classList.add('btn-gradient')
        // button.classList.add('purple')
        // button.classList.add('mini')
        // el?.appendChild(button)
        // el.style.width = '1000px'
    });
};
exports["default"] = app;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var app_1 = __importDefault(__webpack_require__(752));
if (true) {
    (0, app_1.default)();
}
else {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;