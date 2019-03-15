# rankingByNode.js
使用**node.js + express**搭建的简易排行榜服务，数据库使用**mariadb(mysql)/mongodb**, 会给客户端分配id，用户也可以绑定fbid，可以获取全部排行和好友排行（好友信息有客户端发送过来）。
在根目录使用 npm start进行启动服务。如果要后台运行请使用forever组件。

##### master分支使用mariadb(mysql), mongo分支使用mongodb,可以自行切换。

