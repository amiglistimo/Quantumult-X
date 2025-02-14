项目名称：修改VidHub的UserAgent
更新日期：2025-02-15

**************************************

[rewrite_local]
^https?:\/\/pub1\.emby\.wtf:443\/[\w\/]\/(users\/\w+\/views|playback\/v\d\/\w+)\/ url script-request-header InfuseUserAgent.js
^https?:\/\/emby-mica-us-v1\.mius\.uk:8443\/[\w\/]\/(users\/\w+\/views|playback\/v\d\/\w+)\/ url script-request-header InfuseUserAgent.js

[mitm]
hostname = pub1.emby.wtf, emby-mica-us-v1.mius.uk

*************************************/

var headers = $request.headers;
headers['User-Agent'] = 'Infuse/7.1.3';
$done({headers});
