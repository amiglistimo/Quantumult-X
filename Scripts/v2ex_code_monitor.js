// 名称: V2EX送码监测(QX专版)
// 经实测可在Quantumult X 1.4.2+稳定运行
// 修复内容：
// 1. 替换所有$persistentStore为$prefs
// 2. 增加API存在性检查
// 3. 优化错误提示

const url = "https://www.v2ex.com/?tab=creative";
const keyword = "码";
const storageKey = "v2ex_checked_posts_qx";
const notifyTitle = "🚨 V2EX有新送码帖子！";

// Quantumult X环境检查
if (typeof $prefs === 'undefined' || typeof $notification === 'undefined') {
    console.log("错误：此脚本只能在Quantumult X运行");
    $done();
}

async function main() {
    try {
        cleanStorage();
        
        const resp = await Promise.race([
            fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
                    "Cache-Control": "no-cache"
                }
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("请求超时(5s)")), 5000))
        ]);
        
        if (!resp.ok) throw new Error(`HTTP状态: ${resp.status}`);
        
        const html = await resp.text();
        const postPattern = /<span class="item_title">\s*<a href="(\/t\/\d+)[^>]+?>([^<]+?)<\/a>\s*<\/span>/g;
        const checkedPosts = JSON.parse($prefs.valueForKey(storageKey) || "{}");
        let updates = {};
        let notifications = [];
        
        let match;
        while ((match = postPattern.exec(html)) !== null) {
            try {
                const [_, path, title] = match;
                const postId = path.split('/')[2];
                const cleanTitle = title.trim();
                
                if (cleanTitle.includes(keyword) && !checkedPosts[postId]) {
                    updates[postId] = true;
                    notifications.push(`${cleanTitle}\nhttps://www.v2ex.com${path}`);
                }
            } catch (e) {
                console.log(`解析跳过: ${e}`);
            }
        }
        
        if (notifications.length > 0) {
            $notification.post(notifyTitle, "", notifications.join("\n\n"));
            $prefs.setValueForKey(JSON.stringify({
                ...checkedPosts,
                ...updates
            }), storageKey);
        }
        
    } catch (error) {
        console.log(`执行失败: ${error.stack}`);
        $notification.post("V2EX监测故障", "", error.message);
    } finally {
        $done();
    }
}

function cleanStorage() {
    const data = JSON.parse($prefs.valueForKey(storageKey) || "{}");
    if (Object.keys(data).length > 200) {
        $prefs.setValueForKey("{}", storageKey);
    }
}

main();
