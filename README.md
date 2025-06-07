[![Powered by DartNode](https://dartnode.com/branding/DN-Open-Source-sm.png)](https://dartnode.com "Powered by DartNode - Free VPS for Open Source")

# Some useful Scripts

Designed to enhance app features, block ads, or automate tasks.

---

## Script Types

Includes:

* **Rewrite Scripts:** Modify network requests (e.g., Ad Blocking, Unlock Features).
* **Task Scripts:** Run scheduled tasks (e.g., Auto Check-in).

---

## How to Use

**Important:** Rewrite scripts require enabling **MitM** in Quantumult X and trusting the certificate.

**1. Add Rewrite Subscription**

* Go to QX `Config` -> `Edit`.
* Under `[rewrite_remote]`, add this line (replace placeholders):
    ```
    [https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/rewrite/YOUR_REWRITE_FILE.conf](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/rewrite/YOUR_REWRITE_FILE.conf), tag=MyRewrite, update-interval=86400, opt-parser=false, enabled=true
    ```
    * Replace `YOUR_USERNAME`, `YOUR_REPO`, `YOUR_REWRITE_FILE.conf`. Choose your `tag`.

**2. Add Task Subscription**

* Go to QX `Config` -> `Edit`.
* Under `[task_remote]`, add this line (replace placeholders):
    ```
    [https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/task/YOUR_TASK_FILE.conf](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/master/QuantumultX/task/YOUR_TASK_FILE.conf), tag=MyTask, update-interval=86400, opt-parser=false, enabled=true
    ```
    * Replace `YOUR_USERNAME`, `YOUR_REPO`, `YOUR_TASK_FILE.conf`. Choose your `tag`.

* Save the config. Enable MitM and add necessary hostnames if needed for rewrites.
* Manage tasks in the QX Task section.

---

## ⚠️ Disclaimer

* Scripts are for learning/research purposes only.
* Use at your own risk. Potential risks include account bans or data leaks.
* The author assumes NO responsibility for any consequences.
