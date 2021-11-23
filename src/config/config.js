"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (config) {
    console.log('MCDEX_CONFIG INIT');
    // const host = 'http://localhost:8081'
    const host = 'https://raw.githubusercontent.com/mcdexio/mcdex-assets/master';
    if (!config) {
        window.MCDEX_CONFIG = config = {
            configs: {},
            onResolve: (configKey, callback) => __awaiter(this, void 0, void 0, function* () {
                if (configKey instanceof Array) {
                    const configs = yield Promise.all(configKey.map(key => window.MCDEX_CONFIG.configs[key]));
                    callback(configs);
                }
                else {
                    callback(yield window.MCDEX_CONFIG.configs[configKey]);
                }
            })
        };
    }
    config.configs['oracle'] = (() => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${host}/config/assets/oracle.json`);
        return response.json();
    }))();
})(window.MCDEX_CONFIG);
