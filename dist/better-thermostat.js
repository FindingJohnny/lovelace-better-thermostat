function t(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${c}`),d="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],s=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,c=0;const{strings:h,values:{length:p}}=t;for(;c<p;){const t=s.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)u(e[t].name,d)&&n++;for(;n-- >0;){const e=h[c],i=f.exec(e)[2],n=i.toLowerCase()+d,s=t.getAttribute(n);t.removeAttribute(n);const r=s.split(l);this.parts.push({type:"attribute",index:o,name:i,strings:r}),c+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const n=t.parentNode,s=e.split(l),r=s.length-1;for(let e=0;e<r;e++){let i,r=s[e];if(""===r)i=m();else{const t=f.exec(r);null!==t&&u(t[2],d)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-d.length)+t[3]),i=document.createTextNode(r)}n.insertBefore(i,t),this.parts.push({type:"node",index:++o})}""===s[r]?(n.insertBefore(m(),t),i.push(t)):t.data=s[r],c+=r}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(m(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(i.push(t),o--),c++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),c++}}else s.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const u=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},p=t=>-1!==t.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,c=s.nextNode();for(;o<i.length;)if(r=i[o],p(r)){for(;a<r.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=e.pop(),c=s.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=` ${a} `;class y{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],s=t.lastIndexOf("\x3c!--");i=(s>-1||i)&&-1===t.indexOf("--\x3e",s+1);const r=f.exec(t);e+=null===r?t+(i?v:c):t.substr(0,r.index)+r[1]+r[2]+d+r[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const _=t=>null===t||!("object"==typeof t||"function"==typeof t),w=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let n=0;n<e;n++){i+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(_(t)||!w(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||_(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(_(t)?t!==this.value&&this.__commitText(t):t instanceof y?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):w(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const i=new g(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const s of t)void 0===(i=e[n])&&(i=new C(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(s),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class T extends S{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends b{}let P=!1;try{const t={get capture(){return P=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=N(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(P?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const A=new class{handleAttributeExpressions(t,e,i,n){const s=e[0];return"."===s?new T(t,e.slice(1),i).parts:"@"===s?[new E(t,e.slice(1),n.eventContext)]:"?"===s?[new x(t,e.slice(1),i)]:new S(t,e,i).parts}handleTextExpression(t){return new C(t)}};function k(t){let e=O.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},O.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(a);return void 0===(i=e.keyString.get(n))&&(i=new h(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const O=new Map,H=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const L=(t,...e)=>new y(t,e,"html",A),D=133;function $(t,e){const{element:{content:i},parts:n}=t,s=document.createTreeWalker(i,D,null,!1);let r=R(n),o=n[r],a=-1,c=0;const l=[];let d=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,o=n[r=R(n,r)]}l.forEach(t=>t.parentNode.removeChild(t))}const V=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,D,null,!1);for(;i.nextNode();)e++;return e},R=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};const Y=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const j=t=>e=>{const i=Y(e.type,t);let n=O.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},O.set(i,n));let s=n.stringsArray.get(e.strings);if(void 0!==s)return s;const r=e.strings.join(a);if(void 0===(s=n.keyString.get(r))){const i=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,t),s=new h(e,i),n.keyString.set(r,s)}return n.stringsArray.set(e.strings,s),s},z=["html","svg"],I=new Set,F=(t,e,i)=>{I.add(t);const n=i?i.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:r}=s;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=s[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach(e=>{const i=O.get(Y(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),$(t,i)})})})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:s}=t;if(null==i)return void n.appendChild(e);const r=document.createTreeWalker(n,D,null,!1);let o=R(s),a=0,c=-1;for(;r.nextNode();)for(c++,r.currentNode===i&&(a=V(e),i.parentNode.insertBefore(e,i));-1!==o&&s[o].index===c;){if(a>0){for(;-1!==o;)s[o].index+=a,o=R(s,o);return}o=R(s,o)}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),$(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:B},J=Promise.resolve(!0),Z=1,X=4,G=8,K=16,Q=32,tt="finalized";class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=J,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const n=this[t];this[i]=e,this._requestUpdate(t,n)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this[tt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=B){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||q,s="function"==typeof n?n:n.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||q.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Q,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=W){const n=this.constructor,s=n._attributeNameForProperty(t,i);if(void 0!==s){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|G,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=this._updateState&~G}}_attributeToProperty(t,e){if(this._updateState&G)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i._classProperties.get(n)||W;this._updateState=this._updateState|K,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~K}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const n=this.constructor,s=n._classProperties.get(t)||W;n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||this._updateState&K||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|X;const i=this._updatePromise;this._updatePromise=new Promise((i,n)=>{t=i,e=n});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Q}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&Z}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Z||(this._updateState=this._updateState|Z,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}et[tt]=!0;const it=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),nt=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?nt(t,e,i):it(t,e)}const rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const ct=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let n=0,s=e.length;n<s;n++){const s=e[n];Array.isArray(s)?t(s,i):i.push(s)}return i}(t);class lt extends et{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ct(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}lt.finalized=!0,lt.render=((t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=H.has(e),o=U&&11===e.nodeType&&!!e.host,a=o&&!I.has(n),c=a?document.createDocumentFragment():e;if(((t,e,i)=>{let n=H.get(e);void 0===n&&(s(e,e.firstChild),H.set(e,n=new C(Object.assign({templateFactory:k},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:j(n)},i)),a){const t=H.get(c);H.delete(c);const i=t.value instanceof g?t.value.template:void 0;F(n,c,i),s(e,e.firstChild),e.appendChild(c),H.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var dt={},ht=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ut="[^\\s]+",pt=/\[([^]*?)\]/gm,mt=function(){};function ft(t,e){for(var i=[],n=0,s=t.length;n<s;n++)i.push(t[n].substr(0,e));return i}function gt(t){return function(e,i,n){var s=n[t].indexOf(i.charAt(0).toUpperCase()+i.substr(1).toLowerCase());~s&&(e.month=s)}}function vt(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var yt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["January","February","March","April","May","June","July","August","September","October","November","December"],wt=ft(_t,3),St=ft(yt,3);dt.i18n={dayNamesShort:St,dayNames:yt,monthNamesShort:wt,monthNames:_t,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var bt={D:function(t){return t.getDate()},DD:function(t){return vt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return vt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return vt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return vt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return vt(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return vt(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return vt(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return vt(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return vt(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return vt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return vt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+vt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},Ct={D:["\\d\\d?",function(t,e){t.day=e}],Do:["\\d\\d?"+ut,function(t,e){t.day=parseInt(e,10)}],M:["\\d\\d?",function(t,e){t.month=e-1}],YY:["\\d\\d?",function(t,e){var i=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?i-1:i)+e}],h:["\\d\\d?",function(t,e){t.hour=e}],m:["\\d\\d?",function(t,e){t.minute=e}],s:["\\d\\d?",function(t,e){t.second=e}],YYYY:["\\d{4}",function(t,e){t.year=e}],S:["\\d",function(t,e){t.millisecond=100*e}],SS:["\\d{2}",function(t,e){t.millisecond=10*e}],SSS:["\\d{3}",function(t,e){t.millisecond=e}],d:["\\d\\d?",mt],ddd:[ut,mt],MMM:[ut,gt("monthNamesShort")],MMMM:[ut,gt("monthNames")],a:[ut,function(t,e,i){var n=e.toLowerCase();n===i.amPm[0]?t.isPm=!1:n===i.amPm[1]&&(t.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(t,e){var i,n=(e+"").match(/([+-]|\d\d)/gi);n&&(i=60*n[1]+parseInt(n[2],10),t.timezoneOffset="+"===n[0]?i:-i)}]};Ct.dd=Ct.d,Ct.dddd=Ct.ddd,Ct.DD=Ct.D,Ct.mm=Ct.m,Ct.hh=Ct.H=Ct.HH=Ct.h,Ct.MM=Ct.M,Ct.ss=Ct.s,Ct.A=Ct.a,dt.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},dt.format=function(t,e,i){var n=i||dt.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");e=dt.masks[e]||e||dt.masks.default;var s=[];return(e=(e=e.replace(pt,function(t,e){return s.push(e),"@@@"})).replace(ht,function(e){return e in bt?bt[e](t,n):e.slice(1,e.length-1)})).replace(/@@@/g,function(){return s.shift()})},dt.parse=function(t,e,i){var n=i||dt.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=dt.masks[e]||e,t.length>1e3)return null;var s={},r=[],o=[];e=e.replace(pt,function(t,e){return o.push(e),"@@@"});var a,c=(a=e,a.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(ht,function(t){if(Ct[t]){var e=Ct[t];return r.push(e[1]),"("+e[0]+")"}return t});c=c.replace(/@@@/g,function(){return o.shift()});var l=t.match(new RegExp(c,"i"));if(!l)return null;for(var d=1;d<l.length;d++)r[d-1](s,l[d],n);var h,u=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,h=new Date(Date.UTC(s.year||u.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):h=new Date(s.year||u.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),h};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var xt=["closed","locked","off"],Tt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s},Mt=function(t,e){Tt(t,"haptic",e)},Pt=function(t,e,i,n,s){var r;switch(s&&i.dbltap_action?r=i.dbltap_action:n&&i.hold_action?r=i.hold_action:!n&&i.tap_action&&(r=i.tap_action),r||(r={action:"more-info"}),r.action){case"more-info":(i.entity||i.camera_image)&&(Tt(t,"hass-more-info",{entityId:r.entity?r.entity:i.entity?i.entity:i.camera_image}),r.haptic&&Mt(t,r.haptic));break;case"navigate":r.navigation_path&&(function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Tt(window,"location-changed",{replace:i})}(0,r.navigation_path),r.haptic&&Mt(t,r.haptic));break;case"url":r.url&&window.open(r.url),r.haptic&&Mt(t,r.haptic);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,s=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(r,n,{entity_id:e})})(t,e,xt.includes(t.states[e].state))}(e,i.entity),r.haptic&&Mt(t,r.haptic));break;case"call-service":if(!r.service)return;var o=r.service.split(".",2),a=o[0],c=o[1],l=Object.assign({},r.service_data);"entity"===l.entity_id&&(l.entity_id=i.entity),e.callService(a,c,l),r.haptic&&Mt(t,r.haptic)}};function Et(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}String(Math.random()).slice(2);try{const t={get capture(){return!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");var Nt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,At=function(t){function e(){t.call(this),this.holdTime=500,this.ripple=document.createElement("paper-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1,this.nbClicks=0}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.connectedCallback=function(){var t=this;Object.assign(this.style,{borderRadius:"50%",position:"absolute",width:Nt?"100px":"50px",height:Nt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.style.color="#03a9f4",this.ripple.style.color="var(--primary-color)",["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(function(e){document.addEventListener(e,function(){clearTimeout(t.timer),t.stopAnimation(),t.timer=void 0},{passive:!0})})},e.prototype.bind=function(t){var e=this;if(!t.longPress){t.longPress=!0,t.addEventListener("contextmenu",function(t){var e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});var i=function(i){var n,s;e.cooldownStart||(e.held=!1,i.touches?(n=i.touches[0].pageX,s=i.touches[0].pageY):(n=i.pageX,s=i.pageY),e.timer=window.setTimeout(function(){e.startAnimation(n,s),e.held=!0,t.repeat&&!t.isRepeating&&(t.isRepeating=!0,e.repeatTimeout=setInterval(function(){t.dispatchEvent(new Event("ha-hold"))},t.repeat))},e.holdTime),e.cooldownStart=!0,window.setTimeout(function(){return e.cooldownStart=!1},100))},n=function(i){e.cooldownEnd||["touchend","touchcancel"].includes(i.type)&&void 0===e.timer?t.isRepeating&&e.repeatTimeout&&(clearInterval(e.repeatTimeout),t.isRepeating=!1):(clearTimeout(e.timer),t.isRepeating&&e.repeatTimeout&&clearInterval(e.repeatTimeout),t.isRepeating=!1,e.stopAnimation(),e.timer=void 0,e.held?t.repeat||t.dispatchEvent(new Event("ha-hold")):t.hasDblClick?0===e.nbClicks?(e.nbClicks+=1,e.dblClickTimeout=window.setTimeout(function(){1===e.nbClicks&&(e.nbClicks=0,t.dispatchEvent(new Event("ha-click")))},250)):(e.nbClicks=0,clearTimeout(e.dblClickTimeout),t.dispatchEvent(new Event("ha-dblclick"))):t.dispatchEvent(new Event("ha-click")),e.cooldownEnd=!0,window.setTimeout(function(){return e.cooldownEnd=!1},100))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",n)}},e.prototype.startAnimation=function(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.holdDown=!0,this.ripple.simulatedRipple()},e.prototype.stopAnimation=function(){this.ripple.holdDown=!1,this.style.display="none"},e}(HTMLElement);customElements.get("long-press-custom-card-helpers")||customElements.define("long-press-custom-card-helpers",At);const kt=((t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new at(i,ot)})`
  .hvac-heat-mode {
    --round-slider-bar-color: DarkOrange;
    --round-slider-handle-color: DarkOrange;
  }
  .hvac-cool-mode {
    --round-slider-bar-color: DeepSkyBlue;
    --round-slider-handle-color: DeepSkyBlue;
  }
  .hvac-auto-mode {
    --round-slider-bar-color: DarkGreen;
    --round-slider-handle-color: DarkGreen;
  }
  .thermostat-card {
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .center-items {
    align-items: center;
  }
  .center-self {
    align-self: center;
  }
  .space-evenly {
    justify-content: space-evenly;
  }
  .current-mode {
    font-size: 2em;
    padding: 1em;
    justify-content: center;
  }
  .climate-mode {
    flex-basis: 33%;
    padding: 0.25em;
    width: 1em;
  }
  .item25 {
    flex-basis: 25%;
  }
  .current-temp {
    width: 50%;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    text-align: center;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    margin-left: 0.1em;
  }
  .thermostat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .thermostat-current-temp {
    /* position: absolute; */
    font-size: 2.5em;
    margin-left: 0.25em;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
  }
  .thermostat-other-states {
    /* position: absolute; */
    /* left: 50%;
    top: 85%; */
    text-align: center;
    /* transform: translate(-50%, -50%); */
  }
  .thermostat-modes {
    color: blue;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 33%;
  }
  .thermostat-mode-icon {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--disabled-text-color);
  }
  .icon-label {
    font-size: 0.75em;
  }
  .icon-selected {
    color: var(--dark-primary-color);
  }
  .thermostat-item {
    position: relative;
    flex-basis: 33%;
  }
  .inline {
    display: inline;
  }
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
  .clearfixold {
    overflow: auto;
  }
  .state-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-self: flex-end;
    margin-bottom: 2em;
  }
  .state-item {
    width: 50%;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    font-size: 2.5em;
    text-align: center;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    margin-left: 0.1em;
  }
  .other-temp {
    width: 25%;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    text-align: center;
  }
  .temp-unit {
    font-size: 0.4em;
    align-self: start;
    margin-top: 0.25em;
    display: inline;
    margin-left: -0.75em;
    vertical-align: text-top;
  }
