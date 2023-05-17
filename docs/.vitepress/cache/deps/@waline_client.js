import {
  Fragment,
  __publicField,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  resolveComponent,
  shallowRef,
  toDisplayString,
  unref,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from "./chunk-ZESTCDI2.js";

// ../node_modules/.pnpm/@vueuse+shared@10.1.2_vue@3.3.2/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn2) {
  if (getCurrentScope()) {
    onScopeDispose(fn2);
    return true;
  }
  return false;
}
function toValue(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
var isClient = typeof window !== "undefined";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function createFilterWrapper(filter, fn2) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn2.apply(this, args), { fn: fn2, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options2 = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options2.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options2.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function identity(arg) {
  return arg;
}
function useDebounceFn(fn2, ms = 200, options2 = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options2),
    fn2
  );
}
function tryOnMounted(fn2, sync = true) {
  if (getCurrentInstance())
    onMounted(fn2);
  else if (sync)
    fn2();
  else
    nextTick(fn2);
}
function tryOnUnmounted(fn2) {
  if (getCurrentInstance())
    onUnmounted(fn2);
}
function useIntervalFn(cb, interval = 1e3, options2 = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options2;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$8.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$8.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options2 = {}) {
  const _a = options2, {
    eventFilter = bypassFilter
  } = _a, watchOptions = __objRest$5(_a, [
    "eventFilter"
  ]);
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchPausable(source, cb, options2 = {}) {
  const _a = options2, {
    eventFilter: filter
  } = _a, watchOptions = __objRest$1(_a, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    __spreadProps$2(__spreadValues$2({}, watchOptions), {
      eventFilter
    })
  );
  return { stop, pause, resume, isActive };
}

// ../node_modules/.pnpm/@vueuse+core@10.1.2_vue@3.3.2/node_modules/@vueuse/core/index.mjs
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options2;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options2] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options2] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn2) => fn2());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options22) => {
    el.addEventListener(event, listener, options22);
    return () => el.removeEventListener(event, listener, options22);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options2)],
    ([el, options22]) => {
      cleanup();
      if (!el)
        return;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, options22));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useRafFn(fn2, options2 = {}) {
  const {
    immediate = true,
    window: window2 = defaultWindow
  } = options2;
  const isActive = ref(false);
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    const delta = timestamp2 - previousFrameTimestamp;
    fn2({ delta, timestamp: timestamp2 });
    previousFrameTimestamp = timestamp2;
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var __defProp$k = Object.defineProperty;
var __getOwnPropSymbols$n = Object.getOwnPropertySymbols;
var __hasOwnProp$n = Object.prototype.hasOwnProperty;
var __propIsEnum$n = Object.prototype.propertyIsEnumerable;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$k = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$n.call(b, prop))
      __defNormalProp$k(a, prop, b[prop]);
  if (__getOwnPropSymbols$n)
    for (var prop of __getOwnPropSymbols$n(b)) {
      if (__propIsEnum$n.call(b, prop))
        __defNormalProp$k(a, prop, b[prop]);
    }
  return a;
};
var StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults2, storage, options2 = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError: onError2 = (e2) => {
      console.error(e2);
    }
  } = options2;
  const data = (shallow ? shallowRef : ref)(defaults2);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e2) {
      onError2(e2);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options2.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window2 && listenToStorageChanges) {
    useEventListener(window2, "storage", update);
    useEventListener(window2, customStorageEventName, updateFromCustomEvent);
  }
  update();
  return data;
  function write(v) {
    try {
      if (v == null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        const oldValue = storage.getItem(key);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          if (window2) {
            window2.dispatchEvent(new CustomEvent(customStorageEventName, {
              detail: {
                key,
                oldValue,
                newValue: serialized,
                storageArea: storage
              }
            }));
          }
        }
      }
    } catch (e2) {
      onError2(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit !== null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return __spreadValues$k(__spreadValues$k({}, rawInit), value);
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      data.value = read(event);
    } catch (e2) {
      onError2(e2);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
}
var __defProp$7 = Object.defineProperty;
var __getOwnPropSymbols$82 = Object.getOwnPropertySymbols;
var __hasOwnProp$82 = Object.prototype.hasOwnProperty;
var __propIsEnum$82 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$82.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$82)
    for (var prop of __getOwnPropSymbols$82(b)) {
      if (__propIsEnum$82.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
function useNow(options2 = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options2;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return __spreadValues$7({
      now
    }, controls);
  } else {
    return now;
  }
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function useScriptTag(src, onLoaded = noop, options2 = {}) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document: document2 = defaultDocument,
    attrs = {}
  } = options2;
  const scriptTag = ref(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el2) => {
      scriptTag.value = el2;
      resolve(el2);
      return el2;
    };
    if (!document2) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (!el) {
      el = document2.createElement("script");
      el.type = type;
      el.async = async;
      el.src = toValue(src);
      if (defer)
        el.defer = defer;
      if (crossOrigin)
        el.crossOrigin = crossOrigin;
      if (noModule)
        el.noModule = noModule;
      if (referrerPolicy)
        el.referrerPolicy = referrerPolicy;
      Object.entries(attrs).forEach(([name, value]) => el == null ? void 0 : el.setAttribute(name, value));
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolveWithElement(el);
    }
    el.addEventListener("error", (event) => reject(event));
    el.addEventListener("abort", (event) => reject(event));
    el.addEventListener("load", () => {
      el.setAttribute("data-loaded", "true");
      onLoaded(el);
      resolveWithElement(el);
    });
    if (shouldAppend)
      el = document2.head.appendChild(el);
    if (!waitForScriptLoad)
      resolveWithElement(el);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise)
      _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document2)
      return;
    _promise = null;
    if (scriptTag.value)
      scriptTag.value = null;
    const el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (el)
      document2.head.removeChild(el);
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnUnmounted(unload);
  return { scriptTag, load, unload };
}
var _id = 0;
function useStyleTag(css, options2 = {}) {
  const isLoaded = ref(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options2;
  const cssRef = ref(css);
  let stop = () => {
  };
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    if (!el.isConnected) {
      el.type = "text/css";
      el.id = id;
      if (options2.media)
        el.media = options2.media;
      document2.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop = watch(
      cssRef,
      (value) => {
        el.textContent = value;
      },
      { immediate: true }
    );
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// ../node_modules/.pnpm/autosize@6.0.1/node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s), t4.removeEventListener("input", i), window.removeEventListener("resize", s), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }.bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s), t4.addEventListener("input", i), window.addEventListener("resize", s), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s }), s();
      }
      function a(e2) {
        var o4, i2, l2 = e2.restoreTextAlign, s2 = void 0 === l2 ? null : l2, d = e2.testForHeightReduction, u = void 0 === d || d, c = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u && (o4 = function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; )
            e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i2 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i2 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i2 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s2 && (t4.style.textAlign = s2), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c !== n2.overflow && !s2)) {
          var v = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v ? "end" : "start"), a({ restoreTextAlign: v, testForHeightReduction: true });
        }
      }
      function s() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// ../node_modules/.pnpm/marked@4.3.0/node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
var defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e2) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
var noopTest = { exec: function noopTest2() {
} };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (!list.loose) {
          const spacers = list.items[i].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
          list.loose = hasMultipleLineBreaks;
        }
      }
      if (list.loose) {
        for (i = 0; i < l; i++) {
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.type = "paragraph";
        token.text = text;
        token.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
      return {
        type: "def",
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return { text: c };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = { ...block };
block.gfm = {
  ...block.normal,
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
};
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = {
  ...block.normal,
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = { ...inline };
inline.pedantic = {
  ...inline.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
};
inline.gfm = {
  ...inline.normal,
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = {
  ...inline.gfm,
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
function smartypants(text) {
  return text.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer = class {
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  /**
   * Lexing
   */
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var Renderer = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  /**
   * @param {string} quote
   */
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html) {
    return html;
  }
  /**
   * @param {string} text
   * @param {string} level
   * @param {string} raw
   * @param {any} slugger
   */
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  /**
   * @param {string} text
   */
  listitem(text) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  /**
   * @param {string} text
   */
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  /**
   * @param {string} header
   * @param {string} body
   */
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  /**
   * @param {string} content
   */
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  /**
   * span level renderer
   * @param {string} text
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  /**
   * @param {string} text
   */
  em(text) {
    return `<em>${text}</em>`;
  }
  /**
   * @param {string} text
   */
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  /**
   * @param {string} text
   */
  del(text) {
    return `<del>${text}</del>`;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger = class {
  constructor() {
    this.seen = {};
  }
  /**
   * @param {string} value
   */
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  /**
   * Finds the next safe (unique) slug to use
   * @param {string} originalSlug
   * @param {boolean} isDryRun
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  /**
   * Convert string to unique id
   * @param {object} [options]
   * @param {boolean} [options.dryrun] Generates the next unique slug without
   * updating the internal accumulator.
   */
  slug(value, options2 = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options2.dryrun);
  }
};
var Parser = class {
  constructor(options2) {
    this.options = options2 || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger
          );
          continue;
        }
        case "code": {
          out += this.renderer.code(
            token.text,
            token.lang,
            token.escaped
          );
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var Hooks = class {
  constructor(options2) {
    this.options = options2 || defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html) {
    return html;
  }
};
__publicField(Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
function onError(silent, async, callback) {
  return (e2) => {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e2);
    }
    if (callback) {
      callback(e2);
      return;
    }
    throw e2;
  };
}
function parseMarkdown(lexer2, parser2) {
  return (src, opt, callback) => {
    if (typeof opt === "function") {
      callback = opt;
      opt = null;
    }
    const origOpt = { ...opt };
    opt = { ...marked.defaults, ...origOpt };
    const throwError = onError(opt.silent, opt.async, callback);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    checkSanitizeDeprecation(opt);
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (callback) {
      const highlight = opt.highlight;
      let tokens;
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer2(src, opt);
      } catch (e2) {
        return throwError(e2);
      }
      const done = function(err) {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = parser2(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e2) {
            err = e2;
          }
        }
        opt.highlight = highlight;
        return err ? throwError(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer2(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser2(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e2) {
      return throwError(e2);
    }
  };
}
function marked(src, opt, callback) {
  return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
}
marked.options = marked.setOptions = function(opt) {
  marked.defaults = { ...marked.defaults, ...opt };
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  args.forEach((pack) => {
    const opts = { ...pack };
    opts.async = marked.defaults.async || opts.async || false;
    if (pack.extensions) {
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers[ext.name];
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.hooks) {
      const hooks = marked.defaults.hooks || new Hooks();
      for (const prop in pack.hooks) {
        const prevHook = hooks[prop];
        if (Hooks.passThroughHooks.has(prop)) {
          hooks[prop] = (arg) => {
            if (marked.defaults.async) {
              return Promise.resolve(pack.hooks[prop].call(hooks, arg)).then((ret2) => {
                return prevHook.call(hooks, ret2);
              });
            }
            const ret = pack.hooks[prop].call(hooks, arg);
            return prevHook.call(hooks, ret);
          };
        } else {
          hooks[prop] = (...args2) => {
            let ret = pack.hooks[prop].apply(hooks, args2);
            if (ret === false) {
              ret = prevHook.apply(hooks, args2);
            }
            return ret;
          };
        }
      }
      opts.hooks = hooks;
    }
    if (pack.walkTokens) {
      const walkTokens2 = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens2) {
          values = values.concat(walkTokens2.call(this, token));
        }
        return values;
      };
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case "list": {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};
marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.Hooks = Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = Parser.parse;
var lexer = Lexer.lex;

// ../node_modules/.pnpm/@waline+client@2.15.5-alpha.0/node_modules/@waline/client/dist/shim.mjs
var V = ["nick", "mail", "link"];
var D = (e2) => e2.filter((e3) => V.includes(e3));
var N = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var B = "en-US";
var W = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var F = (e2) => new Promise((t2, n2) => {
  if (e2.size > 128e3)
    return n2(new Error("File too large! File size limit 128KB"));
  const a = new FileReader();
  a.readAsDataURL(e2), a.onload = () => {
    var _a;
    return t2(((_a = a.result) == null ? void 0 : _a.toString()) || "");
  }, a.onerror = n2;
});
var K = (e2) => true === e2 ? '<p class="wl-tex">Tex is not available in preview</p>' : '<span class="wl-tex">Tex is not available in preview</span>';
var q = (e2) => {
  const t2 = async (t3, n2 = {}) => fetch(`https://api.giphy.com/v1/gifs/${t3}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...n2 }).toString()}`).then((e3) => e3.json()).then(({ data: e3 }) => e3.map((e4) => ({ title: e4.title, src: e4.images.downsized_medium.url })));
  return { search: (e3) => t2("search", { q: e3, offset: "0" }), default: () => t2("trending", {}), more: (e3, n2 = 0) => t2("search", { q: e3, offset: n2.toString() }) };
};
var G = new RegExp(`(${/[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/.source}|${/</.source})|((?:${/(?:^|\s)\/\/(.+?)$/gm.source})|(?:${/\/\*([\S\s]*?)\*\//gm.source}))`, "gmi");
var Z = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var J = {};
var Y = (e2) => {
  let t2 = 0;
  return e2.replace(G, (e3, n2, a) => {
    if (a)
      return `<span style="color: slategray">${a}</span>`;
    if ("<" === n2)
      return "&lt;";
    let l;
    J[n2] ? l = J[n2] : (l = Z[t2], J[n2] = l);
    const r2 = `<span style="color: #${l}">${n2}</span>`;
    return t2 = ++t2 % Z.length, r2;
  });
};
var X = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
var Q = (e2) => Object.fromEntries(e2.map((e3, t2) => [X[t2], e3]));
var ee = Q(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", "Please input comments between $0 and $1 words!\n Current word number: $2", "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
var te = Q(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", "コメントは $0 から $1 ワードの間でなければなりません!\n 現在の単語番号: $2", "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]);
var ne = Q(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", "Favor enviar comentário com $0 a $1 palavras!\n Número de palavras atuais: $2", "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]);
var ae = Q(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", "Пожалуйста, введите комментарии от $0 до $1 слов!\nНомер текущего слова: $2", "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
var le = Q(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", "评论字数应在 $0 到 $1 字之间！\n当前字数：$2", "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]);
var re = Q(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎評論", "來發評論吧~", "提交", "喜歡", "取消喜歡", "回覆", "取消回覆", "評論", "刷新", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登錄", "退出", "博主", "置頂", "字", "評論字數應在 $0 到 $1 字之間！\n當前字數：$2", "匿名", "潛水", "冒泡", "吐槽", "活躍", "話癆", "傳說", "表情包", "搜索表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "按倒序", "按正序", "按熱度", "你認為這篇文章怎麼樣？"]);
var ie = { zh: le, "zh-cn": le, "zh-CN": le, "zh-tw": re, "zh-TW": re, en: ee, "en-US": ee, "en-us": ee, jp: te, ja: te, "jp-jp": te, "jp-JP": te, "pt-br": ne, "pt-BR": ne, ru: ae, "ru-ru": ae, "ru-RU": ae };
var oe = { "Content-Type": "application/json" };
var se = (e2, t2 = "") => {
  if ("object" == typeof e2 && e2.errno)
    throw new TypeError(`${t2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var ce = ({ serverURL: e2, lang: t2, paths: n2, type: a, signal: l }) => fetch(`${e2}/article?path=${encodeURIComponent(n2.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${t2}`, { signal: l }).then((e3) => e3.json());
var ue = ({ serverURL: e2, lang: t2, path: n2, type: a, action: l }) => fetch(`${e2}/article?lang=${t2}`, { method: "POST", headers: oe, body: JSON.stringify({ path: n2, type: a, action: l }) }).then((e3) => e3.json());
var de = ({ serverURL: e2, lang: t2, token: n2, objectId: a, comment: l }) => fetch(`${e2}/comment/${a}?lang=${t2}`, { method: "PUT", headers: { ...oe, Authorization: `Bearer ${n2}` }, body: JSON.stringify(l) }).then((e3) => e3.json()).then((e3) => se(e3, "Update comment"));
var me = (e2) => {
  try {
    e2 = decodeURI(e2);
  } catch (e3) {
  }
  return e2;
};
var ve = (e2 = "") => e2.replace(/\/$/u, "");
var pe = (e2) => /^(https?:)?\/\//.test(e2);
var ge = (e2) => {
  const t2 = ve(e2);
  return pe(t2) ? t2 : `https://${t2}`;
};
var he = (e2) => Array.isArray(e2) ? e2 : !!e2 && [0, e2];
var fe = (e2, t2) => "function" == typeof e2 ? e2 : false !== e2 && t2;
var ye = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-bgcolor-hover: #444;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}";
var we = (e2, t2) => {
  let n2 = e2.toString();
  for (; n2.length < t2; )
    n2 = "0" + n2;
  return n2;
};
var be = (e2, t2, n2) => {
  if (!e2)
    return "";
  const a = "string" == typeof e2 ? new Date(-1 !== e2.indexOf(" ") ? e2.replace(/-/g, "/") : e2) : e2, l = t2.getTime() - a.getTime(), r2 = Math.floor(l / 864e5);
  if (0 === r2) {
    const e3 = l % 864e5, t3 = Math.floor(e3 / 36e5);
    if (0 === t3) {
      const t4 = e3 % 36e5, a2 = Math.floor(t4 / 6e4);
      if (0 === a2) {
        const e4 = t4 % 6e4;
        return `${Math.round(e4 / 1e3)} ${n2.seconds}`;
      }
      return `${a2} ${n2.minutes}`;
    }
    return `${t3} ${n2.hours}`;
  }
  return r2 < 0 ? n2.now : r2 < 8 ? `${r2} ${n2.days}` : ((e3) => {
    const t3 = we(e3.getDate(), 2), n3 = we(e3.getMonth() + 1, 2);
    return `${we(e3.getFullYear(), 2)}-${n3}-${t3}`;
  })(a);
};
var ke = (e2) => {
  const t2 = useStorage("WALINE_EMOJI", {}), n2 = Boolean(/@[0-9]+\.[0-9]+\.[0-9]+/.test(e2));
  if (n2) {
    const n3 = t2.value[e2];
    if (n3)
      return Promise.resolve(n3);
  }
  return fetch(`${e2}/info.json`).then((e3) => e3.json()).then((a) => {
    const l = { folder: e2, ...a };
    return n2 && (t2.value[e2] = l), l;
  });
};
var Ce = (e2, t2 = "", n2 = "", a = "") => `${t2 ? `${t2}/` : ""}${n2}${e2}${a ? `.${a}` : ""}`;
var $e = (e2) => {
  "AbortError" !== e2.name && console.error(e2.message);
};
var Le = (e2) => e2 instanceof HTMLElement ? e2 : "string" == typeof e2 ? document.querySelector(e2) : null;
var Re = (e2) => e2.type.includes("image");
var xe = (e2) => {
  const t2 = Array.from(e2).find(Re);
  return t2 ? t2.getAsFile() : null;
};
var Ee = /\$.*?\$/;
var Ie = /^\$(.*?)\$/;
var je = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var Se = (e2 = "", t2 = {}) => e2.replace(/:(.+?):/g, (e3, n2) => t2[n2] ? `<img class="wl-emoji" src="${t2[n2]}" alt="${n2}">` : e3);
var Ae = (e2, { emojiMap: t2, highlighter: n2, texRenderer: a }) => {
  if (marked.setOptions({ highlight: n2 || void 0, breaks: true, smartLists: true, smartypants: true }), a) {
    const e3 = ((e4) => [{ name: "blockMath", level: "block", tokenizer(t3) {
      const n3 = je.exec(t3);
      if (null !== n3)
        return { type: "html", raw: n3[0], text: e4(true, n3[1]) };
    } }, { name: "inlineMath", level: "inline", start(e5) {
      const t3 = e5.search(Ee);
      return -1 !== t3 ? t3 : e5.length;
    }, tokenizer(t3) {
      const n3 = Ie.exec(t3);
      if (null !== n3)
        return { type: "html", raw: n3[0], text: e4(false, n3[1]) };
    } }])(a);
    marked.use({ extensions: e3 });
  }
  return marked.parse(Se(e2, t2));
};
var Ue = (e2) => e2.dataset.path || e2.getAttribute("id");
var _e = ({ serverURL: e2, path: t2 = window.location.pathname, selector: n2 = ".waline-comment-count", lang: a = navigator.language }) => {
  const l = new AbortController(), r2 = document.querySelectorAll(n2);
  return r2.length && (({ serverURL: e3, lang: t3, paths: n3, signal: a2 }) => fetch(`${e3}/comment?type=count&url=${encodeURIComponent(n3.join(","))}&lang=${t3}`, { signal: a2 }).then((e4) => e4.json()).then((e4) => Array.isArray(e4) ? e4 : [e4]))({ serverURL: ge(e2), paths: Array.from(r2).map((e3) => me(e3.dataset.path || e3.getAttribute("id") || t2)), lang: a, signal: l.signal }).then((e3) => {
    r2.forEach((t3, n3) => {
      t3.innerText = e3[n3].toString();
    });
  }).catch($e), l.abort.bind(l);
};
var ze = ({ size: t2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: t2, height: t2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var Me = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var He = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var Te = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var Oe = ({ active: t2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z" + (t2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"), fill: t2 ? "red" : "currentColor" })]);
var Pe = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var Ve = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var De = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var Ne = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var Be = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var We = ({ size: t2 = 100 }) => h("svg", { width: t2, height: t2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Fe = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var Ke = null;
var qe = () => Ke || (Ke = useStorage("WALINE_LIKE", []));
var Ge = null;
var Ze = () => Ge ?? (Ge = useStorage("WALINE_REACTION", {}));
var Je = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var Ye = {};
var Xe = {};
var Qe = {};
var et = Je && Je.__awaiter || function(e2, t2, n2, a) {
  return new (n2 || (n2 = Promise))(function(l, r2) {
    function i(e3) {
      try {
        s(a.next(e3));
      } catch (e4) {
        r2(e4);
      }
    }
    function o2(e3) {
      try {
        s(a.throw(e3));
      } catch (e4) {
        r2(e4);
      }
    }
    function s(e3) {
      var t3;
      e3.done ? l(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2(function(e4) {
        e4(t3);
      })).then(i, o2);
    }
    s((a = a.apply(e2, t2 || [])).next());
  });
};
var tt = Je && Je.__generator || function(e2, t2) {
  var n2, a, l, r2, i = { label: 0, sent: function() {
    if (1 & l[0])
      throw l[1];
    return l[1];
  }, trys: [], ops: [] };
  return r2 = { next: o2(0), throw: o2(1), return: o2(2) }, "function" == typeof Symbol && (r2[Symbol.iterator] = function() {
    return this;
  }), r2;
  function o2(r3) {
    return function(o3) {
      return function(r4) {
        if (n2)
          throw new TypeError("Generator is already executing.");
        for (; i; )
          try {
            if (n2 = 1, a && (l = 2 & r4[0] ? a.return : r4[0] ? a.throw || ((l = a.return) && l.call(a), 0) : a.next) && !(l = l.call(a, r4[1])).done)
              return l;
            switch (a = 0, l && (r4 = [2 & r4[0], l.value]), r4[0]) {
              case 0:
              case 1:
                l = r4;
                break;
              case 4:
                return i.label++, { value: r4[1], done: false };
              case 5:
                i.label++, a = r4[1], r4 = [0];
                continue;
              case 7:
                r4 = i.ops.pop(), i.trys.pop();
                continue;
              default:
                if (!(l = i.trys, (l = l.length > 0 && l[l.length - 1]) || 6 !== r4[0] && 2 !== r4[0])) {
                  i = 0;
                  continue;
                }
                if (3 === r4[0] && (!l || r4[1] > l[0] && r4[1] < l[3])) {
                  i.label = r4[1];
                  break;
                }
                if (6 === r4[0] && i.label < l[1]) {
                  i.label = l[1], l = r4;
                  break;
                }
                if (l && i.label < l[2]) {
                  i.label = l[2], i.ops.push(r4);
                  break;
                }
                l[2] && i.ops.pop(), i.trys.pop();
                continue;
            }
            r4 = t2.call(e2, i);
          } catch (e3) {
            r4 = [6, e3], a = 0;
          } finally {
            n2 = l = 0;
          }
        if (5 & r4[0])
          throw r4[1];
        return { value: r4[0] ? r4[1] : void 0, done: true };
      }([r3, o3]);
    };
  }
};
Object.defineProperty(Qe, "__esModule", { value: true }), Qe.ReCaptchaInstance = void 0;
var nt = function() {
  function e2(e3, t2, n2) {
    this.siteKey = e3, this.recaptchaID = t2, this.recaptcha = n2, this.styleContainer = null;
  }
  return e2.prototype.execute = function(e3) {
    return et(this, void 0, void 0, function() {
      return tt(this, function(t2) {
        return [2, this.recaptcha.enterprise ? this.recaptcha.enterprise.execute(this.recaptchaID, { action: e3 }) : this.recaptcha.execute(this.recaptchaID, { action: e3 })];
      });
    });
  }, e2.prototype.getSiteKey = function() {
    return this.siteKey;
  }, e2.prototype.hideBadge = function() {
    null === this.styleContainer && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer));
  }, e2.prototype.showBadge = function() {
    null !== this.styleContainer && (document.head.removeChild(this.styleContainer), this.styleContainer = null);
  }, e2;
}();
Qe.ReCaptchaInstance = nt, Object.defineProperty(Xe, "__esModule", { value: true }), Xe.getInstance = Xe.load = void 0;
var at;
var lt = Qe;
!function(e2) {
  e2[e2.NOT_LOADED = 0] = "NOT_LOADED", e2[e2.LOADING = 1] = "LOADING", e2[e2.LOADED = 2] = "LOADED";
}(at || (at = {}));
var rt = function() {
  function e2() {
  }
  return e2.load = function(t2, n2) {
    if (void 0 === n2 && (n2 = {}), "undefined" == typeof document)
      return Promise.reject(new Error("This is a library for the browser!"));
    if (e2.getLoadingState() === at.LOADED)
      return e2.instance.getSiteKey() === t2 ? Promise.resolve(e2.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
    if (e2.getLoadingState() === at.LOADING)
      return t2 !== e2.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function(t3, n3) {
        e2.successfulLoadingConsumers.push(function(e3) {
          return t3(e3);
        }), e2.errorLoadingRunnable.push(function(e3) {
          return n3(e3);
        });
      });
    e2.instanceSiteKey = t2, e2.setLoadingState(at.LOADING);
    var a = new e2();
    return new Promise(function(l, r2) {
      a.loadScript(t2, n2.useRecaptchaNet || false, n2.useEnterprise || false, n2.renderParameters ? n2.renderParameters : {}, n2.customUrl).then(function() {
        e2.setLoadingState(at.LOADED);
        var r3 = a.doExplicitRender(grecaptcha, t2, n2.explicitRenderParameters ? n2.explicitRenderParameters : {}, n2.useEnterprise || false), i = new lt.ReCaptchaInstance(t2, r3, grecaptcha);
        e2.successfulLoadingConsumers.forEach(function(e3) {
          return e3(i);
        }), e2.successfulLoadingConsumers = [], n2.autoHideBadge && i.hideBadge(), e2.instance = i, l(i);
      }).catch(function(t3) {
        e2.errorLoadingRunnable.forEach(function(e3) {
          return e3(t3);
        }), e2.errorLoadingRunnable = [], r2(t3);
      });
    });
  }, e2.getInstance = function() {
    return e2.instance;
  }, e2.setLoadingState = function(t2) {
    e2.loadingState = t2;
  }, e2.getLoadingState = function() {
    return null === e2.loadingState ? at.NOT_LOADED : e2.loadingState;
  }, e2.prototype.loadScript = function(t2, n2, a, l, r2) {
    var i = this;
    void 0 === n2 && (n2 = false), void 0 === a && (a = false), void 0 === l && (l = {}), void 0 === r2 && (r2 = "");
    var o2 = document.createElement("script");
    o2.setAttribute("recaptcha-v3-script", "");
    var s = "https://www.google.com/recaptcha/api.js";
    n2 && (s = a ? "https://recaptcha.net/recaptcha/enterprise.js" : "https://recaptcha.net/recaptcha/api.js"), a && (s = "https://www.google.com/recaptcha/enterprise.js"), r2 && (s = r2), l.render && (l.render = void 0);
    var c = this.buildQueryString(l);
    return o2.src = s + "?render=explicit" + c, new Promise(function(t3, n3) {
      o2.addEventListener("load", i.waitForScriptToLoad(function() {
        t3(o2);
      }, a), false), o2.onerror = function(t4) {
        e2.setLoadingState(at.NOT_LOADED), n3(t4);
      }, document.head.appendChild(o2);
    });
  }, e2.prototype.buildQueryString = function(e3) {
    return Object.keys(e3).length < 1 ? "" : "&" + Object.keys(e3).filter(function(t2) {
      return !!e3[t2];
    }).map(function(t2) {
      return t2 + "=" + e3[t2];
    }).join("&");
  }, e2.prototype.waitForScriptToLoad = function(t2, n2) {
    var a = this;
    return function() {
      void 0 === window.grecaptcha ? setTimeout(function() {
        a.waitForScriptToLoad(t2, n2);
      }, e2.SCRIPT_LOAD_DELAY) : n2 ? window.grecaptcha.enterprise.ready(function() {
        t2();
      }) : window.grecaptcha.ready(function() {
        t2();
      });
    };
  }, e2.prototype.doExplicitRender = function(e3, t2, n2, a) {
    var l = { sitekey: t2, badge: n2.badge, size: n2.size, tabindex: n2.tabindex };
    return n2.container ? a ? e3.enterprise.render(n2.container, l) : e3.render(n2.container, l) : a ? e3.enterprise.render(l) : e3.render(l);
  }, e2.loadingState = null, e2.instance = null, e2.instanceSiteKey = null, e2.successfulLoadingConsumers = [], e2.errorLoadingRunnable = [], e2.SCRIPT_LOAD_DELAY = 25, e2;
}();
Xe.load = rt.load, Xe.getInstance = rt.getInstance, function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ReCaptchaInstance = e2.getInstance = e2.load = void 0;
  var t2 = Xe;
  Object.defineProperty(e2, "load", { enumerable: true, get: function() {
    return t2.load;
  } }), Object.defineProperty(e2, "getInstance", { enumerable: true, get: function() {
    return t2.getInstance;
  } });
  var n2 = Qe;
  Object.defineProperty(e2, "ReCaptchaInstance", { enumerable: true, get: function() {
    return n2.ReCaptchaInstance;
  } });
}(Ye);
var it = {};
var ot = null;
var st = () => ot ?? (ot = useStorage("WALINE_USER", {}));
var ct = { key: 0, class: "wl-reaction" };
var ut = ["textContent"];
var dt = { class: "wl-reaction-list" };
var mt = ["onClick"];
var vt = { class: "wl-reaction-img" };
var pt = ["src", "alt"];
var gt = ["textContent"];
var ht = ["textContent"];
var ft = defineComponent({ __name: "ArticleReaction", setup(e2, { expose: t2 }) {
  t2();
  const y = Ze(), w = inject("config"), b = ref(-1), k = ref([]), C = computed(() => w.value.locale), $ = computed(() => w.value.reaction.length > 0), L = computed(() => {
    const { reaction: e3, path: t3 } = w.value;
    return e3.map((e4, n2) => ({ icon: e4, desc: C.value[`reaction${n2}`], active: y.value[t3] === n2 }));
  });
  let R;
  return onMounted(() => {
    watch(() => [w.value.serverURL, w.value.path], () => {
      (async () => {
        if ($.value) {
          const { serverURL: e3, lang: t3, path: n2, reaction: a } = w.value, l = new AbortController();
          R = l.abort.bind(l);
          const r2 = await ce({ serverURL: e3, lang: t3, paths: [n2], type: a.map((e4, t4) => `reaction${t4}`), signal: l.signal });
          if (Array.isArray(r2) || "number" == typeof r2)
            return;
          k.value = a.map((e4, t4) => r2[`reaction${t4}`]);
        }
      })();
    }, { immediate: true });
  }), onUnmounted(() => R == null ? void 0 : R()), (e3, t3) => unref(L).length ? (openBlock(), createElementBlock("div", ct, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(unref(C).reactionTitle) }, null, 8, ut), createBaseVNode("ul", dt, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(L), ({ active: e4, icon: t4, desc: n2 }, a) => (openBlock(), createElementBlock("li", { key: a, class: normalizeClass(["wl-reaction-item", { active: e4 }]), onClick: (e5) => (async (e6) => {
    if (-1 === b.value) {
      const { serverURL: t5, lang: n3, path: a2 } = w.value, l = y.value[a2];
      b.value = e6, void 0 !== l && (await ue({ serverURL: t5, lang: n3, path: a2, type: `reaction${l}`, action: "desc" }), k.value[l] = Math.max(k.value[l] - 1, 0)), l !== e6 && (await ue({ serverURL: t5, lang: n3, path: a2, type: `reaction${e6}` }), k.value[e6] = (k.value[e6] || 0) + 1), l === e6 ? delete y.value[a2] : y.value[a2] = e6, b.value = -1;
    }
  })(a) }, [createBaseVNode("div", vt, [createBaseVNode("img", { src: t4, alt: n2 }, null, 8, pt), b.value === a ? (openBlock(), createBlock(unref(We), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(k.value[a] || 0) }, null, 8, gt))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(n2) }, null, 8, ht)], 10, mt))), 128))])])) : createCommentVNode("v-if", true);
} });
var yt = (e2, t2) => {
  const n2 = e2.__vccOpts || e2;
  for (const [e3, a] of t2)
    n2[e3] = a;
  return n2;
};
var wt = yt(ft, [["__file", "ArticleReaction.vue"]]);
var bt = ["data-index"];
var kt = ["src", "title", "onClick"];
var Ct = yt(defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2, { expose: t2 }) {
  const n2 = e2;
  t2();
  let l = null;
  const o2 = ref(null), m = ref({}), g = ref([]), k = () => {
    const e3 = Math.floor((o2.value.getBoundingClientRect().width + n2.gap) / (n2.columnWidth + n2.gap));
    return e3 > 0 ? e3 : 1;
  }, C = async (e3) => {
    var _a;
    if (e3 >= n2.items.length)
      return;
    await nextTick();
    const t3 = Array.from(((_a = o2.value) == null ? void 0 : _a.children) || []).reduce((e4, t4) => t4.getBoundingClientRect().height < e4.getBoundingClientRect().height ? t4 : e4);
    g.value[Number(t3.dataset.index)].push(e3), await C(e3 + 1);
  }, $ = async (e3 = false) => {
    if (g.value.length === k() && !e3)
      return;
    var t3;
    g.value = (t3 = k(), new Array(t3).fill(null).map(() => []));
    const n3 = window.scrollY;
    await C(0), window.scrollTo({ top: n3 });
  }, L = (e3) => {
    m.value[e3.target.src] = true;
  };
  return onMounted(() => {
    $(true), l = new ResizeObserver(() => {
      $();
    }), l.observe(o2.value), watch(() => [n2.items], () => {
      m.value = {}, $(true);
    }), watch(() => [n2.columnWidth, n2.gap], () => {
      $();
    });
  }), onBeforeUnmount(() => l.unobserve(o2.value)), (t3, n3) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: o2, class: "wl-gallery", style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (n4, a) => (openBlock(), createElementBlock("div", { key: a, class: "wl-gallery-column", "data-index": a, style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n4, (n5) => (openBlock(), createElementBlock(Fragment, { key: n5 }, [m.value[e2.items[n5].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(We), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: e2.items[n5].src, title: e2.items[n5].title, loading: "lazy", onLoad: L, onClick: (a2) => t3.$emit("insert", `![](${e2.items[n5].src})`) }, null, 40, kt)], 64))), 128))], 12, bt))), 128))], 4));
} }), [["__file", "ImageWall.vue"]]);
var $t = { class: "wl-comment" };
var Lt = { key: 0, class: "wl-login-info" };
var Rt = { class: "wl-avatar" };
var xt = ["title"];
var Et = ["title"];
var It = ["src"];
var jt = ["title", "textContent"];
var St = { class: "wl-panel" };
var At = ["for", "textContent"];
var Ut = ["id", "onUpdate:modelValue", "name", "type"];
var _t = ["placeholder"];
var zt = { class: "wl-preview" };
var Mt = createBaseVNode("hr", null, null, -1);
var Ht = ["innerHTML"];
var Tt = { class: "wl-footer" };
var Ot = { class: "wl-actions" };
var Pt = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var Vt = ["title"];
var Dt = ["title"];
var Nt = ["title"];
var Bt = ["title"];
var Wt = { class: "wl-info" };
var Ft = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1);
var Kt = { class: "wl-text-number" };
var qt = { key: 0 };
var Gt = ["textContent"];
var Zt = ["textContent"];
var Jt = ["disabled"];
var Yt = ["placeholder"];
var Xt = { key: 1, class: "wl-loading" };
var Qt = { key: 0, class: "wl-tab-wrapper" };
var en = ["title", "onClick"];
var tn = ["src", "alt"];
var nn = { key: 0, class: "wl-tabs" };
var an = ["onClick"];
var ln = ["src", "alt", "title"];
var rn = ["title"];
var on = defineComponent({ __name: "CommentBox", props: { edit: { default: null }, rootId: { default: "" }, replyId: { default: "" }, replyUser: { default: "" } }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { expose: t2, emit: y }) {
  const w = e2;
  t2();
  const b = inject("config"), j = useStorage("WALINE_COMMENT_BOX_EDITOR", ""), S = useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" }), A = st(), U = ref({}), H = ref(null), T = ref(null), P = ref(null), V2 = ref(null), D2 = ref(null), N2 = ref(null), B2 = ref(null), W2 = ref({ tabs: [], map: {} }), F2 = ref(0), K2 = ref(false), q2 = ref(false), G2 = ref(false), Z2 = ref(""), J2 = ref(0), Y2 = reactive({ loading: true, list: [] }), X2 = ref(0), Q2 = ref(false), ee2 = ref(""), te2 = ref(false), ne2 = ref(false), ae2 = computed(() => b.value.locale), le2 = computed(() => {
    var _a;
    return Boolean((_a = A.value) == null ? void 0 : _a.token);
  }), re2 = computed(() => false !== b.value.imageUploader), ie2 = (e3) => {
    const t3 = H.value, n2 = t3.selectionStart, a = t3.selectionEnd || 0, l = t3.scrollTop;
    j.value = t3.value.substring(0, n2) + e3 + t3.value.substring(a, t3.value.length), t3.focus(), t3.selectionStart = n2 + e3.length, t3.selectionEnd = n2 + e3.length, t3.scrollTop = l;
  }, oe2 = (e3) => {
    const t3 = e3.key;
    (e3.ctrlKey || e3.metaKey) && "Enter" === t3 && pe2();
  }, se2 = (e3) => {
    const t3 = `![${b.value.locale.uploading} ${e3.name}]()`;
    return ie2(t3), Promise.resolve().then(() => b.value.imageUploader(e3)).then((n2) => {
      j.value = j.value.replace(t3, `\r
![${e3.name}](${n2})`);
    }).catch((e4) => {
      alert(e4.message), j.value = j.value.replace(t3, "");
    });
  }, ce2 = (e3) => {
    var _a;
    if ((_a = e3.dataTransfer) == null ? void 0 : _a.items) {
      const t3 = xe(e3.dataTransfer.items);
      t3 && re2.value && (se2(t3), e3.preventDefault());
    }
  }, ue2 = (e3) => {
    if (e3.clipboardData) {
      const t3 = xe(e3.clipboardData.items);
      t3 && re2.value && se2(t3);
    }
  }, me2 = () => {
    const e3 = T.value;
    e3.files && re2.value && se2(e3.files[0]).then(() => {
      e3.value = "";
    });
  }, pe2 = async () => {
    var _a, _b, _c, _d, _e2, _f;
    const { serverURL: e3, lang: t3, login: n2, wordLimit: a, requiredMeta: l, recaptchaV3Key: r2, turnstileKey: i } = b.value, o2 = await (async () => {
      if (!navigator)
        return "";
      const { userAgentData: e4 } = navigator;
      let t4 = navigator.userAgent;
      if (!e4 || "Windows" !== e4.platform)
        return t4;
      const { platformVersion: n3 } = await e4.getHighEntropyValues(["platformVersion"]);
      return n3 ? (parseInt(n3.split(".")[0]) >= 13 && (t4 = t4.replace("Windows NT 10.0", "Windows NT 11.0")), t4) : t4;
    })(), s = { comment: ee2.value, nick: S.value.nick, mail: S.value.mail, link: S.value.link, url: b.value.path, ua: o2 };
    if ((_a = A.value) == null ? void 0 : _a.token)
      s.nick = A.value.display_name, s.mail = A.value.email, s.link = A.value.url;
    else {
      if ("force" === n2)
        return;
      if (l.indexOf("nick") > -1 && !s.nick)
        return (_b = U.value.nick) == null ? void 0 : _b.focus(), alert(ae2.value.nickError);
      if (l.indexOf("mail") > -1 && !s.mail || s.mail && !/^\w(?:[\w._-]*\w)?@(?:\w(?:[\w-]*\w)?\.)*\w+$/.exec(s.mail))
        return (_c = U.value.mail) == null ? void 0 : _c.focus(), alert(ae2.value.mailError);
      s.nick || (s.nick = ae2.value.anonymous);
    }
    if (s.comment) {
      if (!Q2.value)
        return alert(ae2.value.wordHint.replace("$0", a[0].toString()).replace("$1", a[1].toString()).replace("$2", J2.value.toString()));
      s.comment = Se(s.comment, W2.value.map), w.replyId && w.rootId && (s.pid = w.replyId, s.rid = w.rootId, s.at = w.replyUser), te2.value = true;
      try {
        r2 && (s.recaptchaV3 = await ((e4) => {
          const t4 = it[e4] ?? (it[e4] = Ye.load(e4, { useRecaptchaNet: true, autoHideBadge: true }));
          return { execute: (e5) => t4.then((t5) => t5.execute(e5)) };
        })(r2).execute("social")), i && (s.turnstile = await (c = i, { execute: (e4) => new Promise((t4) => {
          useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", () => {
            const n4 = window == null ? void 0 : window.turnstile, a3 = { sitekey: c, action: e4, size: "compact", callback(e5) {
              t4(e5);
            } };
            n4 == null ? void 0 : n4.ready(() => n4 == null ? void 0 : n4.render(".wl-captcha-container", a3));
          }, { async: false });
        }) }).execute("social"));
        const n3 = { serverURL: e3, lang: t3, token: (_d = A.value) == null ? void 0 : _d.token, comment: s }, a2 = await (w.edit ? de({ objectId: w.edit.objectId, ...n3 }) : (({ serverURL: e4, lang: t4, token: n4, comment: a3 }) => {
          const l2 = { "Content-Type": "application/json" };
          return n4 && (l2.Authorization = `Bearer ${n4}`), fetch(`${e4}/comment?lang=${t4}`, { method: "POST", headers: l2, body: JSON.stringify(a3) }).then((e5) => e5.json());
        })(n3));
        if (te2.value = false, a2.errmsg)
          return alert(a2.errmsg);
        y("submit", a2.data), j.value = "", Z2.value = "", w.replyId && y("cancelReply"), ((_e2 = w.edit) == null ? void 0 : _e2.objectId) && y("cancelEdit");
      } catch (e4) {
        te2.value = false, alert(e4.message);
      }
      var c;
    } else
      (_f = H.value) == null ? void 0 : _f.focus();
  }, ge2 = (e3) => {
    e3.preventDefault();
    const { lang: t3, serverURL: n2 } = b.value;
    (({ lang: e4, serverURL: t4 }) => {
      const n3 = (window.innerWidth - 450) / 2, a = (window.innerHeight - 450) / 2, l = window.open(`${t4}/ui/login?lng=${encodeURIComponent(e4)}`, "_blank", `width=450,height=450,left=${n3},top=${a},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
      return l == null ? void 0 : l.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((e5) => {
        const t5 = ({ data: n4 }) => {
          n4 && "object" == typeof n4 && "userInfo" === n4.type && n4.data.token && (l == null ? void 0 : l.close(), window.removeEventListener("message", t5), e5(n4.data));
        };
        window.addEventListener("message", t5);
      });
    })({ serverURL: n2, lang: t3 }).then((e4) => {
      A.value = e4, (e4.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(e4)), y("log");
    });
  }, he2 = () => {
    A.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), y("log");
  }, fe2 = (e3) => {
    e3.preventDefault();
    const { lang: t3, serverURL: n2 } = b.value, a = (window.innerWidth - 800) / 2, l = (window.innerHeight - 800) / 2, r2 = new URLSearchParams({ lng: t3, token: A.value.token }), i = window.open(`${n2}/ui/profile?${r2.toString()}`, "_blank", `width=800,height=800,left=${a},top=${l},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    i == null ? void 0 : i.postMessage({ type: "TOKEN", data: A.value.token }, "*");
  }, ye2 = (e3) => {
    var _a, _b, _c, _d;
    ((_a = P.value) == null ? void 0 : _a.contains(e3.target)) || ((_b = V2.value) == null ? void 0 : _b.contains(e3.target)) || (K2.value = false), ((_c = D2.value) == null ? void 0 : _c.contains(e3.target)) || ((_d = N2.value) == null ? void 0 : _d.contains(e3.target)) || (q2.value = false);
  }, we2 = async (e3) => {
    var _a;
    const { scrollTop: t3, clientHeight: n2, scrollHeight: a } = e3.target, l = (n2 + t3) / a, r2 = b.value.search, i = ((_a = B2.value) == null ? void 0 : _a.value) || "";
    if (l < 0.9 || Y2.loading || ne2.value)
      return;
    Y2.loading = true;
    (r2.more && Y2.list.length ? await r2.more(i, Y2.list.length) : await r2.search(i)).length ? Y2.list = [...Y2.list, ...r2.more && Y2.list.length ? await r2.more(i, Y2.list.length) : await r2.search(i)] : ne2.value = true, Y2.loading = false, setTimeout(() => {
      e3.target.scrollTop = t3;
    }, 50);
  }, be2 = useDebounceFn((e3) => {
    Y2.list = [], ne2.value = false, we2(e3);
  }, 300);
  watch([b, J2], ([e3, t3]) => {
    const { wordLimit: n2 } = e3;
    n2 ? t3 < n2[0] && 0 !== n2[0] ? (X2.value = n2[0], Q2.value = false) : t3 > n2[1] ? (X2.value = n2[1], Q2.value = false) : (X2.value = n2[1], Q2.value = true) : (X2.value = 0, Q2.value = true);
  }, { immediate: true });
  const $e2 = ({ data: e3 }) => {
    e3 && "profile" === e3.type && (A.value = { ...A.value, ...e3.data }, [localStorage, sessionStorage].filter((e4) => e4.getItem("WALINE_USER")).forEach((e4) => e4.setItem("WALINE_USER", JSON.stringify(A))));
  };
  return onMounted(() => {
    var _a;
    document.body.addEventListener("click", ye2), window.addEventListener("message", $e2), ((_a = w.edit) == null ? void 0 : _a.objectId) && (j.value = w.edit.orig), watch(q2, async (e3) => {
      if (!e3)
        return;
      const t3 = b.value.search;
      B2.value && (B2.value.value = ""), Y2.loading = true, Y2.list = t3.default ? await t3.default() : await t3.search(""), Y2.loading = false;
    }), watch(() => j.value, (e3) => {
      const { highlighter: t3, texRenderer: n2 } = b.value;
      ee2.value = e3, Z2.value = Ae(e3, { emojiMap: W2.value.map, highlighter: t3, texRenderer: n2 }), J2.value = ((e4) => {
        var _a2, _b;
        return (((_a2 = ((e5) => e5.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu))(e4)) == null ? void 0 : _a2.reduce((e5, t4) => e5 + ("" === t4.trim() ? 0 : t4.trim().split(/\s+/u).length), 0)) || 0) + (((_b = ((e5) => e5.match(/[\u4E00-\u9FD5]/gu))(e4)) == null ? void 0 : _b.length) || 0);
      })(e3), e3 ? autosize_esm_default(H.value) : autosize_esm_default.destroy(H.value);
    }, { immediate: true }), watch(() => b.value.emoji, (e3) => {
      return (t3 = e3, Promise.all(t3.map((e4) => "string" == typeof e4 ? ke(ve(e4)) : Promise.resolve(e4))).then((e4) => {
        const t4 = { tabs: [], map: {} };
        return e4.forEach((e5) => {
          const { name: n2, folder: a, icon: l, prefix: r2, type: i, items: o2 } = e5;
          t4.tabs.push({ name: n2, icon: Ce(l, a, r2, i), items: o2.map((e6) => {
            const n3 = `${r2 || ""}${e6}`;
            return t4.map[n3] = Ce(e6, a, r2, i), n3;
          }) });
        }), t4;
      })).then((e4) => {
        W2.value = e4;
      });
      var t3;
    }, { immediate: true });
  }), onUnmounted(() => {
    document.body.removeEventListener("click", ye2), window.removeEventListener("message", $e2);
  }), (t3, n2) => {
    var _a, _b;
    return openBlock(), createElementBlock("div", $t, ["disable" !== unref(b).login && unref(le2) && !((_a = e2.edit) == null ? void 0 : _a.objectId) ? (openBlock(), createElementBlock("div", Lt, [createBaseVNode("div", Rt, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: unref(ae2).logout, onClick: he2 }, [createVNode(unref(ze), { size: 14 })], 8, xt), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: unref(ae2).profile, onClick: fe2 }, [createBaseVNode("img", { src: unref(A).avatar, alt: "avatar" }, null, 8, It)], 8, Et)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: unref(ae2).profile, onClick: fe2, textContent: toDisplayString(unref(A).display_name) }, null, 8, jt)])) : createCommentVNode("v-if", true), createBaseVNode("div", St, ["force" !== unref(b).login && unref(b).meta.length && !unref(le2) ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(b).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(b).meta, (e3) => (openBlock(), createElementBlock("div", { key: e3, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${e3}`, textContent: toDisplayString(unref(ae2)[e3] + (unref(b).requiredMeta.includes(e3) || !unref(b).requiredMeta.length ? "" : `(${unref(ae2).optional})`)) }, null, 8, At), withDirectives(createBaseVNode("input", { id: `wl-${e3}`, ref_for: true, ref: (t4) => {
      t4 && (U.value[e3] = t4);
    }, "onUpdate:modelValue": (t4) => unref(S)[e3] = t4, class: normalizeClass(["wl-input", `wl-${e3}`]), name: e3, type: "mail" === e3 ? "email" : "text" }, null, 10, Ut), [[vModelDynamic, unref(S)[e3]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref_key: "editorRef", ref: H, "onUpdate:modelValue": n2[0] || (n2[0] = (e3) => isRef(j) ? j.value = e3 : null), class: "wl-editor", placeholder: e2.replyUser ? `@${e2.replyUser}` : unref(ae2).placeholder, onKeydown: oe2, onDrop: ce2, onPaste: ue2 }, null, 40, _t), [[vModelText, unref(j)]]), withDirectives(createBaseVNode("div", zt, [Mt, createBaseVNode("h4", null, toDisplayString(unref(ae2).preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: Z2.value }, null, 8, Ht)], 512), [[vShow, G2.value]]), createBaseVNode("div", Tt, [createBaseVNode("div", Ot, [createBaseVNode("a", Pt, [createVNode(unref(Ve))]), withDirectives(createBaseVNode("button", { ref_key: "emojiButtonRef", ref: P, type: "button", class: normalizeClass(["wl-action", { active: K2.value }]), title: unref(ae2).emoji, onClick: n2[1] || (n2[1] = (e3) => K2.value = !K2.value) }, [createVNode(unref(He))], 10, Vt), [[vShow, W2.value.tabs.length]]), unref(b).search ? (openBlock(), createElementBlock("button", { key: 0, ref_key: "gifButtonRef", ref: D2, type: "button", class: normalizeClass(["wl-action", { active: q2.value }]), title: unref(ae2).gif, onClick: n2[2] || (n2[2] = (e3) => q2.value = !q2.value) }, [createVNode(unref(Fe))], 10, Dt)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref_key: "imageUploadRef", ref: T, class: "upload", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: me2 }, null, 544), unref(re2) ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: unref(ae2).uploadImage }, [createVNode(unref(Te))], 8, Nt)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: G2.value }]), title: unref(ae2).preview, onClick: n2[3] || (n2[3] = (e3) => G2.value = !G2.value) }, [createVNode(unref(Pe))], 10, Bt)]), createBaseVNode("div", Wt, [Ft, createBaseVNode("div", Kt, [createTextVNode(toDisplayString(J2.value) + " ", 1), unref(b).wordLimit ? (openBlock(), createElementBlock("span", qt, [createTextVNode("  /  "), createBaseVNode("span", { class: normalizeClass({ illegal: !Q2.value }), textContent: toDisplayString(X2.value) }, null, 10, Gt)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(unref(ae2).word), 1)]), "disable" === unref(b).login || unref(le2) ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: ge2, textContent: toDisplayString(unref(ae2).login) }, null, 8, Zt)), "force" !== unref(b).login || unref(le2) ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: te2.value, onClick: pe2 }, [te2.value ? (openBlock(), createBlock(unref(We), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(unref(ae2).submit), 1)], 64))], 8, Jt)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref_key: "gifPopupRef", ref: N2, class: normalizeClass(["wl-gif-popup", { display: q2.value }]) }, [createBaseVNode("input", { ref_key: "gifSearchInputRef", ref: B2, type: "text", placeholder: unref(ae2).gifSearchPlaceholder, onInput: n2[4] || (n2[4] = (...e3) => unref(be2) && unref(be2)(...e3)) }, null, 40, Yt), Y2.list.length ? (openBlock(), createBlock(Ct, { key: 0, items: Y2.list, "column-width": 200, gap: 6, onInsert: n2[5] || (n2[5] = (e3) => ie2(e3)), onScroll: we2 }, null, 8, ["items"])) : createCommentVNode("v-if", true), Y2.loading ? (openBlock(), createElementBlock("div", Xt, [createVNode(unref(We), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref_key: "emojiPopupRef", ref: V2, class: normalizeClass(["wl-emoji-popup", { display: K2.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(W2.value.tabs, (e3, t4) => (openBlock(), createElementBlock(Fragment, { key: e3.name }, [t4 === F2.value ? (openBlock(), createElementBlock("div", Qt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.items, (e4) => (openBlock(), createElementBlock("button", { key: e4, type: "button", title: e4, onClick: (t5) => ie2(`:${e4}:`) }, [K2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: W2.value.map[e4], alt: e4, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, tn)) : createCommentVNode("v-if", true)], 8, en))), 128))])) : createCommentVNode("v-if", true)], 64))), 128)), W2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", nn, [(openBlock(true), createElementBlock(Fragment, null, renderList(W2.value.tabs, (e3, t4) => (openBlock(), createElementBlock("button", { key: e3.name, type: "button", class: normalizeClass(["wl-tab", { active: F2.value === t4 }]), onClick: (e4) => F2.value = t4 }, [createBaseVNode("img", { class: "wl-emoji", src: e3.icon, alt: e3.name, title: e3.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, ln)], 10, an))), 128))])) : createCommentVNode("v-if", true)], 2)])]), e2.replyId || ((_b = e2.edit) == null ? void 0 : _b.objectId) ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: unref(ae2).cancelReply, onClick: n2[6] || (n2[6] = (n3) => t3.$emit(e2.replyId ? "cancelReply" : "cancelEdit")) }, [createVNode(unref(ze), { size: 24 })], 8, rn)) : createCommentVNode("v-if", true)]);
  };
} });
var sn = yt(on, [["__file", "CommentBox.vue"]]);
var cn = ["id"];
var un = { class: "wl-user", "aria-hidden": "true" };
var dn = ["src"];
var mn = { class: "wl-card" };
var vn = { class: "wl-head" };
var pn = ["href"];
var gn = { key: 1, class: "wl-nick" };
var hn = ["textContent"];
var fn = ["textContent"];
var yn = ["textContent"];
var wn = ["textContent"];
var bn = ["textContent"];
var kn = { class: "wl-comment-actions" };
var Cn = ["title"];
var $n = ["textContent"];
var Ln = ["title"];
var Rn = { class: "wl-meta", "aria-hidden": "true" };
var xn = ["data-value", "textContent"];
var En = ["data-value", "textContent"];
var In = ["data-value", "textContent"];
var jn = ["innerHTML"];
var Sn = { key: 1, class: "wl-admin-actions" };
var An = { class: "wl-comment-status" };
var Un = ["disabled", "onClick", "textContent"];
var _n = { key: 3, class: "wl-quote" };
var zn = yt(defineComponent({ __name: "CommentCard", props: { comment: null, edit: { default: null }, rootId: null, reply: { default: null } }, emits: ["log", "submit", "delete", "edit", "like", "status", "sticky", "reply"], setup(e2) {
  const t2 = e2, a = ["approved", "waiting", "spam"], r2 = inject("config"), i = qe(), o2 = useNow(), y = st(), w = computed(() => r2.value.locale), b = computed(() => {
    const { link: e3 } = t2.comment;
    return e3 ? pe(e3) ? e3 : `https://${e3}` : "";
  }), k = computed(() => i.value.includes(t2.comment.objectId)), $ = computed(() => be(t2.comment.insertedAt, o2.value, w.value)), L = computed(() => "administrator" === y.value.type), R = computed(() => t2.comment.user_id && y.value.objectId === t2.comment.user_id), x = computed(() => {
    var _a;
    return t2.comment.objectId === ((_a = t2.reply) == null ? void 0 : _a.objectId);
  }), E = computed(() => {
    var _a;
    return t2.comment.objectId === ((_a = t2.edit) == null ? void 0 : _a.objectId);
  });
  return (t3, n2) => {
    var _a;
    const l = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: e2.comment.objectId, class: "wl-card-item" }, [createBaseVNode("div", un, [e2.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, src: e2.comment.avatar }, null, 8, dn)) : createCommentVNode("v-if", true), e2.comment.type ? (openBlock(), createBlock(unref(Be), { key: 1 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", mn, [createBaseVNode("div", vn, [unref(b) ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: unref(b), target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(e2.comment.nick), 9, pn)) : (openBlock(), createElementBlock("span", gn, toDisplayString(e2.comment.nick), 1)), "administrator" === e2.comment.type ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(unref(w).admin) }, null, 8, hn)) : createCommentVNode("v-if", true), e2.comment.label ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(e2.comment.label) }, null, 8, fn)) : createCommentVNode("v-if", true), e2.comment.sticky ? (openBlock(), createElementBlock("span", { key: 4, class: "wl-badge", textContent: toDisplayString(unref(w).sticky) }, null, 8, yn)) : createCommentVNode("v-if", true), void 0 !== e2.comment.level && e2.comment.level >= 0 ? (openBlock(), createElementBlock("span", { key: 5, class: normalizeClass(`wl-badge level${e2.comment.level}`), textContent: toDisplayString(unref(w)[`level${e2.comment.level}`] || `Level ${e2.comment.level}`) }, null, 10, wn)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString(unref($)) }, null, 8, bn), createBaseVNode("div", kn, [unref(L) || unref(R) ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-edit", onClick: n2[0] || (n2[0] = () => t3.$emit("edit", e2.comment)) }, [createVNode(unref(Ne))])) : createCommentVNode("v-if", true), unref(L) || unref(R) ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-delete", onClick: n2[1] || (n2[1] = (n3) => t3.$emit("delete", e2.comment)) }, [createVNode(unref(Me))])) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: unref(k) ? unref(w).cancelLike : unref(w).like, onClick: n2[2] || (n2[2] = (n3) => t3.$emit("like", e2.comment)) }, [createVNode(unref(Oe), { active: unref(k) }, null, 8, ["active"]), "like" in e2.comment ? (openBlock(), createElementBlock("span", { key: 0, textContent: toDisplayString(e2.comment.like) }, null, 8, $n)) : createCommentVNode("v-if", true)], 8, Cn), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: unref(x) }]), title: unref(x) ? unref(w).cancelReply : unref(w).reply, onClick: n2[3] || (n2[3] = (n3) => t3.$emit("reply", unref(x) ? null : e2.comment)) }, [createVNode(unref(De))], 10, Ln)])]), createBaseVNode("div", Rn, [e2.comment.addr ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-addr", "data-value": e2.comment.addr, textContent: toDisplayString(e2.comment.addr) }, null, 8, xn)) : createCommentVNode("v-if", true), e2.comment.browser ? (openBlock(), createElementBlock("span", { key: 1, class: "wl-browser", "data-value": e2.comment.browser, textContent: toDisplayString(e2.comment.browser) }, null, 8, En)) : createCommentVNode("v-if", true), e2.comment.os ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-os", "data-value": e2.comment.os, textContent: toDisplayString(e2.comment.os) }, null, 8, In)) : createCommentVNode("v-if", true)]), unref(E) ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 0, class: "wl-content", innerHTML: e2.comment.comment }, null, 8, jn)), unref(L) && !unref(E) ? (openBlock(), createElementBlock("div", Sn, [createBaseVNode("span", An, [(openBlock(), createElementBlock(Fragment, null, renderList(a, (n3) => createBaseVNode("button", { key: n3, type: "submit", class: normalizeClass(`wl-btn wl-${n3}`), disabled: e2.comment.status === n3, onClick: (a2) => t3.$emit("status", { status: n3, comment: e2.comment }), textContent: toDisplayString(unref(w)[n3]) }, null, 10, Un)), 64))]), unref(L) && !e2.comment.rid ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: n2[4] || (n2[4] = (n3) => t3.$emit("sticky", e2.comment)) }, toDisplayString(e2.comment.sticky ? unref(w).unsticky : unref(w).sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), unref(x) || unref(E) ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass({ "wl-reply-wrapper": unref(x), "wl-edit-wrapper": unref(E) }) }, [createVNode(sn, { edit: e2.edit, "reply-id": (_a = e2.reply) == null ? void 0 : _a.objectId, "reply-user": e2.comment.nick, "root-id": e2.rootId, onLog: n2[5] || (n2[5] = (e3) => t3.$emit("log")), onCancelReply: n2[6] || (n2[6] = (e3) => t3.$emit("reply", null)), onCancelEdit: n2[7] || (n2[7] = (e3) => t3.$emit("edit", null)), onSubmit: n2[8] || (n2[8] = (e3) => t3.$emit("submit", e3)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), e2.comment.children ? (openBlock(), createElementBlock("div", _n, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.comment.children, (a2) => (openBlock(), createBlock(l, { key: a2.objectId, comment: a2, reply: e2.reply, edit: e2.edit, "root-id": e2.rootId, onLog: n2[9] || (n2[9] = (e3) => t3.$emit("log")), onDelete: n2[10] || (n2[10] = (e3) => t3.$emit("delete", e3)), onEdit: n2[11] || (n2[11] = (e3) => t3.$emit("edit", e3)), onLike: n2[12] || (n2[12] = (e3) => t3.$emit("like", e3)), onReply: n2[13] || (n2[13] = (e3) => t3.$emit("reply", e3)), onStatus: n2[14] || (n2[14] = (e3) => t3.$emit("status", e3)), onSticky: n2[15] || (n2[15] = (e3) => t3.$emit("sticky", e3)), onSubmit: n2[16] || (n2[16] = (e3) => t3.$emit("submit", e3)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, cn);
  };
} }), [["__file", "CommentCard.vue"]]);
var Mn = "2.15.5-alpha.0";
var Hn = { "data-waline": "" };
var Tn = { class: "wl-meta-head" };
var On = { class: "wl-count" };
var Pn = ["textContent"];
var Vn = { class: "wl-sort" };
var Dn = ["onClick"];
var Nn = { class: "wl-cards" };
var Bn = { key: 1, class: "wl-operation" };
var Wn = ["textContent"];
var Fn = { key: 0, class: "wl-loading" };
var Kn = ["textContent"];
var qn = { key: 2, class: "wl-operation" };
var Gn = ["textContent"];
var Zn = { key: 3, class: "wl-power" };
var Jn = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1);
var Yn = defineComponent({ __name: "WalineComment", props: ["serverURL", "path", "meta", "requiredMeta", "dark", "commentSorting", "lang", "locale", "pageSize", "wordLimit", "emoji", "login", "highlighter", "texRenderer", "imageUploader", "search", "copyright", "recaptchaV3Key", "turnstileKey", "reaction"], setup(e2) {
  const t2 = e2, n2 = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" }, y = Object.keys(n2), w = st(), b = qe(), k = ref("loading"), $ = ref(0), L = ref(1), R = ref(0), x = computed(() => (({ serverURL: e3, path: t3 = location.pathname, lang: n3 = "undefined" == typeof navigator ? "en-US" : navigator.language, locale: a, emoji: l = N, meta: r2 = ["nick", "mail", "link"], requiredMeta: i = [], dark: o2 = false, pageSize: s = 10, wordLimit: c, imageUploader: u, highlighter: d, texRenderer: m, copyright: v = true, login: p = "enable", search: g, reaction: h2, recaptchaV3Key: f = "", turnstileKey: y2 = "", commentSorting: w2 = "latest", ...b2 }) => ({ serverURL: ge(e3), path: me(t3), locale: { ...ie[n3] || ie[B], ..."object" == typeof a ? a : {} }, wordLimit: he(c), meta: D(r2), requiredMeta: D(i), imageUploader: fe(u, F), highlighter: fe(d, Y), texRenderer: fe(m, K), lang: Object.keys(ie).includes(n3) ? n3 : "en-US", dark: o2, emoji: "boolean" == typeof l ? l ? N : [] : l, pageSize: s, login: p, copyright: v, search: false !== g && ("object" == typeof g ? g : q(n3)), recaptchaV3Key: f, turnstileKey: y2, reaction: Array.isArray(h2) ? h2 : true === h2 ? W : [], commentSorting: w2, ...b2 }))(t2)), E = ref(x.value.commentSorting), j = ref([]), A = ref(null), U = ref(null), _ = computed(() => {
    return "string" == typeof (e3 = x.value.dark) ? "auto" === e3 ? `@media(prefers-color-scheme:dark){body${ye}}` : `${e3}${ye}` : true === e3 ? `:root${ye}` : "";
    var e3;
  }), z = computed(() => x.value.locale);
  let M;
  useStyleTag(_, { id: "waline-darkmode" });
  const H = (e3) => {
    var _a;
    const { serverURL: t3, path: a, pageSize: l } = x.value, r2 = new AbortController();
    k.value = "loading", M == null ? void 0 : M(), (({ serverURL: e4, lang: t4, path: n3, page: a2, pageSize: l2, sortBy: r3, signal: i, token: o2 }) => {
      const s = {};
      return o2 && (s.Authorization = `Bearer ${o2}`), fetch(`${e4}/comment?path=${encodeURIComponent(n3)}&pageSize=${l2}&page=${a2}&lang=${t4}&sortBy=${r3}`, { signal: i, headers: s }).then((e5) => e5.json()).then((e5) => se(e5, "Get comment data"));
    })({ serverURL: t3, lang: x.value.lang, path: a, pageSize: l, sortBy: n2[E.value], page: e3, signal: r2.signal, token: (_a = w.value) == null ? void 0 : _a.token }).then((t4) => {
      k.value = "success", $.value = t4.count, j.value.push(...t4.data), L.value = e3, R.value = t4.totalPages;
    }).catch((e4) => {
      "AbortError" !== e4.name && (console.error(e4.message), k.value = "error");
    }), M = r2.abort.bind(r2);
  }, O = () => H(L.value + 1), P = () => {
    $.value = 0, j.value = [], H(1);
  }, V2 = (e3) => {
    A.value = e3;
  }, G2 = (e3) => {
    U.value = e3;
  }, Z2 = (e3) => {
    if (U.value)
      U.value.comment = e3.comment, U.value.orig = e3.orig;
    else if (e3.rid) {
      const t3 = j.value.find(({ objectId: t4 }) => t4 === e3.rid);
      if (!t3)
        return;
      Array.isArray(t3.children) || (t3.children = []), t3.children.push(e3);
    } else
      j.value.unshift(e3);
  }, J2 = async ({ comment: e3, status: t3 }) => {
    var _a;
    if (e3.status === t3)
      return;
    const { serverURL: n3, lang: a } = x.value;
    await de({ serverURL: n3, lang: a, token: (_a = w.value) == null ? void 0 : _a.token, objectId: e3.objectId, comment: { status: t3 } }), e3.status = t3;
  }, X2 = async (e3) => {
    var _a;
    if (e3.rid)
      return;
    const { serverURL: t3, lang: n3 } = x.value;
    await de({ serverURL: t3, lang: n3, token: (_a = w.value) == null ? void 0 : _a.token, objectId: e3.objectId, comment: { sticky: e3.sticky ? 0 : 1 } }), e3.sticky = !e3.sticky;
  }, Q2 = async ({ objectId: e3 }) => {
    var _a;
    if (!confirm("Are you sure you want to delete this comment?"))
      return;
    const { serverURL: t3, lang: n3 } = x.value;
    await (({ serverURL: e4, lang: t4, token: n4, objectId: a }) => fetch(`${e4}/comment/${a}?lang=${t4}`, { method: "DELETE", headers: { Authorization: `Bearer ${n4}` } }).then((e5) => e5.json()).then((e5) => se(e5, "Delete comment")))({ serverURL: t3, lang: n3, token: (_a = w.value) == null ? void 0 : _a.token, objectId: e3 }), j.value.some((t4, n4) => t4.objectId === e3 ? (j.value = j.value.filter((e4, t5) => t5 !== n4), true) : t4.children.some((a, l) => a.objectId === e3 && (j.value[n4].children = t4.children.filter((e4, t5) => t5 !== l), true)));
  }, ee2 = async (e3) => {
    var _a;
    const { serverURL: t3, lang: n3 } = x.value, { objectId: a } = e3, l = b.value.includes(a);
    await de({ serverURL: t3, lang: n3, objectId: a, token: (_a = w.value) == null ? void 0 : _a.token, comment: { like: !l } }), l ? b.value = b.value.filter((e4) => e4 !== a) : (b.value = [...b.value, a], b.value.length > 50 && (b.value = b.value.slice(-50))), e3.like = (e3.like || 0) + (l ? -1 : 1);
  };
  return provide("config", x), onMounted(() => {
    watch(() => [t2.serverURL, t2.path], () => P(), { immediate: true });
  }), onUnmounted(() => M == null ? void 0 : M()), (e3, t3) => (openBlock(), createElementBlock("div", Hn, [createVNode(wt), A.value ? createCommentVNode("v-if", true) : (openBlock(), createBlock(sn, { key: 0, onLog: P, onSubmit: Z2 })), createBaseVNode("div", Tn, [createBaseVNode("div", On, [$.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString($.value) }, null, 8, Pn)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(unref(z).comment), 1)]), createBaseVNode("ul", Vn, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(y), (e4) => (openBlock(), createElementBlock("li", { key: e4, class: normalizeClass([e4 === E.value ? "active" : ""]), onClick: (t4) => ((e5) => {
    E.value !== e5 && (E.value = e5, P());
  })(e4) }, toDisplayString(unref(z)[e4]), 11, Dn))), 128))])]), createBaseVNode("div", Nn, [(openBlock(true), createElementBlock(Fragment, null, renderList(j.value, (e4) => (openBlock(), createBlock(zn, { key: e4.objectId, "root-id": e4.objectId, comment: e4, reply: A.value, edit: U.value, onLog: P, onReply: V2, onEdit: G2, onSubmit: Z2, onStatus: J2, onDelete: Q2, onSticky: X2, onLike: ee2 }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), "error" === k.value ? (openBlock(), createElementBlock("div", Bn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: P, textContent: toDisplayString(unref(z).refresh) }, null, 8, Wn)])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, ["loading" === k.value ? (openBlock(), createElementBlock("div", Fn, [createVNode(unref(We), { size: 30 })])) : j.value.length ? L.value < R.value ? (openBlock(), createElementBlock("div", qn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: O, textContent: toDisplayString(unref(z).more) }, null, 8, Gn)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-empty", textContent: toDisplayString(unref(z).sofa) }, null, 8, Kn))], 64)), unref(x).copyright ? (openBlock(), createElementBlock("div", Zn, [createTextVNode(" Powered by "), Jn, createTextVNode(" v" + toDisplayString(unref(Mn)), 1)])) : createCommentVNode("v-if", true)]));
} });
var Xn = yt(Yn, [["__file", "WalineComment.vue"]]);
var Qn = (e2, t2) => {
  t2.forEach((t3, n2) => {
    t3.innerText = e2[n2].toString();
  });
};
var ea = ({ serverURL: e2, path: t2 = window.location.pathname, selector: n2 = ".waline-pageview-count", update: a = true, lang: l = navigator.language }) => {
  const r2 = new AbortController(), i = Array.from(document.querySelectorAll(n2)), o2 = (e3) => {
    const n3 = Ue(e3);
    return null !== n3 && t2 !== n3;
  }, s = (n3) => (({ serverURL: e3, lang: t3, paths: n4, signal: a2 }) => ce({ serverURL: e3, lang: t3, paths: n4, type: ["time"], signal: a2 }).then((e4) => Array.isArray(e4) ? e4 : [e4]))({ serverURL: ge(e2), paths: n3.map((e3) => Ue(e3) || t2), lang: l, signal: r2.signal }).then((e3) => Qn(e3, n3)).catch($e);
  if (a) {
    const n3 = i.filter((e3) => !o2(e3)), a2 = i.filter(o2);
    (c = { serverURL: ge(e2), path: t2, lang: l }, ue({ ...c, type: "time", action: "inc" })).then((e3) => Qn(new Array(n3.length).fill(e3), n3)), a2.length && s(a2);
  } else
    s(i);
  var c;
  return r2.abort.bind(r2);
};
var ta = ({ el: t2 = "#waline", path: n2 = window.location.pathname, comment: a = false, pageview: l = false, ...r2 }) => {
  const i = t2 ? Le(t2) : null;
  if (t2 && !i)
    throw new Error("Option 'el' do not match any domElement!");
  if (!r2.serverURL)
    throw new Error("Option 'serverURL' is missing!");
  const o2 = reactive({ ...r2 }), s = reactive({ comment: a, pageview: l, path: n2 }), c = i ? createApp(() => h(Xn, { path: s.path, ...o2 })) : null;
  c && c.mount(i);
  const u = watchEffect(() => {
    s.comment && _e({ serverURL: o2.serverURL, path: s.path, selector: "string" == typeof s.comment ? s.comment : void 0 });
  }), d = watchEffect(() => {
    s.pageview && ea({ serverURL: o2.serverURL, path: s.path, selector: "string" == typeof s.pageview ? s.pageview : void 0 });
  });
  return { el: i, update: ({ comment: e2, pageview: t3, path: n3 = window.location.pathname, ...a2 } = {}) => {
    Object.entries(a2).forEach(([e3, t4]) => {
      o2[e3] = t4;
    }), s.path = n3, void 0 !== e2 && (s.comment = e2), void 0 !== t3 && (s.pageview = t3);
  }, destroy: () => {
    c == null ? void 0 : c.unmount(), u(), d();
  } };
};
var na = ({ el: e2, serverURL: t2, count: n2, lang: a = navigator.language }) => {
  var _a;
  const l = st(), r2 = Le(e2), i = new AbortController();
  return (({ serverURL: e3, lang: t3, count: n3, signal: a2, token: l2 }) => {
    const r3 = {};
    return l2 && (r3.Authorization = `Bearer ${l2}`), fetch(`${e3}/comment?type=recent&count=${n3}&lang=${t3}`, { signal: a2, headers: r3 }).then((e4) => e4.json());
  })({ serverURL: t2, count: n2, lang: a, signal: i.signal, token: (_a = l.value) == null ? void 0 : _a.token }).then((e3) => r2 && e3.length ? (r2.innerHTML = `<ul class="wl-recent-list">${e3.map((e4) => `<li class="wl-recent-item"><a href="${e4.url}">${e4.nick}</a>：${e4.comment}</li>`).join("")}</ul>`, { comments: e3, destroy: () => {
    i.abort(), r2.innerHTML = "";
  } }) : { comments: e3, destroy: () => i.abort() });
};
var aa = ({ el: e2, serverURL: t2, count: n2, locale: a, lang: l = navigator.language, mode: r2 = "list" }) => {
  const i = Le(e2), o2 = new AbortController();
  return (({ serverURL: e3, signal: t3, pageSize: n3, lang: a2 }) => fetch(`${e3}/user?pageSize=${n3}&lang=${a2}`, { signal: t3 }).then((e4) => e4.json()).then((e4) => se(e4, "user list")).then((e4) => e4.data))({ serverURL: t2, pageSize: n2, lang: l, signal: o2.signal }).then((e3) => i && e3.length ? (a = { ...ie[l] || ie[B], ..."object" == typeof a ? a : {} }, i.innerHTML = `<ul class="wl-user-${r2}">${e3.map((e4, t3) => [`<li class="wl-user-item" aria-label="${e4.nick}">`, e4.link && `<a href="${e4.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${e4.avatar}" alt="${e4.nick}">`, `<span class="wl-user-badge">${t3 + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', e4.nick, e4.level && `<span class="wl-badge">${a ? a[`level${e4.level}`] : `Level ${e4.level}`}</span>`, e4.label && `<span class="wl-badge">${e4.label}</span>`, "</div>", e4.link && e4.link, "</div>", e4.link && "</a>", "</li>"].filter((e5) => e5).join("")).join("")}</ul>`, { users: e3, destroy: () => {
    o2.abort(), i.innerHTML = "";
  } }) : { users: e3, destroy: () => o2.abort() });
};
export {
  na as RecentComments,
  aa as UserList,
  _e as commentCount,
  ie as defaultLocales,
  ta as init,
  ea as pageviewCount,
  Mn as version
};
//# sourceMappingURL=@waline_client.js.map
