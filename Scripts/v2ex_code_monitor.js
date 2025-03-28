// 名称: V2EX送码监测

const CONFIG = {
    SITE_URL: "https://www.v2ex.com/?tab=creative",
    KEYWORD: "码",
    STORAGE_KEY: "v2ex_code_alert_ios18",
    CHECK_INTERVAL: 600 // 单位：秒(10分钟)
};

(async () => {
    // 环境验证
    if (!(typeof $environment !== 'undefined' && $environment['qx-version'] >= '1.5.0')) {
        console.log("[FATAL] 需要Quantumult X 1.5.0+环境");
        return $done();
    }

    try {
        // 网络请求(使用QX原生引擎)
        const response = await $http.get({
            url: CONFIG.SITE_URL,
            header: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QX/830",
                "Accept": "text/html,application/xhtml+xml"
            },
            timeout: 8
        });

        if (response.statusCode !== 200) {
            throw `请求失败[${response.statusCode}]`;
        }

        // 存储处理
        let storage = $cache.get(CONFIG.STORAGE_KEY) || { 
            lastCheck: 0,
            posts: {} 
        };

        // 解析优化(兼容V2EX最新页面结构)
        const newAlerts = [];
        const regex = /<span class="item_title">\s*<a href="(\/t\/\d+)[^>]*>(.*?码.*?)<\/a>/gi;
        const now = Date.now();
        
        let match;
        while ((match = regex.exec(response.body)) !== null) {
            const [_, path, title] = match;
            const postId = path.split('/')[2];
            
            if (!storage.posts[postId]) {
                newAlerts.push(`🔥 ${title.trim()}\nhttps://www.v2ex.com${path}`);
                storage.posts[postId] = now;
            }
        }

        // 通知处理
        if (newAlerts.length > 0) {
            $notification.post(
                "🎯 发现V2EX新码帖", 
                `共${newAlerts.length}条新内容`,
                newAlerts.join("\n\n")
            );
            storage.lastCheck = now;
            $cache.set(CONFIG.STORAGE_KEY, storage);
        }

        // 自动清理(30天前的记录)
        if (now - storage.lastCheck > 2592000000) {
            $cache.set(CONFIG.STORAGE_KEY, {
                lastCheck: now,
                posts: {}
            });
        }

    } catch (error) {
        $notification.post(
            "⚠️ V2EX监测故障",
            "请检查网络或脚本",
            error.message || String(error)
        );
        console.log(`[ERROR] ${error.stack}`);
    } finally {
        $done();
    }
})();
