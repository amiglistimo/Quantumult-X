{"type": "movie","subscribe": 1,"version": 103,"list": [
   {
    "webCode": "jabletv",
    "canFull": true,
    "enable": true,
    "type": "movie",
    "encode": "",
    "webName": "jable",
    "webUrl": "https://jable.tv/",
    "used": true,
    "available": true,
    "searchRule": {
     "url": "<rule>https://jable.tv/search/{{searchKey}}<rule>",
     "resRule": "<rule>//div[@class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2']/div<rule>",
     "name": "<rule>//a/div[@class='title']/text()<rule>",
     "nameUrl": "<rule>//a/@href<rule><replace>https://jable.tv{@result}<replace>",
     "cover": "<rule>//a/div[@class='image']/img/@src<rule>",
     "header": "",
     "replaceRe": "",
     "keyEncode": "<rule><rule>",
     "encode": "<rule><rule>",
     "parseType": "<rule>html<rule>",
     "method": "<rule>get<rule>"
    },
    "detailRule": {
     "url": "<rule>{{chapterId}}<rule>",
     "tabList": "<rule>//div[@class='nav nav-tabs nav-justified tabs-mobile-single']//li/a/span/text()<rule>",
     "itemList": "<rule>//div[@class='panel-body']/ul[@class='list-group']/li<rule>",
     "name": "<rule>//a/text()<rule>",
     "nameUrl": "<rule>//a/@href<rule><replace>https://jable.tv{@result}<replace>",
     "header": "",
     "replaceRe": "",
     "keyEncode": "<rule><rule>",
     "encode": "<rule><rule>",
     "parseType": "<rule>html<rule>",
     "method": "<rule>get<rule>",
     "resRule": "<rule><rule>"
    },
    "execJs": "var body=document.getElementsByTagName('body')[0];var c=document.getElementsByClassName('player-box')[0];var childs=body.childNodes;for(var i=childs.length-1;i>=5;i--){body.removeChild(childs[i])}body.style.height='300px';body.style.overflow='hidden';addCover(body);c.style.position='fixed';c.style.zIndex=1000000;c.style.width='100%';c.style.top=0;c.style.left=0"
   }
  ]}