`;let Ot=class extends lt{constructor(){super(...arguments),this.temporaryStateOverride=!1,this.AUTO="Auto",this.HEAT_COOL="Heat_Cool",this.HEAT="Heat",this.COOL="Cool",this.POWER="Power"}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t,this.loadClimateModes()}static async getConfigElement(){return await import("./better-thermostat-editor.js"),document.createElement("better-thermostat-editor")}static getStubConfig(){return{}}loadClimateModes(){if(!this.config||!this.hass||!this.config.entity)return;if(this.temporaryStateOverride)return void(this.temporaryStateOverride=!1);const t=this.config.entity,e=this.hass.states[t];void 0!==e&&(this.currentMode=e.attributes.preset_mode,this.currentTemp=e.attributes.current_temperature,this.targetTempHigh=e.attributes.target_temp_high,this.targetTempLow=e.attributes.target_temp_low,this.temperature=e.attributes.temperature,this.maxTemp=e.attributes.max_temp,this.minTemp=e.attributes.min_temp,this.friendlyName=e.attributes.friendly_name,this.hvacAction=e.attributes.hvac_action,this.currentHvacMode=e.state)}shouldUpdate(t){return Et(this,t,!1)&&this.loadClimateModes(),Et(this,t,!1)}titleCase(t){return t.replace(/\w\S*/g,t=>t.charAt(0).toUpperCase()+t.substr(1).toLowerCase())}isCurrentMode(t){return this.currentMode?this.shouldSelectIcon(t,this.currentMode):""}isCurrentHvacMode(t){return this.currentHvacMode?this.shouldSelectIcon(t,this.currentHvacMode):""}shouldSelectIcon(t,e){return t.toLowerCase()===e.toLowerCase()?"icon-selected":""}getTargetTemp(){if(this.currentHvacMode){if(this.currentHvacMode.toLowerCase()===this.AUTO.toLowerCase())return L`
          ${this.targetTempLow+" - "+this.targetTempHigh}
        `;if(this.currentHvacMode.toLowerCase()===this.COOL.toLowerCase())return L`
          ${this.temperature}
        `;if(this.currentHvacMode.toLowerCase()===this.HEAT.toLowerCase())return L`
          ${this.temperature}
        `}return L``}getCorrectSlider(){if(this.currentHvacMode){if(this.currentHvacMode.toLowerCase()===this.AUTO.toLowerCase()||this.currentHvacMode.toLowerCase()===this.HEAT_COOL.toLowerCase())return L`
          <round-slider
            class="thermostat-item hvac-auto-mode"
            low="${this.targetTempLow}"
            high="${this.targetTempHigh}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${t=>this._handleSliderValueChanging(t)}
            @value-changed=${t=>this._handleSliderValueChanged(t)}
          >
          </round-slider>
        `;if(this.currentHvacMode.toLocaleLowerCase()===this.COOL.toLowerCase())return L`
          <round-slider
            class="thermostat-item hvac-cool-mode"
            value="${this.currentTemp}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${t=>this._handleSliderValueChanging(t)}
            @value-changed=${t=>this._handleSliderValueChanged(t)}
          >
          </round-slider>
        `;if(this.currentHvacMode.toLocaleLowerCase()===this.HEAT.toLowerCase())return L`
          <round-slider
            class="thermostat-item hvac-heat-mode"
            value="${this.currentTemp}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${t=>this._handleSliderValueChanging(t)}
            @value-changed=${t=>this._handleSliderValueChanged(t)}
          >
          </round-slider>
        `}return L``}render(){return this.config&&this.hass?L`
      <ha-card class="thermostat-card">
        <div class="thermostat-container" @click="${()=>this._handleThermostatContainerTapped()}">
          <div class="thermostat-current-temp">
            ${this.currentTemp}
            <div class="temp-unit">°F</div>
          </div>
          <div class="thermostat-other-states">
            <div>
              ${this.getTargetTemp()}
            </div>
            <div>
              ${this.titleCase(this.hvacAction+" - "+this.currentMode)}
            </div>
          </div>
        </div>
        <div class="thermostat-modes">
          ${this.config.preset_climate_modes.map(t=>L`
              <div
                class="thermostat-mode-icon ${this.isCurrentMode(t.mode_id)}"
                @click="${()=>this._handleClimateModeTapped(t.mode_id)}"
              >
                <ha-icon icon="${t.mode_icon}"></ha-icon>
                <div class="icon-label">${t.mode_id}</div>
              </div>
            `)}
        </div>
        ${this.getCorrectSlider()}
        <div class="thermostat-modes">
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.AUTO)}"
          @click="${()=>this._handleHvacModeTapped(this.AUTO)}"
          >
            <ha-icon
              icon="mdi:calendar-repeat"
            ></ha-icon>
            <div class="icon-label">${this.AUTO}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.HEAT)}"
          @click="${()=>this._handleHvacModeTapped(this.HEAT)}"
          >
            <ha-icon  icon="mdi:fire"></ha-icon>
            <div class="icon-label">${this.HEAT}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.COOL)}"
          @click="${()=>this._handleHvacModeTapped(this.COOL)}"
          >
            <ha-icon
              icon="mdi:snowflake"
            ></ha-icon>
            <div class="icon-label">${this.COOL}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.POWER)}">
            <ha-icon icon="mdi:power"></ha-icon>
            <div class="icon-label">${this.POWER}</div>
          </div>
          </div>
        </div>
      </ha-card>
    `:L``}_handleClimateModeTapped(t){if(this.hass&&this.config){var e={entity_id:this.config.entity,preset_mode:t};this.hass.callService("climate","set_preset_mode",e)}}_handleHvacModeTapped(t){if(this.hass&&this.config){var e={entity_id:this.config.entity,hvac_mode:t.toLowerCase()};this.hass.callService("climate","set_hvac_mode",e)}}_handleThermostatContainerTapped(){}_handleSliderValueChanged(t){if(this.hass&&this.config){if(t.detail.low){var e={entity_id:this.config.entity,target_temp_high:this.targetTempHigh,target_temp_low:t.detail.low};this.hass.callService("climate","set_temperature",e)}if(t.detail.high){var i={entity_id:this.config.entity,target_temp_high:t.detail.low,target_temp_low:this.targetTempLow};this.hass.callService("climate","set_temperature",i)}if(t.detail.value){var n={entity_id:this.config.entity,temperature:t.detail.value};this.hass.callService("climate","set_temperature",n)}}}_handleSliderValueChanging(t){this.hass&&this.config&&(null!=t.detail.low&&(this.targetTempLow=t.detail.low),t.detail.high&&(this.targetTempLow=t.detail.high),t.detail.value&&(this.temperature=t.detail.value),this.temporaryStateOverride=!0,this.requestUpdate())}_handleHold(){this.hass&&this.config&&Pt(this,this.hass,this.config,!0,!1)}static get styles(){return kt}logger(t){let e=t;"string"!=typeof e&&(e=JSON.stringify(e)),console.log(`%cDEBUG:%c ${e}`,"color: blue; font-weight: bold","")}};t([st()],Ot.prototype,"hass",void 0),t([st()],Ot.prototype,"config",void 0),t([st()],Ot.prototype,"modes",void 0),t([st()],Ot.prototype,"leftModes",void 0),t([st()],Ot.prototype,"rightModes",void 0),t([st()],Ot.prototype,"currentTemp",void 0),t([st()],Ot.prototype,"currentMode",void 0),t([st()],Ot.prototype,"maxTemp",void 0),t([st()],Ot.prototype,"minTemp",void 0),t([st()],Ot.prototype,"targetTempLow",void 0),t([st()],Ot.prototype,"targetTempHigh",void 0),t([st()],Ot.prototype,"temperature",void 0),t([st()],Ot.prototype,"friendlyName",void 0),t([st()],Ot.prototype,"hvacAction",void 0),t([st()],Ot.prototype,"currentHvacMode",void 0),t([st()],Ot.prototype,"temporaryStateOverride",void 0),Ot=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e))("better-thermostat")],Ot);
