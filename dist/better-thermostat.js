function t(t,e,n,i){var s,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,n,o):s(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o}const e=new WeakMap,n=t=>"function"==typeof t&&e.has(t),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${c}`),d="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;const n=[],i=[],s=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,c=0;const{strings:h,values:{length:u}}=t;for(;c<u;){const t=s.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let i=0;for(let t=0;t<n;t++)p(e[t].name,d)&&i++;for(;i-- >0;){const e=h[c],n=f.exec(e)[2],i=n.toLowerCase()+d,s=t.getAttribute(i);t.removeAttribute(i);const r=s.split(l);this.parts.push({type:"attribute",index:o,name:n,strings:r}),c+=r.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const i=t.parentNode,s=e.split(l),r=s.length-1;for(let e=0;e<r;e++){let n,r=s[e];if(""===r)n=m();else{const t=f.exec(r);null!==t&&p(t[2],d)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-d.length)+t[3]),n=document.createTextNode(r)}i.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===s[r]?(i.insertBefore(m(),t),n.push(t)):t.data=s[r],c+=r}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(m(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),c++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),c++}}else s.currentNode=i.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},u=t=>-1!==t.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,c=s.nextNode();for(;o<n.length;)if(r=n[o],u(r)){for(;a<r.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=e.pop(),c=s.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=` ${a} `;class v{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let i=0;i<t;i++){const t=this.strings[i],s=t.lastIndexOf("\x3c!--");n=(s>-1||n)&&-1===t.indexOf("--\x3e",s+1);const r=f.exec(t);e+=null===r?t+(n?y:c):t.substr(0,r.index)+r[1]+r[2]+d+r[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const _=t=>null===t||!("object"==typeof t||"function"==typeof t),w=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let i=0;i<e;i++){n+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(_(t)||!w(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||_(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class x{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(_(t)?t!==this.value&&this.__commitText(t):t instanceof v?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):w(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const n=new g(e,t.processor,this.options),i=n._clone();n.update(t.values),this.__commitNode(i),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const s of t)void 0===(n=e[i])&&(n=new x(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(s),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class C extends S{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends b{}let T=!1;try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class N{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=M(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const M=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const k=new class{handleAttributeExpressions(t,e,n,i){const s=e[0];return"."===s?new C(t,e.slice(1),n).parts:"@"===s?[new N(t,e.slice(1),i.eventContext)]:"?"===s?[new P(t,e.slice(1),n)]:new S(t,e,n).parts}handleTextExpression(t){return new x(t)}};function A(t){let e=D.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},D.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(a);return void 0===(n=e.keyString.get(i))&&(n=new h(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const D=new Map,V=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const O=(t,...e)=>new v(t,e,"html",k),Y=133;function R(t,e){const{element:{content:n},parts:i}=t,s=document.createTreeWalker(n,Y,null,!1);let r=U(i),o=i[r],a=-1,c=0;const l=[];let d=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,o=i[r=U(i,r)]}l.forEach(t=>t.parentNode.removeChild(t))}const H=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,Y,null,!1);for(;n.nextNode();)e++;return e},U=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(u(e))return n}return-1};const j=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const $=t=>e=>{const n=j(e.type,t);let i=D.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},D.set(n,i));let s=i.stringsArray.get(e.strings);if(void 0!==s)return s;const r=e.strings.join(a);if(void 0===(s=i.keyString.get(r))){const n=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(n,t),s=new h(e,n),i.keyString.set(r,s)}return i.stringsArray.set(e.strings,s),s},z=["html","svg"],F=new Set,I=(t,e,n)=>{F.add(t);const i=n?n.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:r}=s;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=s[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach(e=>{const n=D.get(j(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),R(t,n)})})})(t);const a=i.content;n?function(t,e,n=null){const{element:{content:i},parts:s}=t;if(null==n)return void i.appendChild(e);const r=document.createTreeWalker(i,Y,null,!1);let o=U(s),a=0,c=-1;for(;r.nextNode();)for(c++,r.currentNode===n&&(a=H(e),n.parentNode.insertBefore(e,n));-1!==o&&s[o].index===c;){if(a>0){for(;-1!==o;)s[o].index+=a,o=U(s,o);return}o=U(s,o)}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),R(n,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:B},J=Promise.resolve(!0),Z=1,X=4,G=8,K=16,Q=32,tt="finalized";class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=J,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const i=this._attributeNameForProperty(n,e);void 0!==i&&(this._attributeToPropertyMap.set(i,n),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const i=this[t];this[n]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this[tt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=B){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,i=e.converter||q,s="function"==typeof i?i:i.fromAttribute;return s?s(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,i=e.converter;return(i&&i.toAttribute||q.toAttribute)(t,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Q,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=W){const i=this.constructor,s=i._attributeNameForProperty(t,n);if(void 0!==s){const t=i._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|G,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=this._updateState&~G}}_attributeToProperty(t,e){if(this._updateState&G)return;const n=this.constructor,i=n._attributeToPropertyMap.get(t);if(void 0!==i){const t=n._classProperties.get(i)||W;this._updateState=this._updateState|K,this[i]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~K}}_requestUpdate(t,e){let n=!0;if(void 0!==t){const i=this.constructor,s=i._classProperties.get(t)||W;i._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||this._updateState&K||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|X;const n=this._updatePromise;this._updatePromise=new Promise((n,i)=>{t=n,e=i});try{await n}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Q}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&Z}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Z||(this._updateState=this._updateState|Z,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}et[tt]=!0;const nt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}}:Object.assign({},e,{finisher(n){n.createProperty(e.key,t)}}),it=(t,e,n)=>{e.constructor.createProperty(n,t)};function st(t){return(e,n)=>void 0!==n?it(t,e,n):nt(t,e)}const rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const ct=t=>t.flat?t.flat(1/0):function t(e,n=[]){for(let i=0,s=e.length;i<s;i++){const s=e[i];Array.isArray(s)?t(s,n):n.push(s)}return n}(t);class lt extends et{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ct(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof v&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}lt.finalized=!0,lt.render=((t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const i=n.scopeName,r=V.has(e),o=L&&11===e.nodeType&&!!e.host,a=o&&!F.has(i),c=a?document.createDocumentFragment():e;if(((t,e,n)=>{let i=V.get(e);void 0===i&&(s(e,e.firstChild),V.set(e,i=new x(Object.assign({templateFactory:A},n))),i.appendInto(e)),i.setValue(t),i.commit()})(t,c,Object.assign({templateFactory:$(i)},n)),a){const t=V.get(c);V.delete(c);const n=t.value instanceof g?t.value.template:void 0;I(i,c,n),s(e,e.firstChild),e.appendChild(c),V.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var dt={},ht=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,pt="[^\\s]+",ut=/\[([^]*?)\]/gm,mt=function(){};function ft(t,e){for(var n=[],i=0,s=t.length;i<s;i++)n.push(t[i].substr(0,e));return n}function gt(t){return function(e,n,i){var s=i[t].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~s&&(e.month=s)}}function yt(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["January","February","March","April","May","June","July","August","September","October","November","December"],wt=ft(_t,3),St=ft(vt,3);dt.i18n={dayNamesShort:St,dayNames:vt,monthNamesShort:wt,monthNames:_t,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var bt={D:function(t){return t.getDate()},DD:function(t){return yt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return yt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return yt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return yt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return yt(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return yt(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return yt(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return yt(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return yt(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return yt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return yt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+yt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},xt={D:["\\d\\d?",function(t,e){t.day=e}],Do:["\\d\\d?"+pt,function(t,e){t.day=parseInt(e,10)}],M:["\\d\\d?",function(t,e){t.month=e-1}],YY:["\\d\\d?",function(t,e){var n=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?n-1:n)+e}],h:["\\d\\d?",function(t,e){t.hour=e}],m:["\\d\\d?",function(t,e){t.minute=e}],s:["\\d\\d?",function(t,e){t.second=e}],YYYY:["\\d{4}",function(t,e){t.year=e}],S:["\\d",function(t,e){t.millisecond=100*e}],SS:["\\d{2}",function(t,e){t.millisecond=10*e}],SSS:["\\d{3}",function(t,e){t.millisecond=e}],d:["\\d\\d?",mt],ddd:[pt,mt],MMM:[pt,gt("monthNamesShort")],MMMM:[pt,gt("monthNames")],a:[pt,function(t,e,n){var i=e.toLowerCase();i===n.amPm[0]?t.isPm=!1:i===n.amPm[1]&&(t.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(t,e){var n,i=(e+"").match(/([+-]|\d\d)/gi);i&&(n=60*i[1]+parseInt(i[2],10),t.timezoneOffset="+"===i[0]?n:-n)}]};xt.dd=xt.d,xt.dddd=xt.ddd,xt.DD=xt.D,xt.mm=xt.m,xt.hh=xt.H=xt.HH=xt.h,xt.MM=xt.M,xt.ss=xt.s,xt.A=xt.a,dt.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},dt.format=function(t,e,n){var i=n||dt.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");e=dt.masks[e]||e||dt.masks.default;var s=[];return(e=(e=e.replace(ut,function(t,e){return s.push(e),"@@@"})).replace(ht,function(e){return e in bt?bt[e](t,i):e.slice(1,e.length-1)})).replace(/@@@/g,function(){return s.shift()})},dt.parse=function(t,e,n){var i=n||dt.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=dt.masks[e]||e,t.length>1e3)return null;var s={},r=[],o=[];e=e.replace(ut,function(t,e){return o.push(e),"@@@"});var a,c=(a=e,a.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(ht,function(t){if(xt[t]){var e=xt[t];return r.push(e[1]),"("+e[0]+")"}return t});c=c.replace(/@@@/g,function(){return o.shift()});var l=t.match(new RegExp(c,"i"));if(!l)return null;for(var d=1;d<l.length;d++)r[d-1](s,l[d],i);var h,p=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,h=new Date(Date.UTC(s.year||p.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):h=new Date(s.year||p.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),h};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var Pt=["closed","locked","off"],Ct=function(t,e,n,i){i=i||{},n=null==n?{}:n;var s=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=n,t.dispatchEvent(s),s},Et=function(t,e){Ct(t,"haptic",e)},Tt=function(t,e,n,i,s){var r;switch(s&&n.dbltap_action?r=n.dbltap_action:i&&n.hold_action?r=n.hold_action:!i&&n.tap_action&&(r=n.tap_action),r||(r={action:"more-info"}),r.action){case"more-info":(n.entity||n.camera_image)&&(Ct(t,"hass-more-info",{entityId:r.entity?r.entity:n.entity?n.entity:n.camera_image}),r.haptic&&Et(t,r.haptic));break;case"navigate":r.navigation_path&&(function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),Ct(window,"location-changed",{replace:n})}(0,r.navigation_path),r.haptic&&Et(t,r.haptic));break;case"url":r.url&&window.open(r.url),r.haptic&&Et(t,r.haptic);break;case"toggle":n.entity&&(function(t,e){(function(t,e,n){void 0===n&&(n=!0);var i,s=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===s?"homeassistant":s;switch(s){case"lock":i=n?"unlock":"lock";break;case"cover":i=n?"open_cover":"close_cover";break;default:i=n?"turn_on":"turn_off"}t.callService(r,i,{entity_id:e})})(t,e,Pt.includes(t.states[e].state))}(e,n.entity),r.haptic&&Et(t,r.haptic));break;case"call-service":if(!r.service)return;var o=r.service.split(".",2),a=o[0],c=o[1],l=Object.assign({},r.service_data);"entity"===l.entity_id&&(l.entity_id=n.entity),e.callService(a,c,l),r.haptic&&Et(t,r.haptic)}};function Nt(t,e,n){if(e.has("config")||n)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}const Mt=new WeakMap;String(Math.random()).slice(2);try{const t={get capture(){return!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");var kt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,At=function(t){function e(){t.call(this),this.holdTime=500,this.ripple=document.createElement("paper-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1,this.nbClicks=0}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.connectedCallback=function(){var t=this;Object.assign(this.style,{borderRadius:"50%",position:"absolute",width:kt?"100px":"50px",height:kt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.style.color="#03a9f4",this.ripple.style.color="var(--primary-color)",["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(function(e){document.addEventListener(e,function(){clearTimeout(t.timer),t.stopAnimation(),t.timer=void 0},{passive:!0})})},e.prototype.bind=function(t){var e=this;if(!t.longPress){t.longPress=!0,t.addEventListener("contextmenu",function(t){var e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});var n=function(n){var i,s;e.cooldownStart||(e.held=!1,n.touches?(i=n.touches[0].pageX,s=n.touches[0].pageY):(i=n.pageX,s=n.pageY),e.timer=window.setTimeout(function(){e.startAnimation(i,s),e.held=!0,t.repeat&&!t.isRepeating&&(t.isRepeating=!0,e.repeatTimeout=setInterval(function(){t.dispatchEvent(new Event("ha-hold"))},t.repeat))},e.holdTime),e.cooldownStart=!0,window.setTimeout(function(){return e.cooldownStart=!1},100))},i=function(n){e.cooldownEnd||["touchend","touchcancel"].includes(n.type)&&void 0===e.timer?t.isRepeating&&e.repeatTimeout&&(clearInterval(e.repeatTimeout),t.isRepeating=!1):(clearTimeout(e.timer),t.isRepeating&&e.repeatTimeout&&clearInterval(e.repeatTimeout),t.isRepeating=!1,e.stopAnimation(),e.timer=void 0,e.held?t.repeat||t.dispatchEvent(new Event("ha-hold")):t.hasDblClick?0===e.nbClicks?(e.nbClicks+=1,e.dblClickTimeout=window.setTimeout(function(){1===e.nbClicks&&(e.nbClicks=0,t.dispatchEvent(new Event("ha-click")))},250)):(e.nbClicks=0,clearTimeout(e.dblClickTimeout),t.dispatchEvent(new Event("ha-dblclick"))):t.dispatchEvent(new Event("ha-click")),e.cooldownEnd=!0,window.setTimeout(function(){return e.cooldownEnd=!1},100))};t.addEventListener("touchstart",n,{passive:!0}),t.addEventListener("touchend",i),t.addEventListener("touchcancel",i),t.addEventListener("mousedown",n,{passive:!0}),t.addEventListener("click",i)}},e.prototype.startAnimation=function(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.holdDown=!0,this.ripple.simulatedRipple()},e.prototype.stopAnimation=function(){this.ripple.holdDown=!1,this.style.display="none"},e}(HTMLElement);customElements.get("long-press-custom-card-helpers")||customElements.define("long-press-custom-card-helpers",At);var Dt=(t=>(...t)=>{const e=function(t){!function(t){var e=function(){var t=document.body;if(t.querySelector("long-press-custom-card-helpers"))return t.querySelector("long-press-custom-card-helpers");var e=document.createElement("long-press-custom-card-helpers");return t.appendChild(e),e}();e&&e.bind(t)}(t.committer.element)};return Mt.set(e,!0),e})();const Vt=((t,...e)=>{const n=e.reduce((e,n,i)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[i+1],t[0]);return new at(n,ot)})`
  .thermostat-card {
    display: flex;
    padding: 15px;
    flex-direction: column;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .center-items {
    align-items: center;
  }
  .space-evenly {
    justify-content: space-evenly;
  }
  .current-mode {
    font-size: 2rem;
    padding: 1rem;
    justify-content: center;
  }
  .climate-mode {
    flex-basis: 33%;
    padding: 0.25rem;
  }
  .item25 {
    flex-basis: 25%;
  }
  .current-temp {
    width: 50%;
    align-items: center;
    justify-content: center;
    font-size: 12rem;
  }
  .other-temp {
    width: 25%;
    align-items: center;
    justify-content: center;
    font-size: 6rem;
  }
  .loader {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    letter-spacing: var(--paper-font-headline_-_letter-spacing);
    line-height: var(--paper-font-headline_-_line-height);
    text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
    opacity: var(--dark-primary-opacity);
    padding: 24px 0px 0px;
  }
  table {
    border-spacing: 0;
    margin-bottom: 10px;
    width: 100%;
  }
  .day-wrapper td {
    padding-top: 10px;
    cursor: pointer;
  }
  .day-wrapper.day-wrapper-last > td {
    padding-bottom: 10px;
    border-bottom: 1px solid;
  }
  .day-wrapper.day-wrapper-last:last-child > td {
    border-bottom: 0 !important;
  }
  .day-wrapper .overview {
    padding-left: 10px;
    cursor: pointer;
  }
  .day-wrapper .overview .time,
  .day-wrapper .location ha-icon {
    color: var(--secondary-text-color);
  }
  .day-wrapper hr.progress-bar {
    border-style: solid;
    border-color: var(--accent-color);
    border-width: 1px 0 0 0;
    margin-top: -7px;
    margin-left: 0px;
    color: var(--primary-color);
    width: 100%;
  }
  .day-wrapper ha-icon.progress-bar {
    height: 9px;
    width: 9px;
    margin-top: 2px;
    color: var(--accent-color);
  }
  .day-wrapper .location a {
    text-decoration: none;
    display: flex;
    color: var(--accent-color);
  }
  .event-origin {
    float: right;
  }
  .event-origin span {
    color: var(--accent-color);
    margin-right: -4px;
  }
  .event-origin ha-icon {
    height: 13px;
    margin-top: -3px;
    color: var(--accent-color);
  }
`;let Ot=class extends lt{setConfig(t){if(!t||t.show_error)throw new Error("Invalid configuration");this.config=t,this.loadClimateModes()}loadClimateModes(){if(!this.config||!this.hass)return;const t=this.config.entity,e=this.hass.states[t];this.logger(e),this.modes=e.attributes.preset_modes,this.currentMode=e.attributes.preset_mode,this.currentTemp=e.attributes.current_temperature,this.maxTemp=e.attributes.target_temp_high,this.minTemp=e.attributes.target_temp_low,this.friendlyName=e.attributes.friendly_name}shouldUpdate(t){return Nt(this,t,!1)&&this.loadClimateModes(),Nt(this,t,!1)}render(){return this.config&&this.hass&&this.modes?this.config.show_warning?O`
        <ha-card>
          <div class="warning">Show Warning</div>
        </ha-card>
      `:O`
      <ha-card
        .header=${this.config.name?this.config.name:"Current ${this.friendlyName} Climate"}
        @ha-click="${this._handleTap}"
        @ha-hold="${this._handleHold}"
        .longpress="${Dt()}"
        class="thermostat-card"
      >
        <div class="container center-items">
          <div class="item other-temp">${this.minTemp}</div>
          <div class="item current-temp">${this.currentTemp}</div>
          <div class="item other-temp">${this.maxTemp}</div>
        </div>
        <div clsas="container center-items">
          <div class="current-mode">${this.currentMode}</div>
        </div>
        <div class="container space-evenly">
          ${this.modes.map(t=>O`
                <mwc-button
                  class="light climate-mode"
                  raised
                  label="${t}"
                ></mwc-button>
              `)}
        </div>
      </ha-card>
    `:O``}_handleTap(){this.hass&&this.config&&Tt(this,this.hass,this.config,!1,!1)}_handleHold(){this.hass&&this.config&&Tt(this,this.hass,this.config,!0,!1)}static get styles(){return Vt}logger(t){let e=t;"string"!=typeof e&&(e=JSON.stringify(e)),console.log(`%cDEBUG:%c ${e}`,"color: blue; font-weight: bold","")}};t([st()],Ot.prototype,"hass",void 0),t([st()],Ot.prototype,"config",void 0),t([st()],Ot.prototype,"modes",void 0),t([st()],Ot.prototype,"currentTemp",void 0),t([st()],Ot.prototype,"currentMode",void 0),t([st()],Ot.prototype,"maxTemp",void 0),t([st()],Ot.prototype,"minTemp",void 0),t([st()],Ot.prototype,"friendlyName",void 0),Ot=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:i}=e;return{kind:n,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e))("better-thermostat")],Ot);
