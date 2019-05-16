"use strict";
cc._RF.push(module, '008e4R9nR1OFL0vuISMipN5', 'wheen');
// Scripts/Libs/wheen.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wheen = function () {
	function Wheen(target) {
		_classCallCheck(this, Wheen);

		if (target) {
			this.apply(target);
		}

		this._running = false;
		this._tweenChain = [];
		this._chainIndex = 0;
		this._flags = {};
		this._lastUpdateTime = 0;
		this._completed = false;
		this._integrated = false;
		this._class = null;

		this._update = this._update.bind(this);

		// Cocos Creater integration
		if (typeof window !== 'undefined') {
			var _cc = window.cc;
			if (typeof _cc !== 'undefined' && _cc.ENGINE_VERSION) {
				var ud = this._update;
				if (_cc.Canvas.instance) {
					try {
						this._class = _cc.Class({
							extends: _cc.Component,
							update: ud
						});

						_cc.Canvas.instance.node.addComponent(this._class);
						this._integrated = true;
					} catch (ex) {
						console.error(ex);
					}
				}
			}
		}
	}

	_createClass(Wheen, [{
		key: 'apply',
		value: function apply(target) {
			this.target = target;
			if (typeof target.__wheens__ === 'undefined' || !target.__wheens__) {
				target.__wheens__ = [];
			}
			target.__wheens__.push(this);
			return this;
		}
	}, {
		key: 'from',
		value: function from(args) {
			this._tweenChain.push({ args: args, type: 'from' });
			return this;
		}
	}, {
		key: 'to',
		value: function to(args, time, easing) {
			var chain = { args: args, time: time, easing: easing, type: 'to' };
			this._tweenChain.push(chain);
			return this;
		}
	}, {
		key: 'wait',
		value: function wait(time) {
			this._tweenChain.push({ time: time, type: 'wait', elapsedTime: 0 });
			return this;
		}
	}, {
		key: 'setFlag',
		value: function setFlag(flag) {
			this._flags[flag] = this._tweenChain.length;
			return this;
		}
	}, {
		key: 'loop',
		value: function loop(count, flag) {
			this._tweenChain.push({ count: count, flag: flag, type: 'loop', currentLap: 0 });
			return this;
		}
	}, {
		key: 'callFunc',
		value: function callFunc(func, self) {
			for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				args[_key - 2] = arguments[_key];
			}

			this._tweenChain.push({ func: func, self: self, args: args, type: 'callFunc' });
			return this;
		}
	}, {
		key: 'start',
		value: function start() {
			var _this = this;

			if (!this.target) {
				throw new Error('You have to assign the animation to a target!');
			}

			this._chainIndex = 0;
			this._running = true;
			this._lastUpdateTime = new Date().getTime();

			// Use the from value immediately
			this._tweenChain.forEach(function (chain) {
				if (chain.type === 'from') {
					assign(_this.target, chain.args);
				}
			});

			if (!this._integrated) {
				window.requestAnimationFrame(function () {
					return _this._update();
				});
			}

			return this;
		}
	}, {
		key: 'pause',
		value: function pause() {
			this._running = false;
			return this;
		}
	}, {
		key: 'resume',
		value: function resume() {
			this._running = true;
			return this;
		}
	}, {
		key: 'stop',
		value: function stop() {
			this._running = false;
			this._completed = true;
			this._remove();
			if (this._class) {
				cc.Canvas.instance.node.removeComponent(this._class);
			}
			return this;
		}
	}, {
		key: '_remove',
		value: function _remove() {
			if (this.target.__wheens__) {
				var index = this.target.__wheens__.indexOf(this);
				if (index > -1) {
					this.target.__wheens__.splice(index, 1);
				}
				if (this.target.__wheens__.length <= 0) {
					delete this.target.__wheens__;
				}
			}
		}
	}, {
		key: '_update',
		value: function _update(deltaTime) {
			var _this2 = this;

			var dt = deltaTime;
			if (this._integrated && dt) {
				dt *= 1000;
			} else {
				dt = new Date().getTime() - this._lastUpdateTime;
			}

			var callImmediately = false;

			if (this._running && !this._completed) {
				var chain = this._tweenChain[this._chainIndex];
				if (!chain || !this.target || this._integrated && this.target instanceof cc.Node && !this.target.isValid) {
					this.stop();
				} else {
					switch (chain.type) {
						case 'from':
							this._chainIndex++;
							callImmediately = true;
							break;
						case 'to':
							if (chain.time <= 0) {
								assign(this.target, chain.args);
								this._chainIndex++;
							} else {
								if (!chain.org) {
									chain.org = {};
									for (var arg in chain.args) {
										chain.org[arg] = this.target[arg];
									}
								}

								if (!chain.elapsedTime) {
									chain.elapsedTime = dt;
								} else {
									chain.elapsedTime += dt;
								}

								if (chain.elapsedTime >= chain.time) {
									chain.elapsedTime = chain.time;
									assign(this.target, chain.args);
									this._chainIndex++;
								} else {
									if (!chain.easing) {
										chain.easing = Wheen.Easing.Linear;
									}

									for (var _arg in chain.args) {
										if (chain.elapsedTime >= chain.time) {
											this.target[_arg] = chain.args[_arg];
										} else {
											this.target[_arg] = chain.easing(chain.elapsedTime, chain.org[_arg], chain.args[_arg] - chain.org[_arg], chain.time);
										}
									}
								}
							}
							break;
						case 'wait':
							chain.elapsedTime += dt;
							if (chain.elapsedTime > chain.time) {
								this._chainIndex++;
							}
							break;
						case 'loop':
							chain.currentLap++;
							if (!chain.count || chain.count <= 0 || chain.currentLap < chain.count) {
								var backtrack = chain.flag && this._flags[chain.flag] || 0;

								// reset the children's states
								for (var i = backtrack; i < this._chainIndex; i++) {
									var _chain = this._tweenChain[i];
									var _forWechat = _chain.elapsedTime;
									if (_chain.type === 'loop') {
										_chain.currentLap = 0;
									} else if (_chain.type === 'wait') {
										_chain.elapsedTime = 0;
									} else if (_chain.type === 'to') {
										_chain.elapsedTime = 0;
										delete _chain.org;
									}
									if (_forWechat) {
										_forWechat.toString();
									}
								}
								this._chainIndex = backtrack;
							} else {
								this._chainIndex++;
								callImmediately = true;
							}
							break;
						case 'callFunc':
							if (chain.func) {
								if (chain.self) {
									var _chain$func;

									(_chain$func = chain.func).call.apply(_chain$func, [chain.self].concat(_toConsumableArray(chain.args)));
								} else {
									chain.func.apply(chain, _toConsumableArray(chain.args));
								}
								this._chainIndex++;
								break;
							}
					}
				}
			}

			this._lastUpdateTime += dt;
			if (callImmediately) {
				this._update();
			} else if (!this._completed) {
				if (!this._integrated) {
					window.requestAnimationFrame(function () {
						return _this2._update();
					});
				}
			}
		}
	}], [{
		key: 'stop',
		value: function stop(target) {
			if (target.__wheens__) {
				target.__wheens__.forEach(function (wheen) {
					wheen.stop();
				});
			}
		}
	}, {
		key: 'pause',
		value: function pause(target) {
			if (target.__wheens__) {
				target.__wheens__.forEach(function (wheen) {
					wheen.pause();
				});
			}
		}
	}, {
		key: 'resume',
		value: function resume(target) {
			if (target.__wheens__) {
				target.__wheens__.forEach(function (wheen) {
					wheen.resume();
				});
			}
		}
	}, {
		key: 'start',
		value: function start(target) {
			if (target.__wheens__) {
				target.__wheens__.forEach(function (wheen) {
					wheen.start();
				});
			}
		}
	}]);

	return Wheen;
}();

