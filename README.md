# ZRestify
这是一个对**Restify**的浅封装，会自动生成一个封装后的**Restify**项目。

why
---
每次写一个新的服务时，会有一些已经用惯了觉得好用的模块，这个项目主要还是更方便使用而已。

我们在Restify基础上加了什么
---

* 整体的项目目录结构规范：
 * bin目录是启动文件目录，而且文件名和项目名一致。
 * lib目录是**ZRestify**的库文件目录。
 * src是项目公用源文件目录。
 * ctrl是**Ctrl**文件目录。
 
* 对接口有一个更上层的封装，不仅仅是路由这一级别的，我们称之为**Ctrl**。
* 我们使用了winston作为日志模块，*lib/logger*进行了一层浅封装。
* 我们对请求返回做了一层封装，目前版本只支持json格式。
* 我们对数据库进行了一层封装，目前版本主要处理了mysql，封装了队列执行和断线自动重连等。
* 基于token的**session**，可以通过**Ctrl**的构造函数决定该api是否需要登录。
* 自动的参数检查，必要参数如果不全，底层会自动处理。
* 统一的**Ctrl管理器**，新增API非常简单。

快速安装
---
直接npm全局安装即可。

```
npm install zrestify -g
```

如何使用
---
类似express generator，我们只需要使用zrestify创建一个项目即可。

```
zrestify testproj
cd testproj
npm install
```

就会在当前目录下生成一个名为 **testproj** 的项目，并自动下载依赖库。

默认会添加一个**login**的**API**，要求传入**name**和**password**，在 *ctrl/login.js* 文件里修改登录验证过程即可。

默认的端口是**3700**

如果我们要启动服务，可以使用下面的指令：

```
node bin/testproj.js
```

Request
---
我们的API分为2部分，其中第一部分为主请求名，譬如例子里的**login**，应该就是 */login*。

第二部分是请求参数，如果是 **GET** 方式，就是 *name=XXX&password=XXX* 这样的，如果是 **POST** 方式，是 *x-www-from-urlencoded*。

API请求成为Ctrl，程序实现如下：

```
"use strict";

var ctrlmgr = require('../lib/ctrlmgr');
var ctrldef = require('../src/ctrldef');
var apicore = require('../src/apicore');
var adminmgr = require('../src/adminmgr');
var sessionmgr = require('../lib/sessionmgr');
var fs = require("fs");

class Ctrl_Login extends apicore.BaseAPICtrl {
    constructor() {
        super(ctrldef.CTRLID_REQ_LOGIN, false, ['name', 'password']);
    }

    onProc(req, res, next) {
        // login

        // if is ok
        sessionmgr.singleton.newSession(req);

        apicore.sendMsg_Token(res, req.session.sessionid);
        apicore.sendMsg_Common(res, req.params.ctrlid, true);

        res.result.send();

        next();
    }
}

ctrlmgr.singleton.addCtrl(new Ctrl_Login());
```

Response
---
现在我们的响应必然返回一个json数组，可以理解为json数组里每个单元都是一条服务器返回。

```
        apicore.sendMsg_Token(res, req.session.sessionid);
        apicore.sendMsg_Common(res, req.params.ctrlid, true);
```
最后，我们通过```res.result.send()```将前面的消息一次性的发给客户端。

```
        res.result.send();
```

使用到的第三方库
---

* 使用**[yargs](https://github.com/bcoe/yargs)**模块简化命令行工具的开发。
* 使用**[handlebars](https://github.com/wycats/handlebars.js/)**模板做基本代码模板。