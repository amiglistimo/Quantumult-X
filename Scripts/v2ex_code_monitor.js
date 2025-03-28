// 名称: V2EX送码监测
// 更新: 2023-11-02

const url = "https://www.v2ex.com/?tab=creative";
const keyword = "码";
const storageKey = "v2ex_checked_posts_v2";
const notifyTitle = "🚨 V2EX有新送码帖子！";

async function main() {
    try {
        // 0. 存储维护
        cleanStorage();
        
        // 1. 带超时的网络请求
        const resp = await Promise.race([
            fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
                    "Cache-Control": "no-cache"
                }
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("请求超时")), 5000))
        ]);
        
        if (!resp.ok) throw new Error(`HTTP错误: ${resp.status}`);
        
        // 2. 安全解析HTML
        const html = await resp.text();
        const postPattern = /<span class="item_title">\s*<a href="(\/t\/\d+)[^>]+?>([^<]+?)<\/a>\s*<\/span>/g;
        const checkedPosts = JSON.parse($persistentStore.read(storageKey) || "{}");
        let updates = {};
        let notifications = [];
        
        // 3. 稳健的帖子分析
        let match;
        while ((match = postPattern.exec(html)) !== null) {
            try {
                const [_, path, title] = match;
                const postId = path.split('/')[2];
                const cleanTitle = title.trim();
                
                if (cleanTitle.includes(keyword) && !checkedPosts[postId]) {
                    updates[postId] = true;
                    notifications.push({
                        title: `🔔 ${cleanTitle}`,
                        url: `https://www.v2ex.com${path}`
                    });
                }
            } catch (e) {
                console.log(`解析异常: ${e}`);
            }
        }
        
        // 4. 批量通知
        if (notifications.length > 0) {
            const content = notifications.map(n => `${n.title}\n${n.url}`).join("\n\n");
            $notification.post(notifyTitle, "", content);
            $persistentStore.write(
                JSON.stringify({...checkedPosts, ...updates}),
                storageKey
            );
        }
        
    } catch (error) {
        console.log(`[ERROR] ${error}`);
        $notification.post("监测脚本异常", "", error.message);
    } finally {
        $done();
    }
}

function cleanStorage() {
    const data = JSON.parse($persistentStore.read(storageKey) || "{}");
    if (Object.keys(data).length > 200) {
        $persistentStore.write("{}", storageKey);
    }
}

main();
