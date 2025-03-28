// 名称: V2EX送码监测

const V2EX = {
    url: "https://www.v2ex.com/?tab=creative",
    keyword: "码",
    lastCheck: 0,
    
    // 纯JS实现
    run: function() {
        const xhr = new XMLHttpRequest();
        xhr.timeout = 8000;
        xhr.open('GET', this.url, true);
        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X)');
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.checkPosts(xhr.responseText);
            } else {
                console.log('HTTP Error:' + xhr.status);
            }
        };
        
        xhr.onerror = () => console.log('Request failed');
        xhr.ontimeout = () => console.log('Timeout');
        xhr.send();
    },
    
    checkPosts: function(html) {
        try {
            const posts = [];
            const regex = /<span class="item_title">\s*<a href="(\/t\/\d+)[^>]*>(.*?码.*?)<\/a>/gi;
            let match;
            
            while ((match = regex.exec(html))) {
                const [_, path, title] = match;
                posts.push(`🔔 ${title.trim()}\nhttps://v2ex.com${path}`);
            }
            
            if (posts.length > 0 && Date.now() - this.lastCheck > 3600000) {
                this.notify(posts);
                this.lastCheck = Date.now();
            }
        } catch (e) {
            console.log('Parse error:' + e);
        }
    },
    
    notify: function(posts) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.srcdoc = `
            <script>
                setTimeout(() => {
                    alert("🎯 发现${posts.length}条新码帖\\n\\n${posts.join('\\n\\n')}");
                }, 500);
            </script>
        `;
        document.body.appendChild(iframe);
    }
};

// 启动
V2EX.run();
