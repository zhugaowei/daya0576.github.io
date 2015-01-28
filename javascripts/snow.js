(function () {
    var g = void 0,
        k = !0,
        m = null,
        o = !1,
        p, q = this,
        r = function (a) {
            var b = typeof a;
            if ("object" == b) if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        aa = function (a) {
            var b = r(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        u = function (a) {
            return "string" == typeof a
        },
        ba = function (a) {
            a = r(a);
            return "object" == a || "array" == a || "function" == a
        },
        ca = function (a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        da = function (a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        },
        v = function (a, b, c) {
            v = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
            return v.apply(m, arguments)
        },
        ea = function (a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.Sa = b.prototype;
            a.prototype = new c
        };
    Function.prototype.bind = Function.prototype.bind ||
    function (a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return v.apply(m, c)
        }
        return v(this, a)
    };
    var w = function (a) {
            this.stack = Error().stack || "";
            if (a) this.message = "" + a
        };
    ea(w, Error);
    w.prototype.name = "CustomError";
    var fa = function (a, b) {
            for (var c = 1; c < arguments.length; c++) var d = ("" + arguments[c]).replace(/\$/g, "$$$$"),
                a = a.replace(/\%s/, d);
            return a
        },
        ma = function (a) {
            if (!ga.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(ha, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(ia, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(ka, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(la, "&quot;"));
            return a
        },
        ha = /&/g,
        ia = /</g,
        ka = />/g,
        la = /\"/g,
        ga = /[&<>\"]/;
    var x = function (a, b) {
            b.unshift(a);
            w.call(this, fa.apply(m, b));
            b.shift();
            this.Ra = a
        };
    ea(x, w);
    x.prototype.name = "AssertionError";
    var y = function (a, b, c) {
            if (!a) {
                var d = Array.prototype.slice.call(arguments, 2),
                    f = "Assertion failed";
                if (b) var f = f + (": " + b),
                    e = d;
                throw new x("" + f, e || []);
            }
        };
    var z = Array.prototype,
        na = z.indexOf ?
    function (a, b, c) {
        y(a.length != m);
        return z.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = c == m ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (u(a)) return !u(b) || 1 != b.length ? -1 : a.indexOf(b, c);
        for (; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, oa = z.forEach ?
    function (a, b, c) {
        y(a.length != m);
        z.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, f = u(a) ? a.split("") : a, e = 0; e < d; e++) e in f && b.call(c, f[e], e, a)
    }, pa = function (a) {
        return z.concat.apply(z, arguments)
    }, qa = function (a) {
        if ("array" == r(a)) return pa(a);
        for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = a[c];
        return b
    }, ra = function (a, b, c) {
        y(a.length != m);
        return 2 >= arguments.length ? z.slice.call(a, b) : z.slice.call(a, b, c)
    };
    var A = function (a, b) {
            this.x = a !== g ? a : 0;
            this.y = b !== g ? b : 0
        };
    A.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };
    var sa = function (a, b) {
            for (var c in a) b.call(g, a[c], c, a)
        },
        ta = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
        ua = function (a, b) {
            for (var c, d, f = 1; f < arguments.length; f++) {
                d = arguments[f];
                for (c in d) a[c] = d[c];
                for (var e = 0; e < ta.length; e++) c = ta[e], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var B, va, C, wa, xa = function () {
            return q.navigator ? q.navigator.userAgent : m
        };
    wa = C = va = B = o;
    var D;
    if (D = xa()) {
        var ya = q.navigator;
        B = 0 == D.indexOf("Opera");
        va = !B && -1 != D.indexOf("MSIE");
        C = !B && -1 != D.indexOf("WebKit");
        wa = !B && !C && "Gecko" == ya.product
    }
    var za = B,
        E = va,
        F = wa,
        G = C,
        Aa;
    a: {
        var H = "",
            I;
        if (za && q.opera) var Ba = q.opera.version,
            H = "function" == typeof Ba ? Ba() : Ba;
        else if (F ? I = /rv\:([^\);]+)(\)|;)/ : E ? I = /MSIE\s+([^\);]+)(\)|;)/ : G && (I = /WebKit\/(\S+)/), I) var Ca = I.exec(xa()),
            H = Ca ? Ca[1] : "";
        if (E) {
            var Da, Ea = q.document;
            Da = Ea ? Ea.documentMode : g;
            if (Da > parseFloat(H)) {
                Aa = "" + Da;
                break a
            }
        }
        Aa = H
    }
    var Fa = Aa,
        Ga = {},
        Ha = function (a) {
            var b;
            if (!(b = Ga[a])) {
                b = 0;
                for (var c = ("" + Fa).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = ("" + a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), e = 0; 0 == b && e < f; e++) {
                    var h = c[e] || "",
                        n = d[e] || "",
                        j = RegExp("(\\d*)(\\D*)", "g"),
                        t = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var i = j.exec(h) || ["", "", ""],
                            l = t.exec(n) || ["", "", ""];
                        if (0 == i[0].length && 0 == l[0].length) break;
                        b = ((0 == i[1].length ? 0 : parseInt(i[1], 10)) < (0 == l[1].length ? 0 : parseInt(l[1], 10)) ? -1 : (0 == i[1].length ? 0 : parseInt(i[1], 10)) > (0 == l[1].length ? 0 : parseInt(l[1], 10)) ? 1 : 0) || ((0 == i[2].length) < (0 == l[2].length) ? -1 : (0 == i[2].length) > (0 == l[2].length) ? 1 : 0) || (i[2] < l[2] ? -1 : i[2] > l[2] ? 1 : 0)
                    } while (0 == b)
                }
                b = Ga[a] = 0 <= b
            }
            return b
        },
        Ia = {},
        J = function (a) {
            return Ia[a] || (Ia[a] = E && document.documentMode && document.documentMode >= a)
        };
    var Ja, Ka = !E || J(9);
    !F && !E || E && J(9) || F && Ha("1.9.1");
    E && Ha("9");
    var La = function (a, b) {
            var c;
            c = (c = a.className) && "function" == typeof c.split ? c.split(/\s+/) : [];
            var d = ra(arguments, 1),
                f;
            f = c;
            for (var e = 0, h = 0; h < d.length; h++) 0 <= na(f, d[h]) || (f.push(d[h]), e++);
            f = e == d.length;
            a.className = c.join(" ");
            return f
        };
    var Ma = function (a) {
            return a ? new K(L(a)) : Ja || (Ja = new K)
        },
        Na = function (a, b) {
            var c = b && "*" != b ? b.toUpperCase() : "";
            return a.querySelectorAll && a.querySelector && (!G || "CSS1Compat" == document.compatMode || Ha("528")) && c ? a.querySelectorAll(c + "") : a.getElementsByTagName(c || "*")
        },
        Pa = function (a, b) {
            sa(b, function (b, d) {
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Oa ? a.setAttribute(Oa[d], b) : 0 == d.lastIndexOf("aria-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        },
        Oa = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            height: "height",
            width: "width",
            usemap: "useMap",
            frameborder: "frameBorder",
            maxlength: "maxLength",
            type: "type"
        },
        Qa = function (a, b, c) {
            function d(c) {
                c && b.appendChild(u(c) ? a.createTextNode(c) : c)
            }
            for (var f = 2; f < c.length; f++) {
                var e = c[f];
                if (aa(e) && !(ba(e) && 0 < e.nodeType)) {
                    var h;
                    a: {
                        if (e && "number" == typeof e.length) {
                            if (ba(e)) {
                                h = "function" == typeof e.item || "string" == typeof e.item;
                                break a
                            }
                            if ("function" == r(e)) {
                                h = "function" == typeof e.item;
                                break a
                            }
                        }
                        h = o
                    }
                    oa(h ? qa(e) : e, d)
                } else d(e)
            }
        },
        L = function (a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        K = function (a) {
            this.C = a || q.document || document
        };
    K.prototype.za = function (a, b, c) {
        var d = this.C,
            f = arguments,
            e = f[0],
            h = f[1];
        if (!Ka && h && (h.name || h.type)) {
            e = ["<", e];
            h.name && e.push(' name="', ma(h.name), '"');
            if (h.type) {
                e.push(' type="', ma(h.type), '"');
                var n = {};
                ua(n, h);
                h = n;
                delete h.type
            }
            e.push(">");
            e = e.join("")
        }
        e = d.createElement(e);
        if (h) u(h) ? e.className = h : "array" == r(h) ? La.apply(m, [e].concat(h)) : Pa(e, h);
        2 < f.length && Qa(d, e, f);
        return e
    };
    K.prototype.createElement = function (a) {
        return this.C.createElement(a)
    };
    K.prototype.createTextNode = function (a) {
        return this.C.createTextNode(a)
    };
    K.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    var M = function (a) {
            var b;
            a: {
                b = L(a);
                if (b.defaultView && b.defaultView.getComputedStyle && (b = b.defaultView.getComputedStyle(a, m))) {
                    b = b.position || b.getPropertyValue("position");
                    break a
                }
                b = ""
            }
            return b || (a.currentStyle ? a.currentStyle.position : m) || a.style && a.style.position
        },
        Ra = function (a) {
            if (E && !J(8)) return a.offsetParent;
            for (var b = L(a), c = M(a), d = "fixed" == c || "absolute" == c, a = a.parentNode; a && a != b; a = a.parentNode) if (c = M(a), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
            return m
        },
        N = function (a) {
            var b, c = L(a),
                d = M(a),
                f = F && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY),
                e = new A(0, 0),
                h;
            b = c ? 9 == c.nodeType ? c : L(c) : document;
            if (h = E) if (h = !J(9)) h = "CSS1Compat" != Ma(b).C.compatMode;
            h = h ? b.body : b.documentElement;
            if (a == h) return e;
            if (a.getBoundingClientRect) {
                b = a.getBoundingClientRect();
                if (E) a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop;
                a = Ma(c).C;
                c = !G && "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
                a = a.parentWindow || a.defaultView;
                c = new A(a.pageXOffset || c.scrollLeft, a.pageYOffset || c.scrollTop);
                e.x = b.left + c.x;
                e.y = b.top + c.y
            } else if (c.getBoxObjectFor && !f) b = c.getBoxObjectFor(a), c = c.getBoxObjectFor(h), e.x = b.screenX - c.screenX, e.y = b.screenY - c.screenY;
            else {
                b = a;
                do {
                    e.x += b.offsetLeft;
                    e.y += b.offsetTop;
                    b != a && (e.x += b.clientLeft || 0, e.y += b.clientTop || 0);
                    if (G && "fixed" == M(b)) {
                        e.x += c.body.scrollLeft;
                        e.y += c.body.scrollTop;
                        break
                    }
                    b = b.offsetParent
                } while (b && b != a);
                if (za || G && "absolute" == d) e.y -= c.body.offsetTop;
                for (b = a;
                (b = Ra(b)) && b != c.body && b != h;) if (e.x -= b.scrollLeft, !za || "TR" != b.tagName) e.y -= b.scrollTop
            }
            return e
        },
        Ta = function () {
            var a = Ma(g),
                b = m;
            if (E) b = a.C.createStyleSheet(), Sa(b);
            else {
                var c = Na(a.C, "head")[0];
                c || (b = Na(a.C, "body")[0], c = a.za("head"), b.parentNode.insertBefore(c, b));
                b = a.za("style");
                Sa(b);
                a.appendChild(c, b)
            }
        },
        Sa = function (a) {
            E ? a.cssText = "canvas:active{cursor:pointer}" : a[G ? "innerText" : "innerHTML"] = "canvas:active{cursor:pointer}"
        };
    var O = function (a, b) {
            var c = {},
                d;
            for (d in b) c[d] = a.style[d], a.style[d] = b[d];
            return c
        },
        P = function (a, b) {
            this.M = a || m;
            this.fa = m;
            this.ya = b ||
            function () {};
            this.Q = 0;
            this.ta = 0.05
        },
        Ua = function (a, b) {
            a.ya = b
        };
    P.prototype.s = function () {
        if (this.M && this.ta) {
            this.Q += this.ta;
            if (1 < this.Q) this.Q = 1, this.ta = 0, this.ya();
            var a = "0 0 2px rgba(255,0,0," + this.Q + ")",
                a = O(this.M, {
                    boxShadow: a,
                    MozBoxShadow: a,
                    webkitBoxShadow: a,
                    oBoxShadow: a,
                    msBoxShadow: a,
                    opacity: this.Q
                });
            if (!this.fa) this.fa = a
        }
    };
    P.prototype.restore = function () {
        this.M && this.fa && O(this.M, this.fa)
    };
    var Va = function () {
            this.H = []
        };
    Va.prototype.k = function (a, b, c) {
        if (a) {
            this.H.push(arguments);
            var d = a,
                f = b,
                e = c;
            d.addEventListener ? d.addEventListener(f, e, o) : d.attachEvent("on" + f, e)
        }
    };
    var Wa = function (a, b, c) {
            a && (a.removeEventListener ? a.removeEventListener(b, c, o) : a.detachEvent("on" + b, c))
        };
    var Xa = Math.PI / 2,
        Q = function (a, b, c) {
            this.ca = a;
            this.P = document.createElement("div");
            this.P.style.position = "absolute";
            var a = Math.floor(3 * Math.random() + 0),
                d = "\u2744";
            1 < a ? d = "\u2745" : 2 < a && (d = "\u2746");
            this.P.innerHTML = d;
            this.ca.appendChild(this.P);
            this.Y = c;
            this.X = b;
            this.reset()
        };
    Q.prototype.reset = function () {
        this.x = Math.random() * this.X;
        this.ea = 4.5 * Math.random() + 1;
        this.y = -this.ea;
        this.B = 2 * Math.random() + -1;
        this.xa = this.ea;
        var a = Math.floor(255 * (0.4 * Math.random() + 0.5)).toString(16);
        O(this.P, {
            fontSize: 2.5 * this.ea + "px",
            left: this.x + "px",
            top: this.y + "px",
            color: "#" + a + a + a
        })
    };
    Q.prototype.move = function (a, b) {
        this.y += this.B * b + this.xa * a;
        this.B += 0.2 * Math.random() + -0.1;
        if (-1 > this.B) this.B = -1;
        else if (1 < this.B) this.B = 1;
        this.x += this.B * a + this.xa * b;
        this.y > this.Y + this.ea && this.reset()
    };
    Q.prototype.s = function () {
        this.P.style.left = this.x + "px";
        this.P.style.top = this.y + "px"
    };
    var R = function (a) {
            this.ca = a;
            this.X = a.offsetWidth;
            this.Y = a.offsetHeight;
            this.da = [];
            this.ra = 1;
            this.sa = 0;
            this.Ma = !! navigator.userAgent.match(/(iPod|iPhone|iPad)/)
        };
    R.prototype.s = function () {
        200 > this.da.length && 0.5 > Math.random() && this.da.push(new Q(this.ca, this.X, this.Y));
        for (var a = 0, b; b = this.da[a]; a++) b.move(this.ra, this.sa), b.s()
    };
    R.prototype.Ca = function (a) {
        if (this.Ma) {
            var b = window.orientation & 2,
                c = b ? a.beta : a.gamma / 2,
                a = b ? 0 > a.gamma ? 1 : -1 : 0 > a.beta ? -1 : 1;
            if (c && 45 > Math.abs(c)) c = a * Xa * (c / 45), this.ra = Math.cos(c), this.sa = Math.sin(c)
        } else {
            if (!a.gamma && a.x) a.gamma = -(a.x * (180 / Math.PI));
            if (a.gamma && 90 > Math.abs(a.gamma)) c = Xa * (a.gamma / 90), this.ra = Math.cos(c), this.sa = Math.sin(c)
        }
    };
    R.prototype.N = function (a, b) {
        O(this.ca, {
            width: a + "px",
            height: b + "px"
        });
        this.X = a;
        this.Y = b;
        for (var c = 0, d; d = this.da[c]; c++) {
            var f = b;
            d.X = a;
            d.Y = f
        }
    };
    var Ya = function (a, b, c, d) {
            this.oa = b;
            this.g = a;
            this.x = c;
            this.y = d;
            this.width = b.width;
            this.height = b.height;
            this.la = (this.width + 120) / 88;
            this.Ea = (this.height + 120) / 66;
            this.ga = 0;
            this.$ = o;
            this.w = [];
            this.G = [];
            for (a = 0; 66 > a; a++) {
                this.w[a] = [];
                this.G[a] = [];
                b = Math.min(a, 65 - a);
                for (c = 0; 88 > c; c++) d = Math.min(c, 87 - c), 8 > d || 8 > b ? (d = 1 - Math.min(d, b) / 8, this.G[a].push(4 * Math.random() * d * d)) : this.G[a].push(0), this.w[a].push(0)
            }
            this.S = 0;
            this.L = [];
            this.v = m;
            this.ka = [];
            this.W = this.aa = 0;
            this.I = m;
            this.ma = o
        },
        Za = function (a, b, c) {
            b = (b + 60) / a.la | 0;
            c = (c + 60) / a.Ea | 0;
            return [b, c]
        },
        $a = function (a, b, c) {
            for (var d = 0, f = c - 1; f <= c + 1; f++) for (var e = b - 1; e <= b + 1; e++) var h = a,
                n = e,
                j = f,
                n = Math.max(0, Math.min(87, n)),
                j = Math.max(0, Math.min(65, j)),
                d = d + h.w[j][n];
            return d / 9
        },
        ab = function (a, b) {
            a.$ = k;
            b.fillStyle = "rgba(240,246,246,0.8)";
            b.fillRect(0, 0, b.canvas.width, b.canvas.height)
        };
    Ya.prototype.s = function (a) {
        if (!(this.$ || 88 < this.ga || 5808 < this.S)) {
            a.fillStyle = "rgba(240,246,246,0.08)";
            for (var b = 0; 200 > b; b++) {
                var c = Math.random() * (this.width + 120) - 60,
                    d = Math.random() * (this.height + 120) - 60,
                    f = Za(this, c, d),
                    e = this.w[f[1]][f[0]];
                e >= 4 * (1 + Math.random()) / 2 && (c |= 0, d |= 0, a.beginPath(), a.arc(c, d, e / 4 * this.la | 0, 0, 2 * Math.PI, k), a.fill(), a.closePath(), this.S++)
            }
            for (b = 0; 200 > b; b++) 
                if (c = Math.random() * (this.width + 120) - 60, d = Math.random() * (this.height + 120) - 60, f = Za(this, c, d), e = this.w[f[1]][f[0]], f = this.G[f[1]][f[0]], e = 2 > e ? Math.max(e, f) : f, e >= Math.random()) 
                e = 3 * Math.min(1, e) * this.la | 0, c |= 0, d |= 0, f = a.createRadialGradient(c, d, 0, c, d, e), 
                f.addColorStop(0, "rgba(240,246,246,0.05)"), 
                f.addColorStop(1, "rgba(240,246,246,0)"), 
                a.fillStyle = f, a.fillRect(c - e + 1, d - e + 1, 2 * e - 1, 2 * e - 1), this.S++
        }
        bb(this);
        bb(this);
        for (b = 0; b < this.L.length; b++) this.L[b].s(a)
    };
    var cb = function (a, b) {
            a.ka = b;
            a.aa = 0;
            a.W = 0;
            a.I = m
        },
        bb = function (a) {
            if (!(a.v || a.aa >= a.ka.length)) {
                var b = a.ka[a.aa].O;
                if (!a.I) a.I = new S, a.L.push(a.I);
                a.I.ba.apply(a.I, b[a.W]);
                a.W++;
                if (a.W >= b.length) a.W = 0, a.aa++, a.I = m
            }
        },
        T = function (a, b) {
            a.v && a.v.ba(b[0], b[1])
        },
        db = function (a) {
            a.g.k(window, "touchmove", v(a.Ka, a));
            a.g.k(window, "touchstart", v(a.La, a));
            a.g.k(window, "touchend", v(a.Ja, a));
            a.g.k(window, "mousemove", v(a.Ha, a));
            a.g.k(window, "mousedown", v(a.Ga, a));
            a.g.k(window, "mouseup", v(a.Ia, a))
        };
    p = Ya.prototype;
    p.Ha = function (a) {
        this.v && !this.ma && T(this, [a.clientX - this.x | 0, a.clientY - this.y | 0])
    };
    p.Ga = function (a) {
        if ((a.target || a.srcElement) == this.oa && (0 == a.button || 1 == a.button)) {
            var b = [a.clientX - this.x | 0, a.clientY - this.y | 0];
            this.v = new S;
            this.L.push(this.v);
            T(this, b);
            a.preventDefault();
            return o
        }
    };
    p.Ia = function () {
        this.v = m
    };
    p.La = function (a) {
        this.ma = k;
        a = a.touches.item(0);
        a = [a.clientX - this.x | 0, a.clientY - this.y | 0];
        this.v = new S;
        this.L.push(this.v);
        T(this, a)
    };
    p.Ja = function (a) {
        this.ma = o;
        this.v = m;
        a.preventDefault();
        return o
    };
    p.Ka = function (a) {
        var b = a.touches.item(0);
        T(this, [b.clientX - this.x | 0, b.clientY - this.y | 0]);
        a.preventDefault();
        return o
    };
    p.N = function (a, b, c) {
        this.oa.width = a;
        this.oa.height = b;
        this.width = a;
        this.height = b;
        ab(this, c)
    };
    var S = function () {
            this.Qa = this.Oa = 30;
            this.O = []
        };
    S.prototype.ba = function (a, b) {
        this.O.push([a, b])
    };
    S.prototype.s = function (a) {
        if (0 != this.O.length) {
            var b = a.globalCompositeOperation;
            a.globalCompositeOperation = "destination-out";
            a.lineWidth = this.Oa;
            a.lineCap = "round";
            a.lineJoin = "round";
            a.beginPath();
            var c = this.O[0];
            a.moveTo(c[0], c[1] - 1);
            for (var d = 0; c = this.O[d]; d++) a.lineTo(c[0], c[1]);
            a.stroke();
            a.globalCompositeOperation = b
        }
    };
    var U = function (a) {
            this.n = this.o = m;
            this.g = a;
            this.D = new P
        },
        eb = function (a) {
            if (!a.o) return m;
            var b = document.createElement("button"),
                c = N(a.o),
                d = a.o.offsetWidth,
                a = a.o.offsetHeight;
            navigator.userAgent.match(/iPad/) && (d = 86, a = 40);
            document.getElementById("skb") ? (b.className = "lsbb", O(b, {
                fontSize: "15px",
                background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAmCAYAAAAFvPEHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAl2cEFnAAAAJgAAACYAB/nYBgAAADFJREFUCNd9jDEKACAQw0L//17BKW4iR3ErbVL20ihE4EkgdVAIo7swBe6av7+pWYcD6Xg4BFIWHrsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTEtMTItMTNUMTA6MTE6MjctMDg6MDD1wN6AAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDExLTEyLTEzVDEwOjExOjI3LTA4OjAwhJ1mPAAAAABJRU5ErkJggg==') repeat-x",
                color: "#374A82"
            }), b.innerHTML = "\u2652", c.y -= 1) : (b.innerHTML = "Defrost", O(b, {
                backgroundColor: "#4d90fe",
                backgroundImage: "-webkit-,-moz-,-ms-,-o-,,".split(",").join("linear-gradient(top,#4d90fe,#4787ed);"),
                filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#4d90fe',EndColorStr='#4787ed')",
                border: "1px solid #3079ed",
                borderRadius: "2px",
                webkitBorderRadius: "2px",
                mozBorderRadius: "2px",
                color: "white",
                fontSize: "11px",
                fontWeight: "bold",
                textAlign: "center",
                position: "fixed",
                top: c.y + "px",
                left: c.x + "px",
                width: d + "px",
                height: a + "px",
                padding: "0 8px",
                zIndex: 1201,
                opacity: 0
            }), 30 < a && O(b, {
                fontSize: "15px"
            }));
            return b
        };
    U.prototype.qa = function (a) {
        var b = this.o = document.getElementById("gbqfb") || document.getElementById("sblsbb") || document.getElementsByName("btnG")[0];
        if (this.o) {
            this.n = eb(this);
            this.D.M = this.n;
            Ua(this.D, function () {
                b.style.visibility = "hidden"
            });
            var c = this.o.parentNode;
            if (c && "sbds" == c.id) c.style.width = c.offsetWidth + "px";
            this.g.k(this.n, "click", a);
            document.body.insertBefore(this.n, document.body.firstChild)
        }
    };
    U.prototype.detach = function () {
        if (this.o && this.n) this.n.parentNode.removeChild(this.n), this.n = m, this.o.style.visibility = "visible"
    };
    U.prototype.pa = function () {
        if (this.o && this.n) {
            var a = N(this.o);
            this.n.style.top = a.y + "px";
            this.n.style.left = a.x + "px"
        }
    };
    var V = function (a, b) {
            this.i = b;
            this.g = a;
            this.U = this.V = this.a = m;
            this.va = {};
            this.ua = {};
            this.p = m;
            this.D = new P;
            this.m = m
        },
        fb = function (a) {
            function b(a) {
                return d.charAt(a >> 6 & 63) + d.charAt(a & 63)
            }
            function c(a) {
                var c = 0;
                0 > a && (c = 32, a = -a);
                return b(c | a & 31).charAt(1)
            }
            for (var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", a = a.i.L, f = [], e = 0, h; h = a[e]; ++e) {
                var n = [];
                h = h.O;
                for (var j = m, t = 0, i; i = h[t]; t++) j && 32 > Math.abs(i[0] - j[0]) && 32 > Math.abs(i[1] - j[1]) ? (j = [i[0] - j[0], i[1] - j[1]], n.push(c(j[0]) + c(j[1]))) : n.push((0 == t ? "" : ";") + (b(i[0]) + b(i[1]))), j = i;
                f.push(n.join(""))
            }
            return "1;" + f.join("!")
        },
        gb = function (a) {
            function b(a) {
                var b = String.fromCharCode(a);
                return "A" <= b && "Z" >= b ? a - 65 : "a" <= b && "z" >= b ? a - 97 + 26 : "0" <= b && "9" >= b ? a - 48 + 52 : "-" == b ? 62 : "_" == b ? 63 : m
            }
            function c(a, c) {
                var d = b(a.charCodeAt(c)),
                    e = b(a.charCodeAt(c + 1));
                return d === m || e === m ? m : d << 6 | e
            }
            function d(a, c) {
                var d = b(a.charCodeAt(c));
                if (d === m) return m;
                d & 32 && (d = -(d & 31));
                return d
            }
            var f = /&frostwriting=([A-Za-z0-9-_!;]+)/.exec(window.location.href);
            if (!f) return o;
            var f = f[1].split("!"),
                e = [],
                h = 0;
            0 < f.length && "1;" == f[0].substr(0, 2) && (f[0] = f[0].substr(2), h = 1);
            for (var n = 0, j; j = f[n]; ++n) {
                for (var t = new S, i = m, l = 0; l < j.length;) {
                    var s = o;
                    if (";" == j.charAt(l)) {
                        if (0 == h) return o;
                        l++;
                        s = k
                    }
                    if (0 == h || !i || s) {
                        if (l + 3 >= j.length) return o;
                        i = c(j, l);
                        s = c(j, l + 2);
                        if (i === m || s === m) return o;
                        t.ba(i, s);
                        i = [i, s];
                        l += 4
                    } else {
                        if (l + 1 >= j.length) return o;
                        var s = d(j, l),
                            ja = d(j, l + 1);
                        if (s === m || ja === m) return o;
                        t.ba(i[0] + s, i[1] + ja);
                        i = [i[0] + s, i[1] + ja];
                        l += 2
                    }
                }
                e.push(t)
            }
            cb(a.i, e);
            return k
        },
        hb = function () {
            return -1 == window.location.hash.indexOf("&fp=") ? window.location.href : window.location.protocol + "//" + window.location.host + "/search?" + window.location.hash.substr(1).replace(/&fp=[0-9a-z]+/, "")
        };
    V.prototype.wa = function (a) {
        a.stopPropagation();
        a.preventDefault();
        return o
    };
    V.prototype.Fa = function (a) {
        var b = fb(this),
            c = hb() + "&frostwriting=" + b;
        if ("1;" == b) W(this, hb(), "Draw something on your window.  #letitsnow");
        else if (480 < c.length) {
            if (this.m !== m) clearTimeout(this.m), this.m = m;
            google.letitsnowGCO = v(this.Na, this);
            ib(c);
            this.m = setTimeout(v(function () {
                W(this, window.location.href, "My drawing is too complex to share, but you should try this out and have fun, anyway.  #letitsnow");
                this.m = m
            }, this), 5E3)
        } else W(this, c, "Check out what I drew.  #letitsnow");
        return this.wa(a)
    };
    var W = function (a, b, c) {
            if (a.m !== m) clearTimeout(a.m), a.m = m;
            gbar.asmc(function () {
                return {
                    items: [{
                        properties: {
                            url: [b],
                            name: ["Google - Let it snow!"],
                            image: ["http://www.google.com/images/logos/google_logo_41.png"],
                            description: [c]
                        }
                    }]
                }
            });
            if (document.createEvent) {
                var d = document.createEvent("MouseEvents");
                d.initEvent("click", k, o);
                a.V.dispatchEvent(d)
            } else a.V.fireEvent && a.V.fireEvent("onclick")
        };
    V.prototype.qa = function () {
        this.a = document.getElementById("gbgs3");
        this.U = document.getElementById("gbwc");
        this.V = document.getElementById("gbg3");
        if (this.a && this.U && this.V) {
            this.p = document.createElement("div");
            O(this.p, {
                height: this.a.offsetHeight + "px",
                width: this.a.offsetWidth + "px"
            });
            this.a.parentNode.insertBefore(this.p, this.a);
            var a = N(this.a);
            this.va = O(this.a, {
                font: "13px/27px Arial,sans-serif",
                left: a.x + "px",
                position: "fixed",
                top: a.y - this.a.offsetHeight + "px",
                zIndex: 1201
            });
            this.ua = O(this.U, {
                background: "#fff",
                zIndex: 1201
            });
            this.a.parentNode.removeChild(this.a);
            document.body.appendChild(this.a);
            "SPAN" == this.a.tagName ? this.a.style.lineHeight = "20px" : this.D.M = this.a;
            this.g.k(this.a, "click", v(this.Fa, this));
            this.g.k(this.a, "mousedown", v(this.wa, this))
        }
    };
    V.prototype.detach = function () {
        if (this.a && this.U) {
            this.m !== m && clearTimeout(this.m);
            O(this.a, this.va);
            O(this.U, this.ua);
            this.D.restore();
            for (var a = this.g, b = this.a, c = 0; c < a.H.length; ++c) {
                var d = a.H[c];
                d && d[0] == b && (Wa.apply(m, d), a.H[c] = m)
            }
            this.a.parentNode.removeChild(this.a);
            this.p.parentNode.insertBefore(this.a, this.p);
            this.p.parentNode.removeChild(this.p);
            this.p = this.a = m
        }
    };
    V.prototype.pa = function () {
        if (this.a && this.p) this.a.style.left = N(this.p).x + "px"
    };
    V.prototype.Na = function (a) {
        a && "OK" == a.status && !a.error && a.id && (clearTimeout(this.m), W(this, a.id, "Check out what I drew.  #letitsnow"))
    };
    var ib = function (a) {
            var a = a.replace(window.location.host, "www.google.com"),
                b = document.createElement("script");
            b.src = "//google-doodles.appspot.com/?callback=google.letitsnowGCO&url=" + encodeURIComponent(a);
            document.body.appendChild(b)
        };
    var jb = Math.floor(60),
        kb = Math.floor(300),
        X = function () {
            this.J = this.i = this.K = this.h = this.A = m;
            this.Z = this.ia = o;
            this.g = this.F = m;
            this.ha = o;
            this.T = 0;
            this.ja = this.R = m;
            this.Da = window.opera || navigator.userAgent.match(/MSIE/) ? jb : kb
        },
        Y = "goog.egg.snowyfog.Snowyfog".split("."),
        Z = q;
    !(Y[0] in Z) && Z.execScript && Z.execScript("var " + Y[0]);
    for (var $; Y.length && ($ = Y.shift());)!Y.length && X !== g ? Z[$] = X : Z = Z[$] ? Z[$] : Z[$] = {};
    X.prototype.init = function () {
        var a = this,
            b = function () {
                document.getElementById("snfloader_script") && (!document.getElementById("foot") && !document.getElementById("bfoot") ? window.setTimeout(b, 50) : (google.rein && google.dstr && (google.rein.push(v(a.Aa, a)), google.dstr.push(v(a.Pa, a))), a.Aa()))
            };
        b()
    };
    X.prototype.init = X.prototype.init;
    X.prototype.Aa = function () {
        if (!google || !google.snowyfogInited) {
            google.snowyfogInited = k;
            var a = document.createElement("canvas");
            document.body.insertBefore(a, document.body.firstChild);
            this.h = a;
            O(this.h, {
                pointerEvents: "none",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: 1200
            });
            this.h.width = window.innerWidth;
            this.h.height = window.innerHeight;
            this.T = 0;
            this.ha = this.Z = this.ia = o;
            this.g = new Va;
            this.A = document.createElement("div");
            a = window.opera || navigator.userAgent.match(/MSIE/) ? 0 : 800;
            O(this.A, {
                pointerEvents: "none",
                position: "absolute",
                zIndex: a,
                width: document.body.clientWidth + "px",
                height: Math.max(window.innerHeight, document.body.clientHeight) + "px",
                overflow: "hidden"
            });
            document.body.insertBefore(this.A, document.body.firstChild);
            this.K = new R(this.A);
            this.i = new Ya(this.g, this.h, 0, 0);
            this.F = new V(this.g, this.i);
            this.J = new U(this.g);
            a = v(this.K.Ca, this.K);
            this.g.k(window, "resize", v(this.N, this));
            this.g.k(window, "deviceorientation", a);
            this.g.k(window, "MozOrientation", a);
            this.R = this.h.getContext("2d");
            gb(this.F) && (ab(this.i, this.R), lb(this));
            this.ja = v(this.Ba, this);
            window.setTimeout(this.ja, 50)
        }
    };
    X.prototype.Pa = function () {
        this.ha = k;
        for (var a = this.g, b = 0; b < a.H.length; ++b) {
            var c = a.H[b];
            c && (Wa.apply(m, c), a.H[b] = m)
        }
        this.J.detach();
        this.F.detach();
        if (this.h) this.h.parentNode.removeChild(this.h), this.h = m;
        if (this.A) this.A.parentNode.removeChild(this.A), this.A = m
    };
    var lb = function (a) {
            if (!a.ia) a.ia = k, a.h.style.pointerEvents = "auto", Ta(), db(a.i), a.F.qa(), a.J.qa(v(function (a) {
                this.Z = o;
                this.i = m;
                this.h && this.h.parentNode.removeChild(this.h);
                this.h = m;
                this.J.detach();
                this.F.detach();
                a.stopPropagation()
            }, a))
        },
        mb = function (a) {
            a.K.s();
            if (a.Z) {
                var b = a.i;
                if (!(580.8 > b.S) && !(b.$ || 88 < b.ga)) {
                    for (var c = b.S = 0, d = 0; 66 > d; d++) for (var f = 0; 88 > f; f++) b.w[d][f] += b.G[d][f], 3.5 <= b.w[d][f] && c++;
                    b.ga++;
                    if (c >= 70.4 * 66) b.$ = k;
                    else for (d = 0; 66 > d; d++) for (f = 0; 88 > f; f++) if (c = 4 - b.w[d][f], c > 4 * Math.random() && 0.7 < Math.random()) {
                        var e = Math.min(1, 3 * $a(b, f, d)) * Math.random();
                        b.G[d][f] = c * e
                    } else b.G[d][f] = 0
                }
                a.i.s(a.R);
                a.J.D.s();
                a.F.D.s()
            }
        };
    X.prototype.Ba = function () {
        if (!this.ha) {
            window.setTimeout(this.ja, 50);
            this.T++;
            if (this.T == jb) this.Z = k;
            this.T == this.Da && lb(this);
            mb(this)
        }
    };
    X.prototype.N = function () {
        this.K && this.K.N(document.body.offsetWidth, Math.max(document.body.offsetHeight, window.innerHeight));
        this.i && (!navigator.userAgent.match(/iPad/) || this.T > jb) && this.i.N(window.innerWidth, window.innerHeight, this.R);
        lb(this);
        this.J.pa();
        this.F.pa();
        this.A && this.R && mb(this)
    };
    X.prototype.resize = X.prototype.N;
})();