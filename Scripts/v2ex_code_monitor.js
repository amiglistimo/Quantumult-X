// 名称: V2EX送码监测

const V2EX_MONITOR = {
    // 基础配置
    SITE_URL: "https://www.v2ex.com/?tab=creative",
    KEYWORD: "码",
    STORAGE_KEY: "v2ex_code_contract_v1",
    
    // 环境检测
    isQX: typeof $task !== 'undefined',
    isQX830: typeof $environment !== 'undefined' && $environment['qx-version'] >= '1.5.0',
    
    // 初始化
    init: function() {
        try {
            // 环境验证
            if (!this.isQX) throw "必须在Quantumult X中运行";
            
            // 开始监测
            this.monitor();
        } catch (error) {
            this.notify("❌ 初始化失败", error);
            typeof $done === 'function' && $done();
        }
    },
    
    // 主逻辑
    monitor: async function() {
        try {
            // 1. 网络请求
            const response = await this.fetchData();
            if (!response.body) throw "获取内容为空";
            
            // 2. 解析内容
            const results = this.parseContent(response.body);
            if (results.newPosts.length > 0) {
                this.notifyResults(results);
            }
            
        } catch (error) {
            this.notify("⚠️ 监测异常", error);
        } finally {
            typeof $done === 'function' && $done();
        }
    },
    
    // 网络请求
    fetchData: function() {
        return new Promise((resolve, reject) => {
            const opts = {
                url: this.SITE_URL,
                timeout: 10,
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                    "Accept-Language": "zh-CN,zh-Hans;q=0.9"
                }
            };
            
            if (this.isQX830) {
                $http.get(opts).then(resolve, reject);
            } else {
                $task.fetch(opts).then(resolve, reject);
            }
        });
    },
    
    // 内容解析
    parseContent: function(html) {
        const storage = JSON.parse($prefs.valueForKey(this.STORAGE_KEY) || { posts: {} };
        const newPosts = [];
        const regex = /<span class="item_title">\s*<a href="(\/t\/\d+)[^>]*>(.*?码.*?)<\/a>/gi;
        
        let match;
        while ((match = regex.exec(html))) {
            const [_, path, title] = match;
            const postId = path.split('/')[2];
            
            if (!storage.posts[postId]) {
                newPosts.push(`🔔 ${title.trim()}\nhttps://v2ex.com${path}`);
                storage.posts[postId] = Date.now();
            }
        }
        
        return { newPosts, storage };
    },
    
    // 通知处理
    notifyResults: function(results) {
        $notification.post(
            "🎯 发现V2EX新码帖",
            `共${results.newPosts.length}条新内容`,
            results.newPosts.join("\n\n")
        );
        $prefs.setValueForKey(
            JSON.stringify(results.storage),
            this.STORAGE_KEY
        );
    },
    
    // 错误通知
    notify: function(title, message) {
        try {
            $notification.post(title, "", message);
            console.log(`[${title}] ${message}`);
        } catch (e) {
            console.log(`[ERROR] ${title}: ${message}`);
        }
    }
};

// 启动监测
V2EX_MONITOR.init();