Wheen.Easing = {
	Linear: function Linear(t, s, e, i) {
		return e * t / i + s;
	},
	Quad: {
		easeIn: function easeIn(t, s, e, i) {
			return e * (t /= i) * t + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return -e * (t /= i) * (t - 2) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return (t /= i / 2) < 1 ? e / 2 * t * t + s : -e / 2 * (--t * (t - 2) - 1) + s;
		}
	},
	Cubic: {
		easeIn: function easeIn(t, s, e, i) {
			return e * (t /= i) * t * t + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return e * ((t = t / i - 1) * t * t + 1) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return (t /= i / 2) < 1 ? e / 2 * t * t * t + s : e / 2 * ((t -= 2) * t * t + 2) + s;
		}
	},
	Quart: {
		easeIn: function easeIn(t, s, e, i) {
			return e * (t /= i) * t * t * t + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return -e * ((t = t / i - 1) * t * t * t - 1) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return (t /= i / 2) < 1 ? e / 2 * t * t * t * t + s : -e / 2 * ((t -= 2) * t * t * t - 2) + s;
		}
	},
	Quint: {
		easeIn: function easeIn(t, s, e, i) {
			return e * (t /= i) * t * t * t * t + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return e * ((t = t / i - 1) * t * t * t * t + 1) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return (t /= i / 2) < 1 ? e / 2 * t * t * t * t * t + s : e / 2 * ((t -= 2) * t * t * t * t + 2) + s;
		}
	},
	Sine: {
		easeIn: function easeIn(t, s, e, i) {
			return -e * Math.cos(t / i * (Math.PI / 2)) + e + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return e * Math.sin(t / i * (Math.PI / 2)) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return -e / 2 * (Math.cos(Math.PI * t / i) - 1) + s;
		}
	},
	Expo: {
		easeIn: function easeIn(t, s, e, i) {
			return 0 == t ? s : e * Math.pow(2, 10 * (t / i - 1)) + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return t == i ? s + e : e * (1 - Math.pow(2, -10 * t / i)) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return 0 == t ? s : t == i ? s + e : (t /= i / 2) < 1 ? e / 2 * Math.pow(2, 10 * (t - 1)) + s : e / 2 * (2 - Math.pow(2, -10 * --t)) + s;
		}
	},
	Circ: {
		easeIn: function easeIn(t, s, e, i) {
			return -e * (Math.sqrt(1 - (t /= i) * t) - 1) + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return e * Math.sqrt(1 - (t = t / i - 1) * t) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return (t /= i / 2) < 1 ? -e / 2 * (Math.sqrt(1 - t * t) - 1) + s : e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + s;
		}
	},
	Elastic: {
		easeIn: function easeIn(t, s, e, i, n, h) {
			if (0 == t) return s;
			if (1 == (t /= i)) return s + e;
			if (h || (h = 0.3 * i), !n || n < Math.abs(e)) {
				n = e;
				var a = h / 4;
			} else a = h / (2 * Math.PI) * Math.asin(e / n);
			return -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / h) + s;
		},
		easeOut: function easeOut(t, s, e, i, n, h) {
			if (0 == t) return s;
			if (1 == (t /= i)) return s + e;
			if (h || (h = 0.3 * i), !n || n < Math.abs(e)) {
				n = e;
				var a = h / 4;
			} else a = h / (2 * Math.PI) * Math.asin(e / n);
			return n * Math.pow(2, -10 * t) * Math.sin((t * i - a) * (2 * Math.PI) / h) + e + s;
		},
		easeInOut: function easeInOut(t, s, e, i, n, h) {
			if (0 == t) return s;
			if (2 == (t /= i / 2)) return s + e;
			if (h || (h = i * (0.3 * 1.5)), !n || n < Math.abs(e)) {
				n = e;
				var a = h / 4;
			} else a = h / (2 * Math.PI) * Math.asin(e / n);
			return t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / h) * -0.5 + s : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / h) * 0.5 + e + s;
		}
	},
	Back: {
		easeIn: function easeIn(t, s, e, i, n) {
			return null == n && (n = 1.70158), e * (t /= i) * t * ((n + 1) * t - n) + s;
		},
		easeOut: function easeOut(t, s, e, i, n) {
			return null == n && (n = 1.70158), e * ((t = t / i - 1) * t * ((n + 1) * t + n) + 1) + s;
		},
		easeInOut: function easeInOut(t, s, e, i, n) {
			return null == n && (n = 1.70158), (t /= i / 2) < 1 ? e / 2 * (t * t * ((1 + (n *= 1.525)) * t - n)) + s : e / 2 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2) + s;
		}
	},
	Bounce: {
		easeIn: function easeIn(t, s, e, i) {
			return e - Easing.Bounce.easeOut(i - t, 0, e, i) + s;
		},
		easeOut: function easeOut(t, s, e, i) {
			return (t /= i) < 1 / 2.75 ? e * (7.5625 * t * t) + s : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + s : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + s : e * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + s;
		},
		easeInOut: function easeInOut(t, s, e, i) {
			return t < i / 2 ? 0.5 * Easing.Bounce.easeIn(2 * t, 0, e, i) + s : 0.5 * Easing.Bounce.easeOut(2 * t - i, 0, e, i) + 0.5 * e + s;
		}
	}
};

// TODO: Use lodash .set function
function assign(target, source) {
	Object.assign(target, source);
}

if (typeof module !== 'undefined') {
	module.exports = Wheen;
}

window.Wheen = Wheen;

cc._RF.pop();