interface McdexConfig {
    configs: { [key: string]: Promise<any> }
    onResolve: (configKey: string, callback: (config: any) => void) => Promise<void>
}

(function (config?: McdexConfig) {
    console.log('MCDEX_CONFIG INIT')
    if (!config) {
        window.MCDEX_CONFIG = config = {
            configs: {},
            onResolve: async (configKey: string | string[], callback: (config: any) => void) => {
                if (configKey instanceof Array) {
                    const configs = await Promise.all(configKey.map(key => window.MCDEX_CONFIG.configs[key]))
                    callback(configs)
                } else {
                    callback(await window.MCDEX_CONFIG.configs[configKey])
                }
            }
        }
    }

    config.configs['oracle'] = (async () => {
        const response = await fetch('http://localhost:8081/config/assets/oracle.json')
        return response.json()
    })()

})(window.MCDEX_CONFIG)