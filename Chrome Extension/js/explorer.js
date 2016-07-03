var Explorer;
if (!Explorer) {
	Explorer = {};
}(function(c, f) {
	var b = f;
	var a = "unknown";
	if (c.chrome) {
		b = c.chrome;
		a = "chrome";
	} else {
		try {
			b = sogouExplorer;
			a = "sougou";
		} catch (d) {}
	}
	Explorer.Meta = {
		getName: function() {
			return a;
		},
		setName: function(e) {
			if (e) {
				a = e;
			}
		}
	};
	Explorer.Badge = {
		setText: function(h, e) {
			var g = [240, 87, 26, 100];
			if (!e) {
				e = g;
			}
			if ($.trim(h) === "") {
				e = [0, 0, 0, 0];
			}
			b.browserAction.setBadgeText({
				text: h
			});
			b.browserAction.setBadgeBackgroundColor({
				color: e
			});
		},
		setIcon: function(e) {
			b.browserAction.setIcon({
				path: e
			});
		},
		setPopup: function(e) {
			if (!e) {
				e = "";
			}
			b.browserAction.setPopup({
				popup: e
			});
		},
		showHTMLBalloon: function(e) {
			if (b.browserAction.showHTMLBalloon) {
				b.browserAction.showHTMLBalloon(e);
			}
		},
		addClickListener: function(e) {
			if (!e || typeof(e) !== "function") {
				return;
			}
			b.browserAction.onClicked.addListener(e);
		},
		removeClickListener: function(e) {
			if (!e || typeof(e) !== "function") {
				return;
			}
			b.browserAction.onClicked.removeListener(e);
		},
		hasClickListener: function(e) {
			if (!e || typeof(e) !== "function") {
				return;
			}
			return b.browserAction.onClicked.hasListener(e);
		}
	};
	Explorer.Extension = {
		getBackgroundPage: function() {
			return b.extension.getBackgroundPage();
		},
		connect: function(g, e) {
			if (!g && !e) {
				return b.extension.connect();
			}
			if (g && e) {
				return b.extension.connect(g, e);
			}
			if (g) {
				return b.extension.connect(g);
			} else {
				return b.extension.connect(e);
			}
		},
		onConnect: function(e) {
			if (!e || typeof(e) !== "function") {
				return;
			}
			b.extension.onConnect.addListener(e);
		},
		request: function(g, e, h) {
			if (g && e && h) {
				b.extension.sendRequest(g, e, h);
			}
			if (g && e) {
				b.extension.sendRequest(g, e);
			}
			b.extension.sendRequest(g);
		},
		onRequest: function(e) {
			if (!e || typeof(e) !== "function") {
				return;
			}
			b.extension.onRequest.addListener(e);
		}
	};
	Explorer.Tab = {
		openTab: function(e) {
			b.tabs.create({
				url: e
			});
		},
	};
	Explorer.Notify = {};
	(function() {
		var e = function(h, g) {
			if (!h) {
				return;
			}
			if (!g) {
				return;
			}
			if (typeof(g) === "number" && g > 0) {
				h.ondisplay = function(i) {
					setTimeout(function() {
						i.currentTarget.cancel();
					}, g);
				};
			}
		};
		Explorer.Notify.html = function(g, h) {
			if (c.webkitNotifications.checkPermission() !== 0) {
				c.webkitNotifications.requestPermission();
			}
			var i = webkitNotifications.createHTMLNotification(g);
			e(i, h);
			i.show();
			return i;
		};
		Explorer.Notify.system = function(g, j, i, h) {
			if (!g) {
				g = "";
			}
			if (!j) {
				j = "";
			}
			if (!i) {
				i = "";
			}
			if (!h) {
				h = 0;
			}
			return notify.html("../html/system.html#icon=" + g + "&title=" + j + "&msg=" + i + "&timeout=" + h, h);
		};
		Explorer.Notify.cancel = function(g) {
			if (g && g.cancel && typeof(g.cancel) === "function") {
				g.cancel();
			}
		};
	})();
})(window, undefined);