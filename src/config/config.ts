interface McdexConfig {
    configs: { [key: string]: Promise<any> }
    onResolve: (configKey: string | string[]) => Promise<any>
}

(function (config?: McdexConfig) {
    console.log('MCDEX_CONFIG INIT')
    // const host = 'http://localhost:8081'
    const host = 'https://mcdexio.github.io/mcdex-assets'
    const configs = new Map<string, string>([
        ['oracle', 'src/config/assets/oracle.json'],
        ['pool', 'src/config/assets/pool.json'],
        ['tradingMiningMerkel', 'src/config/assets/tradingMiningMerkel.json'],
        ['gasFeeRebateMerkel', 'src/config/assets/gasFeeRebateMerkel.json'],
    ])

    if (!config) {
        window.MCDEX_CONFIG = config = {
            configs: {},
            onResolve: async (configKey: string | string[]) => {
                if (configKey instanceof Array) {
                    return Promise.all(configKey.map(key => window.MCDEX_CONFIG.configs[key]))
                } else {
                    return window.MCDEX_CONFIG.configs[configKey]
                }
            }
        }
    }

    const fetchFunc = async (uri: string, retryTimes = 5): Promise<Response> => {
        try {
            return await fetch(`${host}/${uri}`)
        } catch (e) {
            if (retryTimes > 0) {
                console.log('retry fetch time', 6 - retryTimes, uri)
                return await fetchFunc(uri,retryTimes - 1)
            }
            throw e
        }
    }

    configs.forEach((uri, key) => {
        window.MCDEX_CONFIG.configs[key] = (async () => {
            return (await fetchFunc(uri)).json()
        })()
    })

})(window.MCDEX_CONFIG)