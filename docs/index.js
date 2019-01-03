var QC = function() {
    var l = function() {};
    var b = window.ActiveXObject && ~~navigator.userAgent.match(/MSIE\s+(\d+)/)[1];
    var a = function() {
        var n = function(r) {
            var p = []
                , q = arguments.callee._temp = arguments.callee._temp || document.createElement("div");
            q.innerHTML = r;
            while (q.firstChild) {
                p.push(q.removeChild(q.firstChild))
            }
            return p.length > 1 ? function() {
                var t = document.createDocumentFragment();
                for (var s = 0; s < p.length; s++) {
                    t.appendChild(p[s])
                }
                return t
            }() : p[0]
        };
        var o = function(q, p) {
            return q.replace(arguments.callee._reg, function(r, s) {
                return p[s] !== null ? p[s] : s
            })
        };
        o._reg = /\{(\w+)\}/g;
        return {
            str2dom: n,
            format: o,
            extend: function(q, p) {
                var r = l;
                r.prototype = p.prototype;
                q.prototype = new r();
                q.constructor = q;
                return q
            }
        }
    }();
    var j = function() {
        var q = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
            , o = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        function n(r) {
            q.lastIndex = 0;
            return q.test(r) ? '"' + r.replace(q, function(s) {
                var t = o[s];
                return typeof t === "string" ? t : "\\u" + ("0000" + s.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + r + '"'
        }
        function p(u) {
            var s = []
                , r = "";
            for (var t in u) {
                r = u[t];
                r = r !== undefined ? r : "";
                switch (typeof r) {
                    case "string":
                        r = n(r);
                        break;
                    case "object":
                        r = p(r);
                        break;
                    case "function":
                        continue
                }
                s.push('"' + t + '":' + r)
            }
            return "{" + s + "}"
        }
        return {
            stringify: function() {
                return window.JSON && JSON.stringify ? JSON.stringify : p
            }(),
            parse: function(t) {
                t = t || "{}";
                var r = {};
                try {
                    r = (new Function("return (" + t + ")"))()
                } catch (s) {
                    f.error("JSON.parse => parse数据格式错误:" + t)
                }
                return r
            }
        }
    }();
    var g = function() {
        if (document.implementation.hasFeature("XPath", "3.0")) {
            XMLDocument.prototype.selectNodes = function(r, s) {
                if (!s) {
                    s = this
                }
                var p = this.createNSResolver(this.documentElement);
                var o = this.evaluate(r, s, p, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var t = [];
                for (var q = 0; q < o.snapshotLength; q++) {
                    t[q] = o.snapshotItem(q)
                }
                return t
            }
            ;
            Element.prototype.selectNodes = function(o) {
                if (this.ownerDocument.selectNodes) {
                    return this.ownerDocument.selectNodes(o, this)
                } else {
                    throw "For XML Elements Only"
                }
            }
        }
        var n = function(s) {
            var u = b ? new ActiveXObject("Microsoft.XMLDOM") : document.implementation.createDocument("text/xml", "", null);
            if (b) {
                if (u.loadXML(s)) {
                    return u
                } else {
                    return null
                }
            } else {
                try {
                    var t = u.childNodes;
                    for (var q = t.length - 1; q >= 0; q--) {
                        u.removeChild(t[q])
                    }
                    var v = new DOMParser();
                    var p = v.parseFromString(s, "text/xml");
                    var r = u.importNode(p.documentElement, true);
                    u.appendChild(r);
                    return u
                } catch (o) {
                    return null
                }
            }
        };
        return {
            stringify: function(o) {
                return o.xml || new XMLSerializer().serializeToString(o)
            },
            parse: n
        }
    }();
    var m = function() {
        return {
            extend: function() {
                var u = arguments, s = arguments.length, w = false, r = 1, t = u[0], o, n, v, q;
                if (typeof t === "boolean") {
                    w = t;
                    t = arguments[1] || {};
                    r = 2
                }
                if (typeof t !== "object" && typeof t !== "function") {
                    t = {}
                }
                if (s === r) {
                    t = {};
                    --r
                }
                for (; r < s; r++) {
                    if ((o = arguments[r]) != null) {
                        for (var p in o) {
                            n = t[p];
                            q = o[p];
                            if (t === q) {
                                continue
                            }
                            if (w && q && typeof q === "object" && !q.nodeType) {
                                if (n) {
                                    v = n
                                } else {
                                    if (q instanceof Array) {
                                        v = []
                                    } else {
                                        if (typeof q === "object") {
                                            v = {}
                                        } else {
                                            v = q
                                        }
                                    }
                                }
                                t[p] = object.extend(w, v, q)
                            } else {
                                if (q !== undefined) {
                                    t[p] = q
                                }
                            }
                        }
                    }
                }
                return t
            }
        }
    }();
    var c = function() {
        var o = /"/g;
        var n = {
            genHttpParamString: function(p) {
                return this.commonDictionaryJoin(p, null, null, null, window.encodeURIComponent)
            },
            splitHttpParamString: function(p) {
                return this.commonDictionarySplit(p, null, null, null, window.decodeURIComponent)
            },
            commonDictionarySplit: function(D, q, p, C, v) {
                var x = {}, r, y, B, A, z;
                if (!D || typeof (D) != "string") {
                    return x
                }
                if (typeof (q) != "string") {
                    q = "&"
                }
                if (typeof (p) != "string") {
                    p = ""
                }
                if (typeof (C) != "string") {
                    C = "="
                }
                r = D.split(q);
                if (r && r.length) {
                    for (var u = 0, w = r.length; u < w; ++u) {
                        y = r[u].split(C);
                        if (y.length > 1) {
                            A = y.slice(1).join(C);
                            B = A.split(p);
                            z = B.slice(p.length, B.length - p.length).join(p);
                            x[y[0]] = (typeof v == "function" ? v(z) : z)
                        } else {
                            y[0] && (x[y[0]] = true)
                        }
                    }
                }
                return x
            },
            commonDictionaryJoin: function(r, q, p, y, u) {
                var v = [], x, w;
                if (!r || typeof (r) != "object") {
                    return ""
                }
                if (typeof (r) == "string") {
                    return r
                }
                if (typeof (q) != "string") {
                    q = "&"
                }
                if (typeof (p) != "string") {
                    p = ""
                }
                if (typeof (y) != "string") {
                    y = "="
                }
                for (var s in r) {
                    w = (r[s] + "").replace(o, '\\"');
                    v.push(s + y + p + (typeof u == "function" ? u(w) : w) + p)
                }
                return v.join(q)
            }
        };
        return {
            stringify: function(p) {
                return n.genHttpParamString(p)
            },
            parse: function(p) {
                return n.splitHttpParamString(p)
            }
        }
    }();
    var d = function() {
        var n = [/&/g, /</g, />/g, /\x27/g, /\x22/g]
            , o = ["&amp;", "&lt;", "&gt;", "&#039;", "&quot;"];
        return {
            escHTML: function(s) {
                var q = s;
                for (var r = 0, p = n.length; r < p; r++) {
                    q = q.replace(n[r], o[r])
                }
                return q
            },
            format: a.format
        }
    }();
    var i = function() {
        var n = document.domain || "";
        return {
            set: function(q, s, r, t, o) {
                if (o) {
                    var p = new Date();
                    p.setTime(p.getTime() + 3600000 * o)
                }
                document.cookie = q + "=" + s + "; " + (o ? ("expires=" + p.toGMTString() + "; ") : "") + (t ? ("path=" + t + "; ") : "path=/; ") + (r ? ("domain=" + r + ";") : ("domain=" + n + ";"));
                return true
            },
            get: function(p) {
                var q = new RegExp("(?:^|;+|\\s+)" + p + "=([^;]*)")
                    , o = document.cookie.match(q);
                return (!o ? "" : o[1])
            },
            del: function(o, p, q) {
                document.cookie = o + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (q ? ("path=" + q + "; ") : "path=/; ") + (p ? ("domain=" + p + ";") : ("domain=" + n + ";"))
            }
        }
    }();
    var f = function() {
        var p = {
            log: 3,
            info: 2,
            warn: 1,
            error: 0
        };
        var r = p.info;
        var n = " :: [QQConnect] > ";
        var q = function(s) {
            return function(t) {
                window.console && console[s] && o() >= p[s] && console[s](n + t)
            }
        };
        var o = function() {
            return ~~(r || p.info)
        };
        return {
            log: q("log"),
            info: q("info"),
            warn: q("warn"),
            error: q("error"),
            setLevel: function(s) {
                return r = p[s] || r
            }
        }
    }();
    var k = function() {
        var p;
        function n() {
            n.fired = true;
            var q;
            while (q = n.list.shift()) {
                q()
            }
        }
        n.list = [];
        n.fired = false;
        function o() {
            if (p) {
                return
            }
            p = true;
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function() {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    n()
                }, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", function() {
                        if (document.readyState === "complete" || document.readyState === "loaded") {
                            document.detachEvent("onreadystatechange", arguments.callee);
                            n()
                        }
                    });
                    if (document.documentElement.doScroll) {
                        (function() {
                                try {
                                    document.documentElement.doScroll("left")
                                } catch (q) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                            }
                        )()
                    }
                }
            }
        }
        o();
        return {
            domReady: function(q) {
                if ((typeof (q) == "function")) {
                    if (n.fired || document.readyState === "complete" || document.readyState === "loaded") {
                        n();
                        q()
                    } else {
                        n.list.push(q)
                    }
                }
            },
            add: function(s, r, q) {
                if (s && r && q) {
                    s && s.addEventListener ? s.addEventListener(r, q, false) : s.attachEvent("on" + r, q)
                }
            },
            remove: function(s, r, q) {
                if (s && r && q) {
                    s && s.removeEventListener ? s.removeEventListener(r, q, false) : s.detachEvent("on" + r, q)
                }
            }
        }
    }();
    var e = function() {
        return {
            _insertButton: l
        }
    };
    var h = function() {
        return {}
    };
    return {
        Like: e(),
        Share: h(),
        Toolkit: a,
        JSON: j,
        XML: g,
        Object: m,
        QueryString: c,
        String: d,
        Cookie: i,
        Console: f,
        Event: k,
        getVersion: function() {
            return "1.0.1"
        }
    }
}();
(function(D) {
        var n = QC.getVersion();
        var i = function(H) {
            return typeof (H) == "string" ? document.getElementById(H) : H
        };
        var z = "qzonestyle.gtimg.cn"
            , G = "qzs.qq.com";
        var g = D.Toolkit
            , o = D.JSON
            , v = D.XML
            , t = D.Object
            , C = D.QueryString
            , d = D.String
            , s = D.Cookie
            , y = D.Console;
        var h = function() {};
        var m = window.ActiveXObject && ~~navigator.userAgent.match(/MSIE\s+(\d+)/)[1];
        var E = {
            PMCrossPage: "https://graph.qq.com/jsdkproxy/PMProxy.html#" + n,
            FLACrossPage: "https://graph.qq.com/jsdkproxy/FLAProxy.swf",
            getCrossSolution: function() {
                var H;
                if (window.postMessage) {
                    H = "PMProxy"
                } else {
                    if (!!((window.ActiveXObject && !!function() {
                            var I = true;
                            try {
                                new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                            } catch (J) {
                                I = false
                            }
                            return I
                        }()) || (navigator.plugins && navigator.plugins["Shockwave Flash"]) || false)) {
                        H = "FLAProxy"
                    } else {
                        D.Console.error("未找到可用的跨域通信方案");
                        H = "EMPProxy"
                    }
                }
                D.Console.info("确定跨域代理策略：" + H);
                return H
            }
        };
        var p = 1000;
        D.getConfig = function() {
            return E
        }
        ;
        var w = function(J, I, H, K) {
            this.uri = J;
            this.paras = I || {};
            this.fmt = H || "json";
            this.method = (K || "get").toLocaleLowerCase();
            this.successPool = [];
            this.errorPool = [];
            this.completePool = [];
            this.seq = p++
        };
        w.prototype.success = function(H) {
            this.successPool.push(H);
            return this
        }
        ;
        w.prototype.error = function(H) {
            this.errorPool.push(H);
            return this
        }
        ;
        w.prototype.complete = function(H) {
            this.completePool.push(H);
            return this
        }
        ;
        w.prototype.send = h;
        w.prototype._onCallback = function(L, H, J) {
            if (L.status == 200 || L.status == 204) {
                var K = L.responseText
                    , I = new c(K,L.status,H,J);
                !~~I.code ? this.onSuccess(I) : this.onError(I)
            } else {
                this.onError(new c("",L.status,H,J))
            }
        }
        ;
        w.prototype.onSuccess = function(H) {
            var J = this.successPool;
            for (var I = 0; I < J.length; I++) {
                J[I](H)
            }
            this.onComplete(H)
        }
        ;
        w.prototype.onError = function(H) {
            var J = this.errorPool;
            for (var I = 0; I < J.length; I++) {
                J[I](H)
            }
            this.onComplete(H)
        }
        ;
        w.prototype.onComplete = function(H) {
            var J = this.completePool;
            for (var I = 0; I < J.length; I++) {
                J[I](H)
            }
        }
        ;
        var c = function(K, I, H, J) {
            this.status = I || -1;
            this.fmt = H || "json";
            this.code = this.ret = -1;
            this.data = null;
            this.seq = J || -1;
            this.parseData(K);
            if (this.code && c[this.code]) {
                c[this.code](this.data, this.dataText)
            }
        };
        c.prototype.parseData = function(I) {
            this.dataText = I;
            switch (this.fmt) {
                case "xml":
                    this.data = D.XML.parse(I || "<root></root>");
                    var H = this.data.selectNodes("//ret")[0];
                    this.code = this.ret = (H && H.firstChild.nodeValue) || -1;
                    break;
                case "json":
                default:
                    this.data = D.JSON.parse(I || "{}");
                    this.code = this.ret = this.data.ret !== undefined ? ~~this.data.ret : this.data.data && this.data.data.ret !== undefined ? ~~this.data.data.ret : -1;
                    break
            }
        }
        ;
        c.prototype.stringifyData = function() {
            return this.dataText
        }
        ;
        c[100013] = function(I, H) {
            D.Login.signOut();
            D.Console.warn("api返回token失效")
        }
        ;
        var j = D.Toolkit.extend(function() {
            w.apply(this, arguments);
            this.xhr = j.createInstance()
        }, w);
        D.Object.extend(j.prototype, {
            send: function() {
                var M = this.xhr
                    , N = this.method
                    , H = this.fmt
                    , K = this
                    , I = D.QueryString.stringify(K.paras)
                    , J = N == "post" ? this.uri : this.uri.indexOf("?") < 0 ? this.uri + "?" + I : this.uri.replace(/[&?]*/g, "") + "&" + I;
                M.open(N, J, !!this.async);
                try {
                    M.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    M.setRequestHeader("X-Requested-From", "_TC_QC_jsProxy_")
                } catch (L) {}
                M.onreadystatechange = function() {
                    if (M.readyState === 4) {
                        K._onCallback(M, H, K.seq)
                    }
                }
                ;
                M.send(I || null)
            }
        });
        j.createInstance = window.XMLHttpRequest ? function() {
                return new window.XMLHttpRequest()
            }
            : function() {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            }
        ;
        var b = function() {
            this.requests = [];
            this.invokes = [];
            this.readyPool = [];
            this.isReady = false;
            this.timeStamp = +new Date();
            this.init()
        };
        b.prototype.init = h;
        b.prototype.ready = function(H) {
            this.readyPool.push(H)
        }
        ;
        b.prototype.onReady = function() {
            this.isReady = true;
            var I = this.readyPool;
            for (var H = 0; H < I.length; H++) {
                I[H]()
            }
        }
        ;
        b.prototype.send = function(I) {
            var H;
            I && (this.requests.push(I));
            while (this.isReady && (H = this.requests.shift())) {
                b.pendingRequests.push(H);
                QC.Console.log("seq no :" + H.seq + "请求发起  ts -> " + (+new Date()));
                this._doSend(H)
            }
        }
        ;
        b.prototype._doSend = function(H) {}
        ;
        b.prototype._preDispatch = function(M, J, I, H) {
            var K = J.data || (J.currentTarget && J.currentTarget.data) || {};
            var L = K.split("@@@");
            switch (L[0]) {
                case "invoke":
                    this.invoke(L[1]);
                    break;
                default:
                    this.dispatch(L[1] || J, I, H);
                    break
            }
        }
        ;
        b.prototype.invoke = function(I) {
            var H;
            I && (this.invokes.push(I));
            while (this.isReady && (H = this.invokes.shift())) {
                this._doInvoke(H)
            }
        }
        ;
        b.prototype._doInvoke = function(H) {}
        ;
        b.prototype.dispose = function() {
            k = null;
            this.onDispose()
        }
        ;
        b.prototype.onDispose = function() {}
        ;
        b.pendingRequests = [];
        b.dispatchReceive = function(J, M, I, H) {
            var L = b.pendingRequests;
            for (var K = 0; K < L.length; K++) {
                if (L[K].seq == J) {
                    QC.Console.log("seq no :" + J + "响应收到  ts -> " + (+new Date()));
                    L[K]._onCallback({
                        status: I,
                        responseText: M
                    }, H, J);
                    L.splice(K, 1);
                    return
                }
            }
        }
        ;
        b.invoke = function() {
            var H = [];
            return function(J) {
                J && H.push(J);
                if (!k) {
                    D.Console.info("Proxy未初始化，invoke入栈");
                    b.generateProxy();
                    return
                }
                var I;
                while (I = H.shift()) {
                    k._doInvoke(I)
                }
            }
        }();
        var k;
        b.generateProxy = function(I) {
            var H = {
                PMProxy: u,
                FLAProxy: B,
                EMPProxy: f
            };
            if (I) {
                return new H[I]()
            }
            if (!k) {
                k = new H[E.getCrossSolution()]()
            }
            return k
        }
        ;
        b.getFunction = function(H) {
            var J;
            H = H.split(".");
            for (var I = 0; I < H.length; I++) {
                J = J ? J[H[I]] : window[H[I]]
            }
            return J
        }
        ;
        D._create_fla_proxy = function() {
            D._create_fla_proxy = h;
            new B()
        }
        ;
        !(function() {
                var I = ~~D.Cookie.get("__qc_wId");
                if (!I) {
                    var H = +new Date() % 1000;
                    document.cookie = ["__qc_wId=" + H, "; path=/"].join(";")
                }
            }
        )();
        var B = D.Toolkit.extend(function() {
            b.apply(this, arguments)
        }, b);
        D.Object.extend(B.prototype, {
            prefix: "_TC_QC_flaProxy_",
            init: function() {
                var H = this
                    , L = function() {
                    var N = window.name.match(/oauth2Login_(\d+)/), O = ~~D.Cookie.get("__qc_wId"), M;
                    if (N && N[1]) {
                        M = N[1]
                    } else {
                        if (window._b_is_qc_cb_win) {
                            M = 10000 + O
                        } else {
                            M = O;
                            document.cookie = ["__qc_wId=" + M, "; path=/"].join(";")
                        }
                    }
                    D.Console.info("跨域窗口标识号 __qc_wId : " + M);
                    return M
                }()
                    , I = L < 10000 ? L + 10000 : L - 10000;
                var K = B.getFlashHtml({
                    src: E.FLACrossPage,
                    width: "100%",
                    height: "100%",
                    allowScriptAccess: "always",
                    id: "_qc_cross_request_flash_proxy",
                    name: "_qc_cross_request_flash_proxy",
                    flashVars: "suffix=" + (this.timeStamp) + "&conId=" + L + "&conId_receive=" + I
                });
                var J = this.cot = document.createElement("div");
                J.style.cssText = "position:fixed; _position:absolute; top:30px; left:30px; width:3px; height:3px; margin:0; padding:0; display:none;";
                J.innerHTML = K;
                QC.Event.domReady(function() {
                    document.body.appendChild(J);
                    J.style.display = "block"
                });
                window[this.prefix + "onFlashReady_" + this.timeStamp] = function() {
                    D.Console.info("FLAProxy代理创建成功，耗时" + (new Date() - H.timeStamp));
                    setTimeout(function() {
                        H.isReady = true;
                        H.send();
                        H.invoke()
                    });
                    if (!D.Login._check()) {
                        document._qc_cross_request_flash_proxy.initConn()
                    }
                }
                ;
                window[this.prefix + "onFlashRequestComplete_" + this.timeStamp] = function(O, N, M) {
                    setTimeout(function() {
                        H._preDispatch(H, O, N, M)
                    })
                }
                ;
                window[this.prefix + "onFlashInvokeBack_" + this.timeStamp] = function() {
                    var M = arguments;
                    setTimeout(function() {
                        var N = b.getFunction(M[0]);
                        var O = M[1];
                        M[0].indexOf(".") > -1 ? N.apply(null, O) : N(O)
                    })
                }
            },
            _doSend: function(J) {
                var L = J.uri
                    , K = D.QueryString.stringify(J.paras)
                    , I = J.seq
                    , H = J.fmt
                    , N = J.method;
                var M = document._qc_cross_request_flash_proxy.httpRequest || i("_qc_cross_request_flash_proxy").httpRequest;
                M ? M(L, K, N, H, I) : (!function() {
                    throw new Error("flash proxy 初始化失败")
                }())
            },
            dispatch: function(K, J, I) {
                var L = K.currentTarget.data
                    , H = K.type != "complete" ? 404 : 200;
                b.dispatchReceive(J, L, H, I)
            },
            _doInvoke: function(I) {
                var H = document._qc_cross_request_flash_proxy.jsCallSwf || i("_qc_cross_request_flash_proxy").jsCallSwf;
                H && H.apply(null, I)
            }
        });
        B.getFlashHtml = function(H, M, L) {
            var N = []
                , J = []
                , K = !!window.ActiveXObject;
            M = M || 9;
            for (var I in H) {
                switch (I) {
                    case "noSrc":
                    case "movie":
                        continue;
                        break;
                    case "id":
                    case "name":
                    case "width":
                    case "height":
                    case "style":
                        if (typeof (H[I]) != "undefined") {
                            N.push(" ", I, '="', H[I], '"')
                        }
                        break;
                    case "src":
                        if (K) {
                            J.push('<param name="movie" value="', (H.noSrc ? "" : H[I]), '"/>')
                        } else {
                            N.push(' data="', (H.noSrc ? "" : H[I]), '"')
                        }
                        break;
                    default:
                        J.push('<param name="', I, '" value="', H[I], '" />')
                }
            }
            if (K) {
                N.push(' classid="clsid:', L || "D27CDB6E-AE6D-11cf-96B8-444553540000", '"')
            } else {
                N.push(' type="application/x-shockwave-flash"')
            }
            if (location && location.protocol.indexOf("https") < 0) {
                N.push(' codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=', M, '"')
            }
            return "<object" + N.join("") + ">" + J.join("") + "</object>"
        }
        ;
        var l = "https://graph.qq.com"
            , a = "http://qzonestyle.gtimg.cn";
        var u = D.Toolkit.extend(function() {
            b.apply(this, arguments)
        }, b);
        D.Object.extend(u.prototype, {
            init: function() {
                var I = this;
                I._connFrame = document.createElement("iframe");
                I._connFrame.style.cssText = "width:0px; height:0px; display:none; overflow:hidden;";
                var H = function() {
                    H.fire();
                    H.fire = h
                };
                H.fire = function() {
                    D.Console.info("PMProxy代理创建成功，耗时" + (new Date() - I.timeStamp));
                    I.isReady = true;
                    I.send();
                    I.invoke()
                }
                ;
                I._connFrame.onload = H;
                I._connFrame.addEventListener && I._connFrame.addEventListener("load", H, false);
                I._connFrame.attachEvent && I._connFrame.attachEvent("onload", H);
                I._connFrame.src = E.PMCrossPage;
                QC.Event.domReady(function() {
                    document.body.appendChild(I._connFrame)
                });
                var J = function(K) {
                    if (K.origin && (K.origin == l || K.origin == a)) {
                        I._preDispatch(I, K)
                    }
                };
                window.addEventListener ? window.addEventListener("message", J, false) : window.attachEvent("onmessage", J)
            },
            _doSend: function(H) {
                var I = D.QueryString.stringify({
                    uri: H.uri,
                    paras: D.QueryString.stringify(H.paras),
                    fmt: H.fmt,
                    method: H.method
                });
                this._connFrame.contentWindow.postMessage(I, l)
            },
            dispatch: function(N) {
                var K = N.data
                    , M = K.split(":<.<<#:")
                    , J = M[0]
                    , I = M[1]
                    , H = M[2]
                    , L = M[3];
                D.Console.log("data:\t" + L);
                b.dispatchReceive(J, L, I, H)
            },
            _doInvoke: function(L) {
                D.Console.log("invoke:\t" + L);
                if (typeof L != "string") {
                    return
                }
                var J = L.split("#"), H = J[0], I = J[1] && J[1].split(","), K;
                K = b.getFunction(H);
                K.apply(null, I)
            },
            onDispose: function() {
                this._connFrame.parentNode.removeChild(this._connFrame);
                this._connFrame = null
            }
        });
        var f = D.Toolkit.extend(function() {
            b.apply(this, arguments)
        }, b);
        D.Object.extend(f.prototype, {
            init: function() {
                D.Console.info("init:" + arguments)
            },
            _doSend: function(H) {
                D.Console.info("_doSend:" + arguments)
            },
            dispatch: function(H) {
                D.Console.info("dispatch:" + arguments)
            }
        });
        D.XHRRequest = j;
        D.request = function(J, I, H, K) {
            return new j(J,I,H,K)
        }
        ;
        var r = [];
        D.api = function() {
            var J = [];
            var I = function(K) {
                var L = D.Login._getTokenKeys();
                if (e <= 0) {
                    throw new Error("意外的调用了绑定token到req的方法 bindTokenPara")
                }
                K.paras.oauth_consumer_key = e;
                K.paras.access_token = L.accessToken;
                K.paras.openid = L.openid;
                K.paras.format = K.fmt;
                return K
            };
            var H = function(N, M, L, P) {
                k = b.generateProxy();
                var K = F(N);
                N = K.api || N;
                M = M || {};
                P = P || K.method;
                var O = new w(N,M,L,P);
                if (e > 0) {
                    setTimeout(function() {
                        var Q = D.Login._getTokenKeys();
                        if (Q.openid && Q.accessToken) {
                            k.send(I(O))
                        } else {
                            J.push(O);
                            D.Console.warn("openid与accessToken丢失，调用请求入栈 : [" + N + "]，栈大小：" + J.length)
                        }
                    }, 10)
                } else {
                    J.push(O);
                    D.Console.warn((k.isReady && e < 0 ? "token获取失败，请调用用户登录流程" : "api代理尚未初始化成功") + "，调用请求入栈 : [" + N + "]，栈大小：" + J.length)
                }
                return O
            };
            H._ready = function() {
                D.Console.info("init成功，开始触发api调用堆栈");
                var K;
                while (K = J.shift()) {
                    k.send(I(K))
                }
            }
            ;
            H.getDoc = function() {
                var L = null
                    , K = function(O, M) {
                    var N = document.createElement("script");
                    N.type = "text/javascript";
                    N.src = "http://qzonestyle.gtimg.cn/qzone/openapi/qc_jsdkdoc.js";
                    document.body.appendChild(N);
                    window.on_qc_jsdkdoc_loaded = function(P) {
                        L = P;
                        M && M(L[O]);
                        document.body.removeChild(N);
                        N = null
                    }
                };
                return function(N, M) {
                    (L && M) ? M(L[N]) : K(N, M || h)
                }
            }();
            return H
        }();
        var A = function() {
            var Q, P, J;
            var I = {
                A_XL: {
                    styleId: 5,
                    size: "230*48"
                },
                A_L: {
                    styleId: 4,
                    size: "170*32"
                },
                A_M: {
                    styleId: 3,
                    size: "120*24"
                },
                A_S: {
                    styleId: 2,
                    size: "105*16"
                },
                B_M: {
                    styleId: 7,
                    size: "63*24"
                },
                B_S: {
                    styleId: 6,
                    size: "50*16"
                },
                C_S: {
                    styleId: 1,
                    size: "16*16"
                }
            };
            function M(V) {
                if (V.clientId) {
                    QC.init({
                        appId: V.clientId
                    })
                }
                var ab = QC.getAppId();
                if (ab < 0) {
                    QC.getAppId(arguments);
                    return
                }
                V.size = V.size || "B_M";
                var Y = i(V.btnId)
                    , ad = I[V.size] || I.B_M
                    , ae = ad.styleId
                    , Z = V.fullWindow || false
                    , X = V.btnMode || "standard";
                V.redirectURI = V.redirectURI || q;
                var W = arguments.callee._getPopupUrl(V);
                var aa = {
                    size: ae,
                    fullWindow: Z,
                    url: W
                };
                if (V && V.btnId) {
                    if (Y) {
                        Y.innerHTML = arguments.callee.getBtnHtml(aa, X, V);
                        var ac = Y.firstChild.onclick;
                        (Y.firstChild.onclick = function(ag) {
                            var ah, af = function() {
                                ah && ah.close();
                                QC.Cookie.del("__qc_wId")
                            };
                            window.addEventListener ? window.addEventListener("unload", af, false) : window.attachEvent("onunload", af);
                            return function() {
                                if (ah) {
                                    ah.close()
                                }
                                ah = ag();
                                if (!ah && m) {
                                    D._create_fla_proxy()
                                }
                                return false
                            }
                        }(ac))
                    } else {
                        throw new Error("未找到插入节点:")
                    }
                }
            }
            M.TEMPLATE = ['<a href="javascript:;" onclick="{onclick};"><img src="{src}" alt="{alt}" border="0"/></a>'].join("");
            M.getBtnHtml = function(V, W, X) {
                return arguments.callee.MODE[W] && arguments.callee.MODE[W](V, X)
            }
            ;
            M.getBtnHtml.MODE = {
                standard: function(X) {
                    var W = ~~s.get("__qc_wId") + 10000;
                    var V = g.format(M.TEMPLATE, {
                        src: "http://" + z + "/qzone/vas/opensns/res/img/Connect_logo_" + X.size + ".png",
                        onclick: X.fullWindow ? "return window.open('" + X.url + "', 'oauth2Login_" + W + "');" : "return window.open('" + X.url + "', 'oauth2Login_" + W + "' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')",
                        alt: "QQ登录"
                    });
                    return V
                },
                showUserAfterLogin: function(aa, Z) {
                    var V = o.stringify(Z)
                        , Y = I[Z.size] || I.B_M
                        , W = Y.size.split("*")
                        , X = '<iframe frameBorder="0" scrolling="no" src="http://' + G + "/qzone/openapi/frames/login_button.html#para=" + encodeURIComponent(V) + '" width="' + Math.max(200, W[0]) + '" height="' + W[1] + '" allowTransparency="true"></iframe>';
                    return X
                }
            };
            M._getPopupUrl = function(aa) {
                var Z = aa.scope || "all"
                    , W = aa.redirectURI || ""
                    , ab = aa.display || ""
                    , V = QC.getAppId();
                if (m <= 6) {
                    W = "https://graph.qq.com/jsdkproxy/redirect_ie6.html#" + encodeURIComponent(W)
                }
                var Y = ["client_id=" + V, "response_type=token"]
                    , X = "https://graph.qq.com/oauth2.0/authorize";
                if (Z) {
                    Y.push("scope=" + Z)
                }
                if (W) {
                    if (W.indexOf("://") > 0) {
                        W = encodeURIComponent(W)
                    }
                    Y.push("redirect_uri=" + W)
                }
                if (ab == "mobile") {
                    Y.push("display=" + ab)
                }
                X = X + "?" + Y.join("&");
                return X
            }
            ;
            var L = function() {
                return P || function() {
                    var Z = location && location.hash.match(/access_token=([^&]*)/i), Y, V = [], W;
                    var X;
                    if ((X = s.get("__qc__k"))) {
                        W = X.split("=");
                        if (X.length && W.length != 2) {
                            throw new Error("QQConnect -> cookie : __qc__k 格式非法")
                        }
                    }
                    P = (Z && Z[1]) || (W && W[1])
                }()
            };
            var U = function() {
                var Z, W = [];
                L();
                var V = function(af, ae, ac) {
                    var ad;
                    while (ad = W.shift()) {
                        setTimeout(function(ag) {
                            return function() {
                                ag(af, ae, ac)
                            }
                        }(ad))
                    }
                };
                var ab = function(ac) {
                    y.error(ac + " : _getMeError");
                    window.callback({
                        error_description: ac
                    })
                };
                var X, Y;
                var aa = function(ad) {
                    !Y && (Y = window.callback);
                    ad && aa.cbPool.push(ad);
                    window.callback = function(ae) {
                        clearTimeout(Z);
                        if (!ae.openid) {
                            return
                        }
                        J = ae;
                        var ah = Q = ae.openid;
                        var ag = P;
                        y.log(" getMe => openId & accessToken " + [ah, ag, X ? "通过me接口" : "通过本地"]);
                        var af;
                        while (af = aa.cbPool.shift()) {
                            af(ah, P, ae)
                        }
                        X = null;
                        window.callback = Y
                    }
                    ;
                    if (!L()) {
                        ab("access_token丢失");
                        return
                    }
                    if (J) {
                        window.callback(J)
                    } else {
                        if (X) {
                            return
                        }
                        X = document.createElement("script");
                        X.type = "text/javascript";
                        X.src = "https://graph.qq.com/oauth2.0/me?access_token=" + P;
                        X.onerror = function() {
                            ab("me接口返回格式错误")
                        }
                        ;
                        var ac = document.getElementsByTagName("head")[0];
                        ac && ac.appendChild(X);
                        Z = setTimeout(function() {
                            ab("me接口超时")
                        }, 5000)
                    }
                };
                aa.cbPool = [];
                return function(ad, ac) {
                    ac ? W.unshift(ad) : W.push(ad);
                    aa(V)
                }
            }();
            var N = function() {
                J = null;
                P = undefined;
                S = null;
                var V;
                for (var W = 0; W < H.length; W++) {
                    V = H[W];
                    V()
                }
            };
            var T = function(W) {
                var V = M._getPopupUrl(W || {});
                return window.open(V)
            };
            var O = function(W, V) {
                QC.Login.fillUserInfo(V.btnId, W)
            };
            var K = [], H = [], S;
            var R = function(aa, Z, V, Y) {
                var X = arguments;
                !Y && V !== null && H.push(function(ac) {
                    return function() {
                        var ad = [X[0], null, null, 1];
                        (V || h)(ac);
                        X.callee.apply(null, ad)
                    }
                }(aa));
                var ab, W = function() {
                    for (var ac = 0; ac < K.length; ac++) {
                        ab = K[ac];
                        ab(S)
                    }
                };
                !Y && Z !== null && K.push(function(ac) {
                    return function(ad) {
                        (Z || O)(ad, ac)
                    }
                }(aa));
                if (!S) {
                    P ? U(function(ac) {
                        if (ac) {
                            QC.api("get_user_info").success(function(ad) {
                                S = ad.data;
                                W()
                            }).error(function(ad) {
                                QC.Console.error("Login => getMe 获取数据失败" + ad)
                            })
                        } else {
                            M(aa)
                        }
                    }) : M(aa)
                } else {
                    S && W()
                }
            };
            t.extend(R, {
                insertButton: M,
                getMe: U,
                showPopup: T,
                signOut: function() {
                    Q = "";
                    document.cookie = ["__qc__k=", "path=/;"].join(";");
                    N()
                },
                _getTokenKeys: function() {
                    return {
                        openid: Q,
                        accessToken: P
                    }
                },
                check: function() {
                    return !!P
                },
                _check: function() {
                    return !!(J && P && S)
                },
                _onLoginBack: function(W, V, X) {
                    if (W && V) {
                        Q = W;
                        document.cookie = ["__qc__k=" + ["TC_MK", V].join("="), "path=/"].join(";")
                    }
                    J = {
                        client_id: J && J.client_id || -1,
                        openid: Q
                    };
                    L();
                    QC.Event.domReady(function() {
                        QC.init();
                        !X && QC.Login({}, null, null, 1)
                    })
                },
                reset: function() {
                    K = [];
                    H = []
                },
                fillUserInfo: function(Y, V) {
                    var X = i(Y)
                        , W = ['<span class="qc_item figure"><img src="{figureurl}" class="{size_key}"/></span>', '<span class="qc_item nickname" style="margin-left:6px;">{nickname}</span>', '<span class="qc_item logout"><a href="javascript:QC.Login.signOut();" style="margin-left:6px;">退出</a></span>'].join("");
                    X && (X.innerHTML = QC.String.format(W, {
                        nickname: QC.String.escHTML(V.nickname),
                        figureurl: V.figureurl
                    }))
                }
            });
            return R
        };
        D.Login = A();
        var e = -1
            , x = null
            , q = "";
        D.init = function(H) {
            H = H || x || {};
            x = H;
            var J = D.Login._getTokenKeys();
            e = H.appId;
            q = H.redirectURI || ("http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html") || (location.protocol + "//" + location.host + ((location.port && location.port != "80") ? (":" + location.port) : "") + "/qc_callback.html") || "";
            if (!J.openid) {
                b.invoke();
                if (r.length && H.appId > -1) {
                    for (var I = 0; I < r.length; I++) {
                        r[I]()
                    }
                }
                return
            }
            D.Login.getMe(function(M, K, L) {
                if (!~~L.error && (L.client_id <= 0 || L.client_id % 1000000 == H.appId % 1000000)) {
                    e = L.client_id = H.appId || H.clientId || H.app_id || H.client_id || -1;
                    D.api._ready && D.api._ready()
                } else {
                    D.Console.error(L.error_description || "appId/client_id 不匹配")
                }
            }, true)
        }
        ;
        D.getAppId = function(H) {
            if (H) {
                r.push(function() {
                    H.callee.apply(null, H)
                })
            }
            return e
        }
        ;
        D.invoke = function() {
            var H = b.generateProxy("FLAProxy");
            H.invoke(arguments)
        }
        ;
        var F = function() {
            var H = {
                get_user_info: {
                    api: "https://graph.qq.com/user/get_user_info",
                    method: "get"
                },
                add_topic: {
                    api: "https://graph.qq.com/shuoshuo/add_topic",
                    method: "post"
                },
                add_one_blog: {
                    api: "https://graph.qq.com/blog/add_one_blog",
                    method: "post"
                },
                add_album: {
                    api: "https://graph.qq.com/photo/add_album",
                    method: "post"
                },
                upload_pic: {
                    api: "https://graph.qq.com/photo/upload_pic",
                    method: "post"
                },
                list_album: {
                    api: "https://graph.qq.com/photo/list_album",
                    method: "get"
                },
                add_share: {
                    api: "https://graph.qq.com/share/add_share",
                    method: "post"
                },
                check_page_fans: {
                    api: "https://graph.qq.com/user/check_page_fans",
                    method: "get"
                },
                add_t: {
                    api: "https://graph.qq.com/t/add_t",
                    method: "post"
                },
                add_pic_t: {
                    api: " https://graph.qq.com/t/add_pic_t",
                    method: "post"
                },
                del_t: {
                    api: "https://graph.qq.com/t/del_t",
                    method: "post"
                },
                get_repost_list: {
                    api: "https://graph.qq.com/t/get_repost_list",
                    method: "get"
                },
                get_info: {
                    api: "https://graph.qq.com/user/get_info",
                    method: "get"
                },
                get_other_info: {
                    api: "https://graph.qq.com/user/get_other_info",
                    method: "get"
                },
                get_fanslist: {
                    api: "https://graph.qq.com/relation/get_fanslist",
                    method: "get"
                },
                get_idollist: {
                    api: "https://graph.qq.com/relation/get_idollist",
                    method: "get"
                },
                add_idol: {
                    api: "https://graph.qq.com/relation/add_idol",
                    method: "get"
                },
                del_idol: {
                    api: "https://graph.qq.com/relation/del_idol",
                    method: "post"
                },
                get_tenpay_addr: {
                    api: "https://graph.qq.com/cft_info/get_tenpay_addr",
                    method: "get"
                }
            };
            return function(I) {
                return H[I] || {}
            }
        }();
        (function() {
                var O;
                var P = function(T) {
                    return O && (O.dataset && O.dataset[T] || O.getAttribute("data-" + T))
                };
                var I = /\/qzone\/openapi\/qc(?:[^/_]*)\.js(?:[?#]appId=(\d+))?/i;
                var L = document.getElementsByTagName("script");
                for (var M = 0, Q, K = L.length; M < K; M++) {
                    Q = L[M];
                    var H = Q.src || "";
                    var S = H.match(I);
                    if (S) {
                        O = Q;
                        break
                    }
                }
                var J = P("appid");
                var N = P("redirecturi");
                if (J) {
                    D.Console.info("检测到自动初始化参数\nappId:" + J + "\nrUri:" + N);
                    if (isNaN(J)) {
                        D.Console.error("参数appid错误")
                    } else {
                        if (N && N.indexOf("http") != 0) {
                            D.Console.error("参数rediectURI错误")
                        } else {
                            D.Event.domReady(function() {
                                D.init({
                                    appId: J,
                                    redirectURI: N
                                })
                            })
                        }
                    }
                }
                var R = P("callback");
                if (R) {
                    window._b_is_qc_cb_win = true;
                    QC.Login.getMe(function(Y, T, U) {
                        if (window.opener) {
                            try {
                                window.opener.QC.Login._onLoginBack(Y, T)
                            } catch (X) {
                                try {
                                    window.opener.postMessage("invoke@@@QC.Login._onLoginBack#" + [Y, T].join(","), "*")
                                } catch (Z) {
                                    try {
                                        QC.invoke("QC.Login._onLoginBack", Y, T)
                                    } catch (W) {}
                                }
                            }
                        } else {
                            try {
                                QC.invoke("QC.Login._onLoginBack", Y, T)
                            } catch (V) {}
                        }
                        setTimeout(function() {
                            if (m > 7) {
                                var aa = window.open("about:blank", "_self");
                                aa.close()
                            } else {
                                window.close()
                            }
                        }, 500)
                    })
                } else {
                    if (J) {
                        QC.Event.domReady(function() {
                            QC.Login.getMe(function(U, T) {
                                QC.Login._onLoginBack(U, T, 1)
                            })
                        })
                    }
                }
            }
        )()
    }
)(QC);
(function() {
        window.qc = QC;
        if (typeof Object.freeze == "function") {
            Object.freeze(QC)
        }
    }
)();
