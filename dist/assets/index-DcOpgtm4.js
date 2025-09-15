(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))c(p);new MutationObserver(p=>{for(const u of p)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function s(p){const u={};return p.integrity&&(u.integrity=p.integrity),p.referrerPolicy&&(u.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?u.credentials="include":p.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function c(p){if(p.ep)return;p.ep=!0;const u=s(p);fetch(p.href,u)}})();var jsxRuntime={exports:{}},reactJsxRuntime_production={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hasRequiredReactJsxRuntime_production;function requireReactJsxRuntime_production(){if(hasRequiredReactJsxRuntime_production)return reactJsxRuntime_production;hasRequiredReactJsxRuntime_production=1;var e=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function s(c,p,u){var f=null;if(u!==void 0&&(f=""+u),p.key!==void 0&&(f=""+p.key),"key"in p){u={};for(var h in p)h!=="key"&&(u[h]=p[h])}else u=p;return p=u.ref,{$$typeof:e,type:c,key:f,ref:p!==void 0?p:null,props:u}}return reactJsxRuntime_production.Fragment=o,reactJsxRuntime_production.jsx=s,reactJsxRuntime_production.jsxs=s,reactJsxRuntime_production}var hasRequiredJsxRuntime;function requireJsxRuntime(){return hasRequiredJsxRuntime||(hasRequiredJsxRuntime=1,jsxRuntime.exports=requireReactJsxRuntime_production()),jsxRuntime.exports}var jsxRuntimeExports=requireJsxRuntime(),react={exports:{}},react_production={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hasRequiredReact_production;function requireReact_production(){if(hasRequiredReact_production)return react_production;hasRequiredReact_production=1;var e=Symbol.for("react.transitional.element"),o=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),v=Symbol.iterator;function S(w){return w===null||typeof w!="object"?null:(w=v&&w[v]||w["@@iterator"],typeof w=="function"?w:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,q={};function R(w,N,Z){this.props=w,this.context=N,this.refs=q,this.updater=Z||E}R.prototype.isReactComponent={},R.prototype.setState=function(w,N){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,N,"setState")},R.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function B(){}B.prototype=R.prototype;function z(w,N,Z){this.props=w,this.context=N,this.refs=q,this.updater=Z||E}var L=z.prototype=new B;L.constructor=z,_(L,R.prototype),L.isPureReactComponent=!0;var I=Array.isArray,W={H:null,A:null,T:null,S:null,V:null},Y=Object.prototype.hasOwnProperty;function F(w,N,Z,Q,J,ue){return Z=ue.ref,{$$typeof:e,type:w,key:N,ref:Z!==void 0?Z:null,props:ue}}function te(w,N){return F(w.type,N,void 0,void 0,void 0,w.props)}function V(w){return typeof w=="object"&&w!==null&&w.$$typeof===e}function ee(w){var N={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(Z){return N[Z]})}var oe=/\/+/g;function K(w,N){return typeof w=="object"&&w!==null&&w.key!=null?ee(""+w.key):N.toString(36)}function P(){}function de(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(P,P):(w.status="pending",w.then(function(N){w.status==="pending"&&(w.status="fulfilled",w.value=N)},function(N){w.status==="pending"&&(w.status="rejected",w.reason=N)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function ie(w,N,Z,Q,J){var ue=typeof w;(ue==="undefined"||ue==="boolean")&&(w=null);var ae=!1;if(w===null)ae=!0;else switch(ue){case"bigint":case"string":case"number":ae=!0;break;case"object":switch(w.$$typeof){case e:case o:ae=!0;break;case b:return ae=w._init,ie(ae(w._payload),N,Z,Q,J)}}if(ae)return J=J(w),ae=Q===""?"."+K(w,0):Q,I(J)?(Z="",ae!=null&&(Z=ae.replace(oe,"$&/")+"/"),ie(J,N,Z,"",function(Ie){return Ie})):J!=null&&(V(J)&&(J=te(J,Z+(J.key==null||w&&w.key===J.key?"":(""+J.key).replace(oe,"$&/")+"/")+ae)),N.push(J)),1;ae=0;var Me=Q===""?".":Q+":";if(I(w))for(var be=0;be<w.length;be++)Q=w[be],ue=Me+K(Q,be),ae+=ie(Q,N,Z,ue,J);else if(be=S(w),typeof be=="function")for(w=be.call(w),be=0;!(Q=w.next()).done;)Q=Q.value,ue=Me+K(Q,be++),ae+=ie(Q,N,Z,ue,J);else if(ue==="object"){if(typeof w.then=="function")return ie(de(w),N,Z,Q,J);throw N=String(w),Error("Objects are not valid as a React child (found: "+(N==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":N)+"). If you meant to render a collection of children, use an array instead.")}return ae}function C(w,N,Z){if(w==null)return w;var Q=[],J=0;return ie(w,Q,"","",function(ue){return N.call(Z,ue,J++)}),Q}function X(w){if(w._status===-1){var N=w._result;N=N(),N.then(function(Z){(w._status===0||w._status===-1)&&(w._status=1,w._result=Z)},function(Z){(w._status===0||w._status===-1)&&(w._status=2,w._result=Z)}),w._status===-1&&(w._status=0,w._result=N)}if(w._status===1)return w._result.default;throw w._result}var ne=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var N=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(N))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)};function H(){}return react_production.Children={map:C,forEach:function(w,N,Z){C(w,function(){N.apply(this,arguments)},Z)},count:function(w){var N=0;return C(w,function(){N++}),N},toArray:function(w){return C(w,function(N){return N})||[]},only:function(w){if(!V(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},react_production.Component=R,react_production.Fragment=s,react_production.Profiler=p,react_production.PureComponent=z,react_production.StrictMode=c,react_production.Suspense=g,react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=W,react_production.__COMPILER_RUNTIME={__proto__:null,c:function(w){return W.H.useMemoCache(w)}},react_production.cache=function(w){return function(){return w.apply(null,arguments)}},react_production.cloneElement=function(w,N,Z){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Q=_({},w.props),J=w.key,ue=void 0;if(N!=null)for(ae in N.ref!==void 0&&(ue=void 0),N.key!==void 0&&(J=""+N.key),N)!Y.call(N,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&N.ref===void 0||(Q[ae]=N[ae]);var ae=arguments.length-2;if(ae===1)Q.children=Z;else if(1<ae){for(var Me=Array(ae),be=0;be<ae;be++)Me[be]=arguments[be+2];Q.children=Me}return F(w.type,J,void 0,void 0,ue,Q)},react_production.createContext=function(w){return w={$$typeof:f,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:u,_context:w},w},react_production.createElement=function(w,N,Z){var Q,J={},ue=null;if(N!=null)for(Q in N.key!==void 0&&(ue=""+N.key),N)Y.call(N,Q)&&Q!=="key"&&Q!=="__self"&&Q!=="__source"&&(J[Q]=N[Q]);var ae=arguments.length-2;if(ae===1)J.children=Z;else if(1<ae){for(var Me=Array(ae),be=0;be<ae;be++)Me[be]=arguments[be+2];J.children=Me}if(w&&w.defaultProps)for(Q in ae=w.defaultProps,ae)J[Q]===void 0&&(J[Q]=ae[Q]);return F(w,ue,void 0,void 0,null,J)},react_production.createRef=function(){return{current:null}},react_production.forwardRef=function(w){return{$$typeof:h,render:w}},react_production.isValidElement=V,react_production.lazy=function(w){return{$$typeof:b,_payload:{_status:-1,_result:w},_init:X}},react_production.memo=function(w,N){return{$$typeof:m,type:w,compare:N===void 0?null:N}},react_production.startTransition=function(w){var N=W.T,Z={};W.T=Z;try{var Q=w(),J=W.S;J!==null&&J(Z,Q),typeof Q=="object"&&Q!==null&&typeof Q.then=="function"&&Q.then(H,ne)}catch(ue){ne(ue)}finally{W.T=N}},react_production.unstable_useCacheRefresh=function(){return W.H.useCacheRefresh()},react_production.use=function(w){return W.H.use(w)},react_production.useActionState=function(w,N,Z){return W.H.useActionState(w,N,Z)},react_production.useCallback=function(w,N){return W.H.useCallback(w,N)},react_production.useContext=function(w){return W.H.useContext(w)},react_production.useDebugValue=function(){},react_production.useDeferredValue=function(w,N){return W.H.useDeferredValue(w,N)},react_production.useEffect=function(w,N,Z){var Q=W.H;if(typeof Z=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return Q.useEffect(w,N)},react_production.useId=function(){return W.H.useId()},react_production.useImperativeHandle=function(w,N,Z){return W.H.useImperativeHandle(w,N,Z)},react_production.useInsertionEffect=function(w,N){return W.H.useInsertionEffect(w,N)},react_production.useLayoutEffect=function(w,N){return W.H.useLayoutEffect(w,N)},react_production.useMemo=function(w,N){return W.H.useMemo(w,N)},react_production.useOptimistic=function(w,N){return W.H.useOptimistic(w,N)},react_production.useReducer=function(w,N,Z){return W.H.useReducer(w,N,Z)},react_production.useRef=function(w){return W.H.useRef(w)},react_production.useState=function(w){return W.H.useState(w)},react_production.useSyncExternalStore=function(w,N,Z){return W.H.useSyncExternalStore(w,N,Z)},react_production.useTransition=function(){return W.H.useTransition()},react_production.version="19.1.1",react_production}var hasRequiredReact;function requireReact(){return hasRequiredReact||(hasRequiredReact=1,react.exports=requireReact_production()),react.exports}var reactExports=requireReact(),client={exports:{}},reactDomClient_production={},scheduler={exports:{}},scheduler_production={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hasRequiredScheduler_production;function requireScheduler_production(){return hasRequiredScheduler_production||(hasRequiredScheduler_production=1,(function(e){function o(C,X){var ne=C.length;C.push(X);e:for(;0<ne;){var H=ne-1>>>1,w=C[H];if(0<p(w,X))C[H]=X,C[ne]=w,ne=H;else break e}}function s(C){return C.length===0?null:C[0]}function c(C){if(C.length===0)return null;var X=C[0],ne=C.pop();if(ne!==X){C[0]=ne;e:for(var H=0,w=C.length,N=w>>>1;H<N;){var Z=2*(H+1)-1,Q=C[Z],J=Z+1,ue=C[J];if(0>p(Q,ne))J<w&&0>p(ue,Q)?(C[H]=ue,C[J]=ne,H=J):(C[H]=Q,C[Z]=ne,H=Z);else if(J<w&&0>p(ue,ne))C[H]=ue,C[J]=ne,H=J;else break e}}return X}function p(C,X){var ne=C.sortIndex-X.sortIndex;return ne!==0?ne:C.id-X.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;e.unstable_now=function(){return u.now()}}else{var f=Date,h=f.now();e.unstable_now=function(){return f.now()-h}}var g=[],m=[],b=1,v=null,S=3,E=!1,_=!1,q=!1,R=!1,B=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function I(C){for(var X=s(m);X!==null;){if(X.callback===null)c(m);else if(X.startTime<=C)c(m),X.sortIndex=X.expirationTime,o(g,X);else break;X=s(m)}}function W(C){if(q=!1,I(C),!_)if(s(g)!==null)_=!0,Y||(Y=!0,K());else{var X=s(m);X!==null&&ie(W,X.startTime-C)}}var Y=!1,F=-1,te=5,V=-1;function ee(){return R?!0:!(e.unstable_now()-V<te)}function oe(){if(R=!1,Y){var C=e.unstable_now();V=C;var X=!0;try{e:{_=!1,q&&(q=!1,z(F),F=-1),E=!0;var ne=S;try{t:{for(I(C),v=s(g);v!==null&&!(v.expirationTime>C&&ee());){var H=v.callback;if(typeof H=="function"){v.callback=null,S=v.priorityLevel;var w=H(v.expirationTime<=C);if(C=e.unstable_now(),typeof w=="function"){v.callback=w,I(C),X=!0;break t}v===s(g)&&c(g),I(C)}else c(g);v=s(g)}if(v!==null)X=!0;else{var N=s(m);N!==null&&ie(W,N.startTime-C),X=!1}}break e}finally{v=null,S=ne,E=!1}X=void 0}}finally{X?K():Y=!1}}}var K;if(typeof L=="function")K=function(){L(oe)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,de=P.port2;P.port1.onmessage=oe,K=function(){de.postMessage(null)}}else K=function(){B(oe,0)};function ie(C,X){F=B(function(){C(e.unstable_now())},X)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return S},e.unstable_next=function(C){switch(S){case 1:case 2:case 3:var X=3;break;default:X=S}var ne=S;S=X;try{return C()}finally{S=ne}},e.unstable_requestPaint=function(){R=!0},e.unstable_runWithPriority=function(C,X){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var ne=S;S=C;try{return X()}finally{S=ne}},e.unstable_scheduleCallback=function(C,X,ne){var H=e.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?H+ne:H):ne=H,C){case 1:var w=-1;break;case 2:w=250;break;case 5:w=1073741823;break;case 4:w=1e4;break;default:w=5e3}return w=ne+w,C={id:b++,callback:X,priorityLevel:C,startTime:ne,expirationTime:w,sortIndex:-1},ne>H?(C.sortIndex=ne,o(m,C),s(g)===null&&C===s(m)&&(q?(z(F),F=-1):q=!0,ie(W,ne-H))):(C.sortIndex=w,o(g,C),_||E||(_=!0,Y||(Y=!0,K()))),C},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(C){var X=S;return function(){var ne=S;S=X;try{return C.apply(this,arguments)}finally{S=ne}}}})(scheduler_production)),scheduler_production}var hasRequiredScheduler;function requireScheduler(){return hasRequiredScheduler||(hasRequiredScheduler=1,scheduler.exports=requireScheduler_production()),scheduler.exports}var reactDom={exports:{}},reactDom_production={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hasRequiredReactDom_production;function requireReactDom_production(){if(hasRequiredReactDom_production)return reactDom_production;hasRequiredReactDom_production=1;var e=requireReact();function o(g){var m="https://react.dev/errors/"+g;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)m+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+g+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var c={d:{f:s,r:function(){throw Error(o(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},p=Symbol.for("react.portal");function u(g,m,b){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:p,key:v==null?null:""+v,children:g,containerInfo:m,implementation:b}}var f=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(g,m){if(g==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,reactDom_production.createPortal=function(g,m){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(o(299));return u(g,m,null,b)},reactDom_production.flushSync=function(g){var m=f.T,b=c.p;try{if(f.T=null,c.p=2,g)return g()}finally{f.T=m,c.p=b,c.d.f()}},reactDom_production.preconnect=function(g,m){typeof g=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,c.d.C(g,m))},reactDom_production.prefetchDNS=function(g){typeof g=="string"&&c.d.D(g)},reactDom_production.preinit=function(g,m){if(typeof g=="string"&&m&&typeof m.as=="string"){var b=m.as,v=h(b,m.crossOrigin),S=typeof m.integrity=="string"?m.integrity:void 0,E=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;b==="style"?c.d.S(g,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:v,integrity:S,fetchPriority:E}):b==="script"&&c.d.X(g,{crossOrigin:v,integrity:S,fetchPriority:E,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},reactDom_production.preinitModule=function(g,m){if(typeof g=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var b=h(m.as,m.crossOrigin);c.d.M(g,{crossOrigin:b,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&c.d.M(g)},reactDom_production.preload=function(g,m){if(typeof g=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var b=m.as,v=h(b,m.crossOrigin);c.d.L(g,b,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},reactDom_production.preloadModule=function(g,m){if(typeof g=="string")if(m){var b=h(m.as,m.crossOrigin);c.d.m(g,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:b,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else c.d.m(g)},reactDom_production.requestFormReset=function(g){c.d.r(g)},reactDom_production.unstable_batchedUpdates=function(g,m){return g(m)},reactDom_production.useFormState=function(g,m,b){return f.H.useFormState(g,m,b)},reactDom_production.useFormStatus=function(){return f.H.useHostTransitionStatus()},reactDom_production.version="19.1.1",reactDom_production}var hasRequiredReactDom;function requireReactDom(){if(hasRequiredReactDom)return reactDom.exports;hasRequiredReactDom=1;function e(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(o){console.error(o)}}return e(),reactDom.exports=requireReactDom_production(),reactDom.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hasRequiredReactDomClient_production;function requireReactDomClient_production(){if(hasRequiredReactDomClient_production)return reactDomClient_production;hasRequiredReactDomClient_production=1;var e=requireScheduler(),o=requireReact(),s=requireReactDom();function c(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function p(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function u(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(u(t)!==t)throw Error(c(188))}function g(t){var n=t.alternate;if(!n){if(n=u(t),n===null)throw Error(c(188));return n!==t?null:t}for(var a=t,r=n;;){var i=a.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){a=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===a)return h(i),t;if(l===r)return h(i),n;l=l.sibling}throw Error(c(188))}if(a.return!==r.return)a=i,r=l;else{for(var d=!1,y=i.child;y;){if(y===a){d=!0,a=i,r=l;break}if(y===r){d=!0,r=i,a=l;break}y=y.sibling}if(!d){for(y=l.child;y;){if(y===a){d=!0,a=l,r=i;break}if(y===r){d=!0,r=l,a=i;break}y=y.sibling}if(!d)throw Error(c(189))}}if(a.alternate!==r)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?t:n}function m(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=m(t),n!==null)return n;t=t.sibling}return null}var b=Object.assign,v=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),z=Symbol.for("react.consumer"),L=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),V=Symbol.for("react.activity"),ee=Symbol.for("react.memo_cache_sentinel"),oe=Symbol.iterator;function K(t){return t===null||typeof t!="object"?null:(t=oe&&t[oe]||t["@@iterator"],typeof t=="function"?t:null)}var P=Symbol.for("react.client.reference");function de(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===P?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _:return"Fragment";case R:return"Profiler";case q:return"StrictMode";case W:return"Suspense";case Y:return"SuspenseList";case V:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case L:return(t.displayName||"Context")+".Provider";case z:return(t._context.displayName||"Context")+".Consumer";case I:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case F:return n=t.displayName||null,n!==null?n:de(t.type)||"Memo";case te:n=t._payload,t=t._init;try{return de(t(n))}catch{}}return null}var ie=Array.isArray,C=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne={pending:!1,data:null,method:null,action:null},H=[],w=-1;function N(t){return{current:t}}function Z(t){0>w||(t.current=H[w],H[w]=null,w--)}function Q(t,n){w++,H[w]=t.current,t.current=n}var J=N(null),ue=N(null),ae=N(null),Me=N(null);function be(t,n){switch(Q(ae,n),Q(ue,t),Q(J,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Eu(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Eu(n),t=Ou(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Z(J),Q(J,t)}function Ie(){Z(J),Z(ue),Z(ae)}function fe(t){t.memoizedState!==null&&Q(Me,t);var n=J.current,a=Ou(n,t.type);n!==a&&(Q(ue,t),Q(J,a))}function Ee(t){ue.current===t&&(Z(J),Z(ue)),Me.current===t&&(Z(Me),ja._currentValue=ne)}var We=Object.prototype.hasOwnProperty,Ae=e.unstable_scheduleCallback,Oe=e.unstable_cancelCallback,rt=e.unstable_shouldYield,et=e.unstable_requestPaint,me=e.unstable_now,Ye=e.unstable_getCurrentPriorityLevel,St=e.unstable_ImmediatePriority,zt=e.unstable_UserBlockingPriority,Et=e.unstable_NormalPriority,an=e.unstable_LowPriority,kn=e.unstable_IdlePriority,Ca=e.log,Ku=e.unstable_setDisableYieldValue,Lo=null,dt=null;function rn(t){if(typeof Ca=="function"&&Ku(t),dt&&typeof dt.setStrictMode=="function")try{dt.setStrictMode(Lo,t)}catch{}}var ft=Math.clz32?Math.clz32:Wu,Ju=Math.log,Pu=Math.LN2;function Wu(t){return t>>>=0,t===0?32:31-(Ju(t)/Pu|0)|0}var za=256,qa=4194304;function Mn(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function La(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var i=0,l=t.suspendedLanes,d=t.pingedLanes;t=t.warmLanes;var y=r&134217727;return y!==0?(r=y&~l,r!==0?i=Mn(r):(d&=y,d!==0?i=Mn(d):a||(a=y&~t,a!==0&&(i=Mn(a))))):(y=r&~l,y!==0?i=Mn(y):d!==0?i=Mn(d):a||(a=r&~t,a!==0&&(i=Mn(a)))),i===0?0:n!==0&&n!==i&&(n&l)===0&&(l=i&-i,a=n&-n,l>=a||l===32&&(a&4194048)!==0)?n:i}function No(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function ed(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ic(){var t=za;return za<<=1,(za&4194048)===0&&(za=256),t}function cc(){var t=qa;return qa<<=1,(qa&62914560)===0&&(qa=4194304),t}function Ir(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function $o(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function td(t,n,a,r,i,l){var d=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var y=t.entanglements,A=t.expirationTimes,T=t.hiddenUpdates;for(a=d&~a;0<a;){var $=31-ft(a),G=1<<$;y[$]=0,A[$]=-1;var k=T[$];if(k!==null)for(T[$]=null,$=0;$<k.length;$++){var M=k[$];M!==null&&(M.lane&=-536870913)}a&=~G}r!==0&&lc(t,r,0),l!==0&&i===0&&t.tag!==0&&(t.suspendedLanes|=l&~(d&~n))}function lc(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-ft(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&4194090}function pc(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-ft(a),i=1<<r;i&n|t[r]&n&&(t[r]|=n),a&=~i}}function Kr(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Jr(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function uc(){var t=X.p;return t!==0?t:(t=window.event,t===void 0?32:Yu(t.type))}function nd(t,n){var a=X.p;try{return X.p=t,n()}finally{X.p=a}}var sn=Math.random().toString(36).slice(2),tt="__reactFiber$"+sn,st="__reactProps$"+sn,Kn="__reactContainer$"+sn,Pr="__reactEvents$"+sn,od="__reactListeners$"+sn,rd="__reactHandles$"+sn,dc="__reactResources$"+sn,Bo="__reactMarker$"+sn;function Wr(t){delete t[tt],delete t[st],delete t[Pr],delete t[od],delete t[rd]}function Jn(t){var n=t[tt];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Kn]||a[tt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Tu(t);t!==null;){if(a=t[tt])return a;t=Tu(t)}return n}t=a,a=t.parentNode}return null}function Pn(t){if(t=t[tt]||t[Kn]){var n=t.tag;if(n===5||n===6||n===13||n===26||n===27||n===3)return t}return null}function Uo(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(c(33))}function Wn(t){var n=t[dc];return n||(n=t[dc]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Xe(t){t[Bo]=!0}var fc=new Set,hc={};function Cn(t,n){eo(t,n),eo(t+"Capture",n)}function eo(t,n){for(hc[t]=n,t=0;t<n.length;t++)fc.add(n[t])}var cd=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mc={},gc={};function ld(t){return We.call(gc,t)?!0:We.call(mc,t)?!1:cd.test(t)?gc[t]=!0:(mc[t]=!0,!1)}function Na(t,n,a){if(ld(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function $a(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ht(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+r)}}var es,xc;function to(t){if(es===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);es=n&&n[1]||"",xc=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+es+t+xc}var ts=!1;function ns(t,n){if(!t||ts)return"";ts=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var G=function(){throw Error()};if(Object.defineProperty(G.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(G,[])}catch(M){var k=M}Reflect.construct(t,[],G)}else{try{G.call()}catch(M){k=M}t.call(G.prototype)}}else{try{throw Error()}catch(M){k=M}(G=t())&&typeof G.catch=="function"&&G.catch(function(){})}}catch(M){if(M&&k&&typeof M.stack=="string")return[M.stack,k.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=r.DetermineComponentFrameRoot(),d=l[0],y=l[1];if(d&&y){var A=d.split(`
`),T=y.split(`
`);for(i=r=0;r<A.length&&!A[r].includes("DetermineComponentFrameRoot");)r++;for(;i<T.length&&!T[i].includes("DetermineComponentFrameRoot");)i++;if(r===A.length||i===T.length)for(r=A.length-1,i=T.length-1;1<=r&&0<=i&&A[r]!==T[i];)i--;for(;1<=r&&0<=i;r--,i--)if(A[r]!==T[i]){if(r!==1||i!==1)do if(r--,i--,0>i||A[r]!==T[i]){var $=`
`+A[r].replace(" at new "," at ");return t.displayName&&$.includes("<anonymous>")&&($=$.replace("<anonymous>",t.displayName)),$}while(1<=r&&0<=i);break}}}finally{ts=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?to(a):""}function pd(t){switch(t.tag){case 26:case 27:case 5:return to(t.type);case 16:return to("Lazy");case 13:return to("Suspense");case 19:return to("SuspenseList");case 0:case 15:return ns(t.type,!1);case 11:return ns(t.type.render,!1);case 1:return ns(t.type,!0);case 31:return to("Activity");default:return""}}function yc(t){try{var n="";do n+=pd(t),t=t.return;while(t);return n}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function Ot(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function bc(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ud(t){var n=bc(t)?"checked":"value",a=Object.getOwnPropertyDescriptor(t.constructor.prototype,n),r=""+t[n];if(!t.hasOwnProperty(n)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,l=a.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return i.call(this)},set:function(d){r=""+d,l.call(this,d)}}),Object.defineProperty(t,n,{enumerable:a.enumerable}),{getValue:function(){return r},setValue:function(d){r=""+d},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Ba(t){t._valueTracker||(t._valueTracker=ud(t))}function vc(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=bc(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}function Ua(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var dd=/[\n"\\]/g;function Dt(t){return t.replace(dd,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function os(t,n,a,r,i,l,d,y){t.name="",d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?t.type=d:t.removeAttribute("type"),n!=null?d==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+Ot(n)):t.value!==""+Ot(n)&&(t.value=""+Ot(n)):d!=="submit"&&d!=="reset"||t.removeAttribute("value"),n!=null?as(t,d,Ot(n)):a!=null?as(t,d,Ot(a)):r!=null&&t.removeAttribute("value"),i==null&&l!=null&&(t.defaultChecked=!!l),i!=null&&(t.checked=i&&typeof i!="function"&&typeof i!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.name=""+Ot(y):t.removeAttribute("name")}function wc(t,n,a,r,i,l,d,y){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(t.type=l),n!=null||a!=null){if(!(l!=="submit"&&l!=="reset"||n!=null))return;a=a!=null?""+Ot(a):"",n=n!=null?""+Ot(n):a,y||n===t.value||(t.value=n),t.defaultValue=n}r=r??i,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=y?t.checked:!!r,t.defaultChecked=!!r,d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.name=d)}function as(t,n,a){n==="number"&&Ua(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function no(t,n,a,r){if(t=t.options,n){n={};for(var i=0;i<a.length;i++)n["$"+a[i]]=!0;for(a=0;a<t.length;a++)i=n.hasOwnProperty("$"+t[a].value),t[a].selected!==i&&(t[a].selected=i),i&&r&&(t[a].defaultSelected=!0)}else{for(a=""+Ot(a),n=null,i=0;i<t.length;i++){if(t[i].value===a){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}n!==null||t[i].disabled||(n=t[i])}n!==null&&(n.selected=!0)}}function Ac(t,n,a){if(n!=null&&(n=""+Ot(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+Ot(a):""}function Sc(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(c(92));if(ie(r)){if(1<r.length)throw Error(c(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=Ot(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r)}function oo(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var fd=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ec(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||fd.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Oc(t,n,a){if(n!=null&&typeof n!="object")throw Error(c(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="");for(var i in n)r=n[i],n.hasOwnProperty(i)&&a[i]!==r&&Ec(t,i,r)}else for(var l in n)n.hasOwnProperty(l)&&Ec(t,l,n[l])}function rs(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hd=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),md=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ga(t){return md.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}var ss=null;function is(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ao=null,ro=null;function Dc(t){var n=Pn(t);if(n&&(t=n.stateNode)){var a=t[st]||null;e:switch(t=n.stateNode,n.type){case"input":if(os(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Dt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var i=r[st]||null;if(!i)throw Error(c(90));os(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&vc(r)}break e;case"textarea":Ac(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&no(t,!!a.multiple,n,!1)}}}var cs=!1;function _c(t,n,a){if(cs)return t(n,a);cs=!0;try{var r=t(n);return r}finally{if(cs=!1,(ao!==null||ro!==null)&&(jr(),ao&&(n=ao,t=ro,ro=ao=null,Dc(n),t)))for(n=0;n<t.length;n++)Dc(t[n])}}function Go(t,n){var a=t.stateNode;if(a===null)return null;var r=a[st]||null;if(r===null)return null;a=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(c(231,n,typeof a));return a}var Yt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ps=!1;if(Yt)try{var Fo={};Object.defineProperty(Fo,"passive",{get:function(){ps=!0}}),window.addEventListener("test",Fo,Fo),window.removeEventListener("test",Fo,Fo)}catch{ps=!1}var cn=null,us=null,Fa=null;function jc(){if(Fa)return Fa;var t,n=us,a=n.length,r,i="value"in cn?cn.value:cn.textContent,l=i.length;for(t=0;t<a&&n[t]===i[t];t++);var d=a-t;for(r=1;r<=d&&n[a-r]===i[l-r];r++);return Fa=i.slice(t,1<r?1-r:void 0)}function Ha(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Ya(){return!0}function Tc(){return!1}function it(t){function n(a,r,i,l,d){this._reactName=a,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=d,this.currentTarget=null;for(var y in t)t.hasOwnProperty(y)&&(a=t[y],this[y]=a?a(l):l[y]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Ya:Tc,this.isPropagationStopped=Tc,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ya)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ya)},persist:function(){},isPersistent:Ya}),n}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xa=it(zn),Ho=b({},zn,{view:0,detail:0}),gd=it(Ho),ds,fs,Yo,Qa=b({},Ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ms,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Yo&&(Yo&&t.type==="mousemove"?(ds=t.screenX-Yo.screenX,fs=t.screenY-Yo.screenY):fs=ds=0,Yo=t),ds)},movementY:function(t){return"movementY"in t?t.movementY:fs}}),Rc=it(Qa),xd=b({},Qa,{dataTransfer:0}),yd=it(xd),vd=b({},Ho,{relatedTarget:0}),hs=it(vd),wd=b({},zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Ad=it(wd),Sd=b({},zn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ed=it(Sd),Od=b({},zn,{data:0}),kc=it(Od),Dd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_d={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Td(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=jd[t])?!!n[t]:!1}function ms(){return Td}var Rd=b({},Ho,{key:function(t){if(t.key){var n=Dd[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ha(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?_d[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ms,charCode:function(t){return t.type==="keypress"?Ha(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ha(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),kd=it(Rd),Md=b({},Qa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mc=it(Md),Cd=b({},Ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ms}),zd=it(Cd),qd=b({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ld=it(qd),Nd=b({},Qa,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),$d=it(Nd),Bd=b({},zn,{newState:0,oldState:0}),Ud=it(Bd),Gd=[9,13,27,32],gs=Yt&&"CompositionEvent"in window,Xo=null;Yt&&"documentMode"in document&&(Xo=document.documentMode);var Fd=Yt&&"TextEvent"in window&&!Xo,Cc=Yt&&(!gs||Xo&&8<Xo&&11>=Xo),zc=" ",qc=!1;function Lc(t,n){switch(t){case"keyup":return Gd.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nc(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var so=!1;function Hd(t,n){switch(t){case"compositionend":return Nc(n);case"keypress":return n.which!==32?null:(qc=!0,zc);case"textInput":return t=n.data,t===zc&&qc?null:t;default:return null}}function Yd(t,n){if(so)return t==="compositionend"||!gs&&Lc(t,n)?(t=jc(),Fa=us=cn=null,so=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Cc&&n.locale!=="ko"?null:n.data;default:return null}}var Xd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $c(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Xd[t.type]:n==="textarea"}function Bc(t,n,a,r){ao?ro?ro.push(r):ro=[r]:ao=r,n=zr(n,"onChange"),0<n.length&&(a=new Xa("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Qo=null,Vo=null;function Qd(t){bu(t,0)}function Va(t){var n=Uo(t);if(vc(n))return t}function Uc(t,n){if(t==="change")return n}var Gc=!1;if(Yt){var xs;if(Yt){var ys="oninput"in document;if(!ys){var Fc=document.createElement("div");Fc.setAttribute("oninput","return;"),ys=typeof Fc.oninput=="function"}xs=ys}else xs=!1;Gc=xs&&(!document.documentMode||9<document.documentMode)}function Hc(){Qo&&(Qo.detachEvent("onpropertychange",Yc),Vo=Qo=null)}function Yc(t){if(t.propertyName==="value"&&Va(Vo)){var n=[];Bc(n,Vo,t,is(t)),_c(Qd,n)}}function Vd(t,n,a){t==="focusin"?(Hc(),Qo=n,Vo=a,Qo.attachEvent("onpropertychange",Yc)):t==="focusout"&&Hc()}function Zd(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Va(Vo)}function Id(t,n){if(t==="click")return Va(n)}function Kd(t,n){if(t==="input"||t==="change")return Va(n)}function Jd(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var gt=typeof Object.is=="function"?Object.is:Jd;function Zo(t,n){if(gt(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var i=a[r];if(!We.call(n,i)||!gt(t[i],n[i]))return!1}return!0}function Xc(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Qc(t,n){var a=Xc(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Xc(a)}}function Vc(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Vc(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Zc(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Ua(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Ua(t.document)}return n}function bs(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Pd=Yt&&"documentMode"in document&&11>=document.documentMode,io=null,vs=null,Io=null,ws=!1;function Ic(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ws||io==null||io!==Ua(r)||(r=io,"selectionStart"in r&&bs(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Io&&Zo(Io,r)||(Io=r,r=zr(vs,"onSelect"),0<r.length&&(n=new Xa("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=io)))}function qn(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var co={animationend:qn("Animation","AnimationEnd"),animationiteration:qn("Animation","AnimationIteration"),animationstart:qn("Animation","AnimationStart"),transitionrun:qn("Transition","TransitionRun"),transitionstart:qn("Transition","TransitionStart"),transitioncancel:qn("Transition","TransitionCancel"),transitionend:qn("Transition","TransitionEnd")},As={},Kc={};Yt&&(Kc=document.createElement("div").style,"AnimationEvent"in window||(delete co.animationend.animation,delete co.animationiteration.animation,delete co.animationstart.animation),"TransitionEvent"in window||delete co.transitionend.transition);function Ln(t){if(As[t])return As[t];if(!co[t])return t;var n=co[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Kc)return As[t]=n[a];return t}var Jc=Ln("animationend"),Pc=Ln("animationiteration"),Wc=Ln("animationstart"),Wd=Ln("transitionrun"),ef=Ln("transitionstart"),tf=Ln("transitioncancel"),el=Ln("transitionend"),tl=new Map,Ss="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ss.push("scrollEnd");function qt(t,n){tl.set(t,n),Cn(n,[t])}var nl=new WeakMap;function _t(t,n){if(typeof t=="object"&&t!==null){var a=nl.get(t);return a!==void 0?a:(n={value:t,source:n,stack:yc(n)},nl.set(t,n),n)}return{value:t,source:n,stack:yc(n)}}var jt=[],lo=0,Es=0;function Za(){for(var t=lo,n=Es=lo=0;n<t;){var a=jt[n];jt[n++]=null;var r=jt[n];jt[n++]=null;var i=jt[n];jt[n++]=null;var l=jt[n];if(jt[n++]=null,r!==null&&i!==null){var d=r.pending;d===null?i.next=i:(i.next=d.next,d.next=i),r.pending=i}l!==0&&ol(a,i,l)}}function Ia(t,n,a,r){jt[lo++]=t,jt[lo++]=n,jt[lo++]=a,jt[lo++]=r,Es|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function Os(t,n,a,r){return Ia(t,n,a,r),Ka(t)}function po(t,n){return Ia(t,null,null,n),Ka(t)}function ol(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var i=!1,l=t.return;l!==null;)l.childLanes|=a,r=l.alternate,r!==null&&(r.childLanes|=a),l.tag===22&&(t=l.stateNode,t===null||t._visibility&1||(i=!0)),t=l,l=l.return;return t.tag===3?(l=t.stateNode,i&&n!==null&&(i=31-ft(a),t=l.hiddenUpdates,r=t[i],r===null?t[i]=[n]:r.push(n),n.lane=a|536870912),l):null}function Ka(t){if(50<va)throw va=0,ki=null,Error(c(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var uo={};function nf(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(t,n,a,r){return new nf(t,n,a,r)}function Ds(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Xt(t,n){var a=t.alternate;return a===null?(a=xt(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function al(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Ja(t,n,a,r,i,l){var d=0;if(r=t,typeof t=="function")Ds(t)&&(d=1);else if(typeof t=="string")d=sh(t,a,J.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case V:return t=xt(31,a,n,i),t.elementType=V,t.lanes=l,t;case _:return Nn(a.children,i,l,n);case q:d=8,i|=24;break;case R:return t=xt(12,a,n,i|2),t.elementType=R,t.lanes=l,t;case W:return t=xt(13,a,n,i),t.elementType=W,t.lanes=l,t;case Y:return t=xt(19,a,n,i),t.elementType=Y,t.lanes=l,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case B:case L:d=10;break e;case z:d=9;break e;case I:d=11;break e;case F:d=14;break e;case te:d=16,r=null;break e}d=29,a=Error(c(130,t===null?"null":typeof t,"")),r=null}return n=xt(d,a,n,i),n.elementType=t,n.type=r,n.lanes=l,n}function Nn(t,n,a,r){return t=xt(7,t,r,n),t.lanes=a,t}function _s(t,n,a){return t=xt(6,t,null,n),t.lanes=a,t}function js(t,n,a){return n=xt(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var fo=[],ho=0,Pa=null,Wa=0,Tt=[],Rt=0,$n=null,Qt=1,Vt="";function Bn(t,n){fo[ho++]=Wa,fo[ho++]=Pa,Pa=t,Wa=n}function rl(t,n,a){Tt[Rt++]=Qt,Tt[Rt++]=Vt,Tt[Rt++]=$n,$n=t;var r=Qt;t=Vt;var i=32-ft(r)-1;r&=~(1<<i),a+=1;var l=32-ft(n)+i;if(30<l){var d=i-i%5;l=(r&(1<<d)-1).toString(32),r>>=d,i-=d,Qt=1<<32-ft(n)+i|a<<i|r,Vt=l+t}else Qt=1<<l|a<<i|r,Vt=t}function Ts(t){t.return!==null&&(Bn(t,1),rl(t,1,0))}function Rs(t){for(;t===Pa;)Pa=fo[--ho],fo[ho]=null,Wa=fo[--ho],fo[ho]=null;for(;t===$n;)$n=Tt[--Rt],Tt[Rt]=null,Vt=Tt[--Rt],Tt[Rt]=null,Qt=Tt[--Rt],Tt[Rt]=null}var ot=null,Le=null,Se=!1,Un=null,$t=!1,ks=Error(c(519));function Gn(t){var n=Error(c(418,""));throw Po(_t(n,t)),ks}function sl(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[tt]=t,n[st]=r,a){case"dialog":ye("cancel",n),ye("close",n);break;case"iframe":case"object":case"embed":ye("load",n);break;case"video":case"audio":for(a=0;a<Aa.length;a++)ye(Aa[a],n);break;case"source":ye("error",n);break;case"img":case"image":case"link":ye("error",n),ye("load",n);break;case"details":ye("toggle",n);break;case"input":ye("invalid",n),wc(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),Ba(n);break;case"select":ye("invalid",n);break;case"textarea":ye("invalid",n),Sc(n,r.value,r.defaultValue,r.children),Ba(n)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||Su(n.textContent,a)?(r.popover!=null&&(ye("beforetoggle",n),ye("toggle",n)),r.onScroll!=null&&ye("scroll",n),r.onScrollEnd!=null&&ye("scrollend",n),r.onClick!=null&&(n.onclick=qr),n=!0):n=!1,n||Gn(t)}function il(t){for(ot=t.return;ot;)switch(ot.tag){case 5:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:ot=ot.return}}function Ko(t){if(t!==ot)return!1;if(!Se)return il(t),Se=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Vi(t.type,t.memoizedProps)),a=!a),a&&Le&&Gn(t),il(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));e:{for(t=t.nextSibling,n=0;t;){if(t.nodeType===8)if(a=t.data,a==="/$"){if(n===0){Le=Nt(t.nextSibling);break e}n--}else a!=="$"&&a!=="$!"&&a!=="$?"||n++;t=t.nextSibling}Le=null}}else n===27?(n=Le,On(t.type)?(t=Ji,Ji=null,Le=t):Le=n):Le=ot?Nt(t.stateNode.nextSibling):null;return!0}function Jo(){Le=ot=null,Se=!1}function cl(){var t=Un;return t!==null&&(ut===null?ut=t:ut.push.apply(ut,t),Un=null),t}function Po(t){Un===null?Un=[t]:Un.push(t)}var Ms=N(null),Fn=null,Zt=null;function pn(t,n,a){Q(Ms,n._currentValue),n._currentValue=a}function It(t){t._currentValue=Ms.current,Z(Ms)}function Cs(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function zs(t,n,a,r){var i=t.child;for(i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){var d=i.child;l=l.firstContext;e:for(;l!==null;){var y=l;l=i;for(var A=0;A<n.length;A++)if(y.context===n[A]){l.lanes|=a,y=l.alternate,y!==null&&(y.lanes|=a),Cs(l.return,a,t),r||(d=null);break e}l=y.next}}else if(i.tag===18){if(d=i.return,d===null)throw Error(c(341));d.lanes|=a,l=d.alternate,l!==null&&(l.lanes|=a),Cs(d,a,t),d=null}else d=i.child;if(d!==null)d.return=i;else for(d=i;d!==null;){if(d===t){d=null;break}if(i=d.sibling,i!==null){i.return=d.return,d=i;break}d=d.return}i=d}}function Wo(t,n,a,r){t=null;for(var i=n,l=!1;i!==null;){if(!l){if((i.flags&524288)!==0)l=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var d=i.alternate;if(d===null)throw Error(c(387));if(d=d.memoizedProps,d!==null){var y=i.type;gt(i.pendingProps.value,d.value)||(t!==null?t.push(y):t=[y])}}else if(i===Me.current){if(d=i.alternate,d===null)throw Error(c(387));d.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(t!==null?t.push(ja):t=[ja])}i=i.return}t!==null&&zs(n,t,a,r),n.flags|=262144}function er(t){for(t=t.firstContext;t!==null;){if(!gt(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Hn(t){Fn=t,Zt=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function nt(t){return ll(Fn,t)}function tr(t,n){return Fn===null&&Hn(t),ll(t,n)}function ll(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Zt===null){if(t===null)throw Error(c(308));Zt=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Zt=Zt.next=n;return a}var af=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},rf=e.unstable_scheduleCallback,sf=e.unstable_NormalPriority,Fe={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function qs(){return{controller:new af,data:new Map,refCount:0}}function ea(t){t.refCount--,t.refCount===0&&rf(sf,function(){t.controller.abort()})}var ta=null,Ls=0,mo=0,go=null;function cf(t,n){if(ta===null){var a=ta=[];Ls=0,mo=$i(),go={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Ls++,n.then(pl,pl),n}function pl(){if(--Ls===0&&ta!==null){go!==null&&(go.status="fulfilled");var t=ta;ta=null,mo=0,go=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function lf(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var i=0;i<a.length;i++)(0,a[i])(n)},function(i){for(r.status="rejected",r.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),r}var ul=C.S;C.S=function(t,n){typeof n=="object"&&n!==null&&typeof n.then=="function"&&cf(t,n),ul!==null&&ul(t,n)};var Yn=N(null);function Ns(){var t=Yn.current;return t!==null?t:Ce.pooledCache}function nr(t,n){n===null?Q(Yn,Yn.current):Q(Yn,n.pool)}function dl(){var t=Ns();return t===null?null:{parent:Fe._currentValue,pool:t}}var na=Error(c(460)),fl=Error(c(474)),ar=Error(c(542)),$s={then:function(){}};function hl(t){return t=t.status,t==="fulfilled"||t==="rejected"}function rr(){}function ml(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(rr,rr),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,xl(t),t;default:if(typeof n.status=="string")n.then(rr,rr);else{if(t=Ce,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var i=n;i.status="fulfilled",i.value=r}},function(r){if(n.status==="pending"){var i=n;i.status="rejected",i.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,xl(t),t}throw oa=n,na}}var oa=null;function gl(){if(oa===null)throw Error(c(459));var t=oa;return oa=null,t}function xl(t){if(t===na||t===ar)throw Error(c(483))}var un=!1;function Bs(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Us(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function dn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function fn(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(De&2)!==0){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,n=Ka(t),ol(t,null,a),n}return Ia(t,r,n,a),Ka(t)}function aa(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,pc(t,a)}}function Gs(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var i=null,l=null;if(a=a.firstBaseUpdate,a!==null){do{var d={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};l===null?i=l=d:l=l.next=d,a=a.next}while(a!==null);l===null?i=l=n:l=l.next=n}else i=l=n;a={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Fs=!1;function ra(){if(Fs){var t=go;if(t!==null)throw t}}function sa(t,n,a,r){Fs=!1;var i=t.updateQueue;un=!1;var l=i.firstBaseUpdate,d=i.lastBaseUpdate,y=i.shared.pending;if(y!==null){i.shared.pending=null;var A=y,T=A.next;A.next=null,d===null?l=T:d.next=T,d=A;var $=t.alternate;$!==null&&($=$.updateQueue,y=$.lastBaseUpdate,y!==d&&(y===null?$.firstBaseUpdate=T:y.next=T,$.lastBaseUpdate=A))}if(l!==null){var G=i.baseState;d=0,$=T=A=null,y=l;do{var k=y.lane&-536870913,M=k!==y.lane;if(M?(ve&k)===k:(r&k)===k){k!==0&&k===mo&&(Fs=!0),$!==null&&($=$.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});e:{var pe=t,ce=y;k=n;var Re=a;switch(ce.tag){case 1:if(pe=ce.payload,typeof pe=="function"){G=pe.call(Re,G,k);break e}G=pe;break e;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=ce.payload,k=typeof pe=="function"?pe.call(Re,G,k):pe,k==null)break e;G=b({},G,k);break e;case 2:un=!0}}k=y.callback,k!==null&&(t.flags|=64,M&&(t.flags|=8192),M=i.callbacks,M===null?i.callbacks=[k]:M.push(k))}else M={lane:k,tag:y.tag,payload:y.payload,callback:y.callback,next:null},$===null?(T=$=M,A=G):$=$.next=M,d|=k;if(y=y.next,y===null){if(y=i.shared.pending,y===null)break;M=y,y=M.next,M.next=null,i.lastBaseUpdate=M,i.shared.pending=null}}while(!0);$===null&&(A=G),i.baseState=A,i.firstBaseUpdate=T,i.lastBaseUpdate=$,l===null&&(i.shared.lanes=0),wn|=d,t.lanes=d,t.memoizedState=G}}function yl(t,n){if(typeof t!="function")throw Error(c(191,t));t.call(n)}function bl(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)yl(a[t],n)}var xo=N(null),sr=N(0);function vl(t,n){t=nn,Q(sr,t),Q(xo,n),nn=t|n.baseLanes}function Hs(){Q(sr,nn),Q(xo,xo.current)}function Ys(){nn=sr.current,Z(xo),Z(sr)}var hn=0,he=null,je=null,Ue=null,ir=!1,yo=!1,Xn=!1,lr=0,ia=0,bo=null,pf=0;function $e(){throw Error(c(321))}function Xs(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!gt(t[a],n[a]))return!1;return!0}function Qs(t,n,a,r,i,l){return hn=l,he=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=t===null||t.memoizedState===null?op:ap,Xn=!1,l=a(r,i),Xn=!1,yo&&(l=Al(n,a,r,i)),wl(t),l}function wl(t){C.H=mr;var n=je!==null&&je.next!==null;if(hn=0,Ue=je=he=null,ir=!1,ia=0,bo=null,n)throw Error(c(300));t===null||Qe||(t=t.dependencies,t!==null&&er(t)&&(Qe=!0))}function Al(t,n,a,r){he=t;var i=0;do{if(yo&&(bo=null),ia=0,yo=!1,25<=i)throw Error(c(301));if(i+=1,Ue=je=null,t.updateQueue!=null){var l=t.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}C.H=xf,l=n(a,r)}while(yo);return l}function uf(){var t=C.H,n=t.useState()[0];return n=typeof n.then=="function"?ca(n):n,t=t.useState()[0],(je!==null?je.memoizedState:null)!==t&&(he.flags|=1024),n}function Vs(){var t=lr!==0;return lr=0,t}function Zs(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Is(t){if(ir){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ir=!1}hn=0,Ue=je=he=null,yo=!1,ia=lr=0,bo=null}function ct(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ue===null?he.memoizedState=Ue=t:Ue=Ue.next=t,Ue}function Ge(){if(je===null){var t=he.alternate;t=t!==null?t.memoizedState:null}else t=je.next;var n=Ue===null?he.memoizedState:Ue.next;if(n!==null)Ue=n,je=t;else{if(t===null)throw he.alternate===null?Error(c(467)):Error(c(310));je=t,t={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Ue===null?he.memoizedState=Ue=t:Ue=Ue.next=t}return Ue}function Ks(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ca(t){var n=ia;return ia+=1,bo===null&&(bo=[]),t=ml(bo,t,n),n=he,(Ue===null?n.memoizedState:Ue.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?op:ap),t}function pr(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ca(t);if(t.$$typeof===L)return nt(t)}throw Error(c(438,String(t)))}function Js(t){var n=null,a=he.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=he.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(i){return i.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ks(),he.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=ee;return n.index++,a}function Kt(t,n){return typeof n=="function"?n(t):n}function ur(t){var n=Ge();return Ps(n,je,t)}function Ps(t,n,a){var r=t.queue;if(r===null)throw Error(c(311));r.lastRenderedReducer=a;var i=t.baseQueue,l=r.pending;if(l!==null){if(i!==null){var d=i.next;i.next=l.next,l.next=d}n.baseQueue=i=l,r.pending=null}if(l=t.baseState,i===null)t.memoizedState=l;else{n=i.next;var y=d=null,A=null,T=n,$=!1;do{var G=T.lane&-536870913;if(G!==T.lane?(ve&G)===G:(hn&G)===G){var k=T.revertLane;if(k===0)A!==null&&(A=A.next={lane:0,revertLane:0,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),G===mo&&($=!0);else if((hn&k)===k){T=T.next,k===mo&&($=!0);continue}else G={lane:0,revertLane:T.revertLane,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},A===null?(y=A=G,d=l):A=A.next=G,he.lanes|=k,wn|=k;G=T.action,Xn&&a(l,G),l=T.hasEagerState?T.eagerState:a(l,G)}else k={lane:G,revertLane:T.revertLane,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},A===null?(y=A=k,d=l):A=A.next=k,he.lanes|=G,wn|=G;T=T.next}while(T!==null&&T!==n);if(A===null?d=l:A.next=y,!gt(l,t.memoizedState)&&(Qe=!0,$&&(a=go,a!==null)))throw a;t.memoizedState=l,t.baseState=d,t.baseQueue=A,r.lastRenderedState=l}return i===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Ws(t){var n=Ge(),a=n.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=t;var r=a.dispatch,i=a.pending,l=n.memoizedState;if(i!==null){a.pending=null;var d=i=i.next;do l=t(l,d.action),d=d.next;while(d!==i);gt(l,n.memoizedState)||(Qe=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),a.lastRenderedState=l}return[l,r]}function Sl(t,n,a){var r=he,i=Ge(),l=Se;if(l){if(a===void 0)throw Error(c(407));a=a()}else a=n();var d=!gt((je||i).memoizedState,a);d&&(i.memoizedState=a,Qe=!0),i=i.queue;var y=Dl.bind(null,r,i,t);if(la(2048,8,y,[t]),i.getSnapshot!==n||d||Ue!==null&&Ue.memoizedState.tag&1){if(r.flags|=2048,vo(9,dr(),Ol.bind(null,r,i,a,n),null),Ce===null)throw Error(c(349));l||(hn&124)!==0||El(r,n,a)}return a}function El(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=he.updateQueue,n===null?(n=Ks(),he.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Ol(t,n,a,r){n.value=a,n.getSnapshot=r,_l(n)&&jl(t)}function Dl(t,n,a){return a(function(){_l(n)&&jl(t)})}function _l(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!gt(t,a)}catch{return!0}}function jl(t){var n=po(t,2);n!==null&&At(n,t,2)}function ei(t){var n=ct();if(typeof t=="function"){var a=t;if(t=a(),Xn){rn(!0);try{a()}finally{rn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Kt,lastRenderedState:t},n}function Tl(t,n,a,r){return t.baseState=a,Ps(t,je,typeof r=="function"?r:Kt)}function df(t,n,a,r,i){if(hr(t))throw Error(c(485));if(t=n.action,t!==null){var l={payload:i,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(d){l.listeners.push(d)}};C.T!==null?a(!0):l.isTransition=!1,r(l),a=n.pending,a===null?(l.next=n.pending=l,Rl(n,l)):(l.next=a.next,n.pending=a.next=l)}}function Rl(t,n){var a=n.action,r=n.payload,i=t.state;if(n.isTransition){var l=C.T,d={};C.T=d;try{var y=a(i,r),A=C.S;A!==null&&A(d,y),kl(t,n,y)}catch(T){ti(t,n,T)}finally{C.T=l}}else try{l=a(i,r),kl(t,n,l)}catch(T){ti(t,n,T)}}function kl(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Ml(t,n,r)},function(r){return ti(t,n,r)}):Ml(t,n,a)}function Ml(t,n,a){n.status="fulfilled",n.value=a,Cl(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Rl(t,a)))}function ti(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,Cl(n),n=n.next;while(n!==r)}t.action=null}function Cl(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function zl(t,n){return n}function ql(t,n){if(Se){var a=Ce.formState;if(a!==null){e:{var r=he;if(Se){if(Le){t:{for(var i=Le,l=$t;i.nodeType!==8;){if(!l){i=null;break t}if(i=Nt(i.nextSibling),i===null){i=null;break t}}l=i.data,i=l==="F!"||l==="F"?i:null}if(i){Le=Nt(i.nextSibling),r=i.data==="F!";break e}}Gn(r)}r=!1}r&&(n=a[0])}}return a=ct(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zl,lastRenderedState:n},a.queue=r,a=ep.bind(null,he,r),r.dispatch=a,r=ei(!1),l=si.bind(null,he,!1,r.queue),r=ct(),i={state:n,dispatch:null,action:t,pending:null},r.queue=i,a=df.bind(null,he,i,l,a),i.dispatch=a,r.memoizedState=t,[n,a,!1]}function Ll(t){var n=Ge();return Nl(n,je,t)}function Nl(t,n,a){if(n=Ps(t,n,zl)[0],t=ur(Kt)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=ca(n)}catch(d){throw d===na?ar:d}else r=n;n=Ge();var i=n.queue,l=i.dispatch;return a!==n.memoizedState&&(he.flags|=2048,vo(9,dr(),ff.bind(null,i,a),null)),[r,l,t]}function ff(t,n){t.action=n}function $l(t){var n=Ge(),a=je;if(a!==null)return Nl(n,a,t);Ge(),n=n.memoizedState,a=Ge();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function vo(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=he.updateQueue,n===null&&(n=Ks(),he.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function dr(){return{destroy:void 0,resource:void 0}}function Bl(){return Ge().memoizedState}function fr(t,n,a,r){var i=ct();r=r===void 0?null:r,he.flags|=t,i.memoizedState=vo(1|n,dr(),a,r)}function la(t,n,a,r){var i=Ge();r=r===void 0?null:r;var l=i.memoizedState.inst;je!==null&&r!==null&&Xs(r,je.memoizedState.deps)?i.memoizedState=vo(n,l,a,r):(he.flags|=t,i.memoizedState=vo(1|n,l,a,r))}function Ul(t,n){fr(8390656,8,t,n)}function Gl(t,n){la(2048,8,t,n)}function Fl(t,n){return la(4,2,t,n)}function Hl(t,n){return la(4,4,t,n)}function Yl(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Xl(t,n,a){a=a!=null?a.concat([t]):null,la(4,4,Yl.bind(null,n,t),a)}function ni(){}function Ql(t,n){var a=Ge();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Xs(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function Vl(t,n){var a=Ge();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Xs(n,r[1]))return r[0];if(r=t(),Xn){rn(!0);try{t()}finally{rn(!1)}}return a.memoizedState=[r,n],r}function oi(t,n,a){return a===void 0||(hn&1073741824)!==0?t.memoizedState=n:(t.memoizedState=a,t=Kp(),he.lanes|=t,wn|=t,a)}function Zl(t,n,a,r){return gt(a,n)?a:xo.current!==null?(t=oi(t,a,r),gt(t,n)||(Qe=!0),t):(hn&42)===0?(Qe=!0,t.memoizedState=a):(t=Kp(),he.lanes|=t,wn|=t,n)}function Il(t,n,a,r,i){var l=X.p;X.p=l!==0&&8>l?l:8;var d=C.T,y={};C.T=y,si(t,!1,n,a);try{var A=i(),T=C.S;if(T!==null&&T(y,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var $=lf(A,r);pa(t,n,$,wt(t))}else pa(t,n,r,wt(t))}catch(G){pa(t,n,{then:function(){},status:"rejected",reason:G},wt())}finally{X.p=l,C.T=d}}function hf(){}function ai(t,n,a,r){if(t.tag!==5)throw Error(c(476));var i=Kl(t).queue;Il(t,i,n,ne,a===null?hf:function(){return Jl(t),a(r)})}function Kl(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ne,baseState:ne,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Kt,lastRenderedState:ne},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Kt,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Jl(t){var n=Kl(t).next.queue;pa(t,n,{},wt())}function ri(){return nt(ja)}function Pl(){return Ge().memoizedState}function Wl(){return Ge().memoizedState}function mf(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=wt();t=dn(a);var r=fn(n,t,a);r!==null&&(At(r,n,a),aa(r,n,a)),n={cache:qs()},t.payload=n;return}n=n.return}}function gf(t,n,a){var r=wt();a={lane:r,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},hr(t)?tp(n,a):(a=Os(t,n,a,r),a!==null&&(At(a,t,r),np(a,n,r)))}function ep(t,n,a){var r=wt();pa(t,n,a,r)}function pa(t,n,a,r){var i={lane:r,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(hr(t))tp(n,i);else{var l=t.alternate;if(t.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var d=n.lastRenderedState,y=l(d,a);if(i.hasEagerState=!0,i.eagerState=y,gt(y,d))return Ia(t,n,i,0),Ce===null&&Za(),!1}catch{}finally{}if(a=Os(t,n,i,r),a!==null)return At(a,t,r),np(a,n,r),!0}return!1}function si(t,n,a,r){if(r={lane:2,revertLane:$i(),action:r,hasEagerState:!1,eagerState:null,next:null},hr(t)){if(n)throw Error(c(479))}else n=Os(t,a,r,2),n!==null&&At(n,t,2)}function hr(t){var n=t.alternate;return t===he||n!==null&&n===he}function tp(t,n){yo=ir=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function np(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,pc(t,a)}}var mr={readContext:nt,use:pr,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e},op={readContext:nt,use:pr,useCallback:function(t,n){return ct().memoizedState=[t,n===void 0?null:n],t},useContext:nt,useEffect:Ul,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,fr(4194308,4,Yl.bind(null,n,t),a)},useLayoutEffect:function(t,n){return fr(4194308,4,t,n)},useInsertionEffect:function(t,n){fr(4,2,t,n)},useMemo:function(t,n){var a=ct();n=n===void 0?null:n;var r=t();if(Xn){rn(!0);try{t()}finally{rn(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=ct();if(a!==void 0){var i=a(n);if(Xn){rn(!0);try{a(n)}finally{rn(!1)}}}else i=n;return r.memoizedState=r.baseState=i,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},r.queue=t,t=t.dispatch=gf.bind(null,he,t),[r.memoizedState,t]},useRef:function(t){var n=ct();return t={current:t},n.memoizedState=t},useState:function(t){t=ei(t);var n=t.queue,a=ep.bind(null,he,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:ni,useDeferredValue:function(t,n){var a=ct();return oi(a,t,n)},useTransition:function(){var t=ei(!1);return t=Il.bind(null,he,t.queue,!0,!1),ct().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=he,i=ct();if(Se){if(a===void 0)throw Error(c(407));a=a()}else{if(a=n(),Ce===null)throw Error(c(349));(ve&124)!==0||El(r,n,a)}i.memoizedState=a;var l={value:a,getSnapshot:n};return i.queue=l,Ul(Dl.bind(null,r,l,t),[t]),r.flags|=2048,vo(9,dr(),Ol.bind(null,r,l,a,n),null),a},useId:function(){var t=ct(),n=Ce.identifierPrefix;if(Se){var a=Vt,r=Qt;a=(r&~(1<<32-ft(r)-1)).toString(32)+a,n="«"+n+"R"+a,a=lr++,0<a&&(n+="H"+a.toString(32)),n+="»"}else a=pf++,n="«"+n+"r"+a.toString(32)+"»";return t.memoizedState=n},useHostTransitionStatus:ri,useFormState:ql,useActionState:ql,useOptimistic:function(t){var n=ct();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=si.bind(null,he,!0,a),a.dispatch=n,[t,n]},useMemoCache:Js,useCacheRefresh:function(){return ct().memoizedState=mf.bind(null,he)}},ap={readContext:nt,use:pr,useCallback:Ql,useContext:nt,useEffect:Gl,useImperativeHandle:Xl,useInsertionEffect:Fl,useLayoutEffect:Hl,useMemo:Vl,useReducer:ur,useRef:Bl,useState:function(){return ur(Kt)},useDebugValue:ni,useDeferredValue:function(t,n){var a=Ge();return Zl(a,je.memoizedState,t,n)},useTransition:function(){var t=ur(Kt)[0],n=Ge().memoizedState;return[typeof t=="boolean"?t:ca(t),n]},useSyncExternalStore:Sl,useId:Pl,useHostTransitionStatus:ri,useFormState:Ll,useActionState:Ll,useOptimistic:function(t,n){var a=Ge();return Tl(a,je,t,n)},useMemoCache:Js,useCacheRefresh:Wl},xf={readContext:nt,use:pr,useCallback:Ql,useContext:nt,useEffect:Gl,useImperativeHandle:Xl,useInsertionEffect:Fl,useLayoutEffect:Hl,useMemo:Vl,useReducer:Ws,useRef:Bl,useState:function(){return Ws(Kt)},useDebugValue:ni,useDeferredValue:function(t,n){var a=Ge();return je===null?oi(a,t,n):Zl(a,je.memoizedState,t,n)},useTransition:function(){var t=Ws(Kt)[0],n=Ge().memoizedState;return[typeof t=="boolean"?t:ca(t),n]},useSyncExternalStore:Sl,useId:Pl,useHostTransitionStatus:ri,useFormState:$l,useActionState:$l,useOptimistic:function(t,n){var a=Ge();return je!==null?Tl(a,je,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Js,useCacheRefresh:Wl},wo=null,ua=0;function gr(t){var n=ua;return ua+=1,wo===null&&(wo=[]),ml(wo,t,n)}function da(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function xr(t,n){throw n.$$typeof===v?Error(c(525)):(t=Object.prototype.toString.call(n),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function rp(t){var n=t._init;return n(t._payload)}function sp(t){function n(D,O){if(t){var j=D.deletions;j===null?(D.deletions=[O],D.flags|=16):j.push(O)}}function a(D,O){if(!t)return null;for(;O!==null;)n(D,O),O=O.sibling;return null}function r(D){for(var O=new Map;D!==null;)D.key!==null?O.set(D.key,D):O.set(D.index,D),D=D.sibling;return O}function i(D,O){return D=Xt(D,O),D.index=0,D.sibling=null,D}function l(D,O,j){return D.index=j,t?(j=D.alternate,j!==null?(j=j.index,j<O?(D.flags|=67108866,O):j):(D.flags|=67108866,O)):(D.flags|=1048576,O)}function d(D){return t&&D.alternate===null&&(D.flags|=67108866),D}function y(D,O,j,U){return O===null||O.tag!==6?(O=_s(j,D.mode,U),O.return=D,O):(O=i(O,j),O.return=D,O)}function A(D,O,j,U){var re=j.type;return re===_?$(D,O,j.props.children,U,j.key):O!==null&&(O.elementType===re||typeof re=="object"&&re!==null&&re.$$typeof===te&&rp(re)===O.type)?(O=i(O,j.props),da(O,j),O.return=D,O):(O=Ja(j.type,j.key,j.props,null,D.mode,U),da(O,j),O.return=D,O)}function T(D,O,j,U){return O===null||O.tag!==4||O.stateNode.containerInfo!==j.containerInfo||O.stateNode.implementation!==j.implementation?(O=js(j,D.mode,U),O.return=D,O):(O=i(O,j.children||[]),O.return=D,O)}function $(D,O,j,U,re){return O===null||O.tag!==7?(O=Nn(j,D.mode,U,re),O.return=D,O):(O=i(O,j),O.return=D,O)}function G(D,O,j){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return O=_s(""+O,D.mode,j),O.return=D,O;if(typeof O=="object"&&O!==null){switch(O.$$typeof){case S:return j=Ja(O.type,O.key,O.props,null,D.mode,j),da(j,O),j.return=D,j;case E:return O=js(O,D.mode,j),O.return=D,O;case te:var U=O._init;return O=U(O._payload),G(D,O,j)}if(ie(O)||K(O))return O=Nn(O,D.mode,j,null),O.return=D,O;if(typeof O.then=="function")return G(D,gr(O),j);if(O.$$typeof===L)return G(D,tr(D,O),j);xr(D,O)}return null}function k(D,O,j,U){var re=O!==null?O.key:null;if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return re!==null?null:y(D,O,""+j,U);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case S:return j.key===re?A(D,O,j,U):null;case E:return j.key===re?T(D,O,j,U):null;case te:return re=j._init,j=re(j._payload),k(D,O,j,U)}if(ie(j)||K(j))return re!==null?null:$(D,O,j,U,null);if(typeof j.then=="function")return k(D,O,gr(j),U);if(j.$$typeof===L)return k(D,O,tr(D,j),U);xr(D,j)}return null}function M(D,O,j,U,re){if(typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint")return D=D.get(j)||null,y(O,D,""+U,re);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case S:return D=D.get(U.key===null?j:U.key)||null,A(O,D,U,re);case E:return D=D.get(U.key===null?j:U.key)||null,T(O,D,U,re);case te:var ge=U._init;return U=ge(U._payload),M(D,O,j,U,re)}if(ie(U)||K(U))return D=D.get(j)||null,$(O,D,U,re,null);if(typeof U.then=="function")return M(D,O,j,gr(U),re);if(U.$$typeof===L)return M(D,O,j,tr(O,U),re);xr(O,U)}return null}function pe(D,O,j,U){for(var re=null,ge=null,se=O,le=O=0,Ze=null;se!==null&&le<j.length;le++){se.index>le?(Ze=se,se=null):Ze=se.sibling;var we=k(D,se,j[le],U);if(we===null){se===null&&(se=Ze);break}t&&se&&we.alternate===null&&n(D,se),O=l(we,O,le),ge===null?re=we:ge.sibling=we,ge=we,se=Ze}if(le===j.length)return a(D,se),Se&&Bn(D,le),re;if(se===null){for(;le<j.length;le++)se=G(D,j[le],U),se!==null&&(O=l(se,O,le),ge===null?re=se:ge.sibling=se,ge=se);return Se&&Bn(D,le),re}for(se=r(se);le<j.length;le++)Ze=M(se,D,le,j[le],U),Ze!==null&&(t&&Ze.alternate!==null&&se.delete(Ze.key===null?le:Ze.key),O=l(Ze,O,le),ge===null?re=Ze:ge.sibling=Ze,ge=Ze);return t&&se.forEach(function(Rn){return n(D,Rn)}),Se&&Bn(D,le),re}function ce(D,O,j,U){if(j==null)throw Error(c(151));for(var re=null,ge=null,se=O,le=O=0,Ze=null,we=j.next();se!==null&&!we.done;le++,we=j.next()){se.index>le?(Ze=se,se=null):Ze=se.sibling;var Rn=k(D,se,we.value,U);if(Rn===null){se===null&&(se=Ze);break}t&&se&&Rn.alternate===null&&n(D,se),O=l(Rn,O,le),ge===null?re=Rn:ge.sibling=Rn,ge=Rn,se=Ze}if(we.done)return a(D,se),Se&&Bn(D,le),re;if(se===null){for(;!we.done;le++,we=j.next())we=G(D,we.value,U),we!==null&&(O=l(we,O,le),ge===null?re=we:ge.sibling=we,ge=we);return Se&&Bn(D,le),re}for(se=r(se);!we.done;le++,we=j.next())we=M(se,D,le,we.value,U),we!==null&&(t&&we.alternate!==null&&se.delete(we.key===null?le:we.key),O=l(we,O,le),ge===null?re=we:ge.sibling=we,ge=we);return t&&se.forEach(function(bh){return n(D,bh)}),Se&&Bn(D,le),re}function Re(D,O,j,U){if(typeof j=="object"&&j!==null&&j.type===_&&j.key===null&&(j=j.props.children),typeof j=="object"&&j!==null){switch(j.$$typeof){case S:e:{for(var re=j.key;O!==null;){if(O.key===re){if(re=j.type,re===_){if(O.tag===7){a(D,O.sibling),U=i(O,j.props.children),U.return=D,D=U;break e}}else if(O.elementType===re||typeof re=="object"&&re!==null&&re.$$typeof===te&&rp(re)===O.type){a(D,O.sibling),U=i(O,j.props),da(U,j),U.return=D,D=U;break e}a(D,O);break}else n(D,O);O=O.sibling}j.type===_?(U=Nn(j.props.children,D.mode,U,j.key),U.return=D,D=U):(U=Ja(j.type,j.key,j.props,null,D.mode,U),da(U,j),U.return=D,D=U)}return d(D);case E:e:{for(re=j.key;O!==null;){if(O.key===re)if(O.tag===4&&O.stateNode.containerInfo===j.containerInfo&&O.stateNode.implementation===j.implementation){a(D,O.sibling),U=i(O,j.children||[]),U.return=D,D=U;break e}else{a(D,O);break}else n(D,O);O=O.sibling}U=js(j,D.mode,U),U.return=D,D=U}return d(D);case te:return re=j._init,j=re(j._payload),Re(D,O,j,U)}if(ie(j))return pe(D,O,j,U);if(K(j)){if(re=K(j),typeof re!="function")throw Error(c(150));return j=re.call(j),ce(D,O,j,U)}if(typeof j.then=="function")return Re(D,O,gr(j),U);if(j.$$typeof===L)return Re(D,O,tr(D,j),U);xr(D,j)}return typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint"?(j=""+j,O!==null&&O.tag===6?(a(D,O.sibling),U=i(O,j),U.return=D,D=U):(a(D,O),U=_s(j,D.mode,U),U.return=D,D=U),d(D)):a(D,O)}return function(D,O,j,U){try{ua=0;var re=Re(D,O,j,U);return wo=null,re}catch(se){if(se===na||se===ar)throw se;var ge=xt(29,se,null,D.mode);return ge.lanes=U,ge.return=D,ge}finally{}}}var Ao=sp(!0),ip=sp(!1),kt=N(null),Bt=null;function mn(t){var n=t.alternate;Q(He,He.current&1),Q(kt,t),Bt===null&&(n===null||xo.current!==null||n.memoizedState!==null)&&(Bt=t)}function cp(t){if(t.tag===22){if(Q(He,He.current),Q(kt,t),Bt===null){var n=t.alternate;n!==null&&n.memoizedState!==null&&(Bt=t)}}else gn()}function gn(){Q(He,He.current),Q(kt,kt.current)}function Jt(t){Z(kt),Bt===t&&(Bt=null),Z(He)}var He=N(0);function yr(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||Ki(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}function ii(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:b({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var ci={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=wt(),i=dn(r);i.payload=n,a!=null&&(i.callback=a),n=fn(t,i,r),n!==null&&(At(n,t,r),aa(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=wt(),i=dn(r);i.tag=1,i.payload=n,a!=null&&(i.callback=a),n=fn(t,i,r),n!==null&&(At(n,t,r),aa(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=wt(),r=dn(a);r.tag=2,n!=null&&(r.callback=n),n=fn(t,r,a),n!==null&&(At(n,t,a),aa(n,t,a))}};function lp(t,n,a,r,i,l,d){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,l,d):n.prototype&&n.prototype.isPureReactComponent?!Zo(a,r)||!Zo(i,l):!0}function pp(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&ci.enqueueReplaceState(n,n.state,null)}function Qn(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=b({},a));for(var i in t)a[i]===void 0&&(a[i]=t[i])}return a}var br=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function up(t){br(t)}function dp(t){console.error(t)}function fp(t){br(t)}function vr(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function hp(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function li(t,n,a){return a=dn(a),a.tag=3,a.payload={element:null},a.callback=function(){vr(t,n)},a}function mp(t){return t=dn(t),t.tag=3,t}function gp(t,n,a,r){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var l=r.value;t.payload=function(){return i(l)},t.callback=function(){hp(n,a,r)}}var d=a.stateNode;d!==null&&typeof d.componentDidCatch=="function"&&(t.callback=function(){hp(n,a,r),typeof i!="function"&&(An===null?An=new Set([this]):An.add(this));var y=r.stack;this.componentDidCatch(r.value,{componentStack:y!==null?y:""})})}function yf(t,n,a,r,i){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Wo(n,a,i,!0),a=kt.current,a!==null){switch(a.tag){case 13:return Bt===null?Ci():a.alternate===null&&Ne===0&&(Ne=3),a.flags&=-257,a.flags|=65536,a.lanes=i,r===$s?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),qi(t,r,i)),!1;case 22:return a.flags|=65536,r===$s?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),qi(t,r,i)),!1}throw Error(c(435,a.tag))}return qi(t,r,i),Ci(),!1}if(Se)return n=kt.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=i,r!==ks&&(t=Error(c(422),{cause:r}),Po(_t(t,a)))):(r!==ks&&(n=Error(c(423),{cause:r}),Po(_t(n,a))),t=t.current.alternate,t.flags|=65536,i&=-i,t.lanes|=i,r=_t(r,a),i=li(t.stateNode,r,i),Gs(t,i),Ne!==4&&(Ne=2)),!1;var l=Error(c(520),{cause:r});if(l=_t(l,a),ba===null?ba=[l]:ba.push(l),Ne!==4&&(Ne=2),n===null)return!0;r=_t(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=i&-i,a.lanes|=t,t=li(a.stateNode,r,t),Gs(a,t),!1;case 1:if(n=a.type,l=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(An===null||!An.has(l))))return a.flags|=65536,i&=-i,a.lanes|=i,i=mp(i),gp(i,t,a,r),Gs(a,i),!1}a=a.return}while(a!==null);return!1}var xp=Error(c(461)),Qe=!1;function Ke(t,n,a,r){n.child=t===null?ip(n,null,a,r):Ao(n,t.child,a,r)}function yp(t,n,a,r,i){a=a.render;var l=n.ref;if("ref"in r){var d={};for(var y in r)y!=="ref"&&(d[y]=r[y])}else d=r;return Hn(n),r=Qs(t,n,a,d,l,i),y=Vs(),t!==null&&!Qe?(Zs(t,n,i),Pt(t,n,i)):(Se&&y&&Ts(n),n.flags|=1,Ke(t,n,r,i),n.child)}function bp(t,n,a,r,i){if(t===null){var l=a.type;return typeof l=="function"&&!Ds(l)&&l.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=l,vp(t,n,l,r,i)):(t=Ja(a.type,null,r,n,n.mode,i),t.ref=n.ref,t.return=n,n.child=t)}if(l=t.child,!xi(t,i)){var d=l.memoizedProps;if(a=a.compare,a=a!==null?a:Zo,a(d,r)&&t.ref===n.ref)return Pt(t,n,i)}return n.flags|=1,t=Xt(l,r),t.ref=n.ref,t.return=n,n.child=t}function vp(t,n,a,r,i){if(t!==null){var l=t.memoizedProps;if(Zo(l,r)&&t.ref===n.ref)if(Qe=!1,n.pendingProps=r=l,xi(t,i))(t.flags&131072)!==0&&(Qe=!0);else return n.lanes=t.lanes,Pt(t,n,i)}return pi(t,n,a,r,i)}function wp(t,n,a){var r=n.pendingProps,i=r.children,l=t!==null?t.memoizedState:null;if(r.mode==="hidden"){if((n.flags&128)!==0){if(r=l!==null?l.baseLanes|a:a,t!==null){for(i=n.child=t.child,l=0;i!==null;)l=l|i.lanes|i.childLanes,i=i.sibling;n.childLanes=l&~r}else n.childLanes=0,n.child=null;return Ap(t,n,r,a)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&nr(n,l!==null?l.cachePool:null),l!==null?vl(n,l):Hs(),cp(n);else return n.lanes=n.childLanes=536870912,Ap(t,n,l!==null?l.baseLanes|a:a,a)}else l!==null?(nr(n,l.cachePool),vl(n,l),gn(),n.memoizedState=null):(t!==null&&nr(n,null),Hs(),gn());return Ke(t,n,i,a),n.child}function Ap(t,n,a,r){var i=Ns();return i=i===null?null:{parent:Fe._currentValue,pool:i},n.memoizedState={baseLanes:a,cachePool:i},t!==null&&nr(n,null),Hs(),cp(n),t!==null&&Wo(t,n,r,!0),null}function wr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function pi(t,n,a,r,i){return Hn(n),a=Qs(t,n,a,r,void 0,i),r=Vs(),t!==null&&!Qe?(Zs(t,n,i),Pt(t,n,i)):(Se&&r&&Ts(n),n.flags|=1,Ke(t,n,a,i),n.child)}function Sp(t,n,a,r,i,l){return Hn(n),n.updateQueue=null,a=Al(n,r,a,i),wl(t),r=Vs(),t!==null&&!Qe?(Zs(t,n,l),Pt(t,n,l)):(Se&&r&&Ts(n),n.flags|=1,Ke(t,n,a,l),n.child)}function Ep(t,n,a,r,i){if(Hn(n),n.stateNode===null){var l=uo,d=a.contextType;typeof d=="object"&&d!==null&&(l=nt(d)),l=new a(r,l),n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=ci,n.stateNode=l,l._reactInternals=n,l=n.stateNode,l.props=r,l.state=n.memoizedState,l.refs={},Bs(n),d=a.contextType,l.context=typeof d=="object"&&d!==null?nt(d):uo,l.state=n.memoizedState,d=a.getDerivedStateFromProps,typeof d=="function"&&(ii(n,a,d,r),l.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(d=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),d!==l.state&&ci.enqueueReplaceState(l,l.state,null),sa(n,r,l,i),ra(),l.state=n.memoizedState),typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){l=n.stateNode;var y=n.memoizedProps,A=Qn(a,y);l.props=A;var T=l.context,$=a.contextType;d=uo,typeof $=="object"&&$!==null&&(d=nt($));var G=a.getDerivedStateFromProps;$=typeof G=="function"||typeof l.getSnapshotBeforeUpdate=="function",y=n.pendingProps!==y,$||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(y||T!==d)&&pp(n,l,r,d),un=!1;var k=n.memoizedState;l.state=k,sa(n,r,l,i),ra(),T=n.memoizedState,y||k!==T||un?(typeof G=="function"&&(ii(n,a,G,r),T=n.memoizedState),(A=un||lp(n,a,A,r,k,T,d))?($||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=T),l.props=r,l.state=T,l.context=d,r=A):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,Us(t,n),d=n.memoizedProps,$=Qn(a,d),l.props=$,G=n.pendingProps,k=l.context,T=a.contextType,A=uo,typeof T=="object"&&T!==null&&(A=nt(T)),y=a.getDerivedStateFromProps,(T=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d!==G||k!==A)&&pp(n,l,r,A),un=!1,k=n.memoizedState,l.state=k,sa(n,r,l,i),ra();var M=n.memoizedState;d!==G||k!==M||un||t!==null&&t.dependencies!==null&&er(t.dependencies)?(typeof y=="function"&&(ii(n,a,y,r),M=n.memoizedState),($=un||lp(n,a,$,r,k,M,A)||t!==null&&t.dependencies!==null&&er(t.dependencies))?(T||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,M,A),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,M,A)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||d===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=M),l.props=r,l.state=M,l.context=A,r=$):(typeof l.componentDidUpdate!="function"||d===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),r=!1)}return l=r,wr(t,n),r=(n.flags&128)!==0,l||r?(l=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:l.render(),n.flags|=1,t!==null&&r?(n.child=Ao(n,t.child,null,i),n.child=Ao(n,null,a,i)):Ke(t,n,a,i),n.memoizedState=l.state,t=n.child):t=Pt(t,n,i),t}function Op(t,n,a,r){return Jo(),n.flags|=256,Ke(t,n,a,r),n.child}var ui={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function di(t){return{baseLanes:t,cachePool:dl()}}function fi(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Mt),t}function Dp(t,n,a){var r=n.pendingProps,i=!1,l=(n.flags&128)!==0,d;if((d=l)||(d=t!==null&&t.memoizedState===null?!1:(He.current&2)!==0),d&&(i=!0,n.flags&=-129),d=(n.flags&32)!==0,n.flags&=-33,t===null){if(Se){if(i?mn(n):gn(),Se){var y=Le,A;if(A=y){e:{for(A=y,y=$t;A.nodeType!==8;){if(!y){y=null;break e}if(A=Nt(A.nextSibling),A===null){y=null;break e}}y=A}y!==null?(n.memoizedState={dehydrated:y,treeContext:$n!==null?{id:Qt,overflow:Vt}:null,retryLane:536870912,hydrationErrors:null},A=xt(18,null,null,0),A.stateNode=y,A.return=n,n.child=A,ot=n,Le=null,A=!0):A=!1}A||Gn(n)}if(y=n.memoizedState,y!==null&&(y=y.dehydrated,y!==null))return Ki(y)?n.lanes=32:n.lanes=536870912,null;Jt(n)}return y=r.children,r=r.fallback,i?(gn(),i=n.mode,y=Ar({mode:"hidden",children:y},i),r=Nn(r,i,a,null),y.return=n,r.return=n,y.sibling=r,n.child=y,i=n.child,i.memoizedState=di(a),i.childLanes=fi(t,d,a),n.memoizedState=ui,r):(mn(n),hi(n,y))}if(A=t.memoizedState,A!==null&&(y=A.dehydrated,y!==null)){if(l)n.flags&256?(mn(n),n.flags&=-257,n=mi(t,n,a)):n.memoizedState!==null?(gn(),n.child=t.child,n.flags|=128,n=null):(gn(),i=r.fallback,y=n.mode,r=Ar({mode:"visible",children:r.children},y),i=Nn(i,y,a,null),i.flags|=2,r.return=n,i.return=n,r.sibling=i,n.child=r,Ao(n,t.child,null,a),r=n.child,r.memoizedState=di(a),r.childLanes=fi(t,d,a),n.memoizedState=ui,n=i);else if(mn(n),Ki(y)){if(d=y.nextSibling&&y.nextSibling.dataset,d)var T=d.dgst;d=T,r=Error(c(419)),r.stack="",r.digest=d,Po({value:r,source:null,stack:null}),n=mi(t,n,a)}else if(Qe||Wo(t,n,a,!1),d=(a&t.childLanes)!==0,Qe||d){if(d=Ce,d!==null&&(r=a&-a,r=(r&42)!==0?1:Kr(r),r=(r&(d.suspendedLanes|a))!==0?0:r,r!==0&&r!==A.retryLane))throw A.retryLane=r,po(t,r),At(d,t,r),xp;y.data==="$?"||Ci(),n=mi(t,n,a)}else y.data==="$?"?(n.flags|=192,n.child=t.child,n=null):(t=A.treeContext,Le=Nt(y.nextSibling),ot=n,Se=!0,Un=null,$t=!1,t!==null&&(Tt[Rt++]=Qt,Tt[Rt++]=Vt,Tt[Rt++]=$n,Qt=t.id,Vt=t.overflow,$n=n),n=hi(n,r.children),n.flags|=4096);return n}return i?(gn(),i=r.fallback,y=n.mode,A=t.child,T=A.sibling,r=Xt(A,{mode:"hidden",children:r.children}),r.subtreeFlags=A.subtreeFlags&65011712,T!==null?i=Xt(T,i):(i=Nn(i,y,a,null),i.flags|=2),i.return=n,r.return=n,r.sibling=i,n.child=r,r=i,i=n.child,y=t.child.memoizedState,y===null?y=di(a):(A=y.cachePool,A!==null?(T=Fe._currentValue,A=A.parent!==T?{parent:T,pool:T}:A):A=dl(),y={baseLanes:y.baseLanes|a,cachePool:A}),i.memoizedState=y,i.childLanes=fi(t,d,a),n.memoizedState=ui,r):(mn(n),a=t.child,t=a.sibling,a=Xt(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(d=n.deletions,d===null?(n.deletions=[t],n.flags|=16):d.push(t)),n.child=a,n.memoizedState=null,a)}function hi(t,n){return n=Ar({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Ar(t,n){return t=xt(22,t,null,n),t.lanes=0,t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},t}function mi(t,n,a){return Ao(n,t.child,null,a),t=hi(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function _p(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Cs(t.return,n,a)}function gi(t,n,a,r,i){var l=t.memoizedState;l===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=a,l.tailMode=i)}function jp(t,n,a){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(Ke(t,n,r.children,a),r=He.current,(r&2)!==0)r=r&1|2,n.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_p(t,a,n);else if(t.tag===19)_p(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}switch(Q(He,r),i){case"forwards":for(a=n.child,i=null;a!==null;)t=a.alternate,t!==null&&yr(t)===null&&(i=a),a=a.sibling;a=i,a===null?(i=n.child,n.child=null):(i=a.sibling,a.sibling=null),gi(n,!1,i,a,l);break;case"backwards":for(a=null,i=n.child,n.child=null;i!==null;){if(t=i.alternate,t!==null&&yr(t)===null){n.child=i;break}t=i.sibling,i.sibling=a,a=i,i=t}gi(n,!0,a,null,l);break;case"together":gi(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Pt(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),wn|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Wo(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(c(153));if(n.child!==null){for(t=n.child,a=Xt(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Xt(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function xi(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&er(t)))}function bf(t,n,a){switch(n.tag){case 3:be(n,n.stateNode.containerInfo),pn(n,Fe,t.memoizedState.cache),Jo();break;case 27:case 5:fe(n);break;case 4:be(n,n.stateNode.containerInfo);break;case 10:pn(n,n.type,n.memoizedProps.value);break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(mn(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Dp(t,n,a):(mn(n),t=Pt(t,n,a),t!==null?t.sibling:null);mn(n);break;case 19:var i=(t.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(Wo(t,n,a,!1),r=(a&n.childLanes)!==0),i){if(r)return jp(t,n,a);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Q(He,He.current),r)break;return null;case 22:case 23:return n.lanes=0,wp(t,n,a);case 24:pn(n,Fe,t.memoizedState.cache)}return Pt(t,n,a)}function Tp(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Qe=!0;else{if(!xi(t,a)&&(n.flags&128)===0)return Qe=!1,bf(t,n,a);Qe=(t.flags&131072)!==0}else Qe=!1,Se&&(n.flags&1048576)!==0&&rl(n,Wa,n.index);switch(n.lanes=0,n.tag){case 16:e:{t=n.pendingProps;var r=n.elementType,i=r._init;if(r=i(r._payload),n.type=r,typeof r=="function")Ds(r)?(t=Qn(r,t),n.tag=1,n=Ep(null,n,r,t,a)):(n.tag=0,n=pi(null,n,r,t,a));else{if(r!=null){if(i=r.$$typeof,i===I){n.tag=11,n=yp(null,n,r,t,a);break e}else if(i===F){n.tag=14,n=bp(null,n,r,t,a);break e}}throw n=de(r)||r,Error(c(306,n,""))}}return n;case 0:return pi(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,i=Qn(r,n.pendingProps),Ep(t,n,r,i,a);case 3:e:{if(be(n,n.stateNode.containerInfo),t===null)throw Error(c(387));r=n.pendingProps;var l=n.memoizedState;i=l.element,Us(t,n),sa(n,r,null,a);var d=n.memoizedState;if(r=d.cache,pn(n,Fe,r),r!==l.cache&&zs(n,[Fe],a,!0),ra(),r=d.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:d.cache},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){n=Op(t,n,r,a);break e}else if(r!==i){i=_t(Error(c(424)),n),Po(i),n=Op(t,n,r,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Le=Nt(t.firstChild),ot=n,Se=!0,Un=null,$t=!0,a=ip(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Jo(),r===i){n=Pt(t,n,a);break e}Ke(t,n,r,a)}n=n.child}return n;case 26:return wr(t,n),t===null?(a=Cu(n.type,null,n.pendingProps,null))?n.memoizedState=a:Se||(a=n.type,t=n.pendingProps,r=Lr(ae.current).createElement(a),r[tt]=n,r[st]=t,Pe(r,a,t),Xe(r),n.stateNode=r):n.memoizedState=Cu(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return fe(n),t===null&&Se&&(r=n.stateNode=Ru(n.type,n.pendingProps,ae.current),ot=n,$t=!0,i=Le,On(n.type)?(Ji=i,Le=Nt(r.firstChild)):Le=i),Ke(t,n,n.pendingProps.children,a),wr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Se&&((i=r=Le)&&(r=Vf(r,n.type,n.pendingProps,$t),r!==null?(n.stateNode=r,ot=n,Le=Nt(r.firstChild),$t=!1,i=!0):i=!1),i||Gn(n)),fe(n),i=n.type,l=n.pendingProps,d=t!==null?t.memoizedProps:null,r=l.children,Vi(i,l)?r=null:d!==null&&Vi(i,d)&&(n.flags|=32),n.memoizedState!==null&&(i=Qs(t,n,uf,null,null,a),ja._currentValue=i),wr(t,n),Ke(t,n,r,a),n.child;case 6:return t===null&&Se&&((t=a=Le)&&(a=Zf(a,n.pendingProps,$t),a!==null?(n.stateNode=a,ot=n,Le=null,t=!0):t=!1),t||Gn(n)),null;case 13:return Dp(t,n,a);case 4:return be(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Ao(n,null,r,a):Ke(t,n,r,a),n.child;case 11:return yp(t,n,n.type,n.pendingProps,a);case 7:return Ke(t,n,n.pendingProps,a),n.child;case 8:return Ke(t,n,n.pendingProps.children,a),n.child;case 12:return Ke(t,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,pn(n,n.type,r.value),Ke(t,n,r.children,a),n.child;case 9:return i=n.type._context,r=n.pendingProps.children,Hn(n),i=nt(i),r=r(i),n.flags|=1,Ke(t,n,r,a),n.child;case 14:return bp(t,n,n.type,n.pendingProps,a);case 15:return vp(t,n,n.type,n.pendingProps,a);case 19:return jp(t,n,a);case 31:return r=n.pendingProps,a=n.mode,r={mode:r.mode,children:r.children},t===null?(a=Ar(r,a),a.ref=n.ref,n.child=a,a.return=n,n=a):(a=Xt(t.child,r),a.ref=n.ref,n.child=a,a.return=n,n=a),n;case 22:return wp(t,n,a);case 24:return Hn(n),r=nt(Fe),t===null?(i=Ns(),i===null&&(i=Ce,l=qs(),i.pooledCache=l,l.refCount++,l!==null&&(i.pooledCacheLanes|=a),i=l),n.memoizedState={parent:r,cache:i},Bs(n),pn(n,Fe,i)):((t.lanes&a)!==0&&(Us(t,n),sa(n,null,null,a),ra()),i=t.memoizedState,l=n.memoizedState,i.parent!==r?(i={parent:r,cache:r},n.memoizedState=i,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=i),pn(n,Fe,r)):(r=l.cache,pn(n,Fe,r),r!==i.cache&&zs(n,[Fe],a,!0))),Ke(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(c(156,n.tag))}function Wt(t){t.flags|=4}function Rp(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!$u(n)){if(n=kt.current,n!==null&&((ve&4194048)===ve?Bt!==null:(ve&62914560)!==ve&&(ve&536870912)===0||n!==Bt))throw oa=$s,fl;t.flags|=8192}}function Sr(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?cc():536870912,t.lanes|=n,Do|=n)}function fa(t,n){if(!Se)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function qe(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var i=t.child;i!==null;)a|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)a|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function vf(t,n,a){var r=n.pendingProps;switch(Rs(n),n.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(n),null;case 1:return qe(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),It(Fe),Ie(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Ko(n)?Wt(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,cl())),qe(n),null;case 26:return a=n.memoizedState,t===null?(Wt(n),a!==null?(qe(n),Rp(n,a)):(qe(n),n.flags&=-16777217)):a?a!==t.memoizedState?(Wt(n),qe(n),Rp(n,a)):(qe(n),n.flags&=-16777217):(t.memoizedProps!==r&&Wt(n),qe(n),n.flags&=-16777217),null;case 27:Ee(n),a=ae.current;var i=n.type;if(t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Wt(n);else{if(!r){if(n.stateNode===null)throw Error(c(166));return qe(n),null}t=J.current,Ko(n)?sl(n):(t=Ru(i,r,a),n.stateNode=t,Wt(n))}return qe(n),null;case 5:if(Ee(n),a=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Wt(n);else{if(!r){if(n.stateNode===null)throw Error(c(166));return qe(n),null}if(t=J.current,Ko(n))sl(n);else{switch(i=Lr(ae.current),t){case 1:t=i.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:t=i.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":t=i.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":t=i.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":t=i.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild);break;case"select":t=typeof r.is=="string"?i.createElement("select",{is:r.is}):i.createElement("select"),r.multiple?t.multiple=!0:r.size&&(t.size=r.size);break;default:t=typeof r.is=="string"?i.createElement(a,{is:r.is}):i.createElement(a)}}t[tt]=n,t[st]=r;e:for(i=n.child;i!==null;){if(i.tag===5||i.tag===6)t.appendChild(i.stateNode);else if(i.tag!==4&&i.tag!==27&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break e;for(;i.sibling===null;){if(i.return===null||i.return===n)break e;i=i.return}i.sibling.return=i.return,i=i.sibling}n.stateNode=t;e:switch(Pe(t,a,r),a){case"button":case"input":case"select":case"textarea":t=!!r.autoFocus;break e;case"img":t=!0;break e;default:t=!1}t&&Wt(n)}}return qe(n),n.flags&=-16777217,null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Wt(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(c(166));if(t=ae.current,Ko(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,i=ot,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}t[tt]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||Su(t.nodeValue,a)),t||Gn(n)}else t=Lr(t).createTextNode(r),t[tt]=n,n.stateNode=t}return qe(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(i=Ko(n),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(c(318));if(i=n.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(c(317));i[tt]=n}else Jo(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),i=!1}else i=cl(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=i),i=!0;if(!i)return n.flags&256?(Jt(n),n):(Jt(n),null)}if(Jt(n),(n.flags&128)!==0)return n.lanes=a,n;if(a=r!==null,t=t!==null&&t.memoizedState!==null,a){r=n.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool);var l=null;r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(l=r.memoizedState.cachePool.pool),l!==i&&(r.flags|=2048)}return a!==t&&a&&(n.child.flags|=8192),Sr(n,n.updateQueue),qe(n),null;case 4:return Ie(),t===null&&Fi(n.stateNode.containerInfo),qe(n),null;case 10:return It(n.type),qe(n),null;case 19:if(Z(He),i=n.memoizedState,i===null)return qe(n),null;if(r=(n.flags&128)!==0,l=i.rendering,l===null)if(r)fa(i,!1);else{if(Ne!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(l=yr(t),l!==null){for(n.flags|=128,fa(i,!1),t=l.updateQueue,n.updateQueue=t,Sr(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)al(a,t),a=a.sibling;return Q(He,He.current&1|2),n.child}t=t.sibling}i.tail!==null&&me()>Dr&&(n.flags|=128,r=!0,fa(i,!1),n.lanes=4194304)}else{if(!r)if(t=yr(l),t!==null){if(n.flags|=128,r=!0,t=t.updateQueue,n.updateQueue=t,Sr(n,t),fa(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!Se)return qe(n),null}else 2*me()-i.renderingStartTime>Dr&&a!==536870912&&(n.flags|=128,r=!0,fa(i,!1),n.lanes=4194304);i.isBackwards?(l.sibling=n.child,n.child=l):(t=i.last,t!==null?t.sibling=l:n.child=l,i.last=l)}return i.tail!==null?(n=i.tail,i.rendering=n,i.tail=n.sibling,i.renderingStartTime=me(),n.sibling=null,t=He.current,Q(He,r?t&1|2:t&1),n):(qe(n),null);case 22:case 23:return Jt(n),Ys(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(qe(n),n.subtreeFlags&6&&(n.flags|=8192)):qe(n),a=n.updateQueue,a!==null&&Sr(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&Z(Yn),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),It(Fe),qe(n),null;case 25:return null;case 30:return null}throw Error(c(156,n.tag))}function wf(t,n){switch(Rs(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return It(Fe),Ie(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Ee(n),null;case 13:if(Jt(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(c(340));Jo()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Z(He),null;case 4:return Ie(),null;case 10:return It(n.type),null;case 22:case 23:return Jt(n),Ys(),t!==null&&Z(Yn),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return It(Fe),null;case 25:return null;default:return null}}function kp(t,n){switch(Rs(n),n.tag){case 3:It(Fe),Ie();break;case 26:case 27:case 5:Ee(n);break;case 4:Ie();break;case 13:Jt(n);break;case 19:Z(He);break;case 10:It(n.type);break;case 22:case 23:Jt(n),Ys(),t!==null&&Z(Yn);break;case 24:It(Fe)}}function ha(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var i=r.next;a=i;do{if((a.tag&t)===t){r=void 0;var l=a.create,d=a.inst;r=l(),d.destroy=r}a=a.next}while(a!==i)}}catch(y){ke(n,n.return,y)}}function xn(t,n,a){try{var r=n.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var l=i.next;r=l;do{if((r.tag&t)===t){var d=r.inst,y=d.destroy;if(y!==void 0){d.destroy=void 0,i=n;var A=a,T=y;try{T()}catch($){ke(i,A,$)}}}r=r.next}while(r!==l)}}catch($){ke(n,n.return,$)}}function Mp(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{bl(n,a)}catch(r){ke(t,t.return,r)}}}function Cp(t,n,a){a.props=Qn(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){ke(t,n,r)}}function ma(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(i){ke(t,n,i)}}function Ut(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(i){ke(t,n,i)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){ke(t,n,i)}else a.current=null}function zp(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break e;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(i){ke(t,t.return,i)}}function yi(t,n,a){try{var r=t.stateNode;Ff(r,t.type,a,n),r[st]=n}catch(i){ke(t,t.return,i)}}function qp(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&On(t.type)||t.tag===4}function bi(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||qp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&On(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function vi(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=qr));else if(r!==4&&(r===27&&On(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(vi(t,n,a),t=t.sibling;t!==null;)vi(t,n,a),t=t.sibling}function Er(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(r!==4&&(r===27&&On(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Er(t,n,a),t=t.sibling;t!==null;)Er(t,n,a),t=t.sibling}function Lp(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,i=n.attributes;i.length;)n.removeAttributeNode(i[0]);Pe(n,r,a),n[tt]=t,n[st]=a}catch(l){ke(t,t.return,l)}}var en=!1,Be=!1,wi=!1,Np=typeof WeakSet=="function"?WeakSet:Set,Ve=null;function Af(t,n){if(t=t.containerInfo,Xi=Fr,t=Zc(t),bs(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{a.nodeType,l.nodeType}catch{a=null;break e}var d=0,y=-1,A=-1,T=0,$=0,G=t,k=null;t:for(;;){for(var M;G!==a||i!==0&&G.nodeType!==3||(y=d+i),G!==l||r!==0&&G.nodeType!==3||(A=d+r),G.nodeType===3&&(d+=G.nodeValue.length),(M=G.firstChild)!==null;)k=G,G=M;for(;;){if(G===t)break t;if(k===a&&++T===i&&(y=d),k===l&&++$===r&&(A=d),(M=G.nextSibling)!==null)break;G=k,k=G.parentNode}G=M}a=y===-1||A===-1?null:{start:y,end:A}}else a=null}a=a||{start:0,end:0}}else a=null;for(Qi={focusedElem:t,selectionRange:a},Fr=!1,Ve=n;Ve!==null;)if(n=Ve,t=n.child,(n.subtreeFlags&1024)!==0&&t!==null)t.return=n,Ve=t;else for(;Ve!==null;){switch(n=Ve,l=n.alternate,t=n.flags,n.tag){case 0:break;case 11:case 15:break;case 1:if((t&1024)!==0&&l!==null){t=void 0,a=n,i=l.memoizedProps,l=l.memoizedState,r=a.stateNode;try{var pe=Qn(a.type,i,a.elementType===a.type);t=r.getSnapshotBeforeUpdate(pe,l),r.__reactInternalSnapshotBeforeUpdate=t}catch(ce){ke(a,a.return,ce)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Ii(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Ii(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=n.sibling,t!==null){t.return=n.return,Ve=t;break}Ve=n.return}}function $p(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:yn(t,a),r&4&&ha(5,a);break;case 1:if(yn(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(d){ke(a,a.return,d)}else{var i=Qn(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(i,n,t.__reactInternalSnapshotBeforeUpdate)}catch(d){ke(a,a.return,d)}}r&64&&Mp(a),r&512&&ma(a,a.return);break;case 3:if(yn(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{bl(t,n)}catch(d){ke(a,a.return,d)}}break;case 27:n===null&&r&4&&Lp(a);case 26:case 5:yn(t,a),n===null&&r&4&&zp(a),r&512&&ma(a,a.return);break;case 12:yn(t,a);break;case 13:yn(t,a),r&4&&Gp(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=kf.bind(null,a),If(t,a))));break;case 22:if(r=a.memoizedState!==null||en,!r){n=n!==null&&n.memoizedState!==null||Be,i=en;var l=Be;en=r,(Be=n)&&!l?bn(t,a,(a.subtreeFlags&8772)!==0):yn(t,a),en=i,Be=l}break;case 30:break;default:yn(t,a)}}function Bp(t){var n=t.alternate;n!==null&&(t.alternate=null,Bp(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Wr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var ze=null,pt=!1;function tn(t,n,a){for(a=a.child;a!==null;)Up(t,n,a),a=a.sibling}function Up(t,n,a){if(dt&&typeof dt.onCommitFiberUnmount=="function")try{dt.onCommitFiberUnmount(Lo,a)}catch{}switch(a.tag){case 26:Be||Ut(a,n),tn(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Be||Ut(a,n);var r=ze,i=pt;On(a.type)&&(ze=a.stateNode,pt=!1),tn(t,n,a),Ea(a.stateNode),ze=r,pt=i;break;case 5:Be||Ut(a,n);case 6:if(r=ze,i=pt,ze=null,tn(t,n,a),ze=r,pt=i,ze!==null)if(pt)try{(ze.nodeType===9?ze.body:ze.nodeName==="HTML"?ze.ownerDocument.body:ze).removeChild(a.stateNode)}catch(l){ke(a,n,l)}else try{ze.removeChild(a.stateNode)}catch(l){ke(a,n,l)}break;case 18:ze!==null&&(pt?(t=ze,ju(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Ma(t)):ju(ze,a.stateNode));break;case 4:r=ze,i=pt,ze=a.stateNode.containerInfo,pt=!0,tn(t,n,a),ze=r,pt=i;break;case 0:case 11:case 14:case 15:Be||xn(2,a,n),Be||xn(4,a,n),tn(t,n,a);break;case 1:Be||(Ut(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&Cp(a,n,r)),tn(t,n,a);break;case 21:tn(t,n,a);break;case 22:Be=(r=Be)||a.memoizedState!==null,tn(t,n,a),Be=r;break;default:tn(t,n,a)}}function Gp(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ma(t)}catch(a){ke(n,n.return,a)}}function Sf(t){switch(t.tag){case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Np),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Np),n;default:throw Error(c(435,t.tag))}}function Ai(t,n){var a=Sf(t);n.forEach(function(r){var i=Mf.bind(null,t,r);a.has(r)||(a.add(r),r.then(i,i))})}function yt(t,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var i=a[r],l=t,d=n,y=d;e:for(;y!==null;){switch(y.tag){case 27:if(On(y.type)){ze=y.stateNode,pt=!1;break e}break;case 5:ze=y.stateNode,pt=!1;break e;case 3:case 4:ze=y.stateNode.containerInfo,pt=!0;break e}y=y.return}if(ze===null)throw Error(c(160));Up(l,d,i),ze=null,pt=!1,l=i.alternate,l!==null&&(l.return=null),i.return=null}if(n.subtreeFlags&13878)for(n=n.child;n!==null;)Fp(n,t),n=n.sibling}var Lt=null;function Fp(t,n){var a=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:yt(n,t),bt(t),r&4&&(xn(3,t,t.return),ha(3,t),xn(5,t,t.return));break;case 1:yt(n,t),bt(t),r&512&&(Be||a===null||Ut(a,a.return)),r&64&&en&&(t=t.updateQueue,t!==null&&(r=t.callbacks,r!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var i=Lt;if(yt(n,t),bt(t),r&512&&(Be||a===null||Ut(a,a.return)),r&4){var l=a!==null?a.memoizedState:null;if(r=t.memoizedState,a===null)if(r===null)if(t.stateNode===null){e:{r=t.type,a=t.memoizedProps,i=i.ownerDocument||i;t:switch(r){case"title":l=i.getElementsByTagName("title")[0],(!l||l[Bo]||l[tt]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=i.createElement(r),i.head.insertBefore(l,i.querySelector("head > title"))),Pe(l,r,a),l[tt]=t,Xe(l),r=l;break e;case"link":var d=Lu("link","href",i).get(r+(a.href||""));if(d){for(var y=0;y<d.length;y++)if(l=d[y],l.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&l.getAttribute("rel")===(a.rel==null?null:a.rel)&&l.getAttribute("title")===(a.title==null?null:a.title)&&l.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){d.splice(y,1);break t}}l=i.createElement(r),Pe(l,r,a),i.head.appendChild(l);break;case"meta":if(d=Lu("meta","content",i).get(r+(a.content||""))){for(y=0;y<d.length;y++)if(l=d[y],l.getAttribute("content")===(a.content==null?null:""+a.content)&&l.getAttribute("name")===(a.name==null?null:a.name)&&l.getAttribute("property")===(a.property==null?null:a.property)&&l.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&l.getAttribute("charset")===(a.charSet==null?null:a.charSet)){d.splice(y,1);break t}}l=i.createElement(r),Pe(l,r,a),i.head.appendChild(l);break;default:throw Error(c(468,r))}l[tt]=t,Xe(l),r=l}t.stateNode=r}else Nu(i,t.type,t.stateNode);else t.stateNode=qu(i,r,t.memoizedProps);else l!==r?(l===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):l.count--,r===null?Nu(i,t.type,t.stateNode):qu(i,r,t.memoizedProps)):r===null&&t.stateNode!==null&&yi(t,t.memoizedProps,a.memoizedProps)}break;case 27:yt(n,t),bt(t),r&512&&(Be||a===null||Ut(a,a.return)),a!==null&&r&4&&yi(t,t.memoizedProps,a.memoizedProps);break;case 5:if(yt(n,t),bt(t),r&512&&(Be||a===null||Ut(a,a.return)),t.flags&32){i=t.stateNode;try{oo(i,"")}catch(M){ke(t,t.return,M)}}r&4&&t.stateNode!=null&&(i=t.memoizedProps,yi(t,i,a!==null?a.memoizedProps:i)),r&1024&&(wi=!0);break;case 6:if(yt(n,t),bt(t),r&4){if(t.stateNode===null)throw Error(c(162));r=t.memoizedProps,a=t.stateNode;try{a.nodeValue=r}catch(M){ke(t,t.return,M)}}break;case 3:if(Br=null,i=Lt,Lt=Nr(n.containerInfo),yt(n,t),Lt=i,bt(t),r&4&&a!==null&&a.memoizedState.isDehydrated)try{Ma(n.containerInfo)}catch(M){ke(t,t.return,M)}wi&&(wi=!1,Hp(t));break;case 4:r=Lt,Lt=Nr(t.stateNode.containerInfo),yt(n,t),bt(t),Lt=r;break;case 12:yt(n,t),bt(t);break;case 13:yt(n,t),bt(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ji=me()),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,Ai(t,r)));break;case 22:i=t.memoizedState!==null;var A=a!==null&&a.memoizedState!==null,T=en,$=Be;if(en=T||i,Be=$||A,yt(n,t),Be=$,en=T,bt(t),r&8192)e:for(n=t.stateNode,n._visibility=i?n._visibility&-2:n._visibility|1,i&&(a===null||A||en||Be||Vn(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){A=a=n;try{if(l=A.stateNode,i)d=l.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{y=A.stateNode;var G=A.memoizedProps.style,k=G!=null&&G.hasOwnProperty("display")?G.display:null;y.style.display=k==null||typeof k=="boolean"?"":(""+k).trim()}}catch(M){ke(A,A.return,M)}}}else if(n.tag===6){if(a===null){A=n;try{A.stateNode.nodeValue=i?"":A.memoizedProps}catch(M){ke(A,A.return,M)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=t.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,Ai(t,a))));break;case 19:yt(n,t),bt(t),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,Ai(t,r)));break;case 30:break;case 21:break;default:yt(n,t),bt(t)}}function bt(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(qp(r)){a=r;break}r=r.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var i=a.stateNode,l=bi(t);Er(t,l,i);break;case 5:var d=a.stateNode;a.flags&32&&(oo(d,""),a.flags&=-33);var y=bi(t);Er(t,y,d);break;case 3:case 4:var A=a.stateNode.containerInfo,T=bi(t);vi(t,T,A);break;default:throw Error(c(161))}}catch($){ke(t,t.return,$)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Hp(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Hp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function yn(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)$p(t,n.alternate,n),n=n.sibling}function Vn(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:xn(4,n,n.return),Vn(n);break;case 1:Ut(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Cp(n,n.return,a),Vn(n);break;case 27:Ea(n.stateNode);case 26:case 5:Ut(n,n.return),Vn(n);break;case 22:n.memoizedState===null&&Vn(n);break;case 30:Vn(n);break;default:Vn(n)}t=t.sibling}}function bn(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,i=t,l=n,d=l.flags;switch(l.tag){case 0:case 11:case 15:bn(i,l,a),ha(4,l);break;case 1:if(bn(i,l,a),r=l,i=r.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(T){ke(r,r.return,T)}if(r=l,i=r.updateQueue,i!==null){var y=r.stateNode;try{var A=i.shared.hiddenCallbacks;if(A!==null)for(i.shared.hiddenCallbacks=null,i=0;i<A.length;i++)yl(A[i],y)}catch(T){ke(r,r.return,T)}}a&&d&64&&Mp(l),ma(l,l.return);break;case 27:Lp(l);case 26:case 5:bn(i,l,a),a&&r===null&&d&4&&zp(l),ma(l,l.return);break;case 12:bn(i,l,a);break;case 13:bn(i,l,a),a&&d&4&&Gp(i,l);break;case 22:l.memoizedState===null&&bn(i,l,a),ma(l,l.return);break;case 30:break;default:bn(i,l,a)}n=n.sibling}}function Si(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&ea(a))}function Ei(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ea(t))}function Gt(t,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Yp(t,n,a,r),n=n.sibling}function Yp(t,n,a,r){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Gt(t,n,a,r),i&2048&&ha(9,n);break;case 1:Gt(t,n,a,r);break;case 3:Gt(t,n,a,r),i&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ea(t)));break;case 12:if(i&2048){Gt(t,n,a,r),t=n.stateNode;try{var l=n.memoizedProps,d=l.id,y=l.onPostCommit;typeof y=="function"&&y(d,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(A){ke(n,n.return,A)}}else Gt(t,n,a,r);break;case 13:Gt(t,n,a,r);break;case 23:break;case 22:l=n.stateNode,d=n.alternate,n.memoizedState!==null?l._visibility&2?Gt(t,n,a,r):ga(t,n):l._visibility&2?Gt(t,n,a,r):(l._visibility|=2,So(t,n,a,r,(n.subtreeFlags&10256)!==0)),i&2048&&Si(d,n);break;case 24:Gt(t,n,a,r),i&2048&&Ei(n.alternate,n);break;default:Gt(t,n,a,r)}}function So(t,n,a,r,i){for(i=i&&(n.subtreeFlags&10256)!==0,n=n.child;n!==null;){var l=t,d=n,y=a,A=r,T=d.flags;switch(d.tag){case 0:case 11:case 15:So(l,d,y,A,i),ha(8,d);break;case 23:break;case 22:var $=d.stateNode;d.memoizedState!==null?$._visibility&2?So(l,d,y,A,i):ga(l,d):($._visibility|=2,So(l,d,y,A,i)),i&&T&2048&&Si(d.alternate,d);break;case 24:So(l,d,y,A,i),i&&T&2048&&Ei(d.alternate,d);break;default:So(l,d,y,A,i)}n=n.sibling}}function ga(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,i=r.flags;switch(r.tag){case 22:ga(a,r),i&2048&&Si(r.alternate,r);break;case 24:ga(a,r),i&2048&&Ei(r.alternate,r);break;default:ga(a,r)}n=n.sibling}}var xa=8192;function Eo(t){if(t.subtreeFlags&xa)for(t=t.child;t!==null;)Xp(t),t=t.sibling}function Xp(t){switch(t.tag){case 26:Eo(t),t.flags&xa&&t.memoizedState!==null&&ch(Lt,t.memoizedState,t.memoizedProps);break;case 5:Eo(t);break;case 3:case 4:var n=Lt;Lt=Nr(t.stateNode.containerInfo),Eo(t),Lt=n;break;case 22:t.memoizedState===null&&(n=t.alternate,n!==null&&n.memoizedState!==null?(n=xa,xa=16777216,Eo(t),xa=n):Eo(t));break;default:Eo(t)}}function Qp(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function ya(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];Ve=r,Zp(r,t)}Qp(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Vp(t),t=t.sibling}function Vp(t){switch(t.tag){case 0:case 11:case 15:ya(t),t.flags&2048&&xn(9,t,t.return);break;case 3:ya(t);break;case 12:ya(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Or(t)):ya(t);break;default:ya(t)}}function Or(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];Ve=r,Zp(r,t)}Qp(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:xn(8,n,n.return),Or(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Or(n));break;default:Or(n)}t=t.sibling}}function Zp(t,n){for(;Ve!==null;){var a=Ve;switch(a.tag){case 0:case 11:case 15:xn(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ea(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,Ve=r;else e:for(a=t;Ve!==null;){r=Ve;var i=r.sibling,l=r.return;if(Bp(r),r===a){Ve=null;break e}if(i!==null){i.return=l,Ve=i;break e}Ve=l}}}var Ef={getCacheForType:function(t){var n=nt(Fe),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a}},Of=typeof WeakMap=="function"?WeakMap:Map,De=0,Ce=null,xe=null,ve=0,_e=0,vt=null,vn=!1,Oo=!1,Oi=!1,nn=0,Ne=0,wn=0,Zn=0,Di=0,Mt=0,Do=0,ba=null,ut=null,_i=!1,ji=0,Dr=1/0,_r=null,An=null,Je=0,Sn=null,_o=null,jo=0,Ti=0,Ri=null,Ip=null,va=0,ki=null;function wt(){if((De&2)!==0&&ve!==0)return ve&-ve;if(C.T!==null){var t=mo;return t!==0?t:$i()}return uc()}function Kp(){Mt===0&&(Mt=(ve&536870912)===0||Se?ic():536870912);var t=kt.current;return t!==null&&(t.flags|=32),Mt}function At(t,n,a){(t===Ce&&(_e===2||_e===9)||t.cancelPendingCommit!==null)&&(To(t,0),En(t,ve,Mt,!1)),$o(t,a),((De&2)===0||t!==Ce)&&(t===Ce&&((De&2)===0&&(Zn|=a),Ne===4&&En(t,ve,Mt,!1)),Ft(t))}function Jp(t,n,a){if((De&6)!==0)throw Error(c(327));var r=!a&&(n&124)===0&&(n&t.expiredLanes)===0||No(t,n),i=r?jf(t,n):zi(t,n,!0),l=r;do{if(i===0){Oo&&!r&&En(t,n,0,!1);break}else{if(a=t.current.alternate,l&&!Df(a)){i=zi(t,n,!1),l=!1;continue}if(i===2){if(l=n,t.errorRecoveryDisabledLanes&l)var d=0;else d=t.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){n=d;e:{var y=t;i=ba;var A=y.current.memoizedState.isDehydrated;if(A&&(To(y,d).flags|=256),d=zi(y,d,!1),d!==2){if(Oi&&!A){y.errorRecoveryDisabledLanes|=l,Zn|=l,i=4;break e}l=ut,ut=i,l!==null&&(ut===null?ut=l:ut.push.apply(ut,l))}i=d}if(l=!1,i!==2)continue}}if(i===1){To(t,0),En(t,n,0,!0);break}e:{switch(r=t,l=i,l){case 0:case 1:throw Error(c(345));case 4:if((n&4194048)!==n)break;case 6:En(r,n,Mt,!vn);break e;case 2:ut=null;break;case 3:case 5:break;default:throw Error(c(329))}if((n&62914560)===n&&(i=ji+300-me(),10<i)){if(En(r,n,Mt,!vn),La(r,0,!0)!==0)break e;r.timeoutHandle=Du(Pp.bind(null,r,a,ut,_r,_i,n,Mt,Zn,Do,vn,l,2,-0,0),i);break e}Pp(r,a,ut,_r,_i,n,Mt,Zn,Do,vn,l,0,-0,0)}}break}while(!0);Ft(t)}function Pp(t,n,a,r,i,l,d,y,A,T,$,G,k,M){if(t.timeoutHandle=-1,G=n.subtreeFlags,(G&8192||(G&16785408)===16785408)&&(_a={stylesheets:null,count:0,unsuspend:ih},Xp(n),G=lh(),G!==null)){t.cancelPendingCommit=G(ru.bind(null,t,n,l,a,r,i,d,y,A,$,1,k,M)),En(t,l,d,!T);return}ru(t,n,l,a,r,i,d,y,A)}function Df(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var i=a[r],l=i.getSnapshot;i=i.value;try{if(!gt(l(),i))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function En(t,n,a,r){n&=~Di,n&=~Zn,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var i=n;0<i;){var l=31-ft(i),d=1<<l;r[l]=-1,i&=~d}a!==0&&lc(t,a,n)}function jr(){return(De&6)===0?(wa(0),!1):!0}function Mi(){if(xe!==null){if(_e===0)var t=xe.return;else t=xe,Zt=Fn=null,Is(t),wo=null,ua=0,t=xe;for(;t!==null;)kp(t.alternate,t),t=t.return;xe=null}}function To(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Yf(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Mi(),Ce=t,xe=a=Xt(t.current,null),ve=n,_e=0,vt=null,vn=!1,Oo=No(t,n),Oi=!1,Do=Mt=Di=Zn=wn=Ne=0,ut=ba=null,_i=!1,(n&8)!==0&&(n|=n&32);var r=t.entangledLanes;if(r!==0)for(t=t.entanglements,r&=n;0<r;){var i=31-ft(r),l=1<<i;n|=t[i],r&=~l}return nn=n,Za(),a}function Wp(t,n){he=null,C.H=mr,n===na||n===ar?(n=gl(),_e=3):n===fl?(n=gl(),_e=4):_e=n===xp?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,vt=n,xe===null&&(Ne=1,vr(t,_t(n,t.current)))}function eu(){var t=C.H;return C.H=mr,t===null?mr:t}function tu(){var t=C.A;return C.A=Ef,t}function Ci(){Ne=4,vn||(ve&4194048)!==ve&&kt.current!==null||(Oo=!0),(wn&134217727)===0&&(Zn&134217727)===0||Ce===null||En(Ce,ve,Mt,!1)}function zi(t,n,a){var r=De;De|=2;var i=eu(),l=tu();(Ce!==t||ve!==n)&&(_r=null,To(t,n)),n=!1;var d=Ne;e:do try{if(_e!==0&&xe!==null){var y=xe,A=vt;switch(_e){case 8:Mi(),d=6;break e;case 3:case 2:case 9:case 6:kt.current===null&&(n=!0);var T=_e;if(_e=0,vt=null,Ro(t,y,A,T),a&&Oo){d=0;break e}break;default:T=_e,_e=0,vt=null,Ro(t,y,A,T)}}_f(),d=Ne;break}catch($){Wp(t,$)}while(!0);return n&&t.shellSuspendCounter++,Zt=Fn=null,De=r,C.H=i,C.A=l,xe===null&&(Ce=null,ve=0,Za()),d}function _f(){for(;xe!==null;)nu(xe)}function jf(t,n){var a=De;De|=2;var r=eu(),i=tu();Ce!==t||ve!==n?(_r=null,Dr=me()+500,To(t,n)):Oo=No(t,n);e:do try{if(_e!==0&&xe!==null){n=xe;var l=vt;t:switch(_e){case 1:_e=0,vt=null,Ro(t,n,l,1);break;case 2:case 9:if(hl(l)){_e=0,vt=null,ou(n);break}n=function(){_e!==2&&_e!==9||Ce!==t||(_e=7),Ft(t)},l.then(n,n);break e;case 3:_e=7;break e;case 4:_e=5;break e;case 7:hl(l)?(_e=0,vt=null,ou(n)):(_e=0,vt=null,Ro(t,n,l,7));break;case 5:var d=null;switch(xe.tag){case 26:d=xe.memoizedState;case 5:case 27:var y=xe;if(!d||$u(d)){_e=0,vt=null;var A=y.sibling;if(A!==null)xe=A;else{var T=y.return;T!==null?(xe=T,Tr(T)):xe=null}break t}}_e=0,vt=null,Ro(t,n,l,5);break;case 6:_e=0,vt=null,Ro(t,n,l,6);break;case 8:Mi(),Ne=6;break e;default:throw Error(c(462))}}Tf();break}catch($){Wp(t,$)}while(!0);return Zt=Fn=null,C.H=r,C.A=i,De=a,xe!==null?0:(Ce=null,ve=0,Za(),Ne)}function Tf(){for(;xe!==null&&!rt();)nu(xe)}function nu(t){var n=Tp(t.alternate,t,nn);t.memoizedProps=t.pendingProps,n===null?Tr(t):xe=n}function ou(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Sp(a,n,n.pendingProps,n.type,void 0,ve);break;case 11:n=Sp(a,n,n.pendingProps,n.type.render,n.ref,ve);break;case 5:Is(n);default:kp(a,n),n=xe=al(n,nn),n=Tp(a,n,nn)}t.memoizedProps=t.pendingProps,n===null?Tr(t):xe=n}function Ro(t,n,a,r){Zt=Fn=null,Is(n),wo=null,ua=0;var i=n.return;try{if(yf(t,i,n,a,ve)){Ne=1,vr(t,_t(a,t.current)),xe=null;return}}catch(l){if(i!==null)throw xe=i,l;Ne=1,vr(t,_t(a,t.current)),xe=null;return}n.flags&32768?(Se||r===1?t=!0:Oo||(ve&536870912)!==0?t=!1:(vn=t=!0,(r===2||r===9||r===3||r===6)&&(r=kt.current,r!==null&&r.tag===13&&(r.flags|=16384))),au(n,t)):Tr(n)}function Tr(t){var n=t;do{if((n.flags&32768)!==0){au(n,vn);return}t=n.return;var a=vf(n.alternate,n,nn);if(a!==null){xe=a;return}if(n=n.sibling,n!==null){xe=n;return}xe=n=t}while(n!==null);Ne===0&&(Ne=5)}function au(t,n){do{var a=wf(t.alternate,t);if(a!==null){a.flags&=32767,xe=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){xe=t;return}xe=t=a}while(t!==null);Ne=6,xe=null}function ru(t,n,a,r,i,l,d,y,A){t.cancelPendingCommit=null;do Rr();while(Je!==0);if((De&6)!==0)throw Error(c(327));if(n!==null){if(n===t.current)throw Error(c(177));if(l=n.lanes|n.childLanes,l|=Es,td(t,a,l,d,y,A),t===Ce&&(xe=Ce=null,ve=0),_o=n,Sn=t,jo=a,Ti=l,Ri=i,Ip=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Cf(Et,function(){return pu(),null})):(t.callbackNode=null,t.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=C.T,C.T=null,i=X.p,X.p=2,d=De,De|=4;try{Af(t,n,a)}finally{De=d,X.p=i,C.T=r}}Je=1,su(),iu(),cu()}}function su(){if(Je===1){Je=0;var t=Sn,n=_o,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=C.T,C.T=null;var r=X.p;X.p=2;var i=De;De|=4;try{Fp(n,t);var l=Qi,d=Zc(t.containerInfo),y=l.focusedElem,A=l.selectionRange;if(d!==y&&y&&y.ownerDocument&&Vc(y.ownerDocument.documentElement,y)){if(A!==null&&bs(y)){var T=A.start,$=A.end;if($===void 0&&($=T),"selectionStart"in y)y.selectionStart=T,y.selectionEnd=Math.min($,y.value.length);else{var G=y.ownerDocument||document,k=G&&G.defaultView||window;if(k.getSelection){var M=k.getSelection(),pe=y.textContent.length,ce=Math.min(A.start,pe),Re=A.end===void 0?ce:Math.min(A.end,pe);!M.extend&&ce>Re&&(d=Re,Re=ce,ce=d);var D=Qc(y,ce),O=Qc(y,Re);if(D&&O&&(M.rangeCount!==1||M.anchorNode!==D.node||M.anchorOffset!==D.offset||M.focusNode!==O.node||M.focusOffset!==O.offset)){var j=G.createRange();j.setStart(D.node,D.offset),M.removeAllRanges(),ce>Re?(M.addRange(j),M.extend(O.node,O.offset)):(j.setEnd(O.node,O.offset),M.addRange(j))}}}}for(G=[],M=y;M=M.parentNode;)M.nodeType===1&&G.push({element:M,left:M.scrollLeft,top:M.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<G.length;y++){var U=G[y];U.element.scrollLeft=U.left,U.element.scrollTop=U.top}}Fr=!!Xi,Qi=Xi=null}finally{De=i,X.p=r,C.T=a}}t.current=n,Je=2}}function iu(){if(Je===2){Je=0;var t=Sn,n=_o,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=C.T,C.T=null;var r=X.p;X.p=2;var i=De;De|=4;try{$p(t,n.alternate,n)}finally{De=i,X.p=r,C.T=a}}Je=3}}function cu(){if(Je===4||Je===3){Je=0,et();var t=Sn,n=_o,a=jo,r=Ip;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Je=5:(Je=0,_o=Sn=null,lu(t,t.pendingLanes));var i=t.pendingLanes;if(i===0&&(An=null),Jr(a),n=n.stateNode,dt&&typeof dt.onCommitFiberRoot=="function")try{dt.onCommitFiberRoot(Lo,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=C.T,i=X.p,X.p=2,C.T=null;try{for(var l=t.onRecoverableError,d=0;d<r.length;d++){var y=r[d];l(y.value,{componentStack:y.stack})}}finally{C.T=n,X.p=i}}(jo&3)!==0&&Rr(),Ft(t),i=t.pendingLanes,(a&4194090)!==0&&(i&42)!==0?t===ki?va++:(va=0,ki=t):va=0,wa(0)}}function lu(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,ea(n)))}function Rr(t){return su(),iu(),cu(),pu()}function pu(){if(Je!==5)return!1;var t=Sn,n=Ti;Ti=0;var a=Jr(jo),r=C.T,i=X.p;try{X.p=32>a?32:a,C.T=null,a=Ri,Ri=null;var l=Sn,d=jo;if(Je=0,_o=Sn=null,jo=0,(De&6)!==0)throw Error(c(331));var y=De;if(De|=4,Vp(l.current),Yp(l,l.current,d,a),De=y,wa(0,!1),dt&&typeof dt.onPostCommitFiberRoot=="function")try{dt.onPostCommitFiberRoot(Lo,l)}catch{}return!0}finally{X.p=i,C.T=r,lu(t,n)}}function uu(t,n,a){n=_t(a,n),n=li(t.stateNode,n,2),t=fn(t,n,2),t!==null&&($o(t,2),Ft(t))}function ke(t,n,a){if(t.tag===3)uu(t,t,a);else for(;n!==null;){if(n.tag===3){uu(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(An===null||!An.has(r))){t=_t(a,t),a=mp(2),r=fn(n,a,2),r!==null&&(gp(a,r,n,t),$o(r,2),Ft(r));break}}n=n.return}}function qi(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new Of;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(a)||(Oi=!0,i.add(a),t=Rf.bind(null,t,n,a),n.then(t,t))}function Rf(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Ce===t&&(ve&a)===a&&(Ne===4||Ne===3&&(ve&62914560)===ve&&300>me()-ji?(De&2)===0&&To(t,0):Di|=a,Do===ve&&(Do=0)),Ft(t)}function du(t,n){n===0&&(n=cc()),t=po(t,n),t!==null&&($o(t,n),Ft(t))}function kf(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),du(t,a)}function Mf(t,n){var a=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(a=i.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(c(314))}r!==null&&r.delete(n),du(t,a)}function Cf(t,n){return Ae(t,n)}var kr=null,ko=null,Li=!1,Mr=!1,Ni=!1,In=0;function Ft(t){t!==ko&&t.next===null&&(ko===null?kr=ko=t:ko=ko.next=t),Mr=!0,Li||(Li=!0,qf())}function wa(t,n){if(!Ni&&Mr){Ni=!0;do for(var a=!1,r=kr;r!==null;){if(t!==0){var i=r.pendingLanes;if(i===0)var l=0;else{var d=r.suspendedLanes,y=r.pingedLanes;l=(1<<31-ft(42|t)+1)-1,l&=i&~(d&~y),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(a=!0,gu(r,l))}else l=ve,l=La(r,r===Ce?l:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(l&3)===0||No(r,l)||(a=!0,gu(r,l));r=r.next}while(a);Ni=!1}}function zf(){fu()}function fu(){Mr=Li=!1;var t=0;In!==0&&(Hf()&&(t=In),In=0);for(var n=me(),a=null,r=kr;r!==null;){var i=r.next,l=hu(r,n);l===0?(r.next=null,a===null?kr=i:a.next=i,i===null&&(ko=a)):(a=r,(t!==0||(l&3)!==0)&&(Mr=!0)),r=i}wa(t)}function hu(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,l=t.pendingLanes&-62914561;0<l;){var d=31-ft(l),y=1<<d,A=i[d];A===-1?((y&a)===0||(y&r)!==0)&&(i[d]=ed(y,n)):A<=n&&(t.expiredLanes|=y),l&=~y}if(n=Ce,a=ve,a=La(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(_e===2||_e===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&Oe(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||No(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&Oe(r),Jr(a)){case 2:case 8:a=zt;break;case 32:a=Et;break;case 268435456:a=kn;break;default:a=Et}return r=mu.bind(null,t),a=Ae(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&Oe(r),t.callbackPriority=2,t.callbackNode=null,2}function mu(t,n){if(Je!==0&&Je!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Rr()&&t.callbackNode!==a)return null;var r=ve;return r=La(t,t===Ce?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(Jp(t,r,n),hu(t,me()),t.callbackNode!=null&&t.callbackNode===a?mu.bind(null,t):null)}function gu(t,n){if(Rr())return null;Jp(t,n,!0)}function qf(){Xf(function(){(De&6)!==0?Ae(St,zf):fu()})}function $i(){return In===0&&(In=ic()),In}function xu(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ga(""+t)}function yu(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Lf(t,n,a,r,i){if(n==="submit"&&a&&a.stateNode===i){var l=xu((i[st]||null).action),d=r.submitter;d&&(n=(n=d[st]||null)?xu(n.formAction):d.getAttribute("formAction"),n!==null&&(l=n,d=null));var y=new Xa("action","action",null,r,i);t.push({event:y,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(In!==0){var A=d?yu(i,d):new FormData(i);ai(a,{pending:!0,data:A,method:i.method,action:l},null,A)}}else typeof l=="function"&&(y.preventDefault(),A=d?yu(i,d):new FormData(i),ai(a,{pending:!0,data:A,method:i.method,action:l},l,A))},currentTarget:i}]})}}for(var Bi=0;Bi<Ss.length;Bi++){var Ui=Ss[Bi],Nf=Ui.toLowerCase(),$f=Ui[0].toUpperCase()+Ui.slice(1);qt(Nf,"on"+$f)}qt(Jc,"onAnimationEnd"),qt(Pc,"onAnimationIteration"),qt(Wc,"onAnimationStart"),qt("dblclick","onDoubleClick"),qt("focusin","onFocus"),qt("focusout","onBlur"),qt(Wd,"onTransitionRun"),qt(ef,"onTransitionStart"),qt(tf,"onTransitionCancel"),qt(el,"onTransitionEnd"),eo("onMouseEnter",["mouseout","mouseover"]),eo("onMouseLeave",["mouseout","mouseover"]),eo("onPointerEnter",["pointerout","pointerover"]),eo("onPointerLeave",["pointerout","pointerover"]),Cn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Cn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Cn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Cn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Cn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Cn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Aa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bf=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Aa));function bu(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var d=r.length-1;0<=d;d--){var y=r[d],A=y.instance,T=y.currentTarget;if(y=y.listener,A!==l&&i.isPropagationStopped())break e;l=y,i.currentTarget=T;try{l(i)}catch($){br($)}i.currentTarget=null,l=A}else for(d=0;d<r.length;d++){if(y=r[d],A=y.instance,T=y.currentTarget,y=y.listener,A!==l&&i.isPropagationStopped())break e;l=y,i.currentTarget=T;try{l(i)}catch($){br($)}i.currentTarget=null,l=A}}}}function ye(t,n){var a=n[Pr];a===void 0&&(a=n[Pr]=new Set);var r=t+"__bubble";a.has(r)||(vu(n,t,2,!1),a.add(r))}function Gi(t,n,a){var r=0;n&&(r|=4),vu(a,t,r,n)}var Cr="_reactListening"+Math.random().toString(36).slice(2);function Fi(t){if(!t[Cr]){t[Cr]=!0,fc.forEach(function(a){a!=="selectionchange"&&(Bf.has(a)||Gi(a,!1,t),Gi(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Cr]||(n[Cr]=!0,Gi("selectionchange",!1,n))}}function vu(t,n,a,r){switch(Yu(n)){case 2:var i=dh;break;case 8:i=fh;break;default:i=nc}a=i.bind(null,n,a,t),i=void 0,!ps||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(n,a,{capture:!0,passive:i}):t.addEventListener(n,a,!0):i!==void 0?t.addEventListener(n,a,{passive:i}):t.addEventListener(n,a,!1)}function Hi(t,n,a,r,i){var l=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var d=r.tag;if(d===3||d===4){var y=r.stateNode.containerInfo;if(y===i)break;if(d===4)for(d=r.return;d!==null;){var A=d.tag;if((A===3||A===4)&&d.stateNode.containerInfo===i)return;d=d.return}for(;y!==null;){if(d=Jn(y),d===null)return;if(A=d.tag,A===5||A===6||A===26||A===27){r=l=d;continue e}y=y.parentNode}}r=r.return}_c(function(){var T=l,$=is(a),G=[];e:{var k=tl.get(t);if(k!==void 0){var M=Xa,pe=t;switch(t){case"keypress":if(Ha(a)===0)break e;case"keydown":case"keyup":M=kd;break;case"focusin":pe="focus",M=hs;break;case"focusout":pe="blur",M=hs;break;case"beforeblur":case"afterblur":M=hs;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":M=Rc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":M=yd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":M=zd;break;case Jc:case Pc:case Wc:M=Ad;break;case el:M=Ld;break;case"scroll":case"scrollend":M=gd;break;case"wheel":M=$d;break;case"copy":case"cut":case"paste":M=Ed;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":M=Mc;break;case"toggle":case"beforetoggle":M=Ud}var ce=(n&4)!==0,Re=!ce&&(t==="scroll"||t==="scrollend"),D=ce?k!==null?k+"Capture":null:k;ce=[];for(var O=T,j;O!==null;){var U=O;if(j=U.stateNode,U=U.tag,U!==5&&U!==26&&U!==27||j===null||D===null||(U=Go(O,D),U!=null&&ce.push(Sa(O,U,j))),Re)break;O=O.return}0<ce.length&&(k=new M(k,pe,null,a,$),G.push({event:k,listeners:ce}))}}if((n&7)===0){e:{if(k=t==="mouseover"||t==="pointerover",M=t==="mouseout"||t==="pointerout",k&&a!==ss&&(pe=a.relatedTarget||a.fromElement)&&(Jn(pe)||pe[Kn]))break e;if((M||k)&&(k=$.window===$?$:(k=$.ownerDocument)?k.defaultView||k.parentWindow:window,M?(pe=a.relatedTarget||a.toElement,M=T,pe=pe?Jn(pe):null,pe!==null&&(Re=u(pe),ce=pe.tag,pe!==Re||ce!==5&&ce!==27&&ce!==6)&&(pe=null)):(M=null,pe=T),M!==pe)){if(ce=Rc,U="onMouseLeave",D="onMouseEnter",O="mouse",(t==="pointerout"||t==="pointerover")&&(ce=Mc,U="onPointerLeave",D="onPointerEnter",O="pointer"),Re=M==null?k:Uo(M),j=pe==null?k:Uo(pe),k=new ce(U,O+"leave",M,a,$),k.target=Re,k.relatedTarget=j,U=null,Jn($)===T&&(ce=new ce(D,O+"enter",pe,a,$),ce.target=j,ce.relatedTarget=Re,U=ce),Re=U,M&&pe)t:{for(ce=M,D=pe,O=0,j=ce;j;j=Mo(j))O++;for(j=0,U=D;U;U=Mo(U))j++;for(;0<O-j;)ce=Mo(ce),O--;for(;0<j-O;)D=Mo(D),j--;for(;O--;){if(ce===D||D!==null&&ce===D.alternate)break t;ce=Mo(ce),D=Mo(D)}ce=null}else ce=null;M!==null&&wu(G,k,M,ce,!1),pe!==null&&Re!==null&&wu(G,Re,pe,ce,!0)}}e:{if(k=T?Uo(T):window,M=k.nodeName&&k.nodeName.toLowerCase(),M==="select"||M==="input"&&k.type==="file")var re=Uc;else if($c(k))if(Gc)re=Kd;else{re=Zd;var ge=Vd}else M=k.nodeName,!M||M.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?T&&rs(T.elementType)&&(re=Uc):re=Id;if(re&&(re=re(t,T))){Bc(G,re,a,$);break e}ge&&ge(t,k,T),t==="focusout"&&T&&k.type==="number"&&T.memoizedProps.value!=null&&as(k,"number",k.value)}switch(ge=T?Uo(T):window,t){case"focusin":($c(ge)||ge.contentEditable==="true")&&(io=ge,vs=T,Io=null);break;case"focusout":Io=vs=io=null;break;case"mousedown":ws=!0;break;case"contextmenu":case"mouseup":case"dragend":ws=!1,Ic(G,a,$);break;case"selectionchange":if(Pd)break;case"keydown":case"keyup":Ic(G,a,$)}var se;if(gs)e:{switch(t){case"compositionstart":var le="onCompositionStart";break e;case"compositionend":le="onCompositionEnd";break e;case"compositionupdate":le="onCompositionUpdate";break e}le=void 0}else so?Lc(t,a)&&(le="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(le="onCompositionStart");le&&(Cc&&a.locale!=="ko"&&(so||le!=="onCompositionStart"?le==="onCompositionEnd"&&so&&(se=jc()):(cn=$,us="value"in cn?cn.value:cn.textContent,so=!0)),ge=zr(T,le),0<ge.length&&(le=new kc(le,t,null,a,$),G.push({event:le,listeners:ge}),se?le.data=se:(se=Nc(a),se!==null&&(le.data=se)))),(se=Fd?Hd(t,a):Yd(t,a))&&(le=zr(T,"onBeforeInput"),0<le.length&&(ge=new kc("onBeforeInput","beforeinput",null,a,$),G.push({event:ge,listeners:le}),ge.data=se)),Lf(G,t,T,a,$)}bu(G,n)})}function Sa(t,n,a){return{instance:t,listener:n,currentTarget:a}}function zr(t,n){for(var a=n+"Capture",r=[];t!==null;){var i=t,l=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||l===null||(i=Go(t,a),i!=null&&r.unshift(Sa(t,i,l)),i=Go(t,n),i!=null&&r.push(Sa(t,i,l))),t.tag===3)return r;t=t.return}return[]}function Mo(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function wu(t,n,a,r,i){for(var l=n._reactName,d=[];a!==null&&a!==r;){var y=a,A=y.alternate,T=y.stateNode;if(y=y.tag,A!==null&&A===r)break;y!==5&&y!==26&&y!==27||T===null||(A=T,i?(T=Go(a,l),T!=null&&d.unshift(Sa(a,T,A))):i||(T=Go(a,l),T!=null&&d.push(Sa(a,T,A)))),a=a.return}d.length!==0&&t.push({event:n,listeners:d})}var Uf=/\r\n?/g,Gf=/\u0000|\uFFFD/g;function Au(t){return(typeof t=="string"?t:""+t).replace(Uf,`
`).replace(Gf,"")}function Su(t,n){return n=Au(n),Au(t)===n}function qr(){}function Te(t,n,a,r,i,l){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||oo(t,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&oo(t,""+r);break;case"className":$a(t,"class",r);break;case"tabIndex":$a(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":$a(t,a,r);break;case"style":Oc(t,r,l);break;case"data":if(n!=="object"){$a(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ga(""+r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(a==="formAction"?(n!=="input"&&Te(t,n,"name",i.name,i,null),Te(t,n,"formEncType",i.formEncType,i,null),Te(t,n,"formMethod",i.formMethod,i,null),Te(t,n,"formTarget",i.formTarget,i,null)):(Te(t,n,"encType",i.encType,i,null),Te(t,n,"method",i.method,i,null),Te(t,n,"target",i.target,i,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ga(""+r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=qr);break;case"onScroll":r!=null&&ye("scroll",t);break;case"onScrollEnd":r!=null&&ye("scrollend",t);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(c(61));if(a=r.__html,a!=null){if(i.children!=null)throw Error(c(60));t.innerHTML=a}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Ga(""+r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""+r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":ye("beforetoggle",t),ye("toggle",t),Na(t,"popover",r);break;case"xlinkActuate":Ht(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Ht(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Ht(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Ht(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Ht(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Ht(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Ht(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Ht(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Ht(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Na(t,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=hd.get(a)||a,Na(t,a,r))}}function Yi(t,n,a,r,i,l){switch(a){case"style":Oc(t,r,l);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(c(61));if(a=r.__html,a!=null){if(i.children!=null)throw Error(c(60));t.innerHTML=a}}break;case"children":typeof r=="string"?oo(t,r):(typeof r=="number"||typeof r=="bigint")&&oo(t,""+r);break;case"onScroll":r!=null&&ye("scroll",t);break;case"onScrollEnd":r!=null&&ye("scrollend",t);break;case"onClick":r!=null&&(t.onclick=qr);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),n=a.slice(2,i?a.length-7:void 0),l=t[st]||null,l=l!=null?l[a]:null,typeof l=="function"&&t.removeEventListener(n,l,i),typeof r=="function")){typeof l!="function"&&l!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,r,i);break e}a in t?t[a]=r:r===!0?t.setAttribute(a,""):Na(t,a,r)}}}function Pe(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ye("error",t),ye("load",t);var r=!1,i=!1,l;for(l in a)if(a.hasOwnProperty(l)){var d=a[l];if(d!=null)switch(l){case"src":r=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,n));default:Te(t,n,l,d,a,null)}}i&&Te(t,n,"srcSet",a.srcSet,a,null),r&&Te(t,n,"src",a.src,a,null);return;case"input":ye("invalid",t);var y=l=d=i=null,A=null,T=null;for(r in a)if(a.hasOwnProperty(r)){var $=a[r];if($!=null)switch(r){case"name":i=$;break;case"type":d=$;break;case"checked":A=$;break;case"defaultChecked":T=$;break;case"value":l=$;break;case"defaultValue":y=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(c(137,n));break;default:Te(t,n,r,$,a,null)}}wc(t,l,y,A,T,d,i,!1),Ba(t);return;case"select":ye("invalid",t),r=d=l=null;for(i in a)if(a.hasOwnProperty(i)&&(y=a[i],y!=null))switch(i){case"value":l=y;break;case"defaultValue":d=y;break;case"multiple":r=y;default:Te(t,n,i,y,a,null)}n=l,a=d,t.multiple=!!r,n!=null?no(t,!!r,n,!1):a!=null&&no(t,!!r,a,!0);return;case"textarea":ye("invalid",t),l=i=r=null;for(d in a)if(a.hasOwnProperty(d)&&(y=a[d],y!=null))switch(d){case"value":r=y;break;case"defaultValue":i=y;break;case"children":l=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(c(91));break;default:Te(t,n,d,y,a,null)}Sc(t,r,i,l),Ba(t);return;case"option":for(A in a)if(a.hasOwnProperty(A)&&(r=a[A],r!=null))switch(A){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Te(t,n,A,r,a,null)}return;case"dialog":ye("beforetoggle",t),ye("toggle",t),ye("cancel",t),ye("close",t);break;case"iframe":case"object":ye("load",t);break;case"video":case"audio":for(r=0;r<Aa.length;r++)ye(Aa[r],t);break;case"image":ye("error",t),ye("load",t);break;case"details":ye("toggle",t);break;case"embed":case"source":case"link":ye("error",t),ye("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(T in a)if(a.hasOwnProperty(T)&&(r=a[T],r!=null))switch(T){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,n));default:Te(t,n,T,r,a,null)}return;default:if(rs(n)){for($ in a)a.hasOwnProperty($)&&(r=a[$],r!==void 0&&Yi(t,n,$,r,a,void 0));return}}for(y in a)a.hasOwnProperty(y)&&(r=a[y],r!=null&&Te(t,n,y,r,a,null))}function Ff(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,l=null,d=null,y=null,A=null,T=null,$=null;for(M in a){var G=a[M];if(a.hasOwnProperty(M)&&G!=null)switch(M){case"checked":break;case"value":break;case"defaultValue":A=G;default:r.hasOwnProperty(M)||Te(t,n,M,null,r,G)}}for(var k in r){var M=r[k];if(G=a[k],r.hasOwnProperty(k)&&(M!=null||G!=null))switch(k){case"type":l=M;break;case"name":i=M;break;case"checked":T=M;break;case"defaultChecked":$=M;break;case"value":d=M;break;case"defaultValue":y=M;break;case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(c(137,n));break;default:M!==G&&Te(t,n,k,M,r,G)}}os(t,d,y,A,T,$,l,i);return;case"select":M=d=y=k=null;for(l in a)if(A=a[l],a.hasOwnProperty(l)&&A!=null)switch(l){case"value":break;case"multiple":M=A;default:r.hasOwnProperty(l)||Te(t,n,l,null,r,A)}for(i in r)if(l=r[i],A=a[i],r.hasOwnProperty(i)&&(l!=null||A!=null))switch(i){case"value":k=l;break;case"defaultValue":y=l;break;case"multiple":d=l;default:l!==A&&Te(t,n,i,l,r,A)}n=y,a=d,r=M,k!=null?no(t,!!a,k,!1):!!r!=!!a&&(n!=null?no(t,!!a,n,!0):no(t,!!a,a?[]:"",!1));return;case"textarea":M=k=null;for(y in a)if(i=a[y],a.hasOwnProperty(y)&&i!=null&&!r.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:Te(t,n,y,null,r,i)}for(d in r)if(i=r[d],l=a[d],r.hasOwnProperty(d)&&(i!=null||l!=null))switch(d){case"value":k=i;break;case"defaultValue":M=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(c(91));break;default:i!==l&&Te(t,n,d,i,r,l)}Ac(t,k,M);return;case"option":for(var pe in a)if(k=a[pe],a.hasOwnProperty(pe)&&k!=null&&!r.hasOwnProperty(pe))switch(pe){case"selected":t.selected=!1;break;default:Te(t,n,pe,null,r,k)}for(A in r)if(k=r[A],M=a[A],r.hasOwnProperty(A)&&k!==M&&(k!=null||M!=null))switch(A){case"selected":t.selected=k&&typeof k!="function"&&typeof k!="symbol";break;default:Te(t,n,A,k,r,M)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ce in a)k=a[ce],a.hasOwnProperty(ce)&&k!=null&&!r.hasOwnProperty(ce)&&Te(t,n,ce,null,r,k);for(T in r)if(k=r[T],M=a[T],r.hasOwnProperty(T)&&k!==M&&(k!=null||M!=null))switch(T){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(c(137,n));break;default:Te(t,n,T,k,r,M)}return;default:if(rs(n)){for(var Re in a)k=a[Re],a.hasOwnProperty(Re)&&k!==void 0&&!r.hasOwnProperty(Re)&&Yi(t,n,Re,void 0,r,k);for($ in r)k=r[$],M=a[$],!r.hasOwnProperty($)||k===M||k===void 0&&M===void 0||Yi(t,n,$,k,r,M);return}}for(var D in a)k=a[D],a.hasOwnProperty(D)&&k!=null&&!r.hasOwnProperty(D)&&Te(t,n,D,null,r,k);for(G in r)k=r[G],M=a[G],!r.hasOwnProperty(G)||k===M||k==null&&M==null||Te(t,n,G,k,r,M)}var Xi=null,Qi=null;function Lr(t){return t.nodeType===9?t:t.ownerDocument}function Eu(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ou(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Vi(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Zi=null;function Hf(){var t=window.event;return t&&t.type==="popstate"?t===Zi?!1:(Zi=t,!0):(Zi=null,!1)}var Du=typeof setTimeout=="function"?setTimeout:void 0,Yf=typeof clearTimeout=="function"?clearTimeout:void 0,_u=typeof Promise=="function"?Promise:void 0,Xf=typeof queueMicrotask=="function"?queueMicrotask:typeof _u<"u"?function(t){return _u.resolve(null).then(t).catch(Qf)}:Du;function Qf(t){setTimeout(function(){throw t})}function On(t){return t==="head"}function ju(t,n){var a=n,r=0,i=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(0<r&&8>r){a=r;var d=t.ownerDocument;if(a&1&&Ea(d.documentElement),a&2&&Ea(d.body),a&4)for(a=d.head,Ea(a),d=a.firstChild;d;){var y=d.nextSibling,A=d.nodeName;d[Bo]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=y}}if(i===0){t.removeChild(l),Ma(n);return}i--}else a==="$"||a==="$?"||a==="$!"?i++:r=a.charCodeAt(0)-48;else r=0;a=l}while(a);Ma(n)}function Ii(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Ii(a),Wr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Vf(t,n,a,r){for(;t.nodeType===1;){var i=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Bo])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(l=t.getAttribute("rel"),l==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(l!==i.rel||t.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||t.getAttribute("title")!==(i.title==null?null:i.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(l=t.getAttribute("src"),(l!==(i.src==null?null:i.src)||t.getAttribute("type")!==(i.type==null?null:i.type)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&l&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var l=i.name==null?null:""+i.name;if(i.type==="hidden"&&t.getAttribute("name")===l)return t}else return t;if(t=Nt(t.nextSibling),t===null)break}return null}function Zf(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Nt(t.nextSibling),t===null))return null;return t}function Ki(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState==="complete"}function If(t,n){var a=t.ownerDocument;if(t.data!=="$?"||a.readyState==="complete")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function Nt(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="F!"||n==="F")break;if(n==="/$")return null}}return t}var Ji=null;function Tu(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"){if(n===0)return t;n--}else a==="/$"&&n++}t=t.previousSibling}return null}function Ru(t,n,a){switch(n=Lr(a),t){case"html":if(t=n.documentElement,!t)throw Error(c(452));return t;case"head":if(t=n.head,!t)throw Error(c(453));return t;case"body":if(t=n.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}function Ea(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Wr(t)}var Ct=new Map,ku=new Set;function Nr(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var on=X.d;X.d={f:Kf,r:Jf,D:Pf,C:Wf,L:eh,m:th,X:oh,S:nh,M:ah};function Kf(){var t=on.f(),n=jr();return t||n}function Jf(t){var n=Pn(t);n!==null&&n.tag===5&&n.type==="form"?Jl(n):on.r(t)}var Co=typeof document>"u"?null:document;function Mu(t,n,a){var r=Co;if(r&&typeof n=="string"&&n){var i=Dt(n);i='link[rel="'+t+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),ku.has(i)||(ku.add(i),t={rel:t,crossOrigin:a,href:n},r.querySelector(i)===null&&(n=r.createElement("link"),Pe(n,"link",t),Xe(n),r.head.appendChild(n)))}}function Pf(t){on.D(t),Mu("dns-prefetch",t,null)}function Wf(t,n){on.C(t,n),Mu("preconnect",t,n)}function eh(t,n,a){on.L(t,n,a);var r=Co;if(r&&t&&n){var i='link[rel="preload"][as="'+Dt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+Dt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+Dt(a.imageSizes)+'"]')):i+='[href="'+Dt(t)+'"]';var l=i;switch(n){case"style":l=zo(t);break;case"script":l=qo(t)}Ct.has(l)||(t=b({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ct.set(l,t),r.querySelector(i)!==null||n==="style"&&r.querySelector(Oa(l))||n==="script"&&r.querySelector(Da(l))||(n=r.createElement("link"),Pe(n,"link",t),Xe(n),r.head.appendChild(n)))}}function th(t,n){on.m(t,n);var a=Co;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",i='link[rel="modulepreload"][as="'+Dt(r)+'"][href="'+Dt(t)+'"]',l=i;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=qo(t)}if(!Ct.has(l)&&(t=b({rel:"modulepreload",href:t},n),Ct.set(l,t),a.querySelector(i)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Da(l)))return}r=a.createElement("link"),Pe(r,"link",t),Xe(r),a.head.appendChild(r)}}}function nh(t,n,a){on.S(t,n,a);var r=Co;if(r&&t){var i=Wn(r).hoistableStyles,l=zo(t);n=n||"default";var d=i.get(l);if(!d){var y={loading:0,preload:null};if(d=r.querySelector(Oa(l)))y.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ct.get(l))&&Pi(t,a);var A=d=r.createElement("link");Xe(A),Pe(A,"link",t),A._p=new Promise(function(T,$){A.onload=T,A.onerror=$}),A.addEventListener("load",function(){y.loading|=1}),A.addEventListener("error",function(){y.loading|=2}),y.loading|=4,$r(d,n,r)}d={type:"stylesheet",instance:d,count:1,state:y},i.set(l,d)}}}function oh(t,n){on.X(t,n);var a=Co;if(a&&t){var r=Wn(a).hoistableScripts,i=qo(t),l=r.get(i);l||(l=a.querySelector(Da(i)),l||(t=b({src:t,async:!0},n),(n=Ct.get(i))&&Wi(t,n),l=a.createElement("script"),Xe(l),Pe(l,"link",t),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},r.set(i,l))}}function ah(t,n){on.M(t,n);var a=Co;if(a&&t){var r=Wn(a).hoistableScripts,i=qo(t),l=r.get(i);l||(l=a.querySelector(Da(i)),l||(t=b({src:t,async:!0,type:"module"},n),(n=Ct.get(i))&&Wi(t,n),l=a.createElement("script"),Xe(l),Pe(l,"link",t),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},r.set(i,l))}}function Cu(t,n,a,r){var i=(i=ae.current)?Nr(i):null;if(!i)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=zo(a.href),a=Wn(i).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=zo(a.href);var l=Wn(i).hoistableStyles,d=l.get(t);if(d||(i=i.ownerDocument||i,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(t,d),(l=i.querySelector(Oa(t)))&&!l._p&&(d.instance=l,d.state.loading=5),Ct.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ct.set(t,a),l||rh(i,t,a,d.state))),n&&r===null)throw Error(c(528,""));return d}if(n&&r!==null)throw Error(c(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=qo(a),a=Wn(i).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function zo(t){return'href="'+Dt(t)+'"'}function Oa(t){return'link[rel="stylesheet"]['+t+"]"}function zu(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function rh(t,n,a,r){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=t.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),Pe(n,"link",a),Xe(n),t.head.appendChild(n))}function qo(t){return'[src="'+Dt(t)+'"]'}function Da(t){return"script[async]"+t}function qu(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+Dt(a.href)+'"]');if(r)return n.instance=r,Xe(r),r;var i=b({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),Xe(r),Pe(r,"style",i),$r(r,a.precedence,t),n.instance=r;case"stylesheet":i=zo(a.href);var l=t.querySelector(Oa(i));if(l)return n.state.loading|=4,n.instance=l,Xe(l),l;r=zu(a),(i=Ct.get(i))&&Pi(r,i),l=(t.ownerDocument||t).createElement("link"),Xe(l);var d=l;return d._p=new Promise(function(y,A){d.onload=y,d.onerror=A}),Pe(l,"link",r),n.state.loading|=4,$r(l,a.precedence,t),n.instance=l;case"script":return l=qo(a.src),(i=t.querySelector(Da(l)))?(n.instance=i,Xe(i),i):(r=a,(i=Ct.get(l))&&(r=b({},a),Wi(r,i)),t=t.ownerDocument||t,i=t.createElement("script"),Xe(i),Pe(i,"link",r),t.head.appendChild(i),n.instance=i);case"void":return null;default:throw Error(c(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,$r(r,a.precedence,t));return n.instance}function $r(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=r.length?r[r.length-1]:null,l=i,d=0;d<r.length;d++){var y=r[d];if(y.dataset.precedence===n)l=y;else if(l!==i)break}l?l.parentNode.insertBefore(t,l.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Pi(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Wi(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Br=null;function Lu(t,n,a){if(Br===null){var r=new Map,i=Br=new Map;i.set(a,r)}else i=Br,r=i.get(a),r||(r=new Map,i.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),i=0;i<a.length;i++){var l=a[i];if(!(l[Bo]||l[tt]||t==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var d=l.getAttribute(n)||"";d=t+d;var y=r.get(d);y?y.push(l):r.set(d,[l])}}return r}function Nu(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function sh(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function $u(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}var _a=null;function ih(){}function ch(t,n,a){if(_a===null)throw Error(c(475));var r=_a;if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var i=zo(a.href),l=t.querySelector(Oa(i));if(l){t=l._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(r.count++,r=Ur.bind(r),t.then(r,r)),n.state.loading|=4,n.instance=l,Xe(l);return}l=t.ownerDocument||t,a=zu(a),(i=Ct.get(i))&&Pi(a,i),l=l.createElement("link"),Xe(l);var d=l;d._p=new Promise(function(y,A){d.onload=y,d.onerror=A}),Pe(l,"link",a),n.instance=l}r.stylesheets===null&&(r.stylesheets=new Map),r.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(r.count++,n=Ur.bind(r),t.addEventListener("load",n),t.addEventListener("error",n))}}function lh(){if(_a===null)throw Error(c(475));var t=_a;return t.stylesheets&&t.count===0&&ec(t,t.stylesheets),0<t.count?function(n){var a=setTimeout(function(){if(t.stylesheets&&ec(t,t.stylesheets),t.unsuspend){var r=t.unsuspend;t.unsuspend=null,r()}},6e4);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a)}}:null}function Ur(){if(this.count--,this.count===0){if(this.stylesheets)ec(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Gr=null;function ec(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Gr=new Map,n.forEach(ph,t),Gr=null,Ur.call(t))}function ph(t,n){if(!(n.state.loading&4)){var a=Gr.get(t);if(a)var r=a.get(null);else{a=new Map,Gr.set(t,a);for(var i=t.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<i.length;l++){var d=i[l];(d.nodeName==="LINK"||d.getAttribute("media")!=="not all")&&(a.set(d.dataset.precedence,d),r=d)}r&&a.set(null,r)}i=n.instance,d=i.getAttribute("data-precedence"),l=a.get(d)||r,l===r&&a.set(null,i),a.set(d,i),this.count++,r=Ur.bind(this),i.addEventListener("load",r),i.addEventListener("error",r),l?l.parentNode.insertBefore(i,l.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(i,t.firstChild)),n.state.loading|=4}}var ja={$$typeof:L,Provider:null,Consumer:null,_currentValue:ne,_currentValue2:ne,_threadCount:0};function uh(t,n,a,r,i,l,d,y){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ir(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ir(0),this.hiddenUpdates=Ir(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=l,this.onRecoverableError=d,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=y,this.incompleteTransitions=new Map}function Bu(t,n,a,r,i,l,d,y,A,T,$,G){return t=new uh(t,n,a,d,y,A,T,G),n=1,l===!0&&(n|=24),l=xt(3,null,null,n),t.current=l,l.stateNode=t,n=qs(),n.refCount++,t.pooledCache=n,n.refCount++,l.memoizedState={element:r,isDehydrated:a,cache:n},Bs(l),t}function Uu(t){return t?(t=uo,t):uo}function Gu(t,n,a,r,i,l){i=Uu(i),r.context===null?r.context=i:r.pendingContext=i,r=dn(n),r.payload={element:a},l=l===void 0?null:l,l!==null&&(r.callback=l),a=fn(t,r,n),a!==null&&(At(a,t,n),aa(a,t,n))}function Fu(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function tc(t,n){Fu(t,n),(t=t.alternate)&&Fu(t,n)}function Hu(t){if(t.tag===13){var n=po(t,67108864);n!==null&&At(n,t,67108864),tc(t,67108864)}}var Fr=!0;function dh(t,n,a,r){var i=C.T;C.T=null;var l=X.p;try{X.p=2,nc(t,n,a,r)}finally{X.p=l,C.T=i}}function fh(t,n,a,r){var i=C.T;C.T=null;var l=X.p;try{X.p=8,nc(t,n,a,r)}finally{X.p=l,C.T=i}}function nc(t,n,a,r){if(Fr){var i=oc(r);if(i===null)Hi(t,n,r,Hr,a),Xu(t,r);else if(gh(i,t,n,a,r))r.stopPropagation();else if(Xu(t,r),n&4&&-1<mh.indexOf(t)){for(;i!==null;){var l=Pn(i);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var d=Mn(l.pendingLanes);if(d!==0){var y=l;for(y.pendingLanes|=2,y.entangledLanes|=2;d;){var A=1<<31-ft(d);y.entanglements[1]|=A,d&=~A}Ft(l),(De&6)===0&&(Dr=me()+500,wa(0))}}break;case 13:y=po(l,2),y!==null&&At(y,l,2),jr(),tc(l,2)}if(l=oc(r),l===null&&Hi(t,n,r,Hr,a),l===i)break;i=l}i!==null&&r.stopPropagation()}else Hi(t,n,r,null,a)}}function oc(t){return t=is(t),ac(t)}var Hr=null;function ac(t){if(Hr=null,t=Jn(t),t!==null){var n=u(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Hr=t,null}function Yu(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ye()){case St:return 2;case zt:return 8;case Et:case an:return 32;case kn:return 268435456;default:return 32}default:return 32}}var rc=!1,Dn=null,_n=null,jn=null,Ta=new Map,Ra=new Map,Tn=[],mh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Xu(t,n){switch(t){case"focusin":case"focusout":Dn=null;break;case"dragenter":case"dragleave":_n=null;break;case"mouseover":case"mouseout":jn=null;break;case"pointerover":case"pointerout":Ta.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ra.delete(n.pointerId)}}function ka(t,n,a,r,i,l){return t===null||t.nativeEvent!==l?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=Pn(n),n!==null&&Hu(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),t)}function gh(t,n,a,r,i){switch(n){case"focusin":return Dn=ka(Dn,t,n,a,r,i),!0;case"dragenter":return _n=ka(_n,t,n,a,r,i),!0;case"mouseover":return jn=ka(jn,t,n,a,r,i),!0;case"pointerover":var l=i.pointerId;return Ta.set(l,ka(Ta.get(l)||null,t,n,a,r,i)),!0;case"gotpointercapture":return l=i.pointerId,Ra.set(l,ka(Ra.get(l)||null,t,n,a,r,i)),!0}return!1}function Qu(t){var n=Jn(t.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,nd(t.priority,function(){if(a.tag===13){var r=wt();r=Kr(r);var i=po(a,r);i!==null&&At(i,a,r),tc(a,r)}});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Yr(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=oc(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);ss=r,a.target.dispatchEvent(r),ss=null}else return n=Pn(a),n!==null&&Hu(n),t.blockedOn=a,!1;n.shift()}return!0}function Vu(t,n,a){Yr(t)&&a.delete(n)}function xh(){rc=!1,Dn!==null&&Yr(Dn)&&(Dn=null),_n!==null&&Yr(_n)&&(_n=null),jn!==null&&Yr(jn)&&(jn=null),Ta.forEach(Vu),Ra.forEach(Vu)}function Xr(t,n){t.blockedOn===n&&(t.blockedOn=null,rc||(rc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,xh)))}var Qr=null;function Zu(t){Qr!==t&&(Qr=t,e.unstable_scheduleCallback(e.unstable_NormalPriority,function(){Qr===t&&(Qr=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],i=t[n+2];if(typeof r!="function"){if(ac(r||a)===null)continue;break}var l=Pn(a);l!==null&&(t.splice(n,3),n-=3,ai(l,{pending:!0,data:i,method:a.method,action:r},r,i))}}))}function Ma(t){function n(A){return Xr(A,t)}Dn!==null&&Xr(Dn,t),_n!==null&&Xr(_n,t),jn!==null&&Xr(jn,t),Ta.forEach(n),Ra.forEach(n);for(var a=0;a<Tn.length;a++){var r=Tn[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<Tn.length&&(a=Tn[0],a.blockedOn===null);)Qu(a),a.blockedOn===null&&Tn.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var i=a[r],l=a[r+1],d=i[st]||null;if(typeof l=="function")d||Zu(a);else if(d){var y=null;if(l&&l.hasAttribute("formAction")){if(i=l,d=l[st]||null)y=d.formAction;else if(ac(i)!==null)continue}else y=d.action;typeof y=="function"?a[r+1]=y:(a.splice(r,3),r-=3),Zu(a)}}}function sc(t){this._internalRoot=t}Vr.prototype.render=sc.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(c(409));var a=n.current,r=wt();Gu(a,r,t,n,null,null)},Vr.prototype.unmount=sc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Gu(t.current,2,null,t,null,null),jr(),n[Kn]=null}};function Vr(t){this._internalRoot=t}Vr.prototype.unstable_scheduleHydration=function(t){if(t){var n=uc();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Tn.length&&n!==0&&n<Tn[a].priority;a++);Tn.splice(a,0,t),a===0&&Qu(t)}};var Iu=o.version;if(Iu!=="19.1.1")throw Error(c(527,Iu,"19.1.1"));X.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=g(n),t=t!==null?m(t):null,t=t===null?null:t.stateNode,t};var yh={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.1.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zr.isDisabled&&Zr.supportsFiber)try{Lo=Zr.inject(yh),dt=Zr}catch{}}return reactDomClient_production.createRoot=function(t,n){if(!p(t))throw Error(c(299));var a=!1,r="",i=up,l=dp,d=fp,y=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(l=n.onCaughtError),n.onRecoverableError!==void 0&&(d=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(y=n.unstable_transitionCallbacks)),n=Bu(t,1,!1,null,null,a,r,i,l,d,y,null),t[Kn]=n.current,Fi(t),new sc(n)},reactDomClient_production.hydrateRoot=function(t,n,a){if(!p(t))throw Error(c(299));var r=!1,i="",l=up,d=dp,y=fp,A=null,T=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(l=a.onUncaughtError),a.onCaughtError!==void 0&&(d=a.onCaughtError),a.onRecoverableError!==void 0&&(y=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(A=a.unstable_transitionCallbacks),a.formState!==void 0&&(T=a.formState)),n=Bu(t,1,!0,n,a??null,r,i,l,d,y,A,T),n.context=Uu(null),a=n.current,r=wt(),r=Kr(r),i=dn(r),i.callback=null,fn(a,i,r),a=r,n.current.lanes=a,$o(n,a),Ft(n),t[Kn]=n.current,Fi(t),new Vr(n)},reactDomClient_production.version="19.1.1",reactDomClient_production}var hasRequiredClient;function requireClient(){if(hasRequiredClient)return client.exports;hasRequiredClient=1;function e(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(o){console.error(o)}}return e(),client.exports=requireReactDomClient_production(),client.exports}var clientExports=requireClient();const gettingStarted={name:"Getting Started: Introduction to Yield and RPN",description:"Yield is a concatenative, stack-based language. Operations are written in Reverse Polish Notation (RPN), where operators follow their operands.",cells:[{name:"Basic Arithmetic",description:"To add 2 and 3, you write `2 3 +`. The numbers are pushed onto a shared data stack, and the `+` operator pops them, adds them, and pushes the result back.",example:"2 3 +",expected:[5]},{name:"Chaining Operations",description:"Operations are executed from left to right. To calculate `(2 + 3) * 5`, you first perform the addition, leaving the result on the stack for the multiplication.",example:"2 3 + 5 *",expected:[25]},{name:"Primitives",description:"Yield supports several primitive data types. Numbers, booleans (`true`, `false`), and strings are pushed directly onto the stack.",example:'42 1.618 true "hello world"',expected:[42,1.618,!0,"hello world"]},{name:"Comments",description:"You can add comments to your code using `#` for line comments. The interpreter ignores them.",example:"1 2 + # -> 3",expected:[3]}]},stackPrimitives={name:"Stack Primitives: Manipulating Words and the Stack",description:"Since everything happens on the stack, there are powerful operators to manipulate its contents.",cells:[{name:"Duplicating with `dup`",description:"The `dup` operator duplicates the top item on the stack.",example:"10 dup",expected:[10,10]},{name:"Removing with `pop`",description:"The `pop` operator removes the top item from the stack.",example:"1 2 3 pop",expected:[1,2]},{name:"Swapping with `swap`",description:"The `swap` operator swaps the top two items on the stack.",example:"10 20 swap",expected:[20,10]},{name:"Clearing the Stack",description:"The `clear` operator removes all items, leaving the stack empty.",example:'1 2 3 "hello" clear',expected:[]}]},quotedPrograms={name:"Quoted Programs: Defining and Naming Programs",description:"In Yield, programs are just lists of words. These lists, called quotations, can be stored and executed later.",cells:[{name:"Quotations",description:"Anything inside parentheses `(...)` is a quotation. It is pushed onto the stack as a list without being executed.",example:"(1 2 3)",expected:[[1,2,3]]},{name:"Defining New Words with `=>`",description:"You can define new, executable words (functions) in the dictionary using the `=>` (`quote`) operator. It assigns the quotation on top of the stack to the name that follows it.",example:`(dup *) square => 
5 square`,replCode:`(dup *) square => 
5 square`,expected:[25]},{name:"Redefining Words",description:"You can redefine any word, including built-in operators. Be careful, this can lead to surprising results!",example:`(1 +) two => 
1 two`,replCode:`(1 +) two => 
1 two`,expected:[2]}]},combinators$1={name:"Combinators: Manipulating Stacks with Programs",description:"Combinators are special operators that take quotations from the stack and execute them in powerful ways.",cells:[{name:"Applying a Quotation with `i`",description:"The `i` combinator executes a quotation. It's the simplest way to run a program stored on the stack.",example:"(1 1 +) i",expected:[2]},{name:"Mapping with `map`",description:"The `map` combinator applies a quotation to each element of a list, creating a new list with the results.",example:"(1 2 3) (succ) map",expected:[[2,3,4]]},{name:"Conditional Logic with `ifte` (?)",description:"The `ifte` combinator provides if-then-else logic. It takes a boolean, a 'then' quotation, and an 'else' quotation. The `?` operator is a convenient alias for `ifte`.",example:'10 5 > ("Greater") ("Lesser") ?',expected:["Greater"]},{name:"Stateful Generators with `yield`",description:"The `yield` combinator enables creating stateful generators. This example generates the sequence of triangular numbers (a(n) = n * (n+1) / 2) by adding the current index to the previous term (a(n) = a(n-1) + n).",example:`
# State holds (n, a(n-1)), starting with (n=1, a(0)=0).
# The program calculates the new state (n+1, a(n)) and yields a(n).
((1 0) (dupd swap + swap succ swap) yield) next_triangular =>

# Generate the first 5 triangular numbers
(next_triangular) 5 times
`,expected:[1,3,6,10,15]}]},advancedExecution={name:"Advanced Execution: Shallow vs. Deep",description:"Yield provides different ways to evaluate quotations, giving you fine-grained control over how programs are executed.",cells:[{name:"Shallow Execution with `i` (iterate)",description:"The `i` combinator performs a shallow execution. It executes the words inside a quotation. If one of those words is a variable defined as data with `=`, `i` will simply push that data to the stack. It does not look 'inside' the data.",example:`
# Define STAR as a DATA variable holding a list
(42 chr print) STAR =

# Define F as a FUNCTION that calls STAR and prints a newline
(STAR cr) F =>

# When we call F, it executes STAR.
# The action for STAR is to push its data: the list (42 chr print).
# Then 'cr' prints a newline. The list is left on the stack.
F`,expected:[[42,"chr","print"]]},{name:"Deep Execution with `chain`",description:"The new `chain` combinator performs a deep, or recursive, execution. When it encounters a word defined as data, it executes the body of that word as a program. This allows you to compose programs from words defined as data.",example:`
# Define all words using '=' (as data)
(42 chr print) STAR =
((STAR) swap times) STARS =
(cr (" " print) 30 times) MARGIN =
(MARGIN STAR) BLIP =
(MARGIN 5 STARS) BAR =

# The final composition. This fails with 'i' but works with 'chain'.
(BAR BLIP BAR BLIP BLIP cr) chain
`,assert:e=>e.length===0,expectedDescription:"The letter 'F' is printed, and the stack is left empty."},{name:"Choosing the Right Tool",description:"Use `=>` to define functions when you want to encapsulate an action. Use `=` for data. The `chain` combinator gives you the flexibility to treat a composition of data words as a single, executable program, which can be very powerful for certain programming styles.",example:`# '=>' is usually for verbs (actions).
# '=' is usually for nouns (data).
# 'chain' lets you treat a sentence of nouns as a verb.`}]},audio$1={name:"Audio: Making Beeps",description:"Yield has a built-in audio engine for live coding sound and music.",cells:[{name:"Building an Audio Quotation",description:"Audio operators build a quotation (a program) on the stack. `440 sine` creates an oscillator quotation, and `0.5 mul` adds a volume control step to it. The stack holds the program, not the sound itself.",example:"440 sine 0.5 mul",assert:e=>Array.isArray(e[0])&&e[0].length===3&&e[0][2]==="mul",expectedDescription:"([[440, 'sine'], 0.5, 'mul'])"},{name:"Playing a One-Shot Sound",description:"The `play` operator is for one-shot sounds. It consumes an audio quotation and a duration (in beats), then transpiles and plays the sound in the background. Here, `0.5 play` plays the sound for half a beat.",example:"440 sine 0.5 mul 0.5 play",replCode:"440 sine 0.5 mul 0.5 play",assert:e=>e.length===0,expectedDescription:"Stack should be empty after playing"},{name:"Creating a Rhythm with `start`",description:"To create a continuous beat, use the `start` operator. The `impulse` operator creates a repeating trigger signal quotation. We can feed this into a pre-built drum machine like `bd` (bass drum) to create a persistent beat that must be stopped manually with `hush`.",example:"2 impulse bd start",replCode:"2 impulse bd start",assert:e=>e.length===0,expectedDescription:"Stack should be empty after starting the sound"},{name:"Rhythmic Phrasing with `play`",description:"The `play` operator can automatically create a rhythm. If you provide a `seq` node without an explicit clock, `play` will calculate the correct tempo to fit the sequence perfectly into the given duration. The `note` operator is a pure function that converts MIDI note numbers to frequencies.",example:"(60 64 67 72) note seq sine 0.4 mul 1 play",replCode:"(60 64 67 72) note seq sine 0.4 mul 1 play",assert:e=>e.length===0,expectedDescription:"Plays a 4-note arpeggio in 1 beat."},{name:"Composing a Song",description:"You can combine multiple sequences and voices to create a full musical piece. The `poly` operator automatically mixes its outputs, simplifying composition. The final sound quotation is started with `start` to make it loop.",example:`
# 1. Create a master clock signal quotation
8 impulse

# 2. Use the 'poly' combinator to create and automatically mix three drum parts.
# Each part is a quotation that takes the clock and produces a final, gain-adjusted drum sound quotation.
(
  ( (1 0 1 0 1 0 1 0) seq hh 0.5 mul )  # Hi-hat with gain 0.5
  ( (0 0 1 0 0 0 1 0) seq sd 0.8 mul )  # Snare with gain 0.8
  ( (1 0 0 0 1 0 0 0) seq bd 1.0 mul )  # Kick with gain 1.0
) poly

# The stack now contains a single mixed drum quotation.

# 3. Create the bassline quotation using a fresh clock signal.
8 impulse (40 40 43 45 43 40 40 35) note seq saw 0.2 mul

# 4. Mix the combined drums quotation with the bassline quotation.
mix

# 5. Apply a master gain and start the final mix.
0.4 mul start`,replCode:`
# 1. Create a master clock signal quotation
8 impulse

# 2. Use the 'poly' combinator to create and automatically mix three drum parts.
# Each part is a quotation that takes the clock and produces a final, gain-adjusted drum sound quotation.
(
  ( (1 0 1 0 1 0 1 0) seq hh 0.5 mul )  # Hi-hat with gain 0.5
  ( (0 0 1 0 0 0 1 0) seq sd 0.8 mul )  # Snare with gain 0.8
  ( (1 0 0 0 1 0 0 0) seq bd 1.0 mul )  # Kick with gain 1.0
) poly

# The stack now contains a single mixed drum quotation.

# 3. Create the bassline quotation using a fresh clock signal.
8 impulse (40 40 43 45 43 40 40 35) note seq saw 0.2 mul

# 4. Mix the combined drums quotation with the bassline quotation.
mix

# 5. Apply a master gain and start the final mix.
0.4 mul start
`,assert:e=>e.length===0,expectedDescription:"Stack should be empty after starting the song"},{name:"Arpeggiated Chord Progression",description:"Live loops are powerful for building up song structures. Here, we create two separate loops running in parallel: one for a chiptune-style arpeggiated chord progression using a pulse wave, and another for a simple sine wave bassline. Both loops use the `elapsed` time to stay in sync.",example:`120 tempo

(
  elapsed 2 * floor 4 %
  ( (60 4 7) (55 4 7) (57 3 7) (53 4 7) ) swap at
  spread
  20 arp
  0.25 pulse 0.3 mul
  1.0 play
) 1.0 live :chords =>

(
  elapsed 2 * floor 4 %
  (48 43 45 41) swap at
  note sine
  (0.01 0.4 0 ahr) mul 0.4 mul
  1.0 play
) 1.0 live :bass =>

:chords
:bass`,replCode:`120 tempo

# --- Live Loop 1: Arpeggiated Chords (Pulse Wave) ---
(
  # Get current beat number, looping every 4 beats (a measure)
  elapsed 2 * floor 4 %
  
  # Chord progression data: (base_note third_semi fifth_semi)
  # C, G, Am, F
  ( (60 4 7) (55 4 7) (57 3 7) (53 4 7) ) swap at
  
  # Spread the chord data onto the stack
  spread
  
  # Arpeggiate at 20Hz
  20 arp
  
  # Use a pulse wave with 25% duty cycle and apply gain
  0.25 pulse 0.3 mul
  
  # Play it for 1 beat
  1.0 play
  
) 1.0 live :chords =>

# --- Live Loop 2: Bassline (Sine Wave) ---
(
  # Get current beat, synced with the chord loop
  elapsed 2 * floor 4 %
  
  # Bassline follows the chord roots one octave down: C, G, A, F
  (48 43 45 41) swap at
  
  # Convert MIDI note to frequency and create a sine wave
  note sine
  
  # Give it a simple envelope and gain
  (0.01 0.4 0 ahr) mul 0.4 mul
  
  # Play for 1 beat
  1.0 play

) 1.0 live :bass =>

# Start both loops
:chords
:bass`,async:{duration:600,assert:(e,o)=>{var c;const s=(c=o[":loops"])==null?void 0:c.body;return Array.isArray(s)&&s.includes(":chords")&&s.includes(":bass")},assertDescription:"Both the :chords and :bass loops should be running."}}]},shaders$1={name:"Shaders: Creating Visuals",description:"You can create 3D visuals using Signed Distance Fields (SDFs).",cells:[{name:"Rendering a Shape",description:"First, create a shape like a `sphere`. Then, use `march` to create a scene object. Finally, `render` turns the scene into a visual shader.",example:"0.5 sphere march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object"},{name:"Adding Color",description:"Use the `material` operator to apply a color to a shape. You can use preset color names as strings.",example:"0.5 sphere :red material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A red shader object"},{name:"Procedural Animation",description:"Animate properties of shapes and materials over time using `t` and `mousey`. This example animates the 'scale' of a `mandelbox` fractal and cycles its color through the rainbow.",example:`
# Animate the 'scale' parameter of the mandelbox over time and with the mouse
(t sin 0.5 * 1.5 + mousey 0.005 * +) glsl # Scale
5.0                                      # Iterations
2.0                                      # Fold
mandelbox

# Apply an animated material that cycles through the rainbow
(
  t 0.2 * # Animate hue over time
  1.0     # Full saturation
  1.0     # Full brightness
  hsv
) glsl material

# Set up the scene, add a camera for a better view, and render
march
0 0 5 vec3 0 0 0 vec3 camera
render
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A complex, animated shader object"},{name:"Animated Scene Tours",description:"The `path` operator can create cinematic fly-throughs of any 3D scene. You provide the scene and a path for the camera to follow, and it automatically carves a tunnel to avoid collisions.",example:`
# 1. A more detailed fractal world to make the tunnel more obvious
12 psychobox
# Make sure it's hollow for the fly-through by subtracting a smaller version
dup 0.95 scale 0.05 smoothDifference
# A procedural material based on position
(p 2 *) glsl curl material
march

# 2. Define a path that weaves through the fractal's holes
(
    t 0.2 * sin 2.0 *  # x: a sine wave
    t 0.3 * cos 2.0 *  # y: a cosine wave, creating a Lissajous curve
    t                  # z: move forward steadily
    vec3
) glsl

# 3. Create the tour. The 'path' operator carves a smooth tunnel.
path`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"An animated shader that flies through a psychedelic fractal."},{name:"Drawing Paths: The Flying Snake",description:"The `pathSDF` operator can render a path as a 3D tube, which is perfect for creating 'flying snake' or trail effects.",example:`
# 1. Define a spiraling path
(
    t 0.5 * sin # x
    t 0.5 * cos # y
    t           # z (moves forward over time)
    vec3
) glsl

# 2. Give the path a radius to create a tube
0.2

# 3. Create the path geometry
pathSDF

# 4. Apply a material that changes color along its length
(p z 0.5 *) glsl 1.0 1.0 hsv material

# 5. Set up the scene and a camera that follows the snake
march
(
    t 0.5 * sin 2 + # camera x
    t 0.5 * cos 2 + # camera y
    t               # z
    vec3
) glsl
(0 0 t vec3) glsl # camera target
camera
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:'A shader object rendering a colorful, spiraling "flying snake".'}]},repl$1={name:"Using REPL: System Commands",description:"The REPL has several built-in commands for managing your session.",cells:[{name:"Saving and Loading State",description:"`save` stores your current session (stack and definitions) in the browser's local storage. `load` restores it.",example:`1 2 3 "my-state" save 
clear 
"my-state" load`,expected:[1,2,3]},{name:"Undo and Redo in REPL",description:"The `undo` command reverts the last operation. `redo` applies it again. Left & right arrows also undo & redo. These operators work only in REPL.",example:["1 2 +","undo"],replCode:["1 2 +","undo"],expected:[]}]},projectEuler={name:"Yield for fun: Project Euler",description:"Solving classic programming puzzles with Yield is a great way to learn the language. Here are a few examples from Project Euler. The given solutions are not optimized in any way and Yield is running generator functions in JavaScript pushing and popping values to arrays in unnecessarily complex manner.",cells:[{name:"Problem 1: Multiples of 3 and 5",description:"If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000.",example:`
# 1. Generate numbers from 1 to 999
1 999 range

# 2. Filter for multiples of 3 or 5
(dup 3 % 0 == swap 5 % 0 == or) filter

# 3. Sum the resulting list
sum
`.trim(),expected:[233168]},{name:"Problem 2: Even Fibonacci Numbers",description:`Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:
1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.`,example:`
# Generator for Fibonacci numbers: 1, 2, 3, 5...
((0 1) (swap dupd +) yield) fib =>

# Summing the even ones, then pop the final number (>4M).
(fib dup 4000000 <) (dup 2 % 0 == (+) (pop) ?) while pop
`.trim(),expected:[4613732]},{name:"Problem 3: Largest Prime Factor",description:`The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143?`,example:`
# The strategy is to find the smallest prime factors first and divide them out
600851475143

# Handle all factors of 2 - the number here is odd, but this is for good practice:
(dup 2 % 0 ==) (2 /) while

# Start checking for odd divisors from 3
3

# Loop while D*D <= N. If D gets bigger than sqrt(N), the remaining N must be prime.
(over over dup * swap <=)
(over over % 0 == (swap over / swap) (2 +) ?) 
while

# After the loop, the stack is [N D]. The remaining N is the largest prime factor. Discard D.
pop
`.trim(),expected:[6857]},{name:"Problem n: Only 947 more to go...",description:"These are just a few examples to get you started. For a full list of challenging and fun mathematical problems that may or may not be good fit for concatenative languages, visit the Project Euler website: https://projecteuler.net/. There's surely enough to make you Yield!",example:"# Happy Yielding!"}]},forthFCode=`
# Define a word to print a single star
# 42 is the ASCII code for '*'
(42 chr print) STAR =>

# Define a word to print N stars
# Usage: 5 STARS -> prints *****
((STAR) swap times) STARS =>

# Define a word to print a newline and a margin of 30 spaces
(cr (" " print) 30 times) MARGIN =>

# Define words for the building blocks of the 'F'
(MARGIN STAR) BLIP =>
(MARGIN 5 STARS) BAR =>

# The final word that composes the blocks to print the 'F'
(BAR BLIP BAR BLIP BLIP cr) F =>

# Execute F to see the result
F`.trim(),forthClassics={name:"Yield by Example: Forth Classics",description:"Yield shares a spiritual lineage with classic concatenative languages like Forth. These examples demonstrate how concepts from Forth can be expressed in Yield, showcasing the power of composition and stack-based programming.",cells:[{name:"Printing a Large Letter 'F'",description:"This example recreates a classic Forth program for printing a large letter 'F' using asterisks. It demonstrates how to define a series of small, reusable helper words (like STAR, MARGIN, and BAR) and then compose them into a larger program (F) to create the final output.",replCode:forthFCode,example:forthFCode,assert:e=>e.length===0,expectedDescription:"The letter 'F' printed with asterisks in the result panel."}]},documentation=[gettingStarted,stackPrimitives,quotedPrograms,combinators$1,advancedExecution,audio$1,shaders$1,repl$1,projectEuler,forthClassics],iterate={definition:{exec:function*(e,o,s){const c=e.pop();yield*s(Array.isArray(c)?c:[c],e,o)},description:"Executes a program (quotation) from the stack. Alias: `i`.",effect:"[[P]] -> ..."},examples:[{code:"(1 1 +) iterate",expected:[2]},{code:"(1 2 +) i",expected:[3]},{code:"(iterate) meh => (1 1 +) meh",expected:[2]}]},dip={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();yield*s(c,e,o),e.push(p)},description:"Saves the top element, executes a program, then restores the element.",effect:"[A [P]] -> [A]"},examples:[{code:"10 (20 30 +) dip",expected:[50,10]},{code:"1 (2 3 +) dip (4 5 +) dip",expected:[5,9,1]}]},deepEqual=(e,o)=>JSON.stringify(e)===JSON.stringify(o),deepClone=e=>{try{return structuredClone(e)}catch{if(e===null||typeof e!="object")return e;if(e instanceof Array)return e.map(deepClone);if(e.constructor===Object){const s={};for(const c in e)e.hasOwnProperty(c)&&(s[c]=deepClone(e[c]));return s}return e}},isMatrix=e=>{if(!Array.isArray(e))return!1;if(e.length===0)return!0;const o=e[0];if(!Array.isArray(o))return!1;const s=o.length;return e.every(c=>Array.isArray(c)&&c.length===s)},isFlatList=e=>Array.isArray(e)&&!isMatrix(e),yieldFormatter=e=>{if(typeof e=="string")return e.startsWith("\0")?`"${e.slice(1)}"`:e;if(Array.isArray(e))return`(${e.map(yieldFormatter).join(" ")})`;if(e===!0)return"true";if(e===!1)return"false";if(typeof e=="object"&&e!==null){if(e.type==="until-process"){const{quotation:o,intervalBeats:s,endBeats:c}=e;return`(${yieldFormatter(o)} ${s} ${c} until)`}if(e.type==="until-def"){if(Array.isArray(e.sourceCode))return yieldFormatter(e.sourceCode);const{initialValue:o,quotation:s,intervalBeats:c,endBeats:p}=e;return`(${yieldFormatter(o)} ${yieldFormatter(s)} ${c} ${p} until)`}if(e.type==="live-loop-def")return Array.isArray(e.sourceCode)?yieldFormatter(e.sourceCode):Array.isArray(e.quotation)&&typeof e.beatValue=="number"?`(${yieldFormatter(e.quotation)} ${e.beatValue} live)`:"<live-loop>";if(e.type==="shader")return"<shader>";if(e.type==="scene")return"<scene>";if(e.type==="light")return"<light>";if(e.type==="color")return"<color>";if(e.type==="glsl_expression")return"<glsl_expression>";if(e.type==="postEffect")return`<${e.op} effect>`;if(["geometry","combinator","transformation","alteration"].includes(e.type))return"<sdf>"}if(typeof e=="symbol"){const o=Symbol.keyFor(e);return o!==void 0?`:${o}`:e.toString()}return String(e)},applyBinaryOp=(e,o,s)=>{if(typeof o=="number"&&typeof s=="number"){const c=e(o,s);return c===null?null:c}if(Array.isArray(o)&&typeof s=="number")return o.map(c=>applyBinaryOp(e,c,s));if(typeof o=="number"&&Array.isArray(s))return s.map(c=>applyBinaryOp(e,o,c));if(Array.isArray(o)&&Array.isArray(s)){const c=[];for(const p of o)for(const u of s){const f=applyBinaryOp(e,p,u);Array.isArray(f)?c.push(...f):c.push(f)}return c}throw new Error(`Incompatible types for binary math operation: ${yieldFormatter(o)} and ${yieldFormatter(s)}`)},isMarchingObject=e=>e&&typeof e=="object"&&["geometry","combinator","transformation","alteration"].includes(e.type),createMarchingObject=(e,o,s,c={})=>({op:e,type:o,children:s,props:c}),isColorObject=e=>e&&typeof e=="object"&&e.type==="color",materialPresets={red:[1,.2,.2],green:[.2,1,.2],blue:[.2,.2,1],yellow:[1,1,.2],cyan:[.2,1,1],magenta:[1,.2,1],white:[1,1,1],black:[0,0,0],gray:[.5,.5,.5],orange:[1,.5,0],purple:[.5,0,1],teal:[0,.5,.5]},toGLSL=e=>{if((e==null?void 0:e.type)==="glsl_expression")return e.code;if(isColorObject(e))return e.expression;if(typeof e=="number"){const o=e.toString();return Number.isInteger(e)&&!o.includes("e")&&!o.includes(".")?o+".0":o}if(typeof e=="symbol"){const o=Symbol.keyFor(e);if(o&&materialPresets[o])return toGLSL(materialPresets[o])}if(typeof e=="string")return materialPresets[e]?toGLSL(materialPresets[e]):e;if(Array.isArray(e)){if(isMatrix(e)){const o=e,s=o.length;if(s===0)return"";const c=o[0].length;if(s!==c)return"";const p=o.flat();return s===3?`mat3(${p.map(u=>toGLSL(u)).join(", ")})`:s===4?`mat4(${p.map(u=>toGLSL(u)).join(", ")})`:""}if(e.length===2)return`vec2(${e.map(toGLSL).join(", ")})`;if(e.length===3)return`vec3(${e.map(toGLSL).join(", ")})`;if(e.length===4)return`vec4(${e.map(toGLSL).join(", ")})`}return""},jsOpMap={"+":(e,o)=>`(${o} + ${e})`,"-":(e,o)=>`(${o} - ${e})`,"*":(e,o)=>`(${o} * ${e})`,"/":(e,o)=>`(${o} / ${e})`,"%":(e,o)=>`(${o} % ${e})`,">>":(e,o)=>`(${o} >> ${e})`,"<<":(e,o)=>`(${o} << ${e})`,"&":(e,o)=>`(${o} & ${e})`,"|":(e,o)=>`(${o} | ${e})`,"^":(e,o)=>`(${o} ^ ${e})`,"~":e=>`(~${e})`,sin:e=>`Math.sin(${e})`,cos:e=>`Math.cos(${e})`,tan:e=>`Math.tan(${e})`,pow:(e,o)=>`Math.pow(${o}, ${e})`,sqrt:e=>`Math.sqrt(${e})`,abs:e=>`Math.abs(${e})`,floor:e=>`Math.floor(${e})`,ceil:e=>`Math.ceil(${e})`,round:e=>`Math.round(${e})`,clamp:(e,o,s)=>`Math.max(${o}, Math.min(${e}, ${s}))`,">":(e,o)=>`((${o} > ${e}) ? 1 : 0)`,"<":(e,o)=>`((${o} < ${e}) ? 1 : 0)`,">=":(e,o)=>`((${o} >= ${e}) ? 1 : 0)`,"<=":(e,o)=>`((${o} <= ${e}) ? 1 : 0)`,"==":(e,o)=>`((${o} === ${e}) ? 1 : 0)`,"!=":(e,o)=>`((${o} !== ${e}) ? 1 : 0)`,"?":(e,o,s)=>`(${s} ? ${o} : ${e})`,ifte:(e,o,s)=>`(${s} ? ${o} : ${e})`},jsArityMap={"+":2,"-":2,"*":2,"/":2,"%":2,">>":2,"<<":2,"&":2,"|":2,"^":2,"~":1,sin:1,cos:1,tan:1,pow:2,sqrt:1,abs:1,floor:1,ceil:1,round:1,clamp:3,">":2,"<":2,">=":2,"<=":2,"==":2,"!=":2,"?":3,ifte:3},boolifyGLSL=e=>e==="u_moused.z"?`(${e} > 0.5)`:/^-?\d+(\.\d*)?$/.test(e)?`(${e} != 0.0)`:e,glslOpMap={"+":(e,o)=>`(${o} + ${e})`,"-":(e,o)=>`(${o} - ${e})`,"*":(e,o)=>`(${o} * ${e})`,"/":(e,o)=>`(${o} / ${e})`,"%":(e,o)=>`mod(${o}, ${e})`,">":(e,o)=>`(${o} > ${e})`,"<":(e,o)=>`(${o} < ${e})`,">=":(e,o)=>`(${o} >= ${e})`,"<=":(e,o)=>`(${o} <= ${e})`,"==":(e,o)=>`(${o} == ${e})`,"!=":(e,o)=>`(${o} != ${e})`,"?":(e,o,s)=>`(${boolifyGLSL(s)} ? ${o} : ${e})`,ifte:(e,o,s)=>`(${boolifyGLSL(s)} ? ${o} : ${e})`,sin:e=>`sin(${e})`,cos:e=>`cos(${e})`,tan:e=>`tan(${e})`,exp:e=>`exp(${e})`,pow:(e,o)=>`pow(${o}, ${e})`,sqrt:e=>`sqrt(${e})`,abs:e=>`abs(${e})`,neg:e=>`(-${e})`,floor:e=>`floor(${e})`,ceil:e=>`ceil(${e})`,round:e=>`round(${e})`,snoise:e=>`snoise(${e})`,fbm:e=>`fbm(${e})`,curl:e=>`curl(${e})`,fuse:(e,o,s)=>`mix(${s}, ${o}, ${e})`,clamp:(e,o,s)=>`clamp(${s}, ${o}, ${e})`,smoothstep:(e,o,s)=>`smoothstep(${o}, ${e}, ${s})`,cnoise:e=>`cnoise(${e})`,dot:(e,o)=>`dot(${o}, ${e})`,fract:e=>`fract(${e})`,length:e=>`length(${e})`,rotate:(e,o,s)=>`opRot(${s}, ${o}, ${e})`,translate:(e,o)=>`opTx(${o}, ${e})`,juliaset:(e,o,s)=>`juliaSDF(${s}, ${o}, ${e})`,mandelbrotSDF:(e,o)=>`mandelbrotSDF(${o}, ${e})`,mandelbrotset:(e,o)=>`mandelbrotSDF(${o}, ${e})`,vec2:(e,o)=>`vec2(${o}, ${e})`,vec3:(e,o,s)=>`vec3(${s}, ${o}, ${e})`,vec4:(e,o,s,c)=>`vec4(${c}, ${s}, ${o}, ${e})`,hsv:(e,o,s)=>`hsv2rgb(vec3(${s}, ${o}, ${e}))`,distEuclidean:(e,o)=>`distEuclidean(${o}, ${e})`,distManhattan:(e,o)=>`distManhattan(${o}, ${e})`,distChebychev:(e,o)=>`distChebychev(${o}, ${e})`,distMinkowski:(e,o,s)=>`distMinkowski(${s}, ${o}, ${e})`,worley:e=>`worley(${e})`,arc2d:(e,o,s,c)=>`sdArc2d(${c}, ${s}, ${o}, ${e})`,box2d:(e,o)=>`sdBox2d(${o}, ${e})`,circle2d:(e,o)=>`sdCircle2d(${o}, ${e})`,cross2d:(e,o,s)=>`sdCross2d(${s}, ${o}, ${e})`,ellipse2d:(e,o)=>`sdEllipse2d(${o}, ${e})`,equilateralTriangle2d:(e,o)=>`sdEquilateralTriangle2d(${o}, ${e})`,heart2d:e=>`sdHeart2d(${e})`,hexagon2d:(e,o)=>`sdHexagon2d(${o}, ${e})`,hexagram2d:(e,o)=>`sdHexagram2d(${o}, ${e})`,isoscelesTriangle2d:(e,o)=>`sdIsoscelesTriangle2d(${o}, ${e})`,moon2d:(e,o,s,c)=>`sdMoon2d(${c}, ${s}, ${o}, ${e})`,octogon2d:(e,o)=>`sdOctogon2d(${o}, ${e})`,parallelogram2d:(e,o,s,c)=>`sdParallelogram2d(${c}, ${s}, ${o}, ${e})`,pentagon2d:(e,o)=>`sdPentagon2d(${o}, ${e})`,pie2d:(e,o,s)=>`sdPie2d(${s}, ${o}, ${e})`,rhombus2d:(e,o)=>`sdRhombus2d(${o}, ${e})`,roundedbox2d:(e,o,s)=>`sdRoundedbox2d(${s}, ${o}, ${e})`,roundedx2d:(e,o,s)=>`sdRoundedx2d(${s}, ${o}, ${e})`,segment2d:(e,o,s)=>`sdSegment2d(${s}, ${o}, ${e})`,star2d:(e,o,s,c)=>`sdStar2d(${c}, ${s}, ${o}, ${e})`,trapezoid2d:(e,o,s,c)=>`sdTrapezoid2d(${c}, ${s}, ${o}, ${e})`,triangle2d:(e,o,s,c)=>`sdTriangle2d(${c}, ${s}, ${o}, ${e})`,vesica2d:(e,o,s)=>`sdVesica2d(${s}, ${o}, ${e})`,shape:(e,o,s)=>`sdNgon2d(${s}, ${e}, ${o})`,union:(e,o)=>`min(${o}, ${e})`,difference:(e,o)=>`max(${o}, -${e})`,intersection:(e,o)=>`max(${o}, ${e})`},glslArityMap={"+":2,"-":2,"*":2,"/":2,"%":2,">":2,"<":2,">=":2,"<=":2,"==":2,"!=":2,"?":3,ifte:3,sin:1,cos:1,tan:1,exp:1,pow:2,sqrt:1,abs:1,neg:1,floor:1,ceil:1,round:1,snoise:1,fbm:1,curl:1,fuse:3,clamp:3,smoothstep:3,cnoise:1,dot:2,fract:1,length:1,rotate:3,translate:2,juliaset:3,mandelbrotSDF:2,mandelbrotset:2,vec2:2,vec3:3,vec4:4,hsv:3,distEuclidean:2,distManhattan:2,distChebychev:2,distMinkowski:3,worley:1,arc2d:4,box2d:2,circle2d:2,cross2d:3,ellipse2d:2,equilateralTriangle2d:2,heart2d:1,hexagon2d:2,hexagram2d:2,isoscelesTriangle2d:2,moon2d:4,octogon2d:2,parallelogram2d:4,pentagon2d:2,pie2d:3,rhombus2d:2,roundedbox2d:3,roundedx2d:3,segment2d:3,star2d:4,trapezoid2d:4,triangle2d:4,vesica2d:3,shape:3,union:2,difference:2,intersection:2},transpileQuotation=(e,o,s,c,p)=>{const u=[],f=[...e],h=m=>/^[a-zA-Z_][a-zA-Z0-9_]*(\.[xyzw]{1,4})*$/.test(m),g=m=>m.startsWith("(")&&m.endsWith(")");for(;f.length>0;){if(p&&f.length>1&&Array.isArray(f[0])&&f[1]==="glsl"){const b=f.shift();f.shift();const v=transpileQuotation(b,o,s,c,p);u.push(v);continue}const m=f.shift();if((m==null?void 0:m.type)==="glsl_expression"){u.push(m.code);continue}if(Array.isArray(m)){const b=transpileQuotation(m,o,s,c,p);u.push(`(${b})`);continue}if(typeof m=="number"){u.push(p?toGLSL(m):String(m));continue}if(typeof m=="string"){if(c.has(m)){let S=m;p&&(m==="t"&&(S="u_time"),m==="mouse"&&(S="u_mouse.xy"),m==="mousex"&&(S="u_mouse.x"),m==="mousey"&&(S="u_mouse.y"),m==="moused"&&(S="u_moused.xy"),m==="mousedx"&&(S="u_moused.x"),m==="mousedy"&&(S="u_moused.y"),m==="moused?"&&(S="u_moused.z"),m==="width"&&(S="u_resolution.x"),m==="height"&&(S="u_resolution.y"),m==="uv"&&(S="(gl_FragCoord.xy / u_resolution.xy)")),u.push(S);continue}if(m==="vec4"){const S=o[m],E=s[m];if(u.length>=E){const _=[];for(let q=0;q<E;q++)_.push(u.pop());u.push(S(..._))}else if(u.length===3){const _=u.pop(),q=u.pop(),R=u.pop();u.push(`vec4(${R}, ${q}, ${_})`)}else if(u.length===2){const _=u.pop(),q=u.pop();u.push(`vec4(${q}, ${_})`)}else if(u.length===1){const _=u.pop();u.push(`vec4(${_})`)}else throw new Error("Stack underflow for operator in quotation: 'vec4'.");continue}if(m==="dup"){if(u.length<1)throw new Error("Stack underflow for 'dup' in quotation.");u.push(u[u.length-1]);continue}if(m==="dupd"){if(u.length<2)throw new Error("Stack underflow for 'dupd' in quotation.");const S=u.pop(),E=u[u.length-1];u.push(E,S);continue}if(m==="over"){if(u.length<2)throw new Error("Stack underflow for 'over' in quotation.");u.push(u[u.length-2]);continue}if(m==="swap"){if(u.length<2)throw new Error("Stack underflow for 'swap' in quotation.");const S=u.pop(),E=u.pop();u.push(S,E);continue}if(m==="swapd"){if(u.length<3)throw new Error("Stack underflow for 'swapd' in quotation.");const S=u.pop(),E=u.pop(),_=u.pop();u.push(E,_,S);continue}if(m==="tuck"){if(u.length<2)throw new Error("Stack underflow for 'tuck' in quotation.");const S=u.pop(),E=u.pop();u.push(S,E,S);continue}if(m==="rolldown"){if(u.length<3)throw new Error("Stack underflow for 'rolldown' in quotation.");const S=u.pop(),E=u.pop(),_=u.pop();u.push(E,S,_);continue}if(m==="rollup"){if(u.length<3)throw new Error("Stack underflow for 'rollup' in quotation.");const S=u.pop(),E=u.pop(),_=u.pop();u.push(S,_,E);continue}if(m==="rotate"){if(u.length<3)throw new Error("Stack underflow for 'rotate' in quotation.");const S=u.pop(),E=u.pop(),_=u.pop();u.push(S,E,_);continue}if(m==="pop"){if(u.length<1)throw new Error("Stack underflow for 'pop' in quotation.");u.pop();continue}if(m==="popd"){if(u.length<2)throw new Error("Stack underflow for 'popd' in quotation.");const S=u.pop();u.pop(),u.push(S);continue}if(p&&/^[xyzw]{1,4}$/.test(m)){if(u.length<1)throw new Error(`Stack underflow for swizzle operator '${m}'.`);const S=u.pop(),E=h(S)||g(S)?S:`(${S})`;u.push(`${E}.${m}`);continue}const v=o[m];if(v){const S=s[m]||v.length;if(u.length<S)throw new Error(`Stack underflow for operator in quotation: '${m}'.`);const E=[];for(let _=0;_<S;_++)E.push(u.pop());u.push(v(...E));continue}}throw new Error(`Unsupported operator in quotation: '${yieldFormatter(m)}'.`)}if(u.length!==1){if(u.length===0&&e.length===0)return"";throw new Error(`Quotation must result in a single value on the stack, but resulted in ${u.length} values: [${u.join(", ")}]`)}return u[0]},transpileJS=e=>transpileQuotation(e,jsOpMap,jsArityMap,new Set(["t","mousex","mousey","mousedx","mousedy"]),!1),transpileGLSL=e=>transpileQuotation(e,glslOpMap,glslArityMap,new Set(["p","t","uv","width","height","mouse","mousex","mousey","moused","mousedx","mousedy","moused?","u_resolution"]),!0),dupdip={definition:{exec:function*(e,o,s){if(e.length<1)throw new Error("Stack underflow for operator: dupdip");const c=e.pop();if(!Array.isArray(c))throw e.push(c),new Error("dupdip expects a quotation on top of the stack.");if(e.length<1)throw e.push(c),new Error("Stack underflow for operator: dupdip");const p=e[e.length-1],u=[deepClone(p)];yield*s(c,u,o),e.push(...u)},description:"Executes a quotation on a copy of the second stack item, leaving the original item and the result on the stack.",effect:"[X [P]] -> [X P(X)]"},examples:[{code:"23 (succ) dupdip *",expected:[552]},{code:"10 (dup *) dupdip swap -",expected:[90]},{code:"5 (++) dupdip",expected:[5,6]},{code:"5 dupdip",expectedError:"dupdip expects a quotation on top of the stack."},{code:"dupdip",expectedError:"Stack underflow for operator: dupdip"}]},map={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(isMatrix(p)){const u=p,f=[];for(const h of u){const g=[];for(const m of h){const b=[m];yield*s([...c],b,o),b.length===0?g.push(null):g.push(b[b.length-1])}f.push(g)}e.push(f)}else if(Array.isArray(p)){const u=[];for(const f of p){const h=[f];yield*s([...c],h,o),u.push(...h)}e.push(u)}else throw e.push(p,c),new Error("map expects a list or a matrix.")},description:"Applies a program to each element of an aggregate. For a list, it creates a new list by concatenating the results of each application. For a matrix, it creates a new matrix of the same dimensions where each element is the result of applying the program to the corresponding input element. If the program leaves multiple items on the stack for a matrix element, only the top item is used.",effect:"[L|M [P]] -> [L'|M']"},examples:[{code:"(1 2 3 4) (dup *) map",expected:[[1,4,9,16]]},{code:"() (succ) map",expected:[[]]},{code:"(1 2) (dup dup) map",expected:[[1,1,1,2,2,2]]},{code:"((1 2)(3 4)) (succ) map",expected:[[[2,3],[4,5]]]},{code:"((1 2)(3 4)) (dup *) map",expected:[[[1,4],[9,16]]]},{code:"((1 2)(3 4)) (pop (5 6)) map",expected:[[[[5,6],[5,6]],[[5,6],[5,6]]]]},{code:"((1 2)(3 4)) (dup dup) map",expected:[[[1,2],[3,4]]]}]},filter={definition:{exec:function*(e,o,s){const[c,p]=[e.pop(),e.pop()],u=[];for(const f of p){const h=[f];yield*s([...c],h,o),h.pop()&&u.push(f)}e.push(u)},description:"Creates a new list containing only elements for which a program returns true.",effect:"[L [P]] -> [L']"},examples:[{code:"(1 2 3 4 5) (2 % 0 ==) filter",expected:[[2,4]]},{code:'("a" "b" 1 2) (string?) filter',expected:[["a","b"]]}]},step={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(p))throw new Error(`step operator expects a list to iterate over, but got: ${yieldFormatter(p)}`);for(const u of p)e.push(u),yield*s([...c],e,o)},description:"Applies a program to each element of a list, accumulating results on the main stack.",effect:"[A L [P]] -> ..."},examples:[{code:"0 (1 2 3 4) (+) step",expected:[10]},{code:"1 (2 3 4) (*) step",expected:[24]}]},ifte={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();yield*s(e.pop()?p:c,e,o)},description:"If-then-else (alias: ?). If B is true, executes T, else executes F.",effect:"[B [T] [F]] -> ..."},examples:[{code:"true (1) (2) ifte",expected:[1]},{code:"false (1) (2) ifte",expected:[2]},{code:'1 0 > ("yes") ("no") ifte',expected:["yes"]},{code:'1 0 > ("yes") ("no") ?',expected:["yes"]}]},times={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(typeof c!="number"||!Number.isInteger(c)||c<0)throw new Error("times expects an integer count on top of the stack.");if(p===void 0)throw new Error("times expects a program on the stack.");const u=Array.isArray(p)?p:[p];for(let f=0;f<c;f++)yield*s([...u],e,o)},description:"Executes a program a specific number of times.",effect:"[X N [P]] -> [...]"},examples:[{code:"10 (2 *) 3 times",expected:[80]},{code:"0 (succ) 5 times",expected:[5]},{code:["0 :state =","(1 +) combinator =","(:state combinator yield) :next =",":next 3 times"],expected:[1,2,3]}]},whileOp={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();for(yield*s([...p],e,o);e.pop();)yield*s([...c],e,o),yield*s([...p],e,o)},description:"Executes a body program as long as a test program returns true.",effect:"[ [B] [D] ] -> ..."},examples:[{code:"0 (dup 5 <) (succ) while",expected:[5],expectedDescription:"A simple counter from 0 up to 5."},{code:"0 5 (dup 0 >) (swap over + swap 1 -) while pop",expected:[15],expectedDescription:"Calculates the sum of numbers from 5 down to 1."},{code:["() :nums =","5 (dup 0 >) (dup :nums <- pred) while pop",":nums"],expected:[[5,4,3,2,1]],expectedDescription:"Collects countdown values into a list variable."},{code:"6 (dup 1 >) (dup 2 % 0 == (2 /) (3 * 1 +) ?) while",expected:[1],expectedDescription:"Calculates a Collatz sequence, demonstrating `while` with an `ifte` (?) condition in its body."}]},branch={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();e.pop()?yield*s(p,e,o):yield*s(c,e,o)},description:"If the boolean B is true, executes T, otherwise executes F.",effect:"[B [T] [F]] -> ..."},examples:[{code:'10 5 > ("Greater") ("Not Greater") branch',expected:["Greater"]},{code:'5 10 > ("Greater") ("Not Greater") branch',expected:["Not Greater"]}]},cleave={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop(),u=e.pop(),f=[u];yield*s(p,f,o);const h=[u];yield*s(c,h,o),e.push(...f,...h)},description:"Applies two programs to the same value, leaving both results on the stack.",effect:"[X [P1] [P2]] -> [R1 R2]"},examples:[{code:"10 (dup *) (1 +) cleave",expected:[100,11]},{code:"(1 2) (size) (first) cleave",expected:[2,1]}]},cond={definition:{exec:function*(e,o,s){const c=e.pop();if(!Array.isArray(c)||c.length===0)return;const p=e[e.length-1],u=c.pop();for(const f of c){if(!Array.isArray(f)||f.length!==2)continue;const[h,g]=f,m=[p];if(yield*s(h,m,o),m.pop()){yield*s(g,e,o);return}}Array.isArray(u)&&u.length>0&&(yield*s(u[0],e,o))},description:"Executes the program for the first true condition. The last element is the default case.",effect:"[V [ [C1 T1] .. [D] ]] -> ..."},examples:[{code:'2 (( (1 ==) (pop "one") ) ( (2 ==) (pop "two") ) ( (pop "other") )) cond',expected:["two"]},{code:'3 (( (1 ==) (pop "one") ) ( (2 ==) (pop "two") ) ( (pop "other") )) cond',expected:["other"]}]},body={definition:{exec:function*(e,o,s,c){const p=e.pop();let u,f;if(typeof p=="symbol"){const g=Symbol.keyFor(p);if(!g)throw new Error("body: cannot get body of a non-global symbol.");u=`:${g}`,f=`:${g}`}else if(typeof p=="string"||typeof p=="number")u=String(p),f=String(p);else throw new Error(`body: expects a name, symbol, or integer, but got: ${JSON.stringify(p)}`);const h=c[u];if(h&&"body"in h)e.push(h.body);else throw new Error(`body: '${f}' is not a user-defined symbol or has no body.`)},description:"Pushes the body (quotation) of a user-defined function onto the stack. Expects the name of the function as a bare word.",effect:"[W] -> [[B]]"},examples:[{code:"(1 +) inc = inc body",expected:[[1,"+"]]},{code:"(1 2 3) mylist = mylist body",expected:[[1,2,3]]},{code:"(42) 1 = 1 body",expected:[[42]]},{code:'("hi") :msg = :msg body',expected:[["hi"]]}]},yieldOp={definition:{exec:function*(e,o,s,c){const p=e.pop(),u=e.pop();let f,h=!1,g=p;const m=typeof p=="symbol"?`:${Symbol.keyFor(p)}`:typeof p=="string"?p:"";if(m){const v=c[m];v&&"body"in v&&(!Array.isArray(v.body)||v.body[v.body.length-1]!=="i")&&(g=v.body)}let b;if(Array.isArray(u)&&u.length===2&&typeof u[1]=="symbol"){const v=u[0];f=`:${Symbol.keyFor(u[1])}`,c[f]||(c[f]={body:v,description:"User-defined state variable.",example:""}),h=!0,b=c[f]}else{if(typeof u=="symbol"){const v=Symbol.keyFor(u);v&&(f=`:${v}`)}else(typeof u=="string"||typeof u=="number")&&(f=String(u));b=f?c[f]:void 0,b&&"body"in b&&(h=!0)}if(h&&f){const v=b.body,S=Array.isArray(v)?[...v]:[v];yield*s(g,S,o),c[f].body=S.length===1?S[0]:S,S.length>0&&e.push(S[S.length-1])}else{const v=u;if(Array.isArray(v)){const S=[v];yield*s(g,S,o),S.length>1?e.push(S):e.push(...S)}else{e.push(v);const S=[v];yield*s(g,S,o),e.push(...S)}}},description:"A stateful generator combinator. It applies a program to a value or a named variable to evolve its state, then pushes the new top value onto the stack. Syntax: `variable_name_or_value program_name_or_quotation yield`.",effect:"[V_name P_name] -> [T]"},examples:[{code:"1 (1 +) yield",expected:[1,2]},{code:"1 (1) yield",expected:[1,1,1]},{code:["2 :foo =",":foo (1 +) yield",":foo"],expected:[3,3]},{code:"1 (1 2) (dup +) yield",expected:[1,[2,3,3,4]],expectedDescription:"To perform an outer-product sum on a list within yield, then proceed with 'dup' and '+'"},{code:["0 :state =","(succ) :combinator =","(:state :combinator yield) next =>","next next next"],expected:[1,2,3]},{code:["(1 1) :fib_state =","(swap dupd +) :program =","(:fib_state :program yield) :fib =>",":fib :fib :fib :fib :fib"],expected:[2,3,5,8,13]},{code:["10 1 =","1 (succ) yield"],expected:[11]},{code:["0 :state =","(1 +) :combinator =","(:state :combinator yield) :next =>",":next :next :next"],expected:[1,2,3]},{code:["((0) (1 +) yield) next =>","next next next"],expected:[1,2,3]},{code:["(0 (1 +) yield) next =>","next next next"],expected:[1,2,3]},{code:["((1 1) (dupd swap + swap succ swap) yield) next_caterer =>","1","(next_caterer) 5 times"],expected:[1,2,4,7,11,16]}]},chain={definition:{exec:function*(e,o,s,c){const p=e.pop();if(!Array.isArray(p))throw new Error("chain expects a quotation on the stack.");const u=new Set([...Object.keys(operatorModules.combinators.definitions),...Object.keys(operatorModules.recursion.definitions)]),f=function*(h,g,m){const b=Array.isArray(h)?[...h]:[h];for(;b.length>0;){let v=b.shift();typeof v=="string"&&Yield.aliases[v]&&(v=Yield.aliases[v]);const S=typeof v=="string"||typeof v=="number"?c[String(v)]:void 0;S&&"body"in S&&(!Array.isArray(S.body)||S.body[S.body.length-1]!=="iterate")?yield*f(S.body,g,m):S&&"definition"in S&&u.has(v)?yield*S.definition.exec(g,m,f,c):yield*s([v],g,m)}};yield*f(p,e,o)},description:"Deep execution combinator. Executes a program, but when it encounters a user-defined word that was defined as data (with `=`), it recursively executes the body of that word instead of pushing it to the stack. This allows for composing functions from data definitions.",effect:"[[P]] -> ..."},examples:[{code:`
# Define words using '=' (as data)
(42 chr print) STAR =
((STAR) swap times) STARS =
(cr (" " print) 30 times) MARGIN =
(MARGIN STAR) BLIP =
(MARGIN 5 STARS) BAR =

# Use 'chain' to execute the final composition
(BAR BLIP BAR BLIP BLIP cr) chain
`,assert:e=>e.length===0,expectedDescription:"The letter 'F' printed with asterisks in the result panel, composed from data definitions via 'chain'."}]},combinators={name:"Combinators",description:"Higher-order functions that control execution flow.",definitions:{iterate,i:iterate,dip,dupdip,map,filter,step,ifte,"?":ifte,times,while:whileOp,branch,cleave,cond,body,yield:yieldOp,chain}},acos={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.acos(c)))):e.push(Math.acos(o))},description:"Arccosine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0.5 acos",assert:e=>e.length===1&&typeof e[0]=="number"&&e[0].toFixed(15)==="1.047197551196598"},{code:"1 acos",expected:[0]},{code:"((0.5 1)(0 -1)) acos",assert:e=>isMatrix(e[0])}]},asin={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.asin(c)))):e.push(Math.asin(o))},description:"Arcsine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0.5 asin",assert:e=>e.length===1&&typeof e[0]=="number"&&e[0].toFixed(15)==="0.523598775598299"},{code:"0 asin",expected:[0]},{code:"((0.5 0)(1 -1)) asin",assert:e=>isMatrix(e[0])}]},atan={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.atan(c)))):e.push(Math.atan(o))},description:"Arctangent. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"1 atan",expected:[.7853981633974483]},{code:"0 atan",expected:[0]},{code:"((1 0)(10 -10)) atan",assert:e=>isMatrix(e[0])}]},atan2={definition:{exec:function*(e){const o=(f,h)=>Math.atan2(f,h);if(e.length<2)throw new Error("atan2 operator requires two arguments.");const s=e.pop(),c=e.pop(),p=applyBinaryOp(o,c,s);typeof c=="number"&&Array.isArray(s)||Array.isArray(c)&&typeof s=="number"?e.push(p):isFlatList(p)?e.push(...p):e.push(p)},description:'Arctangent of a quotient (y/x). Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting.',effect:"[Y X] -> [C]"},examples:[{code:"1 1 atan2",expected:[.7853981633974483]},{code:"10 5 atan2",assert:e=>e.length===1&&typeof e[0]=="number",expectedType:"number"},{code:"(10 20) 5 atan2",expected:[[1.1071487177940904,1.3258176636680326]]},{code:"10 (5 10) atan2",expected:[[1.1071487177940904,.7853981633974483]]},{code:"(1 10) (1 5) atan2",assert:e=>e.length===4,expectedDescription:"Four float results on the stack."}]},ceil={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.ceil(c)))):e.push(Math.ceil(o))},description:"Rounds a number up to the nearest integer. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"3.1 ceil",expected:[4]},{code:"((3.1 2.9)(-1.5 0)) ceil",expected:[[[4,3],[-1,0]]]}]},cos={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.cos(c)))):e.push(Math.cos(o))},description:"Cosine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0.5 cos",assert:e=>e.length===1&&typeof e[0]=="number"},{code:"0 cos",expected:[1]},{code:"((0 0.5)(1 2)) cos",assert:e=>isMatrix(e[0])}]},cosh={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.cosh(c)))):e.push(Math.cosh(o))},description:"Hyperbolic cosine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0 cosh",expected:[1]},{code:"((0 1)(-1 2)) cosh",assert:e=>isMatrix(e[0])}]},exp={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.exp(c)))):e.push(Math.exp(o))},description:"Exponential function (e^x). Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"1 exp",expected:[Math.E]},{code:"0 exp",expected:[1]},{code:"((0 1)(2 3)) exp",assert:e=>isMatrix(e[0])}]},floor={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.floor(c)))):e.push(Math.floor(o))},description:"Rounds a number down to the nearest integer. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"3.7 floor",expected:[3]},{code:"((3.7 2.1)(-1.5 0)) floor",expected:[[[3,2],[-2,0]]]}]},ln={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.log(c)))):e.push(Math.log(o))},description:"Natural logarithm (base e). Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"1 ln",expected:[0]},{code:"((1 2)(10 20)) ln",assert:e=>isMatrix(e[0])}]},log10={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.log10(c)))):e.push(Math.log10(o))},description:"Base-10 logarithm. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"100 log10",expected:[2]},{code:"((100 1000)(1 10)) log10",expected:[[[2,3],[0,1]]]}]},pow={definition:{exec:function*(e){const o=(f,h)=>Math.pow(f,h);if(e.length===1&&Array.isArray(e[0])){const f=e.pop();if(f.length===0)throw new Error("pow with a single empty list is not supported.");const[h,...g]=f,m=g.reduce((b,v)=>applyBinaryOp(o,b,v),h);isFlatList(m)?e.push(...m):e.push(m);return}if(e.length<2)throw new Error("pow operator requires two arguments.");const s=e.pop(),c=e.pop(),p=applyBinaryOp(o,c,s);typeof c=="number"&&Array.isArray(s)||Array.isArray(c)&&typeof s=="number"?e.push(p):isFlatList(p)?e.push(...p):e.push(p)},description:'Raises A to the power of B. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"2 8 pow",expected:[256]},{code:"(2 3 2) pow",expected:[64]},{code:"(4 (3 2)) pow",expected:[64,16]},{code:"(2 3) 2 pow",expected:[[4,9]]},{code:"2 (8 3) pow",expected:[[256,8]]},{code:"((2 3)(4 5)) 2 pow",expected:[[[4,9],[16,25]]]},{code:"(2 3) (2 4) pow",expected:[4,16,9,81]}]},sin={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.sin(c)))):e.push(Math.sin(o))},description:"Sine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0.5 sin",expected:[.479425538604203]},{code:"0 sin",expected:[0]},{code:"((0.5 0)(1 2)) sin",assert:e=>isMatrix(e[0])}]},sinh={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.sinh(c)))):e.push(Math.sinh(o))},description:"Hyperbolic sine. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0 sinh",expected:[0]},{code:"((0 1)(-1 2)) sinh",assert:e=>isMatrix(e[0])}]},sqrt={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.sqrt(c)))):e.push(Math.sqrt(o))},description:"Square root. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"25 sqrt",expected:[5]},{code:"((25 4)(9 16)) sqrt",expected:[[[5,2],[3,4]]]}]},tan={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.tan(c)))):e.push(Math.tan(o))},description:"Tangent. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"0 tan",expected:[0]},{code:"((0 1)(-1 2)) tan",assert:e=>isMatrix(e[0])}]},tanh={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.tanh(c)))):e.push(Math.tanh(o))},description:"Hyperbolic tangent. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"1 tanh",expected:[.7615941559557649]},{code:"0 tanh",expected:[0]},{code:"((0 1)(-1 2)) tanh",assert:e=>isMatrix(e[0])}]},trunc={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.trunc(c)))):e.push(Math.trunc(o))},description:"Truncates the fractional part of a number. Supports element-wise operation on matrices.",effect:"[F] -> [G]"},examples:[{code:"3.7 trunc",expected:[3]},{code:"((3.7 -2.1)(1.9 0)) trunc",expected:[[[3,-2],[1,0]]]}]},clamp={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(typeof c!="number"||typeof s!="number"||typeof o!="number")throw new Error("clamp requires three numbers: value, min, max.");e.push(Math.max(s,Math.min(o,c)))},description:"Clamps a value between a min and max. RPN: `val min max clamp`",effect:"[N N N] -> [N]"},examples:[{code:"5 0 10 clamp",expected:[5]},{code:"15 0 10 clamp",expected:[10]},{code:"-5 0 10 clamp",expected:[0]}]},jsMath={definitions:{acos,asin,atan,atan2,ceil,cos,cosh,exp,floor,ln,log10,pow,sin,sinh,sqrt,tan,tanh,trunc,clamp}},cons={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(o))throw new Error("cons expects a list");e.push([s,...o])},description:"Constructs a new list by prepending an element to a list. Expects element, then list on the stack.",effect:"[E L] -> [L']"},examples:[{code:"1 (2 3 4) cons",expected:[[1,2,3,4]]},{code:"() (1) cons",expected:[[[],1]]}]},append={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s))throw new Error("append expects a list");s.push(o),e.push(s)},description:"Appends an element to the end of a list (mutates the list).",effect:"[L E] -> [L']"},examples:[{code:"(1 2) 3 append",expected:[[1,2,3]]},{code:'() "a" append',expected:[["a"]]}]},uncons={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("uncons expects a list.");const[s,...c]=o;e.push(s,c)},description:"Deconstructs a list, pushing its first element and then the rest of the list.",effect:"[L] -> [E R]"},examples:[{code:"(10 20 30) uncons",expected:[10,[20,30]]},{code:'("a") uncons',expected:["a",[]]}]},first={definition:{exec:function*(e){e.push(e.pop()[0])},description:"Gets the first element of a list.",effect:"[[A B]] -> [A]"},examples:[{code:"(10 20 30) first",expected:[10]},{code:"((1 2) 3) first",expected:[[1,2]]}]},spread={definition:{exec:function*(e){const o=e.pop();Array.isArray(o)?e.push(...o):e.push(o)},description:"Spreads the elements of a list onto the stack.",effect:"[[A B]] -> [A B]"},examples:[{code:"(10 20 30) spread",expected:[10,20,30]},{code:"() spread",expected:[]}]},rest={definition:{exec:function*(e){e.push(e.pop().slice(1))},description:"Gets the rest of a list (all but the first element).",effect:"[A] -> [R]"},examples:[{code:"(10 20 30) rest",expected:[[20,30]]},{code:"(10) rest",expected:[[]]}]},size={definition:{exec:function*(e){const o=e.pop();if(typeof o=="string"||Array.isArray(o))e.push(o.length);else throw new Error("size expects a list or a string.")},description:"Gets the number of elements in an aggregate (list or string).",effect:"[A] -> [I]"},examples:[{code:"(1 2 3) size",expected:[3]},{code:'"hello" size',expected:[5]},{code:"(10 20 30) set size",expected:[3]},{code:'(1 2 3) size "hello" size',expected:[3,5]},{code:"() size",expected:[0]},{code:"123 size",expectedError:"size expects a list or a string."}]},at={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s[o])},description:"Gets the element at a specific index.",effect:"[A I] -> [X]"},examples:[{code:"(10 20 30) 1 at",expected:[20]},{code:'"hello" 4 at',expected:["o"]}]},of={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(o[s])},description:"Gets the element at a specific index. Infix form.",effect:"[I A] -> [X]"},examples:[{code:"1 (10 20 30) of",expected:[20]},{code:'0 "world" of',expected:["w"]}]},drop={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.slice(o))},description:"Removes the first N elements from a list.",effect:"[A N] -> [B]"},examples:[{code:"(1 2 3 4 5) 2 drop",expected:[[3,4,5]]},{code:'"hello" 3 drop',expected:["lo"]}]},take={definition:{exec:function*(e){const o=e.pop(),c=e.pop().slice(0,o);Array.isArray(c)?e.push(c.reverse()):typeof c=="string"?e.push(c.split("").reverse().join("")):e.push(c)},description:"Takes the first N elements from an aggregate and pushes the result in reverse order.",effect:"[A N] -> [B]"},examples:[{code:"(1 2 3 4 5) 2 take",expected:[[2,1]]},{code:'"hello" 2 take',expected:["eh"]}]},concat={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.concat(o))},description:"Concatenates two lists or strings.",effect:"[S T] -> [U]"},examples:[{code:"(1 2) (3 4) concat",expected:[[1,2,3,4]]},{code:'"hello " "world" concat',expected:["hello world"]},{code:"(1) () concat",expected:[[1]]}]},join={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("join expects a list");e.push(o.join(""))},description:"Joins a list of strings into a single string.",effect:"[[S1 S2]] -> [S]"},examples:[{code:'("hello" " " "world") join',expected:["hello world"]},{code:'("a" "b" "c") join',expected:["abc"]},{code:"() join",expected:[""]}]},pick={definition:{exec:function*(e){if(e.length===0){e.push(null);return}const o=e.pop();if(Array.isArray(o)){const s=o;if(s.length===0){e.push(null);return}const c=Math.floor(Math.random()*s.length),p=s[c];e.push(p)}else{e.push(o);const s=[...e],c=Math.floor(Math.random()*s.length),p=s[c];e.length=0,e.push(p)}},description:"Picks a random element. If the top of the stack is a list, it picks from that list. Otherwise, it picks a random element from the entire stack, which is then replaced by the picked element.",effect:"[L] -> [E] OR [A B C ...] -> [R]"},examples:[{code:"(1 2 3 4 5) pick",assert:e=>e.length===1&&[1,2,3,4,5].includes(e[0]),expectedDescription:"A random element from the list"},{code:["(1 2 3) mylist =","(mylist pick) 10 times"],assert:e=>e.length===10&&e.every(o=>[1,2,3].includes(o)),expectedDescription:"10 random elements on the stack"},{code:"() pick",expected:[null]},{code:"1 2 3 4 pick",assert:e=>e.length===1&&[1,2,3,4].includes(e[0]),expectedDescription:"A random element from the stack"},{code:"1 pick",expected:[1]},{code:"pick",expected:[null]}]},zip={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s)||!Array.isArray(o))throw new Error("zip expects two lists on the stack.");const c=[],p=Math.min(s.length,o.length);for(let u=0;u<p;u++)c.push([o[u],s[u]]);e.push(c)},description:"Combines two lists element-wise into a new list of pairs. The operation stops when the shorter list is exhausted.",effect:"[L1 L2] -> [L3]"},examples:[{code:"(1 2 3) (6 5 4) zip",expected:[[[6,1],[5,2],[4,3]]]},{code:"(1 2) (10 20 30) zip",expected:[[[10,1],[20,2]]]},{code:"(1 2 3) (10 20) zip",expected:[[[10,1],[20,2]]]},{code:"(1 2 3) () zip",expected:[[]]},{code:"() (1 2 3) zip",expected:[[]]},{code:"() () zip",expected:[[]]},{code:"1 2 zip",expectedError:"zip expects two lists on the stack."}]},range={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(s===void 0||o===void 0)throw s!==void 0&&e.push(s),o!==void 0&&e.push(o),new Error("Stack underflow for range operator.");const c=[];if(typeof s=="number"&&typeof o=="number")if(s<=o)for(let p=s;p<=o;p++)c.push(p);else for(let p=s;p>=o;p--)c.push(p);else if(typeof s=="string"&&typeof o=="string"&&s.length===1&&o.length===1){const p=s.charCodeAt(0),u=o.charCodeAt(0);if(p<=u)for(let f=p;f<=u;f++)c.push(String.fromCharCode(f));else for(let f=p;f>=u;f--)c.push(String.fromCharCode(f))}else throw e.push(s,o),new Error("range expects two numbers or two single-character strings.");e.push(c)},description:"Creates a list containing a range of elements. If the arguments are numbers, it creates a numerical range. If they are single-character strings, it creates a character range. The range is inclusive and works in both increasing and decreasing directions.",effect:"[start end] -> [list]"},examples:[{code:"1 5 range",expected:[[1,2,3,4,5]]},{code:"-2 2 range",expected:[[-2,-1,0,1,2]]},{code:"5 1 range",expected:[[5,4,3,2,1]]},{code:"-1 -5 range",expected:[[-1,-2,-3,-4,-5]]},{code:"3 3 range",expected:[[3]]},{code:'"a" "e" range',expected:[["a","b","c","d","e"]]},{code:'"e" "a" range',expected:[["e","d","c","b","a"]]},{code:'"z" "z" range',expected:[["z"]]},{code:"-5 -1 ..",expected:[[-5,-4,-3,-2,-1]]},{code:'"a" "e" ..',expected:[["a","b","c","d","e"]]},{code:'1 "a" range',expectedError:"range expects two numbers or two single-character strings."},{code:'"a" 1 range',expectedError:"range expects two numbers or two single-character strings."},{code:'"ab" "c" range',expectedError:"range expects two numbers or two single-character strings."},{code:"1 range",expectedError:"Stack underflow for range operator."}]},swizzle={definition:{exec:function*(e){const o=e.pop(),s=e.pop();let c="list",p;if(typeof s=="number")c="number",p=String(s).replace(".","").split("");else if(typeof s=="string")c="string",p=s.split("");else if(Array.isArray(s))c="list",p=s.map(b=>b==="true"?!0:b==="false"?!1:b);else throw e.push(s,o),new Error("swizzle expects a list, string, or number as the second argument.");const u=b=>{const v=Math.floor(b);return v===0||v===1?0:v-1};let f,h=-1;const g=p.length;if(typeof o=="number"){const b=String(o);h=b.indexOf("."),f=b.replace(".","").split("").map(S=>u(parseInt(S,10)))}else if(Array.isArray(o)&&o.every(b=>typeof b=="number"))f=o.map(u);else throw e.push(s,o),new Error("swizzle expects a number or a list of integers as the pattern.");const m=[];if(g>0)for(const b of f){const v=(b%g+g)%g;m.push(p[v])}switch(c){case"number":let b=m.join("");h!==-1&&b.length>0&&(h>b.length?b=b+".":h===0?b="."+b:b=b.slice(0,h)+"."+b.slice(h)),e.push(b===""||b==="."?0:parseFloat(b));break;case"string":const v=m.join("");e.push(v);break;case"list":default:e.push(m);break}},description:"Swizzles a list, string, or number based on a pattern. The pattern can be a number (integer or decimal) or a list of numbers. Indexing is always 1-based, where both 0 and 1 in the pattern refer to the first element (index 0). Out-of-bounds indices wrap around. If the pattern is a decimal number, its decimal point position dictates the decimal point in the swizzled numeric output.",effect:"[Data Pattern] -> [SwizzledData]"},examples:[{code:'("a" "b" "c" "d") (1 3 2 4) swizzle',expected:[["a","c","b","d"]]},{code:'("a" "b" "c" "d") (0 2 1 3) swizzle',expected:[["a","b","a","c"]]},{code:'("a" "b" "c" "d") 1324 swizzle',expected:[["a","c","b","d"]]},{code:'("a" "b") 1212 swizzle',expected:[["a","b","a","b"]]},{code:"(true false false true) 2324 swizzle",expected:[[!1,!1,!1,!0]]},{code:'"abcd" 1324 swizzle',expected:["acbd"]},{code:'"ab" 1212 swizzle',expected:["abab"]},{code:"1234 1324 swizzle",expected:[1324]},{code:"12 1212 swizzle",expected:[1212]},{code:"123 103 swizzle",expected:[113]},{code:"(10 20) (4 1) swizzle",expected:[[20,10]]},{code:"1234 51 swizzle",expected:[11]},{code:'"abc" 41 swizzle',expected:["aa"]},{code:"98.76 1.32 swizzle",expected:[9.78]},{code:"2431 1.323 swizzle",expected:[2.343]},{code:"123 12.3 swizzle",expected:[12.3]},{code:"12345 1. swizzle",expected:[1]},{code:'1234 "abc" swizzle',expectedError:"swizzle expects a number or a list of integers as the pattern."},{code:"true 123 swizzle",expectedError:"swizzle expects a list, string, or number as the second argument."}]},list={definition:{exec:function*(e){const o=[...e];e.length=0,e.push(o)},description:"Consumes the entire stack and replaces it with a list containing all the stack's previous elements in their original order.",effect:"[A B C ...] -> [[A B C ...]]"},examples:[{code:"1 2 3 list",expected:[[1,2,3]]},{code:"list",expected:[[]]},{code:'1 "a" (2) list',expected:[[1,"a",[2]]]}]},euclidean={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(typeof s!="number"||typeof o!="number"||!Number.isInteger(s)||!Number.isInteger(o)||s<0||o<=0)throw s!==void 0&&e.push(s),o!==void 0&&e.push(o),new Error("euclidean operator expects two non-negative integers (pulses, length) with length > 0.");if(s>=o){e.push(Array(o).fill(1));return}if(s===0){e.push(Array(o).fill(0));return}const c=(f,h)=>{const g=f.length,m=(h+1)%g;return f[h]>f[m]},p=Array.from({length:o},(f,h)=>(s*(h-1)%o+o)%o),u=p.map((f,h)=>c(p,h));e.push(u.map(f=>f?1:0))},description:"Generates a Euclidean rhythm sequence as a list of 1s and 0s. A Euclidean rhythm is a pattern that distributes a number of pulses as evenly as possible over a number of steps. It takes two integers from the stack: the number of pulses and the total length of the sequence.",effect:"[I_pulses I_length] -> [L_sequence]"},examples:[{code:"3 8 euclidean",expected:[[1,0,0,1,0,0,1,0]]},{code:"5 8 euclidean",expected:[[1,0,1,0,1,1,0,1]]},{code:"5 16 euclidean",expected:[[1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0]]},{code:"0 8 euclidean",expected:[[0,0,0,0,0,0,0,0]]},{code:"8 8 euclidean",expected:[[1,1,1,1,1,1,1,1]]},{code:"9 8 euclidean",expected:[[1,1,1,1,1,1,1,1]]},{replCode:`
# Use a euclidean rhythm to sequence a bass drum
120 tempo
4 impulse            # Clock at 4Hz (quarter notes)
3 8 euclidean seq    # Sequencer to be used as a gate
bd                   # Bass drum consumes the sequencer as its gate
0.8 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}},{replCode:`
120 tempo
# Bass drum plays a 3-against-8 Tresillo rhythm
4 impulse 3 8 euclidean seq bd

# Snare drum plays a 5-against-8 Cinquillo rhythm, delayed by a 16th note
4 impulse 5 8 euclidean seq sd
0.125 0 delay

# Mix them together
mix 0.8 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}},{replCode:`
# Define drum patterns as reusable words using '='
120 tempo
(8 impulse 3 8 euclidean seq bd 0.9 mul) :kick =
(16 impulse 5 16 euclidean seq sd 0.8 mul) :snare =
(16 impulse 7 16 euclidean seq hh 0.6 mul) :hat =

# Create live loops for each pattern using '=>'
# The 'i' combinator is needed to execute the data quotations
(:kick i) 1 live :kick-loop =>
(:snare i) 1 live :snare-loop =>
(:hat i) 1 live :hat-loop =>

# Start all the loops
:kick-loop
:snare-loop
:hat-loop
`,async:{duration:500,assert:(e,o)=>{var c;const s=(c=o[":loops"])==null?void 0:c.body;return Array.isArray(s)&&s.includes(":kick-loop")&&s.includes(":snare-loop")&&s.includes(":hat-loop")},assertDescription:"All three drum loops should be running."}}]},lists={name:"Aggregate (List) Operators",description:"Operators for creating, deconstructing, and manipulating lists.",definitions:{cons,append,uncons,first,spread,rest,size,at,of,drop,take,concat,join,pick,zip,range,swizzle,list,euclidean}},trueOp={definition:{exec:function*(e){e.push(!0)},description:"Pushes the boolean value `true`.",effect:"-> B"},examples:[{code:"true",expected:[!0]}]},falseOp={definition:{exec:function*(e){e.push(!1)},description:"Pushes the boolean value `false`.",effect:"-> B"},examples:[{code:"false",expected:[!1]}]},maxint={definition:{exec:function*(e){e.push(Number.MAX_SAFE_INTEGER)},description:"Pushes the largest safe integer available in the JavaScript environment.",effect:"-> I"},examples:[{code:"maxint",expected:[Number.MAX_SAFE_INTEGER]}]},stack$1={definition:{exec:function*(e){e.push([...e].reverse())},description:"Pushes a list representation of the current stack.",effect:".. X Y Z -> .. X Y Z [Z Y X ..]"},examples:[{code:"1 2 3 stack",expected:[1,2,3,[3,2,1]]},{code:"stack",expected:[[]]}]},clock={definition:{exec:function*(e){e.push(performance.now())},description:"Pushes the number of milliseconds since the page loaded.",effect:"-> F"},examples:[{code:"clock",assert:e=>e.length===1&&typeof e[0]=="number",expectedType:"number"}]},rand={definition:{exec:function*(e){e.push(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER))},description:"Pushes a large random integer.",effect:"-> I"},examples:[{code:"rand",assert:e=>e.length===1&&Number.isInteger(e[0]),expectedType:"integer"}]},clearall={definition:{exec:function*(e,o,s,c){for(const p in c)"body"in c[p]&&delete c[p];e.length=0},description:"Clears the stack and removes all user-defined words from the dictionary.",effect:"[...] -> []"},examples:[{code:"[1+] inc = 1 2 3 clearall stack",expected:[[]]},{code:"1 2 3 clearall",expected:[]}]},time={definition:{exec:function*(e){},description:"A special variable representing time (shorthand: `t`). Inside `bytebeat` or `floatbeat` quotations, `t` is an integer counter. Inside `glsl` quotations, `t` is a float representing seconds (`u_time`). In normal execution, this operator is a no-op.",effect:"[] -> []"},examples:[{code:"time",expected:[]},{code:"(t 42 *) 8000 bytebeat",assert:e=>Array.isArray(e[0])&&e[0][2]==="bytebeat",expectedDescription:"A bytebeat audio graph using the time variable `t`."}]},literals={name:"System & Environment",description:"Pushing constants and interacting with the environment.",definitions:{true:trueOp,false:falseOp,maxint,stack:stack$1,clock,rand,clearall,time,t:time}},mouseState={x:0,y:0},mouseDownState={x:0,y:0},isMouseDownState={down:!1},mouse={definition:{exec:function*(e){e.push([mouseState.x,mouseState.y])},description:"Pushes the current mouse coordinates as a list `(x y)` onto the stack. In `glsl`, this becomes the `u_mouse` vec2 uniform. This operator is not available inside `bytebeat` or `floatbeat` quotations; use `(mousex mousey)` instead.",effect:"-> [x y]"},examples:[{code:"mouse",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===2&&typeof e[0][0]=="number"&&typeof e[0][1]=="number",expectedDescription:"A list containing the mouse [x, y] coordinates."},{code:`
# A plane to act as a canvas
0 1 0 vec3 0 plane

# Create a material that ripples from the mouse cursor
(
  p xz mouse - # Calculate vector from surface point to normalized mouse
  length 50 * sin          # Create sine wave ripples
  dup dup vec3               # Make it grayscale
) glsl material

march
0 2 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("u_mouse")},expectedDescription:"An interactive shader with ripples emanating from the mouse cursor."}]},mousex={definition:{exec:function*(e){e.push(mouseState.x)},description:"Pushes the current mouse X coordinate to the stack. In `glsl`, this becomes `u_mouse.x`. In `bytebeat`/`floatbeat`, it is the window X coordinate.",effect:"-> N"},examples:[{code:"mousex",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the mouse X coordinate."},{code:`
# A simple theremin-like instrument where pitch is controlled by mouse-x
(
  # t is the time variable in floatbeat
  # mousex provides the window X coordinate
  t 44100 /           # Convert sample index to seconds
  mousex 2 * 220 +    # Map mouse x-coord to a frequency range (e.g., 220-...)
  * 2 * 3.14159 * sin # Calculate sine wave for the frequency
) 44100 floatbeat     # Run the formula at 44.1kHz
0.5 mul               # Apply gain
`,replCode:`
# A simple theremin-like instrument where pitch is controlled by mouse-x
(
  # t is the time variable in floatbeat
  # mousex provides the window X coordinate
  t 44100 /           # Convert sample index to seconds
  mousex 2 * 220 +    # Map mouse x-coord to a frequency range (e.g., 220-...)
  * 2 * 3.14159 * sin # Calculate sine wave for the frequency
) 44100 floatbeat     # Run the formula at 44.1kHz
0.5 mul               # Apply gain
start`,assert:e=>e.length===0,expectedDescription:"An interactive audio graph where mouse X controls pitch."}]},mousey={definition:{exec:function*(e){e.push(mouseState.y)},description:"Pushes the current mouse Y coordinate to the stack. In `glsl`, this becomes `u_mouse.y`. In `bytebeat`/`floatbeat`, it is the window Y coordinate.",effect:"-> N"},examples:[{code:"mousey",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the mouse Y coordinate."},{code:`
# A simple theremin-like instrument where volume is controlled by mouse-y
(
  # A static 440Hz sine wave tone
  t 44100 / 440 * 2 * 3.14159 * sin
  
  # Calculate gain from mouse-y, inverting so up=louder
  # and clamping to a safe 0-1 range
  1.0 mousey 800 / - 0.0 1.0 clamp
  
  # Apply gain
  *
) 44100 floatbeat
`,replCode:`
# A simple theremin-like instrument where volume is controlled by mouse-y
(
  # A static 440Hz sine wave tone
  t 44100 / 440 * 2 * 3.14159 * sin
  
  # Calculate gain from mouse-y, inverting so up=louder
  # and clamping to a safe 0-1 range
  1.0 mousey 800 / - 0.0 1.0 clamp
  
  # Apply gain
  *
) 44100 floatbeat start
`,assert:e=>e.length===0,expectedDescription:"Stack should be empty after playing."}]},moused={definition:{exec:function*(e){e.push([mouseDownState.x,mouseDownState.y])},description:"Pushes the mouse coordinates from the last mousedown event as a list `(x y)`. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes the `u_moused.xy` vec2 uniform.",effect:"-> [x y]"},examples:[{code:"moused",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===2&&typeof e[0][0]=="number"&&typeof e[0][1]=="number",expectedDescription:"A list containing the mousedown [x, y] coordinates."},{code:`
# An interactive Julia set explorer.
# Click and drag to change the 'c' parameter of the fractal.
2.0 sphere

# Create the material for the interactive Julia set
(
    # The surface coordinates for the fractal
    (p xy) glsl
    
    # The 'c' parameter, controlled by the mousedown position normalized to [-1, 1]
    (moused (width height vec2) / 0.5 - 2.0 *) glsl
    
    # The radius/zoom level
    1.0
    
    # Generate the raw fractal value
    juliaset
    
    # Make it colorful and animated
    (t 0.2 *) glsl + # Animate hue
    1.0 1.0 hsv
) glsl material

march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("u_moused")},expectedDescription:"An interactive shader where clicking and dragging explores different parts of the Julia set fractal."}]},mousedx={definition:{exec:function*(e){e.push(mouseDownState.x)},description:"Pushes the X coordinate from the last mousedown event. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes `u_moused.x`. In `bytebeat`/`floatbeat`, it is the window X coordinate.",effect:"-> N"},examples:[{code:"mousedx",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the mousedown X coordinate."},{code:`
# A single circle
0.5 circle2d

# Its X position is controlled by the mousedrag x-position
# We normalize the coordinate to be in a [-2.5, 2.5] range
(
  (mousedx width / 0.5 -) 5.0 * # x
  0.0                           # y
  0.0                           # z
  vec3
) glsl
translate

:red material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("u_moused")},expectedDescription:"An interactive shader where clicking and dragging the mouse horizontally moves a circle left and right."}]},mousedy={definition:{exec:function*(e){e.push(mouseDownState.y)},description:"Pushes the Y coordinate from the last mousedown event. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes `u_moused.y`. In `bytebeat`/`floatbeat`, it is the window Y coordinate.",effect:"-> N"},examples:[{code:"mousedy",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the mousedown Y coordinate."},{code:`
# A single circle
0.5 circle2d

# Its Y position is controlled by the mousedrag y-position
# We normalize the coordinate to be in a [-2.5, 2.5] range
(
  0.0                             # x
  (mousedy height / 0.5 -) 5.0 * # y
  0.0                             # z
  vec3
) glsl
translate

:blue material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("u_moused")},expectedDescription:"An interactive shader where clicking and dragging the mouse vertically moves a circle up and down."}]},mousedPredicate={definition:{exec:function*(e){e.push(isMouseDownState.down)},description:"Pushes `true` if the mouse button is currently pressed down, `false` otherwise. In `glsl`, this provides the mouse button state as a float (1.0 if down, 0.0 if up).",effect:"-> [bool|float]"},examples:[{code:`
# A sphere that changes color when the mouse is pressed
1.0 sphere
(
  moused?      # test condition
  (1.0 0.0 0.0 vec3) # true: red
  (0.0 1.0 0.0 vec3) # false: green
  ?                # ifte
) glsl material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere that turns from green to red when the mouse button is held down."},{replCode:`# A helper word to send a control message. ctrl now cleans the stack.
(rolldown ctrl) :send =>

# 1. Define the synth patch with controllable freq and amp.
:freq note sine :amp mul :theremin-patch =

# 2. Play the synth once; it starts silently.
:theremin :theremin-patch start

# 3. Define the control loop.
(
  # Calculate amplitude: 0.5 if mouse is down, 0 otherwise.
  moused? 0.5 0 ?
  :theremin :amp :send

  # Calculate frequency based on mouse x position.
  mousex 2 * 220 +
  :theremin :freq :send
) 0.05 live :mouse_theremin =>
:mouse_theremin`,async:{duration:600,assert:(e,o)=>o[":mouse_theremin"]!==void 0,assertDescription:"The :mouse_theremin function should be defined."}}]},input={name:"Input Devices",description:"Operators for getting input from devices like the mouse.",definitions:{mouse,mousex,mousey,moused,mousedx,mousedy,"moused?":mousedPredicate}},and={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(isMatrix(s)||isMatrix(o)){const c=(p,u)=>p&&u?1:0;if(isMatrix(s)&&isMatrix(o)){const p=s,u=o;if(p.length!==u.length||p.length>0&&p[0].length!==u[0].length)throw new Error("Matrix dimensions must match for element-wise logical AND.");const f=p.map((h,g)=>h.map((m,b)=>c(m,u[g][b])));e.push(f);return}if(isMatrix(s)&&!isMatrix(o)){const u=s.map(f=>f.map(h=>c(h,o)));e.push(u);return}if(!isMatrix(s)&&isMatrix(o)){const u=o.map(f=>f.map(h=>c(s,h)));e.push(u);return}}if(isMarchingObject(s)&&isMarchingObject(o)){e.push(createMarchingObject("intersection","combinator",[s,o]));return}if(Array.isArray(s)&&Array.isArray(o)){const c=new Set(s),p=new Set(o),u=[...c].filter(f=>p.has(f));e.push(u);return}e.push(s&&o)},description:"Logical AND for booleans, an SDF intersection for two SDFs, element-wise logical AND for matrices (results in 0 or 1), or a set intersection for two lists.",effect:"[A B] -> [C]"},examples:[{code:"true true and",expected:[!0]},{code:"true false and",expected:[!1]},{code:"1 0 and",expected:[0]},{code:"0.5 sphere 0.3 0.3 0.6 vec3 box and march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the intersection."},{code:"((1 0)(5 1)) ((-1 2)(0 1)) and",expected:[[[1,0],[0,1]]]},{code:"(1 2 3) (2 3 4) and",expected:[[2,3]]},{code:"(1 2) (3 4) and",expected:[[]]}]},or={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(isMatrix(s)||isMatrix(o)){const c=(p,u)=>p||u?1:0;if(isMatrix(s)&&isMatrix(o)){const p=s,u=o;if(p.length!==u.length||p.length>0&&p[0].length!==u[0].length)throw new Error("Matrix dimensions must match for element-wise logical OR.");const f=p.map((h,g)=>h.map((m,b)=>c(m,u[g][b])));e.push(f);return}if(isMatrix(s)&&!isMatrix(o)){const u=s.map(f=>f.map(h=>c(h,o)));e.push(u);return}if(!isMatrix(s)&&isMatrix(o)){const u=o.map(f=>f.map(h=>c(s,h)));e.push(u);return}}if(isMarchingObject(s)&&isMarchingObject(o)){e.push(createMarchingObject("union","combinator",[s,o]));return}if(Array.isArray(s)&&Array.isArray(o)){const c=[...new Set([...s,...o])];e.push(c);return}e.push(s||o)},description:"Logical OR for booleans, an SDF union for two SDFs, element-wise logical OR for matrices (results in 0 or 1), or a set union for two lists.",effect:"[A B] -> [C]"},examples:[{code:"true false or",expected:[!0]},{code:"false false or",expected:[!1]},{code:"1 0 or",expected:[1]},{code:"0.5 sphere 0.3 0.3 0.6 vec3 box or march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the union."},{code:"((1 0)(0 1)) 0 or",expected:[[[1,0],[0,1]]]},{code:"(1 2 3) (2 3 4) or",expected:[[1,2,3,4]]},{code:"(1 2) (3 4) or",expected:[[1,2,3,4]]}]},xor={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(isMatrix(s)||isMatrix(o)){const c=(p,u)=>!!p!=!!u?1:0;if(isMatrix(s)&&isMatrix(o)){const p=s,u=o;if(p.length!==u.length||p.length>0&&p[0].length!==u[0].length)throw new Error("Matrix dimensions must match for element-wise logical XOR.");const f=p.map((h,g)=>h.map((m,b)=>c(m,u[g][b])));e.push(f);return}if(isMatrix(s)&&!isMatrix(o)){const u=s.map(f=>f.map(h=>c(h,o)));e.push(u);return}if(!isMatrix(s)&&isMatrix(o)){const u=o.map(f=>f.map(h=>c(s,h)));e.push(u);return}}if(isMarchingObject(s)&&isMarchingObject(o)){e.push(createMarchingObject("xor","combinator",[s,o]));return}if(Array.isArray(s)&&Array.isArray(o)){const c=new Set(s),p=new Set(o),u=[...c].filter(h=>!p.has(h)),f=[...p].filter(h=>!c.has(h));e.push([...u,...f]);return}e.push(!!(s^o))},description:"Logical XOR for booleans, an SDF combinator for two SDFs, element-wise logical XOR for matrices (results in 0 or 1), or a set symmetric difference for two lists.",effect:"[A B] -> [C]"},examples:[{code:"true true xor",expected:[!1]},{code:"true false xor",expected:[!0]},{code:"1 0 xor",expected:[!0]},{code:"0.5 sphere 0.3 0.3 0.3 vec3 box xor march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the XOR combination."},{code:"((1 0)(1 0)) ((1 1)(0 0)) xor",expected:[[[0,1],[1,0]]]},{code:"(1 2 3) (2 3 4) xor",expected:[[1,4]]},{code:"(1 2) (3 4) xor",expected:[[1,2,3,4]]}]},not={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>c?0:1))):e.push(!o)},description:"Logical NOT. Replaces top of stack with its logical negation. Supports element-wise operation on matrices, resulting in 0s and 1s.",effect:"[A] -> [!A]"},examples:[{code:"true not",expected:[!1]},{code:"false not",expected:[!0]},{code:"0 not",expected:[!0]},{code:'((1 0)("hello" ())) not',expected:[[[0,1],[0,0]]]}]},logic={name:"Logical Operations",description:"Operators for performing boolean logic. For lists, these operators perform set-like operations (intersection, union, etc.).",definitions:{and,or,xor,not}},isGLSLExpression$6=e=>(e==null?void 0:e.type)==="glsl_expression",audioOps$h=new Set(["sine","saw","pulse","tri","noise","impulse","note","lpf","hpf","ad","adsr","delay","distort","pan","mix","mul","fm_simple","fm_synth","bd","sd","lt","mt","ht","hh","seq","bytebeat","floatbeat"]),isAudioQuotation$o=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$h.has(e[e.length-1]),add={definition:{exec:function*(e){if(e.length>=2){const h=e[e.length-1],g=e[e.length-2];if(isAudioQuotation$o(g)||isAudioQuotation$o(h)){e.pop(),e.pop(),e.push([g,h,"mix"]);return}}if(e.length>=2){const h=e[e.length-1],g=e[e.length-2];if(isGLSLExpression$6(g)||isGLSLExpression$6(h)){e.pop(),e.pop();const m=toGLSL(g),b=toGLSL(h);e.push({type:"glsl_expression",code:`(${m} + ${b})`});return}}const o=(h,g)=>h+g,s=0;if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(s);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push((p??0)+(c??0));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Adds two values. If they are audio quotations, it mixes them. If both are numbers, it performs addition. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) addition, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by addition.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"10 20 +",expected:[30]},{code:"1 +",expected:[1]},{code:"+",expected:[0]},{code:"(1 2 3) +",expected:[6]},{code:"((1 2) (3 4)) +",expected:[4,5,5,6]},{code:"(1 (2 3)) +",expected:[3,4]},{code:"() +",expected:[0]},{code:"(1 2 3) 10 +",expected:[[11,12,13]]},{code:"10 (1 2 3) +",expected:[[11,12,13]]},{code:"((1 2)(3 4)) 10 +",expected:[[[11,12],[13,14]]]},{code:"10 ((1 2)(3 4)) +",expected:[[[11,12],[13,14]]]},{code:"(1 2) (3 4) +",expected:[4,5,5,6]},{code:"(1 2 3) (4 5 6) +",expected:[5,6,7,6,7,8,7,8,9]},{code:"(1 2) ((3 4) (5 6)) +",expected:[4,5,6,7,5,6,7,8]},{code:"((1 2) (3 4)) (10 20) +",expected:[11,12,21,22,13,14,23,24]}]},subtract={definition:{exec:function*(e){const o=(h,g)=>h-g;if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push((p??0)-(c??0));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Subtracts two values. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) subtraction, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by subtraction.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"30 10 -",expected:[20]},{code:"10 -",expected:[-10]},{code:"-",expected:[0]},{code:"(10 5 2) -",expected:[3]},{code:"(10 (5 6)) -",expected:[5,4]},{code:"(10 20) 5 -",expected:[[5,15]]},{code:"100 (10 20) -",expected:[[90,80]]},{code:"((10 20)(30 40)) 5 -",expected:[[[5,15],[25,35]]]},{code:"(10 20) (1 2) -",expected:[9,8,19,18]},{code:"(5 1) (2 3) -",expected:[3,2,-1,-2]}]},isGLSLExpression$5=e=>(e==null?void 0:e.type)==="glsl_expression",audioOps$g=new Set(["sine","saw","pulse","tri","noise","impulse","note","lpf","hpf","ad","adsr","delay","distort","pan","mix","mul","fm_simple","fm_synth","bd","sd","lt","mt","ht","hh","seq","bytebeat","floatbeat"]),isAudioQuotation$n=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$g.has(e[e.length-1]),multiply={definition:{exec:function*(e){if(e.length>=2){const h=e[e.length-1],g=e[e.length-2];if(isAudioQuotation$n(g)||isAudioQuotation$n(h)){e.pop(),e.pop(),e.push([g,h,"mul"]);return}}if(e.length>=2){const h=e[e.length-1],g=e[e.length-2];if(isGLSLExpression$5(g)||isGLSLExpression$5(h)){e.pop(),e.pop();const m=toGLSL(g),b=toGLSL(h);e.push({type:"glsl_expression",code:`(${m} * ${b})`});return}}const o=(h,g)=>h*g,s=1;if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(s);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push((p??0)*(c??0));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Multiplies two values. If they are audio quotations, it multiplies them (AM). If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) multiplication, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by multiplication.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"10 5 *",expected:[50]},{code:"5 *",expected:[0]},{code:"*",expected:[0]},{code:"(2 3 4) *",expected:[24]},{code:"(2 (3 4)) *",expected:[6,8]},{code:"() *",expected:[1]},{code:"(2 3) 10 *",expected:[[20,30]]},{code:"10 (2 3) *",expected:[[20,30]]},{code:"((1 2)(3 4)) 10 *",expected:[[[10,20],[30,40]]]},{code:"(2 3) (4 5) *",expected:[8,10,12,15]},{code:"(1 2 3) (4 5) *",expected:[4,5,8,10,12,15]}]},divide={definition:{exec:function*(e){const o=(h,g)=>g===0?null:h/g;if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(1);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){const h=p??1,g=c??1;e.push(g===0?null:h/g);return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Divides two values. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) division, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by division. Division by zero results in `null`.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"20 4 /",expected:[5]},{code:"10 0 /",expected:[null]},{code:"5 /",expected:[.2]},{code:"/ # 1/1",expected:[1]},{code:"(100 5 2) /",expected:[10]},{code:"(100 (5 2)) /",expected:[20,50]},{code:"(10 20) 2 /",expected:[[5,10]]},{code:"20 (2 4) /",expected:[[10,5]]},{code:"((10 20)(30 40)) 2 /",expected:[[[5,10],[15,20]]]},{code:"(10 20) (2 5) /",expected:[5,2,10,4]},{code:"(10 20) (2 0) /",expected:[5,null,10,null]}]},modulo={definition:{exec:function*(e){const o=(h,g)=>g===0?0:h%g;if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push(o(p??0,c??1));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Performs the modulo operation. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"10 3 %",expected:[1]},{code:"10 0 %",expected:[0]},{code:"10 %",expected:[0]},{code:"(10 4 3) %",expected:[2]},{code:"(10 (11 12)) %",expected:[10%11,10%12]},{code:"(10 11) 3 %",expected:[[1,2]]},{code:"10 (3 4) %",expected:[[1,2]]},{code:"((10 11)(12 13)) 3 %",expected:[[[1,2],[0,1]]]},{code:"(10 11) (3 4) %",expected:[1,2,2,3]}]},div={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(Math.floor(s/o),s%o)},description:"Integer division. Pushes quotient and remainder.",effect:"[I J] -> [K L]"},examples:[{code:"21 10 div",expected:[2,1]},{code:"-21 10 div",expected:[-3,-1]},{code:"10 div",assert:e=>e.length===2&&isNaN(e[0])&&isNaN(e[1]),expectedDescription:"[NaN, NaN]"},{code:"10 0 div",assert:e=>e.length===2&&e[0]===1/0&&isNaN(e[1]),expectedDescription:"[Infinity, NaN]"}]},succ={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>c+1))):e.push((o??0)+1)},description:"Successor. Adds 1 to the top element. Supports matrices for element-wise operation.",effect:"[N] -> [N+1]"},examples:[{code:"10 succ",expected:[11]},{code:"-1 succ",expected:[0]},{code:"succ",expected:[1]},{code:"10 ++",expected:[11]},{code:"((1 2)(3 4)) succ",expected:[[[2,3],[4,5]]]}]},pred={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>c-1))):e.push((o??0)-1)},description:"Predecessor. Subtracts 1 from the top element. Supports matrices for element-wise operation.",effect:"[N] -> [N-1]"},examples:[{code:"10 pred",expected:[9]},{code:"0 pred",expected:[-1]},{code:"pred",expected:[-1]},{code:"10 --",expected:[9]},{code:"((1 2)(3 4)) pred",expected:[[[0,1],[2,3]]]}]},max={definition:{exec:function*(e){const o=(h,g)=>Math.max(h,g);if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(-1/0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push(Math.max(p??-1/0,c??-1/0));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Pushes the maximum of two values. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it finds the maximum value in the list.',effect:"[A B] -> [N] or [[A B C]] -> ..."},examples:[{code:"10 20 max",expected:[20]},{code:"10 max",expected:[10]},{code:"max",expected:[-1/0]},{code:"(-10 50 2) max",expected:[50]},{code:"((1 100) (50 2)) max",expected:[50,2,100,100]},{code:"(10 (20 5)) max",expected:[20,10]},{code:"(1 10) 5 max",expected:[[5,10]]},{code:"50 ((1 100)(50 2)) max",expected:[[[50,100],[50,50]]]},{code:"(1 10) (5 2) max",expected:[5,2,10,10]}]},min={definition:{exec:function*(e){const o=(h,g)=>Math.min(h,g);if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(1/0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}const c=e.pop(),p=e.pop();if(p===void 0||c===void 0){e.push(Math.min(p??0,c??0));return}const u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Pushes the minimum of two values. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it finds the minimum value in the list.',effect:"[A B] -> [N] or [[A B C]] -> ..."},examples:[{code:"10 20 min",expected:[10]},{code:"10 min",expected:[0]},{code:"min",expected:[0]},{code:"(-10 50 2) min",expected:[-10]},{code:"((1 100) (50 2)) min",expected:[1,1,50,2]},{code:"(10 (20 5)) min",expected:[10,5]},{code:"() min",expected:[1/0]},{code:"(10 20) 15 min",expected:[[10,15]]},{code:"50 ((1 100)(50 2)) min",expected:[[[1,50],[50,2]]]},{code:"(10 2) (5 20) min",expected:[5,10,2,2]}]},sum={definition:{exec:function*(e){const o=e.pop()??[];if(!Array.isArray(o))throw new Error("sum expects a list");e.push(o.reduce((s,c)=>s+(typeof c=="number"?c:0),0))},description:"Calculates the sum of the numbers in a list.",effect:"[A] -> [N]"},examples:[{code:"(1 2 3) sum",expected:[6]},{code:"(10 20 30) set sum",expected:[60]},{code:"(10 -2 5) sum",expected:[13]},{code:"() sum",expected:[0]},{code:"() set sum",expected:[0]},{code:"sum",expected:[0]},{code:['"some_value" :sum =',"(1 2 3) sum"],expected:[6]},{code:["(1 +) sum =>","1 sum"],expected:[2]}]},neg={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>-c))):e.push(-(o??0))},description:"Negates the top element. Supports matrices for element-wise negation.",effect:"[N] -> [N']"},examples:[{code:"15 neg",expected:[-15]},{code:"-10 neg",expected:[10]},{code:"neg",expected:[0]},{code:"((1 -2)(3 -4)) neg",expected:[[[-1,2],[-3,4]]]}]},abs={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.abs(c)))):e.push(Math.abs(o??0))},description:"Pushes the absolute value of the top element. Supports matrices for element-wise operation.",effect:"[N] -> [N']"},examples:[{code:"-15 abs",expected:[15]},{code:"20 abs",expected:[20]},{code:"abs",expected:[0]},{code:"((1 -2)(3 -4)) abs",expected:[[[1,2],[3,4]]]}]},sign={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>Math.sign(c)))):e.push(Math.sign(o??0))},description:"Pushes the sign of a number (-1, 0, or 1). Supports matrices for element-wise operation.",effect:"[N] -> [N']"},examples:[{code:"-15 sign",expected:[-1]},{code:"15 sign",expected:[1]},{code:"0 sign",expected:[0]},{code:"sign",expected:[0]},{code:"((10 -20)(0 5)) sign",expected:[[[1,-1],[0,1]]]}]},bitwiseAnd={definition:{exec:function*(e){const o=(h,g)=>(h|0)&(g|0);if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(-1);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}if(e.length<2)throw new Error("Bitwise AND operator requires two arguments.");const c=e.pop(),p=e.pop(),u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Bitwise AND. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list. Operands are treated as 32-bit integers.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"6 3 &",expected:[2]},{code:"(6 3 2) &",expected:[2]},{code:"() &",expected:[-1]},{code:"(6 5) 3 &",expected:[[2,1]]},{code:"3 (6 5) &",expected:[[2,1]]},{code:"((6 5)(1 15)) 3 &",expected:[[[2,1],[1,3]]]},{code:"(7 15) (3 5) &",expected:[3,5,3,5]}]},bitwiseOr={definition:{exec:function*(e){const o=(h,g)=>h|0|(g|0);if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}if(e.length<2)throw new Error("Bitwise OR operator requires two arguments.");const c=e.pop(),p=e.pop(),u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Bitwise OR. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list. Operands are treated as 32-bit integers.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"5 2 |",expected:[7]},{code:"(1 2 4) |",expected:[7]},{code:"() |",expected:[0]},{code:"(5 4) 1 |",expected:[[5,5]]},{code:"1 (5 4) |",expected:[[5,5]]},{code:"((5 4)(2 1)) 1 |",expected:[[[5,5],[3,1]]]},{code:"(1 2) (4 8) |",expected:[5,9,6,10]}]},bitwiseXor={definition:{exec:function*(e){const o=(h,g)=>(h|0)^(g|0);if(e.length===1&&Array.isArray(e[0])){const h=e.pop();if(h.length===0){e.push(0);return}const[g,...m]=h,b=m.reduce((v,S)=>applyBinaryOp(o,v,S),g);isFlatList(b)?e.push(...b):e.push(b);return}if(e.length<2)throw new Error("Bitwise XOR operator requires two arguments.");const c=e.pop(),p=e.pop(),u=applyBinaryOp(o,p,c);typeof p=="number"&&Array.isArray(c)||Array.isArray(p)&&typeof c=="number"?e.push(u):isFlatList(u)?e.push(...u):e.push(u)},description:'Bitwise XOR. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list. Operands are treated as 32-bit integers.',effect:"[A B] -> [C] or [[A B C]] -> ..."},examples:[{code:"5 3 ^",expected:[6]},{code:"(5 3 1) ^",expected:[7]},{code:"() ^",expected:[0]},{code:"(5 7) 3 ^",expected:[[6,4]]},{code:"3 (5 7) ^",expected:[[6,4]]},{code:"((5 3)(7 2)) 3 ^",expected:[[[6,0],[4,1]]]},{code:"(5 3) (1 2) ^",expected:[4,7,2,1]}]},bitwiseNot={definition:{exec:function*(e){const o=e.pop();isMatrix(o)?e.push(o.map(s=>s.map(c=>~(c|0)))):e.push(~(o|0))},description:"Bitwise NOT. Inverts the bits of the top element. Supports matrices for element-wise operation. The operand is treated as a 32-bit integer.",effect:"[A] -> [C]"},examples:[{code:"5 ~",expected:[-6]},{code:"-1 ~",expected:[0]},{code:"((5 -1)(0 255)) ~",expected:[[[-6,0],[-1,-256]]]}]},leftShift={definition:{exec:function*(e){const o=(f,h)=>(f|0)<<(h|0);if(e.length<2)throw new Error("Left shift operator requires two arguments.");const s=e.pop(),c=e.pop(),p=applyBinaryOp(o,c,s);typeof c=="number"&&Array.isArray(s)||Array.isArray(c)&&typeof s=="number"?e.push(p):isFlatList(p)?e.push(...p):e.push(p)},description:'Bitwise left shift. Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting. Operands are treated as 32-bit integers.',effect:"[A B] -> [C]"},examples:[{code:"5 1 <<",expected:[10]},{code:"(5 1) 2 <<",expected:[[20,4]]},{code:"2 (5 1) <<",expected:[[64,4]]},{code:"((5 1)(2 8)) 1 <<",expected:[[[10,2],[4,16]]]},{code:"(5 1) (1 2) <<",expected:[10,20,2,4]}]},rightShift={definition:{exec:function*(e){const o=(f,h)=>(f|0)>>(h|0);if(e.length<2)throw new Error("Right shift operator requires two arguments.");const s=e.pop(),c=e.pop(),p=applyBinaryOp(o,c,s);typeof c=="number"&&Array.isArray(s)||Array.isArray(c)&&typeof s=="number"?e.push(p):isFlatList(p)?e.push(...p):e.push(p)},description:'Bitwise (sign-propagating) right shift. Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting. Operands are treated as 32-bit integers.',effect:"[A B] -> [C]"},examples:[{code:"10 1 >>",expected:[5]},{code:"(10 255) 1 >>",expected:[[5,127]]},{code:"255 (1 4) >>",expected:[[127,15]]},{code:"((10 255)(-10 1)) 1 >>",expected:[[[5,127],[-5,0]]]},{code:"(10 255) (1 2) >>",expected:[5,2,127,63]}]},average={definition:{exec:function*(e){const o=e.pop()??[];if(!Array.isArray(o))throw new Error("average expects a list");const s=o.filter(p=>typeof p=="number");if(s.length===0){e.push(0);return}const c=s.reduce((p,u)=>p+u,0);e.push(c/s.length)},description:"Calculates the average of the numbers in a list. Non-numeric elements are ignored.",effect:"[A] -> [N]"},examples:[{code:"(1 2 3 5) average",expected:[2.75]},{code:"(10 20 30) average",expected:[20]},{code:"(10 -10 30) average",expected:[10]},{code:"() average",expected:[0]},{code:'(1 2 "hello" 3) average',expected:[2]},{code:'("a" "b") average',expected:[0]},{code:"average",expected:[0]},{code:"(1 2 3 5) avg",expected:[2.75]}]},math={definitions:{"+":add,"-":subtract,"*":multiply,"/":divide,"%":modulo,div,succ,pred,max,min,sum,neg,abs,sign,average,"&":bitwiseAnd,"|":bitwiseOr,"^":bitwiseXor,"~":bitwiseNot,"<<":leftShift,">>":rightShift}},mat={definition:{exec:function*(e){const o=e.pop();if(typeof o!="number"||!Number.isInteger(o)||o<0){if(Array.isArray(o)&&o.length===0){e.push([]);return}throw o!==void 0&&e.push(o),new Error("mat operator expects a non-negative integer for column count.")}const s=o;if(e.length>=s&&s>0&&e.slice(e.length-s).every(f=>Array.isArray(f)&&!isMatrix(f))){const f=e.splice(e.length-s,s),h=f[0].length;if(!f.every(g=>g.length===h))throw e.push(...f,s),new Error("All lists must have the same length to form a matrix.");e.push(f);return}if(s===0){const p=e[e.length-1];if(Array.isArray(p)){const f=e.pop().length;e.push(Array(f).fill([]))}else e.push([]);return}const c=e[e.length-1];if(Array.isArray(c)&&!isMatrix(c)){const u=e.pop().filter(h=>typeof h=="number");if(u.length%s!==0)throw new Error(`The number of number elements in the list (${u.length}) is not divisible by the column count (${s}).`);const f=[];for(let h=0;h<u.length;h+=s)f.push(u.slice(h,h+s));e.push(f)}else{const p=s,u=s*p,f=[],h=[],g=[...e];for(;g.length>0&&f.length<u;){const v=g.pop();if(h.push(v),!isMatrix(v)){if(typeof v!="number")throw new Error("mat operator requires number elements from the stack.");f.push(v)}}e.length-=h.length;const m=f.reverse();for(;m.length<u;)m.push(0);const b=[];for(let v=0;v<p;v++)b.push(m.slice(v*s,(v+1)*s));e.push(b)}},description:"Creates a matrix. Consumes a number `M`. If the top `M` items on the stack are lists of consistent length, they form the rows of the matrix. Otherwise, if the next item is a list, it converts that list into a matrix with `M` columns. Otherwise, it assumes a square matrix, consuming `M*M` numbers to create an `M`x`M` matrix.",effect:"[r1..rM M] -> [matrix] OR [[e1...eN] M] -> [matrix] OR [e1..e(M*M) M] -> [matrix]"},examples:[{code:"(1 2) (3 4) 2 mat",expected:[[[1,2],[3,4]]]},{code:"(1) (2) (3) 3 mat",expected:[[[1],[2],[3]]]},{code:"(1 2) (3 4 5) 2 mat",expectedError:"All lists must have the same length to form a matrix."},{code:"1 2 3 4 2 mat",expected:[[[1,2],[3,4]]]},{code:"(1 2 3 4 5 6) 3 mat",expected:[[[1,2,3],[4,5,6]]]},{code:"(1 2 3 4 5) 2 mat",expectedError:"The number of number elements in the list (5) is not divisible by the column count (2)."},{code:"1 2 3 4 5 6 7 8 9 3 mat",expected:[[[1,2,3],[4,5,6],[7,8,9]]]},{code:"1 2 3 2 mat",expected:[[[1,2],[3,0]]]},{code:'1 2 3 "a" 2 mat',expectedError:"mat operator requires number elements from the stack."},{code:"1 2 3 4 2 mat 1 2 3 4 2 mat",expected:[[[1,2],[3,4]],[[1,2],[3,4]]]},{code:"(1 2 3 4 2 mat) mymatrix = (1 2 mymatrix 3 4) 2 mat",expected:[[[1,2],[3,4]]]},{code:"2 mat",expected:[[[0,0],[0,0]]]}]},cmat={definition:{exec:function*(e){const o=e.pop();if(!Number.isInteger(o)||o<0)throw new Error("cmat operator expects a non-negative integer.");const s=e[e.length-1];if(Array.isArray(s)&&!isMatrix(s)){const c=e.pop(),p=o;if(p===0){e.push([]);return}const u=c.filter(h=>typeof h=="number");if(u.length%p!==0)throw new Error(`The number of number elements in the list (${u.length}) is not divisible by the row count (${p}).`);u.length/p;const f=Array.from({length:p},()=>[]);for(let h=0;h<u.length;h++)f[h%p].push(u[h]);e.push(f)}else{const c=o,p=o*c,u=[];let f=0;for(let m=e.length-1;m>=0&&u.length<p;m--){const b=e[m];if(f++,!isMatrix(b)){if(typeof b!="number")throw new Error("cmat operator requires number elements from the stack.");u.push(b)}}e.splice(e.length-f);const h=u.reverse();for(;h.length<p;)h.push(0);const g=Array.from({length:c},()=>[]);for(let m=0;m<h.length;m++)g[m%c].push(h[m]);e.push(g)}},description:"Creates a matrix in column-major order. If the next item is a list, it consumes a row count `M` and converts the list. Otherwise, it assumes a square `M`x`M` matrix and consumes `M*M` numbers from the stack. It ignores any non-numeric or matrix values it encounters.",effect:"[e1...e(M*M) M] -> [matrix] OR [[e1...eN] M] -> [matrix]"},examples:[{code:"1 2 3 4 2 cmat",expected:[[[1,3],[2,4]]]},{code:"(1 2 3 4 5 6) 3 cmat",expected:[[[1,4],[2,5],[3,6]]]},{code:"(1 2 3 4) 2 cmat",expected:[[[1,3],[2,4]]]},{code:"1 2 3 4 5 6 7 8 9 3 cmat",expected:[[[1,4,7],[2,5,8],[3,6,9]]]},{code:"1 2 3 4 2 cmat 1 2 3 4 2 cmat",expected:[[[1,3],[2,4]],[[1,3],[2,4]]]},{code:"1 2 2 cmat",expected:[[[1,0],[2,0]]]},{code:"2 cmat",expected:[[[0,0],[0,0]]]}]},mat2={definition:{exec:function*(e){if(e.length>=2&&e.slice(e.length-2).every(b=>Array.isArray(b)&&!isMatrix(b)&&b.length===2)){const b=e.splice(e.length-2,2);e.push(b);return}const s=4,c=e.splice(Math.max(0,e.length-s));if(!c.every(g=>typeof g=="number"))throw e.push(...c),new Error("mat2 operator requires number elements from the stack.");const p=s-c.length,u=Array(p).fill(0),f=[...c,...u],h=[];for(let g=0;g<2;g++)h.push(f.slice(g*2,(g+1)*2));e.push(h)},description:"Creates a 2x2 matrix. If the top two stack items are lists of size 2, they are used as rows. Otherwise, it consumes up to 4 numbers from the stack. Fills with 0 if not enough elements are available.",effect:"[[r1] [r2]] -> [matrix] OR [e1 e2 e3 e4]? -> [matrix]"},examples:[{code:"(1 2) (3 4) mat2",expected:[[[1,2],[3,4]]]},{code:"(1) (3 4) mat2",expectedError:"mat2 operator requires number elements from the stack."},{code:"1 2 3 4 mat2",expected:[[[1,2],[3,4]]]},{code:"1 2 mat2",expected:[[[1,2],[0,0]]]},{code:"mat2",expected:[[[0,0],[0,0]]]}]},mat3={definition:{exec:function*(e){if(e.length>=3&&e.slice(e.length-3).every(b=>Array.isArray(b)&&!isMatrix(b)&&b.length===3)){const b=e.splice(e.length-3,3);e.push(b);return}const s=9,c=e.splice(Math.max(0,e.length-s));if(!c.every(g=>typeof g=="number"))throw e.push(...c),new Error("mat3 operator requires number elements from the stack.");const p=s-c.length,u=Array(p).fill(0),f=[...c,...u],h=[];for(let g=0;g<3;g++)h.push(f.slice(g*3,(g+1)*3));e.push(h)},description:"Creates a 3x3 matrix. If the top three stack items are lists of size 3, they are used as rows. Otherwise, it consumes up to 9 numbers from the stack. Fills with 0 if not enough elements are available.",effect:"[[r1][r2][r3]] -> [matrix] OR [e1...e9]? -> [matrix]"},examples:[{code:"(1 2 3) (4 5 6) (7 8 9) mat3",expected:[[[1,2,3],[4,5,6],[7,8,9]]]},{code:"1 2 3 4 5 6 7 8 9 mat3",expected:[[[1,2,3],[4,5,6],[7,8,9]]]},{code:"1 2 3 mat3",expected:[[[1,2,3],[0,0,0],[0,0,0]]]},{code:"mat3",expected:[[[0,0,0],[0,0,0],[0,0,0]]]}]},mat4={definition:{exec:function*(e){if(e.length>=4&&e.slice(e.length-4).every(b=>Array.isArray(b)&&!isMatrix(b)&&b.length===4)){const b=e.splice(e.length-4,4);e.push(b);return}const s=16,c=e.splice(Math.max(0,e.length-s));if(!c.every(g=>typeof g=="number"))throw e.push(...c),new Error("mat4 operator requires number elements from the stack.");const p=s-c.length,u=Array(p).fill(0),f=[...c,...u],h=[];for(let g=0;g<4;g++)h.push(f.slice(g*4,(g+1)*4));e.push(h)},description:"Creates a 4x4 matrix. If the top four stack items are lists of size 4, they are used as rows. Otherwise, it consumes up to 16 numbers from the stack. Fills with 0 if not enough elements are available.",effect:"[[r1]..[r4]] -> [matrix] OR [e1...e16]? -> [matrix]"},examples:[{code:"(1 2 3 4) (5 6 7 8) (9 10 11 12) (13 14 15 16) mat4",expected:[[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]]},{code:"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 mat4",expected:[[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]]},{code:"1 2 3 4 mat4",expected:[[[1,2,3,4],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]},{code:"mat4",expected:[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]}]},transpose={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("transpose expects a matrix on the stack.");if(o.length===0||o[0].length===0){e.push(o);return}const s=o.length,c=o[0].length,p=Array.from({length:c},()=>Array(s).fill(0));for(let u=0;u<s;u++)for(let f=0;f<c;f++)p[f][u]=o[u][f];e.push(p)},description:"Transposes a matrix, swapping its rows and columns.",effect:"[matrix] -> [transposed_matrix]"},examples:[{code:"1 2 3 4 2 mat transpose",expected:[[[1,3],[2,4]]]},{code:"(1 2 3 4 5 6) 3 mat transpose",expected:[[[1,4],[2,5],[3,6]]]},{code:"() mat transpose",expected:[[]]}]},rotmat={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("rotmat expects a matrix on the stack.");if(o.length===0||o[0].length===0){e.push(o);return}const s=o.length,c=o[0].length,p=Array.from({length:c},()=>Array(s).fill(0));for(let f=0;f<s;f++)for(let h=0;h<c;h++)p[h][f]=o[f][h];const u=p.map(f=>f.reverse());e.push(u)},description:"Rotates a matrix 90 degrees clockwise.",effect:"[matrix] -> [rotated_matrix]"},examples:[{code:"1 2 3 4 2 mat rotmat",expected:[[[3,1],[4,2]]]},{code:"(1 2 3 4 5 6) 3 mat rotmat",expected:[[[4,1],[5,2],[6,3]]]}]},rotcol={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("rotcol expects a matrix on the stack.");if(o.length<2){e.push(o);return}const s=[...o.slice(1),o[0]];e.push(s)},description:"Rotates the columns of a matrix up, moving the top row to the bottom.",effect:"[matrix] -> [rotated_matrix]"},examples:[{code:"(1 2 3 4 5 6) 3 mat rotcol",expected:[[[4,5,6],[1,2,3]]]},{code:"1 2 2 mat rotcol",expected:[[[0,0],[1,2]]]}]},rotrow={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("rotrow expects a matrix on the stack.");if(o.length===0){e.push(o);return}const s=o.map(c=>{if(c.length<2)return[...c];const p=[...c],u=p.pop();return p.unshift(u),p});e.push(s)},description:"Rotates each row of a matrix to the right, moving the last element of each row to the first position.",effect:"[matrix] -> [rotated_matrix]"},examples:[{code:"(1 2 3 4 5 6) 3 mat rotrow",expected:[[[3,1,2],[6,4,5]]]},{code:"1 2 3 4 2 mat rotrow",expected:[[[2,1],[4,3]]]}]},isVector$2=e=>Array.isArray(e)&&!isMatrix(e)&&e.every(o=>typeof o=="number"),dot={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isVector$2(s)||!isVector$2(o))throw new Error("dot product requires two vectors (lists of numbers).");if(s.length!==o.length)throw new Error("dot product requires vectors of the same length.");if(s.length===0){e.push(0);return}let c=0;for(let p=0;p<s.length;p++)c+=s[p]*o[p];e.push(c)},description:"Calculates the dot product of two vectors (lists of numbers).",effect:"[V1 V2] -> [N]"},examples:[{code:"(1 2 3) (4 5 6) dot",expected:[32]},{code:"(10 20) (5 2) dot",expected:[90]},{code:"(1 2) (3 4 5) dot",expectedError:"vectors of the same length"},{code:"1 (1 2) dot",expectedError:"requires two vectors"}]},is3DVector=e=>Array.isArray(e)&&!isMatrix(e)&&e.length===3&&e.every(o=>typeof o=="number"),cross={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!is3DVector(s)||!is3DVector(o))throw new Error("cross product requires two 3D vectors (lists of 3 numbers).");const c=[s[1]*o[2]-s[2]*o[1],s[2]*o[0]-s[0]*o[2],s[0]*o[1]-s[1]*o[0]];e.push(c)},description:"Calculates the cross product of two 3D vectors.",effect:"[V1 V2] -> [V3]"},examples:[{code:"(1 0 0) (0 1 0) cross",expected:[[0,0,1]]},{code:"(0 1 0) (1 0 0) cross",expected:[[0,0,-1]]},{code:"(1 2 3) (4 5 6) cross",expected:[[-3,6,-3]]},{code:"(1 2) (3 4 5) cross",expectedError:"requires two 3D vectors"}]},isVector$1=e=>Array.isArray(e)&&!isMatrix(e)&&e.every(o=>typeof o=="number"),isGLSLExpression$4=e=>(e==null?void 0:e.type)==="glsl_expression",numericMatrixToGLSL=e=>{if(!isMatrix(e))return"";const o=e.length;if(o===0)return"";const s=e[0].length;if(o!==s||o!==3&&o!==4)return"";const p=e[0].map((f,h)=>e.map(g=>g[h])).flat(),u=f=>{const h=f.toString();return Number.isInteger(f)&&!h.includes("e")&&!h.includes(".")?h+".0":h};return o===3?`mat3(${p.map(u).join(", ")})`:o===4?`mat4(${p.map(u).join(", ")})`:""},matmul={definition:{exec:function*(e){var R,B,z;const o=e.pop(),s=e.pop(),c=isGLSLExpression$4(s)&&(s.returnType==="mat3"||s.returnType==="mat4"),p=isGLSLExpression$4(o)&&(o.returnType==="mat3"||o.returnType==="mat4");if(c||p){const L=c?`(${s.code})`:numericMatrixToGLSL(s),I=p?`(${o.code})`:numericMatrixToGLSL(o);if(!L||!I)throw new Error("matmul: Could not generate GLSL for one of the operands.");const W=`(${L} * ${I})`,Y=c?s.returnType:p?o.returnType:"mat3";e.push({type:"glsl_expression",code:W,returnType:Y});return}let u,f;const h=isVector$1(s),g=isVector$1(o),m=isMatrix(s),b=isMatrix(o);if(h&&g)throw new Error("matmul on two vectors is ambiguous. Use `dot` for dot product.");if(m)u=s;else if(h)u=[s];else throw new Error("matmul: first operand must be a matrix or a vector.");if(b)f=o;else if(g)f=o.map(L=>[L]);else throw new Error("matmul: second operand must be a matrix or a vector.");const v=u.length,S=((R=u[0])==null?void 0:R.length)||0,E=f.length,_=((B=f[0])==null?void 0:B.length)||0;if(S!==E)throw new Error(`Matrix multiplication dimension mismatch: A is ${v}x${S}, B is ${E}x${_}.`);if(S===0||v===0||_===0){e.push([]);return}const q=Array.from({length:v},()=>Array(_).fill(0));for(let L=0;L<v;L++)for(let I=0;I<_;I++){let W=0;for(let Y=0;Y<S;Y++)W+=u[L][Y]*f[Y][I];q[L][I]=W}q.length===1?e.push(q[0]):((z=q[0])==null?void 0:z.length)===1?e.push(q.map(L=>L[0])):e.push(q)},description:"Performs matrix multiplication. Can multiply matrix by matrix, vector by matrix (row vector), or matrix by vector (column vector). It also supports combining dynamic `glsl_expression` matrices for animated shaders. Alias: `@`.",effect:"[A B] -> [C]"},examples:[{code:`
# 1. Start with a Torus
0.8 0.2 vec2 torus

# 2. Create a dynamic rotation matrix around a tilted axis
(t 0.5 *) glsl  # angle animates
1 1 0 vec3      # tilted axis
matrot

# 3. Create a dynamic, non-uniform scaling matrix
(t sin 0.2 * 1 +) glsl  # sx: pulses between 0.8 and 1.2
(t cos 0.2 * 1 +) glsl  # sy: pulses out of phase with sx
1.0                       # sz: static
scalemat

# 4. Multiply the rotation and scaling matrices into ONE final matrix
# The order matters: R * S applies scaling first, then rotation.
@

# 5. Apply the combined transformation
transform

# 6. Apply an animated procedural material
(p 5 * t +) glsl cnoise material

# 7. Set up the scene with lighting and render
march
2 2 5 vec3 "white" 0.1 light
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a torus that simultaneously rotates and pulses in size, textured with animated noise."},{code:"((1 2)(3 4)) ((10 20)(30 40)) matmul",expected:[[[70,100],[150,220]]]},{code:"((1 2)(3 4)) ((10 20)(30 40)) @",expected:[[[70,100],[150,220]]]},{code:"(1 2) ((10 20)(30 40)) matmul",expected:[[70,100]]},{code:"((1 2)(3 4)) (10 30) matmul",expected:[[70,150]]},{code:"((1 2)(3 4)) ((1)(2)(3)) matmul",expectedError:"dimension mismatch"},{code:"(1 2) (3 4) matmul",expectedError:"ambiguous"}]},identity={definition:{exec:function*(e){const o=e.pop();if(!Number.isInteger(o)||o<0)throw new Error("identity operator expects a non-negative integer.");const s=[];for(let c=0;c<o;c++){const p=Array(o).fill(0);p[c]=1,s.push(p)}e.push(s)},description:"Creates an NxN identity matrix.",effect:"[N] -> [matrix]"},examples:[{code:"3 identity",expected:[[[1,0,0],[0,1,0],[0,0,1]]]},{code:"1 identity",expected:[[[1]]]},{code:"0 identity",expected:[[]]}]},rows={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("rows operator expects a matrix.");e.push(...o)},description:"Spreads the rows of a matrix onto the stack as individual lists.",effect:"[matrix] -> [row1 row2 ...]"},examples:[{code:"((1 2)(3 4)) rows",expected:[[1,2],[3,4]]},{code:"3 identity rows",expected:[[1,0,0],[0,1,0],[0,0,1]]}]},cols={definition:{exec:function*(e){const o=e.pop();if(!isMatrix(o))throw new Error("cols operator expects a matrix.");if(o.length===0||o[0].length===0){for(let u=0;u<o.length;u++)e.push([]);return}const s=o.length,c=o[0].length,p=Array.from({length:c},()=>Array(s).fill(0));for(let u=0;u<s;u++)for(let f=0;f<c;f++)p[f][u]=o[u][f];e.push(...p)},description:"Spreads the columns of a matrix onto the stack as individual lists.",effect:"[matrix] -> [col1 col2 ...]"},examples:[{code:"((1 2)(3 4)) cols",expected:[[1,3],[2,4]]},{code:"3 identity cols",expected:[[1,0,0],[0,1,0],[0,0,1]]},{code:"(1 2 3 4 5 6) 3 mat cols",expected:[[1,4],[2,5],[3,6]]}]},matrows={definition:{exec:function*(e){const o=e.pop();if(!Number.isInteger(o)||o<0)throw new Error("matrows operator expects a non-negative integer for the row count.");if(e.length<o)throw e.push(o),new Error(`Stack underflow for matrows. Expected ${o} rows on the stack.`);if(o===0){e.push([]);return}const s=e.splice(e.length-o,o);if(!s.every(u=>Array.isArray(u)&&(!isMatrix(u)||u.length===0)))throw e.push(...s,o),new Error("matrows expects all row arguments to be lists.");const p=s[0].length;if(!s.every(u=>u.length===p))throw e.push(...s,o),new Error("All lists must have the same length to form a matrix with matrows.");e.push(s)},description:"Creates a matrix from N row vectors. Consumes an integer N, then consumes N lists from the stack to use as the rows of the new matrix.",effect:"[row1 row2 ... rowN N] -> [matrix]"},examples:[{code:"(1 2) (3 4) 2 matrows",expected:[[[1,2],[3,4]]]},{code:"(1) (2) (3) 3 matrows",expected:[[[1],[2],[3]]]},{code:"0 matrows",expected:[[]]}]},matcols={definition:{exec:function*(e){const o=e.pop();if(!Number.isInteger(o)||o<0)throw new Error("matcols operator expects a non-negative integer for the column count.");if(e.length<o)throw e.push(o),new Error(`Stack underflow for matcols. Expected ${o} columns on the stack.`);if(o===0){e.push([]);return}const s=e.splice(e.length-o,o);if(!s.every(h=>Array.isArray(h)&&(!isMatrix(h)||h.length===0)))throw e.push(...s,o),new Error("matcols expects all column arguments to be lists.");const p=s[0].length;if(!s.every(h=>h.length===p))throw e.push(...s,o),new Error("All lists must have the same length to form a matrix with matcols.");if(p===0){e.push([]);return}const u=p,f=Array.from({length:u},()=>Array(o).fill(0));for(let h=0;h<u;h++)for(let g=0;g<o;g++)f[h][g]=s[g][h];e.push(f)},description:"Creates a matrix from N column vectors. Consumes an integer N, then consumes N lists from the stack to use as the columns of the new matrix.",effect:"[col1 col2 ... colN N] -> [matrix]"},examples:[{code:"(1 3) (2 4) 2 matcols",expected:[[[1,2],[3,4]]]},{code:"(1 4 7) (2 5 8) (3 6 9) 3 matcols",expected:[[[1,2,3],[4,5,6],[7,8,9]]]},{code:"() () 2 matcols",expected:[[]]}]},isVector=(e,o)=>Array.isArray(e)&&!isMatrix(e)&&e.length===o&&e.every(s=>typeof s=="number"),numToGLSL$1=e=>{const o=e.toString();return Number.isInteger(e)&&!o.includes("e")&&!o.includes(".")?o+".0":o},matrot={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(typeof s!="number"&&(s==null?void 0:s.type)!=="glsl_expression")throw new Error("matrot expects a number or glsl_expression for the angle (in radians).");if(!isVector(o,3))throw new Error("matrot expects a vec3 for the axis of rotation.");const c=Math.sqrt(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]);if(c===0){e.push([[1,0,0],[0,1,0],[0,0,1]]);return}const p=o[0]/c,u=o[1]/c,f=o[2]/c;if(typeof s=="number"){const h=Math.cos(s),g=Math.sin(s),m=1-h,b=[[p*p*m+h,p*u*m-f*g,p*f*m+u*g],[u*p*m+f*g,u*u*m+h,u*f*m-p*g],[f*p*m-u*g,f*u*m+p*g,f*f*m+h]];e.push(b)}else{const h=s.code,m={type:"glsl_expression",code:`rotationMatrix(${`vec3(${numToGLSL$1(p)}, ${numToGLSL$1(u)}, ${numToGLSL$1(f)})`}, ${h})`,returnType:"mat3"};e.push(m)}},description:"Creates a 3x3 rotation matrix from an angle (in radians) and a 3D axis vector. The angle can be a number for a static matrix or a `glsl_expression` for a dynamic matrix used in shaders.",effect:"[F_angle|glsl_expr V_axis] -> [matrix]"},examples:[{code:"3.14159 0 1 0 vec3 matrot",assert:e=>{const o=e[0];return e.length===1&&isMatrix(o)&&Math.abs(o[0][0]- -1)<1e-4&&Math.abs(o[2][2]- -1)<1e-4},expectedDescription:"A 3x3 matrix representing a 180-degree rotation around the Y-axis."},{code:`1 1 1 vec3 box
(t) glsl 1 2 3 vec3 matrot
transform
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, rotating sphere."}]},isGLSLExpression$3=e=>(e==null?void 0:e.type)==="glsl_expression",numToGLSL=e=>{const o=e.toString();return Number.isInteger(e)&&!o.includes("e")&&!o.includes(".")?o+".0":o},scalemat={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(isGLSLExpression$3(c)||isGLSLExpression$3(s)||isGLSLExpression$3(o)){const u=isGLSLExpression$3(c)?c.code:numToGLSL(c),f=isGLSLExpression$3(s)?s.code:numToGLSL(s),h=isGLSLExpression$3(o)?o.code:numToGLSL(o),g={type:"glsl_expression",code:`mat3(${u}, 0.0, 0.0, 0.0, ${f}, 0.0, 0.0, 0.0, ${h})`,returnType:"mat3"};e.push(g)}else{if(typeof c!="number"||typeof s!="number"||typeof o!="number")throw new Error("scalemat expects three numbers or glsl_expressions for x, y, z scales.");const u=[[c,0,0],[0,s,0],[0,0,o]];e.push(u)}},description:"Creates a 3x3 scaling matrix from x, y, and z scale factors. Factors can be numbers for a static matrix or `glsl_expression`s for a dynamic matrix used in shaders.",effect:"[sx sy sz] -> [matrix]"},examples:[{code:"2 1 1 scalemat",expected:[[[2,0,0],[0,1,0],[0,0,1]]]},{code:`
0.5 sphere
(t sin 0.5 * 1 +) glsl # dynamic x scale
1.0                     # static y scale
1.0                     # static z scale
scalemat
transform
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere pulsing in size along the x-axis."}]},matrix={name:"Matrix Operations",description:"Operators for creating and manipulating matrices.",definitions:{mat,cmat,mat2,mat3,mat4,transpose,rotmat,rotcol,rotrow,dot,cross,matmul,identity,rows,cols,matrows,matcols,matrot,scalemat}},greaterThanOrEqual={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s>=o)},description:"Tests if A is greater than or equal to B.",effect:"[A B] -> [bool]"},examples:[{code:"10 10 >=",expected:[!0]},{code:"10 5 >=",expected:[!0]},{code:"5 10 >=",expected:[!1]}]},greaterThan={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s>o)},description:"Tests if A is greater than B.",effect:"[A B] -> [bool]"},examples:[{code:"10 5 >",expected:[!0]},{code:"10 10 >",expected:[!1]},{code:"5 10 >",expected:[!1]}]},lessThanOrEqual={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s<=o)},description:"Tests if A is less than or equal to B.",effect:"[A B] -> [bool]"},examples:[{code:"5 10 <=",expected:[!0]},{code:"10 10 <=",expected:[!0]},{code:"10 5 <=",expected:[!1]}]},lessThan={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s<o)},description:"Tests if A is less than B.",effect:"[A B] -> [bool]"},examples:[{code:"5 10 <",expected:[!0]},{code:"10 10 <",expected:[!1]},{code:"10 5 <",expected:[!1]}]},notEqual={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s!=o)},description:"Tests for inequality.",effect:"[A B] -> [bool]"},examples:[{code:"5 10 !=",expected:[!0]},{code:"10 10 !=",expected:[!1]},{code:'"a" "b" !=',expected:[!0]}]},equal={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(deepEqual(s,o))},description:"Tests for deep equality.",effect:"[A B] -> [bool]"},examples:[{code:"10 10 ==",expected:[!0]},{code:"10 5 ==",expected:[!1]},{code:'"a" "a" ==',expected:[!0]},{code:"(1 (2)) (1 (2)) ==",expected:[!0]},{code:"(1 (2)) (1 (3)) ==",expected:[!1]}]},nullPredicate={definition:{exec:function*(e){const o=e.pop();e.push(o===0||Array.isArray(o)&&o.length===0)},description:"Tests if a number is 0 or a list is empty.",effect:"[A] -> [bool]"},examples:[{code:"() null?",expected:[!0]},{code:"0 null?",expected:[!0]},{code:"(1) null?",expected:[!1]},{code:"1 null?",expected:[!1]}]},small={definition:{exec:function*(e){const o=e.pop();e.push(o===0||o===1||Array.isArray(o)&&o.length<=1)},description:"Tests if an aggregate has 0 or 1 members.",effect:"[A] -> [bool]"},examples:[{code:"(42) small",expected:[!0]},{code:"1 small",expected:[!0]},{code:"0 small",expected:[!0]},{code:"() small",expected:[!0]},{code:"(1 2) small",expected:[!1]},{code:"2 small",expected:[!1]}]},has={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.includes(o))},description:"Tests if a list contains an element. Postfix form.",effect:"[A X] -> [bool]"},examples:[{code:"(1 2 3) 2 has",expected:[!0]},{code:"(1 2 3) 4 has",expected:[!1]}]},inOp={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(o.includes(s))},description:"Tests if a list contains an element. Infix form.",effect:"[X A] -> [bool]"},examples:[{code:"2 (1 2 3) in",expected:[!0]},{code:"4 (1 2 3) in",expected:[!1]}]},integerPredicate={definition:{exec:function*(e){e.push(Number.isInteger(e.pop()))},description:"Tests if the top element is an integer.",effect:"[A] -> [bool]"},examples:[{code:"10 integer?",expected:[!0]},{code:"-5 integer?",expected:[!0]},{code:"10.5 integer?",expected:[!1]},{code:'"10" integer?',expected:[!1]}]},charPredicate={definition:{exec:function*(e){const o=e.pop();e.push(typeof o=="string"&&o.length===1)},description:"Tests if the top element is a character (string of length 1).",effect:"[A] -> [bool]"},examples:[{code:'"a" char?',expected:[!0]},{code:'"ab" char?',expected:[!1]},{code:"97 chr char?",expected:[!0]}]},logicalPredicate={definition:{exec:function*(e){const o=e.pop();e.push(typeof o=="boolean")},description:"Tests if the top element is a boolean (`true` or `false`).",effect:"[A] -> [bool]"},examples:[{code:"true logical?",expected:[!0]},{code:"false logical?",expected:[!0]},{code:"1 logical?",expected:[!1]},{code:'"true" logical?',expected:[!1]},{code:"[] logical?",expected:[!1]}]},stringPredicate={definition:{exec:function*(e){const o=e.pop();e.push(typeof o=="string")},description:"Tests if the top element is a string.",effect:"[A] -> [bool]"},examples:[{code:'"hi" string?',expected:[!0]},{code:'"" string?',expected:[!0]},{code:"1 string?",expected:[!1]}]},listPredicate={definition:{exec:function*(e){e.push(Array.isArray(e.pop()))},description:"Tests if the top element is a list.",effect:"[A] -> [bool]"},examples:[{code:"(1 2) list?",expected:[!0]},{code:"() list?",expected:[!0]},{code:"1 list?",expected:[!1]}]},setPredicate={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o)){e.push(!1);return}e.push(new Set(o).size===o.length)},description:"Tests if the top element is a list with only unique values.",effect:"[A] -> [bool]"},examples:[{code:"(1 2 3) set?",expected:[!0]},{code:"(1 2 2 3) set?",expected:[!1]},{code:"() set?",expected:[!0]},{code:'"hello" set?',expected:[!1]},{code:"(1 2 3) set set?",expected:[!0]}]},predicates={name:"Predicates",description:"Operators that test values and return a boolean.",definitions:{">=":greaterThanOrEqual,">":greaterThan,"<=":lessThanOrEqual,"<":lessThan,"!=":notEqual,"==":equal,"null?":nullPredicate,small,has,in:inOp,"integer?":integerPredicate,"char?":charPredicate,"logical?":logicalPredicate,"string?":stringPredicate,"list?":listPredicate,"set?":setPredicate}},linrec={definition:{exec:function*(e,o={},s){const[c,p,u,f]=[e.pop(),e.pop(),e.pop(),e.pop()],h=function*(m,b){const v=[m];if(yield*s([...f],v,b),v.pop()){const S=[m];return yield*s([...u],S,b),S}else{const S=[m];yield*s([...p],S,b);const E=S.pop(),_=[...S],q=yield*h(E,b),R=[..._,...q];return yield*s([...c],R,b),b.isDebug&&b.onStep([...e,...R]),R}},g=yield*h(e.pop(),o);e.push(...g)},description:"Linear recursion combinator.",effect:"..."},examples:[{code:"((null?) (succ) (dup pred) (*) linrec) fac => 5 fac",expected:[120]},{code:"5 ((null?) (succ) (dup pred) (*) linrec) i",expected:[120]}]},binrec={definition:{exec:function*(e,o={},s){const[c,p,u,f]=[e.pop(),e.pop(),e.pop(),e.pop()],h=function*(m,b){const v=[m];if(yield*s([...f],v,b),v.pop()){const S=[m];return yield*s([...u],S,b),S}else{const S=[m];yield*s([...p],S,b);const E=S.pop(),_=S.pop(),q=yield*h(_,b),R=yield*h(E,b),B=[...S,...q,...R];return yield*s([...c],B,b),b.isDebug&&b.onStep([...e,...B]),B}},g=yield*h(e.pop(),o);e.push(...g)},description:"Binary recursion combinator, useful for divide-and-conquer.",effect:"..."},examples:[{code:["( (2 <) () (dup pred swap pred pred) (+) binrec ) fib =>","8 fib"],expected:[21]}]},primrec={definition:{exec:function*(e,o={},s){const[c,p]=[e.pop(),e.pop()],u=e.pop(),f=function*(h,g){if(typeof h=="number"&&h<=0||Array.isArray(h)&&h.length===0)yield*s(p,e,g);else if(typeof h=="number")yield*f(h-1,g),e.push(h),yield*s(c,e,g);else{const[m,...b]=h;yield*f(b,g),e.push(m),yield*s(c,e,g)}};e.length=0,yield*f(u,o)},description:"Primitive recursion. Executes [I] for 0 or empty list. For N > 0, executes N-1 primrec, then combines with N via [C]. For lists, recurses on rest, then combines with first via [C].",effect:"[X [I] [C]] -> [R]"},examples:[{code:"5 (1) (*) primrec",expected:[120]},{code:"(1 2 3 4) 0 (+) primrec",expected:[10]}]},tailrec={definition:{exec:function*(e,o={},s){const[c,p,u]=[e.pop(),e.pop(),e.pop()],f=function*(h){const g=[...e];yield*s(u,g,h),g.pop()?yield*s(p,e,h):(yield*s(c,e,h),yield*f(h))};yield*f(o)},description:"Tail recursion. Executes [T]est. If true, executes [Th]en. Else executes [R]ecurse and loops. `[... [T] [Th] [R]] tailrec`",effect:"[... [T] [Th] [R]] -> [...]"},examples:[{code:["# Factorial (tail-recursive)","# Stack state is [N Acc]","( (swap popd dup 1 <=) (popd) (dupd swapd * swap pred swap) tailrec ) fac =>","5 1 fac"],expected:[120]},{code:["# Find the last element of a list","( (rest null?) (first) (rest) tailrec ) last =>","(1 2 3 4 5) last"],expected:[5]}]},genrec={definition:{exec:function*(e,o={},s){const[c,p,u,f]=[e.pop(),e.pop(),e.pop(),e.pop()];yield*function*(g){const m=[...e];if(yield*s(f,m,g),m.pop())yield*s(u,e,g);else{yield*s(p,e,g);const b=[f,u,p,c,"genrec"];e.push(b),yield*s(c,e,g)}}(o)},description:"General recursion. `[B] [T] [R1] [R2] genrec`. Executes B. If true, executes T. Else, executes R1, pushes the recursive call, then executes R2.",effect:"[... [B] [T] [R1] [R2]] -> [...]"},examples:[{code:"5 ( (dup 0 <=) (pop 1) (dup pred) (i *) genrec ) i",expected:[120]},{code:["( (dup 0 ==) (pop 1) (dup pred) (i *) genrec ) fac =>","5 fac"],expected:[120]}]},condlinrec={definition:{exec:function*(e,o={},s){const c=e.pop(),p=function*(u){for(const f of c){if(!Array.isArray(f)||f.length<2)continue;const h=f[0],g=[...e];if(yield*s(h,g,u),g.pop()){if(f.length===2){const m=f[1];yield*s(m,e,u)}else{const[m,b,v]=f;yield*s(b,e,u),yield*p(u),yield*s(v,e,u)}return}}};yield*p(o)},description:"Conditional linear recursion. Takes a list of cases `[[B T] or [B R1 R2]...]`. Finds the first true B. If a `[T]` branch, executes T. If a `[R1 R2]` branch, executes R1, recurses, then executes R2.",effect:"[... [Cases]] -> [...]"},examples:[{code:`# Factorial with condlinrec
5 ( 
    ( (dup 0 ==) (pop 1) )
    ( (true) (dup pred) (*) )
) condlinrec`,expected:[120]},{code:`1 ( 
                ( (dup 0 ==) (pop 1) )
                ( (true) (dup pred) (*) )
            ) condlinrec`,expected:[1]}]},recursion={name:"Recursive Combinators",description:"Specialized combinators for performing various forms of recursion, from simple linear patterns to the most general cases.",definitions:{linrec,binrec,primrec,tailrec,genrec,condlinrec}},pop={definition:{exec:function*(e){e.pop()},description:"Removes the top element from the stack.",effect:"[X] -> []"},examples:[{code:"1 2 3 pop",expected:[1,2]},{code:"() 1 pop",expected:[[]]}]},put={definition:{exec:function*(e){},description:"No-op. Sometimes used for clarity to indicate a value is intentionally left on the stack.",effect:"[A] -> [A]"},examples:[{code:"42 put",expected:[42]},{code:"1 2 3 put",expected:[1,2,3]}]},dup={definition:{exec:function*(e){e.push(e[e.length-1])},description:"Duplicates the top element of the stack.",effect:"[X] -> [X X]"},examples:[{code:"10 dup",expected:[10,10]},{code:"(1 2) dup",expected:[[1,2],[1,2]]}]},swap={definition:{exec:function*(e){e.push(e.pop(),e.pop())},description:"Swaps the top two elements of the stack.",effect:"[X Y] -> [Y X]"},examples:[{code:"10 20 swap",expected:[20,10]},{code:"true (1) swap",expected:[[1],!0]}]},id={definition:{exec:function*(e){},description:"Identity function. Does nothing.",effect:"[X] -> [X]"},examples:[{code:"42 id",expected:[42]},{code:"(1 2 3) id",expected:[[1,2,3]]}]},rollup={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push(o,c,s)},description:"Rolls the top three stack items up.",effect:"[X Y Z] -> [Z X Y]"},examples:[{code:"1 2 3 rollup",expected:[3,1,2]},{code:"10 20 30 rollup",expected:[30,10,20]}]},rolldown={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push(s,o,c)},description:"Rolls the top three stack items down.",effect:"[X Y Z] -> [Y Z X]"},examples:[{code:"1 2 3 rolldown",expected:[2,3,1]},{code:'"c" "b" "a" rolldown',expected:["b","a","c"]}]},rotate={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push(o,s,c)},description:"Rotates the top three stack items.",effect:"[X Y Z] -> [Z Y X]"},examples:[{code:"1 2 3 rotate",expected:[3,2,1]},{code:'"a" "b" "c" rotate',expected:["c","b","a"]}]},popd={definition:{exec:function*(e){const o=e.pop();e.pop(),e.push(o)},description:"Like pop, but removes the second element from the stack.",effect:"[X Y] -> [Y]"},examples:[{code:"1 2 3 popd",expected:[1,3]},{code:'"a" "b" "c" popd',expected:["a","c"]}]},dupd={definition:{exec:function*(e){const o=e.pop();e.push(e[e.length-1],o)},description:"Like dup, but duplicates the second element on the stack.",effect:"[X Y] -> [X X Y]"},examples:[{code:"1 2 3 dupd",expected:[1,2,2,3]},{code:'"a" "b" dupd',expected:["a","a","b"]}]},swapd={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push(s,c,o)},description:"Like swap, but swaps the second and third elements.",effect:"[X Y Z] -> [Y X Z]"},examples:[{code:"10 20 30 swapd",expected:[20,10,30]},{code:"1 (2) 3 swapd",expected:[[2],1,3]}]},clear={definition:{exec:function*(e){e.length=0},description:"Removes all items from the stack, leaving it empty.",effect:"[...] -> []"},examples:[{code:"1 2 3 clear",expected:[]},{code:"[] clear",expected:[]}]},over={definition:{exec:function*(e){if(e.length<2)throw new Error("Stack underflow for operator: over");e.push(e[e.length-2])},description:"Copies the second element from the top of the stack to the top.",effect:"[X Y] -> [X Y X]"},examples:[{code:"10 20 over",expected:[10,20,10]},{code:"1 2 3 over",expected:[1,2,3,2]},{code:"1 over",expectedError:"Stack underflow"}]},tuck={definition:{exec:function*(e){if(e.length<2)throw new Error("Stack underflow for operator: tuck");const o=e.pop(),s=e.pop();e.push(o,s,o)},description:"Copies the top element and inserts it below the second element.",effect:"[X Y] -> [Y X Y]"},examples:[{code:"10 20 tuck",expected:[20,10,20]},{code:"1 2 3 tuck",expected:[1,3,2,3]},{code:"1 tuck",expectedError:"Stack underflow"}]},stack={definitions:{pop,put,dup,swap,over,tuck,id,rollup,rolldown,rotate,popd,dupd,swapd,clear}},ord={definition:{exec:function*(e){e.push(e.pop().charCodeAt(0))},description:"Pushes the character code of the first character of a string.",effect:"[S] -> [I]"},examples:[{code:'"A" ord',expected:[65]},{code:'"a" ord',expected:[97]}]},chr={definition:{exec:function*(e){e.push(String.fromCharCode(e.pop()))},description:"Pushes the string representation of a character code.",effect:"[I] -> [S]"},examples:[{code:"65 chr",expected:["A"]},{code:"97 chr",expected:["a"]}]},set={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("set expects a list.");e.push([...new Set(o)])},description:"Converts a list to a list with unique values.",effect:"[L] -> [L']"},examples:[{code:"(1 2 2 3) set",expected:[[1,2,3]]}]},types={definitions:{ord,chr,set}},wrap={definition:{exec:function*(e){e.push([e.pop()])},description:"Wraps the top element in a new list.",effect:"[X] -> [[X]]"},examples:[{code:"10 wrap",expected:[[10]]},{code:"(1) wrap",expected:[[[1]]]}]},second={definition:{exec:function*(e){const o=e.pop();e.push(o.slice(1)[0]),e.push(o)},description:"Pushes the second element of a list without consuming the list.",effect:"[L] -> [E L]"},examples:[{code:"(10 20 30) second",expected:[20,[10,20,30]]},{code:'"abc" second',expected:["b","abc"]}]},third={definition:{exec:function*(e){const o=e.pop();e.push(o.slice(2)[0]),e.push(o)},description:"Pushes the third element of a list without consuming the list.",effect:"[L] -> [E L]"},examples:[{code:"(10 20 30) third",expected:[30,[10,20,30]]},{code:'"abc" third',expected:["c","abc"]}]},shunt={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s)||!Array.isArray(o))throw new Error("shunt expects two lists on the stack.");const c=[...o].reverse();s.unshift(...c),e.push(s)},description:"Moves all elements from list L2, in reverse order, to the front of list L1.",effect:"[L1 L2] -> [L3]"},examples:[{code:"(1 2 3) (4 5 6) shunt",expected:[[6,5,4,1,2,3]]},{code:"() (1 2) shunt",expected:[[2,1]]}]},reverse={definition:{exec:function*(e){const o=e.pop();if(Array.isArray(o))e.push(o.reverse());else if(typeof o=="string")e.push(o.split("").reverse().join(""));else throw new Error("reverse expects a list or a string.")},description:"Reverses a list or string.",effect:"[S] -> [S']"},examples:[{code:"(1 2 3 4) reverse",expected:[[4,3,2,1]]},{code:'("h" "e" "l" "l" "o") reverse',expected:[["o","l","l","e","h"]]},{code:'"hello" reverse',expected:["olleh"]}]},dip2={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop(),u=e.pop();yield*s(c,e,o),e.push(u,p)},description:"Saves two stack items, executes a program, then restores them.",effect:"[X Y [P]] -> [... X Y]"},examples:[{code:"1 2 (10 20 +) dip2",expected:[30,1,2]},{code:"1 2 () dip2",expected:[1,2]}]},dip3={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop(),u=e.pop(),f=e.pop();yield*s(c,e,o),e.push(f,u,p)},description:"Saves three stack items, executes a program, then restores them.",effect:"[X Y Z [P]] -> [... X Y Z]"},examples:[{code:"1 2 3 (10 20 +) dip3",expected:[30,1,2,3]},{code:"10 20 1 2 3 (+) dip3",expected:[30,1,2,3]}]},enjoin={definition:{exec:function*(e){if(e.length<1){e.push("");return}const o=String(e.pop()),s=e.join(o);e.length=0,e.push(s)},description:"Joins all elements on the stack (except the separator at the top) into a single string, separated by the given separator.",effect:"[A B C ... S] -> [S']"},examples:[{code:'1 2 3 "-" enjoin',expected:["1-2-3"]},{code:'"hello" "world" " " enjoin',expected:["hello world"]},{code:'1 2 3 "" enjoin',expected:["123"]},{code:'"," enjoin',expected:[""]},{code:"enjoin",assert:e=>e.length===1&&e[0]==="",expectedDescription:"Empty string for empty stack"}]},PRECEDENCE={pow:4,max:4,min:4,"*":3,"/":3,"%":3,"+":2,"-":2,">":1,"<":1,"==":0,"&":-1,"|":-2},isOperator=e=>typeof e=="string"&&PRECEDENCE[e]!==void 0,yardRecursive=e=>{const o=[],s=[];for(const c of e)if(isOperator(c)){for(;s.length>0&&isOperator(s[s.length-1])&&PRECEDENCE[s[s.length-1]]>=PRECEDENCE[c];)o.push(s.pop());s.push(c)}else Array.isArray(c)?o.push(...yardRecursive(c)):o.push(c);for(;s.length>0;)o.push(s.pop());return o},yard={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("yard operator expects a list (quotation) in infix notation.");const s=yardRecursive(o);e.push(s)},description:"Implements Dijkstra's Shunting-yard algorithm to convert an infix expression (given as a list) into a postfix (RPN) expression. Supports common arithmetic, relational, and bitwise operators with standard precedence. It handles nested lists as parenthesized sub-expressions.",effect:"[infix_list] -> [postfix_list]"},examples:[{code:"(1 + 2) yard",expected:[[1,2,"+"]]},{code:"(3 * 4 + 5) yard",expected:[[3,4,"*",5,"+"]]},{code:"(3 + 4 * 5) yard",expected:[[3,4,5,"*","+"]]},{code:"((2 * 4) / 4) yard",expected:[[2,4,"*",4,"/"]]},{code:"(foo / bar) yard",expected:[["foo","bar","/"]]},{code:"(a + (b * c) + d) yard",expected:[["a","b","c","*","+","d","+"]]},{code:"(2 * 3 pow 2) yard",expected:[[2,3,2,"pow","*"]]},{code:"(3 + 4 < 8) yard",expected:[[3,4,"+",8,"<"]]},{code:"(3 & 5 | 2) yard",expected:[[3,5,"&",2,"|"]]},{code:"(a max b == c min d) yard",expected:[["a","b","max","c","d","min","=="]]}]},utils={name:"Utility Operators",description:"General-purpose helper operators.",definitions:{wrap,second,third,shunt,reverse,dip2,dip3,enjoin,yard}},appendTo={definition:{exec:function*(e,o,s,c){const p=e.pop();let u,f;if(typeof p=="symbol"){const m=Symbol.keyFor(p);if(!m)throw new Error("appendTo: assignment to a non-global symbol is not supported.");u=`:${m}`,f=`:${m}`}else if(typeof p=="string"||typeof p=="number")u=String(p),f=String(p);else throw new Error(`appendTo: target must be a name, symbol, or integer, but got: ${JSON.stringify(p)}`);const h=e.pop(),g=c[u];if(!g)c[u]={body:h,description:"User-defined variable.",example:""};else if("body"in g)Array.isArray(g.body)?g.body.push(h):g.body=[g.body,h];else throw new Error(`Cannot append to built-in function: '${f}'.`)},description:"Pops a value and a name, then appends the value to the list variable associated with the name. If the variable exists but is not a list, it is automatically converted to a list. Creates the variable if it does not exist. Alias: `<-`.",effect:"[... V N] -> [...]"},examples:[{code:["() mylist =","10 mylist appendTo","20 mylist <-","mylist"],expected:[[10,20]]},{code:["10 newlog <-","20 newlog <-","newlog"],expected:[[10,20]]},{code:["42 :mynum <-",":mynum"],expected:[42]},{code:["1 foo =","2 foo <-","foo"],expected:[[1,2]]}]},ary={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(typeof c!="number"||!Number.isInteger(c)||c<0)throw new Error("ary expects an integer count on top of the stack.");if(e.length<c)throw new Error(`Stack underflow for ary. Expected ${c} items, but only ${e.length} available.`);const f=e.splice(e.length-c,c);yield*s(p,f,o),e.push(...f)},description:"Like `map`, but applies program P to N values taken from the stack as a single unit. `... X1..XN [P] N -> ... R...`",effect:"[... X1..XN [P] N] -> [... R...]"},examples:[{code:"20 30 (+) 2 ary",expected:[50]},{code:"10 20 30 (+ *) 3 ary",expected:[500]},{code:"10 20 30 40 (+ *) 3 ary",expected:[10,1400]},{code:"1 2 () 0 ary",expected:[1,2]},{code:"10 20 30 40 (+ *) 4 ary",expected:[10,1400]}]},construct={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(c)||!Array.isArray(p))throw new Error("construct expects two lists on top of the stack.");const u=[...e],f=[...e];yield*s(p,f,o);const h=[];for(const g of c){const m=[...u];yield*s(g,m,o),m.length>0&&h.push(m[m.length-1])}e.push(...h)},description:"Saves the stack, executes a setup program [P], then executes each program in a list of constructor programs [[P1] [P2]..] on the saved stack, collecting the single result from each.",effect:"[S [P] [[P1]..]] -> [S R1 R2 ..]"},examples:[{code:"10 20 (pop) ((dup) (succ)) construct",expected:[10,20,20,21]}]},infra={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(p))throw new Error("infra expects a list to be used as the stack.");const u=[...p].reverse();yield*s(c,u,o),e.push([...u].reverse())},description:"Using list L1 as a temporary stack, executes program P and returns a new list L2. The first element of L1 is the top of the stack.",effect:"[L1 [P]] -> [L2]"},examples:[{code:"(10 20) (dup *) infra",expected:[[100,20]]},{code:"(10 20 30) (pop) infra",expected:[[20,30]],expectedDescription:"Implementing 'rest' with infra: pop the first element."},{code:"(10 20 30) (succ) infra",expected:[[11,20,30]],expectedDescription:"Mapping the first element: apply 'succ' to the head of the list."},{code:"(1 2 3) () swap infra",expected:[[3,2,1]],expectedDescription:"Reversing a list: The list to be reversed is used as the program, pushing its elements onto an empty list which serves as the temporary stack."}]},nullary={definition:{exec:function*(e,o,s){const c=e.pop(),p=[...e],u=[...e];yield*s(c,u,o);let f=u;if(u.length>=p.length){let h=!0;for(let g=0;g<p.length;g++)if(!deepEqual(u[g],p[g])){h=!1;break}h&&(f=u.slice(p.length))}e.push(...f)},description:"Executes a program P on a copy of the current stack. If P only adds items, only the new items are pushed. If P modifies the original stack items, the entire resulting stack from P is pushed. In either case, the original stack remains untouched by the operation.",effect:"[... [P]] -> [... R]"},examples:[{code:"10 20 (1 1 +) nullary",expected:[10,20,2]},{code:"10 20 (list dup +) nullary",expected:[10,20,20,30,30,40]}]},popstackto={definition:{exec:function*(e,o,s,c){const p=e.pop();let u;if(typeof p=="symbol"){const h=Symbol.keyFor(p);if(!h)throw new Error("popstackto: assignment to a non-global symbol is not supported.");u=`:${h}`}else if(typeof p=="string"||typeof p=="number")u=String(p);else throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(p)}`);const f=[...e];e.length=0,c[u]={body:f,description:"User-defined function/variable.",example:""}},description:"Pops a name, assigns the entire rest of the stack as a list to that name, and then clears the stack. `... N popstackto`",effect:"[... N] -> []"},examples:[{code:["1 2 3 4 allmine popstackto","allmine"],expected:[[1,2,3,4]]},{code:["1 2 :allmine popstackto",":allmine"],expected:[[1,2]]},{code:["1 2 3 1 popstackto","1"],expected:[[1,2,3]]}]},popto={definition:{exec:function*(e,o,s,c){const p=e.pop();let u;if(typeof p=="symbol"){const h=Symbol.keyFor(p);if(!h)throw new Error("popto: assignment to a non-global symbol is not supported.");u=`:${h}`}else if(typeof p=="string"||typeof p=="number")u=String(p);else throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(p)}`);const f=e.pop();c[u]={body:f,description:"User-defined function/variable.",example:""}},description:"Pops a value and a name, then assigns the value to the name in the dictionary. This is used to define data variables. Alias: `=`. `... V N popto`",effect:"[... V N] -> [...]"},examples:[{replCode:["(1 2 3 4) mylist =","mylist"],assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===4,expected:[[1,2,3,4]]},{replCode:["1 2 + my_three =","my_three"],expected:[3]},{code:["42 :mynum =",":mynum"],expected:[42]},{code:["100 1 =","1"],expected:[100]},{replCode:["(1 2 +) my_func =","my_func"],expected:[[1,2,"+"]]}]},unary={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(typeof c!="number"||!Number.isInteger(c)||c<0)throw new Error("unary expects an integer count on top of the stack.");if(e.length<c)throw new Error(`Stack underflow for unary. Expected ${c} items, but only ${e.length} available.`);const u=e.splice(e.length-c,c),f=[];for(const h of u){const g=[h];yield*s(p,g,o),f.push(...g)}e.push(...f)},description:"Executes the same program P on N separate values from the stack, returning N results. `... X1..XN [P] N -> ... R1..RN`",effect:"[... X1..XN [P] N] -> [... R1..RN]"},examples:[{code:"10 20 (succ) 2 unary",expected:[11,21]},{code:"10 20 30 (succ) 3 unary",expected:[11,21,31]},{code:"10 20 30 40 (succ) 4 unary",expected:[11,21,31,41]},{code:"1 0 (not) 2 unary",expected:[!1,!0]},{code:"1 2 3 () 0 unary",expected:[1,2,3]}]},unstack={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("unstack expects a list.");e.length=0,e.push(...[...o].reverse())},description:"The list becomes the new stack. The first element of the list is the top of the new stack.",effect:"[... [L]] -> [..]"},examples:[{code:"1 2 (10 20 30) unstack",expected:[30,20,10]}]},x={definition:{exec:function*(e,o,s){if(e.length<1)throw new Error("x expects a quotation on the stack.");const c=e[e.length-1];if(!Array.isArray(c))throw new Error("x expects a quotation on top of the stack.");const p=[...e];e.pop(),yield*s(c,e,o);const u=[...e];e.length=0,e.push(...p),e.push(...u)},description:"Executes the quotation on top of the stack without popping it. The quotation is applied to the stack below it, and the results are pushed on top.",effect:"[X [P]] -> [X [P] R]"},examples:[{code:"10 (1 +) x",expected:[10,[1,"+"],11]}]},quote={definition:{exec:function*(e,o,s,c){const p=e.pop();let u;if(typeof p=="symbol"){const m=Symbol.keyFor(p);if(!m)throw new Error("=>: assignment to a non-global symbol is not supported.");u=`:${m}`}else if(typeof p=="string"||typeof p=="number")u=String(p);else throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(p)}`);const f=e.pop();if((f==null?void 0:f.type)==="live-loop-def"){const m=[[f],"iterate"];c[u]={body:m,description:"User-defined live loop.",example:""};return}if(Array.isArray(f)&&f.length>0&&f[f.length-1]==="live"&&f.length>=2){const b=f[0],v=f[1];if(Array.isArray(b)&&typeof v=="number"){const E=[[{type:"live-loop-def",quotation:b,beatValue:v,sourceCode:f}],"iterate"];c[u]={body:E,description:"User-defined live loop.",example:""};return}}const g=[Array.isArray(f)?f:[f],"iterate"];c[u]={body:g,description:"User-defined function.",example:""}},description:"Defines a new executable word from a quotation. `P N =>` is shorthand for `((P) iterate) N =`.",effect:"[... P N] -> [...]"},examples:[{replCode:["(1 1 +) foo =>","foo"],expected:[2]},{replCode:["10 bar =>","bar"],expected:[10]},{replCode:["(1 1) baz =>","baz"],expected:[1,1]},{replCode:["(1 1) data =","data i"],expected:[1,1]},{replCode:["(0 (succ) yield) counter =>","counter counter counter"],expected:[1,2,3]}]},advancedStack={definitions:{appendTo,ary,construct,infra,nullary,popstackto,popto,unary,unstack,x,quote}},swons={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s))throw new Error("swons expects a list");e.push([o,...s])},description:"Constructs a new list by prepending an element to a list. Expects list, then element on the stack. Equivalent to `swap cons`.",effect:"[L E] -> [L']"},examples:[{code:"(2 3 4) 1 swons",expected:[[1,2,3,4]]},{code:"() 1 swons",expected:[[1]]}]},enconcat={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(!Array.isArray(c)||!Array.isArray(s))throw new Error("enconcat expects two lists");e.push([...c,o,...s])},description:"Concatenates two sequences with an element inserted between them. `S T X -> U`",effect:"[L1 L2 E] -> [L3]"},examples:[{code:"(1 2) (3 4) 0 enconcat",expected:[[1,2,0,3,4]]},{code:'("a") ("b") "-" enconcat',expected:[["a","-","b"]]}]},unswons={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("unswons expects a list.");const[s,...c]=o;e.push(c,s)},description:"The reverse of `uncons`. Deconstructs a list, pushing the rest of the list and then its first element.",effect:"[L] -> [R E]"},examples:[{code:"(10 20 30) unswons",expected:[[20,30],10]},{code:"(1) unswons",expected:[[],1]}]},leaf={definition:{exec:function*(e){const o=e.pop();e.push(!Array.isArray(o))},description:"Tests whether a value is a leaf (i.e., not a list).",effect:"[A] -> [bool]"},examples:[{code:"42 leaf",expected:[!0]},{code:'"hello" leaf',expected:[!0]},{code:"() leaf",expected:[!1]},{code:"(1 2) leaf",expected:[!1]}]},fold={definition:{exec:function*(e,o,s){const c=e.pop();let p=e.pop();const u=e.pop();if(!Array.isArray(u))throw new Error("fold expects a list.");for(const f of u){const h=[p,f];yield*s(c,h,o),p=h.pop()}e.push(p)},description:"Starting with an initial value, sequentially applies a program to each member of a list to produce a final value. `A V0 [P] -> V`",effect:"[L V [P]] -> [R]"},examples:[{code:"(1 2 3 4) 0 (+) fold",expected:[10]},{code:"(2 3 4) 1 (*) fold",expected:[24]},{code:"() 100 (+) fold",expected:[100]}]},split={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(p))throw new Error("split expects a list.");const u=[],f=[];for(const h of p){const g=[h];yield*s(c,g,o),g.pop()?u.push(h):f.push(h)}e.push(u,f)},description:"Uses a predicate program to split a list into two lists: one for which the predicate was true, and one for which it was false. `A [B] -> A1 A2`",effect:"[L [P]] -> [L_true L_false]"},examples:[{code:"(1 2 3 4 5) (2 % 0 ==) split",expected:[[2,4],[1,3,5]]},{code:"(1 2 3) (10 >) split",expected:[[],[1,2,3]]}]},some={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(p))throw new Error("some expects a list.");for(const u of p){const f=[u];if(yield*s(c,f,o),f.pop()){e.push(!0);return}}e.push(!1)},description:"Applies a predicate to each member of a list, returning true if the predicate returns true for any member.",effect:"[L [P]] -> [bool]"},examples:[{code:"(1 2 3 4) (3 >) some",expected:[!0]},{code:"(1 2 3 4) (5 >) some",expected:[!1]},{code:"() (true) some",expected:[!1]}]},all={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(p))throw new Error("all expects a list.");for(const u of p){const f=[u];if(yield*s(c,f,o),!f.pop()){e.push(!1);return}}e.push(!0)},description:"Applies a predicate to each member of a list, returning true only if the predicate returns true for all members.",effect:"[L [P]] -> [bool]"},examples:[{code:"(2 4 6) (2 % 0 ==) all",expected:[!0]},{code:"(2 4 7) (2 % 0 ==) all",expected:[!1]},{code:"() (false) all",expected:[!0]}]},generatePowerlist=e=>{const o=e;if(o.length===0)return typeof e=="string"?[""]:[[]];const s=o[0],c=o.slice(1),p=generatePowerlist(c);return[...p.map(f=>typeof e=="string"?s+f:[s,...f]),...p]},powerlist={definition:{exec:function*(e){const o=e.pop();if(Array.isArray(o)||typeof o=="string")e.push(generatePowerlist(o));else throw new Error("powerlist expects a list or string.")},description:"For an aggregate of size N, produces a list of all 2^N subaggregates (sublists or subsequences of characters).",effect:"[A] -> [[A1, A2, ...]]"},examples:[{code:"(1 2) powerlist",assert:e=>{const o=e[0],s=[[1,2],[1],[2],[]];return o.length===s.length&&s.every(c=>o.some(p=>deepEqual(c,p)))},expectedDescription:"A list containing [[1,2], [1], [2], []] (order may vary)"},{code:'"ab" powerlist',assert:e=>{const o=e[0].sort(),s=["ab","a","b",""].sort();return deepEqual(o,s)},expectedDescription:'A list containing ["ab", "a", "b", ""] (order may vary)'},{code:"() powerlist",expected:[[[]]]},{code:'"" powerlist',expected:[[""]]},{code:"(1 1) powerlist",assert:e=>{const o=e[0],s=[[1,1],[1],[1],[]];return o.length===s.length&&s.every(c=>o.some(p=>deepEqual(c,p)))},expectedDescription:"A list containing [[1,1], [1], [1], []] (order may vary)"},{code:"(1 2) powerlist (size) map",assert:e=>{const o=e[0].sort((c,p)=>c-p);return deepEqual(o,[0,1,1,2])},expectedDescription:"A list of the sizes of each sublist: [0, 1, 1, 2] (order may vary)"}]},swoncat={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(o.concat(s))},description:"Concatenates two sequences (lists or strings) after swapping them. Equivalent to `swap concat`.",effect:"[S T] -> [U]"},examples:[{code:"(1 2) (3 4) swoncat",expected:[[3,4,1,2]]},{code:'"world" "hello" swoncat',expected:["helloworld"]},{code:"() (1) swoncat",expected:[[1]]},{code:"(1) () swoncat",expected:[[1]]},{code:'"a" "b" swoncat',expected:["ba"]}]},functional={name:"Functional & Aggregate Operations",description:"Higher-order functions for list processing and advanced aggregate manipulation.",definitions:{swons,swoncat,enconcat,unswons,leaf,fold,split,some,all,powerlist}},ucase={definition:{exec:function*(e){e.push(String(e.pop()).toUpperCase())},description:"Converts a string to uppercase.",effect:"[S] -> [S']"},examples:[{code:'"hello" ucase',expected:["HELLO"]},{code:'"Hello World" ucase',expected:["HELLO WORLD"]},{code:'"" ucase',expected:[""]}]},locase={definition:{exec:function*(e){e.push(String(e.pop()).toLowerCase())},description:"Converts a string to lowercase.",effect:"[S] -> [S']"},examples:[{code:'"HELLO" locase',expected:["hello"]},{code:'"Hello World" locase',expected:["hello world"]},{code:'"" locase',expected:[""]}]},trim={definition:{exec:function*(e){e.push(String(e.pop()).trim())},description:"Removes whitespace from both ends of a string.",effect:"[S] -> [S']"},examples:[{code:'"  hello  " trim',expected:["hello"]},{code:'"  hello world  " trim',expected:["hello world"]},{code:`" 
	  " trim`,expected:[""]}]},slice={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push(c.slice(s,o))},description:"Extracts a section of a string and returns it as a new string. `S Start End -> S`",effect:"[S I_start I_end] -> [S']"},examples:[{code:'"hello world" 0 5 slice',expected:["hello"]},{code:'"hello world" 6 11 slice',expected:["world"]},{code:'"abc" 1 1 slice',expected:[""]}]},splitstr={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.split(o))},description:"Splits a string into a list of substrings. `S Separator -> [S1 S2 ...]`",effect:"[S Separator] -> [L]"},examples:[{code:'"a,b,c" "," splitstr',expected:[["a","b","c"]]},{code:'"hello" "" splitstr',expected:[["h","e","l","l","o"]]},{code:'"a b" " " splitstr',expected:[["a","b"]]}]},starts={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.startsWith(o))},description:"Checks if a string starts with the characters of a specified string. `S Prefix -> B`",effect:"[S Prefix] -> [bool]"},examples:[{code:'"hello" "he" starts',expected:[!0]},{code:'"hello world" "hello" starts',expected:[!0]},{code:'"hello world" "world" starts',expected:[!1]}]},ends={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push(s.endsWith(o))},description:"Checks if a string ends with the characters of a specified string. `S Suffix -> B`",effect:"[S Suffix] -> [bool]"},examples:[{code:'"hello" "lo" ends',expected:[!0]},{code:'"hello world" "world" ends',expected:[!0]},{code:'"hello world" "hello" ends',expected:[!1]}]},replace={definition:{exec:function*(e){const o=String(e.pop()),s=String(e.pop()),c=String(e.pop()),p=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e.push(c.replace(new RegExp(p,"g"),o))},description:"Replaces all occurrences of a search string with a replacement string. `S Search Replace -> S`",effect:"[S Search Replace] -> [S']"},examples:[{code:'"ha ha ha" "a" "o" replace',expected:["ho ho ho"]},{code:'"banana" "na" "no" replace',expected:["banono"]},{code:'"test" "x" "y" replace',expected:["test"]}]},jsString={definitions:{ucase,locase,trim,slice,splitstr,starts,ends,replace}},stringOp={definition:{exec:function*(e){const o=e.pop();typeof o=="string"?e.push(o):e.push(String(yieldFormatter(o)).replace(/^"(.*)"$/,"$1").replace(/^\((.*)\)$/,"$1"))},description:"Converts the top value on the stack to its string representation.",effect:"[A] -> [S]"},examples:[{code:"123 string",expected:["123"]},{code:"true string",expected:["true"]},{code:"(1 2 3) string",expected:["1 2 3"]},{code:"(1 2 2) set string",expected:["1 2"]},{code:'"abc" string',expected:["abc"]}]},toNumber={definition:{exec:function*(e){const o=e.pop(),s=parseFloat(o);e.push(isNaN(s)?0:s)},description:"Parses a string into a number. Returns 0 if the string cannot be parsed.",effect:"[S] -> [N]"},examples:[{code:'"123.45" toNumber',expected:[123.45]},{code:'"-10" toNumber',expected:[-10]},{code:'"hello" toNumber',expected:[0]},{code:"true toNumber",expected:[0]},{code:"123 toNumber",expected:[123]}]},toBool={definition:{exec:function*(e){e.push(!!e.pop())},description:"Converts the top value on the stack to its boolean equivalent (using standard JavaScript truthiness).",effect:"[A] -> [B]"},examples:[{code:"1 toBool",expected:[!0]},{code:"0 toBool",expected:[!1]},{code:'"" toBool',expected:[!1]},{code:'"hello" toBool',expected:[!0]},{code:"[] toBool",expected:[!0]}]},regtest={definition:{exec:function*(e){const o=e.pop(),s=e.pop();try{e.push(new RegExp(o).test(s))}catch{throw new Error(`Invalid RegExp pattern: ${o}`)}},description:"Tests if a string matches a regular expression. `S Pattern -> B`",effect:"[S Pattern] -> [bool]"},examples:[{code:'"hello" "^he" regtest',expected:[!0]},{code:'"hello" "o$" regtest',expected:[!0]},{code:'"banana" "na" regtest',expected:[!0]},{code:'"banana" "^na" regtest',expected:[!1]}]},regsub={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();try{e.push(c.replace(new RegExp(s),o))}catch{throw new Error(`Invalid RegExp pattern: ${s}`)}},description:"Replaces the first occurrence of a regex pattern in a string. `S Pattern Replacement -> S`",effect:"[S Pattern Replace] -> [S']"},examples:[{code:'"banana" "a" "o" regsub',expected:["bonana"]},{code:'"banana" "an" "o" regsub',expected:["boana"]},{code:'"hello world" "l" "X" regsub',expected:["heXlo world"]}]},regsubg={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();try{e.push(c.replace(new RegExp(s,"g"),o))}catch{throw new Error(`Invalid RegExp pattern: ${s}`)}},description:"Replaces all occurrences of a regex pattern in a string (global substitute). `S Pattern Replacement -> S`",effect:"[S Pattern Replace] -> [S']"},examples:[{code:'"banana" "a" "o" regsubg',expected:["bonono"]},{code:'"banana" "an" "o" regsubg',expected:["booa"]},{code:'"hello world" "l" "X" regsubg',expected:["heXXo worXd"]}]},advancedTypes={definitions:{string:stringOp,toNumber,toBool,regtest,regsub,regsubg}},cr={definition:{exec:function*(e,o){o.onOutput?o.onOutput(`
`):console.log(`
`)},description:"Outputs a newline to the REPL.",effect:"[] -> []"},examples:[{code:"cr",expected:[]}]},print={definition:{exec:function*(e,o){const s=String(e.pop());o.onOutput?o.onOutput(s):console.log(s)},description:"Outputs the top of the stack to the REPL.",effect:"[S] -> []"},examples:[{code:'"Hello" print',expected:[]}]},getUserDictionary=(e,o)=>{const s={};for(const c in e)o.has(c)||(s[c]=e[c]);return s},save={definition:{exec:function*(e,o,s,c){const p=e.pop();if(typeof p!="string"||!p)throw new Error("'save' expects a non-empty string name on the stack.");try{const u={stack:e,userDictionary:getUserDictionary(c,o.builtInKeys)},h=JSON.stringify(u,(g,m)=>{if(typeof m=="symbol"){const b=Symbol.keyFor(m);return b?{__type:"Symbol",key:b}:void 0}return m});localStorage.setItem(p,h),o.onOutput&&o.onOutput(`State saved to '${p}'.`)}catch(u){throw new Error(`Failed to save state to '${p}': ${u.message}`)}},description:"Saves the current stack and user-defined dictionary to localStorage under the given name.",effect:"[... S_name] -> [...]"},examples:[{code:["1 2 3","(dup *) sq =>",'"test-save" save'],assert:e=>{const o=localStorage.getItem("test-save");if(!o)return!1;const s=JSON.parse(o),c=s.userDictionary.sq.body;return s.stack.length===3&&Array.isArray(c)&&c[1]==="iterate"},expected:[1,2,3]}]},load={definition:{exec:function*(e,o,s,c){const p=e.pop();if(typeof p!="string"||!p)throw new Error("'load' expects a non-empty string name on the stack.");try{const u=localStorage.getItem(p);if(!u)throw new Error(`No saved state found for '${p}'.`);const h=JSON.parse(u,(g,m)=>m&&typeof m=="object"&&m.__type==="Symbol"&&m.key?Symbol.for(m.key):m);if(!h||!h.stack||!h.userDictionary)throw new Error(`Invalid data format for saved state '${p}'.`);for(const g in c)o.builtInKeys.has(g)||delete c[g];Object.assign(c,h.userDictionary),e.length=0,e.push(...h.stack),o.onOutput&&o.onOutput(`State loaded from '${p}'.`)}catch(u){throw new Error(`Failed to load state from '${p}': ${u.message}`)}},description:"Loads a previously saved state (stack and dictionary) from localStorage, replacing the current state.",effect:"[S_name] -> [...]"},examples:[{code:['1 2 3 (dup *) sq => "test-load" save',"clearall",'"test-load" load',"5 sq"],expected:[1,2,3,25]}]},ls={definition:{exec:function*(e,o){try{const s=Object.keys(localStorage);let c;s.length===0?c="No saved states.":c=`Saved states:
`+s.map(p=>`- ${p}`).join(`
`),o.onOutput&&o.onOutput(c)}catch(s){throw new Error(`Failed to list saved states: ${s.message}`)}},description:"Lists all saved REPL states from localStorage.",effect:"[] -> []"},examples:[{code:['"test-ls" save',"ls"],assert:e=>e.length===0,expectedDescription:"Stack should be empty."}]},formatDictionary=e=>{const o=Object.keys(e);return o.length===0?"No user-defined words found.":`User-defined words:
`+o.map(s=>{var u;const c=(u=e[s])==null?void 0:u.body;return`* ${Array.isArray(c)?`( ${c.map(yieldFormatter).join(" ")} )`:yieldFormatter(c)} ${s} = `}).join(`
`)},lurk={definition:{exec:function*(e,o,s,c){const p=e.pop();if(typeof p!="string"||!p)throw new Error(`'lurk' expects a non-empty string name (e.g., "this") on the stack.`);let u;if(p==="this"){const f={};for(const h in c)o.builtInKeys.has(h)||(f[h]=c[h]);u=formatDictionary(f)}else try{const f=localStorage.getItem(p);if(!f)throw new Error(`No saved state found for '${p}'.`);const g=JSON.parse(f,(m,b)=>b&&typeof b=="object"&&b.__type==="Symbol"&&b.key?Symbol.for(b.key):b);if(!g||!g.userDictionary)throw new Error(`Invalid data format for saved state '${p}'.`);u=formatDictionary(g.userDictionary)}catch(f){throw new Error(`Failed to lurk into '${p}': ${f.message}`)}o.onOutput&&o.onOutput(u)},description:'Lists user-defined words. With "this", lists words in the current session. With another name, lists words from a saved session.',effect:"[S_name] -> []"},examples:[{code:["(dup *) sq =>",'"this" lurk'],assert:e=>e.length===0,expectedDescription:"Stack should be empty."},{code:['1 2 3 (dup *) sq => "test-lurk" save',"clearall",'"test-lurk" lurk'],assert:e=>e.length===0,expectedDescription:"Stack should be empty."}]},repl={name:"REPL I/O",description:"Operators for interacting with the REPL environment.",definitions:{cr,print,save,load,ls,lurk}},undo={definition:{exec:function*(e,o,s,c){if(!o.historyManager)return;const p=o.historyManager.undo();if(p){e.length=0,e.push(...p.stack);for(const u in c)"body"in c[u]&&delete c[u];Object.assign(c,p.userDictionary)}},description:"Reverts the stack and all user-defined words to their state before the last operation. Can be called multiple times.",effect:"[...] -> [...]"},examples:[{replCode:["1 2 +","dup","undo"],assert:e=>e.length===1&&e[0]===3,expectedDescription:"[3]"},{replCode:["100","1 2 +","undo"],expected:[100]}]},redo={definition:{exec:function*(e,o,s,c){if(!o.historyManager)return;const p=o.historyManager.redo();if(p){e.length=0,e.push(...p.stack);for(const u in c)"body"in c[u]&&delete c[u];Object.assign(c,p.userDictionary)}},description:"Re-applies an operation that was undone. Can only be used after `undo`.",effect:"[...] -> [...]"},examples:[{replCode:["1 2 +","undo","redo"],expected:[3]},{replCode:["1 2 +","undo","3 4 +","redo"],expected:[7]}]},clearhistory={definition:{exec:function*(e,o,s,c){if(o.historyManager){const p=o.historyManager.createSnapshot(e,c);o.historyManager.clear(),o.historyManager.add(p)}},description:"Clears the undo/redo history. The current state becomes the new initial state.",effect:"[] -> []"},examples:[{code:"1 2 + clearhistory",expected:[3]},{code:"1 2 clearhistory",expected:[1,2]}]},again={definition:{exec:function*(e,o,s){const{commandHistory:c,parse:p}=o;if(!c||c.length<2||!p)return;let u=null;for(let f=c.length-2;f>=0;f--)if(c[f].trim().toLowerCase()!=="again"){u=c[f];break}if(u){const f=p(u);yield*s(f,e,o)}},description:'Re-executes the last command from the history that was not "again". NOTE: Works only in REPL and line by line execution.',effect:"[...] -> [...]"},examples:[{replCode:["1 2 +","again"],expected:[3,3]},{replCode:["5 dup *","again"],expected:[25,25]},{replCode:["1","again","again"],expected:[1,1,1]},{replCode:["1 1 + again"],expected:[2]},{replCode:["10 20 +","1 again"],expected:[30,1,30]},{replCode:["1 again"],expected:[1]},{replCode:["(1) mylist =","1 mylist <-","again","mylist"],expected:[[1,1,1]]}]},history={name:"History Management",description:"Operators for managing the REPL session history (undo/redo).",definitions:{undo,redo,clearhistory,again}},prelude=`
const { PI, sin, cos, random, abs, min, max, pow, sign, floor } = Math;

// --- DSP Library Functions ---
// Each function takes its own state object 's', the processor instance, and its arguments.

const dsp = {
    sine: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        return sin(s.phase * 2 * PI);
    },
    saw: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase * 2 - 1;
    },
    triangle: (s, processor, freq) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return 4 * abs(s.phase - 0.5) - 1;
    },
    pulse: (s, processor, freq, duty = 0.5) => {
        s.phase = (s.phase || 0) + freq / sampleRate;
        s.phase %= 1;
        return s.phase < duty ? 1 : -1;
    },
    noise: (s, processor) => random() * 2 - 1,
    impulse: (s, processor, freq) => {
        s.phase = (s.phase || 1) + freq / sampleRate;
        let v = s.phase >= 1 ? 1 : 0;
        s.phase %= 1;
        return v;
    },
    oneshot: (s, processor) => {
        if (s.triggered) return 0;
        s.triggered = true;
        return 1;
    },
    gate: (s, processor, duration) => {
        if (s.counter === undefined) {
            s.counter = 0;
            s.durationSamples = Math.floor(duration * sampleRate);
        }
        
        if (s.counter < s.durationSamples) {
            s.counter++;
            return 1.0;
        }
        
        return 0.0;
    },
    gate_env: (s, processor, a, h, r) => {
        if (s.phase === undefined) {
            s.phase = 0; // 0: start, 1: attack, 2: hold, 3: release, 4: off
            s.val = 0.0;
            s.counter = 0;
        }

        const aSamples = Math.max(1, a * sampleRate);
        const hSamples = Math.max(1, h * sampleRate);
        const rSamples = Math.max(1, r * sampleRate);

        switch (s.phase) {
            case 0: // Start/trigger
                s.phase = 1;
                s.val = 0.0;
                s.counter = 0;
                // fallthrough to attack
            case 1: // Attack
                s.val += 1.0 / aSamples;
                if (s.val >= 1.0) {
                    s.val = 1.0;
                    s.phase = 2; // switch to hold
                    s.counter = 0;
                }
                break;
            case 2: // Hold
                s.val = 1.0;
                s.counter++;
                if (s.counter >= hSamples) {
                    s.phase = 3; // switch to release
                    s.counter = 0;
                }
                break;
            case 3: // Release
                s.val -= 1.0 / rSamples;
                if (s.val <= 0.0) {
                    s.val = 0.0;
                    s.phase = 4; // switch to off
                }
                break;
            case 4: // Off
            default:
                s.val = 0.0;
                break;
        }
        return s.val;
    },
    lpf: (s, processor, input, cutoff, res) => {
        s.c = pow(0.5, (1 - min(max(cutoff, 0), 1)) / 0.125);
        s.r = pow(0.5, (min(max(res, 0), 1) + 0.125) / 0.125);
        s.mrc = 1 - s.r * s.c;
        s.s0 = (s.s0 || 0) * s.mrc - (s.s1 || 0) * s.c + input * s.c;
        s.s1 = (s.s1 || 0) * s.mrc + s.s0 * s.c;
        return s.s1;
    },
    hpf: (s, processor, input, cutoff, res) => {
        s.lpf_state = s.lpf_state || {};
        return input - dsp.lpf(s.lpf_state, processor, input, cutoff, res);
    },
    adsr: (s, processor, gate, a, d, sus, r) => {
        const aSamples = Math.max(1, a * sampleRate);
        const dSamples = Math.max(1, d * sampleRate);
        const rSamples = Math.max(1, r * sampleRate);

        s.val = s.val || 0;
        
        if (gate > 0 && (s.gate === undefined || s.gate <= 0)) {
            s.mode = 1; // attack
        } else if (gate <= 0 && s.gate > 0) {
            s.mode = 4; // release
            s.releaseStartVal = s.val;
        }
        s.gate = gate;

        switch (s.mode) {
            case 1: // Attack
                s.val += 1.0 / aSamples;
                if (s.val >= 1.0) { s.val = 1.0; s.mode = 2; }
                break;
            case 2: // Decay
                if (s.val > sus) { s.val -= (1.0 - sus) / dSamples; }
                if (s.val <= sus) { s.val = sus; s.mode = 3; }
                break;
            case 3: // Sustain
                s.val = sus;
                break;
            case 4: // Release
                s.val -= (s.releaseStartVal || 0) / rSamples;
                if (s.val <= 0) { s.val = 0; s.mode = 0; }
                break;
            default: // Off
                s.val = 0;
        }
        return Math.max(0, s.val);
    },
    ad: (s, processor, gate, a, d) => {
        const aSamples = Math.max(1, a * sampleRate);
        const dSamples = Math.max(1, d * sampleRate);

        s.val = s.val || 0;
        s.mode = s.mode || 0; // 0: off, 1: attack, 2: decay

        // A rising edge on the gate triggers the envelope
        if (gate > 0 && (s.lastGate === undefined || s.lastGate <= 0)) {
            s.mode = 1; // Go to attack phase
            s.val = 0;  // Reset from the bottom for a clean percussive hit
        }
        s.lastGate = gate;

        if (s.mode === 1) { // In attack phase
            s.val += 1.0 / aSamples;
            if (s.val >= 1.0) {
                s.val = 1.0;
                s.mode = 2; // Switch to decay
            }
        } else if (s.mode === 2) { // In decay phase
            s.val -= 1.0 / dSamples;
            if (s.val <= 0) {
                s.val = 0;
                s.mode = 0; // Switch to off
            }
        }
        
        return s.val;
    },
    arp: (s, processor, clock, base_freq, mul_x, mul_y) => {
        // Detect a rising edge on the clock signal to advance the step.
        if ((s.lastClock === undefined || s.lastClock <= 0) && clock > 0) {
            s.step = (s.step === undefined) ? 0 : (s.step + 1) % 3;
        }
        s.lastClock = clock;

        const currentStep = s.step === undefined ? 0 : s.step;

        if (currentStep === 1) {
            return base_freq * mul_x;
        } else if (currentStep === 2) {
            return base_freq * mul_y;
        }
        // Default to step 0
        return base_freq;
    },
    bytebeat: (s, processor, code, frequency) => {
        // Init state
        s.t = s.t ?? 0;
        s.lastT = s.lastT ?? -1;
        s.data = s.data ?? 0;

        if (s.code !== code) {
            try {
                s.fn = new Function('t', 'mousex', 'mousey', 'mousedx', 'mousedy', 'return ' + code);
                s.code = code;
            } catch (e) {
                console.error('Bytebeat compile error:', e);
                s.fn = null;
            }
        }
        
        const tDelta = frequency / sampleRate;
        s.t += tDelta;
        const t = floor(s.t);

        if (t !== s.lastT) {
            if (s.fn) {
                try {
                    const result = s.fn(t, processor.mouse.x, processor.mouse.y, processor.moused.x, processor.moused.y);
                    s.data = ((result | 0) & 255) / 127.5 - 1;
                } catch(e) {
                    console.error('Bytebeat runtime error in code "' + s.code + '":', e.message);
                    s.data = 0;
                }
            } else {
                s.data = 0;
            }
            s.lastT = t;
        }

        return s.data;
    },
    floatbeat: (s, processor, code, frequency) => {
        s.t = s.t ?? 0;

        if (s.code !== code) {
            try {
                // The JS function should expect continuous time t
                s.fn = new Function('t', 'mousex', 'mousey', 'mousedx', 'mousedy', 'return ' + code);
                s.code = code;
            } catch (e) {
                console.error('Floatbeat compile error:', e);
                s.fn = null;
            }
        }
        
        // The 'frequency' parameter acts as a speed multiplier for time.
        const tDelta = frequency / sampleRate;
        s.t += tDelta;

        if (s.fn) {
            try {
                // Pass the continuous time s.t to the function.
                const result = s.fn(s.t, processor.mouse.x, processor.mouse.y, processor.moused.x, processor.moused.y);
                return min(1, max(-1, result)); // clamp the output
            } catch(e) {
                console.error('Floatbeat runtime error in code "' + s.code + '":', e.message);
                return 0;
            }
        }
        return 0;
    },
    delay: (s, processor, input, time, feedback) => {
        if (!s.buffer) s.buffer = new Float32Array(sampleRate * 5); // 5 sec max
        s.writeIdx = (s.writeIdx || 0);
        let readIdx = s.writeIdx - Math.floor(time * sampleRate);
        if (readIdx < 0) readIdx += s.buffer.length;
        const out = s.buffer[readIdx];
        s.buffer[s.writeIdx] = input + out * feedback;
        s.writeIdx = (s.writeIdx + 1) % s.buffer.length;
        return out;
    },
    distort: (s, processor, input, amount) => {
        const gain = 1 + amount * 4;
        return Math.tanh(input * gain);
    },
    pan: (s, processor, input, pos) => {
        const angle = (pos * 0.5 + 0.5) * (PI / 2);
        return [input * cos(angle), input * sin(angle)];
    },
    note: (s, processor, note) => (2 ** ((note - 69) / 12) * 440),
    seq: (s, processor, clock, ...values) => {
        // This handles the case where the transpiler passes a list of values as a single array argument.
        let sequence = values;
        if (sequence.length === 1 && Array.isArray(sequence[0])) {
            sequence = sequence[0];
        }

        // Detect a rising edge on the clock signal.
        if ((s.lastClock === undefined || s.lastClock <= 0) && clock > 0) {
            s.step = (s.step === undefined) ? 0 : s.step + 1;
        }
        s.lastClock = clock;
        const currentStep = s.step === undefined ? -1 : s.step;
        // Return 0 if we haven't been triggered yet, otherwise the value.
        if (currentStep < 0 || sequence.length === 0) {
            return 0;
        }
        return sequence[currentStep % sequence.length];
    },
    'mix': (s, processor, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]+b[0], a[1]+b[1]];
        if (Array.isArray(a)) return [a[0]+b, a[1]+b];
        if (Array.isArray(b)) return [a+b[0], a+b[1]];
        return a + b;
    },
    'mul': (s, processor, a, b) => {
        if (Array.isArray(a) && Array.isArray(b)) return [a[0]*b[0], a[1]*b[1]];
        if (Array.isArray(a)) return [a[0]*b, a[1]*b];
        if (Array.isArray(b)) return [a*b[0], a*b[1]];
        return a * b;
    },
    fm_simple: (s, processor, carrier_freq, mod_freq, mod_index, carrier_wave, mod_wave) => {
        s.modState = s.modState || {};
        s.carrierState = s.carrierState || {};

        const modOscFn = dsp[mod_wave] || dsp.sine;
        const carrierOscFn = dsp[carrier_wave] || dsp.sine;

        const modulator_output = modOscFn(s.modState, processor, mod_freq) * mod_index;
        const carrier_input_freq = carrier_freq + modulator_output;
        const final_output = carrierOscFn(s.carrierState, processor, carrier_input_freq);
        
        return final_output;
    },
    fm_synth: (s, processor, gate, baseFreq, velocity, opDefs, algorithmId) => {
        s.opStates = s.opStates || Array.from({ length: 6 }, () => ({}));
        
        // On a rising edge of the gate signal, reset the phase of all oscillators
        // to prevent clicking artifacts when re-triggering notes.
        if (gate > 0 && (s.lastGate === undefined || s.lastGate <= 0)) {
            s.opStates.forEach(opState => {
                opState.phase = 0;
            });
        }
        s.lastGate = gate;
        
        const getOpOutput = (opNum, modulatorInput = 0) => {
            const opDef = opDefs[opNum - 1];
            const state = s.opStates[opNum - 1];
            if (!opDef || opDef.length < 7) return 0;

            const [level, freqSpec, a, d, sus, r, opType] = opDef;
            const oscFn = dsp[opType] || dsp.sine;

            let freq;
            if (Array.isArray(freqSpec) && freqSpec[0] === 'fixed' && typeof freqSpec[1] === 'number') {
                freq = freqSpec[1];
            } else if (typeof freqSpec === 'number') {
                freq = baseFreq * freqSpec;
            } else {
                freq = baseFreq;
            }

            const oscInputFreq = freq + modulatorInput;
            const oscVal = oscFn(state, processor, oscInputFreq);
            state.envState = state.envState || {};

            // Choose the correct envelope type. For percussive sounds (sustain=0),
            // a simpler AD envelope is more robust with fast triggers like 'impulse'.
            const envFn = (sus === 0.0) ? dsp.ad : dsp.adsr;
            const envVal = envFn(state.envState, processor, gate, a, d, sus, r);
            
            const outputLevel = (level / 99.0) * velocity;
            return oscVal * envVal * outputLevel;
        };
        
        let op1, op2, op3, op4, op5, op6;
        let finalOutput = 0.0;
        
        switch (algorithmId) {
            case 1: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = op1 + op4; break;
            case 2: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); finalOutput = getOpOutput(1, op2 + op4); break;
            case 3: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5 + op3); finalOutput = op1 + op4; break;
            case 4: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = getOpOutput(1, op2 + op5 + op4); break;
            case 5: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = op1 + op5 + op4; break;
            case 6: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4); finalOutput = op1 + op5 + op4; break;
            case 7: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op6 = getOpOutput(6); op5 = getOpOutput(5, op6); op4 = getOpOutput(4, op5); op1 = getOpOutput(1); finalOutput = op1 + op2 + op4; break;
            case 8: op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); finalOutput = getOpOutput(6, op1+op2+op3+op4+op5); break;
            case 9: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op1 = getOpOutput(1, op2); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op6 = getOpOutput(6); finalOutput = op1 + op4 + op6; break;
            case 10: op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op1 = getOpOutput(1); op6 = getOpOutput(6, op1); finalOutput = op2 + op4 + op6; break;
            case 11: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op3 = getOpOutput(3); op2 = getOpOutput(2, op3); op5 = getOpOutput(5); op4 = getOpOutput(4, op5); op1 = getOpOutput(1);
                op6 = getOpOutput(6, op1+op2+op4+lastOp6Out);
                s.opStates[5].lastOutput = op6; finalOutput = op6; break;
            }
            case 12: case 21: op2=getOpOutput(2); op1=getOpOutput(1, op2); op4=getOpOutput(4); op3=getOpOutput(3, op4); op6=getOpOutput(6); op5=getOpOutput(5, op6); finalOutput = op1 + op3 + op5; break;
            case 13: op6=getOpOutput(6); op5=getOpOutput(5,op6); op4=getOpOutput(4); op2=getOpOutput(2); const mod_13 = op5+op4+op2; op1=getOpOutput(1, mod_13); op3=getOpOutput(3, mod_13); finalOutput = op1 + op3; break;
            case 14: op2=getOpOutput(2); op3=getOpOutput(3); op1=getOpOutput(1, op2+op3); op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4, op5+op6); finalOutput = op1 + op4; break;
            case 15: op2=getOpOutput(2); op1=getOpOutput(1,op2); op3=getOpOutput(3); op5=getOpOutput(5); op4=getOpOutput(4,op5); op6=getOpOutput(6); finalOutput = op1+op3+op4+op6; break;
            case 16: op3=getOpOutput(3); op2=getOpOutput(2,op3); op6=getOpOutput(6); op5=getOpOutput(5,op6); op4=getOpOutput(4,op5); op1=getOpOutput(1); finalOutput = op1+op2+op4; break;
            case 17: op3=getOpOutput(3); op2=getOpOutput(2,op3); op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4, op5+op6); op1=getOpOutput(1); finalOutput = op1+op2+op4; break;
            case 18: op2=getOpOutput(2); op1=getOpOutput(1,op2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op3+op4+op5+op6; break;
            case 19: op2=getOpOutput(2); op1=getOpOutput(1,op2); op4=getOpOutput(4); op3=getOpOutput(3,op4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op3+op5+op6; break;
            case 20: op2=getOpOutput(2); op3=getOpOutput(3); op1=getOpOutput(1,op2+op3); op5=getOpOutput(5); op4=getOpOutput(4,op5); op6=getOpOutput(6); finalOutput = op1+op4+op6; break;
            case 22: op3=getOpOutput(3); op2=getOpOutput(2,op3); op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op4=getOpOutput(4); finalOutput = op1+op2+op4+op5; break;
            case 23: op4=getOpOutput(4); op3=getOpOutput(3,op4); op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op2=getOpOutput(2); finalOutput = op1+op2+op3+op5; break;
            case 24: op5=getOpOutput(5); op6=getOpOutput(6); op4=getOpOutput(4,op5+op6); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); finalOutput = op1+op2+op3+op4; break;
            case 25: op6=getOpOutput(6); op5=getOpOutput(5,op6); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); finalOutput = op1+op2+op3+op4+op5; break;
            case 26: op3=getOpOutput(3); op2=getOpOutput(2,op3); op1=getOpOutput(1); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op4+op5+op6; break;
            case 27: op4=getOpOutput(4); op3=getOpOutput(3,op4); op1=getOpOutput(1); op2=getOpOutput(2); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op3+op5+op6; break;
            case 28: op5=getOpOutput(5); op4=getOpOutput(4,op5); op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op6=getOpOutput(6); finalOutput = op1+op2+op3+op4+op6; break;
            case 29: {
                 const lastOp6Out = s.opStates[5].lastOutput || 0;
                 op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                 op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5);
                 finalOutput = op1+op2+op3+op4+op5+op6; break;
            }
            case 30: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                op5 = getOpOutput(5, op6);
                op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4);
                finalOutput = op1+op2+op3+op4+op5; break;
            }
            case 31: {
                const lastOp6Out = s.opStates[5].lastOutput || 0;
                op6 = getOpOutput(6, lastOp6Out); s.opStates[5].lastOutput = op6;
                op5 = getOpOutput(5, op6);
                op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4);
                finalOutput = op1+op2+op3+op4+op5; break;
            }
            case 32: op1=getOpOutput(1); op2=getOpOutput(2); op3=getOpOutput(3); op4=getOpOutput(4); op5=getOpOutput(5); op6=getOpOutput(6); finalOutput = op1+op2+op3+op4+op5+op6; break;
            default: finalOutput = 0; break;
        }

        return finalOutput;
    },
};
dsp.tri = dsp.triangle;

class DspProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.voices = new Map(); // { id: { graph, params, state, startTime?, duration?, fading? } }
        this.port.onmessage = (e) => this.handleMessage(e.data);
        // FIX: Add tempo property to the processor for use in DSP functions.
        this.tempo = 120.0;
        this.moused = { x: 0, y: 0, down: false };
        this.mouse = { x: 0, y: 0 };
    }

    handleMessage(msg) {
        switch (msg.command) {
            case 'play':
                const voiceData = {
                    graph: msg.graph,
                    params: msg.params || {},
                    state: {} // For stateful nodes
                };
                if (msg.duration !== undefined && msg.duration > 0) {
                    voiceData.startTime = currentTime;
                    voiceData.duration = msg.duration;
                }
                this.voices.set(msg.id, voiceData);
                break;
            case 'update':
                if (this.voices.has(msg.id)) {
                    const voice = this.voices.get(msg.id);
                    voice.graph = msg.graph;
                    voice.params = msg.params || {};
                }
                break;
            case 'ctrl':
                if (this.voices.has(msg.id)) {
                    this.voices.get(msg.id).params[msg.param] = msg.value;
                }
                break;
            case 'stop':
                this.voices.delete(msg.id);
                break;
            case 'stopAll':
                this.voices.clear();
                break;
            case 'fadeOutAll':
                for (const [id, voice] of this.voices.entries()) {
                    if (!voice.fading) {
                        voice.fading = {
                            startTime: currentTime,
                            duration: 0.02, // 20ms fade out
                            startGain: 1.0,
                        };
                    }
                }
                break;
            // FIX: Handle 'setTempo' command to update the processor's tempo.
            case 'setTempo':
                this.tempo = msg.bpm;
                break;
            case 'mousedown':
                this.moused.x = msg.x;
                this.moused.y = msg.y;
                this.moused.down = msg.down;
                break;
            case 'mouse':
                this.mouse.x = msg.x;
                this.mouse.y = msg.y;
                break;
        }
    }

    // Recursively evaluates an audio graph node for the current sample
    evaluate(node, params, state, counters) {
        // Handle non-objects (numbers, etc.) and parameter lookups first.
        if (typeof node !== 'object' || node === null) return node;
        if (node.param) return params[node.param];

        // If it's an object but not an array, we can't process it.
        if (!Array.isArray(node)) return 0;
        
        // This is the key fix: distinguish between a DSP call and a literal data array.
        // A DSP call is an array where the first element is a string key for a function in the 'dsp' object.
        const op = node[0];
        if (typeof op !== 'string' || dsp[op] === undefined) {
            // If the first element isn't a string, or isn't a valid DSP function name,
            // then this whole array is treated as a literal data value (e.g., fm_synth op_defs).
            return node;
        }

        const dspFn = dsp[op];
        
        // Evaluate all arguments recursively.
        const evalArgs = node.slice(1).map(arg => this.evaluate(arg, params, state, counters));

        // Get or create state for this specific operator instance in the graph.
        const opCount = counters[op] = (counters[op] || 0) + 1;
        const stateKey = op + '_' + (opCount - 1);
        state[stateKey] = state[stateKey] || {};

        // Call the DSP function with its state, the processor context, and the evaluated arguments.
        return dspFn(state[stateKey], this, ...evalArgs);
    }

    process(inputs, outputs) {
        const outL = outputs[0][0];
        const outR = outputs[0][1];
        const FADE_OUT_SECONDS = 0.01; // 10ms fade out
        const voicesToDelete = new Set();

        for (let i = 0; i < outL.length; i++) {
            let totalL = 0;
            let totalR = 0;
            const sampleTime = currentTime + i / sampleRate;

            for (const [id, voice] of this.voices.entries()) {
                try {
                    let gain = 1.0;

                    if (voice.fading) {
                        const elapsedFade = sampleTime - voice.fading.startTime;
                        if (elapsedFade >= voice.fading.duration) {
                            voicesToDelete.add(id);
                            continue;
                        }
                        gain = voice.fading.startGain * (1.0 - (elapsedFade / voice.fading.duration));
                    } else if (voice.duration !== undefined) {
                        const elapsedTime = sampleTime - voice.startTime;
                        if (elapsedTime >= voice.duration) {
                            voicesToDelete.add(id);
                            continue; // Skip processing this voice for this sample
                        }
                        const remainingTime = voice.duration - elapsedTime;
                        if (remainingTime < FADE_OUT_SECONDS) {
                            gain = max(0.0, remainingTime / FADE_OUT_SECONDS);
                        }
                    }

                    const counters = {};
                    const result = this.evaluate(voice.graph, voice.params, voice.state, counters);
                    
                    if (Array.isArray(result)) {
                        totalL += (result[0] || 0) * gain;
                        totalR += (result[1] || 0) * gain;
                    } else {
                        totalL += (result || 0) * gain;
                        totalR += (result || 0) * gain;
                    }
                } catch (e) {
                    console.error('DSP Error:', e);
                    voicesToDelete.add(id); // Remove problematic voice
                }
            }
            
            outL[i] = totalL;
            outR[i] = totalR;
        }

        if (voicesToDelete.size > 0) {
            for (const id of voicesToDelete) {
                this.voices.delete(id);
            }
        }
        return true;
    }
}

registerProcessor('dsp-processor', DspProcessor);

class ClockProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.tickInterval = 128 / sampleRate; // ~2.9 ms at 44.1kHz
        this.nextTickTime = currentTime + this.tickInterval;
        this.running = false;

        this.port.onmessage = (e) => {
            if (e.data === "start") {
                this.running = true;
                this.nextTickTime = currentTime + this.tickInterval;
            } else if (e.data === "stop") {
                this.running = false;
            }
        };
    }

    process() {
        if (!this.running) return true;

        while (currentTime >= this.nextTickTime) {
            this.port.postMessage(this.nextTickTime);
            this.nextTickTime += this.tickInterval;
        }

        return true;
    }
}
registerProcessor("clock", ClockProcessor);
`,analyzeAndBuildTemplate=(e,o,s)=>{if(Array.isArray(e))for(let c=0;c<e.length;c++){const p=e[c];if(typeof p=="symbol"){const u=Symbol.keyFor(p);u&&(o.params.hasOwnProperty(u)||(o.params[u]=0),e[c]={param:u})}else Array.isArray(p)&&analyzeAndBuildTemplate(p,o)}};class AudioEngine{constructor(){this.context=null,this.workletNode=null,this.clockNode=null,this.isInitialized=!1,this.initPromise=null,this.voiceIdCounter=0,this.isMuted=!1,this.readyListeners=[],this.startTime=0,this.scheduledCallbacks=new Map,this.sourceVoices=new Map,this.readyPromise=new Promise(o=>{this.resolveReady=o})}static getInstance(){return AudioEngine.instance||(AudioEngine.instance=new AudioEngine),AudioEngine.instance}onReady(o){this.isInitialized?o():this.readyListeners.push(o)}offReady(o){this.readyListeners=this.readyListeners.filter(s=>s!==o)}isReady(){return this.isInitialized}setMuted(o){this.isMuted=o,o&&this.stopAll()}init(){return this.isInitialized?Promise.resolve():this.initPromise?this.readyPromise:(this.initPromise=(async()=>{if(typeof window>"u"){this.isInitialized=!0,this.resolveReady();return}try{this.context||(this.context=new AudioContext),this.context.state==="suspended"&&await this.context.resume();const o=new Blob([prelude],{type:"application/javascript"}),s=URL.createObjectURL(o);try{await this.context.audioWorklet.addModule(s)}catch(c){if(!c.message.includes("is already registered"))throw c}finally{URL.revokeObjectURL(s)}this.workletNode||(this.workletNode=new AudioWorkletNode(this.context,"dsp-processor",{outputChannelCount:[2]}),this.workletNode.connect(this.context.destination)),this.clockNode||(this.clockNode=new AudioWorkletNode(this.context,"clock"),this.clockNode.port.onmessage=c=>this.handleTick(c.data),this.clockNode.port.postMessage("start"))}catch(o){throw console.error("Error initializing AudioEngine:",o),this.initPromise=null,o}})(),this.readyPromise)}handleTick(o){if(this.isInitialized||(this.startTime=o,this.isInitialized=!0,this.resolveReady(),setTimeout(()=>{this.readyListeners.forEach(c=>c()),this.readyListeners=[]},0)),this.scheduledCallbacks.size===0)return;const s=[...this.scheduledCallbacks.keys()];for(const c of s){const p=this.scheduledCallbacks.get(c);p&&p.time<=o&&(this.scheduledCallbacks.delete(c),p.callback(o).catch(u=>{console.error(`Error in scheduled callback '${c}':`,u)}))}}getContextTime(){var o;return((o=this.context)==null?void 0:o.currentTime)??0}getStartTime(){return this.startTime}getElapsedTime(){return this.isInitialized?this.getContextTime()-this.startTime:0}schedule(o,s,c){this.isInitialized||this.init().catch(p=>console.error("Could not auto-initialize AudioEngine for scheduling.",p)),this.scheduledCallbacks.set(o,{time:s,callback:c})}cancel(o){this.scheduledCallbacks.delete(o)}play(o,s,c){if(this.isMuted||!this.isInitialized||!this.workletNode)return"";const p=deepClone(o),u={graph:p,params:{}};analyzeAndBuildTemplate(u.graph,u);const f=u.params;if(s&&this.sourceVoices.has(s)){const m=this.sourceVoices.get(s);return this.workletNode.port.postMessage({command:"update",id:m,graph:p,params:f}),m}const h=`voice_${this.voiceIdCounter++}`;s&&this.sourceVoices.set(s,h);const g={command:"play",id:h,graph:p,params:f};return c!==void 0&&(g.duration=c),this.workletNode.port.postMessage(g),h}ctrl(o,s,c){if(this.isMuted||!this.isInitialized||!this.workletNode)return;const p=this.sourceVoices.get(o);p?this.workletNode.port.postMessage({command:"ctrl",id:p,param:s,value:c}):console.warn(`No active voice found for patch named "${o}".`)}setMouse(o,s){!this.isInitialized||!this.workletNode||this.workletNode.port.postMessage({command:"mouse",x:o,y:s})}setMouseDown(o,s,c){!this.isInitialized||!this.workletNode||this.workletNode.port.postMessage({command:"mousedown",x:o,y:s,down:c})}setTempo(o){!this.isInitialized||!this.workletNode||this.workletNode.port.postMessage({command:"setTempo",bpm:o})}stop(o){if(this.isMuted)return[];if(!this.isInitialized||!this.workletNode)return[];const s=this.sourceVoices.get(o);return s?(this.workletNode.port.postMessage({command:"stop",id:s}),this.sourceVoices.delete(o),[s]):[]}stopAll(){if(this.scheduledCallbacks.clear(),this.workletNode){this.workletNode.port.postMessage({command:"stopAll"});const o=Array.from(this.sourceVoices.values());return this.sourceVoices.clear(),o}return[]}fadeOutAll(){if(this.workletNode){this.workletNode.port.postMessage({command:"fadeOutAll"});const o=Array.from(this.sourceVoices.values());return this.sourceVoices.clear(),o}return[]}}const audioEngine=AudioEngine.getInstance(),opArity={sine:1,saw:1,pulse:2,tri:1,noise:0,impulse:1,note:1,lpf:3,hpf:3,ad:3,adsr:5,delay:3,distort:2,pan:2,mix:2,mul:2,fm_simple:5,fm_synth:5,seq:2,oneshot:0,gate_env:3,gate:1,arp:4},specialOps=new Set(["bytebeat","floatbeat"]),transpileAudioQuotation=e=>{const o=[],s=e;for(const c of s)if(Array.isArray(c)){const p=c[c.length-1];typeof p=="string"&&(opArity[p]!==void 0||specialOps.has(p))?o.push(transpileAudioQuotation(c)):o.push(c)}else if(typeof c=="string"&&(opArity[c]!==void 0||specialOps.has(c))){const p=c;if(p==="bytebeat"||p==="floatbeat"){const m=o.pop(),b=o.pop();o.push([p,b,m]);continue}const u=opArity[p];if(o.length<u)throw new Error(`Audio transpiler stack underflow for operator '${p}'.`);const f=o.splice(o.length-u,u);if(new Set(["sine","saw","tri","pulse"]).has(p)&&Array.isArray(f[0])&&(f[0].length===0||typeof f[0][0]!="string"||!opArity.hasOwnProperty(f[0][0]))){const m=f[0],b=f.slice(1);if(m.length===0)o.push(0);else{const v=m.map(E=>[p,E,...b]);let S=v[0];for(let E=1;E<v.length;E++)S=["mix",S,v[E]];o.push(S)}}else o.push([p,...f])}else o.push(c);if(o.length!==1){if(o.length>1){let c=o.pop();for(;o.length>0;)c=["mix",o.pop(),c];return c}throw new Error(`Audio quotation must resolve to a single audio graph. Found ${o.length} items: ${yieldFormatter(o)}`)}return o[0]},autoClockSequencersInGraph=(e,o,s)=>{if(Array.isArray(e)){if(e[0]==="seq"&&e[1]===null){const p=e[2].length;if(p>0&&o>0){const u=o*.999,h=p/u*(s/60);e[1]=["impulse",h]}else e[1]=["impulse",0];return}for(let c=1;c<e.length;c++)autoClockSequencersInGraph(e[c],o,s)}},isAudioGraph=e=>{if(!Array.isArray(e)||typeof e[0]!="string")return!1;const o=e[0];return opArity.hasOwnProperty(o)||specialOps.has(o)},play={definition:{description:"Plays an audio graph for a specific duration (in beats), then stops it automatically with a short fade-out to prevent clicks. If the graph contains a `seq` node without an explicit clock (from `impulse`), `play` will automatically generate a clock to fit the entire sequence within the given duration. This is for one-shot sounds. It resolves patches and quotations to create a final sound. Does not consume a name from the stack.",effect:"[... audio_quotation duration_beats] -> []",exec:function*(e,o,s,c){if(e.length<1)return;const p=e.pop();if(typeof p!="number"||p<0)throw p!==void 0&&e.push(p),new Error("play operator expects a non-negative number for duration in beats.");if(e.length===0)return;const u=[...e],f=[];if(e.length=0,yield*s(u,f,o),f.length===0)return;let h;if(f.length>1){let E=f.pop();for(;f.length>0;)E=[f.pop(),E,"mix"];h=E}else h=f[0];if(!Array.isArray(h))throw new Error(`play failed to resolve to a playable audio quotation. Result: ${yieldFormatter(h)}`);const g=c[":tempo"],m=g&&"body"in g&&typeof g.body=="number"?g.body:120;let b;isAudioGraph(h)?b=deepClone(h):b=transpileAudioQuotation(h);const v=60/m,S=p*v;Array.isArray(b)&&b[0]==="fm_synth"&&Array.isArray(b[1])&&b[1][0]==="oneshot"&&(b[1]=["gate",S]),autoClockSequencersInGraph(b,p,m),audioEngine.play(b,void 0,S)}},examples:[{code:"bd 0.5 play",expected:[]},{code:"440 sine 0.5 mul 0.25 play",expected:[]},{replCode:"60 0.8 :piano synth 0.5 play",async:{duration:600,assert:e=>e.length===0,assertDescription:"The sustained synth note should play and the stack should be empty."}}]},start={definition:{description:"Starts a continuous audio graph. The sound will play indefinitely until stopped with 'stop' or 'hush'. If a symbol precedes the graph on the stack, it's used as a name for the sound, allowing it to be controlled later. All arguments (graph, name) are consumed from the stack.",effect:"[... name_symbol? audio_quotation] -> []",exec:function*(e,o,s,c){if(e.length===0)return;const p=[...e],u=[];if(e.length=0,yield*s(p,u,o),u.length===0)return;let f;typeof u[0]=="symbol"&&(f=u.shift());let h;if(u.length>1){let v=u.pop();for(;u.length>0;)v=[u.pop(),v,"mix"];h=v}else h=u[0];if(!Array.isArray(h))throw new Error(`start failed to resolve to a playable audio quotation. Result: ${yieldFormatter(h)}`);let g;isAudioGraph(h)?g=deepClone(h):g=transpileAudioQuotation(h),Array.isArray(g)&&g[0]==="fm_synth"&&Array.isArray(g[1])&&g[1][0]==="oneshot"&&(g[1]=1);const m=f?Symbol.keyFor(f):o.sourceId,b=audioEngine.play(g,m);b&&o.onVoiceCreated&&o.onVoiceCreated(b)}},examples:[{code:"440 sine 0.5 mul start",expected:[]},{code:"(220 400 :sine :sine fm) :bell = 60 note :bell start",assert:e=>e.length===0,expectedDescription:"Stack should be empty after starting."},{code:`
440 sine 0.5 mul :synth =
:mysynth :synth start`,expected:[]},{replCode:`
60 0.8 :piano synth :my-piano start
# Wait a bit, then stop it
( :my-piano stop ) 0.5 wait
`,async:{duration:600,assert:(e,o)=>e.length===0,assertDescription:"The sustained synth note should start and then be stopped."}}]},audioOps$f=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$m=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$f.has(e[e.length-1]),sine={definition:{exec:function*(e){const o=e.pop();isAudioQuotation$m(o)?e.push([...o,"sine"]):e.push([o,"sine"])},description:"Creates a sine wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM).",effect:"[F_freq | [F1 F2...] | L_modulator_quotation] -> [L_quotation]"},examples:[{code:"(330 440 445) sine (0.01 0.2 0.0 ahr) mul 0.25 play",expected:[]},{code:`# Manual FM patch: Carrier Freq = 440, Modulator Freq = 220, Modulation Index = 100
220 sine 100 mul 440 mix sine 0.5 mul 0.25 play`,expected:[]},{code:"440 sine",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===2&&e[0][0]===440&&e[0][1]==="sine"}]},audioOps$e=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$l=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$e.has(e[e.length-1]),saw={definition:{exec:function*(e){const o=e.pop();isAudioQuotation$l(o)?e.push([...o,"saw"]):e.push([o,"saw"])},description:"Creates a sawtooth wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM).",effect:"[F_freq | [F1 F2...] | L_modulator_quotation] -> [L_quotation]"},examples:[{code:"(330 440) saw (0.01 0.2 0.0 ahr) mul 0.25 play",expected:[]},{code:"440 saw",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0][0]===440&&e[0][1]==="saw"}]},audioOps$d=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$k=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$d.has(e[e.length-1]),pulse={definition:{exec:function*(e){const o=e.pop(),s=e.pop();isAudioQuotation$k(s)?e.push([...s,o,"pulse"]):e.push([s,o,"pulse"])},description:"Creates a pulse wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM). The duty cycle can also be a number or an audio quotation.",effect:"[F_freq|L_freqs|L_modulator F_duty|L_modulator] -> [L_quotation]"},examples:[{code:"(220 330) 0.5 pulse 0.3 mul 0.25 play",expected:[]},{code:"440 0.25 pulse",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0][0]===440&&e[0][2]==="pulse"}]},noise={definition:{exec:function*(e){e.push(["noise"])},description:"Creates a white noise generator quotation.",effect:"[] -> [L_quotation]"},examples:[{code:"noise 0.5 mul 0.5 play",expected:[]},{code:"noise",expected:[["noise"]]}]},audioOps$c=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$j=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$c.has(e[e.length-1]),lpf={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=(isAudioQuotation$j(c),c);e.push([p,s,o,"lpf"])},description:"Applies a low-pass filter to an audio signal quotation.",effect:"[L_quotation F_cutoff F_resonance] -> [L_quotation]"},examples:[{code:"220 saw 800 0.5 lpf 0.5 mul 0.5 play",expected:[]},{code:"220 saw 800 0.5 lpf",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===4}]},audioOps$b=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$i=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$b.has(e[e.length-1]),hpf={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=(isAudioQuotation$i(c),c);e.push([p,s,o,"hpf"])},description:"Applies a high-pass filter to an audio signal quotation.",effect:"[L_quotation F_cutoff F_resonance] -> [L_quotation]"},examples:[{code:"noise 2000 0.2 hpf 0.5 mul 0.5 play",expected:[]},{code:"noise 2000 0.2 hpf",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===4}]},audioOps$a=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$h=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$a.has(e[e.length-1]),ad={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=(isAudioQuotation$h(c),c);e.push([p,s,o,"ad"])},description:"Creates an Attack-Decay envelope generator quotation.",effect:"[S_gate F_attack F_decay] -> [L_quotation]"},examples:[{code:"1 0.1 0.2 ad 0.4 play",expected:[]},{code:"1 0.01 0.4 ad",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===4}]},audioOps$9=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul","fm","gate"]),isAudioQuotation$g=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$9.has(e[e.length-1]),adsr={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=e.pop(),u=e.pop(),f=(isAudioQuotation$g(u),u);e.push([f,p,c,s,o,"adsr"])},description:"Creates an Attack-Decay-Sustain-Release (ADSR) envelope quotation. It shapes a signal based on a gate input.",effect:"[S_gate F_a F_d F_s F_r] -> [L_quotation]"},examples:[{replCode:`
# A basic synth note using ADSR.
# The note is played for longer than the gate to hear the release phase.
440 sine                                 # The sound source
(0.5 gate) 0.01 0.2 0.5 0.3 adsr mul # Create a gate, feed it to ADSR, and apply to the sine wave
0.5 mul 1.0 play                         # Apply master gain and play
`,expected:[]},{replCode:`
# Using ADSR with a simple, custom 2-operator FM patch.
# The sound is a simple metallic tone.
220 440 250 :sine :sine fm

# The gate signal will last for 1 beat.
1.0 gate

# The ADSR has a long attack and release.
0.4 0.2 0.5 0.8 adsr

# Apply the envelope to the sound, add master gain, and play.
# Play for 2 beats to hear the full release tail.
mul 0.4 mul 2.0 play
`,expected:[]},{replCode:`
# Using one gate signal to drive both a predefined patch and an external ADSR.
120 tempo

# Create a gate signal that lasts 2 beats and duplicate it.
2.0 gate dup

# The first gate signal is used to trigger the bass patch.
# The patch has its own percussive envelope, but we're holding the note.
swap 48 0.9 :bass synth

# The second gate signal is used for our external ADSR "filter" envelope.
# This creates a "wah" effect by controlling the low-pass filter's cutoff.
0.8 0.5 0.1 0.8 adsr  # A slow-opening envelope
2000 * 200 +           # Map the 0-1 envelope to a 200-2200 Hz cutoff range

# Apply the ADSR-controlled filter to the bass sound.
0.7 lpf # Resonance

# Add gain and play for long enough to hear the full effect.
0.5 mul 3.0 play
`,expected:[]},{code:"1 0.1 0.2 0.5 0.3 adsr",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===6}]},ahr={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(typeof c!="number"||typeof s!="number"||typeof o!="number")throw new Error("ahr expects attack, hold, and release times (in seconds).");e.push([c,s,o,"gate_env"])},description:"Creates a one-shot Attack-Hold-Release (AHR) envelope quotation. This is a self-triggering envelope useful for simple percussive or one-shot sounds without needing a separate gate signal.",effect:"[F_attack F_hold F_release] -> [L_quotation]"},examples:[{replCode:`
# A simple synth voice using a self-triggering AHR envelope
(
    440 sine          # Oscillator
    (0.01 0.1 0.5 ahr)  # AHR Envelope
    mul               # Apply envelope
)
0.5 mul 0.8 play # Apply gain and play
`,expected:[]},{code:"0.01 0.1 0.5 ahr",assert:e=>Array.isArray(e[0])&&e[0][3]==="gate_env"}]},audioOps$8=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$f=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$8.has(e[e.length-1]),delay={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=(isAudioQuotation$f(c),c);e.push([p,s,o,"delay"])},description:"Applies a delay effect with feedback to an audio signal quotation.",effect:"[L_quotation F_time F_feedback] -> [L_quotation]"},examples:[{code:"220 sine 0.25 0.5 delay 0.5 mul 0.5 play",expected:[]},{code:"220 sine 0.25 0.5 delay",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===4}]},audioOps$7=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$e=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$7.has(e[e.length-1]),distort={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=(isAudioQuotation$e(s),s);e.push([c,o,"distort"])},description:"Applies distortion to an audio signal quotation.",effect:"[L_quotation F_amount] -> [L_quotation]"},examples:[{code:"220 saw 0.8 distort 0.5 mul 0.5 play",expected:[]},{code:"220 saw 0.8 distort",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===3}]},audioOps$6=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$d=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$6.has(e[e.length-1]),pan={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=(isAudioQuotation$d(s),s);e.push([c,o,"pan"])},description:"Pans a mono signal quotation in the stereo field. -1 is hard left, 1 is hard right.",effect:"[L_quotation F_pos] -> [L_quotation]"},examples:[{code:"220 sine -0.7 pan 0.5 mul 0.5 play",expected:[]},{code:"220 sine -0.7 pan",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===3}]},audioOps$5=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul","tri","bd","sd","hh","lt","mt","ht","fm_simple","fm_synth"]),isAudioQuotation$c=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$5.has(e[e.length-1]),midiToFreq=e=>typeof e!="number"?0:Math.pow(2,(e-69)/12)*440,note={definition:{exec:function*(e){const o=e.pop();if(typeof o=="symbol")e.push([o,"note"]);else if(isAudioQuotation$c(o))e.push([...o,"note"]);else if(Array.isArray(o))e.push(o.map(s=>typeof s=="number"?midiToFreq(s):s));else if(typeof o=="number")e.push(midiToFreq(o));else throw e.push(o),new Error("note operator expects a number, a list of numbers, a symbol, or an audio quotation.")},description:"Converts a MIDI note number to its frequency in Hertz. If the input is a number or a list of numbers, it performs the conversion immediately. If the input is an audio quotation (e.g., a modulator like an LFO) or a symbol (for patch definitions), it creates a new audio quotation to perform the conversion within the audio graph.",effect:"[N_midi | [N1..] | S_symbol | L_modulator] -> [F_hz | [F1..] | L_quotation]"},examples:[{code:`# A simple vibrato effect. An LFO (2Hz sine wave) modulates the MIDI note around 60.
2 sine 5 * 60 + note sine 0.4 mul start`,expected:[]},{code:"8 impulse (60 62 64 65) seq note sine 0.5 mul start",expected:[]},{code:"69 note",expected:[440]},{code:"(60 64 67) note",assert:e=>e.length===1&&Array.isArray(e[0])&&Math.abs(e[0][0]-261.6255)<1e-4,expectedDescription:"A list of frequencies: (261.62... 329.62... 391.99...)"}]},audioOps$4=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$b=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$4.has(e[e.length-1]),seq={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("seq expects a list of values.");if(e.length>0&&isAudioQuotation$b(e[e.length-1])){const s=e.pop();e.push([s,o,"seq"])}else e.push([null,o,"seq"])},description:"Creates a step sequencer quotation that converts a list of values into a stepped audio signal. It steps through the list on each tick of a clock signal. If no clock (e.g., from `impulse`) is on the stack, it expects to be used with `play`, which will auto-generate a clock to fit the sequence into the specified duration.",effect:"[L_clock_quotation]? [L_values] -> [L_quotation]"},examples:[{code:`# With an explicit clock for continuous play
8 impulse (60 64 67 72) note seq sine 0.5 mul start`,expected:[]},{code:`# With an implicit clock for timed play
# Plays 4 notes over a duration of 0.5 beats.
(60 64 67 72) note seq sine 0.4 mul 0.5 play`,expected:[]},{replCode:`
# Using a Euclidean rhythm to generate the sequence values
120 tempo
8 impulse         # Clock at 8Hz (eighth notes)
5 8 euclidean   # Generate the pattern [1,0,1,0,1,0,1,1]
seq               # Create the sequencer
bd                # Use the 0s and 1s to gate a bass drum
0.8 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}]},durationData=[{character:"m..",fraction:"14/1"},{character:"m.",fraction:"12/1"},{character:"m",fraction:"8/1"},{character:"l..",fraction:"7/1"},{character:"l.",fraction:"6/1"},{character:"l",fraction:"4/1"},{character:"d..",fraction:"7/2"},{character:"d.",fraction:"3/1"},{character:"n",fraction:"8/3"},{character:"d",fraction:"2/1"},{character:"w..",fraction:"7/4"},{character:"w.",fraction:"3/2"},{character:"k",fraction:"4/3"},{character:"w",fraction:"1/1"},{character:"h..",fraction:"7/8"},{character:"h.",fraction:"3/4"},{character:"c",fraction:"2/3"},{character:"h",fraction:"1/2"},{character:"q..",fraction:"7/16"},{character:"q.",fraction:"3/8"},{character:"p",fraction:"1/3"},{character:"q",fraction:"1/4"},{character:"e..",fraction:"7/32"},{character:"e.",fraction:"3/16"},{character:"g",fraction:"1/6"},{character:"e",fraction:"1/8"},{character:"s..",fraction:"7/64"},{character:"s.",fraction:"3/32"},{character:"a",fraction:"1/12"},{character:"s",fraction:"1/16"},{character:"t..",fraction:"7/128"},{character:"t.",fraction:"3/64"},{character:"f",fraction:"1/24"},{character:"t",fraction:"1/32"},{character:"u..",fraction:"7/256"},{character:"u.",fraction:"3/128"},{character:"x",fraction:"1/48"},{character:"u",fraction:"1/64"},{character:"o..",fraction:"7/512"},{character:"o.",fraction:"3/256"},{character:"y",fraction:"1/96"},{character:"o",fraction:"1/128"},{character:"j",fraction:"1/192"},{character:"z",fraction:"0/1"}],parseFraction=e=>{const[o,s]=e.split("/").map(Number);return s===0?0:o/s},durationMap=new Map;durationData.forEach(e=>{durationMap.set(e.character,parseFraction(e.fraction))});const isDurationToken=e=>!!(typeof e=="string"&&durationMap.has(e)||typeof e=="number"&&!Number.isInteger(e)),getDurationValue=e=>typeof e=="string"&&durationMap.has(e)?durationMap.get(e):typeof e=="number"&&!Number.isInteger(e)?e:.25,isNoteLike=e=>Number.isInteger(e)||Array.isArray(e),subdivide=(e,o)=>{const s=e.filter(isNoteLike),c=s.length;if(c===0)return[];const p=o/c,u=[];for(const f of s)Number.isInteger(f)?u.push([f,p]):Array.isArray(f)&&u.push(...subdivide(f,p));return u},noteseq={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("noteseq expects a quotation.");const s=[];let c=[];for(const p of o)if(isDurationToken(p)||durationMap.has(p)){const u=getDurationValue(p);c.length>0&&(s.push(...subdivide(c,u)),c=[])}else c.push(p);c.length>0&&s.push(...subdivide(c,.25)),e.push(s)},description:"Converts a quotation into a structured list of [note, duration] pairs. The operator processes the quotation in chunks: it gathers notes and sub-groups until it finds a duration (a decimal number or a duration character like 'q', 'h', etc.). That duration is then applied to the entire preceding chunk, subdividing recursively for any nested groups. Any notes at the end of the quotation without an explicit duration are given a default total duration of a quarter note (0.25).",effect:"[quotation] -> [list_of_pairs]"},examples:[{code:"(60 62 q 64 65 h) noteseq",expected:[[[60,.125],[62,.125],[64,.25],[65,.25]]],expectedDescription:"Applies `q` (0.25) to (60 62), and `h` (0.5) to (64 65)."},{code:"((60 62) (64 65) q) noteseq",expected:[[[60,.0625],[62,.0625],[64,.0625],[65,.0625]]],expectedDescription:"Applies `q` (0.25) to the whole group, subdividing it."},{code:"(((60 (70 59)) 80) 0.5) noteseq",assert:e=>JSON.stringify(e[0])===JSON.stringify([[60,.125],[70,.0625],[59,.0625],[80,.25]]),expectedDescription:"Recursively subdivides the duration 0.5 among the nested structure."},{code:"(60 62 64) noteseq",assert:e=>e[0].every(o=>Math.abs(o[1]-.25/3)<1e-9),expectedDescription:"Uses a default total duration of 0.25 for notes without an explicit duration."},{code:"() noteseq",expected:[[]]}]},impulse={definition:{exec:function*(e){const o=e.pop();e.push([o,"impulse"])},description:"Creates a trigger impulse oscillator quotation at a given frequency (Hz). Note: For safety, a raw impulse played directly will be silent. To hear it, you must apply a gain (e.g., `8 impulse 0.5 mul play`).",effect:"[F_freq] -> [L_quotation]"},examples:[{code:`# Layering instruments at different rates
2 impulse bd          # Bass drum at 2Hz (120bpm quarter notes)
4 impulse hh 0.5 mul  # Hi-hat at 4Hz (120bpm eighth notes)
mix 0.8 mul start      # Mix, apply master gain, and play`,expected:[]},{code:`# Using impulse as a clock for sequencers
# Bass drum part
8 impulse (1 0 0 0 1 0 0 0) seq bd

# Snare drum part
8 impulse (0 0 1 0 0 0 1 0) seq sd

# Mix the two parts and play
mix 0.8 mul start`,expected:[]},{replCode:`
120 tempo

# A 16th note master clock drives a multi-part drum machine.
# Bass drum plays 4 on the floor (4 pulses over 16 steps).
16 impulse 2 16 euclidean seq bd

# Snare drum plays a syncopated 3-pulse pattern.
16 impulse 3 16 euclidean seq sd 0.2 mul

# Hi-hat plays a busy 7-pulse pattern, with lower volume.
16 impulse 5 16 euclidean seq hh 0.2 mul

# Mix all three parts together and apply master gain.
mix mix 0.8 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"The drum machine should start playing."}},{code:"8 impulse",expected:[[8,"impulse"]]}],keywords:["clock","trigger","gate"]},mix={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push([s,o,"mix"])},description:"Mixes two audio signals together by creating a combined quotation.",effect:"[L_quotationA L_quotationB] -> [L_quotation]"},examples:[{code:"220 sine 330 sine mix 0.5 mul 0.5 play",expected:[]},{code:"220 sine 330 sine mix",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===3&&e[0][2]==="mix"}]},mul={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push([s,o,"mul"])},description:"Multiplies two audio signals (or a signal and a number for gain) by creating a combined quotation.",effect:"[L_quotationA L_quotationB_or_F] -> [L_quotation]"},examples:[{code:"440 sine 0.5 mul 0.5 play",expected:[]},{code:"440 sine 0.5 mul",assert:e=>e.length===1&&Array.isArray(e[0])&&e[0].length===3&&e[0][2]==="mul"}]},ctrl={definition:{exec:function*(e){if(e.length<3)throw new Error("ctrl expects 3 arguments on the stack.");const o=e.pop(),s=e.pop(),c=e.pop();if(typeof c!="symbol"||typeof s!="symbol"||typeof o!="number")throw e.push(c,s,o),new Error("ctrl expects: symbol (patch name), symbol (param name), number (value)");const p=Symbol.keyFor(c);if(!p)throw new Error("ctrl: Invalid symbol for patch name.");const u=Symbol.keyFor(s);if(!u)throw new Error("ctrl: Invalid symbol for parameter name.");audioEngine.ctrl(p,u,o)},description:"Controls a parameter of a running audio patch. Consumes the patch name, parameter name, and value from the stack.",effect:"[A B C] -> []"},examples:[{replCode:`# A simple synth patch with a controllable frequency.
# Define it as data using \`=\`.
:freq saw 0.5 mul :synth-patch =

# Play the synth, giving this voice the name :synth1.
# It starts silently as the default for :freq is 0.
:synth1 :synth-patch start

# A live loop to play a melody by controlling the :freq parameter.
120 tempo # Set a tempo for predictable timing
(
  # Use elapsed time to deterministically pick a note from the sequence.
  # This creates an 8th note arggio at 120bpm.
  elapsed 4 * floor 4 %  # Get an index 0,1,2,3 cycling every half beat
  (60 64 67 72) swap at    # Get the MIDI note from the list
  note                     # Convert MIDI note to frequency
  :synth1 :freq rolldown ctrl # Send frequency to the :freq param of voice :synth1
) 0.25 live :melody =>
:melody`,async:{duration:600,assert:(e,o)=>o[":melody"]!==void 0,assertDescription:"The :melody function should be defined."}},{replCode:`# A synth with a controllable filter cutoff.
48 note saw :cutoff 0.8 lpf 0.4 mul :filtered-patch =

# Play the synth, naming the voice :lfo-synth.
:lfo-synth :filtered-patch start

# An LFO loop to modulate the filter cutoff.
(
  # Calculate a sine wave value between 0.1 and 0.9 for the cutoff
  elapsed 2 * sin 0.4 * 0.5 +
  
  # Send this value to the :cutoff parameter of our running synth
  :lfo-synth :cutoff rolldown ctrl
) 0.1 live :lfo =>
:lfo`,async:{duration:600,assert:(e,o)=>o[":lfo"]!==void 0,assertDescription:"The :lfo function should be defined."}},{replCode:`# A synth with a controllable pan parameter.
220 saw :pan pan 0.3 mul :panner-patch =

# Play the synth, naming the voice :panner1.
:panner1 :panner-patch start

# A live loop to link mouse X to the pan parameter.
(
  # mousex is in pixels. Pan wants a value from -1 to 1.
  # This example normalizes an 800px-wide REPL area.
  mousex 800 / 0.5 - 2 *
  
  # Send the calculated pan value to the synth
  :panner1 :pan rolldown ctrl
) 0.05 live :mouse-control =>
:mouse-control`,async:{duration:600,assert:(e,o)=>o[":mouse-control"]!==void 0,assertDescription:"The :mouse-control function should be defined."}},{code:":my-synth :freq 440 ctrl",expected:[]}]},hush={definition:{exec:function*(e,o,s,c){audioEngine.fadeOutAll();const u=c[":loops"];u&&"body"in u&&Array.isArray(u.body)&&(u.body.length=0)},description:"Fades out and stops all currently playing audio voices and terminates all live loops immediately. This prevents audible clicks from abrupt stops.",effect:"[] -> []"},examples:[{replCode:`
# Start a simple beat
2 impulse bd start

# Schedule 'hush' to run after 1 beat (500ms at default 120bpm)
(hush) 1 wait
`,async:{duration:600,assert:e=>e.length===0,assertDescription:"The sound should have stopped and the stack should be empty."}}]},isAudioQuotation$a=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",bd={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$a(e[e.length-1])?o=e.pop():o=[.001,.4,0,"gate_env"];const p=[...[...[...o,.001,.1,"ad"],200,"mul",60,"mix"],"sine"],u=[...o,.001,.4,"ad"],f=[...p,...u,"mul",1,"mul"];e.push(f)},description:"Creates a bass drum synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"bd 0.25 play",expected:[]},{code:"2 impulse bd start",expected:[]},{replCode:`
# A classic 3-against-8 Tresillo rhythm for the bass drum
120 tempo
8 impulse         # 8th note clock
3 8 euclidean seq # The euclidean rhythm
bd                # Gate the bass drum with the sequence
0.9 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","kick","bass drum"]},isAudioQuotation$9=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",sd={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$9(e[e.length-1])?o=e.pop():o=["oneshot"];const p=[...[...[...o,.001,.05,"ad"],400,"mul",180,"mix"],"sine"],u=[...o,.001,.15,"ad"],f=[...p,...u,"mul"],h=["noise",2e3,.5,"hpf"],g=[...o,.001,.1,"ad"],m=[...h,...g,"mul"],S=[...[[...f,.6,"mul"],...m,"mix"],.9,"mul"];e.push(S)},description:"Creates a snare drum synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"sd 0.25 play",expected:[]},{code:"2 impulse sd start",expected:[]},{replCode:`
# A common snare pattern using a 5-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
5 16 euclidean seq # The euclidean rhythm
sd                # Gate the snare with the sequence
0.8 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","snare"]},isAudioQuotation$8=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",lt={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$8(e[e.length-1])?o=e.pop():o=[.001,.3,0,"gate_env"];const s=120,u=[...[...[...o,.001,.08,"ad"],s*1.5,"mul",s,"mix"],"sine"],f=[...o,.001,.3,"ad"],h=[...u,...f,"mul",.9,"mul"];e.push(h)},description:"Creates a low tom synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"lt 0.25 play",expected:[]},{code:"2 impulse lt start",expected:[]},{replCode:`
# A sparse low tom pattern using a 2-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
2 16 euclidean seq # The euclidean rhythm
lt                # Gate the low tom with the sequence
0.9 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","tom","low tom"]},isAudioQuotation$7=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",mt={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$7(e[e.length-1])?o=e.pop():o=[.001,.3,0,"gate_env"];const s=180,u=[...[...[...o,.001,.08,"ad"],s*1.5,"mul",s,"mix"],"sine"],f=[...o,.001,.3,"ad"],h=[...u,...f,"mul",.9,"mul"];e.push(h)},description:"Creates a mid tom synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"mt 0.25 play",expected:[]},{code:"2 impulse mt start",expected:[]},{replCode:`
# A mid tom fill using a 3-against-16 Euclidean rhythm, offset slightly
120 tempo
16 impulse        # 16th note clock
3 16 euclidean seq # The euclidean rhythm
mt                # Gate the mid tom with the sequence
0.0625 0 delay    # Delay by a 32nd note for a syncopated feel
0.9 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","tom","mid tom"]},isAudioQuotation$6=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",ht={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$6(e[e.length-1])?o=e.pop():o=[.001,.3,0,"gate_env"];const s=250,u=[...[...[...o,.001,.08,"ad"],s*1.5,"mul",s,"mix"],"sine"],f=[...o,.001,.3,"ad"],h=[...u,...f,"mul",.9,"mul"];e.push(h)},description:"Creates a high tom synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"ht 0.25 play",expected:[]},{code:"2 impulse ht start",expected:[]},{replCode:`
# A high tom pattern using a 4-against-15 Euclidean rhythm for a polyrhythmic feel
120 tempo
15 impulse        # A clock based on 15 steps
4 15 euclidean seq # The euclidean rhythm
ht                # Gate the high tom with the sequence
0.9 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","tom","high tom"]},isAudioQuotation$5=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",hh={definition:{exec:function*(e){let o;e.length>0&&isAudioQuotation$5(e[e.length-1])?o=e.pop():o=[.001,.05,0,"gate_env"];const s=.05,c=8e3,p=.5,u=[...o,.001,s,"ad"],h=[...["noise",c,.1,"hpf"],...u,"mul",p,"mul"];e.push(h)},description:"Creates a closed hi-hat synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.",effect:"[L_gate_quotation]? -> [L_quotation]"},examples:[{code:"hh 0.25 play",expected:[]},{code:"8 impulse hh start",expected:[]},{replCode:`
# A syncopated hi-hat pattern using a 7-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
7 16 euclidean seq # The euclidean rhythm
hh                # Gate the hi-hat with the sequence
0.5 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after starting the audio."}}],keywords:["drum","drumkit","hi-hat","cymbal"]},bytebeat={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s))throw e.push(s,o),new Error("bytebeat expects a quotation (list) containing a valid RPN expression.");if(typeof o!="number")throw e.push(s,o),new Error("bytebeat expects a frequency number.");const c=transpileJS(s);e.push([c,o,"bytebeat"])},description:"Bytebeat quotation. Consumes a quotation with an RPN expression and a frequency. When played, the expression is transpiled to JS and evaluated for every audio sample. The integer variable 't' (time) is available inside the quotation. The integer result of the formula is wrapped to 8 bits (0-255) and converted to an audio signal (-1 to 1).",effect:"[L_quotation F_frequency] -> [L_quotation]"},examples:[{code:`
# A simple bytebeat formula: t * 42
# In RPN, this is "t 42 *"
(t 42 *) 8000 bytebeat start`,expected:[]},{code:`
# A classic formula: (t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)
# This has to be broken down into RPN steps.
(
  # Part 1: (t>>7|t|t>>6)
  t 7 >> t | t 6 >> |
  
  # Part 2: *10
  10 *
  
  # Part 3: 4*(t&t>>13|t>>6)
  4 
  t t 13 >> &
  t 6 >>
  | *
  
  # Part 4: Add them together
  +
) 8000 bytebeat start`,expected:[]},{code:`
# Formula: t*(t&16384?6:5)*(3+(3&t>>(t&2048?7:14)))>>(3&t>>9)|t>>2
# Let's break it down.

(
  # 1. t
  t
  
  # 2. (t&16384 ? 6 : 5) -> RPN: t 16384 & (6) (5) ?
  t 16384 & 6 5 ?
  
  # 3. Multiply 1 and 2
  *
  
  # 4. (3 + (3 & (t >> (t&2048?7:14))))
  # 4a. (t&2048?7:14) -> t 2048 & 7 14 ?
  # 4b. t >> (4a) -> t (4a) >>
  # 4c. 3 & (4b) -> 3 (4b) &
  # 4d. 3 + (4c) -> 3 (4c) +
  3 t t 2048 & 7 14 ? >> 3 swap & +

  # 5. Multiply 3 and 4
  *
  
  # 6. (3 & (t >> 9))
  3 t 9 >> &
  
  # 7. Right shift 5 by 6
  >>

  # 8. (t >> 2)
  t 2 >>
  
  # 9. Bitwise OR 7 and 8
  |
) 8000 bytebeat start
`,expected:[]},{code:`
# Control pitch and rhythm with the mouse
(
  t mousex 100 / * # rhythm controlled by mousex
  t mousey 200 / *  # pitch controlled by mousey
  &
) 8000 bytebeat start`,expected:[]}]},floatbeat={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s))throw e.push(s,o),new Error("floatbeat expects a quotation (list) containing a valid RPN expression.");if(typeof o!="number")throw e.push(s,o),new Error("floatbeat expects a frequency number.");const c=transpileJS(s);e.push([c,o,"floatbeat"])},description:"Floatbeat quotation. Consumes a quotation with an RPN expression and a frequency. When played, the expression is transpiled to JS and evaluated for every audio sample. The integer variable 't' (time) is available inside the quotation. The float result is used directly as an audio sample and should be in the -1 to 1 range.",effect:"[L_quotation F_frequency] -> [L_quotation]"},examples:[{code:"(t 44100 / 440 * 2 * 3.14159 * sin) 44100 floatbeat 0.5 mul start",expected:[]}]},audioOps$3=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$4=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$3.has(e[e.length-1]),tri={definition:{exec:function*(e){const o=e.pop();isAudioQuotation$4(o)?e.push([...o,"tri"]):e.push([o,"tri"])},description:"Creates a triangle wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM).",effect:"[F_freq | [F1 F2...] | L_modulator_quotation] -> [L_quotation]"},examples:[{code:"440 tri (0.01 0.2 0.0 ahr) mul 0.25 play",expected:[]},{code:"(330 440) tri 0.3 mul 0.25 play",expected:[]}]},audioOps$2=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","ahr","delay","distort","pan","note","seq","impulse","mix","mul","bd","sd","hh","lt","mt","ht","gate","oneshot","fm_synth","fm_simple","arp"]),isAudioQuotation$3=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$2.has(e[e.length-1]),poly={definition:{exec:function*(e,o,s){const c=e.pop(),p=e.pop();if(!Array.isArray(c))throw new Error("poly expects a list of programs.");if(!isAudioQuotation$3(p))throw new Error("poly expects a clock signal quotation.");const u=[];for(const h of c){const g=[];g.push(deepClone(p)),yield*s(h,g,o),u.push(...g)}if(u.length===0)return;if(u.length===1){e.push(u[0]);return}let f=u.pop();for(;u.length>0;)f=[u.pop(),f,"mix"];e.push(f)},description:"Applies a clock signal quotation to multiple program quotations to generate multiple audio quotations (voices), which are then automatically mixed into a single output quotation. If a program is a simple word that generates a quotation (like `bd`), it can be used directly without being wrapped in its own quotation.",effect:"[Clock_Quotation [Prog1 Prog2 ...]] -> [Mixed_Result_Quotation]"},examples:[{replCode:"8 impulse (hh sd bd) poly 0.8 mul start",async:{duration:500,assert:e=>e.length===0,assertDescription:"The simple drum machine should start playing."}},{replCode:`
120 tempo
8 impulse  # A 16th note master clock

(
    # Kick: 4 pulses over 16 steps
    ( 4 16 euclidean seq bd )

    # Snare: 5 pulses over 16 steps, quieter
    ( 5 16 euclidean seq sd 0.7 mul )

    # Hi-hat: 7 pulses over 16 steps, even quieter
    ( 7 16 euclidean seq hh 0.5 mul )
) poly

# The stack now has one mixed quotation.

# Apply master gain and play
0.8 mul start
`,async:{duration:500,assert:e=>e.length===0,assertDescription:"The polyrhythmic drum machine should start playing."}},{replCode:`
# A single trigger for all voices
0.5 gate

(
    # A sine wave for the root note (C4)
    ( 60 note sine 0.5 mul )

    # A sawtooth wave for the major third (E4)
    ( 64 note saw 0.3 mul )

    # A triangle wave for the perfect fifth (G4)
    ( 67 note tri 0.3 mul )
) poly

# Play the automatically mixed chord for 1 beat
1.0 play
`,async:{duration:1100,assert:e=>e.length===0,assertDescription:"A C-major chord with different waveforms should play."}},{replCode:`
120 tempo
# A clock for a simple 8th note pattern
8 impulse

(
    # A low tom panned to the left
    ( (1 0 0 1 0 0 0 0) seq lt -0.8 pan )

    # A mid tom panned to the right
    ( (0 0 1 0 0 1 0 0) seq mt 0.8 pan )
) poly

# Play the panned voices
0.8 mul start
`,async:{duration:500,assert:e=>e.length===0,assertDescription:"Two tom sounds should be heard, panned left and right."}},{replCode:`
120 tempo
# The source sound: a simple arpeggio
8 impulse (60 64 67 72) seq note saw 0.2 mul

(
    # Voice 1: Dry signal, panned left
    ( -0.5 pan )

    # Voice 2: A distorted version, panned right
    ( 0.8 distort 0.5 pan )

    # Voice 3: A delayed version, in the center
    ( 0.375 0.6 delay 0.0 pan ) # 0.375s is a dotted eighth note at 120bpm
) poly

# All three processed voices are mixed automatically.

# Apply master gain and start
0.5 mul start
`,async:{duration:500,assert:e=>e.length===0,assertDescription:"A layered synth arpeggio with different effects should start playing."}}]},audioOps$1=new Set(["sine","saw","pulse","noise","lpf","hpf","ad","adsr","delay","distort","pan","note","seq","impulse","mix","mul"]),isAudioQuotation$2=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps$1.has(e[e.length-1]),fm={definition:{exec:function*(e){const o=e.length>0?e[e.length-1]:void 0,s=e.length>1?e[e.length-2]:void 0,c=e.length>2?e[e.length-3]:void 0;if(typeof o=="number"&&Array.isArray(s)&&typeof c=="number"){const b=e.pop();let v=e.pop();const S=e.pop(),E=e.pop();let _;if(e.length>0&&isAudioQuotation$2(e[e.length-1])?_=e.pop():_=["oneshot"],!Array.isArray(v)||v.length!==6)throw new Error("fm (complex) expects 6 operator definitions.");v=v.map(B=>Array.isArray(B)?B.map(z=>{if(typeof z=="symbol"){const L=Symbol.keyFor(z);if(L)return L}if(Array.isArray(z)&&z.length===2&&typeof z[0]=="symbol"){const L=Symbol.keyFor(z[0]);if(L)return[L,z[1]]}return z}):B);const q=(isAudioQuotation$2(_),_),R=(isAudioQuotation$2(E)||typeof E=="symbol",E);e.push([q,R,S,v,b,"fm_synth"]);return}const p=e.pop(),u=e.pop(),f=e.pop(),h=e.pop(),g=e.pop(),m=(isAudioQuotation$2(g),g);e.push([m,h,f,u,p,"fm_simple"])},description:"A versatile FM synthesis operator that creates an audio quotation.\n- **Simple Mode**: `carrier_freq mod_freq mod_index :carrier_wave :mod_wave fm -> quotation`. Creates a simple 2-operator FM quotation.\n- **Complex Mode**: `[gate_quotation]? baseFreq velocity [op_defs] algo_id fm -> quotation`. Creates a 6-operator DX7-style FM quotation. If the optional gate is omitted, a default one-shot trigger is used.",effect:"[...] -> [L_quotation]"},examples:[{replCode:"440 220 400 :sine :sine fm 0.5 mul 0.25 play",async:{duration:300,assert:e=>e.length===0,assertDescription:"Stack should be empty after playing."}},{replCode:`
# Use a single trigger for a one-shot sound by omitting the gate
60 note 0.8
( 
    # Use sustain on carriers for a sound that holds
    (75 1.00 0.01 0.5 0.0 0.2 :sine) # Op1
    (65 1.00 0.01 0.5 0.0 0.2 :sine) # Op2
    (80 1.00 0.01 0.8 0.0 0.3 :sine) # Op3 (Carrier)
    (70 14.0 0.01 0.3 0.0 0.2 :sine) # Op4
    (60 1.00 0.01 0.5 0.0 0.2 :sine) # Op5
    (78 1.00 0.01 0.6 0.0 0.3 :sine) # Op6 (Carrier)
) 5 fm
# The sound has a release phase, so play it for long enough to hear it
0.4 mul 1.0 play`,async:{duration:700,assert:e=>e.length===0,assertDescription:"Stack should be empty after playing."}},{replCode:`
150 tempo
# A clock and a sequence of MIDI notes
8 impulse dup (40 40 43 45 43 40 40 35) seq note

# Velocity for each note
0.8

# FM Bass Patch Definition
(
    (80 2.00 0.01 0.05 0.0 0.1 :sine)
    (70 1.00 0.01 0.05 0.0 0.1 :sine)
    (90 1.00 0.01 0.1  0.0 0.1 :sine)
    (60 2.00 0.01 0.05 0.0 0.1 :sine)
    (50 1.00 0.01 0.05 0.0 0.1 :sine)
    (88 0.50 0.01 0.1  0.0 0.1 :sine)
)
15 # Algorithm
fm
0.4 mul start
`,async:{duration:500,assert:e=>e.length===0,assertDescription:"The bassline should start playing."}},{replCode:`
120 tempo
# An ambient, evolving pad sound playing a slow arpeggio.
# It uses an impulse clock to trigger notes from a sequence.

# The clock triggers a new note every 2 beats (1 second at 120bpm).
0.5 impulse dup # Create the clock, duplicate it for gate and seq

# The sequence of notes for the arpeggio (C minor 7: C, Eb, G, Bb)
(48 51 55 58) seq note

# A low velocity for a soft, ambient sound
0.3

# The FM patch definition with slow envelopes
(
    (80 1.00 0.8 1.0 1.0 2.0 :sine) # Op1 Carrier
    (82 2.00 1.2 1.0 1.0 2.0 :sine) # Op2 Carrier
    (0 0 0 0 0 0 :sine)            # Op3 Modulator (off)
    (78 0.50 0.9 1.0 1.0 2.5 :sine) # Op4 Carrier
    (80 0.505 1.1 1.0 1.0 2.5 :sine) # Op5 Carrier
    (0 0 0 0 0 0 :sine)            # Op6 Modulator (off)
)
17 # Algorithm with 4 parallel carriers
fm

# Apply master gain and start the sequence. The long release
# times in the patch will cause the notes to overlap and blend.
0.5 mul start
`,async:{duration:500,assert:e=>e.length===0,assertDescription:"The ambient pad sequence should start playing."}}]},gate={definition:{exec:function*(e,o,s,c){const p=e.pop();if(typeof p!="number"||p<0)throw new Error("gate expects a non-negative number for duration in beats.");const u=c[":tempo"],h=60/(u&&"body"in u&&typeof u.body=="number"?u.body:120),g=p*h;e.push([g,"gate"])},description:"Creates a gate signal quotation. It produces a value of 1.0 for a specified duration (in beats), and 0.0 otherwise. This is ideal for triggering ADSR envelopes for notes with a specific length. It is tempo-aware.",effect:"[F_beats] -> [L_quotation]"},examples:[{replCode:`
# A synth voice using an ADSR envelope
(
    440 sine                                 # Oscillator
    (0.5 gate) 0.01 0.2 0.5 0.3 adsr mul # Apply ADSR envelope
)
0.5 mul 1.0 play # Apply gain and play for 1 beat
`,expected:[]},{code:"0.5 gate",assert:e=>Array.isArray(e[0])&&e[0][1]==="gate"}]},isAudioQuotation$1=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string",fmPresets={piano:{opDefs:[[75,1,.01,.5,0,.2,":sine"],[65,1,.01,.5,0,.2,":sine"],[80,1,.01,.8,0,.3,":sine"],[70,14,.01,.3,0,.2,":sine"],[60,1,.01,.5,0,.2,":sine"],[78,1,.01,.6,0,.3,":sine"]],algorithmId:5},bass:{opDefs:[[80,2,.01,.2,0,.1,":sine"],[70,1,.01,.2,0,.1,":sine"],[90,1,.01,.3,0,.1,":sine"],[60,2,.01,.2,0,.1,":sine"],[50,1,.01,.2,0,.1,":sine"],[88,.5,.01,.3,0,.1,":sine"]],algorithmId:15},bell:{opDefs:[[90,3.5,.01,.5,0,.8,":sine"],[70,2,.01,.5,0,.8,":sine"],[95,1,.01,1,0,1.2,":sine"],[80,.5,.01,.5,0,.8,":sine"],[60,4,.01,.5,0,.8,":sine"],[92,1.5,.01,1,0,1.2,":sine"]],algorithmId:9},kalimba:{opDefs:[[99,10,.62,0,.989,.14,":sine"],[87,4,.54,0,.989,.86,":sine"],[99,4,.52,.28,.363,.58,":sine"],[87,5,.42,.8,.727,.86,":sine"],[99,1,.42,.86,0,.98,":sine"],[86,3,.34,.14,.989,1.32,":sine"]],algorithmId:19},tamboura:{opDefs:[[99,1,.12,1.4,1,1.2,":sine"],[76,.5,.42,.02,0,1.54,":sine"],[67,3,1.4,1.28,1,1.22,":sine"],[67,3,1.32,1.28,1,0,":sine"],[72,12,1.46,1.28,1,1.22,":sine"],[81,3,1.32,1.32,1,0,":sine"]],algorithmId:16},glide:{opDefs:[[99,1,.74,1.56,1,1.4,":sine"],[0,1,1.32,1.08,.505,1.7,":sine"],[94,1,1.6,1.08,1,1.4,":sine"],[89,2,1.34,1.08,.505,1.7,":sine"],[73,9,.28,1.04,1,1.56,":sine"],[0,2.884,1.62,1.04,1,1.56,":sine"]],algorithmId:3},violin:{opDefs:[[99,2,1.14,.08,.979,1.08,":sine"],[68,6,.88,.24,.898,1.98,":sine"],[59,8,.9,.14,0,.78,":sine"],[92,6,.64,.14,0,1.98,":sine"],[59,8,.28,.14,0,.68,":sine"],[76,10,.52,.58,.979,.04,":sine"]],algorithmId:17}},synth={definition:{exec:function*(e,o,s,c){const p=e.pop(),u=e.pop(),f=e.pop();let h,g,m,b=!1;e.length>0&&isAudioQuotation$1(e[e.length-1])?(h=e.pop(),b=!0,g=f,m=u):(h=["oneshot"],g=f,m=u);const v=B=>{throw b&&e.push(h),g!==void 0&&e.push(g),m!==void 0&&e.push(m),p!==void 0&&e.push(p),new Error(B)};(typeof m!="number"||m<0||m>1)&&v("synth expects velocity (a number between 0.0-1.0) as the last argument before the patch name/data."),typeof g!="number"&&!isAudioQuotation$1(g)&&typeof g!="symbol"&&v("synth expects a note number, quotation, or symbol.");let S,E;if(typeof p=="symbol"){const B=Symbol.keyFor(p);B||v("synth received an invalid symbol for the patch name.");const z=`:${B}`,L=c[z];if(L&&"body"in L&&Array.isArray(L.body)){const I=L.body;if(I.length===2&&Array.isArray(I[0])&&I[0].length===6&&typeof I[1]=="number")S=I[0],E=I[1];else throw new Error(`User-defined synth patch ':${B}' has an invalid format. Expected a list of the form '((op_defs_list) algorithm_id)'.`)}else{const I=fmPresets[B];if(!I)throw new Error(`Synth preset ':${B}' not found.`);S=I.opDefs,E=I.algorithmId}}else if(Array.isArray(p)){const B=p;B.length===2&&Array.isArray(B[0])&&B[0].length===6&&typeof B[1]=="number"?(S=B[0],E=B[1]):v("Synth patch data has an invalid format. Expected a list of the form '((op_defs_list) algorithm_id)'.")}else v("synth expects a symbol for the patch name (e.g., :piano) or raw patch data.");const _=[g,"note"],q=S.map(B=>Array.isArray(B)?B.map(z=>{if(typeof z=="symbol"){const L=Symbol.keyFor(z);if(L)return L}if(Array.isArray(z)&&z.length===2&&typeof z[0]=="symbol"){const L=Symbol.keyFor(z[0]);if(L)return[L,z[1]]}return z}):B),R=[h,_,m,q,E,"fm_synth"];e.push(R)},description:"A generic FM synthesizer operator. Signature: `[gate_quotation]? note_or_quotation velocity (:patch-name | patch_data) synth -> fm_quotation`. It loads an FM patch, either from a set of built-in presets by name, from a user-defined variable by name, or from raw patch data on the stack. If the optional gate quotation is omitted, a default one-shot trigger is used.\n\nAvailable presets: `:piano`, `:bass`, `:bell`, `:kalimba`, `:tamboura`, `:glide`, `:violin`.",effect:"[gate_quotation]? note_or_quotation velocity (:patch-name|patch_data) -> [fm_quotation]"},examples:[{replCode:"60 0.8 :piano synth 1.0 play",async:{duration:1100,assert:e=>e.length===0}},{replCode:"48 0.9 :bass synth 1.0 play",async:{duration:1100,assert:e=>e.length===0}},{replCode:"72 0.7 :bell synth 2.0 play",async:{duration:2100,assert:e=>e.length===0}},{replCode:"72 0.8 :kalimba synth 1.0 play",async:{duration:1100,assert:e=>e.length===0}},{replCode:"48 0.9 :tamboura synth 3.0 play",async:{duration:3100,assert:e=>e.length===0}},{replCode:"60 0.8 :glide synth 2.0 play",async:{duration:2100,assert:e=>e.length===0}},{replCode:"72 0.7 :violin synth 2.0 play",async:{duration:2100,assert:e=>e.length===0}},{replCode:`
# Define a custom patch format: ((op_defs) algorithm_id)
(
    ( # op_defs list
        (80 1.0 0.01 0.1 0.0 0.1 :sine)
        (70 1.0 0.01 0.1 0.0 0.1 :sine)
        (90 1.0 0.01 0.2 0.0 0.1 :sine)
        (0 0 0 0 0 0 :sine)
        (0 0 0 0 0 0 :sine)
        (0 0 0 0 0 0 :sine)
    ) 
    32 # algorithm_id (just carriers)
) :my-simple-bass =

# Use the custom patch
60 0.8 :my-simple-bass synth 1.0 play`,async:{duration:500,assert:(e,o)=>o[":my-simple-bass"]!==void 0}}]},transpileAudio={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("transpile-audio expects an audio quotation.");const s=transpileAudioQuotation(o);e.push(s)},description:"A debugging tool that consumes an audio quotation and pushes its transpiled graph structure to the stack instead of playing it. This allows you to inspect the final structure that is sent to the audio engine.",effect:"[audio_quotation] -> [audio_graph]"},examples:[{code:"440 sine 0.5 mul transpile-audio",expected:[["mul",["sine",440],.5]]},{code:"bd transpile-audio",assert:e=>Array.isArray(e[0])&&e[0][0]==="mul",expectedDescription:"The final audio graph for the `bd` drum patch."}]},oneshot={definition:{exec:function*(e){e.push(["oneshot"])},description:"Creates a single trigger signal quotation. When played, it produces a single spike of 1.0 on the first sample, then 0.0 thereafter. This is the standard way to trigger one-shot sounds for instruments that have their own internal envelopes (like `bd`, `sd`, `e-piano`, etc.).",effect:"[] -> [L_quotation]"},examples:[{replCode:"oneshot 60 0.8 e-piano 2.0 play",async:{duration:500,assert:e=>e.length===0,assertDescription:"Stack should be empty after playing the one-shot sound."}},{code:"oneshot",expected:[["oneshot"]]}]},audioOps=new Set(["sine","saw","pulse","tri","noise","lpf","hpf","ad","adsr","ahr","delay","distort","pan","note","seq","impulse","mix","mul","bd","sd","hh","lt","mt","ht","gate","oneshot","fm_synth","fm_simple","arp","floatbeat","bytebeat"]),isAudioQuotation=e=>Array.isArray(e)&&e.length>0&&typeof e[e.length-1]=="string"&&audioOps.has(e[e.length-1]),arp={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=e.pop();if(!(typeof o=="number"&&o>0||isAudioQuotation(o)))throw e.push(p,c,s,o),new Error("arp expects a positive number or an audio quotation (e.g. from floatbeat) for speed (in Hz).");if(typeof s!="number"||typeof c!="number")throw e.push(p,c,s,o),new Error("arp expects numbers for semitone offsets.");const f=isAudioQuotation(p)?p:[p,"note"],h=Math.pow(2,c/12),g=Math.pow(2,s/12),m=[o,"impulse"];e.push([m,f,h,g,"arp"])},description:"Creates a fast arpeggiated frequency stream quotation, simulating a classic chiptune chord. It sequences three notes at a specified speed (in Hz): a base note, and two notes offset by X and Y semitones. The speed can be a number or an audio quotation (e.g. from `floatbeat`) for dynamic control. The resulting quotation is a frequency modulator that can be piped into any oscillator.",effect:"[base_note_or_quotation x_semitones y_semitones speed_hz_or_quotation] -> [L_frequency_stream_quotation]"},examples:[{replCode:"62 3 7 60 arp 0.25 pulse 0.3 mul 1.0 play",async:{duration:1100,assert:e=>e.length===0,assertDescription:"A classic D-minor pulse-wave arpeggio should play for 1 beat."}},{replCode:"60 1 0 240 arp saw 0.3 mul 1.0 play",async:{duration:1100,assert:e=>e.length===0,assertDescription:"A very fast C/C# trill effect should play for 1 beat."}},{replCode:"90 4 7 50 arp sine 0.4 mul 1.0 play",async:{duration:1100,assert:e=>e.length===0,assertDescription:"A phone ring like arp effect should play for 1 beat."}},{replCode:`
120 tempo
# A sequence of notes
4 impulse (60 62 64 67) seq

# Arpeggiate each note with a speed modulated by an LFO.
# The floatbeat quotation generates a signal oscillating between 20 and 100.
4 7 (t 20 * sin 40 * 60 +) 1 floatbeat arp

# Pipe the arpeggiated frequency stream into a saw wave
saw

# Apply gain and start the sequence
0.3 mul start`,async:{duration:500,assert:e=>e.length===0,assertDescription:"An arpeggiated melody with modulated speed should start playing."}},{replCode:`
# Define a reusable arpeggio sound with '=>'
# This creates a function 'arpf' that takes a base note
# and creates a minor arpeggiated pulse-wave sound quotation.
(3 7 80 arp 0.25 pulse) arpf =>

# Use the new function to play a C note (60)
60 arpf 0.4 mul 1 play`,async:{duration:1100,assert:(e,o)=>e.length===0&&o.arpf!==void 0,assertDescription:"A reusable arpeggio function 'arpf' is created and used to play a note."}},{replCode:`
# Define a reusable arpeggio sound with '=>'
(3 7 80 arp 0.25 pulse) arpf =>

# A sequence of notes for a C-major scale
(60 62 64 65 67 69 71 72)

# Play each note in the sequence, waiting 0.25 beats between each one
(
  arpf      # apply the arpeggio function to the note
  0.4 mul   # apply gain
  0.25 play # play for 0.25 beats
  0.25 sleep # wait 0.25 beats before the next note
) step`,async:{duration:2100,assert:(e,o)=>e.length===0&&o.arpf!==void 0,assertDescription:"The arpeggiated scale should play completely, leaving the stack empty."}}]},audio={name:"Audio",description:"Operators for audio synthesis and processing using the Web Audio API.",definitions:{ad,adsr,ahr,arp,bd,bytebeat,ctrl,delay,distort,floatbeat,fm,gate,hh,hpf,ht,hush,impulse,lpf,lt,mix,mt,mul,noise,note,noteseq,oneshot,pan,play,poly,pulse,saw,sd,seq,sine,start,synth,"transpile-audio":transpileAudio,tri}},march={definition:{exec:function*(e){const o=[];for(;e.length>0&&isMarchingObject(e[e.length-1]);)o.unshift(e.pop());if(o.length===0)throw new Error("march expects at least one SDF object on the stack.");let s;o.length>1?s=o.reduce((p,u)=>createMarchingObject("union","combinator",[p,u])):s=o[0];const c={type:"scene",graph:s,lights:[]};e.push(c)},description:"Collects all SDF objects from the stack, combines them with a union operation if there are multiple, and creates a single scene object.",effect:"[sdf1 sdf2...] -> [scene]"},examples:[{code:["1 sphere march"],assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="scene"},expectedDescription:"A shader object showing a sphere."}]},smoothmarch={definition:{exec:function*(e){const o=e.pop();if(typeof o!="number")throw new Error("smoothmarch expects a smoothness value on top of the stack.");const s=[];for(;e.length>0&&isMarchingObject(e[e.length-1]);)s.unshift(e.pop());if(s.length===0)throw new Error("smoothmarch expects at least one SDF object on the stack.");let c;s.length>1?c=s.reduce((u,f)=>createMarchingObject("smoothUnion","combinator",[u,f],{smoothness:o})):c=s[0];const p={type:"scene",graph:c,lights:[]};e.push(p)},description:"Collects all SDF objects from the stack, combines them with a smooth union, and creates a scene. The smoothness factor is popped from the top of the stack.",effect:"[sdf1 sdf2... F_smoothness] -> [scene]"},examples:[{code:"0.8 sphere 0.5 0 0 vec3 translate 0.8 sphere -0.5 0 0 vec3 translate 0.2 smoothmarch render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}}]},glslLibrary={dot2:{code:"float dot2( in vec2 v ) { return dot(v,v); }",dependencies:[]},ndot:{code:"float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }",dependencies:[]},extrude:{code:`float extrude(float d2, float z, float h) {
    vec2 d = vec2(d2, abs(z) - h * 0.5);
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}`,dependencies:[]},smax:{code:`float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(a, b, h) - k * h * (1.0 - h);
}`,dependencies:[]},texture_dots:{code:`vec3 texture_dots(vec3 p, float scale) {
    vec3 p_scaled = p * scale;
    float d = length(fract(p_scaled) - 0.5);
    return vec3(step(0.25, d));
}`,dependencies:[]},texture_stripes:{code:`vec3 texture_stripes(vec3 p, float scale) {
    float stripes = sin((p.x + p.y + p.z) * scale * 5.0);
    return vec3(step(0.0, stripes));
}`,dependencies:[]},texture_checkers:{code:`vec3 texture_checkers(vec3 p, float scale) {
    vec3 p_scaled = floor(p * scale);
    float check = mod(p_scaled.x + p_scaled.y + p_scaled.z, 2.0);
    return vec3(check);
}`,dependencies:[]},snoise:{code:`vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzz, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 );
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}`,dependencies:[]},cnoise:{code:`float cnoise(vec3 p) { return snoise(p) * 0.5 + 0.5; }
float cnoise(vec2 p) { return snoise(vec3(p, 0.0)) * 0.5 + 0.5; }`,dependencies:["snoise"]},vector_snoise:{code:`vec3 vector_snoise(vec3 p) {
    return vec3(
        snoise(p),
        snoise(p + vec3(100.0, 24.5, 34.6)),
        snoise(p - vec3(54.2, 14.7, 78.1))
    );
}`,dependencies:["snoise"]},curl:{code:`vec3 curl(vec3 p) {
    const float e = 0.001;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);

    vec3 n_y1 = vector_snoise(p + dy); vec3 n_y0 = vector_snoise(p - dy);
    vec3 n_z1 = vector_snoise(p + dz); vec3 n_z0 = vector_snoise(p - dz);
    vec3 n_x1 = vector_snoise(p + dx); vec3 n_x0 = vector_snoise(p - dx);
    
    float x = (n_y1.z - n_y0.z) - (n_z1.y - n_z0.y);
    float y = (n_z1.x - n_z0.x) - (n_x1.z - n_x0.z);
    float z = (n_x1.y - n_y0.y) - (n_y1.x - n_y0.y);
    
    vec3 curlVec = vec3(x, y, z) / (2.0 * e);
    return curlVec * 0.5 + 0.5;
}

vec3 curl(vec2 p) {
    const float e = 0.001;
    float n1 = snoise(vec3(p + vec2(0.0, e), 0.0));
    float n2 = snoise(vec3(p - vec2(0.0, e), 0.0));
    float n3 = snoise(vec3(p + vec2(e, 0.0), 0.0));
    float n4 = snoise(vec3(p - vec2(e, 0.0), 0.0));
    vec2 curl2d = vec2(n1 - n2, n4 - n3) / (2.0 * e);
    curl2d = curl2d * 0.5 + 0.5;
    return vec3(curl2d.x, curl2d.y, (curl2d.x + curl2d.y) * 0.5);
}`,dependencies:["vector_snoise","snoise"]},random:{code:`float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(vec3 pos) {
    return fract(sin(dot(pos.xyz, vec3(12.9898, 78.233, 151.7182))) * 43758.5453123);
}`,dependencies:[]},random2:{code:`vec2 random2(vec2 st) {
    return vec2(random(st), random(st + vec2(1.23, 4.56)));
}`,dependencies:["random"]},worley:{code:`vec2 worley(vec2 p) {
    vec2 g = floor(p);
    vec2 f = fract(p);
    float jitter = (sin(u_time) * 0.5 + 0.5);

    float F1 = 8.0;
    float F2 = 8.0;

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 lattice = vec2(x,y);
            vec2 offset = vec2(random(g + lattice)) * jitter;
            float d = distance(lattice + offset, f);
            if(d < F1) {
                F2 = F1;
                F1 = d;
            } else if(d < F2) {
                F2 = d;
            }
        }
    }
    return vec2(F1,F2);
}

vec2 worley(vec3 p) {
    vec3 g = floor(p);
    vec3 f = fract(p);
    float jitter = (sin(u_time) * 0.5 + 0.5);

    float F1 = 8.0;
    float F2 = 8.0;

    for (int z = -1; z <= 1; z++) {
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec3 lattice = vec3(x,y,z);
                vec3 offset = vec3(random(g + lattice)) * jitter;
                float d = distance(lattice + offset, f);
                if(d < F1) {
                    F2 = F1;
                    F1 = d;
                } else if(d < F2) {
                    F2 = d;
                }
            }
        }
    }
    return vec2(F1,F2);
}`,dependencies:["random"]},voronoi:{code:`vec3 voronoi(vec2 uv, float time) {
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv);
    vec3 rta = vec3(0.0, 0.0, 10.0);
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 p_rand = random2(i_uv + neighbor);
            vec2 p = 0.5 + 0.5 * sin(time + 6.2831853 * p_rand);
            vec2 diff = neighbor + p - f_uv;
            float dist = length(diff);
            if ( dist < rta.z ) {
                rta.xy = p;
                rta.z = dist;
            }
        }
    }
    return rta;
}
vec3 voronoi(vec2 p)  { return voronoi(p, u_time); }
vec3 voronoi(vec3 p)  { return voronoi(p.xy, p.z); }`,dependencies:["random2"]},noise2d_val:{code:`float noise2d_val (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}`,dependencies:["random"]},fbm:{code:`float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) { // Unrolled loop for NUM_OCTAVES 5
        v += a * noise2d_val(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float fbm(in vec3 _st) { // 3D version using existing snoise
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; ++i) {
        v += a * cnoise(_st);
        _st = _st * 2.0 + 100.0;
        a *= 0.5;
    }
    return v;
}`,dependencies:["noise2d_val","cnoise"]},cloud_color:{code:`vec3 cloud_color(vec3 p, float u_time, vec3 colorA, vec3 colorB) {
    vec2 st = p.xy * 3.0;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);
    float f = fbm(st+r);
    color = mix(colorA, colorB, clamp((f*f)*4.0,0.0,1.0));
    color = mix(color, vec3(0,0,0.164706), clamp(length(q),0.0,1.0));
    color = mix(color, vec3(0.666667,1,1), clamp(length(r.x),0.0,1.0));
    return (f*f*f+.6*f*f+.5*f)*color;
}`,dependencies:["fbm"]},cart2polar:{code:`vec3 cart2polar(vec3 p) {
    float r = length(p);
    if (r < 0.0001) return vec3(0.0); // Guard against division by zero at the origin
    float theta = acos(p.z / r);
    float phi = atan(p.y, p.x);
    return vec3(r, theta, phi);
}`,dependencies:[]},mandelbulbSDF:{code:`vec2 mandelbulbSDF( in vec3 st ) {
   vec3 zeta = st;
   float m = dot(st,st);
   float dz = 1.0;
   float n = 8.0;
   const int maxiterations = 20;
   float iterations = 0.0;
   for (int i = 0; i < maxiterations; i+=1) {
       dz = n*pow(m, 3.5)*dz + 1.0;
       vec3 sphericalZ = cart2polar( zeta );
       float newx = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * cos(sphericalZ.z*n);
       float newy = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * sin(sphericalZ.z*n);
       float newz = pow(sphericalZ.x, n) * cos(sphericalZ.y*n);
       zeta.x = newx + st.x;
       zeta.y = newy + st.y;
       zeta.z = newz + st.z;
       m = dot(zeta, zeta);
       if ( m > 2.0 ) break;
   }
   return vec2(0.25*log(m) * sqrt(m) / dz, iterations);
}`,dependencies:["cart2polar"]},pow2:{code:"float pow2( float x ) { return x*x; }",dependencies:[]},juliaSDF:{code:`float juliaSDF( vec2 st, vec2 c, float r) {
    vec2 z = st * r;
    float n = 0.0;
    const int I = 50;
    for (int i = I; i > 0; i--) {
        if ( length(z) > 4.0 ) { n = float(i)/float(I); break; }
        z = vec2( (pow2(z.x) - pow2(z.y)) + c.x, (2.0*z.x*z.y) + c.y );
    }
    return n;
}`,dependencies:["pow2"]},mandelbrotSDF:{code:`float mandelbrotSDF( vec2 st, float r) {
    vec2 z = vec2(0.0);
    vec2 c = st * r;
    float n = 0.0;
    const int I = 50;
    for (int i = I; i > 0; i--) {
        if ( length(z) > 4.0 ) { n = float(i)/float(I); break; }
        z = vec2( (z.x*z.x - z.y*z.y) + c.x, (2.0*z.x*z.y) + c.y );
    }
    return n;
}`,dependencies:[]},sdFractal:{code:`float sdFractal(vec3 p, float iterations, float scale) {
    vec3 offset = p;
    vec3 z = p;
    float dr = 1.0;
    for (int i = 0; i < 256; i++) {
        if(float(i) >= iterations) break;
        // Box folding operation
        z = clamp(z, -1.0, 1.0) * 2.0 - z;
        // Spherical inversion
        float r2 = dot(z, z);
        if (r2 < 0.5) { // minRadius^2 = 0.5
            float temp = 1.0 / r2;
            z *= temp;
            dr *= temp;
        }
        z = z * scale + offset;
        dr = dr * abs(scale) + 1.0;
    }
    return length(z) / abs(dr);
}`,dependencies:[]},sdPsychobox:{code:`float sdPsychobox(vec3 p, float iterations) {
    p = fract(p) - 0.5;
    float s = 1.0;
    for (int i = 0; i < 128; i++) {
        if(float(i) >= iterations) break;
        float m = dot(p, p) * 0.7;
        if (m < 0.001) break;
        p /= m;
        s *= m;
        p.xy = fract(p.xy) - 0.5;
        p.xyz = p.yzx;
    }
    return (length(p) - 1.0) * s;
}`,dependencies:[]},hsv2rgb:{code:`vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`,dependencies:[]},random_color:{code:`vec3 random_color(vec3 p) {
    vec3 p3  = fract(p * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xxy + p3.yzz)*p3.zyx);
}`,dependencies:[]},distEuclidean:{code:"float distEuclidean(vec2 a, vec2 b) { return distance(a, b); }",dependencies:[]},distManhattan:{code:"float distManhattan(vec2 a, vec2 b) { return abs(a.x - b.x) + abs(a.y - b.y); }",dependencies:[]},distChebychev:{code:"float distChebychev(vec2 a, vec2 b) { return max(abs(a.x - b.x), abs(a.y - b.y)); }",dependencies:[]},distMinkowski:{code:"float distMinkowski(vec2 a, vec2 b, float p) { return pow(pow(abs(a.x - b.x), p) + pow(abs(a.y - b.y), p), 1.0 / p); }",dependencies:[]},sdSphere:{code:"float sdSphere( vec3 p, float s ) { return length(p)-s; }",dependencies:[]},sdBox:{code:"float sdBox( vec3 p, vec3 b ) { vec3 q = abs(p) - b; return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0); }",dependencies:[]},sdRoundbox:{code:"float sdRoundbox( vec3 p, vec3 b, float r ) { vec3 q = abs(p) - b; return length(max(q,0.0)) - r; }",dependencies:[]},sdTorus:{code:"float sdTorus( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }",dependencies:[]},sdTorus88:{code:"float sdTorus88( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xz)-t.x,p.y); return max(abs(q.x),abs(q.y))-t.y; }",dependencies:[]},sdTorus82:{code:"float sdTorus82( vec3 p, vec2 t ) { vec2 q = vec2(length(p.xy)-t.x,p.z); return length(q)-t.y; }",dependencies:[]},sdPlane:{code:"float sdPlane(vec3 p, vec3 n, float h) { return dot(p, n) + h; }",dependencies:[]},sdCapsule:{code:"float sdCapsule( vec3 p, vec3 a, vec3 b, float r ) { vec3 pa = p - a, ba = b - a; float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 ); return length( pa - ba*h ) - r; }",dependencies:[]},sdCone:{code:"float sdCone( vec3 p, vec2 c ) { float q = length(p.xy); return dot(normalize(c), vec2(q, p.z)); }",dependencies:[]},sdCylinder:{code:"float sdCylinder( vec3 p, vec2 h ) { vec2 d = abs(vec2(length(p.xz),p.y)) - h; return min(max(d.x,d.y),0.0) + length(max(d,0.0)); }",dependencies:[]},sdHexprism:{code:"float sdHexprism( vec3 p, vec2 h ) { vec3 q = abs(p); return max(q.z-h.y,max((q.x*0.866025+q.y*0.5),q.y)-h.x); }",dependencies:[]},sdTriprism:{code:"float sdTriprism( vec3 p, vec2 h ) { vec3 q = abs(p); return max(q.z-h.y, max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5); }",dependencies:[]},sdOctahedron:{code:"float sdOctahedron( vec3 p, float s) { p = abs(p); return (p.x+p.y+p.z-s)*0.57735027; }",dependencies:[]},sdMandelbox:{code:"float sdMandelbox(vec3 p, float scale, float iterations, float folding) { vec3 z=p; float dr=1.0; for(int n=0;n<int(iterations);n++){z=clamp(z,-folding,folding)*2.0-z;float r2=dot(z,z);if(r2<0.5){z*=1.0/r2;dr=dr/r2;}z=z*scale+p;dr=dr*abs(scale)+1.0;} return length(z)/abs(dr); }",dependencies:[]},sdMandelbulb:{code:"float sdMandelbulb(vec3 p) { return mandelbulbSDF(p).x; }",dependencies:["mandelbulbSDF"]},sdArc2d:{code:"float sdArc2d( in vec3 p_3d, in vec2 sc, in float ra, float rb ) { vec2 p = p_3d.xy; p.x = abs(p.x); vec2 p2 = (sc.y*p.x>sc.x*p.y) ? p : vec2( dot(p,sc), ndot(p,sc) ); float d2d = sign(p2.x)*length(p2-vec2(ra,0.0)) - rb; return extrude(d2d, p_3d.z, 0.1);}",dependencies:["extrude","ndot"]},sdBox2d:{code:"float sdBox2d(in vec3 p_3d, in vec2 b){vec2 p=p_3d.xy;vec2 d=abs(p)-b;float d2d=length(max(d,0.0))+min(max(d.x,d.y),0.0);return extrude(d2d,p_3d.z,0.1);}",dependencies:["extrude"]},sdCircle2d:{code:"float sdCircle2d(vec3 p_3d, float r){ float d2d = length(p_3d.xy)-r; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdCross2d:{code:"float sdCross2d( in vec3 p_3d, in vec2 b, float r ) { vec2 p = p_3d.xy; p = abs(p); p = (p.y>p.x) ? p.yx : p; vec2 q = p - b; float k = max(q.y,q.x); vec2 w = (k>0.0) ? q : vec2(b.y-p.x,-k); float d2d = sign(k)*length(max(w,0.0)) + r; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdEllipse2d:{code:"float sdEllipse2d( in vec3 p_3d, in vec2 ab ) { vec2 p = p_3d.xy; p = abs(p); if( p.x > p.y ) p=p.yx; float l = ab.y-ab.x; float m = (l*p.x + l*p.y)/ (l*l); float n = clamp( m, 0.0, 1.0 ); vec2 q = p - ab.x*normalize(mix(ab.yx,vec2(1.0,0.0),n)); float d2d = length(q) * sign(p.y-ab.y); return extrude(d2d, p_3d.z, 0.1);}",dependencies:["extrude"]},sdEquilateralTriangle2d:{code:"float sdEquilateralTriangle2d( in vec3 p_3d, float r ) { vec2 p = p_3d.xy; const float k = sqrt(3.0); p.x = abs(p.x) - r; p.y = p.y + r/k; if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0; p.x -= clamp( p.x, -2.0*r, 0.0 ); float d2d = -length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdHeart2d:{code:"float sdHeart2d( in vec3 p_3d ) { vec2 p = p_3d.xy; p.x = abs(p.x); float d2d; if( p.y+p.x>1.0 ) d2d = sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0; else d2d = sqrt(min(dot2(p-vec2(0.00,1.00)), dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude","dot2"]},sdHexagon2d:{code:"float sdHexagon2d( in vec3 p_3d, float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(-0.866025404,0.5,0.577350269); p = abs(p); p -= 2.0*min(dot(k.xy,p),0.0)*k.xy; p -= vec2(clamp(p.x, -k.z*r, k.z*r), r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdHexagram2d:{code:"float sdHexagram2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec4 k = vec4(-0.5,0.86602540,0.57735027,1.73205081); p = abs(p); p -= 2.0*min(dot(vec2(k.x,k.y),p),0.0)*vec2(k.x,k.y); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= vec2(clamp(p.x,r*k.z,r*k.w),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdIsoscelesTriangle2d:{code:"float sdIsoscelesTriangle2d( in vec3 p_3d, in vec2 q ) { vec2 p = p_3d.xy; p.x = abs(p.x); vec2 a = p - q*clamp( dot(p,q)/dot(q,q), 0.0, 1.0 ); vec2 b = p - q*vec2( clamp( p.x/q.x, 0.0, 1.0 ), 1.0 ); float s = -sign( q.y ); vec2 d = min( vec2( dot(a,a), s*(p.x*q.y-p.y*q.x) ), vec2( dot(b,b), s*(p.y-q.y)  )); float d2d = -sqrt(d.x)*sign(d.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdMoon2d:{code:"float sdMoon2d( vec3 p_3d, float d, float ra, float rb ) { vec2 p = p_3d.xy; p.y = abs(p.y); float a = (ra*ra - rb*rb + d*d)/(2.0*d); float b = sqrt(max(ra*ra-a*a,0.0)); float d2d; if( d*(p.x*b-p.y*a) > d*d*max(b-p.y,0.0) ) d2d = length(p-vec2(a,b)); else d2d = max( length(p)-ra, -length(p-vec2(d,0))+rb ); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdNgon2d:{code:"float sdNgon2d( in vec3 p_3d, in float r, in float n) { vec2 p = p_3d.xy; float an = 3.141593/n; vec2  acs = vec2(cos(an),sin(an)); float bn = mod(atan(p.y,p.x),2.0*an) - an; p = length(p)*vec2(cos(bn),abs(sin(bn))); p -= r*acs; p.y += clamp(-p.y, 0.0, r*acs.y); float d2d = length(p)*sign(p.x); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdOctogon2d:{code:"float sdOctogon2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(-0.92387953, 0.38268343, 0.41421356); p = abs(p); p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= vec2(clamp(p.x,-k.z*r,k.z*r),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdParallelogram2d:{code:"float sdParallelogram2d( in vec3 p_3d, float wi, float he, float sk ) { vec2 p = p_3d.xy; vec2 e = vec2(sk,he); p = (p.y<0.0)?-p:p; vec2 q = p - e*clamp(dot(p,e)/dot(e,e),0.0,1.0); q -= vec2(clamp(q.x,-wi,wi),0.0); float d2d = length(q)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdPentagon2d:{code:"float sdPentagon2d( in vec3 p_3d, in float r ) { vec2 p = p_3d.xy; const vec3 k = vec3(0.80901699, 0.58778525, 0.72654253); p.x = abs(p.x); p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y); p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y); p -= vec2(clamp(p.x,-r*k.z,r*k.z),r); float d2d = length(p)*sign(p.y); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdPie2d:{code:"float sdPie2d( in vec3 p_3d, in vec2 c, in float r ){ vec2 p = p_3d.xy; p.x = abs(p.x); float l = length(p) - r; float m = length(p-c*clamp(dot(p,c),0.0,r)); float d2d = max(l,m*sign(c.y*p.x-c.x*p.y)); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdRhombus2d:{code:"float sdRhombus2d( in vec3 p_3d, in vec2 b ) { vec2 p = p_3d.xy; p=abs(p); float h = clamp( (-2.0*ndot(p,b) + ndot(b,b))/dot(b,b), -1.0, 1.0 ); vec2 d = p - 0.5*b*vec2(1.0-h,1.0+h); float d2d = length(d)*sign( p.x*b.y + p.y*b.x - b.x*b.y ); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude","ndot"]},sdRoundedbox2d:{code:"float sdRoundedbox2d( in vec3 p_3d, in vec2 b, in vec4 r ) { vec2 p = p_3d.xy; r.xy = (p.x>0.0)?r.xy : r.zw; r.x  = (p.y>0.0)?r.x  : r.y; vec2 q = abs(p)-b+r.x; float d2d = min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdRoundedx2d:{code:"float sdRoundedx2d( in vec3 p_3d, in float w, in float r ) { vec2 p = p_3d.xy; p = abs(p); float d2d = length(p-min(p.x+p.y,w)*0.5) - r; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},sdSegment2d:{code:"float sdSegment2d(in vec3 p_3d, in vec2 a, in vec2 b){vec2 p=p_3d.xy;vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);float d2d=length(pa-ba*h);return extrude(d2d,p_3d.z,0.1);}",dependencies:["extrude"]},sdStar2d:{code:"float sdStar2d(in vec3 p_3d, in float r, in float n, in float m) { vec2 p = p_3d.xy; float an = 3.141593/n; float en = 3.141593/m; vec2  acs = vec2(cos(an),sin(an)); vec2  ecs = vec2(cos(en),sin(en)); float bn = mod(atan(p.x,-p.y),2.0*an) - an; p = length(p)*vec2(cos(bn),abs(sin(bn))); p -= r*acs; p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y); float d2d = length(p)*sign(p.x); return extrude(d2d, p_3d.z, 0.1);}",dependencies:["extrude"]},sdTrapezoid2d:{code:"float sdTrapezoid2d( in vec3 p_3d, float r1, float r2, float he ) { vec2 p = p_3d.xy; vec2 k1 = vec2(r2,he); vec2 k2 = vec2(r2-r1,2.0*he); p.x = abs(p.x); vec2 ca = vec2(p.x-min(p.x,(p.y<0.0)?r1:r2), abs(p.y)-he); vec2 cb = p - k1 + k2*clamp( dot(k1-p,k2)/dot2(k2), 0.0, 1.0 ); float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0; float d2d = s*sqrt( min(dot2(ca),dot2(cb)) ); return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude","dot2"]},sdTriangle2d:{code:"float sdTriangle2d( in vec3 p_3d, in vec2 p0, in vec2 p1, in vec2 p2 ) { vec2 p = p_3d.xy; vec2 e0 = p1-p0, e1 = p2-p1, e2 = p0-p2; vec2 v0 = p -p0, v1 = p -p1, v2 = p -p2; vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 ); vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 ); vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 ); float s = sign( e0.x*e2.y - e0.y*e2.x ); float d2d = sqrt(min(min(dot2(pq0),dot2(pq1)),dot2(pq2))) * s; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude","dot2"]},sdVesica2d:{code:"float sdVesica2d( vec3 p_3d, float w, float h ) { vec2 p = p_3d.xy; p = abs(p); float b = sqrt(w*w-h*h); float d2d = ((p.y-h)*b>p.x*h) ? length(p-vec2(0.0,h)) : length(p-vec2(-b,0))-w; return extrude(d2d, p_3d.z, 0.1); }",dependencies:["extrude"]},opU:{code:"vec2 opU( vec2 d1, vec2 d2 ) { return (d1.x<d2.x) ? d1 : d2; }",dependencies:[]},opS:{code:"vec2 opS( vec2 d1, vec2 d2, float k ) { float h = clamp(0.5+0.5*(d2.x-d1.x)/k,0.0,1.0); float d=mix(d2.x,d1.x,h)-k*h*(1.0-h); float m=mix(d2.y, d1.y,h); return vec2(d, m); }",dependencies:[]},opD:{code:"vec2 opD( vec2 d1, vec2 d2 ) { return (d1.x>-d2.x) ? d1 : vec2(-d2.x, d2.y); }",dependencies:[]},opI:{code:"vec2 opI( vec2 d1, vec2 d2 ) { return (d1.x>d2.x) ? d1 : d2; }",dependencies:[]},opXor:{code:"vec2 opXor(vec2 d1, vec2 d2) { float d=max(min(d1.x,d2.x),-max(d1.x,d2.x)); return vec2(d,(d1.x<d2.x)?d1.y:d2.y);}",dependencies:[]},opSS:{code:"vec2 opSS(vec2 d1,vec2 d2,float k){float h=clamp(0.5-0.5*(d2.x+d1.x)/k,0.0,1.0);float d=mix(d2.x,-d1.x,h)+k*h*(1.0-h);float m=mix(d2.y,d1.y,h);return vec2(d,m);}",dependencies:[]},opSI:{code:"vec2 opSI(vec2 d1,vec2 d2,float k){float h=clamp(0.5-0.5*(d2.x-d1.x)/k,0.0,1.0);float d=mix(d2.x,d1.x,h)+k*h*(1.0-h);float m=mix(d2.y,d1.y,h);return vec2(d,m);}",dependencies:[]},opRound:{code:"vec2 opRound(vec2 d, float r) { return vec2(d.x - r, d.y); }",dependencies:[]},opPipe:{code:"vec2 opPipe(vec2 d1, vec2 d2, float r) { return vec2(length(vec2(d1.x, d2.x)) - r, opU(d1, d2).y); }",dependencies:["opU"]},opEngrave:{code:"vec2 opEngrave(vec2 d1, vec2 d2, float r) { return vec2(max(d1.x, d2.x - r), opU(d1, d2).y); }",dependencies:["opU"]},opGroove:{code:"vec2 opGroove(vec2 d1, vec2 d2, float r) { return vec2(max(d1.x, min(d2.x, -d2.x + r)), opU(d1, d2).y); }",dependencies:["opU"]},opTongue:{code:"vec2 opTongue(vec2 d1, vec2 d2, float r) { return vec2(min(d1.x, max(d2.x, -d2.x + r)), opU(d1, d2).y); }",dependencies:["opU"]},opStairs:{code:"vec2 opStairs( vec2 d1, vec2 d2, float r, float n ) { float s=r/n; float u=d2.x-r; return opU(d1,vec2(min(d2.x,0.5*(u+d1.x+abs(mod(u-d1.x,2.0*s)-s))),d2.y));}",dependencies:["opU"]},opTx:{code:"vec3 opTx( vec3 p, vec3 t ) { return p-t; }",dependencies:[]},opElongate:{code:"vec3 opElongate( vec3 p, vec3 h ) { return p - clamp( p, -h, h ); }",dependencies:[]},rotationMatrix:{code:"mat3 rotationMatrix(vec3 axis, float angle) { axis = normalize(axis); float s=sin(angle); float c=cos(angle); float oc=1.0-c; return mat3(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s, oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s, oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c); }",dependencies:[]},opRot:{code:"vec3 opRot( vec3 p, vec3 axis, float angle) { return inverse(rotationMatrix(axis, angle)) * p; }",dependencies:["rotationMatrix"]},opRep:{code:"vec3 opRep( vec3 p, vec3 spacing ) { return mod(p,spacing)-0.5*spacing; }",dependencies:[]},opMirrorRepeat:{code:"vec3 opMirrorRepeat(vec3 p, vec3 s){vec3 id=round(p/s);vec3 r=p-s*id;if(mod(id.x,2.)>0.5)r.x=-r.x;if(mod(id.y,2.)>0.5)r.y=-r.y;if(mod(id.z,2.)>0.5)r.z=-r.z;return r;}",dependencies:[]},opLimitedRepeat:{code:"vec3 opLimitedRepeat(vec3 p,vec3 s,vec3 l){return p-s*clamp(round(p/s),-l,l);}",dependencies:[]},opRectangularRepeat:{code:"vec3 opRectangularRepeat(vec3 p,vec2 s,float spacing){vec2 q=p.xy;q=abs(q/spacing)-(s*0.5-0.5);if(q.x<q.y)q=q.yx;q.y-=min(0.,round(q.y));p.xy=q*spacing;return p;}",dependencies:[]},opTwist:{code:"vec3 opTwist(vec3 p,float k){float c=cos(k*p.y);float s=sin(k*p.y);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xz,p.y);return q;}",dependencies:[]},opBend:{code:"vec3 opBend(vec3 p,float k){float c=cos(k*p.x);float s=sin(k*p.x);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xy,p.z);return q;}",dependencies:[]},opMirror:{code:"vec3 opMirror( vec3 p ){ return abs(p); }",dependencies:[]},opMirrorX:{code:"vec3 opMirrorX(vec3 p) { p.x = abs(p.x); return p; }",dependencies:[]},opMirrorY:{code:"vec3 opMirrorY(vec3 p) { p.y = abs(p.y); return p; }",dependencies:[]},opMirrorZ:{code:"vec3 opMirrorZ(vec3 p) { p.z = abs(p.z); return p; }",dependencies:[]},opOnion:{code:"vec2 opOnion(vec2 d, float thickness) { return vec2(abs(d.x) - thickness, d.y); }",dependencies:[]},opHalve:{code:"vec2 opHalve(vec2 d, vec3 p, float dir) { float ps=0.;if(dir==0.)ps=p.y;else if(dir==1.)ps=-p.y;else if(dir==2.)ps=-p.x;else if(dir==3.)ps=p.x;return vec2(max(d.x,ps),d.y);}",dependencies:[]},getNormal:{code:"vec3 getNormal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}",dependencies:[]},calcSoftshadow:{code:"float calcSoftshadow(in vec3 ro,in vec3 rd,float k){float res=1.;float t=.01;for(int i=0;i<32;i++){float h=map(ro+rd*t).x;if(h<.001)return 0.;res=min(res,k*h/t);t+=h;}return res;}",dependencies:[]},post_invert:{code:"vec3 post_invert(vec3 c, vec2 uv) { return 1.0 - c; }",dependencies:[]},post_brightness:{code:"vec3 post_brightness(vec3 c, vec2 uv, float amount) { return c + amount; }",dependencies:[]},post_contrast:{code:"vec3 post_contrast(vec3 c, vec2 uv, float amount) { return (c - 0.5) * amount + 0.5; }",dependencies:[]},post_edge:{code:"vec3 post_edge(vec3 c, vec2 uv) { vec3 dx = dFdx(c); vec3 dy = dFdy(c); float edge = length(vec3(length(dx), length(dy), 0.0)); return vec3(smoothstep(0.01, 0.05, edge)); }",dependencies:[]}},getTopologicallySortedNames=e=>{const o=[],s=new Set,c=new Set,p=u=>{if(s.has(u))return;if(c.has(u)){console.warn(`Circular dependency detected in GLSL library: ${u}`);return}const f=glslLibrary[u];f&&(c.add(u),f.dependencies.forEach(h=>p(h)),c.delete(u),s.add(u),o.push(u))};return Array.from(e).sort().forEach(p),o},getTransitiveDependencies=e=>{const o=new Set,s=[...e];for(;s.length>0;){const c=s.pop();if(o.has(c))continue;o.add(c);const p=glslLibrary[c];p&&s.push(...p.dependencies)}return o},scanExpressionForDependencies=(e,o)=>{if(e)for(const s in glslLibrary)new RegExp(`\\b${s}\\b`).test(e)&&o.add(s)},resolveDependencies=e=>getTopologicallySortedNames(e).map(o=>{var s;return(s=glslLibrary[o])==null?void 0:s.code}).filter(Boolean).join(`

`),buildNodeList=e=>{const o=[],s=new Set,c=p=>{!p||s.has(p)||(s.add(p),p.children.forEach(c),o.push(p))};return c(e),o},combinatorOpToGLSLFunc={union:"opU",difference:"opD",intersection:"opI",xor:"opXor",smoothUnion:"opS",smoothDifference:"opSS",smoothIntersection:"opSI",pipe:"opPipe",engrave:"opEngrave",groove:"opGroove",tongue:"opTongue",stairsUnion:"opStairs",stairsIntersection:"opStairs",stairsDifference:"opStairs"},transformationOpToGLSLFunc={translate:"opTx",rotate:"opRot",repeat:"opRep",mirrorRepeat:"opMirrorRepeat",limitedRepeat:"opLimitedRepeat",rectangularRepeat:"opRectangularRepeat",mirror:"opMirror",mirrorX:"opMirrorX",mirrorY:"opMirrorY",mirrorZ:"opMirrorZ",bend:"opBend",twist:"opTwist",elongate:"opElongate"},sdfParamOrder={sdPlane:["normal","distance"],sdCapsule:["start","end","radius"],sdRoundbox:["size","radius"],sdCone:["dimensions"],sdCylinder:["dimensions"],sdHexprism:["dimensions"],sdTriprism:["dimensions"],sdTorus:["radii"],sdTorus82:["radii"],sdTorus88:["radii"],sdMandelbox:["scale","iterations","folding"],sdPathSDF:["radius"],sdArc2d:["sc","ra","rb"],sdBox2d:["size"],sdCircle2d:["radius"],sdCross2d:["size","radius"],sdEllipse2d:["size"],sdEquilateralTriangle2d:["radius"],sdHeart2d:[],sdHexagon2d:["radius"],sdHexagram2d:["radius"],sdIsoscelesTriangle2d:["size"],sdMoon2d:["d","ra","rb"],sdOctogon2d:["radius"],sdParallelogram2d:["width","height","skew"],sdPentagon2d:["radius"],sdPie2d:["c","radius"],sdRhombus2d:["size"],sdRoundedbox2d:["size","radii"],sdRoundedx2d:["width","radius"],sdSegment2d:["a","b"],sdStar2d:["radius","n","m"],sdTrapezoid2d:["r1","r2","height"],sdTriangle2d:["p0","p1","p2"],sdVesica2d:["width","height"],sdNgon2d:["radius","n"]},transformationOpParamOrder={rotate:["axis","angle"],scale:["amount"],translate:["amount"],repeat:["spacing"],mirrorRepeat:["spacing"],limitedRepeat:["spacing","limits"],rectangularRepeat:["size","spacing"],bend:["amount"],twist:["amount"],elongate:["h"]},processProps=(e,o,s)=>{const c=o?o.map(p=>e[p]):Object.values(e);return c.forEach(p=>{(p==null?void 0:p.type)==="glsl_expression"&&scanExpressionForDependencies(p.code,s)}),c.map(toGLSL).join(", ")};function buildSDFShaderParts(e){const o=buildNodeList(e),s=new Map(o.map((v,S)=>[v,S])),c=new Set,p=[],u=[],f=o.map((v,S)=>{const E=v.material;if((E==null?void 0:E.type)==="image_material"){c.add("getNormal");const q=`image_material_${S+1}`,R=transpileGLSL(E.quotation);return scanExpressionForDependencies(R,c),u.push(`
vec4 ${q}(vec3 p, vec2 uv) {
    // p, t, etc are available here from the transpiler's special vars
    return ${R};
}`),`
    if (matId == ${S+1}) {
        vec3 n = abs(getNormal(p));
        n /= dot(n, vec3(1.0));
        vec4 color = vec4(0.0);
        color += ${q}(p, p.yz) * n.x;
        color += ${q}(p, p.xz) * n.y;
        color += ${q}(p, p.xy) * n.z;
        return color.xyz;
    }`}const _=toGLSL(E);return scanExpressionForDependencies(_,c),_?`if (matId == ${S+1}) return ${_};`:`if (matId == ${S+1}) return vec3(0.8);`}).join(`
    `),h=`
${u.join(`
`)}

vec3 getMaterialColor(int matId, float u_time, vec3 p) {
    if (matId == 0) return vec3(0.8);
    ${f}
    return vec3(0.8);
}`,g=o.map((v,S)=>{const E=v.children.map(q=>s.get(q));let _="";switch(v.type){case"geometry":{const R=`sd${v.op.charAt(0).toUpperCase()+v.op.slice(1)}`;if(R==="sdPathSDF"){const L=v.props.path;if(L&&L.type==="glsl_expression"){scanExpressionForDependencies(L.code,c);const I=L.code.replace(/u_time/g,"t");p.some(W=>W.startsWith("vec3 path(float t)"))||p.push(`vec3 path(float t) { return ${I}; }`),p.some(W=>W.startsWith("float sdPathSDF"))||p.push("float sdPathSDF(vec3 p, float r) { vec3 path_pos = path(p.z); return length(p.xy - path_pos.xy) - r; }")}}else c.add(R);v.op.endsWith("2d")&&c.add("extrude");const B=sdfParamOrder[R],z=processProps(v.props,B,c);_=`return vec2(${R}(p${z?", "+z:""}), ${toGLSL(S+1)});`;break}case"combinator":{const q=combinatorOpToGLSLFunc[v.op];q&&c.add(q),(v.op.startsWith("round")||v.op.startsWith("chamfer"))&&(c.add("opRound"),c.add(combinatorOpToGLSLFunc[v.op.replace("round","").replace("chamfer","").toLowerCase()]||"opU"));const R=processProps(v.props,void 0,c),B=`map_${E[0]}(p)`,z=`map_${E[1]}(p)`;let L;switch(v.op){case"union":L=`opU(${B}, ${z})`;break;case"difference":L=`opD(${B}, ${z})`;break;case"intersection":L=`opI(${B}, ${z})`;break;case"xor":L=`opXor(${B}, ${z})`;break;case"smoothUnion":L=`opS(${B}, ${z}, ${R})`;break;case"smoothDifference":L=`opSS(${B}, ${z}, ${R})`;break;case"smoothIntersection":L=`opSI(${B}, ${z}, ${R})`;break;case"roundUnion":case"chamferUnion":L=`opRound(opU(${B}, ${z}), ${R})`;break;case"roundIntersection":case"chamferIntersection":L=`opRound(opI(${B}, ${z}), ${R})`;break;case"roundDifference":case"chamferDifference":L=`opRound(opD(${B}, ${z}), ${R})`;break;case"pipe":L=`opPipe(${B}, ${z}, ${R})`;break;case"engrave":L=`opEngrave(${B}, ${z}, ${R})`;break;case"groove":L=`opGroove(${B}, ${z}, ${R})`;break;case"tongue":L=`opTongue(${B}, ${z}, ${R})`;break;case"stairsUnion":case"stairsIntersection":case"stairsDifference":L=`opStairs(${B}, ${z}, ${R})`;break;default:L=`opU(${B}, ${z})`;break}_=`return ${L};`;break}case"transformation":{if(v.op==="transform"){const z=v.props.matrix;(z==null?void 0:z.type)==="glsl_expression"&&scanExpressionForDependencies(z.code,c);const L=toGLSL(z);let I=!1;(z==null?void 0:z.type)==="glsl_expression"?I=z.returnType==="mat3":isMatrix(z)&&(I=z.length===3);const W=I?`inverse(${L}) * p`:`(inverse(${L}) * vec4(p, 1.0)).xyz`;_=`return map_${E[0]}(${W});`;break}if(v.op==="polarRepeat"){const z=toGLSL(v.props.count);scanExpressionForDependencies(z,c);const L=E[0];_=`
                        float angle = 6.2831853 / ${z};
                        float a = atan(p.y, p.x);
                        float r = length(p.xy);
                        a = mod(a + angle*0.5, angle) - angle*0.5;
                        vec3 p_rep = vec3(r * cos(a), r * sin(a), p.z);
                        return map_${L}(p_rep);
                    `;break}const q=transformationOpToGLSLFunc[v.op];q&&c.add(q);const R=processProps(v.props,transformationOpParamOrder[v.op],c);if(v.op==="scale"){_=`vec2 res = map_${E[0]}(p / ${R}); res.x *= ${R}; return res;`;break}const B=`${q}(p${R?", "+R:""})`;_=`return map_${E[0]}(${B});`;break}case"alteration":{const q=`op${v.op.charAt(0).toUpperCase()+v.op.slice(1)}`;glslLibrary[q]&&c.add(q);const R=processProps(v.props,void 0,c);let B=`map_${E[0]}(p)`;v.op==="halve"?_=`return ${q}(${B}, p${R?", "+R:""});`:v.op==="displace"?_=`vec2 res = ${B}; res.x += ${R}; return res;`:_=`return ${q}(${B}${R?", "+R:""});`;break}}return`vec2 map_${S}(vec3 p) { ${_} }`}).join(`
`),m=[...p,g].join(`

`),b=`vec2 map(vec3 p) { return map_${o.length-1}(p); }`;return{materialFunction:h,mapFunctions:m,mainMapFunction:b,directDeps:c}}const generateImageShaderFromQuotation=e=>{const o=new Set,s=transpileGLSL(e);return scanExpressionForDependencies(s,o),`#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

${resolveDependencies(o)}

void main() {
    vec2 p_coord = gl_FragCoord.xy;
    vec2 uv = p_coord / u_resolution.xy;
    fragColor = ${s};
}
`},generate2dSDFShader=e=>{const{materialFunction:o,mapFunctions:s,mainMapFunction:c,directDeps:p}=buildSDFShaderParts(e);return`#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);

${resolveDependencies(p)}

${o}

${s}

${c}


void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    vec3 p = vec3(st * (5.0 / 1.5), 0.0); // Scale to match the default 3D camera's perspective at z=0

    vec2 res = map(p);
    float dist = res.x;
    float matId = res.y;

    vec3 color = getMaterialColor(int(matId), u_time, p);
    
    // Antialiased fill
    float fill = 1.0 - smoothstep(0.0, 2.0 / u_resolution.y, dist);

    // Optional outline
    float outline = smoothstep(0.0, 4.0 / u_resolution.y, abs(dist)) - fill;

    vec3 finalColor = color * fill + vec3(0.2) * outline;

    fragColor = vec4(finalColor, 1.0);
}
    
`},generateMarchingShader=(e,o)=>{var L,I,W,Y,F,te,V,ee,oe;const{materialFunction:s,mapFunctions:c,mainMapFunction:p,directDeps:u}=buildSDFShaderParts(e.graph),f=((L=e.renderParams)==null?void 0:L.iterations)??o*10,h=((I=e.renderParams)==null?void 0:I.near)??.001,g=((W=e.renderParams)==null?void 0:W.far)??100;scanExpressionForDependencies(toGLSL((Y=e.camera)==null?void 0:Y.pos),u),scanExpressionForDependencies(toGLSL((F=e.camera)==null?void 0:F.target),u),e.lights.forEach(K=>{scanExpressionForDependencies(toGLSL(K.pos),u),scanExpressionForDependencies(toGLSL(K.color),u)}),scanExpressionForDependencies(toGLSL(e.background),u),scanExpressionForDependencies(toGLSL((te=e.fog)==null?void 0:te.color),u),scanExpressionForDependencies(toGLSL((V=e.fog)==null?void 0:V.strength),u);const m=new Set;e.lights.length>0&&m.add("getNormal"),e.shadow&&m.add("calcSoftshadow"),e.post&&e.post.length>0&&e.post.forEach(K=>u.add(`post_${K.op}`));const b=getTransitiveDependencies(m),v=new Set;for(const K of u)b.has(K)||v.add(K);const S=resolveDependencies(v),E=resolveDependencies(b),_=(ee=e.camera)!=null&&ee.pos?toGLSL(e.camera.pos):"vec3(0.0, 0.0, 5.0)",q=(oe=e.camera)!=null&&oe.target?toGLSL(e.camera.target):"vec3(0.0, 0.0, 0.0)";let R=e.lights.map((K,P)=>`
        vec3 lightPos_${P} = ${toGLSL(K.pos)||"vec3(2.0, 2.0, 5.0)"};
        vec3 lightColor_${P} = ${toGLSL(K.color)||"vec3(1.0)"};
        float lightAtten_${P} = ${toGLSL(K.attenuation)||"0.1"};
    `).join(""),B=e.lights.map((K,P)=>`
        {
            vec3 lightDir = normalize(lightPos_${P} - p);
            float dif = max(dot(nor, lightDir), 0.0);
            float spe = pow(max(dot(reflect(-rd, nor), lightDir), 0.0), 32.0);
            
            float shadowFactor = 1.0;
            ${e.shadow?`shadowFactor = calcSoftshadow(p + nor * 0.001, lightDir, ${toGLSL(e.shadow.diffuseness)});`:""}

            float dist = length(lightPos_${P} - p);
            float atten = 1.0 / (1.0 + dist * dist * lightAtten_${P});
            
            totalColor += (dif * matColor * shadowFactor + vec3(spe * 0.5)) * lightColor_${P} * atten;
        }
    `).join("")||"totalColor = matColor * 0.5;",z="";return e.post&&e.post.length>0&&(z=`
    vec3 finalColor = col;
    ${e.post.map(K=>{const P=processProps(K.props,void 0,u);return`finalColor = post_${K.op}(finalColor, st${P?", "+P:""});`}).join(`
    `)}
        `),`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;

out vec4 fragColor;

vec2 map(vec3 p);

${S}

// Material Definitions
${s}

// Scene Definition
${c}
${p}

${E}

vec3 render(vec3 ro, vec3 rd, float u_time) {
    float t = 0.0;
    vec3 col = ${toGLSL(e.background)||"vec3(0.0)"};
    
    for (int i = 0; i < ${Math.floor(f)}; i++) {
        vec3 p = ro + rd * t;
        vec2 d = map(p);
        
        if (d.x < ${toGLSL(h)}) {
            vec3 nor = vec3(0.0);
            ${e.lights.length>0?"nor = getNormal(p);":""}
            vec3 matColor = getMaterialColor(int(d.y), u_time, p);
            vec3 totalColor = vec3(0.0);
            
            ${R}
            ${B}

            col = totalColor;
            break;
        }
        
        if (t > ${toGLSL(g)}) {
            break;
        }
        t += d.x;
    }

    ${e.fog?`
        float fogAmount = 1.0 - exp(-t * (${toGLSL(e.fog.strength)||"0.1"}));
        col = mix(col, ${toGLSL(e.fog.color)||"vec3(0.5)"}, fogAmount);
    `:""}

    return col;
}

void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    
    vec3 ro = ${_};
    vec3 ta = ${q};
    
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = cross(uu, ww);
    vec3 rd = normalize(st.x * uu + st.y * vv + 1.5 * ww);
    
    vec3 col = render(ro, rd, u_time);

    ${z}
    
    fragColor = vec4(${e.post&&e.post.length>0?"finalColor":"col"}, 1.0);
}
`};function generatePathShader(e,o,s){var B,z,L;const{materialFunction:c,mapFunctions:p,mainMapFunction:u,directDeps:f}=buildSDFShaderParts(e.graph);scanExpressionForDependencies(o.code,f),f.add("opSS");const g=getTransitiveDependencies(new Set),m=new Set;for(const I of f)g.has(I)||m.add(I);const b=resolveDependencies(m),v=resolveDependencies(g),S=o.code.replace(/u_time/g,"t"),E=((B=e.renderParams)==null?void 0:B.iterations)??128,_=((z=e.renderParams)==null?void 0:z.near)??.001,q=((L=e.renderParams)==null?void 0:L.far)??50;let R="vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.5 * ww);";return s&&(scanExpressionForDependencies(s.code,f),R=`
    vec2 look = ${s.code};
    vec3 rd = normalize((uv.x + look.x * 0.5) * uu + (uv.y - look.y * 0.5) * vv + 1.5 * ww);`),`#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);
vec2 map_combined(vec3 p, float time);

${b}
${c}
${p}
${u}
${v}

// --- Path Function (from user quotation) ---
vec3 path(float t) {
    return ${S};
}

// The main Signed Distance Function that combines the world and the track.
vec2 map_combined(vec3 p, float time) {
    vec2 world_res = map(p);

    // Iteratively find a better estimate for t on the path closest to p
    float t_est = time;
    for(int i=0; i<4; i++) {
        vec3 path_pos = path(t_est);
        vec3 path_tangent = normalize(path(t_est + 0.01) - path_pos);
        float proj = dot(p - path_pos, path_tangent);
        t_est += proj * 0.5; // Move halfway to the projected point
    }

    vec3 closest_point = path(t_est);

    // SDF for a circular tunnel around the path
    float tunnel_radius = 0.8;
    float tunnel_dist = length(p - closest_point) - tunnel_radius;
    vec2 tunnel_res = vec2(tunnel_dist, -1.0); // Tunnel has no material

    // Subtract the tunnel from the world.
    return opSS(tunnel_res, world_res, 0.2);
}

vec3 getNormalTour(vec3 p, float time) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map_combined(p + e.xyy, time).x - map_combined(p - e.xyy, time).x,
        map_combined(p + e.yxy, time).x - map_combined(p - e.yxy, time).x,
        map_combined(p + e.yyx, time).x - map_combined(p - e.yyx, time).x
    ));
}

vec3 trace(vec3 ro, vec3 rd, float time) {
    float t = 0.0;
    for (int i = 0; i < ${Math.floor(E)}; i++) {
        vec3 p = ro + t * rd;
        vec2 res = map_combined(p, time);
        float d = res.x;
        if (d < ${toGLSL(_)}) {
            // Get material color from user's SDF definitions
            vec3 matColor = getMaterialColor(int(res.y), u_time, p);

            // --- Simple Headlight Lighting (Ambient + Diffuse) ---
            vec3 nor = getNormalTour(p, time);
            vec3 lightPos = ro + vec3(0.0, 0.2, 0.5); // Headlight attached to camera
            vec3 lightDir = normalize(lightPos - p);
            
            float dif = max(dot(nor, lightDir), 0.0);
            vec3 ambient = vec3(0.2);
            vec3 lighting = ambient + matColor * dif;
            
            return lighting;
        }
        if (t > ${toGLSL(q)}) break;
        t += d * 0.5;
    }

    return vec3(0.0, 0.0, 0.05); // Background color
}

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    float time = u_time * 0.5;
    
    vec3 ro = path(time);
    vec3 ta = path(time + 0.1);

    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = cross(uu, ww);
    ${R}

    vec3 col = trace(ro, rd, time);
    fragColor = vec4(col, 1.0);
}
`}const isSceneObject$a=e=>e&&typeof e=="object"&&e.type==="scene",isImageMaterialObject=e=>e&&typeof e=="object"&&e.type==="image_material",render={definition:{exec:function*(e){const o=e.length>0&&typeof e[e.length-1]=="number"?e.pop():10,s=e.pop();if(isSceneObject$a(s)){const c=generateMarchingShader(s,o);e.push({type:"shader",code:c})}else if(isMarchingObject(s)){const c=generate2dSDFShader(s);e.push({type:"shader",code:c})}else if(isImageMaterialObject(s)){const c=generateImageShaderFromQuotation(s.quotation);e.push({type:"shader",code:c})}else throw new Error("render expects a scene, sdf, or image object.")},description:"Renders a 3D scene, an SDF object, or a 2D image shader into a final visual. When rendering an SDF object directly, it produces a 2D cross-section at z=0. For 3D scenes, it raymarches and optionally takes a quality number (1-100) from the stack.",effect:"[scene|sdf|image I_quality?] -> [shader]"},examples:[{code:"1 sphere march render",assert:e=>e[0].type==="shader"&&e[0].code.includes("sdSphere")},{code:"1 sphere march 5 render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("i < 50")}},{code:"0.5 circle2d render",assert:e=>e[0].type==="shader"&&e[0].code.includes("sdCircle2d")&&!e[0].code.includes("getNormal"),expectedDescription:"A 2D shader object rendering a circle."},{code:"0.5 sphere render",assert:e=>e[0].type==="shader"&&e[0].code.includes("sdSphere")&&!e[0].code.includes("getNormal"),expectedDescription:"A 2D shader object rendering a cross-section of a sphere."}]},isSceneObject$9=e=>e&&typeof e=="object"&&e.type==="scene",light={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),p={type:"light",pos:e.pop(),color:s,attenuation:o};if(e.length>0&&isSceneObject$9(e[e.length-1])){const u=e.pop();u.lights.push(p),e.push(u)}else e.push(p)},description:"Creates a light object and adds it to a scene if one is present on the stack. If no scene is present, it just creates the light object. Syntax: `[scene?] pos color attenuation light -> [scene|light]`",effect:"[scene? vec3 (vec3|color) F] -> [scene|light]"},examples:[{code:'1 1 1 vec3 "white" 0.1 light',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="light"},expectedDescription:"A light object on the stack."},{code:`
1 sphere march
  # Red light from the right
  2 1 0 vec3 :red 0.1 light
  # Blue light from the left
  -2 1 0 vec3 :blue 0.1 light
render`,assert:e=>e[0].type==="shader"&&e[0].code.includes("lightPos_0")&&e[0].code.includes("lightPos_1"),expectedDescription:"A shader with two colored lights added directly to the scene."},{code:`
# Define a reusable light
(2 1 4 vec3 "yellow" 0.1 light) mylight =>

# Use it on two different scenes
1 sphere march mylight
0.5 box march mylight
`,assert:e=>e.length===2&&isSceneObject$9(e[0])&&isSceneObject$9(e[1])&&e[0].lights.length===1&&e[1].lights.length===1,expectedDescription:"Two scene objects, each with one light."},{code:`
1 sphere march
  # Light position orbits the sphere
  ( t sin 3 *   2.0   t cos 3 *   vec3 ) glsl
  # Light color cycles through the rainbow
  1.0 1.2 1.4 wavecolor
  # Attenuation
  0.05
  light
render`,assert:e=>e[0].type==="shader"&&e[0].code.includes("lightPos_0 = vec3((sin(u_time) * 3.0), 2.0, (cos(u_time) * 3.0))")&&e[0].code.includes("abs(sin(u_time * 1.0))"),expectedDescription:"A shader with an animated light orbiting a sphere."}]},isSceneObject$8=e=>e&&typeof e=="object"&&e.type==="scene",background={definition:{exec:function*(e){const o=e.pop();if(!isSceneObject$8(o))throw new Error("background operator expects a scene object.");const s=e.pop();o.background=s,e.push(o)},description:"Sets the background color of a scene. `(vec3_color|color_obj) scene background -> scene`",effect:"[(vec3|color) scene] -> [scene]"},examples:[{code:"0.5 0.6 0.7 vec3 1 sphere march background render",assert:e=>e[0].type==="shader"&&e[0].code.includes("vec3(0.5, 0.6, 0.7)")}]},isSceneObject$7=e=>e&&typeof e=="object"&&e.type==="scene",isGLSLExpression$2=e=>(e==null?void 0:e.type)==="glsl_expression",isVec3=e=>Array.isArray(e)&&e.length===3,camera={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(!isSceneObject$7(c))throw new Error("camera operator expects a scene object.");if(!isVec3(s)&&!isGLSLExpression$2(s))throw new Error("camera operator expects a vec3 or glsl_expression for position.");if(!isVec3(o)&&!isGLSLExpression$2(o))throw new Error("camera operator expects a vec3 or glsl_expression for target.");const p=c.camera||{pos:[0,0,5],speed:1,target:[0,0,0]};c.camera={...p,pos:s,target:o},e.push(c)},description:"Sets the camera position and target for a scene. Position and target can be static `vec3` values or dynamic `glsl_expression` objects for animation. `scene (vec3|glsl_expr)_pos (vec3|glsl_expr)_target camera`",effect:"[scene (vec3|glsl_expr) (vec3|glsl_expr)] -> [scene]"},examples:[{code:"0.8 0.4 0.2 vec3 box march 2 0 6 vec3 0 0 0 vec3 camera render",assert:e=>e[0].type==="shader"&&e[0].code.includes("vec3(2.0, 0.0, 6.0)")},{code:`
# An asymmetric box geometry to show camera movement
0.8 0.4 0.2 vec3 box "yellow" material march

# Animate the camera position to orbit around the origin
(
    t 0.5 * sin 5 * # x-coordinate
    2.0               # y-coordinate (height)
    t 0.5 * cos 5 * # z-coordinate
    vec3
) glsl

# Keep the camera pointed at the origin
0 0 0 vec3

# Apply the dynamic camera settings
camera

# Add a light that moves with the camera
(
    t 0.5 * sin 6 * # x
    2.5               # y
    t 0.5 * cos 6 * # z
    vec3
) glsl "white" 0.1 light

# Render the scene
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("ro = vec3((sin((u_time * 0.5)) * 5.0), 2.0, (cos((u_time * 0.5)) * 5.0));")},expectedDescription:"A shader object with a camera orbiting a box."},{code:`
# A central object to look at
0.8 0.2 vec2 torus
(p 5 *) glsl curl material
march

# Define the camera position using normalized mouse coordinates to orbit the object
(
    # X position: 5.0 * sin(phi) * cos(theta)
    5.0 mousey height / 3.14 * sin * mousex width / 6.28 * cos *

    # Y position: 5.0 * cos(phi) - clamped to prevent flipping
    5.0 mousey height / 3.14 * 0.1 3.0 clamp cos *

    # Z position: 5.0 * sin(phi) * sin(theta)
    5.0 mousey height / 3.14 * sin * mousex width / 6.28 * sin *
    
    vec3
) glsl

# The camera always looks at the origin
0 0 0 vec3

camera
2 2 4 vec3 "white" 0.1 light
render`,assert:e=>e[0].type==="shader"&&e[0].code.includes("u_mouse"),expectedDescription:"A shader object with a camera that orbits a central object based on mouse position."},{code:`
# A central object to look at
0.8 0.2 vec2 torus :red material march

# The camera position is controlled by where the mouse is held down
(
    (mousedx width / 0.5 -) 10.0 * # x from -5 to 5
    3.0                            # y is static
    (mousedy height / 0.5 -) 10.0 * # z from -5 to 5
    vec3
) glsl

# The camera always looks at the origin
0 0 0 vec3

camera
2 2 4 vec3 "white" 0.1 light
render`,assert:e=>e[0].type==="shader"&&e[0].code.includes("u_moused"),expectedDescription:"A shader object where clicking and dragging moves the camera position on the XZ plane."}]},isSceneObject$6=e=>e&&typeof e=="object"&&e.type==="scene",fog={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(!isSceneObject$6(c))throw new Error("fog operator expects a scene object.");c.fog={strength:s,color:o},e.push(c)},description:"Adds distance fog to a scene. `scene F_strength (vec3_color|color_obj) fog -> scene`",effect:"[scene F (vec3|color)] -> [scene]"},examples:[{code:"0 1 0 vec3 1.0 plane march 0.25 0.8 0.8 0.95 vec3 fog render",assert:e=>e[0].type==="shader"&&e[0].code.includes("mix(col, vec3(0.8, 0.8, 0.95)")},{code:"1 sphere march 0.2 0.8 0.8 0.9 vec3 fog render",assert:e=>e[0].type==="shader"&&e[0].code.includes("mix(col, vec3(0.8, 0.8, 0.9)")}]},isSceneObject$5=e=>e&&typeof e=="object"&&e.type==="scene",shadow={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isSceneObject$5(s))throw new Error("shadow operator expects a scene object.");s.shadow={diffuseness:o},e.push(s)},description:"Adds soft shadows to a scene. Higher diffuseness values create harder shadows. `scene F_diffuseness shadow -> scene`",effect:"[scene F] -> [scene]"},examples:[{code:"0.5 sphere 0 1 -2 vec3 translate march 8 shadow render",assert:e=>e[0].type==="shader"&&e[0].code.includes("calcSoftshadow")}]},material={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isMarchingObject(s))throw new Error("material expects an SDF object.");if((o==null?void 0:o.type)!=="color"&&(o==null?void 0:o.type)!=="image_material"&&(o==null?void 0:o.type)!=="glsl_expression"&&typeof o!="string"&&typeof o!="symbol"&&!Array.isArray(o))throw e.push(s,o),new Error("Invalid material type. Expecting a color name, symbol, vec3, color object, or image object.");const c=deepClone(s);c.material=o,e.push(c)},description:'Applies a material to an SDF object. Material can be a preset string ("red", "green", etc.), a preset symbol (:red, :green, etc.), a static `vec3`, a dynamic `color` object, or an `image` object for procedural texturing.',effect:"[sdf material] -> [sdf]"},examples:[{code:'1 sphere "red" material march render',assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a red sphere."},{code:"1 sphere :blue material march render",assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a blue sphere."},{code:"1 sphere 0.2 1.0 0.5 rgb material march render",assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a sphere with a custom RGB color."},{code:"1 sphere 0.6 0.8 1.0 hsv material march render",assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a sphere with a custom HSV color."},{code:"1 sphere 1.0 1.2 1.4 wavecolor material march render",assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a sphere with an animated, pulsing color."},{code:"1 sphere (p xy t +) glsl cnoise material march render",assert:e=>e[0].type==="shader",expectedDescription:"A shader object rendering a sphere with an animated noise material."}]},isSceneObject$4=e=>e&&typeof e=="object"&&e.type==="scene",isPostEffectObject=e=>e&&typeof e=="object"&&e.type==="postEffect",post={definition:{exec:function*(e){const o=[];for(;e.length>0&&isPostEffectObject(e[e.length-1]);)o.unshift(e.pop());const s=e.pop();if(!isSceneObject$4(s))throw new Error("post expects a scene object.");s.post=[...s.post||[],...o],e.push(s)},description:"Adds one or more post-processing effects to a scene. `scene effect1... post -> scene`",effect:"[scene effect...] -> [scene]"},examples:[{code:"1 sphere march invert post render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("post_invert")}}]},isSceneObject$3=e=>e&&typeof e=="object"&&e.type==="scene",iterations={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isSceneObject$3(s))throw new Error("iterations operator expects a scene object.");if(typeof o!="number"||!Number.isInteger(o)||o<1)throw new Error("iterations expects a positive integer count.");s.renderParams={...s.renderParams,iterations:o},e.push(s)},description:"Sets the maximum number of raymarching steps for a scene. Higher values improve quality but decrease performance. `scene count iterations -> scene`",effect:"[scene I] -> [scene]"},examples:[{code:"1 sphere march 50 iterations render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("i < 50;")},expectedDescription:"A shader with 50 iterations."},{code:`
# A detailed mandelbulb fractal
mandelbulb

# Animate rotation
(t 0.2 *) glsl 0 1 0 vec3 rotatesdf

# Apply a procedural material based on position
(p 2 *) glsl curl material

# Set up scene
march

# Add a light
2 2 4 vec3 "white" 0.1 light

# Use a high iteration count for detail
128 iterations

# Render
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("i < 128;")},expectedDescription:"A shader with 128 iterations for a detailed fractal."}]},isSceneObject$2=e=>e&&typeof e=="object"&&e.type==="scene",near={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isSceneObject$2(s))throw new Error("near operator expects a scene object.");if(typeof o!="number"||o<=0)throw new Error("near expects a positive number.");s.renderParams={...s.renderParams,near:o},e.push(s)},description:"Sets the near clip distance for raymarching. This is the minimum distance for a ray to hit a surface. A smaller value allows for more detailed close-ups but can increase rendering time. `scene dist near -> scene`",effect:"[scene F] -> [scene]"},examples:[{code:`
# A highly detailed psychobox fractal
12 psychobox
(p 2 *) glsl curl material
march

# Set a very low near clip distance for high-detail closeups
0.0001 near

# Animate the camera to move slowly toward and away from the fractal
0 0 (t 0.2 * sin 0.5 * 1.5 +) glsl vec3  # Camera position
0 0 0 vec3    # Look at target
camera

# Render
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("if (d.x < 0.0001)")},expectedDescription:"A shader with a near distance of 0.0001 for a detailed close-up shot."}]},isSceneObject$1=e=>e&&typeof e=="object"&&e.type==="scene",far={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isSceneObject$1(s))throw new Error("far operator expects a scene object.");if(typeof o!="number"||o<=0)throw new Error("far expects a positive number.");s.renderParams={...s.renderParams,far:o},e.push(s)},description:"Sets the far clip distance for raymarching. This is the maximum distance a ray will travel. `scene dist far -> scene`",effect:"[scene F] -> [scene]"},examples:[{code:`
# A scene with repeating mandelbulbs
mandelbulb
1.5 1.5 1.5 vec3 repeat
:orange material
march

# Use low iterations for speed
20 iterations

# Set a low far clipping distance
5 far

# Add a light
2 2 4 vec3 :white 0.1 light

# Animate camera moving backward to see objects get clipped by the far plane
0 0 (t) glsl vec3 # camera position
0 0 0 vec3       # look at target
camera

# Render - objects beyond 5 units will be clipped
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("if (t > 5.0)")},expectedDescription:"A shader with a far distance of 5, clipping distant objects."}]},rgb={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push({type:"color",expression:`vec3(${toGLSL(c)}, ${toGLSL(s)}, ${toGLSL(o)})`})},description:"Creates a static color object from RGB values.",effect:"[r g b] -> [color]"},examples:[{code:"2 sphere 255 255 0 rgb material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"}}]},hsv={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push({type:"color",expression:`hsv2rgb(vec3(${toGLSL(c)}, ${toGLSL(s)}, ${toGLSL(o)}))`})},description:"Creates a color object from HSV (Hue, Saturation, Value) values.",effect:"[h s v] -> [color]"},examples:[{code:"0.5 sphere 0.0 1.0 1.0 hsv material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"}}]},wavecolor={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push({type:"color",expression:`vec3(abs(sin(u_time * ${toGLSL(c)})), abs(sin(u_time * ${toGLSL(s)})), abs(sin(u_time * ${toGLSL(o)})))`})},description:"Creates an animated color that oscillates based on time. Takes separate frequencies for R, G, and B channels.",effect:"[r_freq g_freq b_freq] -> [color]"},examples:[{code:"0.5 sphere 1 0 0 wavecolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"}}]},cnoise={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("cnoise expects an input value (e.g., a vec2, vec3, or a glsl_expression object)");e.push({type:"color",expression:`vec3(0.2 + 0.8 * cnoise(${s}))`})},description:"Creates a color from Classic Perlin noise. The noise function's output range of [0.0, 1.0] is remapped to [0.2, 1.0] to create a brighter, more visible material, which is then used for all three (R,G,B) color channels. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",effect:"[vec] -> [color]"},examples:[{code:"1.5 sphere (p xy t +) glsl cnoise material march render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with animated noise."},{code:`
# Warp the noise pattern by swapping the X and Y coordinates
1.0 sphere
(
  p yxz # Swizzle coordinates to warp the texture
  5 *   # Scale the noise for more detail
  t +   # Animate the noise over time
) glsl cnoise material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with animated, warped noise."}]},curl={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("curl expects an input value (e.g., a vec2, vec3, or a glsl_expression object)");e.push({type:"color",expression:`curl(${s})`})},description:"Creates a color from curl noise, which is useful for fluid-like patterns. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",effect:"[vec] -> [color]"},examples:[{code:`0.4 0.4 0.4 vec3 0.1 roundbox (p xy t +) glsl curl material
march
1 1 1 vec3 "white" 0.1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a roundbox textured with animated curl noise."},{code:`
# Use the X and Z coordinates to apply 2D curl noise to a 3D shape
0.5 1.5 vec2 cylinder
# Rotate the cylinder to see the effect
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
(
  p xz # Project the 3D surface point to a 2D plane
  2 *  # Scale the noise pattern
  t +  # Animate the pattern over time
) glsl curl material
march
# Add a light for better visibility
2 2 4 vec3 "white" 0.1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a cylinder textured with animated, flowing curl noise."}]},worley={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("worley expects an input value (e.g., a vec2, vec3, or a glsl_expression object)");e.push({type:"color",expression:`vec3(1.0 - worley(${s}).x)`})},description:"Creates a color from Worley noise (Voronoi cells). The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",effect:"[vec] -> [color]"},examples:[{code:`0.4 0.4 0.4 vec3 0.1 roundbox (p xy 10 * t +) glsl worley material
march
1 1 1 vec3 "white" 1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a roundbox textured with animated Worley noise."},{code:`
# Animate a 2D slice through a 3D noise volume
1 1 1 vec3 box
(
  p x      # Use surface x
  p y      # Use surface y
  t 0.5 *  # Animate the z-coordinate to slice through the noise
  vec3
  5 *      # Scale the noise for more detail
) glsl worley material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a box textured with an animated 2D slice of 3D Worley noise."}]},voronoi={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("voronoi expects an input value (e.g., a vec2, vec3, or a glsl_expression object)");e.push({type:"color",expression:`vec3(voronoi(${s}).z)`})},description:"Creates a color from Voronoi noise. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",effect:"[vec] -> [color]"},examples:[{code:"2 4 4 vec3 0.1 roundbox (p xy 5 * t +) glsl voronoi material march render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a roundbox textured with animated Voronoi noise."}]},randomcolor={definition:{exec:function*(e){e.push({type:"color",expression:"random_color(p)"})},description:"Creates a random color based on the surface position, useful for differentiating objects.",effect:"[] -> [color]"},examples:[{code:"0.5 sphere randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"}}]},julia={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push({type:"color",expression:`vec3(juliaSDF(p.xy, ${toGLSL(s)}, ${toGLSL(o)}))`})},description:"A convenient high-level operator that creates a complete grayscale Julia set material. It takes a `c` parameter (a vec2) which defines the fractal's shape, and an `r` parameter (a float) which controls the radius/zoom. For more advanced control over color and animation, see the `juliaset` operator.",effect:"[c_vec2 r_float] -> [color]"},examples:[{code:`
# A static Julia set with a classic appearance
2.0 sphere
  -0.745 0.113 vec2  # 'c' constant
  1.0                # radius
  julia              # generate grayscale material
material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with a classic Julia set."},{code:`
# A colorful Julia set using 'juliaset' multiplied by a 'wavecolor'
2.0 sphere

# Push arguments for juliaset
(p xy) glsl
-0.745 0.113 vec2
1.0
juliaset  # -> stack has [glsl_expr_julia]

# Create a wavecolor vector as a glsl_expression
(t 1.0 * sin abs t 1.2 * sin abs t 1.4 * sin abs vec3) glsl    # -> stack has [glsl_expr_julia, glsl_expr_wave]

# Multiply them. The '*' operator is shader-aware.
*         # -> stack has [glsl_expr_final]

material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere with an animated, colorful Julia fractal."}]},juliaset={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=toGLSL(c),u=toGLSL(s),f=toGLSL(o);if(!p||!u||!f)throw e.push(c,s,o),new Error("juliaset expects st (vec2/glsl), c (vec2/glsl), and r (float/glsl) on the stack.");const h=`juliaSDF(${p}, ${u}, ${f})`;e.push({type:"glsl_expression",code:h,returnType:"float"})},description:"Calculates the raw 2D Julia set fractal value (a float from 0.0 to 1.0) and pushes it to the stack as a GLSL expression. This is the building block for creating custom, animated 2D fractal materials. It requires the surface coordinates ('st'), the 'c' constant, and a radius/zoom 'r'. For a 3D fractal, see 'mandelbulb' or 'fractal'.",effect:"[st_vec2 c_vec2 r_float] -> [glsl_expression]"},examples:[{code:`
# Use a plane as a canvas for the 2D fractal
0 0 1 vec3 0 plane

# --- Create the animated, colorful material ---

# 1. Calculate the Julia set value as a GLSL expression
(p xy) glsl
(t 0.2 * sin 0.7885 * t 0.2 * cos 0.7885 * vec2) glsl # Animated C
(t 0.1 * sin abs) glsl 0.95 * 0.05 +                         # Animated R (deep zoom)
juliaset                                                     # -> [fractal_val_expr]

# 2. Use the fractal value to create a hue, and animate it
3.0 *           # Scale the value for more color range
(t 0.2 *) glsl + # Animate a hue shift over time

# 3. Create the final color
1.0 1.0         # Saturation and Value
hsv             # -> [color_object]

# Apply the final material and render
material
march
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a plane textured with a deeply-zooming, color-cycling Julia set."}]},mandelbrot={definition:{exec:function*(e){const o=e.pop();e.push({type:"color",expression:`vec3(mandelbrotSDF(p.xy, ${toGLSL(o)}))`})},description:"A convenient high-level operator that creates a complete grayscale Mandelbrot set material. It takes an 'r' parameter (a float) which controls the radius/zoom.",effect:"[r_float] -> [color]"},examples:[{code:`
2.0 sphere
  1.5  # radius
  mandelbrot
material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with a classic Mandelbrot set."},{code:`
# A deep, animated zoom into the Mandelbrot set
2.0 sphere
  # Animate the radius 'r' for a zoom effect
  (t 0.1 * sin abs) glsl 0.95 * 0.05 +
  mandelbrot
material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with an animated, zooming Mandelbrot set."}]},mandelbrotset={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=toGLSL(s),p=toGLSL(o);if(!c||!p)throw e.push(s,o),new Error("mandelbrotset expects st (vec2/glsl) and r (float/glsl) on the stack.");const u=`mandelbrotSDF(${c}, ${p})`;e.push({type:"glsl_expression",code:u,returnType:"float"})},description:"Calculates the raw 2D Mandelbrot set fractal value (a float from 0.0 to 1.0) and pushes it to the stack as a GLSL expression. This is the building block for creating custom, animated 2D fractal materials. It requires the surface coordinates ('st') and a radius/zoom 'r'. For a high-level material, see 'mandelbrot'.",effect:"[st_vec2 r_float] -> [glsl_expression]"},examples:[{code:`
# Use a plane as a canvas for the 2D fractal
0 0 1 vec3 0 plane

# --- Create the interactive, colorful material ---

# 1. Calculate the Mandelbrot set value as a GLSL expression
(p xy) glsl
(mousey u_resolution y / 5.0 * neg exp) glsl # Zoom with the mouse
mandelbrotset                                # -> [fractal_val_expr]

# 2. Use the fractal value to create a hue, and animate it
3.0 *           # Scale the value for more color range
(t 0.2 *) glsl + # Animate a hue shift over time

# 3. Create the final color
1.0 1.0         # Saturation and Value
hsv             # -> [color_object]

# Apply the final material and render
material
march
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a plane textured with a color-cycling Mandelbrot set that can be zoomed using the mouse."}]},glsl={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("glsl expects a quotation (list).");const s=transpileGLSL(o);e.push({type:"glsl_expression",code:s})},description:"Transpiles a Yield quotation into a GLSL expression for use in procedural materials. Special operators `p` (position), `t` (time), and swizzlers (`x`, `y`, `xy`, etc.) are available inside the quotation.",effect:"[[Quotation]] -> [glsl_expression]"},examples:[{code:"(t sin 0.5 * 1.5 +) glsl 5.0 2.0 mandelbox 1.0 1.2 1.4 wavecolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"}},{code:"(p x t + sin) glsl",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="glsl_expression"&&e[0].code==="sin((p.x + u_time))"},expectedDescription:"A glsl_expression object"},{code:`
# Use swizzling to create a diagonal color gradient
1 1 1 vec3 box
(
  p x p y + # Sum of x and y coordinates from position p
  2 *       # Scale for more color cycles
  1.0 1.0 hsv # Map value to hue
) glsl material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a box with a diagonal rainbow material."},{code:`
# Use swizzling and fract to create a repeating grid
0 1 0 vec3 0 plane # A horizontal plane
(
  p xy 5 * fract # Create a 5x5 grid of 0-1 coordinates
  dup x          # Use local x for red channel
  swap y         # Use local y for green channel
  0.5            # Static blue channel
  vec3
) glsl material
march
0 2 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a plane with a colorful repeating grid pattern."},{code:`
# Use swizzling to create a conditional mask
0.8 0.2 vec2 torus
(
  p y 0.0 >    # Test if the position's y-coord is > 0
  (1 0 0 vec3) # If true, use red
  (0 0 1 vec3) # If false, use blue
  ?            # The 'ifte'/? operator works inside glsl
) glsl material
(t 0.5 *) glsl 1 0 0 vec3 rotatesdf # Rotate to see top/bottom
march
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a torus that is red on top and blue on the bottom."},{code:`
# Use .z for a depth-based gradient
0.2 sphere
2 2 2 vec3 repeat
(
  p z 0.1 * # Use the z-coordinate
  1.0 1.0 hsv
) glsl material
march
0 0 15 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering an infinite grid of spheres that change color with depth."},{code:`
# Use .yz to project stripes onto the side of a cylinder
0.5 1.5 vec2 cylinder
(
  p yz 10 * x sin # Project to YZ plane, scale, get sine
  dup dup vec3    # Make grayscale
) glsl material
(t 0.5 *) glsl 1 0 0 vec3 rotatesdf # Rotate to see the effect
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a cylinder with vertical stripes projected onto its side."},{code:`
# Use .xz to project a checkerboard
2.0 0.25 0.25 vec3 box
(
  p xz 5 *     # Project to XZ plane and scale coordinates
  dup          # stack: [scaled_uv, scaled_uv]
  x floor      # stack: [scaled_uv, floor(u)]
  swap         # stack: [floor(u), scaled_uv]
  y floor      # stack: [floor(u), floor(v)]
  + 2 %        # Create checkerboard pattern
  dup dup vec3
) glsl material
(t 1.0 *) glsl 1 1 0 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a torus with a checkerboard pattern on its top and bottom faces."},{code:`
# Use .zxy to warp a 3D noise texture
0.8 0.8 0.2 vec3 box
(
  p zxy 3 * t + fbm # fbm returns a float
  dup dup vec3      # convert float to vec3 for color
) glsl material
(t 0.3 *) glsl 1 1 1 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a rotating box with an animated, warped FBM noise texture."},{code:`
# Use .zyx to apply a reversed gradient to a mirrored object
0.4 sphere 0.5 0 0 vec3 translate
1 1 1 vec3 mirrorRepeat
(
  p zyx 0.3 * x # hue must be a float
  1.0 1.0 hsv
) glsl material
march
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader showing how swizzling coordinates also mirrors the applied texture."},{code:`
# Use .w swizzles by constructing a vec4
1.0 sphere
(
  # Create a vec4 from (pos.x, pos.y, p.z, time)
  # The RPN for this is p.x, p.y, p.z, t -> vec4
  p x p y p z t vec4
  
  # Use .w (time) and .z (depth) to make a more obvious animation
  dup w 2.0 *         # Get time, speed it up for visibility
  swap z +            # Add depth to create a diagonal wave
  1.0 1.0 hsv         # Use the combined value as the hue
) glsl material
march 
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader showing a sphere whose color changes with both time and depth."},{code:`
# Combine swizzles: radial (.xy) and vertical (.z) patterns
0.1 circle2d # The shape to repeat
5.0 polarRepeat
(
  p xy length 5 * sin # sine wave from center
  p z 5 * sin *       # modulated by vertical sine wave
  0.5 + 0.5 *         # remap to 0-1 range
  dup dup vec3
) glsl material
(t 0.2 *) glsl 1 0 0 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader showing a ring of cylinders with a complex, pulsating interference pattern."},{code:`
# Use .xzy to displace a surface
0 1 0 vec3 1.0 plane
(
  p xzy 5 * t + snoise # Use snoise for signed displacement
  0.1 *
) glsl displace
(
  p yzx x 1.0 1.0 hsv
) glsl material
(t 0.2 *) glsl 1 0 0 vec3 rotatesdf
march 
0 2 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a plane with a complex, animated displacement and warped coloring."},{code:`
# Rectangular repeat with .xz swizzle
0.1 sphere
2 2 vec2 0.5 rectangularRepeat
(
  p xz 2 * fract # Project grid onto the XZ plane
  dup x swap y * # Correctly get x and y components
  5 *            # Multiply components for interesting pattern
  1.0 1.0 hsv
) glsl material
march 
0 2 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a rectangular frame of spheres with a colorful grid pattern."},{code:`
# Another 3D warp with .yzx
0.4 sphere 
0.3 0.3 0.3 vec3 box 0.4 0 0 vec3 translate
0.1 roundUnion
(
  p yzx 3 * t + cnoise dup dup vec3
) glsl material
(t 0.3 *) glsl 1 1 1 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a rounded object with a unique warped noise pattern."},{code:`
# Use .wwww swizzle to create a vec4 from a single component
1.0 sphere
(
  # Create a vec4 from (pos.x, pos.y, p.z, time)
  p x p y p z t vec4
  
  # Get time via .w and create a solid color from it.
  w                # get time, discard original vec4
  dup dup dup vec4 # -> vec4(t, t, t, t)
  
  # Take the .xyz for the color, making it flash uniformly
  xyz
) glsl material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a sphere that flashes uniformly based on time using .wwww swizzle."},{code:`
# Use .xx swizzle to create a vec2 from a single component
# This creates horizontal lines from a noise pattern.
1.0 sphere
(
  p xy xx # -> vec2(p.x, p.x)
  5 *     # Scale it
  fbm     # Get noise
  dup dup vec3
) glsl material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a sphere with a horizontal noise pattern using .xx swizzle."},{code:`
# Use .y to create a grayscale color from height
0.8 0.2 vec2 torus
(
  p y         # Get y-coordinate (height)
  0.5 * 0.5 + # Remap range from [-0.2, 0.2] to [0.4, 0.6]
  dup dup vec3  # Create a grayscale vector from the value
) glsl material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a torus with a grayscale pattern based on the y-coordinate."}]},fbm={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("fbm expects an input value (e.g., a vec2, vec3, or a glsl_expression object)");e.push({type:"color",expression:`vec3(fbm(${s}))`})},description:"Creates a color from Fractional Brownian Motion noise, which is good for generating natural-looking textures like clouds or terrain. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",effect:"[vec] -> [color]"},examples:[{code:"1.0 sphere (p 3 * t +) glsl fbm material march render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with animated FBM noise."},{code:`1.0 sphere
(
    # Calculate a noise value based on 3D position and time
    p 3 * t + fbm
    
    # Remap the noise value to a 0-1 range with a smooth curve
    # This creates more defined "hot" and "cold" areas
    0.3 0.7 smoothstep
    
    # Define our two colors for the fire gradient
    1.0 0.1 0.0 vec3 # Dark orange
    1.0 0.9 0.0 vec3 # Bright yellow
    
    # Arrange stack for mix: [colorA, colorB, interpolant]
    rolldown
    
    # Blend between the two colors based on the remapped noise
    fuse
) glsl material
march
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a sphere textured with animated fire-like FBM noise."},{code:`
# Demonstrate tri-planar texturing with FBM
0.8 0.8 0.8 vec3 box
(
  # Get noise from 3 planes using swizzling
  p xy 2 * fbm
  p yz 2 * fbm
  p xz 2 * fbm

  # Average the results
  + + 0.333 *
  dup dup vec3 # make it grayscale
) glsl material
# Animate rotation to see all sides
(t 0.2 *) glsl 1 1 1 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object showing a box with a seamless FBM texture applied using tri-planar mapping."}]},cloud={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push({type:"color",expression:`cloud_color(p, u_time, ${toGLSL(s)}, ${toGLSL(o)})`})},description:"Creates an animated procedural cloud material. Takes two colors that define the primary palette of the clouds.",effect:"[color1 color2] -> [color]"},examples:[{code:`
# A plane to act as a ground for the clouds
0 1 0 vec3 0 plane

# Define two colors for the clouds and apply as material
0.1 0.2 0.3 rgb
0.8 0.9 1.0 rgb
cloud
material

# Set up the scene
march

# Add fog for atmospheric effect
0.2 # fog strength
0.5 0.6 0.7 rgb # fog color
fog

# Animate the camera to fly through the clouds
(t 0.1 *) glsl (t 0.2 * sin 2 +) glsl (t) glsl vec3 # camera position
0 (t 0.2 * sin 2 +) glsl (t 0.2 *) glsl vec3 # camera target
camera

render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader showing an animated camera flying over a plane with moving cloud textures and fog."},{code:`2 sphere
100 20 0 rgb
1 0 0 rgb
cloud material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with a spehere textured with animated clouds."}]},validTextures=new Set(["dots","stripes","checkers"]),toGLSLFloat=e=>{if(typeof e!="number")return"1.0";const o=e.toString();return Number.isInteger(e)&&!o.includes("e")&&!o.includes(".")?o+".0":o},texture={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(!isMarchingObject(c))throw new Error("texture operator expects an SDF object.");if(typeof s!="string"||!validTextures.has(s))throw new Error(`Invalid texture name: "${s}". Valid textures are: ${Array.from(validTextures).join(", ")}.`);if(typeof o!="number")throw new Error("texture operator expects a scale number.");const p=deepClone(c),u=`texture_${s}(p, ${toGLSLFloat(o)})`;p.material={type:"color",expression:u},e.push(p)},description:'Applies a procedural texture to an SDF object. Textures are generated in GLSL based on surface position `p`. Available textures: "dots", "stripes", "checkers".',effect:"[sdf name scale] -> [sdf]"},examples:[{code:'1.0 sphere "dots" 10 texture march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("texture_dots")},expectedDescription:"A shader object with a sphere textured with dots."}]},smoothstep={definition:{exec:function*(){throw new Error("Operator 'smoothstep' can only be used inside a 'glsl' quotation.")},description:"Performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`. Must be used inside a `glsl` quotation.",effect:"[x edge0 edge1] -> [result]"},examples:[{code:`1.0 sphere
(
    # Use surface position's x-coordinate as input
    p x
    
    # Smoothly transition between 0 and 1 in the range [-0.5, 0.5]
    -0.5 0.5 smoothstep
    
    # Use the result to create a grayscale color
    dup dup vec3
    
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere with a smooth black-to-white gradient."}]},color={definition:{exec:function*(e){const o=e.pop(),s=toGLSL(o);if(!s)throw new Error("color operator expects a color name (string/symbol) or a vec3.");e.push({type:"color",expression:s})},description:'Creates a color object from a preset name (e.g., "red", :blue) or a vec3 list.',effect:"[name|vec3] -> [color]"},examples:[{code:'"red" color',assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="color"&&e[0].expression.includes("vec3(1.0, 0.2, 0.2)")},expectedDescription:"A red color object"},{code:"1 0 1 vec3 color",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="color"&&e[0].expression==="vec3(1.0, 0.0, 1.0)"},expectedDescription:"A magenta color object"}]},image={definition:{exec:function*(e){const o=e.pop();if(!Array.isArray(o))throw new Error("image operator expects a quotation.");e.push({type:"image_material",quotation:o})},description:"Creates a 2D image shader definition. When used with 'render', it produces a 2D visual. When used with 'material', it applies the 2D pattern as a 3D texture using tri-planar mapping. Special variables 'p', 'uv', 't', 'u_resolution', and 'mouse' are available inside the quotation.",effect:"[L_quotation] -> [image_material]"},examples:[{code:`# Standalone 2D image: A simple color gradient
(
  uv       # use the explicit uv operator for normalized coords
  dup x    # use uv.x for red
  swap y   # use uv.y for green
  0.5      # blue
  1.0      # alpha
  vec4
) image render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("vec4((gl_FragCoord.xy / u_resolution.xy).x, (gl_FragCoord.xy / u_resolution.xy).y, 0.5, 1.0)")},expectedDescription:"A shader object that creates a color gradient."},{code:`# As a material: Apply a Voronoi pattern to a 3D sphere
1.0 sphere
(
  uv 5.0 * t 0.5 * + # scale and animate coordinates
  worley              # get worley noise
  x                   # get distance to nearest point
  1.0 swap -          # invert for classic cell look
  dup dup 1.0 vec4 # make grayscale and add alpha
) image material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("worley")},expectedDescription:"A shader object with a sphere textured with animated Voronoi noise."},{code:`# As a material: Draw a soft circle on a 3D box
1 1 1 vec3 box
(
  uv 0.5 -
  dup x swap y 0.0 vec3
  0.25 circle2d
  0.0 0.01 smoothstep neg 1.0 +
  dup dup 1.0 vec4
) image material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("sdCircle2d")},expectedDescription:"A shader object with a box textured with a soft circle."},{code:`# As a material: Interactive psychedelic fluid effect on a torus
0.8 0.2 vec2 torus
(
  uv mouse 500.0 / t + +
  dup x sin
  swap y cos
  0.8 1.0 vec4
) image material
(t 0.2 *) glsl 1 1 1 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("mouse")},expectedDescription:"A shader object rendering a rotating torus with an interactive fluid material."},{code:["# Composing with glsl: Use a glsl expression as a value","1.0 sphere","(","  # Calculate a grayscale value using a glsl expression","  (p x p y * 5.0 * sin 0.5 * 0.5 +) glsl","","  # Use this value for all three color channels","  dup dup # -> [val, val, val]","  1.0     # alpha","  vec4",") image","material","march render"],assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("sin(((p.x * p.y) * 5.0))")},expectedDescription:"A shader object with a material derived from a nested glsl expression."}]},fuse={definition:{exec:function*(){throw new Error("Operator 'fuse' can only be used inside a 'glsl' quotation.")},description:"Performs linear interpolation between two values. `mix(a, b, t)` is equivalent to `a*(1-t) + b*t`. Must be used inside a `glsl` quotation.",effect:"[a b t] -> [result]"},examples:[{code:`1.0 sphere
(
    # Define two colors
    0.912 0.793 0.486 vec3  # Gold
    1.000 0.351 0.089 vec3  # Orange

    # Create an interpolant that cycles over time
    t sin abs

    # Mix the two colors based on the interpolant
    fuse
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere that smoothly transitions between two colors."}]},invert={definition:{exec:function*(e){e.push({op:"invert",type:"postEffect",props:{}})},description:"Creates a invert post-processing effect object.",effect:"[] -> [effect]"},examples:[{code:"1 sphere march  invert post render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}}]},edge={definition:{exec:function*(e){e.push({op:"edge",type:"postEffect",props:{}})},description:"Creates a edge post-processing effect object.",effect:"[] -> [effect]"},examples:[{code:"0.2 0.5 vec2 hexprism march edge post render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}}]},brightness={definition:{exec:function*(e){const o={amount:e.pop()};e.push({op:"brightness",type:"postEffect",props:o})},description:"Creates a brightness post-processing effect object.",effect:"[amount] -> [effect]"},examples:[{code:"1 sphere march 0.5 brightness post render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}}]},contrast={definition:{exec:function*(e){const o={amount:e.pop()};e.push({op:"contrast",type:"postEffect",props:o})},description:"Creates a contrast post-processing effect object.",effect:"[amount] -> [effect]"},examples:[{code:"1 sphere march 0.5 contrast post render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}}]},vec={definition:{exec:function*(e){if(e.length<1)throw new Error("Stack underflow. 'vec' requires a size argument on the stack.");const o=e.pop();if(typeof o=="number"&&Number.isInteger(o)&&o>=0){const s=e.length;if(s<o)throw e.push(o),new Error(`Stack underflow for 'vec'. Needed ${o} items, but only ${s} available.`);const c=e.splice(e.length-o,o);e.push(c)}else Array.isArray(o)?e.push(o):e.push([o])},description:"Creates a vector (list) of size N from the top N elements of the stack. If the argument is not a number, it wraps non-list items in a list, and leaves lists as-is.",effect:"[e1..eN N] -> [[e1..eN]] | [A] -> [L]"},examples:[{code:"1 2 3 3 vec",expected:[[1,2,3]]},{code:'"a" "b" 2 vec',expected:[["a","b"]]},{code:"10 20 0 vec",expected:[10,20,[]]},{code:"1 2 3 4 3 vec",expected:[1,[2,3,4]]},{code:'"hello" vec',expected:[["hello"]]},{code:"(1 2) vec",expected:[[1,2]]},{code:"1 2 3 vec",expectedError:"Stack underflow for 'vec'. Needed 3 items, but only 2 available."},{code:"vec",expectedError:"Stack underflow. 'vec' requires a size argument on the stack."}]},vec2={definition:{exec:function*(e){const o=e.pop(),s=e.pop();e.push([s,o])},description:"Creates a 2D vector [x, y].",effect:"[x y] -> [vec2]"},examples:[{code:"1 2 vec2",expected:[[1,2]]}]},vec3={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();e.push([c,s,o])},description:"Creates a 3D vector [x, y, z].",effect:"[x y z] -> [vec3]"},examples:[{code:"1 2 3 vec3",expected:[[1,2,3]]}]},vec4={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=e.pop();e.push([p,c,s,o])},description:"Creates a 4D vector [x, y, z, w].",effect:"[x y z w] -> [vec4]"},examples:[{code:"1 2 3 4 vec4",expected:[[1,2,3,4]]}]},width={definition:{exec:function*(){throw new Error("Operator 'width' can only be used inside a 'glsl' quotation.")},description:"Provides the canvas width in pixels as a float. Must be used inside a `glsl` quotation.",effect:"-> [float]"},examples:[{code:`
# A plane to act as a canvas
0 1 0 vec3 0 plane

# Create a material that is a vertical gradient from black to red
(
  p x width / # Normalize x-coordinate to [0, 1] range
  0.0 0.0     # Green and Blue channels are zero
  vec3
) glsl material

march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a plane with a horizontal red gradient."}]},height={definition:{exec:function*(){throw new Error("Operator 'height' can only be used inside a 'glsl' quotation.")},description:"Provides the canvas height in pixels as a float. Must be used inside a `glsl` quotation.",effect:"-> [float]"},examples:[{code:`
# A plane to act as a canvas
0 1 0 vec3 0 plane

# Create a material that is a vertical gradient from black to green
(
  0.0         # Red channel is zero
  p y height / # Normalize y-coordinate to [0, 1] range
  0.0         # Blue channel is zero
  vec3
) glsl material

march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a plane with a vertical green gradient."}]},uv={definition:{exec:function*(){throw new Error("Operator 'uv' can only be used inside a 'glsl' quotation.")},description:"Provides the normalized screen coordinates as a `vec2`, where both X and Y range from 0.0 to 1.0. Must be used inside a `glsl` quotation.",effect:"-> [vec2]"},examples:[{code:`
(
  uv x # Use the U coordinate for the Red channel
  uv y # Use the V coordinate for the Green channel
  0.5  # Blue channel is static
  1.0  # Alpha
  vec4
) image render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a full-screen color gradient."}]},position={definition:{exec:function*(e){},description:"A special variable representing position (shorthand: `p`). Inside `glsl` quotations, `p` is a `vec3` representing the world-space coordinates of the point being shaded. In normal execution, this operator is a no-op.",effect:"[] -> []"},examples:[{code:"position",expected:[]},{code:"1.0 sphere (p x 5 *) glsl 1.0 1.0 hsv material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader using the position variable `p` to create a material."}]},box={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("box","geometry",[],o))},description:"Creates a box geometry.",effect:"[size] -> [sdf]"},examples:[{code:"0.5 0.5 0.5 vec3 box march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the box size
(t 0.5 * sin 0.2 * 0.5 +) glsl # sx
(t 0.5 * cos 0.2 * 0.5 +) glsl # sy
(t 0.5 * sin 0.2 * 0.5 +) glsl # sz
vec3 box
:yellow material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, pulsating box."}]},sphere={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("sphere","geometry",[],o))},description:"Creates a sphere geometry.",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 sphere march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the sphere's radius
(t sin 0.5 * 0.8 +) glsl
sphere
# Animate the color
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, pulsating sphere with changing colors."}]},capsule={definition:{exec:function*(e){const o={radius:e.pop(),end:e.pop(),start:e.pop()};e.push(createMarchingObject("capsule","geometry",[],o))},description:"Creates a capsule geometry.",effect:"[start end radius] -> [sdf]"},examples:[{code:"-0.2 0 0 vec3 0.2 0 0 vec3 0.5 capsule march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the endpoints of the capsule
(t sin -0.5 *) glsl 0 0 vec3
(t sin 0.5 *) glsl 0 0 vec3
# Animate the radius
(t cos 0.2 * 0.3 +) glsl
capsule
:cyan material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated capsule that stretches, shrinks, and changes thickness."}]},cone={definition:{exec:function*(e){const o={dimensions:e.pop()};e.push(createMarchingObject("cone","geometry",[],o))},description:"Creates a cone geometry.",effect:"[dimensions] -> [sdf]"},examples:[{code:"0.8 0.5 vec2 cone march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the cone's dimensions
(t 0.5 * sin 0.2 * 0.6 +) glsl # Animate cone angle
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate cone height
vec2 cone
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated cone."}]},cylinder={definition:{exec:function*(e){const o={dimensions:e.pop()};e.push(createMarchingObject("cylinder","geometry",[],o))},description:"Creates a cylinder geometry.",effect:"[dimensions] -> [sdf]"},examples:[{code:"0.8 0.5 vec2 cylinder march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the cylinder's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 cylinder
:magenta material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated cylinder."}]},hexprism={definition:{exec:function*(e){const o={dimensions:e.pop()};e.push(createMarchingObject("hexprism","geometry",[],o))},description:"Creates a hexprism geometry.",effect:"[dimensions] -> [sdf]"},examples:[{code:"0.2 0.5 vec2 hexprism march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the hexprism's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 hexprism
(p y 2 *) glsl 1.0 1.0 hsv material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated hexprism with a vertical color gradient."}]},mandelbox={definition:{exec:function*(e){const o={folding:e.pop(),iterations:e.pop(),scale:e.pop()};e.push(createMarchingObject("mandelbox","geometry",[],o))},description:"Creates a mandelbox geometry.",effect:"[scale iterations folding] -> [sdf]"},examples:[{code:["(t sin 0.5 * 1.5 +) glsl 5.0 2.0 mandelbox",'"blue" material',"march","render"],assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."}]},mandelbulb={definition:{exec:function*(e){e.push(createMarchingObject("mandelbulb","geometry",[],{}))},description:"Creates a mandelbulb fractal geometry.",effect:"[] -> [sdf]"},examples:[{code:`mandelbulb
(p 2 *) glsl cnoise material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`# Create the mandelbulb geometry
mandelbulb

# Apply an animated rotation around the Y-axis
(t 0.5 *) glsl 0 1 0 vec3 rotatesdf

# Apply an animated curl noise material for a psychedelic effect
(p 2 * t +) glsl curl material

# Create the scene
march

# Render the final image (without lighting)
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"An animated, rotating mandelbulb with a psychedelic material."}]},octahedron={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("octahedron","geometry",[],o))},description:"Creates a octahedron geometry.",effect:"[size] -> [sdf]"},examples:[{code:"1.0 octahedron march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the octahedron's size
(t 0.5 * sin 0.5 * 1.0 +) glsl
octahedron
# Rotate it for a better view
(t 0.5 *) glsl 1 1 1 vec3 rotatesdf
:green material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating octahedron."}]},plane={definition:{exec:function*(e){const o={distance:e.pop(),normal:e.pop()};e.push(createMarchingObject("plane","geometry",[],o))},description:"Creates a plane geometry.",effect:"[normal distance] -> [sdf]"},examples:[{code:"0 1 0 vec3 1.0 plane march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
0 1 0 vec3
# Animate the plane's distance from the origin
(t sin) glsl
plane
# Apply a checkerboard texture
"checkers" 10 texture
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a plane moving up and down with a checkerboard texture."}]},roundbox={definition:{exec:function*(e){const o={radius:e.pop(),size:e.pop()};e.push(createMarchingObject("roundbox","geometry",[],o))},description:"Creates a roundbox geometry.",effect:"[size radius] -> [sdf]"},examples:[{code:"0.4 0.4 0.4 vec3 0.1 roundbox march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
0.4 0.4 0.4 vec3
# Animate the roundness
(t sin 0.2 * 0.3 +) glsl
roundbox
(p 5 * t +) glsl cnoise material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box that smoothly transitions to a sphere and back, with a noise texture."}]},torus={definition:{exec:function*(e){const o={radii:e.pop()};e.push(createMarchingObject("torus","geometry",[],o))},description:"Creates a torus geometry.",effect:"[radii] -> [sdf]"},examples:[{code:"0.8 0.2 vec2 torus march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the radii of the torus
0.8
(t 0.5 * sin 0.2 * 0.3 +) glsl
vec2 torus
(p x 5 *) glsl 1.0 1.0 hsv material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a torus with a pulsating tube radius and a colorful material."}]},torus88={definition:{exec:function*(e){const o={radii:e.pop()};e.push(createMarchingObject("torus88","geometry",[],o))},description:"Creates a torus88 geometry.",effect:"[radii] -> [sdf]"},examples:[{code:"0.8 0.2 vec2 torus88 march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the radii of the torus
0.8
(t 0.5 * sin 0.2 * 0.3 +) glsl
vec2 torus88
(p x 5 *) glsl 1.0 1.0 hsv material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a torus88 with a pulsating tube radius and a colorful material."}]},torus82={definition:{exec:function*(e){const o={radii:e.pop()};e.push(createMarchingObject("torus82","geometry",[],o))},description:"Creates a torus82 geometry.",effect:"[radii] -> [sdf]"},examples:[{code:"0.8 0.2 vec2 torus82 march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the radii of the torus
0.8
(t 0.5 * sin 0.2 * 0.3 +) glsl
vec2 torus82
(p y 5 *) glsl 1.0 1.0 hsv material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a torus82 with a pulsating tube radius and a colorful material."}]},triprism={definition:{exec:function*(e){const o={dimensions:e.pop()};e.push(createMarchingObject("triprism","geometry",[],o))},description:"Creates a triprism geometry.",effect:"[dimensions] -> [sdf]"},examples:[{code:"0.2 0.5 vec2 triprism march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the geometry."},{code:`
# Animate the triprism's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 triprism
(p y 2 *) glsl 1.0 1.0 hsv material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated triprism with a vertical color gradient."}]},fractal={definition:{exec:function*(e){const o={scale:e.pop(),iterations:e.pop()};e.push(createMarchingObject("fractal","geometry",[],o))},description:"Creates a Mandelbox-style fractal geometry based on box and sphere folding.",effect:"[iterations scale] -> [sdf]"},examples:[{code:`8 2.2 fractal
"red" material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the fractal geometry."}]},psychobox={definition:{exec:function*(e){const o={iterations:e.pop()};e.push(createMarchingObject("psychobox","geometry",[],o))},description:"Creates a psychedelic repeating fractal geometry.",effect:"[iterations] -> [sdf]"},examples:[{code:`10 psychobox
march
2 2 5 vec3 "white" 0.1 light
0 0 6 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the fractal geometry."},{code:`
# An animated psychobox with a colorful material
8 # iterations
psychobox

# Animate rotation
(t 0.1 *) glsl 0 1 0 vec3 rotatesdf

# Apply a procedural material based on position and time
(p 3 * t +) glsl curl material

# Set up scene
march

# Add a light for better visibility
2 2 4 vec3 "white" 0.1 light

# Set camera and clipping planes for fractal rendering
0 0 5 vec3 0 0 0 vec3 camera
0.0001 near # Use a small near plane for fractal detail
20 far       # Set a reasonable far plane

# Render
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, psychedelic fractal."}]},arc2d={definition:{exec:function*(e){const o={rb:e.pop(),ra:e.pop(),sc:e.pop()};e.push(createMarchingObject("arc2d","geometry",[],o))},description:"Creates a 2D arc geometry (extruded).",effect:"[sc ra rb] -> [sdf]"},examples:[{code:"0.866 0.5 vec2 0.5 0.1 arc2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the start/end angles of the arc
(t sin) glsl (t cos) glsl vec2
# Animate the radii
(t 0.5 * sin 0.2 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.1 +) glsl
arc2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a colorful, animated arc."}]},box2d={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("box2d","geometry",[],o))},description:"Creates a 2D box geometry (extruded rectangular prism).",effect:"[size] -> [sdf]"},examples:[{code:"0.5 0.8 vec2 box2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the box size
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.8 +) glsl
vec2 box2d
"yellow" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D box."}]},circle2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("circle2d","geometry",[],o))},description:"Creates a 2D circle geometry (infinite cylinder).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 circle2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the circle
(t 0.5 * sin 0.5 * 0.8 +) glsl
circle2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, pulsating circle with changing colors."}]},cross2d={definition:{exec:function*(e){const o={radius:e.pop(),size:e.pop()};e.push(createMarchingObject("cross2d","geometry",[],o))},description:"Creates a 2D cross geometry (extruded).",effect:"[size radius] -> [sdf]"},examples:[{code:"0.5 0.2 vec2 0.1 cross2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the size of the cross
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 0.1 cross2d
"cyan" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D cross."}]},ellipse2d={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("ellipse2d","geometry",[],o))},description:"Creates a 2D ellipse geometry (extruded).",effect:"[size] -> [sdf]"},examples:[{code:"0.5 0.2 vec2 ellipse2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the ellipse's radii
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 ellipse2d
"magenta" material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, pulsating 2D ellipse."}]},equilateralTriangle2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("equilateralTriangle2d","geometry",[],o))},description:"Creates a 2D equilateral triangle geometry (extruded).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 equilateralTriangle2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the triangle
(t 0.5 * sin 0.5 * 0.8 +) glsl
equilateralTriangle2d
"green" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D triangle."}]},heart2d={definition:{exec:function*(e){e.push(createMarchingObject("heart2d","geometry",[],{}))},description:"Creates a 2D heart geometry (extruded).",effect:"[] -> [sdf]"},examples:[{code:`heart2d
:red material
(t) glsl 0 1 0 vec3 rotatesdf
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:"heart2d 0.2 scale randomcolor material render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 2D geometry."}]},hexagon2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("hexagon2d","geometry",[],o))},description:"Creates a 2D hexagon geometry (extruded).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 hexagon2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the hexagon
(t 0.5 * sin 0.5 * 0.8 +) glsl
hexagon2d
(p x p y + 2 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D hexagon with a colorful material."}]},hexagram2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("hexagram2d","geometry",[],o))},description:"Creates a 2D hexagram geometry (extruded).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 hexagram2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the hexagram
(t 0.5 * sin 0.5 * 0.8 +) glsl
hexagram2d
(p x p y * 5 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D hexagram with a colorful material."}]},isoscelesTriangle2d={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("isoscelesTriangle2d","geometry",[],o))},description:"Creates a 2D isosceles triangle geometry (extruded).",effect:"[size] -> [sdf]"},examples:[{code:"0.5 0.8 vec2 isoscelesTriangle2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the triangle's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.8 +) glsl
vec2 isoscelesTriangle2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated 2D isosceles triangle."}]},moon2d={definition:{exec:function*(e){const o={rb:e.pop(),ra:e.pop(),d:e.pop()};e.push(createMarchingObject("moon2d","geometry",[],o))},description:"Creates a 2D moon geometry (extruded).",effect:"[d ra rb] -> [sdf]"},examples:[{code:"0.3 0.4 0.5 moon2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:"0.3 0.4 0.5 moon2d randomcolor material render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 2D geometry."},{code:`# Animate the moon phase by changing the distance 'd' between the circles
(t sin 0.3 * 0.4 +) glsl
# Define the two radii
0.4 0.3
# Create the moon geometry
moon2d

# Apply an animated horizontal rotation around the Y-axis
(t) glsl 0 1 0 vec3 rotatesdf

# Add a material and render the scene
"yellow" material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, rotating 2D moon."}]},octogon2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("octogon2d","geometry",[],o))},description:"Creates a 2D octogon geometry (extruded).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 octogon2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the octogon
(t 0.5 * sin 0.5 * 0.8 +) glsl
octogon2d
:orange material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D octogon."}]},parallelogram2d={definition:{exec:function*(e){const o={skew:e.pop(),height:e.pop(),width:e.pop()};e.push(createMarchingObject("parallelogram2d","geometry",[],o))},description:"Creates a 2D parallelogram geometry (extruded).",effect:"[width height skew] -> [sdf]"},examples:[{code:"0.3 0.2 0.5 parallelogram2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the dimensions and skew
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
(t sin 0.5 *) glsl
parallelogram2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, morphing 2D parallelogram."}]},pentagon2d={definition:{exec:function*(e){const o={radius:e.pop()};e.push(createMarchingObject("pentagon2d","geometry",[],o))},description:"Creates a 2D pentagon geometry (extruded).",effect:"[radius] -> [sdf]"},examples:[{code:"0.5 pentagon2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radius of the pentagon
(t 0.5 * sin 0.5 * 0.8 +) glsl
pentagon2d
:purple material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, pulsating 2D pentagon."}]},pie2d={definition:{exec:function*(e){const o={radius:e.pop(),c:e.pop()};e.push(createMarchingObject("pie2d","geometry",[],o))},description:"Creates a 2D pie slice geometry (extruded).",effect:"[c radius] -> [sdf]"},examples:[{code:"0.866 0.5 vec2 0.5 pie2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the angle of the pie slice
(t cos) glsl (t sin) glsl vec2
0.5 pie2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:'A shader object rendering an animated "pac-man" effect.'}]},rhombus2d={definition:{exec:function*(e){const o={size:e.pop()};e.push(createMarchingObject("rhombus2d","geometry",[],o))},description:"Creates a 2D rhombus geometry (extruded).",effect:"[size] -> [sdf]"},examples:[{code:"0.5 0.2 vec2 rhombus2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the rhombus's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 rhombus2d
:teal material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated 2D rhombus."}]},roundedbox2d={definition:{exec:function*(e){const o={radii:e.pop(),size:e.pop()};e.push(createMarchingObject("roundedbox2d","geometry",[],o))},description:"Creates a 2D rounded box geometry (extruded). Radii are specified as a vec4 for top-right, bottom-right, top-left, bottom-left corners.",effect:"[size radii] -> [sdf]"},examples:[{code:"0.5 0.8 vec2 0.1 0.2 0.3 0.4 vec4 roundedbox2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the box size
0.5 0.8 vec2
# Animate the corner radii
(t 0.5 * sin 0.1 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.4 +) glsl
(t 0.5 * sin 0.1 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.4 +) glsl
vec4 roundedbox2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a 2D rounded box with animated corner radii."}]},roundedx2d={definition:{exec:function*(e){const o={radius:e.pop(),width:e.pop()};e.push(createMarchingObject("roundedx2d","geometry",[],o))},description:"Creates a 2D rounded X geometry (extruded).",effect:"[width radius] -> [sdf]"},examples:[{code:"0.5 0.1 roundedx2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the width and radius
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.1 * 0.2 +) glsl
roundedx2d
1.0 1.2 1.4 wavecolor material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating, animated 2D rounded X."}]},segment2d={definition:{exec:function*(e){const o={b:e.pop(),a:e.pop()};e.push(createMarchingObject("segment2d","geometry",[],o))},description:"Creates a 2D line segment geometry (extruded plane).",effect:"[a b] -> [sdf]"},examples:[{code:"-0.5 0 vec2 0.5 0 vec2 segment2d 0.1 round randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the endpoints of the line segment
(t sin -0.5 *) glsl 0 vec2
(t sin 0.5 *) glsl 0 vec2
segment2d
0.1 round
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, rounded line segment."}]},star2d={definition:{exec:function*(e){const o={m:e.pop(),n:e.pop(),radius:e.pop()};e.push(createMarchingObject("star2d","geometry",[],o))},description:"Creates a 2D star geometry (extruded). N is the number of points, M controls the pointiness (must be between 2 and N).",effect:"[radius n m] -> [sdf]"},examples:[{code:"0.5 5.0 2.5 star2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the pointiness (m) of the star
0.5 5
(t 0.5 * sin 1.5 * 2.5 +) glsl
star2d
:yellow material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rotating star with animated points."}]},trapezoid2d={definition:{exec:function*(e){const o={height:e.pop(),r2:e.pop(),r1:e.pop()};e.push(createMarchingObject("trapezoid2d","geometry",[],o))},description:"Creates a 2D isosceles trapezoid geometry (extruded).",effect:"[r1 r2 height] -> [sdf]"},examples:[{code:"0.3 0.2 0.5 trapezoid2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the radii of the trapezoid
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
0.3 trapezoid2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated 2D trapezoid."}]},triangle2d={definition:{exec:function*(e){const o={p2:e.pop(),p1:e.pop(),p0:e.pop()};e.push(createMarchingObject("triangle2d","geometry",[],o))},description:"Creates a 2D triangle geometry from three points (extruded).",effect:"[p0 p1 p2] -> [sdf]"},examples:[{code:"0.5 -0.5 vec2 -0.5 -0.5 vec2 0.0 0.5 vec2 triangle2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate one vertex of the triangle
(t sin 0.5 *) glsl 0.0 vec2
-0.5 -0.5 vec2
0.5 -0.5 vec2
triangle2d
"orange" material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated 2D triangle."}]},vesica2d={definition:{exec:function*(e){const o={height:e.pop(),width:e.pop()};e.push(createMarchingObject("vesica2d","geometry",[],o))},description:"Creates a 2D vesica piscis geometry (extruded).",effect:"[width height] -> [sdf]"},examples:[{code:"0.3 0.5 vesica2d randomcolor material march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the 3D geometry."},{code:`
# Animate the dimensions of the vesica
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.3 +) glsl
vesica2d
1.0 1.2 1.4 wavecolor material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated 2D vesica piscis."}]},shape={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if((typeof s!="number"||!Number.isInteger(s)||s<1)&&(s==null?void 0:s.type)!=="glsl_expression")throw new Error("shape expects an integer number of points >= 1 or a glsl_expression.");if(typeof o!="number"&&(o==null?void 0:o.type)!=="glsl_expression")throw new Error("shape expects a radius (number or glsl_expression).");if(typeof s=="number"){const c=Math.round(s);let p,u={radius:o};switch(c){case 1:p="circle2d";break;case 2:let f,h,g;typeof o=="number"?(f=[0,-o/2],h=[0,o/2],g=o*.1):(f={type:"glsl_expression",code:`vec2(0.0, -(${o.code})/2.0)`},h={type:"glsl_expression",code:`vec2(0.0, (${o.code})/2.0)`},g={type:"glsl_expression",code:`(${o.code}) * 0.1`});const m=createMarchingObject("segment2d","geometry",[],{a:f,b:h});e.push(createMarchingObject("round","alteration",[m],{amount:g}));return;case 3:p="equilateralTriangle2d";break;case 4:p="box2d",typeof o=="number"?u={size:[o,o]}:u={size:{type:"glsl_expression",code:`vec2(${o.code})`}};break;case 5:p="pentagon2d";break;case 6:p="hexagon2d";break;case 8:p="octogon2d";break;default:p="ngon2d",u={radius:o,n:c};break}e.push(createMarchingObject(p,"geometry",[],u))}else{const c={radius:o,n:s};e.push(createMarchingObject("ngon2d","geometry",[],c))}},description:"Creates a regular 2D shape geometry (extruded). Based on the number of points 'n': 1 is a circle, 2 is a line, 3 is a triangle, 4 is a square, etc.",effect:"[n radius] -> [sdf]"},examples:[{code:'1 0.5 shape "red" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'2 0.5 shape "green" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'3 0.5 shape "blue" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'4 0.5 shape "yellow" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'5 0.5 shape "cyan" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'6 0.5 shape "magenta" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:'7 0.5 shape "white" material march render',assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:`(t 0.2 * sin 3 * 6 + floor) glsl # Animate number of sides from 3 to 9
0.5 shape
(p x p y + 5 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an animated, rotating, morphing polygon."}]},isGLSLExpression$1=e=>(e==null?void 0:e.type)==="glsl_expression",pathSDF={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isGLSLExpression$1(s))throw new Error("pathSDF expects a glsl_expression for the path.");if(typeof o!="number"&&!isGLSLExpression$1(o))throw new Error("pathSDF expects a number or glsl_expression for the radius.");const c={radius:o,path:s};e.push(createMarchingObject("pathSDF","geometry",[],c))},description:"Creates a 3D tube geometry that follows a given path. The path must be a GLSL expression that returns a vec3 based on a float 't'. The radius can be a static float or a dynamic GLSL expression.",effect:"[glsl_path_expr radius] -> [sdf]"},examples:[{code:`
# Define a spiraling path for our "flying snake"
(
    t 0.5 * sin # x
    t 0.5 * cos # y
    t           # z (moves forward over time)
    vec3
) glsl

# Give it a radius
0.2

# Create the path geometry
pathSDF

# Apply a material that changes color along the path's length
(p z 0.5 *) glsl 1.0 1.0 hsv material

# Set up the scene and a camera that follows the snake
march
(
    t 0.5 * sin 2 + # camera x
    t 0.5 * cos 2 + # camera y
    t               # z
    vec3
) glsl
(
    0 0 t vec3
) glsl
camera
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:'A shader object rendering a colorful, spiraling "flying snake" with a moving camera.'},{code:`
# Space Warp Tunnel: A path that looks like a helix
( t 0.2 * sin 2 * t 0.2 * cos 2 * t vec3 ) glsl

# A radius that pulsates over the length of the path
# using p.z (which is the path parameter 't')
(p z 0.5 * sin 0.1 * 0.15 +) glsl

# Create the path geometry
pathSDF

# Hollow it out to make it a tunnel
0.05 onion

# Animate the material inside the tunnel
(p x p y + 5 * t +) glsl 1.0 1.0 hsv material

march
# A camera that flies through the tunnel
(0 0 t vec3) glsl
(0 0 (t 1 +) vec3) glsl
camera
render
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a flight through a pulsating, colorful, helix-shaped tunnel."},{code:`
# Define a rollercoaster path progressing along the Z axis
(
    (t 2.0 *) sin 2.0 *    # x: go left and right
    (t 4.0 *) cos 0.5 *    # y: go up and down
    t 2.0 *                # z: move forward
    vec3
) glsl

# Give the track a radius
0.2
pathSDF

# Color the track based on its height
(p y 0.5 + 0.5 *) glsl 1.0 1.0 hsv material

march

# Camera follows the path from a "rider's" perspective
# Camera Position (ro) is slightly above the track
(
    (t 2.0 *) sin 2.0 *
    ((t 4.0 *) cos 0.5 * 0.3 +)
    (t 2.0 *)
    vec3
) glsl

# Camera Target (ta) is slightly ahead on the track
(
    ((t 0.1 +) 2.0 *) sin 2.0 *
    ((t 0.1 +) 4.0 *) cos 0.5 *
    ((t 0.1 +) 2.0 *)
    vec3
) glsl
camera

render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a colorful rollercoaster track with a first-person camera."}]},difference={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!isMarchingObject(s)||!isMarchingObject(o))throw new Error("difference expects two SDF objects on the stack.");e.push(createMarchingObject("difference","combinator",[s,o],{}))},description:"Combines two SDFs with the difference operation.",effect:"[sdfA sdfB] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box  difference march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."},{code:`
# A static box
0.5 0.5 0.5 vec3 box

# A sphere whose radius animates, creating a pulsating effect
(t 0.5 * sin 0.2 * 0.4 +) glsl sphere

# Subtract the sphere from the box
difference

# Apply a material
:magenta material

# Set up the scene and render
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with a pulsating sphere-shaped hole cut out of it."}]},smoothUnion={definition:{exec:function*(e){const o={smoothness:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("smoothUnion expects two SDF objects on the stack.");e.push(createMarchingObject("smoothUnion","combinator",[c,s],o))},description:"Combines two SDFs with the smoothUnion operation.",effect:"[sdfA sdfB smoothness] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 smoothUnion march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."},{code:`
# A triangle
3 0.5 shape
# A square, translated
4 0.5 shape 0.5 0 0 vec3 translate
# Animate the smoothness
(t sin 0.5 * 0.5 +) glsl
smoothUnion
:orange material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a smoothly blended, animated union of a triangle and a square."}]},smoothDifference={definition:{exec:function*(e){const o={smoothness:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("smoothDifference expects two SDF objects on the stack.");e.push(createMarchingObject("smoothDifference","combinator",[c,s],o))},description:"Combines two SDFs with the smoothDifference operation.",effect:"[sdfA sdfB smoothness] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 smoothDifference march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},smoothIntersection={definition:{exec:function*(e){const o={smoothness:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("smoothIntersection expects two SDF objects on the stack.");e.push(createMarchingObject("smoothIntersection","combinator",[c,s],o))},description:"Combines two SDFs with the smoothIntersection operation.",effect:"[sdfA sdfB smoothness] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 smoothIntersection march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},roundUnion={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("roundUnion expects two SDF objects on the stack.");e.push(createMarchingObject("roundUnion","combinator",[c,s],o))},description:"Combines two SDFs with the roundUnion operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 roundUnion march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."},{code:`
# A line
2 0.8 shape
# A circle, translated to one end of the line
1 0.3 shape 0.6 0 0 vec3 translate
# Create a rounded union
0.2 roundUnion
:purple material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a rounded union, creating a capsule-like shape."}]},roundIntersection={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("roundIntersection expects two SDF objects on the stack.");e.push(createMarchingObject("roundIntersection","combinator",[c,s],o))},description:"Combines two SDFs with the roundIntersection operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 roundIntersection march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},roundDifference={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("roundDifference expects two SDF objects on the stack.");e.push(createMarchingObject("roundDifference","combinator",[c,s],o))},description:"Combines two SDFs with the roundDifference operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 roundDifference march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},chamferUnion={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("chamferUnion expects two SDF objects on the stack.");e.push(createMarchingObject("chamferUnion","combinator",[c,s],o))},description:"Combines two SDFs with the chamferUnion operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.2 0.8 0.2 vec3 box 0.8 0.2 0.2 vec3 box 0.1 chamferUnion march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."},{code:`
# A square
4 0.4 shape
# Another square, translated
4 0.4 shape 0.3 0.3 0 vec3 translate
# Create a chamfered union
0.1 chamferUnion
:green material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a chamfered union of two squares."}]},chamferIntersection={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("chamferIntersection expects two SDF objects on the stack.");e.push(createMarchingObject("chamferIntersection","combinator",[c,s],o))},description:"Combines two SDFs with the chamferIntersection operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.6 0.6 0.6 vec3 box 0.8 sphere 0.5 0.5 0.5 vec3 translate 0.1 chamferIntersection march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},chamferDifference={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("chamferDifference expects two SDF objects on the stack.");e.push(createMarchingObject("chamferDifference","combinator",[c,s],o))},description:"Combines two SDFs with the chamferDifference operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 0.5 0.5 vec3 box 0.6 sphere 0.5 0.5 0.5 vec3 translate 0.1 chamferDifference march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},pipe={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("pipe expects two SDF objects on the stack.");e.push(createMarchingObject("pipe","combinator",[c,s],o))},description:"Combines two SDFs with the pipe operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 pipe march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},engrave={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("engrave expects two SDF objects on the stack.");e.push(createMarchingObject("engrave","combinator",[c,s],o))},description:"Combines two SDFs with the engrave operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 engrave march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},groove={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("groove expects two SDF objects on the stack.");e.push(createMarchingObject("groove","combinator",[c,s],o))},description:"Combines two SDFs with the groove operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 groove march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},tongue={definition:{exec:function*(e){const o={size:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("tongue expects two SDF objects on the stack.");e.push(createMarchingObject("tongue","combinator",[c,s],o))},description:"Combines two SDFs with the tongue operation.",effect:"[sdfA sdfB size] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 tongue march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},stairsUnion={definition:{exec:function*(e){const o={steps:e.pop(),radius:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("stairsUnion expects two SDF objects on the stack.");e.push(createMarchingObject("stairsUnion","combinator",[c,s],o))},description:"Combines two SDFs with the stairsUnion operation.",effect:"[sdfA sdfB radius steps] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 4.0 stairsUnion march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."},{code:`
# A circle
1 0.5 shape
# A pentagon, translated
5 0.5 shape 0.6 0 0 vec3 translate
# Create 8 steps with a radius of 0.1
0.1 8.0 stairsUnion
:cyan material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a stepped union between a circle and a pentagon."}]},stairsIntersection={definition:{exec:function*(e){const o={steps:e.pop(),radius:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("stairsIntersection expects two SDF objects on the stack.");e.push(createMarchingObject("stairsIntersection","combinator",[c,s],o))},description:"Combines two SDFs with the stairsIntersection operation.",effect:"[sdfA sdfB radius steps] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 4.0 stairsIntersection march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},stairsDifference={definition:{exec:function*(e){const o={steps:e.pop(),radius:e.pop()},s=e.pop(),c=e.pop();if(!isMarchingObject(c)||!isMarchingObject(s))throw new Error("stairsDifference expects two SDF objects on the stack.");e.push(createMarchingObject("stairsDifference","combinator",[c,s],o))},description:"Combines two SDFs with the stairsDifference operation.",effect:"[sdfA sdfB radius steps] -> [sdfC]"},examples:[{code:"0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 4.0 stairsDifference march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the combination."}]},translate={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("translate expects an SDF object on the stack.");e.push(createMarchingObject("translate","transformation",[s],o))},description:"Applies a translate transformation to an SDF object.",effect:"[sdfA amount] -> [sdfB]"},examples:[{code:"0.5 sphere 0.5 0 0 vec3 translate march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# A small sphere to trace the path
0.1 sphere
# Create a dynamic translation vector for a Lissajous curve
(
  (t 2 * sin) glsl # x
  (t 3 * cos) glsl # y
  0.0              # z
  vec3
) glsl translate
:yellow material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere moving in a Lissajous curve."}]},rotatesdf={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop();if(!isMarchingObject(c))throw new Error("rotatesdf expects an SDF object on the stack.");e.push(createMarchingObject("rotate","transformation",[c],{angle:s,axis:o}))},description:"Applies a rotate transformation to an SDF object.",effect:"[sdfA angle axis] -> [sdfB]"},examples:[{code:"1 1 1 vec3 box 2 0 1 0 vec3 rotatesdf march render",assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"}},{code:`
0.2 0.8 vec2 hexprism
(t) glsl # Animate the angle
(
  # Animate the rotation axis itself to create a wobble
  (t cos) glsl # x component of axis
  1.0          # y component of axis
  (t sin) glsl # z component of axis
  vec3
) glsl
rotatesdf
:magenta material
march render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a hexprism with a complex, wobbling rotation."}]},scale={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("scale expects an SDF object on the stack.");e.push(createMarchingObject("scale","transformation",[s],o))},description:"Applies a uniform scale transformation to an SDF object. The amount should be a single number. For non-uniform scaling, construct a scaling matrix and use the 'transform' operator.",effect:"[sdfA F_amount] -> [sdfB]"},examples:[{code:"0.5 sphere 1.5 scale march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},repeat={definition:{exec:function*(e){const o={spacing:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("repeat expects an SDF object on the stack.");e.push(createMarchingObject("repeat","transformation",[s],o))},description:"Repeats an SDF object at regular intervals along a vector.",effect:"[sdfA spacing] -> [sdfB]"},examples:[{code:"0.5 sphere 1.5 1.5 0.0 vec3 repeat march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# A pentagon that pulses in size
5 (t sin 0.1 * 0.3 +) glsl shape
:cyan material

# Repeat it along the X-axis with animated spacing
((t cos 0.5 *) 1.5 + 0 0 vec3) glsl
repeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an infinite line of pulsating pentagons that move closer and further apart."}]},mirrorRepeat={definition:{exec:function*(e){const o={spacing:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("mirrorRepeat expects an SDF object on the stack.");e.push(createMarchingObject("mirrorRepeat","transformation",[s],o))},description:"Applies a mirrorRepeat transformation to an SDF object.",effect:"[sdfA spacing] -> [sdfB]"},examples:[{code:"0.5 sphere 1.5 1.5 0.0 vec3 mirrorRepeat march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# A line shape, offset from the center
2 0.5 shape
0.5 0.5 0 vec3 translate
:orange material

# Animate the spacing of the mirror repeat to create a breathing, kaleidoscopic pattern
((t sin 1 *) 1.5 + (t cos 1 *) 1.5 + 0 vec3) glsl
mirrorRepeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering an intricate, symmetric, animated pattern."}]},limitedRepeat={definition:{exec:function*(e){const o={limits:e.pop(),spacing:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("limitedRepeat expects an SDF object on the stack.");e.push(createMarchingObject("limitedRepeat","transformation",[s],o))},description:"Applies a limitedRepeat transformation to an SDF object.",effect:"[sdfA spacing limits] -> [sdfB]"},examples:[{code:"0.5 sphere 1.5 1.5 1.5 vec3 2 2 2 vec3 limitedRepeat march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# Define a single picket
4 0.2 shape 0 0.2 0 vec3 translate # The post
3 0.2 shape 0 0.4 0 vec3 translate # The top
0.01 smoothUnion # Join them smoothly

# Repeat the picket to make a fence
0.5 0 0 vec3  # Spacing along X-axis
5 0 0 vec3    # Repeat 5 times on each side of the origin on X
limitedRepeat

# Give it a white color
:white material

# Set up the scene
march
0.2 0.7 0.8 rgb swap background # Sky blue background
0 0.1 2 vec3 0 0.1 0 vec3 camera
-2 1 3 vec3 :white 0.1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a white picket fence against a blue sky."},{code:`
# Define a tile unit with two shapes and colors
4 0.3 shape :blue material
5 0.3 shape 0.3 0.3 0 vec3 translate :red material
0.1 smoothUnion

# Repeat the tile unit in a 3x3 grid on the XZ plane
# Repeat 3 times along X
0.7 0 0 vec3 1 0 0 vec3 limitedRepeat
# Repeat the row of tiles 3 times along Z
0 0 0.7 vec3 0 0 1 vec3 limitedRepeat

# Set up scene
march
# Add a light orbiting above the floor
((t sin 4 *) 3.0 (t cos 4 *) vec3) glsl :white 0.05 light
# Set camera to look down at the floor
0 4 0.1 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a 3x3 tiled floor with an animated light source."},{code:`
# Create a base hexagonal shape and animate its radius to make it pulse
(t sin 0.2 * 0.4 +) glsl 6 swap shape

# Apply a psychedelic animated material
1.0 1.2 1.4 wavecolor material

# Repeat it 5 times horizontally to create a wall
1.0 0 0 vec3 # spacing
2 0 0 vec3   # limits (2 on each side + origin = 5 total)
limitedRepeat

# Set up scene and render
march
2 2 5 vec3 :white 0.1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a wall of 5 pulsating, color-shifting hexagons."},{code:`
# A simple cube will be our repeated unit
4 0.2 shape
(p 5 * t +) glsl curl material

# Animate the limits of the repetition to make the line of cubes grow
1.0 0 0 vec3 # spacing
((t 0.5 * floor 3 +) 0 0 vec3) glsl # Animate X limit from 0 to 3
limitedRepeat

# Set up the scene with a camera that pulls back
march
((t 0.5 *) 3 4 vec3) glsl 0 0 0 vec3 camera
2 2 5 vec3 :white 0.1 light
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader showing a line of cubes that grows in number over time."},{code:`
# Create a single ring using difference
1 0.25 shape # Outer circle
1 0.2 shape  # Inner circle
difference
:gray material

# Repeat the ring, animating the spacing between links
(t sin 0.1 * 0.5 + 0.6 + 0 0 vec3) glsl
3 0 0 vec3 # limits (7 links total)
limitedRepeat

march
-2 2 4 vec3 :white 0.1 light
2 -2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader rendering a chain of 7 rings that expands and contracts."}]},polarRepeat={definition:{exec:function*(e){const o={count:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("polarRepeat expects an SDF object on the stack.");e.push(createMarchingObject("polarRepeat","transformation",[s],o))},description:"Repeats an SDF object in a circle around the Z-axis. Uses a two-sample method to ensure correct distances, preventing artifacts with asymmetric shapes.",effect:"[sdfA count] -> [sdfB]"},examples:[{code:"0.1 0.2 0.3 vec3 0.05 roundbox 0.8 0 0 vec3 translate 5.0 polarRepeat march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# A triangle shape, made larger
3 0.25 shape
:magenta material
# Also rotate the triangle itself over time
(t) glsl 0 0 1 vec3 rotatesdf

# Translate the shape away from the origin to form a ring
3 0 0 vec3 translate

# Animate the number of repetitions in the circle
(t 0.01 * sin 0.1 * 25 + floor) glsl
polarRepeat

# Set up scene and render
march
1 2 4 vec3 :yellow 0.01 light
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a ring of spinning triangles, where the number of triangles animates over time."}]},rectangularRepeat={definition:{exec:function*(e){const o={spacing:e.pop(),size:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("rectangularRepeat expects an SDF object on the stack.");e.push(createMarchingObject("rectangularRepeat","transformation",[s],o))},description:"Repeats an SDF object along the perimeter of a rectangle. This is a fast, single-sample version that works best for shapes that are symmetric within their repetition cell.",effect:"[sdfA size spacing] -> [sdfB]"},examples:[{code:"0.5 sphere 3 2 vec2 1.0 rectangularRepeat march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# A small circle shape
1 0.1 shape
:yellow material

# Animate the size of the rectangular repetition to create a pulsating frame
(
  (t 0.5 * sin 1 * 2 +) # sx
  (t 0.5 * cos 1 * 2 +) # sy
  vec2
) glsl # size
1.0 # spacing
rectangularRepeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,assert:e=>{var o;return((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a pulsating rectangular frame of circles."}]},mirror={definition:{exec:function*(e){const o=e.pop();if(!isMarchingObject(o))throw new Error("mirror expects an SDF object on the stack.");e.push(createMarchingObject("mirror","transformation",[o],{}))},description:"Applies a mirror transformation to an SDF object, creating symmetry across the origin planes (x=0, y=0, z=0).",effect:"[sdfA] -> [sdfB]"},examples:[{code:[`# An asymmetric box to better visualize the mirroring
0.2 0.4 0.2 vec3 box

# Animate the box's position in a figure-8 path to ensure it stays in view
(
    t sin 1.2 *        # Animate x-coordinate with radius 1.2
    t 2 * sin 0.5 * 0.5 + # Animate y-coordinate to move up and down
    t cos 1.2 *        # Animate z-coordinate with radius 1.2
    vec3
) glsl
translate

# Mirror the animated box across all axes
mirror

# Set up the scene
march

# Add a camera for a better viewpoint
0 2 6 vec3 0 0 0 vec3 camera

# Add two lights from opposite sides to ensure constant illumination
-3 3 4 vec3 "white" 0.1 light
 3 -1 4 vec3 "white" 0.1 light

# Render
render`],assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object with 8 animated boxes mirrored across all axes, moving in a figure-8 path within view and well-lit."}]},mirrorX={definition:{exec:function*(e){const o=e.pop();if(!isMarchingObject(o))throw new Error("mirrorX expects an SDF object on the stack.");e.push(createMarchingObject("mirrorX","transformation",[o],{}))},description:"Applies a mirrorX transformation to an SDF object.",effect:"[sdfA] -> [sdfB]"},examples:[{code:"0.2 0.3 0.4 vec3 box 0.3 0 0 vec3 translate mirrorX march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},mirrorY={definition:{exec:function*(e){const o=e.pop();if(!isMarchingObject(o))throw new Error("mirrorY expects an SDF object on the stack.");e.push(createMarchingObject("mirrorY","transformation",[o],{}))},description:"Applies a mirrorY transformation to an SDF object.",effect:"[sdfA] -> [sdfB]"},examples:[{code:"0.2 0.3 0.4 vec3 box 0 0.3 0 vec3 translate mirrorY march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},mirrorZ={definition:{exec:function*(e){const o=e.pop();if(!isMarchingObject(o))throw new Error("mirrorZ expects an SDF object on the stack.");e.push(createMarchingObject("mirrorZ","transformation",[o],{}))},description:"Applies a mirrorZ transformation to an SDF object.",effect:"[sdfA] -> [sdfB]"},examples:[{code:"0.2 0.3 0.4 vec3 box 0 0 0.3 vec3 translate mirrorZ march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},bend={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("bend expects an SDF object on the stack.");e.push(createMarchingObject("bend","transformation",[s],o))},description:"Applies a bend transformation to an SDF object.",effect:"[sdfA amount] -> [sdfB]"},examples:[{code:"1 1 1 vec3 box 0.5 bend march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."},{code:`
# Create a tall box to emphasize the bend
0.2 1.0 0.2 vec3 box

# Animate the bend amount over time
(t sin 2.0 *) glsl
bend

# Apply a colorful material for better visualization
(p y 2.0 *) glsl 1.0 1.0 hsv material

# Set up scene and render
march
2 2 4 vec3 "white" 0.1 light
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a tall box that bends back and forth over time."}]},twist={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("twist expects an SDF object on the stack.");e.push(createMarchingObject("twist","transformation",[s],o))},description:"Applies a twist transformation to an SDF object.",effect:"[sdfA amount] -> [sdfB]"},examples:[{code:"2 2 2 vec3 box 5.0 twist march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},elongate={definition:{exec:function*(e){const o={h:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("elongate expects an SDF object on the stack.");e.push(createMarchingObject("elongate","transformation",[s],o))},description:"Applies a elongate transformation to an SDF object.",effect:"[sdfA h] -> [sdfB]"},examples:[{code:"0.2 0.3 0.4 vec3 box 0.1 0.1 0.1 vec3 elongate march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the transformation."}]},transform={definition:{exec:function*(e){var c;const o=e.pop(),s=e.pop();if(!isMarchingObject(s))throw new Error("transform expects an SDF object on the stack.");if(isMatrix(o)){const p=o.length,u=((c=o[0])==null?void 0:c.length)??0;if(p!==3&&p!==4||p!==u)throw new Error("transform matrix must be a square 3x3 or 4x4 matrix.")}else if((o==null?void 0:o.type)==="glsl_expression"){if(o.returnType!=="mat3"&&o.returnType!=="mat4")throw new Error("glsl_expression used with transform must have a returnType of 'mat3' or 'mat4'.")}else throw new Error("transform expects a matrix or a matrix-returning glsl_expression on the stack.");e.push(createMarchingObject("transform","transformation",[s],{matrix:o}))},description:"Applies a matrix transformation to an SDF object. The matrix must be 3x3 (for rotations/scaling) or 4x4 (for affine transformations including translation).",effect:"[sdfA matrix] -> [sdfB]"},examples:[{code:`
# Create a box
0.4 0.4 0.4 vec3 box

# Create a dynamic scaling matrix that pulses along the X-axis
(t sin 0.5 * 1 +) glsl # sx: pulses between 0.5 and 1.5
1.0                     # sy: static
1.0                     # sz: static
scalemat

# Apply the dynamic matrix
transform

# Animate the object's rotation as well for a better effect
(t 0.5 *) glsl 0 1 0 vec3 rotatesdf

# Render the scene
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box that pulses horizontally over time."},{code:`
# A sheared box, impossible with standard operators
1 0.5 0  0 1 0  0 0 1
3 mat

# Apply the shear matrix to a box
0.5 0.5 0.5 vec3 box swap transform

# Render the scene
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sheared box."},{code:`
# A sphere to be squashed
1 sphere
# Apply non-uniform scaling
1.5 0.5 1.0 scalemat transform
(
  # Use p's length (distance from center) for the material
  p length
  1.0 swap - # Invert: 1 at center, 0 at edge
  dup *      # Sharpen the falloff with an exponential curve
  
  # Map the result to a red-hot glow (hue=0)
  0.0 1.0 swap hsv
) glsl material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a squashed sphere with a glowing core."}]},onion={definition:{exec:function*(e){const o={thickness:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("onion expects an SDF object on the stack.");e.push(createMarchingObject("onion","alteration",[s],o))},description:"Applies a onion alteration to an SDF object.",effect:"[sdfA thickness] -> [sdfB]"},examples:[{code:"0.5 sphere 0.1 onion march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the alteration."}]},round={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("round expects an SDF object on the stack.");e.push(createMarchingObject("round","alteration",[s],o))},description:"Applies a round alteration to an SDF object.",effect:"[sdfA amount] -> [sdfB]"},examples:[{code:"0.4 0.4 0.4 vec3 box 0.1 round march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the alteration."}]},halve={definition:{exec:function*(e){const o={direction:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("halve expects an SDF object on the stack.");e.push(createMarchingObject("halve","alteration",[s],o))},description:"Applies a halve alteration to an SDF object.",effect:"[sdfA direction] -> [sdfB]"},examples:[{code:"0.5 sphere 0.0 halve march render",assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering the alteration."}]},displace={definition:{exec:function*(e){const o={amount:e.pop()},s=e.pop();if(!isMarchingObject(s))throw new Error("displace expects an SDF object on the stack.");e.push(createMarchingObject("displace","alteration",[s],o))},description:"Applies a displacement to the surface of an SDF object. The displacement amount can be a float or a GLSL expression for procedural patterns.",effect:"[sdfA (F|glsl_expression)_amount] -> [sdfB]"},examples:[{code:`1.0 sphere
(
  p x 20 * sin
  p y 20 * sin *
  p z 20 * sin *
  0.1 *
) glsl
displace
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a displaced sphere."},{code:`
1.0 sphere
(
  # Use time 't' to animate the displacement pattern
  p x 10 * t + sin
  p y 10 * t + cos *
  p z 10 * t + sin *
  0.2 * # displacement amount
) glsl
displace
:cyan material
march
2 2 4 vec3 :white 0.1 light
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a sphere with a writhing, animated surface displacement."},{code:`
# A horizontal plane
0 1 0 vec3 0 plane
(
  # Sine wave based only on the p.x coordinate and time
  p x 10 * t + sin
  0.1 * # Control displacement amount
) glsl displace
:cyan material
march
# Use a better camera angle to view the ripples
0 2 5 vec3 0 0 0 vec3 camera
2 2 4 vec3 "white" 0.1 light
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a plane with animated vertical ripples."}]},distEuclidean={definition:{exec:function*(){throw new Error("Operator 'distEuclidean' can only be used inside a 'glsl' quotation.")},description:"Calculates the Euclidean distance between two vectors. Must be used inside a `glsl` quotation.",effect:"[vecA vecB] -> [float]"},examples:[{code:`2 2 2 vec3 box
(
  # Calculate Euclidean distance from the center
  p xy 0 0 vec2 distEuclidean
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with colorful circular ripples."},{code:`2 2 2 vec3 box
(
  # Animate the center of the distance calculation
  p xy
  (t sin) glsl (t cos) glsl vec2
  distEuclidean
  
  # Create ripples
  10 * sin
  
  # Make it grayscale
  dup dup vec3
) glsl material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with ripples moving in a circle."}]},distManhattan={definition:{exec:function*(){throw new Error("Operator 'distManhattan' can only be used inside a 'glsl' quotation.")},description:"Calculates the Manhattan (taxicab) distance between two vectors. Must be used inside a `glsl` quotation.",effect:"[vecA vecB] -> [float]"},examples:[{code:`2 2 2 vec3 box
(
  # Calculate Manhattan distance from the center
  p xy 0 0 vec2 distManhattan
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with colorful diamond-shaped ripples."},{code:`2 2 2 vec3 box
(
  # Animate the center of the distance calculation
  p xy
  (t sin) glsl (t cos) glsl vec2
  distManhattan
  
  # Create ripples
  10 * sin
  
  # Make it grayscale
  dup dup vec3
) glsl material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with diamond-shaped ripples moving in a circle."}]},distChebychev={definition:{exec:function*(){throw new Error("Operator 'distChebychev' can only be used inside a 'glsl' quotation.")},description:"Calculates the Chebychev (chessboard) distance between two vectors. Must be used inside a `glsl` quotation.",effect:"[vecA vecB] -> [float]"},examples:[{code:`2 2 2 vec3 box
(
  # Calculate Chebychev distance from the center
  p xy 0 0 vec2 distChebychev
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with colorful square-shaped ripples."},{code:`2 2 2 vec3 box
(
  # Animate the center of the distance calculation
  p xy
  (t sin) glsl (t cos) glsl vec2
  distChebychev
  
  # Create ripples
  10 * sin
  
  # Make it grayscale
  dup dup vec3
) glsl material
march render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with square-shaped ripples moving in a circle."}]},distMinkowski={definition:{exec:function*(){throw new Error("Operator 'distMinkowski' can only be used inside a 'glsl' quotation.")},description:"Calculates the Minkowski distance between two vectors with an exponent p. Must be used inside a `glsl` quotation.",effect:"[vecA vecB p] -> [float]"},examples:[{code:`2 2 2 vec3 box
(
  # Calculate Minkowski distance with an exponent of 4.0
  p xy 0 0 vec2 4.0 distMinkowski
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with colorful 'squircle'-shaped ripples."},{code:`2 2 2 vec3 box
(
  # Animate the exponent 'p' over time to morph the shape
  p xy 0 0 vec2
  t 0.5 * sin 3.0 * 2.5 +
  
  # Stack is now [vec_a, vec_b, p_val], which is the correct order
  distMinkowski
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader object rendering a box with an animated, colorful morphing ripple pattern."}]},isSceneObject=e=>e&&typeof e=="object"&&e.type==="scene",isGLSLExpression=e=>(e==null?void 0:e.type)==="glsl_expression",path={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.length>0?e[e.length-1]:void 0;let p,u,f;if(isGLSLExpression(o)&&isSceneObject(s))u=o,p=s;else if(isGLSLExpression(o)&&isGLSLExpression(s)&&isSceneObject(c))f=o,u=s,p=e.pop();else throw e.push(s,o),new Error("path expects [scene (path_glsl)] or [scene (path_glsl) (look_glsl)].");const h=generatePathShader(p,u,f);e.push({type:"shader",code:h})},description:`Creates a cinematic fly-through of a scene. Takes a scene object and a path quotation. An optional third GLSL quotation can be provided for interactive "look-around" control. The path quotation must be a GLSL expression that takes a float 't' and returns a 'vec3' position. The look-around quotation should return a 'vec2' to offset the view. The operator automatically carves a tunnel through the scene to avoid camera collisions.`,effect:"[scene (path_glsl) (look_glsl)?] -> [shader]"},examples:[{code:`
# 1. Define the world (a psychedelic fractal)
2 psychobox
(p 1 *) glsl curl material
march

# 2. Define a rollercoaster-like path
(
    t 0.25 * # scale time
    dup 2.5 * sin 0.1 * # x
    swap dup cos 0.5 * swap 0.2 * sin 1 * + # y
    t 0.5 * # z
    vec3
) glsl

# 3. Create the tour
path
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"An animated shader that flies through a psychedelic fractal."},{code:`
# 1. Define the world: a tunnel of rotating, colorful rings
0.8 0.1 vec2 torus # A thin ring
(p z 2 *) glsl 1.0 1.0 hsv material # Color changes with depth
(t) glsl 0 1 0 vec3 rotatesdf # Rotate rings around Y axis
0 0 1.5 vec3 repeat # Repeat every 1.5 units along Z axis
march

# 2. Define a straight path forward for a "warp speed" effect
(
    0 0 t vec3
) glsl

# 3. Create the tour
path
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader that flies through a tunnel of rotating rings."},{code:`
# 1. Define the world: repeating mandelbulbs
mandelbulb
(p z 2 *) glsl 1.0 1.0 hsv material
0 0 4.0 vec3 repeat
march

# 2. Define a straight path for a cinematic fly-through
(0 0 t vec3) glsl

# 3. Create the wormhole-like tour
path
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"},expectedDescription:"A shader that flies through a repeating scene of colorful mandelbulbs."},{code:`
# 1. A world of repeating, rotating spheres
0.2 sphere
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
2 2 2 vec3 repeat
(p z 2 *) glsl 1.0 1.0 hsv material
march

# 2. A simple path moving forward
(0 0 t vec3) glsl

# 3. A GLSL expression to control the view with the mouse
# Normalizes mouse coords to [-1, 1] range to be used as view offsets
(
  mousex width / 0.5 - 2.0 *
  mousey height / 0.5 - 2.0 *
  vec2
) glsl

# 4. Create the interactive tour
path
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("vec2 look =")},expectedDescription:"An interactive shader that lets you look around with the mouse while flying through a field of spheres."},{code:`
# 1. A world of repeating, rotating spheres
0.2 sphere
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
2 2 2 vec3 repeat
(p z 2 *) glsl 1.0 1.0 hsv material
march

# 2. A simple path moving forward
(0 0 t vec3) glsl

# 3. A GLSL expression to control the view with the mouse when held down
# Normalizes mouse coords to [-1, 1] range to be used as view offsets
(
  mousedx width / 0.5 - 2.0 *
  mousedy height / 0.5 - 2.0 *
  vec2
  moused? # Only apply lookaround when mouse is down
  *
) glsl

# 4. Create the interactive tour
path
`,assert:e=>{var o;return e.length===1&&((o=e[0])==null?void 0:o.type)==="shader"&&e[0].code.includes("u_moused.z")},expectedDescription:"An interactive shader where you can look around by clicking and dragging the mouse while flying through a field of spheres."}]},shaders={name:"Shaders",description:"Operators for creating 3D scenes with Signed Distance Fields.",definitions:{march,smoothmarch,render,light,background,camera,fog,shadow,material,post,iterations,near,far,cloud,cnoise,color,curl,fbm,fuse,glsl,hsv,image,julia,juliaset,mandelbrot,mandelbrotset,randomcolor,rgb,texture,wavecolor,worley,voronoi,smoothstep,invert,edge,brightness,contrast,vec,vec2,vec3,vec4,width,height,uv,position,p:position,box,sphere,capsule,cone,cylinder,hexprism,mandelbox,mandelbulb,octahedron,plane,roundbox,torus,torus88,torus82,triprism,fractal,psychobox,pathSDF,arc2d,box2d,circle2d,cross2d,ellipse2d,equilateralTriangle2d,heart2d,hexagon2d,hexagram2d,isoscelesTriangle2d,moon2d,octogon2d,parallelogram2d,pentagon2d,pie2d,rhombus2d,roundedbox2d,roundedx2d,segment2d,shape,star2d,trapezoid2d,triangle2d,vesica2d,difference,smoothUnion,smoothDifference,smoothIntersection,roundUnion,roundIntersection,roundDifference,chamferUnion,chamferIntersection,chamferDifference,pipe,engrave,groove,tongue,stairsUnion,stairsIntersection,stairsDifference,translate,rotatesdf,scale,repeat,mirrorRepeat,limitedRepeat,polarRepeat,rectangularRepeat,mirror,mirrorX,mirrorY,mirrorZ,bend,twist,elongate,transform,displace,halve,onion,round,distEuclidean,distManhattan,distChebychev,distMinkowski,path}},tempo={definition:{exec:function*(e,o,s,c){if(e.length<1)return;const p=e.pop();if(typeof p!="number"||p<=0)throw e.push(p),new Error("tempo expects a positive number for BPM.");audioEngine.setTempo(p),c[":tempo"]={body:p,description:"Global tempo in BPM.",example:"120 tempo"}},description:"Sets the global tempo in Beats Per Minute (BPM), consuming the value from the stack. Also sets the global `:tempo` variable.",effect:"[N_bpm] -> []"},examples:[{replCode:["120 tempo",":tempo"],expected:[120]}]},origin={definition:{exec:function*(e){e.push(audioEngine.getStartTime())},description:"Pushes the start time of the master audio clock (in seconds).",effect:"-> [N_seconds]"},examples:[{code:"origin",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the start time."}]},elapsed={definition:{exec:function*(e){e.push(audioEngine.getElapsedTime())},description:"Pushes the elapsed time since the master audio clock started (in seconds).",effect:"-> [N_seconds]"},examples:[{code:"elapsed",assert:e=>typeof e[0]=="number",expectedDescription:"A number representing the elapsed time."}]},live$1={definition:{exec:function*(e){const o=e.pop(),s=e.pop();if(!Array.isArray(s))throw e.push(s,o),new Error("live expects a quotation.");if(typeof o!="number"||o<=0)throw e.push(s,o),new Error("live expects a positive number for beat duration.");const c={type:"live-loop-def",quotation:deepClone(s),beatValue:o,sourceCode:[s,o,"live"]};e.push(c)},description:"Creates a live loop definition. When the assigned name is called (or if left on the stack), the loop starts. The loop executes the quotation directly on the main REPL stack every N beats, allowing it to consume values from and push values to the live coding environment.",effect:"[L_quotation N_beats] -> [live-loop-def]"},examples:[{replCode:["120 tempo","() mylist =","(1 mylist <-) 0.25 live myloop ="],assert:(e,o)=>{var s,c;return((c=(s=o.myloop)==null?void 0:s.body)==null?void 0:c.type)==="live-loop-def"},expectedDescription:"A live-loop-def in the dictionary."},{replCode:["120 tempo","(42) 0.25 live"],async:{duration:1050,assert:(e,o)=>e.length>=8&&e.every(s=>s===42),assertDescription:"A nameless live loop should push its results back to the main stack over time."}}]},stop={definition:{exec:function*(e,o,s,c){if(e.length<1)throw new Error("stop expects a name on the stack.");const p=e.pop();let u;if(typeof p=="symbol"){const v=Symbol.keyFor(p);if(!v)throw new Error("stop: Invalid symbol for patch or loop name.");u=`:${v}`}else if(typeof p=="string")u=p;else throw e.push(p),new Error("stop expects a name or symbol for the patch or live loop to stop.");const f=u.startsWith(":")?u.slice(1):u,h=audioEngine.stop(f);o.onVoiceDestroyed&&h.forEach(v=>o.onVoiceDestroyed(v)),audioEngine.cancel(u);const m=c[":loops"],b=m&&"body"in m?m.body:void 0;if(Array.isArray(b)){const v=b.indexOf(u);v>-1&&b.splice(v,1)}},description:"Stops a playing audio patch or a running live loop by its name. For live loops, it removes the loop name from the global `:loops` list, causing it to terminate on its next tick.",effect:"[S_name] -> []"},examples:[{replCode:["120 tempo","(() 1 live) myloop =>","myloop"],async:{duration:300,assert:(e,o,s)=>{var p;const c=(p=o[":loops"])==null?void 0:p.body;return Array.isArray(c)&&c.includes("myloop")},assertDescription:"myloop should be in :loops after starting."}},{replCode:["120 tempo","(() 1 live) myloop =>","myloop","myloop stop"],async:{duration:300,assert:(e,o,s)=>{var p;const c=(p=o[":loops"])==null?void 0:p.body;return Array.isArray(c)&&!c.includes("myloop")},assertDescription:"myloop should not be in :loops after being stopped."}},{replCode:["120 tempo","(() 1 live) :myloop =>",":myloop",":myloop stop"],async:{duration:300,assert:(e,o,s)=>{var p;const c=(p=o[":loops"])==null?void 0:p.body;return Array.isArray(c)&&!c.includes(":myloop")},assertDescription:":myloop should not be in :loops after being stopped."}}]},wait={definition:{exec:function*(e,o,s,c){const p=e.pop(),u=e.pop();if(typeof p!="number"||p<0)throw e.push(u,p),new Error("wait expects a non-negative number for beat duration.");if(!Array.isArray(u))throw e.push(u,p),new Error("wait expects a quotation.");const f=c[":tempo"],g=60/(f&&"body"in f&&typeof f.body=="number"?f.body:120),m=p*g,b=audioEngine.getContextTime()+m,v=async()=>{const E=o.mainStack;if(!E){const _="Error in scheduled 'wait': Could not find main stack.";o.onAsyncOutput?o.onAsyncOutput(_,!0):console.error(_);return}try{await o.run(u,E,{...o,onOutput:o.onAsyncOutput}),o.onAsyncOutput&&o.onAsyncOutput("YIELD_TICK",!1)}catch(_){o.onAsyncOutput?o.onAsyncOutput(`Error in scheduled 'wait' execution: ${_.message}`,!0):console.error("Error in scheduled 'wait' execution:",_)}},S=`wait_${Date.now()}_${Math.random()}`;audioEngine.schedule(S,b,v)},description:"Waits for a specified number of beats, then executes a quotation on the main stack. The main program continues without pausing.",effect:"[L_quotation N_beats] -> []"},examples:[{replCode:["120 tempo","(hush) 0.5 wait"],assert:e=>!0,expectedDescription:"Schedules `hush` to run after 0.5 beats (250ms at 120bpm)."},{replCode:["240 tempo","0 myvar =","(100 myvar =) 0.125 wait"],async:{duration:50,assert:(e,o)=>{var c;return((c=o.myvar)==null?void 0:c.body)===100},assertDescription:"The scheduled program should modify the variable after the wait period."}}]},sleep={definition:{exec:function*(e,o,s,c){const p=e.pop();if(typeof p!="number"||p<0)throw e.push(p),new Error("sleep expects a non-negative number for beat duration.");const u=c[":tempo"],h=60/(u&&"body"in u&&typeof u.body=="number"?u.body:120),g=p*h*1e3;g>0&&(yield new Promise(m=>setTimeout(m,g)))},description:"Pauses the execution of the current program for a specified number of beats. The main program execution is halted during the sleep period.",effect:"[N_beats] -> []"},examples:[{replCode:["120 tempo","1","0.5 sleep","2"],async:{duration:600,assert:e=>e.length===2&&e[0]===1&&e[1]===2,assertDescription:"The stack should contain [1 2] after the sleep."}},{replCode:["120 tempo","(0.25 sleep 1 +) inc =>","0","inc"],async:{duration:200,assert:e=>e.length===1&&e[0]===1,assertDescription:"The stack should contain [1] after the program with sleep executes."}}]},until={definition:{exec:function*(e){const o=e.pop(),s=e.pop(),c=e.pop(),p=e.pop();if(typeof o!="number"||o<0)throw new Error("until expects a non-negative number for end_beats.");if(typeof s!="number"||s<=0)throw new Error("until expects a positive number for interval_beats.");if(!Array.isArray(c))throw new Error("until expects a quotation.");const u={type:"until-def",initialValue:p,quotation:c,intervalBeats:s,endBeats:o,sourceCode:[deepClone(p),deepClone(c),s,o,"until"]};e.push(u)},description:"Creates an 'until' loop definition. When executed (either by name or as a nameless loop), it runs a program at a regular interval for a set duration, directly manipulating the main stack. `initial_value (program) interval_beats end_beats until`. A temporary word `untilN` is created to store the results of each execution; this word is removed when the loop finishes.",effect:"[V [P] I_beats E_beats] -> [until-def]"},examples:[{replCode:["600 tempo","(1 (1 +) 0.125 0.25 until) myloop =>"],assert:(e,o)=>{var c;const s=(c=o.myloop)==null?void 0:c.body;return Array.isArray(s)&&s[1]==="iterate"},expectedDescription:"A function named myloop is created in the dictionary."},{replCode:["600 tempo","1 (1 +) 0.125 0.25 until"],async:{duration:300,assert:(e,o)=>{const s=!Object.keys(o).some(p=>/^until\d+/.test(p)),c=e.length===1&&e[0]===3;return s&&c},assertDescription:"Temporary loop runs, modifies the stack, and removes itself from the dictionary."}},{replCode:["600 tempo","(1 (1 +) 0.125 0.25 until) myloop =>","myloop"],async:{duration:300,assert:(e,o)=>{var f;const s=o.hasOwnProperty("myloop"),c=e.length===1&&e[0]===3,p=(f=o.myloop)==null?void 0:f.body,u=Array.isArray(p)&&p[1]==="iterate";return s&&u&&c},assertDescription:"Named loop runs, modifies the stack, and the function definition persists."}}]},kill={definition:{exec:function*(e,o,s,c){if(e.length<1)throw new Error("kill expects a name on the stack.");const p=e.pop();let u,f;if(typeof p=="symbol"){const E=Symbol.keyFor(p);if(!E)throw new Error("kill: Invalid symbol.");u=`:${E}`,f=`:${E}`}else if(typeof p=="string"||typeof p=="number")u=String(p),f=String(p);else throw e.push(p),new Error(`kill expects a name, symbol, or number, but got ${typeof p}.`);const h=f.startsWith(":")?f.slice(1):f,g=audioEngine.stop(h);o.onVoiceDestroyed&&g.forEach(E=>o.onVoiceDestroyed(E)),audioEngine.cancel(u);const b=c[":loops"],v=b&&"body"in b?b.body:void 0;if(Array.isArray(v)){const E=v.indexOf(u);E>-1&&v.splice(E,1)}if(!c[u])throw new Error(`Cannot kill '${f}': word not found.`);if(o.builtInKeys.has(u))throw new Error(`Cannot kill built-in operator '${f}'.`);delete c[u]},description:"Stops any active process (audio patch or live loop) associated with a name and removes that word from the user dictionary.",effect:"[S_name] -> []"},examples:[{replCode:["10 myvar =","myvar kill","myvar"],expected:["myvar"]},{code:"10 myvar = myvar myvar kill myvar = myvar",expected:[10]},{replCode:["(1 +) inc =>","inc kill","1 inc"],expected:[1,"inc"]},{replCode:["120 tempo","(() 1 live) myloop =>","myloop","myloop kill"],async:{duration:300,assert:(e,o)=>{var u;const s=(u=o[":loops"])==null?void 0:u.body,c=Array.isArray(s)&&!s.includes("myloop"),p=!o.hasOwnProperty("myloop");return c&&p},assertDescription:"The loop should be stopped and the 'myloop' definition removed."}},{replCode:["not_found kill"],expectedError:"Cannot kill 'not_found': word not found."},{replCode:["+ kill"],expectedError:"Cannot kill built-in operator '+'."},{replCode:["() :mydata =",":mydata kill",":mydata"],expected:[Symbol.for("mydata")]}]},live={name:"Live Coding",description:"Operators for timing, scheduling, and live-looping.",definitions:{tempo,origin,elapsed,live:live$1,stop,kill,wait,sleep,until}},mergedMathCategory={name:"Mathematical & Bitwise Operators",description:"Performing arithmetic, bitwise, and common mathematical functions.",definitions:{...math.definitions,...jsMath.definitions}},mergedTypesCategory={name:"Type, Conversion & Regex",description:"Operators for type casting, conversion, and regular expression operations.",definitions:{...jsString.definitions,...types.definitions,...advancedTypes.definitions}},mergedStackCategory={name:"Stack Operations",description:"Operators for directly manipulating the stack, from simple primitives to advanced metaprogramming.",definitions:{...stack.definitions,...advancedStack.definitions}},operatorModules={literals,input,stack:mergedStackCategory,logic,math:mergedMathCategory,matrix,types:mergedTypesCategory,lists,functional,utils,predicates,combinators,recursion,repl,history,audio,shaders,live},Yield=(()=>{const e={},o={},s=new Set,c={},p={"=":"popto","=>":"quote","<-":"appendTo","?":"ifte","@":"matmul","++":"succ","--":"pred",avg:"average","..":"range"};let u=1;for(const E in operatorModules){const _=operatorModules[E],q={};for(const R in _.definitions)q[R]=_.definitions[R];Object.assign(e,q),Object.assign(c,q),o[E]={name:_.name,description:_.description,definitions:q}}Object.keys(e).forEach(E=>s.add(E)),[...Object.keys(operatorModules.combinators.definitions),...Object.keys(operatorModules.recursion.definitions)];const f=()=>{Object.keys(e).forEach(E=>delete e[E]),Object.assign(e,c),v=1,u=1},h=E=>{const _=E.replace(/#.*/g,""),q=/\(|\)|\{|\}|"[^"]*"|:[^\s\(\){}"]+|[^\(\){}\s]+/g,R=_.match(q)||[],B=()=>{const z=[];for(;R.length>0;){const L=R.shift();if(L===")")return z;if(L==="(")z.push(B());else if(L.startsWith('"')&&L.endsWith('"'))z.push(`\0${L.slice(1,-1)}`);else if(L.startsWith(":"))z.push(Symbol.for(L.slice(1)));else{const I=parseFloat(L);z.push(!isNaN(I)&&isFinite(L)?I:L)}}return z};return B()},g=(E,_,q,R)=>{const{beatValue:B}=_;if(E){const te=q[E];q[E]={...te,body:_}}const z=":loops",L=q[z];(!L||!("body"in L)||!Array.isArray(L.body))&&(q[z]={body:[],description:"List of active live loops.",example:""});const I=q[z].body;if(!Array.isArray(I))throw new Error(":loops variable has been overwritten with a non-list value.");const W=I;W.includes(E)||W.push(E),audioEngine.cancel(E);let Y=audioEngine.getContextTime();const F=async te=>{var ne;const V=q[z],ee=V&&"body"in V?V.body:[];if(!Array.isArray(ee)||!ee.includes(E))return;const oe=H=>{if(H&&R.onAsyncOutput){const N=E.startsWith(":")?E:`:${E}`;R.onAsyncOutput(`
Error in live loop ${N}: ${H}. Loop stopped.
`,!0)}const w=q[z].body.indexOf(E);w>-1&&q[z].body.splice(w,1)},K=q[E];if(!K||!("body"in K)||((ne=K.body)==null?void 0:ne.type)!=="live-loop-def"){R.onAsyncOutput&&R.onAsyncOutput(`Live loop '${E}' stopped because its definition changed to a non-loop value.`,!1),oe();return}const P=K.body.quotation;if(!Array.isArray(P)){oe(`Live loop '${E}' has an invalid quotation body.`);return}const de=R.mainStack;if(!de){oe("Live loop cannot run without a main stack context.");return}try{await R.run(P,de,{...R,onOutput:R.onAsyncOutput,isDebug:!1}),R.onAsyncOutput&&R.onAsyncOutput("YIELD_TICK",!1)}catch(H){oe(H.message);return}const ie=q[":tempo"],X=60/(ie&&"body"in ie&&typeof ie.body=="number"?ie.body:120)*B;Y+=X,Y<audioEngine.getContextTime()&&(Y=audioEngine.getContextTime()+X),q[z].body.includes(E)&&audioEngine.schedule(E,Y,F)};audioEngine.schedule(E,Y,F)},m=(E,_,q,R)=>{const B=q[":tempo"],L=60/(B&&"body"in B&&typeof B.body=="number"?B.body:120),I=_.intervalBeats*L,W=_.endBeats*L,Y=audioEngine.getContextTime(),F={type:"until-process",quotation:_.quotation,intervalBeats:_.intervalBeats,endBeats:_.endBeats,results:[],isTemporary:!!_.isTemporary},te=q[E];q[E]={...te,body:F};const V=R.mainStack;if(!V){R.onAsyncOutput&&R.onAsyncOutput(`Error in 'until' loop ${E}: Could not find main stack.`,!0);return}V.push(_.initialValue),R.onAsyncOutput&&R.onAsyncOutput("YIELD_TICK",!1);const ee=async oe=>{if(oe-Y>=W){F.isTemporary?delete q[E]:q[E]=te,R.onAsyncOutput&&R.onAsyncOutput("YIELD_TICK",!1);return}try{await R.run([..._.quotation],V,{...R,onOutput:R.onAsyncOutput,isDebug:!1}),V.length>0&&F.results.push(V[V.length-1]),R.onAsyncOutput&&R.onAsyncOutput("YIELD_TICK",!1)}catch(P){R.onAsyncOutput&&R.onAsyncOutput(`Error in 'until' loop ${E}: ${P.message}. Loop stopped.`,!0),F.isTemporary&&delete q[E];return}audioEngine.schedule(E,oe+I,ee)};audioEngine.schedule(E,Y,ee)},b=function*(E,_,q={},R=0){E=Array.isArray(E)?[...E]:[E];const B=(z,L,I)=>b(z,L,I||q,R+1);for(;E.length>0;){let z=E.shift();if(q.isDebug&&q.onToken&&q.onToken(z,deepClone(_),deepClone(E),R),typeof z=="string"&&p[z]&&(z=p[z]),typeof z=="string"&&z.startsWith("\0")){_.push(z.slice(1)),yield;continue}let L;if(typeof z=="string"||typeof z=="number")L=String(z);else if(typeof z=="symbol"){const Y=Symbol.keyFor(z);Y&&(L=`:${Y}`)}const I=L?e[L]:void 0;let W=!1;if(I){W=!0;const Y=new Set(["popto","appendTo","yield","body","popstackto","stop","kill","quote"]);if(E.length>0){let F=E[0],te=typeof F=="string"&&p[F]?p[F]:F;Y.has(te)&&(W=!1)}if(W&&E.length>1){let F=E[1];(typeof F=="string"&&p[F]?p[F]:F)==="yield"&&(W=!1)}}if(W)if("definition"in I)yield*I.definition.exec(_,q,B,e);else{const Y=I.body;if((Y==null?void 0:Y.type)==="live-loop-def"){g(L,Y,e,q),yield;continue}if((Y==null?void 0:Y.type)==="until-def"){m(L,Y,e,q),yield;continue}if(Array.isArray(Y)&&Y.length>0&&Y[Y.length-1]==="iterate"){const ee=Y[0];if(L&&Array.isArray(ee)&&ee.length===1){const oe=ee[0];if((oe==null?void 0:oe.type)==="live-loop-def"){g(L,oe,e,q),yield;continue}if((oe==null?void 0:oe.type)==="until-def"){m(L,oe,e,q),yield;continue}}if(Array.isArray(ee)&&ee.length>0&&ee[ee.length-1]==="yield"&&ee.length>=2){const K=ee[0],P=ee[1];if(!(typeof K=="symbol"||Array.isArray(K)&&K.length===2&&typeof K[1]=="symbol")){I._generator_state===void 0&&(I._generator_state=deepClone(K));const ie=Array.isArray(I._generator_state)?[...I._generator_state]:[I._generator_state];yield*B(P,ie,q),I._generator_state=ie.length===1?ie[0]:ie,ie.length>0&&_.push(ie[ie.length-1]),yield;continue}}E.unshift(...Y),yield;continue}const F=deepClone(Y),te=ee=>Array.isArray(ee)?ee.map(te):typeof ee=="string"&&ee.startsWith("\0")?ee.slice(1):ee,V=te(F);_.push(V)}else if(Array.isArray(z)){const Y=F=>Array.isArray(F)?F.map(Y):typeof F=="string"&&F.startsWith("\0")?F.slice(1):F;_.push(Y(z))}else _.push(z);yield}};let v=1;const S=(E,_,q={})=>{const R={...q,parse:h,builtInKeys:s,run:S,mainStack:_,dictionary:e},{stopSignal:B={stopped:!1},pauseSignal:z={paused:!1},onStep:L=()=>{},getDelay:I=()=>R.delay||0,isDebug:W=!1}=R;return new Promise((Y,F)=>{const te=b(E,_,R,0),V=5e3,ee=async()=>{try{if(B.stopped)return Y();if(z.paused){R.setResume&&R.setResume(ee);return}const oe=I();if(oe>0&&W){const{value:P,done:de}=te.next();if(de){for(let ie=_.length-1;ie>=0;ie--){const C=_[ie];if((C==null?void 0:C.type)==="live-loop-def"){const X=C,ne=`live${u++}`;e[ne]={body:X,description:"Nameless live loop",example:""},g(ne,X,e,R),_.splice(ie,1)}else if((C==null?void 0:C.type)==="until-def"){const X=C;X.isTemporary=!0;const ne=`until${v++}`;e[ne]={body:X,description:"Nameless until loop",example:""},m(ne,X,e,R),_.splice(ie,1)}}return Y()}P instanceof Promise&&await P,W&&L(_),setTimeout(ee,oe);return}let K=0;for(;K<V;){const{value:P,done:de}=te.next();if(de){for(let ie=_.length-1;ie>=0;ie--){const C=_[ie];if((C==null?void 0:C.type)==="live-loop-def"){const X=C,ne=`live${u++}`;e[ne]={body:X,description:"Nameless live loop",example:""},g(ne,X,e,R),_.splice(ie,1)}else if((C==null?void 0:C.type)==="until-def"){const X=C;X.isTemporary=!0;const ne=`until${v++}`;e[ne]={body:X,description:"Nameless until loop",example:""},m(ne,X,e,R),_.splice(ie,1)}}return Y()}if(P instanceof Promise){await P,setTimeout(ee,0);return}K++}setTimeout(ee,0)}catch(oe){F(oe)}};ee()})};return{dictionary:e,dictionaryCategories:o,builtInKeys:s,aliases:p,parse:h,run:S,reset:f}})();class HistoryManager{constructor(o){this.history=[],this.currentIndex=-1,this.builtInKeys=o}getUserDictionary(o){const s={};for(const c in o)this.builtInKeys.has(c)||(s[c]=o[c]);return s}createSnapshot(o,s){return{stack:deepClone(o),userDictionary:deepClone(this.getUserDictionary(s))}}add(o){this.currentIndex>-1&&deepEqual(this.history[this.currentIndex],o)||(this.currentIndex<this.history.length-1&&this.history.splice(this.currentIndex+1),this.history.push(o),this.currentIndex=this.history.length-1)}undo(){return this.currentIndex>0?(this.currentIndex--,deepClone(this.history[this.currentIndex])):null}redo(){return this.currentIndex<this.history.length-1?(this.currentIndex++,deepClone(this.history[this.currentIndex])):null}clear(){this.history=[],this.currentIndex=-1}}const VERTEX_SHADER=`#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`,ShaderCanvas=({shaderCode:e,className:o,isBackground:s=!1})=>{const c=reactExports.useRef(null),p=reactExports.useRef(null),u=reactExports.useRef(null),f=reactExports.useRef({x:0,y:0}),h=reactExports.useRef({x:0,y:0,down:0}),g=reactExports.useRef(0),[m,b]=reactExports.useState(null);return reactExports.useEffect(()=>{var oe;const v=c.current;if(!v)return;const S=new ResizeObserver(K=>{for(let P of K){const{width:de,height:ie}=P.contentRect;v.width=de,v.height=ie,p.current&&p.current.viewport(0,0,de,ie)}});S.observe(v);const E=v.getContext("webgl2");if(!E){b("WebGL2 not supported");return}p.current=E;const _=(K,P)=>{const de=E.createShader(K);if(!de)return null;if(E.shaderSource(de,P),E.compileShader(de),!E.getShaderParameter(de,E.COMPILE_STATUS)){const ie=E.getShaderInfoLog(de);return b(`Shader compile error: ${ie}`),E.deleteShader(de),null}return de},q=_(E.VERTEX_SHADER,VERTEX_SHADER),R=_(E.FRAGMENT_SHADER,e);if(!q||!R)return;const B=E.createProgram();if(!B)return;if(E.attachShader(B,q),E.attachShader(B,R),E.linkProgram(B),!E.getProgramParameter(B,E.LINK_STATUS)){const K=E.getProgramInfoLog(B);b(`Program link error: ${K}`),E.deleteProgram(B);return}u.current=B;const z=E.createBuffer();E.bindBuffer(E.ARRAY_BUFFER,z);const L=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];E.bufferData(E.ARRAY_BUFFER,new Float32Array(L),E.STATIC_DRAW);const I=E.getAttribLocation(B,"a_position");E.enableVertexAttribArray(I),E.vertexAttribPointer(I,2,E.FLOAT,!1,0,0),b(null);const W=K=>{const P=v.getBoundingClientRect();h.current={x:K.clientX-P.left,y:P.height-(K.clientY-P.top),down:1}},Y=K=>{h.current.down=0},F=K=>{const P=v.getBoundingClientRect();f.current={x:K.clientX-P.left,y:P.height-(K.clientY-P.top)},h.current.down>.5&&(h.current.x=K.clientX-P.left,h.current.y=P.height-(K.clientY-P.top))},te=s?((oe=v.parentElement)==null?void 0:oe.parentElement)||document:v;te.addEventListener("mousedown",W),te.addEventListener("mouseup",Y),te.addEventListener("mousemove",F);let V=performance.now();const ee=K=>{const P=p.current,de=u.current;if(!P||!de)return;const ie=P.getUniformLocation(de,"u_time"),C=P.getUniformLocation(de,"u_resolution"),X=P.getUniformLocation(de,"u_mouse"),ne=P.getUniformLocation(de,"u_moused");P.viewport(0,0,P.canvas.width,P.canvas.height),P.clear(P.COLOR_BUFFER_BIT),P.useProgram(de),ie&&P.uniform1f(ie,(K-V)*.001),C&&P.uniform2f(C,P.canvas.width,P.canvas.height),X&&P.uniform2f(X,f.current.x,f.current.y),ne&&P.uniform3f(ne,h.current.x,h.current.y,h.current.down),P.drawArrays(P.TRIANGLES,0,6),g.current=requestAnimationFrame(ee)};return g.current=requestAnimationFrame(ee),()=>{S.disconnect(),cancelAnimationFrame(g.current),E&&u.current&&E.deleteProgram(u.current),E&&q&&E.deleteShader(q),E&&R&&E.deleteShader(R),te.removeEventListener("mousedown",W),te.removeEventListener("mouseup",Y),te.removeEventListener("mousemove",F)}},[e,s]),jsxRuntimeExports.jsxs("div",{className:`relative ${o||""}`,children:[jsxRuntimeExports.jsx("canvas",{ref:c,className:"block w-full h-full"}),m&&jsxRuntimeExports.jsx("pre",{className:"absolute top-0 left-0 bg-red-500/80 text-white p-2 font-mono text-xs max-h-full overflow-auto",children:m})]})};let sessionStack=[];const DictionaryView=({dictionary:e,builtInKeys:o,version:s,onUpdate:c})=>{const p=reactExports.useMemo(()=>Object.entries(e).filter(([b])=>!o.has(b)&&"body"in e[b]),[e,o,s]),[u,f]=reactExports.useState(null);reactExports.useEffect(()=>{f(null)},[s]);const h=b=>{if((b==null?void 0:b.type)==="until-process"){const{quotation:S,intervalBeats:E,endBeats:_}=b;return`${yieldFormatter(S)} ${E} ${_} until`}const v=yieldFormatter(b);return Array.isArray(b)&&v.startsWith("(")&&v.endsWith(")")?v.slice(1,-1):v},g=(b,v)=>{var R;const S=v.currentTarget.innerText,E=e[b];if(!E||typeof E!="object"||!("body"in E)||((R=E.body)==null?void 0:R.type)==="until-process")return;const _=h(E.body);if(S.trim()===_.trim()){u===b&&f(null);return}c(b,S)?u===b&&f(null):(f(b),v.currentTarget.innerText=_)},m=b=>{u===b&&f(null)};return jsxRuntimeExports.jsxs("div",{className:"h-full bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden flex flex-col fira-code",children:[jsxRuntimeExports.jsx("header",{className:"p-3 border-b border-gray-700 bg-gray-800/70",children:jsxRuntimeExports.jsx("h2",{className:"font-bold text-gray-300",children:"GODMODE"})}),jsxRuntimeExports.jsx("div",{className:"p-4 overflow-y-auto flex-grow bg-black/30 text-sm",children:p.length===0?jsxRuntimeExports.jsx("p",{className:"text-gray-500 italic",children:"No user-defined words yet."}):jsxRuntimeExports.jsx("div",{children:p.map(([b,v])=>{var S;return"body"in v&&jsxRuntimeExports.jsxs("div",{className:"flex items-baseline mb-1",children:[jsxRuntimeExports.jsx("span",{className:`font-semibold mr-2 ${u===b?"text-red-500":"text-cyan-400"}`,children:b}),jsxRuntimeExports.jsx("span",{className:"text-gray-500 mr-2",children:"="}),jsxRuntimeExports.jsx("span",{className:"text-gray-300 whitespace-pre-wrap flex-grow outline-none focus:bg-gray-700/50 rounded px-1",contentEditable:typeof v.body=="object"&&((S=v.body)==null?void 0:S.type)!=="until-process",suppressContentEditableWarning:!0,onBlur:E=>g(b,E),onFocus:()=>m(b),onKeyDown:E=>{E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),E.currentTarget.blur())},children:h(v.body)})]},`${b}-${s}`)})})})]})},Repl=()=>{const[e,o]=reactExports.useState([]),[s,c]=reactExports.useState(""),[p,u]=reactExports.useState(!1),[f,h]=reactExports.useState(!0),[g,m]=reactExports.useState(null),[b,v]=reactExports.useState(null),[S,E]=reactExports.useState(!1),[_,q]=reactExports.useState(0),R=reactExports.useRef(null),B=reactExports.useRef(null),[z,L]=reactExports.useState([]),[I,W]=reactExports.useState(-1),Y=reactExports.useRef(null),F=reactExports.useRef(0),te=reactExports.useRef(!1),V=reactExports.useRef(!1);reactExports.useEffect(()=>{var w;Yield.reset(),sessionStack=[],Y.current=new HistoryManager(Yield.builtInKeys);const H=Y.current.createSnapshot(sessionStack,Yield.dictionary);Y.current.add(H),o([]),(w=B.current)==null||w.focus()},[]),reactExports.useEffect(()=>{var H;(H=R.current)==null||H.scrollIntoView({behavior:"smooth"})},[e,f]),reactExports.useEffect(()=>{if(B.current){B.current.style.height="auto";const H=B.current.scrollHeight;B.current.style.height=`${H}px`}},[s]);const ee=reactExports.useCallback((H,w=!1)=>{const N=H.trim();if(!N)return;if(!w&&N==="YIELD_TICK"){te.current||v(`( ${sessionStack.map(yieldFormatter).join(" ")} )`),q(J=>J+1),te.current=!1;return}let Z=N;if(w){const J=`( ${sessionStack.map(yieldFormatter).join(" ")} )`;Z=`${N}
${J}`}else te.current=!0;const Q={type:"async",output:Z,isError:w,id:F.current++};o(J=>[...J,Q]),w&&v(null)},[]),oe=()=>{if(Yield.reset(),sessionStack=[],Y.current){Y.current.clear();const H=Y.current.createSnapshot(sessionStack,Yield.dictionary);Y.current.add(H)}o([]),c(""),m(null),v(null),h(!0),q(H=>H+1)},K=reactExports.useCallback((H,w)=>{var N;try{if(H===":loops")throw new Error("Cannot directly modify the reserved ':loops' variable.");const Z=Yield.parse(w),Q=Yield.dictionary[H];if(Q&&"body"in Q){if(((N=Q.body)==null?void 0:N.type)==="until-process")throw new Error("Cannot directly modify a running 'until' process.");Q.body=Z}else throw new Error(`Cannot update body of non-user-defined word: '${H}'.`);if(q(J=>J+1),Y.current){const J=Y.current.createSnapshot(sessionStack,Yield.dictionary);Y.current.add(J)}return!0}catch(Z){return ee(`Error updating '${H}': ${Z.message}`,!0),!1}},[ee]),P=reactExports.useCallback(async H=>{var J,ue;if(!H.trim()){const ae=`( ${sessionStack.map(yieldFormatter).join(" ")} )`,Me={type:"command",command:H,output:ae,isError:!1,id:F.current++};o(be=>[...be,Me]);return}const w=H.trim().toLowerCase();if(w==="cls"){o([]);return}if(w==="godmode"){const ae=!S;E(ae);const be={type:"command",command:H,output:`Godmode ${ae?"activated":"deactivated"}.`,isError:!1,id:F.current++};o(Ie=>[...Ie,be]);return}const N=[...z];N[N.length-1]!==H&&N.push(H),L(N),W(-1);const Z=[],Q=ae=>{Z.push(ae)};try{if(w==="help"||w.endsWith(" help")){let me="",Ye=!1;if(w==="help")me=Object.keys(Yield.dictionaryCategories).map(Et=>{const an=Yield.dictionaryCategories[Et];return`${Et}: ${an.name}`}).join(`
`)+"\n\nUse `<category> help` to see commands in a category.\nTry `godmode` to see the live dictionary.";else{const zt=w.slice(0,-5).trim(),Et=Yield.dictionary[zt],an=Yield.dictionaryCategories[zt];if(Et&&"definition"in Et){const kn=(ue=(J=Et.examples)==null?void 0:J[0])==null?void 0:ue.code,Ca=kn?Array.isArray(kn)?kn.join(`
`):kn:null;me=`${Et.definition.description}${Ca?`

Example:
  ${Ca}`:""}`}else an?me=`--- ${an.name} ---
${an.description}

Commands: ${Object.keys(an.definitions).join(", ")}`:(me=`Error: Unknown command or category '${zt}'.`,Ye=!0)}const St={type:"command",command:H,output:me,isError:Ye,id:F.current++};o(zt=>[...zt,St]);return}const ae=["undo","redo"].includes(w),Me=ae?Y.current.createSnapshot(sessionStack,Yield.dictionary):null,be=Yield.parse(H),Ie=Yield.dictionary[":loops"],fe=Ie&&"body"in Ie&&Array.isArray(Ie.body)?Ie.body.length:0;await Yield.run(be,sessionStack,{onOutput:Q,onAsyncOutput:ee,historyManager:Y.current,commandHistory:N});const Ee=Yield.dictionary[":loops"],Ae=(Ee&&"body"in Ee&&Array.isArray(Ee.body)?Ee.body.length:0)>fe;if(ae){const me=Y.current.createSnapshot(sessionStack,Yield.dictionary);if(deepEqual(Me,me)){const Ye={type:"command",command:H,output:`( ${sessionStack.map(yieldFormatter).join(" ")} )`,isError:!1,id:F.current++};o(St=>[...St,Ye]);return}}if(w==="reset"){Yield.reset(),sessionStack=[],Y.current.clear();const me=Y.current.createSnapshot(sessionStack,Yield.dictionary);Y.current.add(me)}if(w!=="undo"&&w!=="redo"&&w!=="again"){const me=Y.current.createSnapshot(sessionStack,Yield.dictionary);Y.current.add(me)}const Oe=sessionStack.length>0?sessionStack[sessionStack.length-1]:null;Oe&&Oe.type==="shader"?m(Oe):m(null);let rt="";if(!Ae){let Ye=`( ${sessionStack.map(yieldFormatter).join(" ")} )`;Z.length>0&&(Ye+=`
`+Z.join("")),rt=Ye}const et={type:"command",command:H,output:rt,isError:!1,id:F.current++};o(me=>[...me,et])}catch(ae){const Me={type:"command",command:H,output:ae.message,isError:!0,id:F.current++};o(be=>[...be,Me])}finally{if(w==="reset"){const ae={type:"command",command:H,output:"Interpreter state, stack, and history cleared.",isError:!1,id:F.current++};o(Me=>[...Me,ae])}q(ae=>ae+1)}},[S,z,ee]),de=reactExports.useCallback(async H=>{f&&h(!1),v(null),u(!0),await P(H),u(!1),v(null),setTimeout(()=>{var w;return(w=B.current)==null?void 0:w.focus()},0)},[f,P]);reactExports.useEffect(()=>{if(V.current)return;const H=sessionStorage.getItem("yield_repl_code");H&&(V.current=!0,sessionStorage.removeItem("yield_repl_code"),de(H))},[de]);const ie=H=>{c(H.target.value)},C=H=>{if(!p){if(H.key==="Escape"){H.preventDefault(),oe();return}if(H.key==="Enter"&&!H.shiftKey){H.preventDefault();const w=s;c(""),de(w);return}if(H.key==="ArrowUp"){const w=H.currentTarget,N=w.selectionStart;w.value.substring(0,N).split(`
`).length===1&&(H.preventDefault(),W(J=>{const ue=J===-1?z.length-1:Math.max(0,J-1);return c(z[ue]||""),ue}))}if(H.key==="ArrowDown"){const w=H.currentTarget,N=w.selectionStart,Z=w.value.split(`
`).length;w.value.substring(0,N).split(`
`).length===Z&&(H.preventDefault(),W(ue=>{const ae=ue===-1?-1:Math.min(z.length,ue+1);return c(z[ae]||""),ae}))}H.key==="ArrowLeft"&&s===""&&(H.preventDefault(),de("undo")),H.key==="ArrowRight"&&s===""&&(H.preventDefault(),de("redo"))}},X=g||S,ne=b||(S?`( ${sessionStack.map(yieldFormatter).join(" ")} )`:null);return jsxRuntimeExports.jsxs("div",{className:"flex h-[70vh] gap-4",children:[jsxRuntimeExports.jsxs("div",{className:`repl-terminal fira-code bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${X?"w-2/3":"w-full"}`,onClick:()=>{var H;return(H=B.current)==null?void 0:H.focus()},children:[jsxRuntimeExports.jsxs("div",{className:"repl-history p-4 overflow-y-auto flex-grow bg-black/30 backdrop-blur-sm",children:[f&&jsxRuntimeExports.jsx("div",{className:"mb-2 whitespace-pre-wrap",children:jsxRuntimeExports.jsxs("div",{className:"output-area text-gray-100",children:["World Hello!",jsxRuntimeExports.jsx("p",{className:"text-gray-400 text-sm mt-1",children:"Try typing `help` to see available commands. Press left and right to undo and redo."})]})}),e.map(H=>H.type==="async"?jsxRuntimeExports.jsx("div",{className:"whitespace-pre-wrap",children:jsxRuntimeExports.jsx("div",{className:`output-area ml-6 ${H.isError?"text-red-400":"text-cyan-400"}`,children:H.output})},H.id):jsxRuntimeExports.jsxs("div",{className:"mb-2 whitespace-pre-wrap",children:[jsxRuntimeExports.jsxs("div",{className:"flex items-start",children:[jsxRuntimeExports.jsx("span",{className:"text-green-400 mr-2 flex-shrink-0",children:">"}),jsxRuntimeExports.jsx("span",{className:"text-gray-300",children:H.command})]}),jsxRuntimeExports.jsx("div",{className:`output-area ${H.isError?"text-red-400":"text-gray-100"}`,children:H.output})]},H.id)),jsxRuntimeExports.jsx("div",{ref:R})]}),jsxRuntimeExports.jsxs("div",{className:"repl-input-area p-4 border-t border-gray-700 bg-gray-800/70 backdrop-blur-sm",children:[ne&&jsxRuntimeExports.jsx("div",{className:"live-output-area pb-3 mb-3 border-b border-gray-600",children:jsxRuntimeExports.jsxs("div",{className:"flex items-center text-sm",children:[jsxRuntimeExports.jsx("span",{className:"text-gray-400 mr-2 font-sans text-xs uppercase flex-shrink-0",children:"Live Stack:"}),jsxRuntimeExports.jsx("div",{className:"output-area text-cyan-400 whitespace-pre-wrap",children:ne})]})}),jsxRuntimeExports.jsxs("div",{className:"flex items-start",children:[jsxRuntimeExports.jsx("span",{className:"text-green-400 mr-2 flex-shrink-0",children:">"}),jsxRuntimeExports.jsx("textarea",{ref:B,value:s,onChange:ie,onKeyDown:C,className:"repl-textarea fira-code bg-transparent text-gray-300 w-full resize-none focus:outline-none placeholder-gray-500",placeholder:"Type a command...",rows:1,spellCheck:"false",autoCapitalize:"off",autoComplete:"off",autoCorrect:"off","aria-label":"REPL input"})]})]})]}),X&&jsxRuntimeExports.jsxs("div",{className:"w-1/3 transition-all duration-300 flex flex-col gap-4",children:[g&&jsxRuntimeExports.jsx("div",{className:"flex-1 min-h-0",children:jsxRuntimeExports.jsx(ShaderCanvas,{shaderCode:g.code,className:"w-full h-full rounded-lg"})}),S&&jsxRuntimeExports.jsx("div",{className:"flex-1 min-h-0",children:jsxRuntimeExports.jsx(DictionaryView,{dictionary:Yield.dictionary,builtInKeys:Yield.builtInKeys,version:_,onUpdate:K})})]})]})},PlayIcon$1=()=>jsxRuntimeExports.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:jsxRuntimeExports.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"})}),PauseIcon=()=>jsxRuntimeExports.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:jsxRuntimeExports.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}),StopIcon=()=>jsxRuntimeExports.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:"w-5 h-5",children:jsxRuntimeExports.jsx("path",{d:"M6 6h12v12H6z"})}),DebugIcon=()=>jsxRuntimeExports.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 10c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3v-1.5M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),TerminalIcon=()=>jsxRuntimeExports.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.75 7.5l3 2.25-3 2.25"}),jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.25 12h4.5"})]}),debugFormatter=e=>{if(typeof e=="string")return e.startsWith("\0")?e.slice(1):e;if(Array.isArray(e))return`(${e.map(debugFormatter).join(" ")})`;if(e===!0)return"true";if(e===!1)return"false";if(typeof e=="object"&&e!==null){if(e.type==="shader")return"<shader>";if(e.type==="scene")return"<scene>";if(e.type==="light")return"<light>";if(e.type==="color")return"<color>";if(e.type==="glsl_expression")return"<glsl_expression>";if(e.type==="postEffect")return`<${e.op} effect>`;if(["geometry","combinator","transformation","alteration"].includes(e.type))return"<sdf>";if(typeof e.next=="function")return"<generator>"}if(typeof e=="symbol"){const o=Symbol.keyFor(e);return o!==void 0?`:${o}`:e.toString()}return String(e)},formatDebugLog=e=>{if(e.length===0)return"";const o=e.map(c=>c.stack.length+c.depth*2),s=Math.max(...o);return e.map(c=>`${`${"  ".repeat(c.depth)}${c.stack}`.padEnd(s)} <- ${c.program}`).join(`
`)},NotebookCell=({cellData:e,compact:o=!1})=>{const s=reactExports.useMemo(()=>e.examples&&e.examples.length>0?e.examples:e.example?[{code:e.example,expected:e.expected,assert:e.assert,expectedError:e.expectedError,expectedDescription:e.expectedDescription,replCode:e.replCode}]:[],[e]),c=reactExports.useCallback(fe=>{if(!fe)return"";const Ee=fe.replCode||fe.code;return Array.isArray(Ee)?Ee.join(`
`):String(Ee||"")},[]),[p,u]=reactExports.useState(0),[f,h]=reactExports.useState(c(s[0])),[g,m]=reactExports.useState(null),[b,v]=reactExports.useState(null),[S,E]=reactExports.useState([]),[_,q]=reactExports.useState("idle"),[R,B]=reactExports.useState(!1),[z,L]=reactExports.useState(!1),[I,W]=reactExports.useState(0),Y=reactExports.useMemo(()=>s[p]||null,[s,p]),F=reactExports.useRef(null),te=reactExports.useRef(""),V=reactExports.useRef([]),[ee,oe]=reactExports.useState(new Set),[K,P]=reactExports.useState(!1),de=reactExports.useMemo(()=>`cell_${Math.random().toString(36).substr(2,9)}`,[]),ie=reactExports.useRef(!1),C=reactExports.useRef([]);reactExports.useEffect(()=>{u(0)},[s]),reactExports.useEffect(()=>{const fe=s[p];fe!==void 0&&(h(c(fe)),m(null),v(null),q("idle"))},[p,s,c]);const X=()=>{u(fe=>(fe+1)%s.length)},ne=()=>{u(fe=>(fe-1+s.length)%s.length)},H=()=>{const fe=c(Y);sessionStorage.setItem("yield_repl_code",fe),window.location.hash="#/repl"},w=()=>{var We,Ae;(We=F.current)!=null&&We.stopSignal&&(F.current.stopSignal.stopped=!0),z&&((Ae=F.current)!=null&&Ae.resumeFn)&&(F.current.pauseSignal&&(F.current.pauseSignal.paused=!1),L(!1),F.current.resumeFn()),audioEngine.stopAll();const Ee=Yield.dictionary[":loops"];Ee&&"body"in Ee&&Array.isArray(Ee.body)&&(Ee.body.length=0),oe(new Set),P(!1)},N=()=>{var Ee,We;if(_!=="running"||!R)return;const fe=!z;L(fe),(Ee=F.current)!=null&&Ee.pauseSignal&&(F.current.pauseSignal.paused=fe),!fe&&((We=F.current)!=null&&We.resumeFn)&&F.current.resumeFn()},Z=reactExports.useCallback((fe,Ee=!1)=>{const We=fe.trim();if(We)if(!Ee&&We==="YIELD_TICK"){const Ae=C.current;let Oe;Ae.length===1?Oe=yieldFormatter(Ae[0]):Oe=`${Ae.map(yieldFormatter).join(" ")}`,m(Oe)}else E(Ae=>[...Ae,{text:We,isError:Ee}])},[]),Q=reactExports.useCallback(async()=>{q("running"),L(!1),m(null),v(null),E([]),te.current="",oe(new Set),P(!1),V.current=[];const fe={stopped:!1},Ee={paused:!1};F.current={stopSignal:fe,pauseSignal:Ee,resumeFn:void 0};const We={stopSignal:fe,pauseSignal:Ee,isDebug:R,getDelay:()=>R?I:0,setResume:Ae=>{F.current&&(F.current.resumeFn=Ae)},onToken:(Ae,Oe,rt,et)=>{if(!R)return;const me=Oe.map(debugFormatter).join(" "),Ye=[debugFormatter(Ae),...rt.map(debugFormatter)].join(" ");if(I>0){const zt=`${"  ".repeat(et)}${me} <- ${Ye}`;m(zt)}else V.current.push({stack:me,program:Ye,depth:et})},onOutput:Ae=>{te.current+=Ae},onAsyncOutput:Z,onVoiceCreated:Ae=>{Ae&&oe(Oe=>new Set(Oe).add(Ae))},onVoiceDestroyed:Ae=>{Ae&&oe(Oe=>{const rt=new Set(Oe);return rt.delete(Ae),rt})},sourceId:de};try{Yield.reset();const Ae=Yield.parse(f),Oe=[];C.current=Oe,await Yield.run(Ae,Oe,We);const rt=Yield.dictionary[":loops"];if(rt&&"body"in rt&&Array.isArray(rt.body)&&rt.body.length>0&&P(!0),fe.stopped){const et=Oe.map(debugFormatter).join(" ");m(`${et}
(Execution stopped by user)`),q("stopped")}else{if(R)if(I===0){const et=V.current,me=et.length>0?formatDebugLog(et):"",Ye=Oe.map(debugFormatter).join(" ");let St=me;me?St+=`
`+Ye:St=Ye,te.current&&(St+=`
`+te.current),m(St)}else{let me=Oe.map(debugFormatter).join(" ");te.current&&(me+=`
`+te.current),m(me)}else{const et=Oe.length>0?Oe[Oe.length-1]:null;if(et&&et.type==="shader")m(et);else{let me;Oe.length===1?me=yieldFormatter(Oe[0]):me=`${Oe.map(yieldFormatter).join(" ")}`;let Ye=me;te.current&&(Ye+=`
`+te.current),m(Ye)}}q("success")}}catch(Ae){console.error(Ae),v(Ae.message),m(null),q("error")}finally{F.current=null,L(!1)}},[f,R,I,de,Z]),J=_==="running",ue=()=>{if(J){B(!R);return}R||(ie.current=!0),B(!R)};reactExports.useEffect(()=>{ie.current&&(ie.current=!1,Q())},[R,Q]);const ae=J||ee.size>0||K;let Me="bg-gray-800 text-white";_==="error"&&(Me="text-red-600 bg-red-100"),_==="success"&&R&&(Me="bg-gray-900 text-gray-200");const be=g||b,Ie=Y&&(Array.isArray(Y.expected)||Y.assert||Y.expectedType||Y.expectedDescription);return jsxRuntimeExports.jsxs("div",{className:"cell bg-white p-4 rounded-lg shadow mb-6 border border-gray-200 relative",children:[!o&&jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsxs("div",{className:"flex justify-between items-baseline flex-wrap gap-2",children:[jsxRuntimeExports.jsxs("div",{className:"flex items-baseline space-x-4",children:[jsxRuntimeExports.jsx("h3",{className:"text-xl font-bold font-mono text-indigo-600",children:e.name}),e.aliases&&e.aliases.length>0&&jsxRuntimeExports.jsxs("span",{className:"font-mono text-gray-500 text-sm",children:["(",e.aliases.length>1?"aliases":"alias",": ",e.aliases.join(", "),")"]}),s.length>1&&jsxRuntimeExports.jsxs("div",{className:"flex items-center space-x-1 text-gray-500",children:[jsxRuntimeExports.jsx("button",{onClick:ne,title:"Previous Example",className:"p-1 rounded-full hover:bg-gray-200","aria-label":"Previous example",children:"<"}),jsxRuntimeExports.jsxs("span",{className:"text-sm font-mono select-none","aria-live":"polite",children:[p+1,"/",s.length]}),jsxRuntimeExports.jsx("button",{onClick:X,title:"Next Example",className:"p-1 rounded-full hover:bg-gray-200","aria-label":"Next example",children:">"})]})]}),jsxRuntimeExports.jsx("span",{className:"font-mono text-sm bg-gray-100 p-1 rounded whitespace-nowrap",children:e.effect})]}),jsxRuntimeExports.jsx("p",{className:"mt-2 text-gray-700",children:e.description})]}),jsxRuntimeExports.jsxs("div",{className:`code-block bg-gray-50 p-3 rounded-md border ${o?"mt-0":"mt-4"}`,children:[jsxRuntimeExports.jsxs("div",{className:"flex justify-between items-center mb-1",children:[jsxRuntimeExports.jsx("p",{className:"text-sm text-gray-500",children:"Example:"}),jsxRuntimeExports.jsxs("div",{className:"flex items-center space-x-2",children:[jsxRuntimeExports.jsx("button",{onClick:J&&R?N:Q,disabled:J&&!R,className:"control-btn p-1 rounded-full hover:bg-gray-200 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed","aria-label":J?R?z?"Resume":"Pause":"Running...":"Run",title:J?R?z?"Resume":"Pause":"Running...":"Run",children:J?R?z?jsxRuntimeExports.jsx(PlayIcon$1,{}):jsxRuntimeExports.jsx(PauseIcon,{}):jsxRuntimeExports.jsx("span",{className:"text-xs px-1 animate-pulse",children:"..."}):jsxRuntimeExports.jsx(PlayIcon$1,{})}),jsxRuntimeExports.jsx("button",{onClick:w,disabled:!ae,className:"control-btn p-1 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed","aria-label":"Stop example",title:"Stop example",children:jsxRuntimeExports.jsx(StopIcon,{})}),jsxRuntimeExports.jsx("button",{onClick:ue,className:`control-btn p-1 rounded-full hover:bg-gray-200 ${R?"text-indigo-600 bg-indigo-100":"text-gray-600"}`,"aria-label":"Toggle Debug Mode",title:"Toggle Debug Mode",children:jsxRuntimeExports.jsx(DebugIcon,{})}),jsxRuntimeExports.jsx("button",{onClick:H,className:"control-btn p-1 rounded-full hover:bg-gray-200 text-gray-600","aria-label":"Run in REPL",title:"Run in REPL",children:jsxRuntimeExports.jsx(TerminalIcon,{})})]})]}),jsxRuntimeExports.jsx("pre",{className:"fira-code whitespace-pre-wrap text-sm",children:jsxRuntimeExports.jsx("code",{contentEditable:!J,onBlur:fe=>h(fe.currentTarget.innerText),suppressContentEditableWarning:!0,className:"block outline-none",children:f})})]}),R&&jsxRuntimeExports.jsxs("div",{className:"debug-controls mt-2",children:[jsxRuntimeExports.jsxs("label",{className:"block text-sm font-medium text-gray-700",children:["Debug delay: ",jsxRuntimeExports.jsx("span",{className:"delay-value font-mono",children:I}),"ms"]}),jsxRuntimeExports.jsx("input",{type:"range",min:"0",max:"2000",value:I,onChange:fe=>W(Number(fe.target.value)),className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"})]}),(be||_==="idle"&&Ie||S.length>0)&&jsxRuntimeExports.jsxs("div",{className:"output mt-3 rounded-md overflow-hidden",children:[(()=>{if(be)return g&&typeof g=="object"&&g.type==="shader"?jsxRuntimeExports.jsx("div",{className:"h-96",children:jsxRuntimeExports.jsx(ShaderCanvas,{shaderCode:g.code,className:"w-full h-full"})}):jsxRuntimeExports.jsxs("div",{className:`p-3 fira-code text-sm ${Me} overflow-x-auto`,children:[jsxRuntimeExports.jsx("p",{className:`text-sm mb-1 font-semibold ${_==="error"?"text-red-700":"text-gray-400"}`,children:b?"Error:":R?"Debug Log:":"Result:"}),jsxRuntimeExports.jsx("pre",{children:b||(typeof g=="object"?null:g)})]});if(_==="idle"&&Y){if(Array.isArray(Y.expected)){let fe;return Y.expected.length===1?fe=yieldFormatter(Y.expected[0]):fe=`[ ${Y.expected.map(yieldFormatter).join(" ")} ]`,jsxRuntimeExports.jsxs("div",{className:"p-3 fira-code text-sm bg-gray-100 text-gray-500 overflow-x-auto",children:[jsxRuntimeExports.jsx("p",{className:"text-sm mb-1 font-semibold text-gray-400",children:"Expected:"}),jsxRuntimeExports.jsx("pre",{children:fe})]})}return jsxRuntimeExports.jsx("div",{className:"p-3 fira-code text-sm bg-gray-100 text-gray-500 italic overflow-x-auto",children:jsxRuntimeExports.jsx("p",{children:"Press play to see the result."})})}return null})(),S.length>0&&jsxRuntimeExports.jsxs("div",{className:`p-3 fira-code text-sm bg-gray-800 text-white overflow-x-auto ${be?"border-t border-gray-700":""}`,children:[jsxRuntimeExports.jsx("p",{className:"text-sm mb-1 font-semibold text-gray-400",children:"Async Output:"}),jsxRuntimeExports.jsx("pre",{className:"whitespace-pre-wrap",children:S.map((fe,Ee)=>jsxRuntimeExports.jsx("div",{className:fe.isError?"text-red-400":"text-cyan-400",children:fe.text},Ee))})]})]})]})},expectedToString=e=>e===void 0?"":e.map(yieldFormatter).join(" "),stringToExpected=e=>{if(e.trim()==="")return[];try{return Yield.parse(e)}catch(o){return console.error("Error parsing expected output string:",o),[e]}},formatDictionaryState=e=>{const o=Object.entries(e).filter(([c])=>!Yield.builtInKeys.has(c));return o.length===0?"Dictionary: (empty)":`Dictionary State:
${o.map(([c,p])=>p&&"body"in p?`  ${c}: ${yieldFormatter(p.body)}`:`  ${c}: (unknown format)`).join(`
`)}`},formatFailedTest=e=>{var p;const o=e.currentTest.replCode?Array.isArray(e.currentTest.replCode)?e.currentTest.replCode.join(`
`):e.currentTest.replCode:Array.isArray(e.currentTest.code)?e.currentTest.code.join(`
`):String(e.currentTest.code);let s="";e.currentTest.expected!==void 0?s=`( ${expectedToString(e.currentTest.expected)} )`:e.currentTest.assertString!==void 0?s=`(assert) ${e.currentTest.assertString}`:e.currentTest.assert?s=`(assert) ${e.currentTest.assert.toString()}`:e.currentTest.async?s=`(async assert) ${e.currentTest.async.assertDescription||e.currentTest.async.assert.toString()}`:e.currentTest.expectedDescription?s=e.currentTest.expectedDescription:e.currentTest.expectedType?s=`A value of type: ${e.currentTest.expectedType}`:e.currentTest.expectedError&&(s=`(error) ${e.currentTest.expectedError}`);let c=`# --- TEST FAILED: ${e.description} ---`;return(p=e.result.errorMessage)!=null&&p.includes("--- GLSL Source ---")?c+=`
# Reason: ${e.result.errorMessage}`:(c+=`
# Code:
# ${o.replace(/\n/g,`
# `)}`,c+=`
# Reason: ${e.result.errorMessage||"N/A"}`,c+=`
# Expected: ${s}
# Got:   ${e.result.actualOutput||"N/A"}`,e.result.dictionaryState&&(c+=`
# ${e.result.dictionaryState.replace(/\n/g,`
# `)}`)),c},compileShaderHeadless=e=>{if(typeof document>"u")return{success:!0,error:null};const s=document.createElement("canvas").getContext("webgl2");if(!s)return console.warn("Could not create WebGL2 context for shader validation."),{success:!0,error:null};const c=`#version 300 es
in vec4 a_position;
void main() {
    gl_Position = a_position;
}`,p=(g,m)=>{const b=s.createShader(g);return b?(s.shaderSource(b,m),s.compileShader(b),b):null},u=p(s.VERTEX_SHADER,c),f=p(s.FRAGMENT_SHADER,e);if(!u||!f)return{success:!1,error:"Could not create shader objects."};let h=null;return s.getShaderParameter(f,s.COMPILE_STATUS)||(h=s.getShaderInfoLog(f)),s.deleteShader(u),s.deleteShader(f),h?{success:!1,error:h}:{success:!0,error:null}},ChevronDownIcon=()=>jsxRuntimeExports.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})}),ChevronRightIcon=()=>jsxRuntimeExports.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),CopyIcon=()=>jsxRuntimeExports.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),PlayIcon=()=>jsxRuntimeExports.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:jsxRuntimeExports.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"})}),WarningIcon=()=>jsxRuntimeExports.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})});let cachedTestItems=[],cachedSummaryStatus="idle",hasRunOnce=!1;const runTestLogic=async(testCase,stopSignal)=>{try{await audioEngine.init()}catch(e){console.warn("Could not initialize audio engine for test run.")}const cleanup=async()=>{audioEngine.setMuted(!1);try{await Yield.run(Yield.parse("hush"),[],{})}catch(e){console.error("Error during post-test cleanup:",e)}};Yield.reset(),audioEngine.setMuted(!0);const stack=[],historyManager=new HistoryManager(Yield.builtInKeys),initialSnapshot=historyManager.createSnapshot(stack,Yield.dictionary);historyManager.add(initialSnapshot);const commandHistory=[],asyncOutput=[],asyncErrors=[],handleAsyncOutput=(e,o=!1)=>{const s=e.trim();s&&(o?asyncErrors.push(s):asyncOutput.push(s))};try{const runOptions={stopSignal,historyManager,commandHistory,parse:Yield.parse,onAsyncOutput:handleAsyncOutput};if(testCase.replCode){const e=Array.isArray(testCase.replCode)?testCase.replCode:[testCase.replCode];for(const o of e){if(!o.trim()||stopSignal.stopped)continue;commandHistory.push(o);const s=Yield.parse(o);if(await Yield.run(s,stack,runOptions),!["undo","redo"].includes(o.trim().toLowerCase())&&o.trim().toLowerCase()!=="again"){const p=historyManager.createSnapshot(stack,Yield.dictionary);historyManager.add(p)}}}else if(testCase.code){const e=Yield.parse(Array.isArray(testCase.code)?testCase.code.join(`
`):testCase.code);await Yield.run(e,stack,runOptions)}if(stopSignal.stopped)return{status:"failed",errorMessage:"Test run stopped by user."};if(testCase.async)return new Promise(e=>{const o=async()=>{let p;const u=formatDictionaryState(Yield.dictionary);try{asyncErrors.length>0?p={status:"failed",errorMessage:`Async error during test: ${asyncErrors.join("; ")}`,actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState:u}:testCase.async.assert(stack,Yield.dictionary,asyncOutput)?p={status:"passed"}:p={status:"failed",errorMessage:`Async assertion failed: ${testCase.async.assertDescription||testCase.async.assert.toString()}`,actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState:u}}catch(f){p={status:"failed",errorMessage:`Error during async test: ${f.message}`,dictionaryState:u}}finally{await cleanup(),e(p)}},s=audioEngine.getContextTime()+testCase.async.duration/1e3,c=`test_assert_${Date.now()}_${Math.random()}`;audioEngine.schedule(c,s,o)});const dictionaryState=formatDictionaryState(Yield.dictionary),lastItem=stack.length>0?stack[stack.length-1]:null;if(lastItem&&lastItem.type==="shader"){const e=compileShaderHeadless(lastItem.code);if(!e.success)return{status:"failed",errorMessage:`Shader compilation failed: ${e.error}

--- GLSL Source ---
${lastItem.code}`,actualOutput:"N/A",dictionaryState}}if(testCase.expectedError)return{status:"failed",errorMessage:"Expected an error but none was thrown.",actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState};if(testCase.assertString){const assertFn=eval(testCase.assertString);return assertFn(stack,Yield.dictionary)?{status:"passed"}:{status:"failed",errorMessage:`Assertion failed: ${testCase.assertString}`,actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState}}return testCase.assert?testCase.assert(stack,Yield.dictionary)?{status:"passed"}:{status:"failed",errorMessage:`Assertion failed: ${testCase.assert.toString()}`,actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState}:testCase.expected!==void 0?deepEqual(stack,testCase.expected)?{status:"passed"}:{status:"failed",errorMessage:"Stack did not match expected output.",actualOutput:`( ${stack.map(yieldFormatter).join(" ")} )`,dictionaryState}:{status:"passed"}}catch(e){const o=formatDictionaryState(Yield.dictionary);return testCase.expectedError?e.message.includes(testCase.expectedError)?{status:"passed"}:{status:"failed",errorMessage:`Error message mismatch. Expected to find "${testCase.expectedError}"`,actualOutput:e.message,dictionaryState:o}:{status:"failed",errorMessage:`${e.message}`,actualOutput:"N/A",dictionaryState:o}}finally{testCase.async||await cleanup()}},loadTestsLogic=()=>{const e=[];let o=0;for(const s of Object.values(operatorModules))for(const c in s.definitions){const p=s.definitions[c];p.examples&&p.examples.forEach((u,f)=>{e.push({id:`op-${o}`,description:`${o}: ${s.name}: ${c}`,originalTest:u,currentTest:u,result:{status:"idle"},isExpanded:!1}),o++})}for(const s of documentation)for(const c of s.cells)if(c.expected!==void 0||c.assert!==void 0||c.expectedError!==void 0||c.replCode!==void 0||c.async!==void 0){const p={code:Array.isArray(c.example)?c.example.join(`
`):c.example,replCode:c.replCode,expected:c.expected,assert:c.assert,async:c.async,expectedDescription:c.expectedDescription,expectedError:c.expectedError};e.push({id:`doc-${o}`,description:`${o}: Docs: ${s.name}: ${c.name}`,originalTest:p,currentTest:p,result:{status:"idle"},isExpanded:!1}),o++}return e},getInitialExpectationType=e=>e.async?"async":e.expectedError?"error":e.assert||e.assertString?"assert":"stack",TestCaseRunner=({item:e,onRun:o,onToggleExpand:s})=>{const c=e.currentTest.replCode?Array.isArray(e.currentTest.replCode)?e.currentTest.replCode.join(`
`):e.currentTest.replCode:Array.isArray(e.currentTest.code)?e.currentTest.code.join(`
`):String(e.currentTest.code),[p,u]=reactExports.useState(c),[f,h]=reactExports.useState(()=>getInitialExpectationType(e.currentTest)),[g,m]=reactExports.useState(()=>expectedToString(e.currentTest.expected)),[b,v]=reactExports.useState(()=>e.currentTest.expectedError||""),[S,E]=reactExports.useState(()=>{var V;return((V=e.currentTest.assert)==null?void 0:V.toString())||e.currentTest.assertString||""}),[_,q]=reactExports.useState(()=>{var V,ee;return((V=e.currentTest.async)==null?void 0:V.assertDescription)||((ee=e.currentTest.async)==null?void 0:ee.assert.toString())||""}),[R,B]=reactExports.useState(""),[z,L]=reactExports.useState("Copy Issue");reactExports.useEffect(()=>{var ee,oe,K;const V=e.currentTest.replCode?Array.isArray(e.currentTest.replCode)?e.currentTest.replCode.join(`
`):e.currentTest.replCode:Array.isArray(e.currentTest.code)?e.currentTest.code.join(`
`):String(e.currentTest.code);u(V),h(getInitialExpectationType(e.currentTest)),m(expectedToString(e.currentTest.expected)),v(e.currentTest.expectedError||""),E(((ee=e.currentTest.assert)==null?void 0:ee.toString())||e.currentTest.assertString||""),q(((oe=e.currentTest.async)==null?void 0:oe.assertDescription)||((K=e.currentTest.async)==null?void 0:K.toString())||"")},[e.currentTest]);const I=()=>{const V={...e.currentTest,expected:void 0,expectedError:void 0,assert:void 0,assertString:void 0,async:void 0,expectedDescription:void 0,expectedType:void 0};switch(e.currentTest.replCode?V.replCode=p:V.code=p,f){case"stack":V.expected=stringToExpected(g);break;case"error":V.expectedError=b;break;case"assert":V.assertString=S;break;case"async":V.async=e.originalTest.async;break}o(e.id,V)},W=V=>{V.stopPropagation();const ee=Array.isArray(e.currentTest.code)?e.currentTest.code.join(`
`):String(e.currentTest.code);let oe="";e.currentTest.expected!==void 0?oe=`( ${e.currentTest.expected.map(yieldFormatter).join(" ")} )`:e.currentTest.expectedDescription?oe=e.currentTest.expectedDescription:e.currentTest.expectedType?oe=`A value of type: ${e.currentTest.expectedType}`:e.currentTest.assertString?oe=`Custom assertion: ${e.currentTest.assertString}`:e.currentTest.assert&&(oe=`Custom assertion: ${e.currentTest.assert.toString()}`);const K=`Implement this test for ${e.description}

Code:
${ee}

Expected:
${oe}`;navigator.clipboard.writeText(K).then(()=>{B("Copied!"),setTimeout(()=>B(""),2e3)})},Y=V=>{V.stopPropagation(),navigator.clipboard.writeText(formatFailedTest(e)).then(()=>{L("Copied!"),setTimeout(()=>L("Copy Issue"),2e3)})},te={passed:{border:"border-green-200",bg:"bg-green-50/50",headerBg:"hover:bg-green-100",text:"text-green-500",title:"text-gray-700"},failed:{border:"border-red-200",bg:"bg-red-50",headerBg:"hover:bg-red-100",text:"text-red-500",title:"text-gray-800"},idle:{border:"border-gray-200",bg:"bg-white",headerBg:"hover:bg-gray-100",text:"text-gray-400",title:"text-gray-600"}}[e.result.status];return jsxRuntimeExports.jsxs("div",{className:`test-case-runner p-3 rounded-md border ${te.border} ${te.bg}`,children:[jsxRuntimeExports.jsxs("div",{className:`flex items-center cursor-pointer p-1 -m-1 rounded ${te.headerBg}`,onClick:s,children:[jsxRuntimeExports.jsx("div",{className:"flex-shrink-0 w-6",children:e.isExpanded?jsxRuntimeExports.jsx(ChevronDownIcon,{}):jsxRuntimeExports.jsx(ChevronRightIcon,{})}),jsxRuntimeExports.jsxs("span",{className:`${te.text} font-bold mr-3 uppercase text-sm`,children:["[",e.result.status,"]"]}),jsxRuntimeExports.jsx("p",{className:`${te.title} flex-grow`,children:e.description}),jsxRuntimeExports.jsx("button",{onClick:W,className:"repl-btn text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 p-1.5 h-auto rounded-md",title:"Copy Code",children:R||jsxRuntimeExports.jsx(CopyIcon,{})})]}),e.isExpanded&&jsxRuntimeExports.jsxs("div",{className:"mt-3 pt-3 border-t pl-6",children:[jsxRuntimeExports.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[jsxRuntimeExports.jsxs("div",{children:[jsxRuntimeExports.jsx("label",{className:"block text-sm font-medium text-gray-600 mb-1",children:"Code:"}),jsxRuntimeExports.jsx("textarea",{value:p,onChange:V=>u(V.target.value),className:"w-full p-2 rounded text-sm fira-code border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100",rows:Math.max(3,p.split(`
`).length)})]}),jsxRuntimeExports.jsxs("div",{children:[jsxRuntimeExports.jsx("label",{className:"block text-sm font-medium text-gray-600 mb-1",children:"Expectation Type:"}),jsxRuntimeExports.jsxs("div",{className:"flex space-x-4 mb-2",children:[jsxRuntimeExports.jsxs("label",{className:"flex items-center text-sm",children:[jsxRuntimeExports.jsx("input",{type:"radio",value:"stack",checked:f==="stack",onChange:()=>h("stack"),className:"mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),"Stack"]}),jsxRuntimeExports.jsxs("label",{className:"flex items-center text-sm",children:[jsxRuntimeExports.jsx("input",{type:"radio",value:"error",checked:f==="error",onChange:()=>h("error"),className:"mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),"Error"]}),jsxRuntimeExports.jsxs("label",{className:"flex items-center text-sm",children:[jsxRuntimeExports.jsx("input",{type:"radio",value:"assert",checked:f==="assert",onChange:()=>h("assert"),className:"mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),"Assert"]}),jsxRuntimeExports.jsxs("label",{className:"flex items-center text-sm",children:[jsxRuntimeExports.jsx("input",{type:"radio",value:"async",checked:f==="async",onChange:()=>h("async"),className:"mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"}),"Async"]})]}),f==="stack"&&jsxRuntimeExports.jsx("input",{type:"text",value:g,onChange:V=>m(V.target.value),placeholder:'e.g., 10 "hello"',className:"w-full p-2 rounded text-sm fira-code border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"}),f==="error"&&jsxRuntimeExports.jsx("input",{type:"text",value:b,onChange:V=>v(V.target.value),placeholder:"e.g., Stack underflow",className:"w-full p-2 rounded text-sm fira-code border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"}),f==="assert"&&jsxRuntimeExports.jsx("textarea",{value:S,onChange:V=>E(V.target.value),placeholder:"for example: s => s.length === 1",className:"w-full p-2 rounded text-sm fira-code border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100",rows:3}),f==="async"&&jsxRuntimeExports.jsx("textarea",{value:_,readOnly:!0,className:"w-full p-2 rounded text-sm fira-code border border-gray-400 bg-gray-700 text-gray-300 cursor-not-allowed",rows:3}),e.result.status!=="passed"&&e.result.status!=="idle"&&jsxRuntimeExports.jsxs("div",{className:"mt-2 text-sm",children:[jsxRuntimeExports.jsxs("p",{className:"fira-code text-gray-700 whitespace-pre-wrap",children:[jsxRuntimeExports.jsx("span",{className:"font-semibold",children:"Reason:"})," ",e.result.errorMessage]}),jsxRuntimeExports.jsxs("p",{className:`fira-code ${te.text}`,children:[jsxRuntimeExports.jsx("span",{className:"font-semibold",children:"Actual:"})," ",e.result.actualOutput||"N/A"]}),e.result.dictionaryState&&jsxRuntimeExports.jsx("pre",{className:"fira-code text-gray-500 mt-2 p-2 bg-gray-900 text-xs rounded whitespace-pre-wrap",children:e.result.dictionaryState})]})]})]}),jsxRuntimeExports.jsxs("div",{className:"mt-4 flex justify-end items-center space-x-2",children:[e.result.status==="failed"&&jsxRuntimeExports.jsxs("button",{onClick:Y,className:"repl-btn bg-amber-500 hover:bg-amber-600 text-white text-sm flex items-center space-x-2",children:[jsxRuntimeExports.jsx(WarningIcon,{}),jsxRuntimeExports.jsx("span",{children:z})]}),jsxRuntimeExports.jsxs("button",{onClick:I,className:"repl-btn repl-btn-primary text-sm flex items-center space-x-2",children:[jsxRuntimeExports.jsx(PlayIcon,{}),jsxRuntimeExports.jsx("span",{children:"Re-run This Test"})]})]})]})]})},TestRunner=()=>{const[e,o]=reactExports.useState(cachedTestItems),[s,c]=reactExports.useState(!1),[p,u]=reactExports.useState(cachedSummaryStatus),[f,h]=reactExports.useState("all"),[g,m]=reactExports.useState({completed:0,total:0}),[b,v]=reactExports.useState("Copy Issues"),S=reactExports.useRef({stopped:!1}),E=reactExports.useCallback(async F=>runTestLogic(F,S.current),[]),_=reactExports.useCallback(async()=>{c(!0),u("running"),S.current.stopped=!1;const F=loadTestsLogic();o(F),m({completed:0,total:F.length});let te=!0;const V=[...F];for(let ee=0;ee<V.length&&!S.current.stopped;ee++){const oe=V[ee],K=await E(oe.currentTest);K.status==="failed"&&(te=!1),V[ee]={...oe,result:K,isExpanded:K.status==="failed"},m({completed:ee+1,total:V.length}),(ee%5===0||ee===V.length-1)&&(o([...V]),await new Promise(P=>setTimeout(P,0)))}V.sort((ee,oe)=>ee.result.status==="failed"&&oe.result.status!=="failed"?-1:ee.result.status!=="failed"&&oe.result.status==="failed"?1:0),o(V),cachedTestItems=V,u(te?"success":"failure"),cachedSummaryStatus=te?"success":"failure",c(!1),hasRunOnce=!0},[E]);reactExports.useEffect(()=>{const F=()=>{hasRunOnce||_()};if(audioEngine.isReady()){F();return}if(hasRunOnce)o(cachedTestItems),u(cachedSummaryStatus);else{const te=loadTestsLogic();o(te),m({completed:0,total:te.length})}return audioEngine.onReady(F),()=>{audioEngine.offReady(F)}},[_]);const q=reactExports.useCallback(async(F,te)=>{const V=e.findIndex(oe=>oe.id===F);if(V===-1)return;const ee=await runTestLogic(te,{stopped:!1});o(oe=>{const K=[...oe];return K[V]={...K[V],currentTest:te,result:ee},cachedTestItems=K,K})},[e]),R=()=>{const F=e.filter(V=>V.result.status==="failed");if(F.length===0)return;const te=F.map(formatFailedTest).join(`


`);navigator.clipboard.writeText(te).then(()=>{v("Copied!"),setTimeout(()=>v("Copy Issues"),2e3)})},B=F=>{o(te=>{const V=te.map(ee=>ee.id===F?{...ee,isExpanded:!ee.isExpanded}:ee);return cachedTestItems=V,V})},z=()=>{S.current.stopped=!0,c(!1)},L=e.filter(F=>f==="all"?!0:F.result.status===f),I=e.filter(F=>F.result.status==="passed").length,W=e.filter(F=>F.result.status==="failed").length,Y=e.filter(F=>F.result.status==="idle").length;return jsxRuntimeExports.jsxs("div",{className:"test-runner-container bg-gray-50 p-4 rounded-lg shadow-inner",children:[jsxRuntimeExports.jsxs("div",{className:"flex justify-between items-center mb-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 py-3",children:[jsxRuntimeExports.jsxs("div",{className:"flex items-center space-x-4",children:[s?jsxRuntimeExports.jsx("button",{onClick:z,className:"repl-btn bg-red-500 hover:bg-red-600 text-white",children:"Stop"}):jsxRuntimeExports.jsx("button",{onClick:_,disabled:s,className:"repl-btn repl-btn-primary",children:"Run All Tests"}),W>0&&!s&&jsxRuntimeExports.jsxs("button",{onClick:R,className:"repl-btn bg-amber-500 hover:bg-amber-600 text-white flex items-center space-x-2",children:[jsxRuntimeExports.jsx(WarningIcon,{}),jsxRuntimeExports.jsx("span",{children:b})]})]}),jsxRuntimeExports.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[jsxRuntimeExports.jsxs("button",{onClick:()=>h("all"),className:`px-2 py-1 rounded ${f==="all"?"bg-indigo-100 text-indigo-700":"text-gray-600"}`,children:["All (",e.length,")"]}),jsxRuntimeExports.jsxs("button",{onClick:()=>h("passed"),className:`px-2 py-1 rounded ${f==="passed"?"bg-green-100 text-green-700":"text-gray-600"}`,children:["Passed (",I,")"]}),jsxRuntimeExports.jsxs("button",{onClick:()=>h("failed"),className:`px-2 py-1 rounded ${f==="failed"?"bg-red-100 text-red-700":"text-gray-600"}`,children:["Failed (",W,")"]}),Y>0&&jsxRuntimeExports.jsxs("button",{onClick:()=>h("idle"),className:`px-2 py-1 rounded ${f==="idle"?"bg-gray-200 text-gray-700":"text-gray-600"}`,children:["Idle (",Y,")"]})]}),jsxRuntimeExports.jsxs("div",{className:`summary-status text-lg font-bold ${p==="running"?"text-gray-500":p==="success"?"text-green-500":p==="failure"?"text-red-500":"text-gray-700"}`,children:[s&&jsxRuntimeExports.jsxs("span",{className:"animate-pulse",children:["Running... (",g.completed," / ",g.total||e.length,")"]}),!s&&p==="success"&&"All Tests Passed!",!s&&p==="failure"&&`${W} / ${e.length} Tests Failed`,!s&&p==="idle"&&"Ready to run tests."]})]}),jsxRuntimeExports.jsx("div",{className:"space-y-2",children:L.map(F=>jsxRuntimeExports.jsx(TestCaseRunner,{item:F,onRun:q,onToggleExpand:()=>B(F.id)},F.id))})]})},ReferencePage=()=>{const[e,o]=reactExports.useState(""),[s,c]=reactExports.useState(new Set(["all"])),p=reactExports.useMemo(()=>{const v=new Map;if(Yield.aliases)for(const _ in Yield.aliases){const q=Yield.aliases[_];v.has(q)||v.set(q,[]),v.get(q).push(_)}const S=new Map;for(const[_,q]of Object.entries(operatorModules))for(const[R,B]of Object.entries(q.definitions))S.has(B)?S.get(B).names.push(R):S.set(B,{names:[R],category:_,description:B.definition.description,effect:B.definition.effect,examples:B.examples.filter(z=>!z.expectedError),keywords:B.keywords});return Array.from(S.values()).map(_=>{_.names.sort((L,I)=>I.length-L.length||L.localeCompare(I));const q=_.names[0],R=_.names.slice(1),B=v.get(q)||[],z=[...new Set([...R,...B])];return{name:q,aliases:z,category:_.category,description:_.description,effect:_.effect,examples:_.examples,keywords:_.keywords}}).sort((_,q)=>_.name.localeCompare(q.name))},[]),u=reactExports.useMemo(()=>p.filter(v=>{const S=s.has("all")||s.has(v.category),E=e.toLowerCase();if(!E)return S;const _=v.name.toLowerCase().includes(E),q=v.aliases.some(z=>z.toLowerCase().includes(E)),R=v.keywords&&v.keywords.some(z=>z.toLowerCase().includes(E));return S&&(_||q||R)}),[p,e,s]),f=reactExports.useMemo(()=>["all",...Object.keys(operatorModules)],[]),h=(v,S)=>{S.shiftKey?c(E=>{const _=new Set(E);return v==="all"?new Set(["all"]):(_.delete("all"),_.has(v)?_.delete(v):_.add(v),_.size===0?new Set(["all"]):_)}):c(new Set([v]))},g=()=>{o(""),c(new Set(["all"]))},m=!s.has("all")||s.size>1,b=e!==""||m;return jsxRuntimeExports.jsxs("div",{id:"reference-container",children:[jsxRuntimeExports.jsxs("div",{className:"sticky top-0 bg-gray-100/80 backdrop-blur-sm z-10 py-4 mb-6",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Search for an operator...",value:e,onChange:v=>o(v.target.value),className:"w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm","aria-label":"Search operators"}),jsxRuntimeExports.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[f.map(v=>jsxRuntimeExports.jsx("button",{onClick:S=>h(v,S),className:`repl-btn text-sm capitalize ${s.has(v)?"repl-btn-primary":"bg-white text-gray-700 hover:bg-gray-200 border-gray-300 border"}`,children:v.replace(/([A-Z])/g," $1")},v)),b&&jsxRuntimeExports.jsx("button",{onClick:g,className:"text-sm text-indigo-600 hover:underline ml-auto px-2","aria-label":"Clear all filters",children:"Clear filters"})]})]}),jsxRuntimeExports.jsx("div",{className:"operator-list",children:u.length>0?u.map(v=>jsxRuntimeExports.jsx(NotebookCell,{cellData:v},v.name)):jsxRuntimeExports.jsx("p",{className:"text-center text-gray-500 mt-8",children:e?jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:['No operators found matching "',jsxRuntimeExports.jsx("strong",{children:e}),'"',m?" in the selected categories":"","."]}):m?"No operators found in the selected categories.":"No operators found matching your criteria."})})]})},InlineCode=({children:e})=>jsxRuntimeExports.jsx("code",{className:"bg-gray-200 text-gray-800 p-1 rounded-sm fira-code text-sm font-semibold",children:e}),SectionTitle=({children:e})=>jsxRuntimeExports.jsx("h2",{className:"text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2",children:e}),SubTitle=({children:e})=>jsxRuntimeExports.jsx("h3",{className:"text-2xl font-bold text-gray-700 mt-6 mb-3",children:e}),parseMarkdown=e=>{const o=e.split(`
`),s=[];let c=!1,p=[],u=0;const f=h=>h.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((m,b)=>m.startsWith("`")&&m.endsWith("`")?jsxRuntimeExports.jsx(InlineCode,{children:m.slice(1,-1)},b):m.startsWith("**")&&m.endsWith("**")?jsxRuntimeExports.jsx("strong",{children:m.slice(2,-2)},b):m);for(let h=0;h<o.length;h++){const g=o[h];if(g.startsWith("```")){if(c){const b={name:"Synopsis Example",description:"",effect:"",example:p.join(`
`)};s.push(jsxRuntimeExports.jsx(NotebookCell,{cellData:b,compact:!0},`cell-${u++}`)),p=[]}c=!c;continue}if(c){p.push(g);continue}if(g.startsWith("# "))s.push(jsxRuntimeExports.jsx("h1",{className:"text-4xl font-bold text-gray-900 mb-4",children:f(g.substring(2))},`h1-${u++}`));else if(g.startsWith("## "))s.push(jsxRuntimeExports.jsx(SectionTitle,{children:f(g.substring(3))},`h2-${u++}`));else if(g.startsWith("### "))s.push(jsxRuntimeExports.jsx(SubTitle,{children:f(g.substring(4))},`h3-${u++}`));else if(g.startsWith("> ")){let m=[g.substring(2)];for(;h+1<o.length&&o[h+1].startsWith("> ");)h++,m.push(o[h].substring(2));s.push(jsxRuntimeExports.jsx("pre",{className:"bg-gray-100 border p-4 rounded-md my-4 text-sm",children:jsxRuntimeExports.jsx("code",{children:m.join(`
`)})},`bq-${u++}`))}else g.trim()!==""&&s.push(jsxRuntimeExports.jsx("p",{className:"mb-4 text-gray-700",children:f(g)},`p-${u++}`))}if(c&&p.length>0){const g={name:"Synopsis Example",description:"",effect:"",example:p.join(`
`)};s.push(jsxRuntimeExports.jsx(NotebookCell,{cellData:g,compact:!0},`cell-${u++}`))}return s},SynopsisPage=()=>{const[e,o]=reactExports.useState(null),[s,c]=reactExports.useState(null);return reactExports.useEffect(()=>{fetch("./synopsis.md").then(p=>{if(!p.ok)throw new Error(`HTTP error! status: ${p.status}`);return p.text()}).then(p=>{o(parseMarkdown(p))}).catch(p=>{console.error("Failed to load synopsis.md:",p),c("Failed to load synopsis content.")})},[]),s?jsxRuntimeExports.jsx("div",{className:"bg-white p-6 md:p-8 rounded-lg shadow text-red-500",children:s}):e?jsxRuntimeExports.jsx("div",{className:"bg-white p-6 md:p-8 rounded-lg shadow",children:e}):jsxRuntimeExports.jsx("div",{className:"bg-white p-6 md:p-8 rounded-lg shadow",children:"Loading..."})},ChevronIcon=({isExpanded:e})=>jsxRuntimeExports.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:`h-6 w-6 transition-transform duration-200 text-gray-500 ${e?"rotate-180":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:jsxRuntimeExports.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})}),CollapsibleSection=({section:e})=>{const[o,s]=reactExports.useState(!1),c=`section-content-${e.name.replace(/\s+/g,"-")}`;return jsxRuntimeExports.jsxs("div",{className:"mb-4 border rounded-lg overflow-hidden shadow-sm bg-white",children:[jsxRuntimeExports.jsxs("button",{className:"w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500",onClick:()=>s(!o),"aria-expanded":o,"aria-controls":c,children:[jsxRuntimeExports.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:e.name}),jsxRuntimeExports.jsx(ChevronIcon,{isExpanded:o})]}),o&&jsxRuntimeExports.jsxs("div",{id:c,className:"p-4 border-t border-gray-200",children:[e.description&&jsxRuntimeExports.jsx("p",{className:"mb-4 text-gray-600",children:e.description}),e.cells.map(p=>jsxRuntimeExports.jsx(NotebookCell,{cellData:p},p.name))]})]})},TutorialPage=()=>jsxRuntimeExports.jsx("div",{id:"notebook-container",children:documentation.map(e=>jsxRuntimeExports.jsx(CollapsibleSection,{section:e},e.name))}),App=()=>{const[e,o]=reactExports.useState(window.location.hash);reactExports.useEffect(()=>{const m=()=>{o(window.location.hash)};return window.addEventListener("hashchange",m),()=>{window.removeEventListener("hashchange",m)}},[]),reactExports.useEffect(()=>{const m=()=>{audioEngine.init()};window.addEventListener("click",m,{once:!0}),window.addEventListener("keydown",m,{once:!0})},[]),reactExports.useEffect(()=>{const m=S=>{isMouseDownState.down=!0,mouseDownState.x=S.clientX,mouseDownState.y=S.clientY,audioEngine.setMouseDown(S.clientX,S.clientY,!0)},b=S=>{isMouseDownState.down=!1,audioEngine.setMouseDown(S.clientX,S.clientY,!1)},v=S=>{audioEngine.setMouse(S.clientX,S.clientY),mouseState.x=S.clientX,mouseState.y=S.clientY,isMouseDownState.down&&(mouseDownState.x=S.clientX,mouseDownState.y=S.clientY,audioEngine.setMouseDown(S.clientX,S.clientY,!0))};return window.addEventListener("mousedown",m),window.addEventListener("mouseup",b),window.addEventListener("mousemove",v),()=>{window.removeEventListener("mousedown",m),window.removeEventListener("mouseup",b),window.removeEventListener("mousemove",v)}},[]);const s=(m,b)=>{m.preventDefault(),window.location.hash=b,o(b)},c=()=>{switch(e){case"#/synopsis":return jsxRuntimeExports.jsx(SynopsisPage,{});case"#/reference":return jsxRuntimeExports.jsx(ReferencePage,{});case"#/tutorial":return jsxRuntimeExports.jsx(TutorialPage,{});case"#/tests":return jsxRuntimeExports.jsx(TestRunner,{});case"#/repl":case"#":case"#/":case"":default:return jsxRuntimeExports.jsx(Repl,{})}},p=["#/repl","#","#/",""].includes(e),u=e==="#/synopsis",f=e==="#/reference",h=e==="#/tests",g=e==="#/tutorial";return jsxRuntimeExports.jsxs("div",{className:`mx-auto ${p?"max-w-full":"max-w-4xl"}`,children:[jsxRuntimeExports.jsxs("header",{className:"mb-8 text-center",children:[jsxRuntimeExports.jsx("h1",{className:"text-5xl font-bold text-gray-900",children:"Yield"}),jsxRuntimeExports.jsx("p",{className:"mt-2 text-lg text-gray-600",children:"Concatenative live coding language that yields"}),jsxRuntimeExports.jsxs("nav",{className:"mt-4 space-x-4",children:[jsxRuntimeExports.jsx("a",{href:"#/repl",onClick:m=>s(m,"#/repl"),className:`text-indigo-600 hover:underline ${p?"font-bold":""}`,children:"REPL"}),jsxRuntimeExports.jsx("a",{href:"#/synopsis",onClick:m=>s(m,"#/synopsis"),className:`text-indigo-600 hover:underline ${u?"font-bold":""}`,children:"Synopsis"}),jsxRuntimeExports.jsx("a",{href:"#/reference",onClick:m=>s(m,"#/reference"),className:`text-indigo-600 hover:underline ${f?"font-bold":""}`,children:"Reference"}),jsxRuntimeExports.jsx("a",{href:"#/tutorial",onClick:m=>s(m,"#/tutorial"),className:`text-indigo-600 hover:underline ${g?"font-bold":""}`,children:"Tutorial"}),jsxRuntimeExports.jsx("a",{href:"#/tests",onClick:m=>s(m,"#/tests"),className:`text-indigo-600 hover:underline ${h?"font-bold":""}`,children:"Test Suite"})]})]}),jsxRuntimeExports.jsx("main",{children:c()})]})},container=document.getElementById("root"),root=clientExports.createRoot(container);root.render(jsxRuntimeExports.jsx(App,{}));
