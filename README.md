
Designed to enhance app features, block ads, or automate tasks.
(用于增强应用功能、屏蔽广告或自动化任务。)

---

## Script Types / 脚本类型

Includes: (包含：)

* **Rewrite Scripts:** Modify network requests (e.g., Ad Blocking, Unlock Features).
    (重写脚本：修改网络请求 (例如：去广告、解锁功能)。)
* **Task Scripts:** Run scheduled tasks (e.g., Auto Check-in).
    (任务脚本：运行定时任务 (例如：自动签到)。)

---

## How to Use / 如何使用

**Important:** Rewrite scripts require enabling **MitM** in Quantumult X and trusting the certificate.
(**重要提示：** 重写脚本需要开启 Quantumult X 的 **MitM** 功能并信任证书。)

**1. Add Rewrite Subscription / 添加重写订阅**

* Go to QX `Config` -> `Edit`.
    (进入 QX `配置文件` -> `编辑`。)
* Under `[rewrite_remote]`, add this line (replace placeholders):
    (在 `[rewrite_remote]` 部分添加下面这行 (替换占位符):)
    ```
    [https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/rewrite/YOUR_REWRITE_FILE.conf](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/rewrite/YOUR_REWRITE_FILE.conf), tag=MyRewrite, update-interval=86400, opt-parser=false, enabled=true
    ```
    * Replace `YOUR_USERNAME`, `YOUR_REPO`, `YOUR_REWRITE_FILE.conf`. Choose your `tag`.
        (替换 `你的用户名`, `你的仓库名`, `你的重写订阅文件名`。选择你自己的 `标签`。)

**2. Add Task Subscription / 添加任务订阅**

* Go to QX `Config` -> `Edit`.
    (进入 QX `配置文件` -> `编辑`。)
* Under `[task_remote]`, add this line (replace placeholders):
    (在 `[task_remote]` 部分添加下面这行 (替换占位符):)
    ```
    [https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/task/YOUR_TASK_FILE.conf](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/task/YOUR_TASK_FILE.conf), tag=MyTask, update-interval=86400, opt-parser=false, enabled=true
    ```
    * Replace `YOUR_USERNAME`, `YOUR_REPO`, `YOUR_TASK_FILE.conf`. Choose your `tag`.
        (替换 `你的用户名`, `你的仓库名`, `你的任务订阅文件名`。选择你自己的 `标签`。)

* Save the config. Enable MitM and add necessary hostnames if needed for rewrites.
    (保存配置。如果重写需要，请开启 MitM 并添加必要的主机名。)
* Manage tasks in the QX Task section.
    (在 QX 的任务模块管理任务。)

---

## ⚠️ Disclaimer / 免责声明

* Scripts are for learning/research purposes only.
    (脚本仅供学习研究使用。)
* Use at your own risk. Potential risks include account bans or data leaks.
    (使用风险自负。潜在风险包括账号封禁或数据泄露。)
* The author assumes NO responsibility for any consequences.
    (作者对任何后果不承担任何责任。)
