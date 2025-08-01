(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{13169:(t,e,r)=>{"use strict";r.d(e,{default:()=>B});var a=r(32074),o=r(38402),i=r(56391),s=r(16465),n=r(97),d=r(52986);function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach(function(e){(0,d.A)(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}let p=0,w=new Map,g=t=>{if(w.has(t))return;let e=setTimeout(()=>{w.delete(t),v({type:"REMOVE_TOAST",toastId:t})},1e6);w.set(t,e)},h=(t,e)=>{switch(e.type){case"ADD_TOAST":return c(c({},t),{},{toasts:[e.toast,...t.toasts].slice(0,1)});case"UPDATE_TOAST":return c(c({},t),{},{toasts:t.toasts.map(t=>t.id===e.toast.id?c(c({},t),e.toast):t)});case"DISMISS_TOAST":{let{toastId:r}=e;return r?g(r):t.toasts.forEach(t=>{g(t.id)}),c(c({},t),{},{toasts:t.toasts.map(t=>t.id===r||void 0===r?c(c({},t),{},{open:!1}):t)})}case"REMOVE_TOAST":if(void 0===e.toastId)return c(c({},t),{},{toasts:[]});return c(c({},t),{},{toasts:t.toasts.filter(t=>t.id!==e.toastId)})}},m=[],u={toasts:[]};function v(t){u=h(u,t),m.forEach(t=>{t(u)})}function f(t){let e=Object.assign({},((0,n.A)(t),t)),r=(p=(p+1)%Number.MAX_SAFE_INTEGER).toString(),a=()=>v({type:"DISMISS_TOAST",toastId:r});return v({type:"ADD_TOAST",toast:c(c({},e),{},{id:r,open:!0,onOpenChange:t=>{t||a()}})}),{id:r,dismiss:a,update:t=>v({type:"UPDATE_TOAST",toast:c(c({},t),{},{id:r})})}}var b=r(37374),x=r(82271),y=r(50056),k=r(16805);let z=["className"],_=["className","variant"],S=["className"],A=["className"],Y=["className"],X=["className"];var O=a.createElement;let N=b.Kq,C=a.forwardRef((t,e)=>{let{className:r}=t,a=(0,s.A)(t,z);return O(b.LM,(0,i.A)({ref:e,className:(0,k.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",r)},a))});C.displayName=b.LM.displayName;let E=(0,x.F)("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),j=a.forwardRef((t,e)=>{let{className:r,variant:a}=t,o=(0,s.A)(t,_);return O(b.bL,(0,i.A)({ref:e,className:(0,k.cn)(E({variant:a}),r)},o))});j.displayName=b.bL.displayName,a.forwardRef((t,e)=>{let{className:r}=t,a=(0,s.A)(t,S);return O(b.rc,(0,i.A)({ref:e,className:(0,k.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",r)},a))}).displayName=b.rc.displayName;let T=a.forwardRef((t,e)=>{let{className:r}=t,a=(0,s.A)(t,A);return O(b.bm,(0,i.A)({ref:e,className:(0,k.cn)("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",r),"toast-close":""},a),O(y.A,{className:"h-4 w-4"}))});T.displayName=b.bm.displayName;let P=a.forwardRef((t,e)=>{let{className:r}=t,a=(0,s.A)(t,Y);return O(b.hE,(0,i.A)({ref:e,className:(0,k.cn)("text-sm font-semibold",r)},a))});P.displayName=b.hE.displayName;let R=a.forwardRef((t,e)=>{let{className:r}=t,a=(0,s.A)(t,X);return O(b.VY,(0,i.A)({ref:e,className:(0,k.cn)("text-sm opacity-90",r)},a))});R.displayName=b.VY.displayName;let M=["id","title","description","action"];var I=a.createElement;function D(){let{toasts:t}=function(){let[t,e]=a.useState(u);return a.useEffect(()=>(m.push(e),()=>{let t=m.indexOf(e);t>-1&&m.splice(t,1)}),[t]),c(c({},t),{},{toast:f,dismiss:t=>v({type:"DISMISS_TOAST",toastId:t})})}();return I(N,null,t.map(function(t){let{id:e,title:r,description:a,action:o}=t,n=(0,s.A)(t,M);return I(j,(0,i.A)({key:e},n),I("div",{className:"grid gap-1"},r&&I(P,null,r),a&&I(R,null,a)),o,I(T,null))}),I(C,null))}var U=r(8425),F=r(45139),L=a.createElement;function G(t){let{children:e}=t,{0:o,1:i}=(0,a.useState)(null),s=()=>"https://api.cartridge.gg/x/starknet/sepolia",n=(0,F.tT)({rpc:()=>({nodeUrl:s()})}),d=[U.Gb];return((0,a.useEffect)(()=>{Promise.all([r.e(439),r.e(817),r.e(1),r.e(580),r.e(274),r.e(591)]).then(r.bind(r,81575)).then(t=>{i(t.default)})},[]),o)?L(F.be,{autoConnect:!0,chains:d,connectors:[o],explorer:F.T2,provider:n},e):null}var V=a.createElement;let q=(0,o.default)(()=>Promise.all([r.e(14),r.e(961),r.e(382)]).then(r.bind(r,51580)).then(t=>t.DojoProviderClient),{loadableGenerated:{webpack:()=>[51580]},ssr:!1,loadableGenerated:{webpack:()=>[51580]}});function B(t){let{children:e}=t;return V(G,null,V(q,null,V("div",{className:"flex-grow"},e)),V(D,null))}},14615:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>v});var a=r(21774),o=r.n(a),i=r(99109),s=r.n(i),n=r(84881),d=r.n(n),l=r(7630),c=r.n(l),p=r(53234),w=r.n(p),g=r(72449),h=r.n(g),m=r(70644),u={};u.styleTagTransform=h(),u.setAttributes=c(),u.insert=d().bind(null,"head"),u.domAPI=s(),u.insertStyleElement=w(),o()(m.A,u);let v=m.A&&m.A.locals?m.A.locals:void 0},16805:(t,e,r)=>{"use strict";r.d(e,{cn:()=>i});var a=r(8567),o=r(92123);function i(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return(0,o.QP)((0,a.$)(e))}},42412:(t,e,r)=>{Promise.resolve().then(r.bind(r,14615)),Promise.resolve().then(r.bind(r,13169))},70644:(t,e,r)=>{"use strict";r.d(e,{A:()=>n});var a=r(89949),o=r.n(a),i=r(25372),s=r.n(i)()(o());s.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap);"]),s.push([t.id,`*, ::before, ::after{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
::backdrop{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*/
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/
*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}
::before,
::after {
  --tw-content: '';
}
/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/
html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}
/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/
body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}
/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}
/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}
/*
Remove the default font size and weight for headings.
*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}
/*
Add the correct font weight in Edge and Safari.
*/
b,
strong {
  font-weight: bolder;
}
/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/
code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}
/*
Add the correct font size in all browsers.
*/
small {
  font-size: 80%;
}
/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/
table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}
/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}
/*
Remove the inheritance of text transform in Edge and Firefox.
*/
button,
select {
  text-transform: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
/*
Use the modern Firefox focus style for all focusable elements.
*/
:-moz-focusring {
  outline: auto;
}
/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/
:-moz-ui-invalid {
  box-shadow: none;
}
/*
Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}
/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}
/*
Remove the inner padding in Chrome and Safari on macOS.
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}
/*
Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}
/*
Removes the default spacing and border for appropriate elements.
*/
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
  padding: 0;
}
legend {
  padding: 0;
}
ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}
/*
Prevent resizing textareas horizontally by default.
*/
textarea {
  resize: vertical;
}
/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/
input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}
input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}
/*
Set the default cursor for buttons.
*/
button,
[role="button"] {
  cursor: pointer;
}
/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}
/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}
/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
img,
video {
  max-width: 100%;
  height: auto;
}
/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
:root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 279 87% 53%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 120 100% 50%;
    --accent-foreground: 0 0% 3.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 279 87% 53%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
.dark {
    --background: 0 0% 13%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 279 87% 53%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 120 100% 50%;
    --accent-foreground: 120 100% 10%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 279 87% 53%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
*{
  border-color: hsl(var(--border));
}
body{
  background-color: hsl(var(--background));
  font-family: Inter, sans-serif;
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.\\!container{
  width: 100% !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding-right: 2rem !important;
  padding-left: 2rem !important;
}
.container{
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 2rem;
  padding-left: 2rem;
}
@media (min-width: 1400px){
  .\\!container{
    max-width: 1400px !important;
  }
  .container{
    max-width: 1400px;
  }
}
.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.pointer-events-none{
  pointer-events: none;
}
.pointer-events-auto{
  pointer-events: auto;
}
.invisible{
  visibility: hidden;
}
.fixed{
  position: fixed;
}
.absolute{
  position: absolute;
}
.relative{
  position: relative;
}
.inset-0{
  inset: 0px;
}
.inset-x-0{
  left: 0px;
  right: 0px;
}
.inset-y-0{
  top: 0px;
  bottom: 0px;
}
.bottom-0{
  bottom: 0px;
}
.bottom-4{
  bottom: 1rem;
}
.bottom-\\[10\\%\\]{
  bottom: 10%;
}
.left-0{
  left: 0px;
}
.left-1{
  left: 0.25rem;
}
.left-1\\/2{
  left: 50%;
}
.left-2{
  left: 0.5rem;
}
.left-\\[10\\%\\]{
  left: 10%;
}
.left-\\[22\\%\\]{
  left: 22%;
}
.left-\\[50\\%\\]{
  left: 50%;
}
.right-0{
  right: 0px;
}
.right-1{
  right: 0.25rem;
}
.right-2{
  right: 0.5rem;
}
.right-3{
  right: 0.75rem;
}
.right-4{
  right: 1rem;
}
.right-\\[10\\%\\]{
  right: 10%;
}
.right-\\[22\\%\\]{
  right: 22%;
}
.top-0{
  top: 0px;
}
.top-1\\.5{
  top: 0.375rem;
}
.top-1\\/2{
  top: 50%;
}
.top-2{
  top: 0.5rem;
}
.top-3\\.5{
  top: 0.875rem;
}
.top-4{
  top: 1rem;
}
.top-8{
  top: 2rem;
}
.top-\\[25\\%\\]{
  top: 25%;
}
.top-\\[50\\%\\]{
  top: 50%;
}
.z-0{
  z-index: 0;
}
.z-10{
  z-index: 10;
}
.z-20{
  z-index: 20;
}
.z-50{
  z-index: 50;
}
.z-\\[100\\]{
  z-index: 100;
}
.-mx-1{
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.mx-2{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mx-3\\.5{
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.mx-auto{
  margin-left: auto;
  margin-right: auto;
}
.my-0\\.5{
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
}
.my-1{
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.mb-0{
  margin-bottom: 0px;
}
.mb-1{
  margin-bottom: 0.25rem;
}
.mb-2{
  margin-bottom: 0.5rem;
}
.mb-4{
  margin-bottom: 1rem;
}
.mb-6{
  margin-bottom: 1.5rem;
}
.mb-8{
  margin-bottom: 2rem;
}
.ml-auto{
  margin-left: auto;
}
.mr-2{
  margin-right: 0.5rem;
}
.mt-12{
  margin-top: 3rem;
}
.mt-16{
  margin-top: 4rem;
}
.mt-2{
  margin-top: 0.5rem;
}
.mt-4{
  margin-top: 1rem;
}
.mt-8{
  margin-top: 2rem;
}
.block{
  display: block;
}
.inline-block{
  display: inline-block;
}
.flex{
  display: flex;
}
.inline-flex{
  display: inline-flex;
}
.table{
  display: table;
}
.grid{
  display: grid;
}
.hidden{
  display: none;
}
.aspect-square{
  aspect-ratio: 1 / 1;
}
.aspect-video{
  aspect-ratio: 16 / 9;
}
.size-4{
  width: 1rem;
  height: 1rem;
}
.h-10{
  height: 2.5rem;
}
.h-11{
  height: 2.75rem;
}
.h-12{
  height: 3rem;
}
.h-16{
  height: 4rem;
}
.h-2{
  height: 0.5rem;
}
.h-2\\.5{
  height: 0.625rem;
}
.h-20{
  height: 5rem;
}
.h-3\\.5{
  height: 0.875rem;
}
.h-4{
  height: 1rem;
}
.h-5{
  height: 1.25rem;
}
.h-6{
  height: 1.5rem;
}
.h-7{
  height: 1.75rem;
}
.h-8{
  height: 2rem;
}
.h-9{
  height: 2.25rem;
}
.h-\\[1px\\]{
  height: 1px;
}
.h-\\[var\\(--radix-select-trigger-height\\)\\]{
  height: var(--radix-select-trigger-height);
}
.h-auto{
  height: auto;
}
.h-full{
  height: 100%;
}
.h-px{
  height: 1px;
}
.h-screen{
  height: 100vh;
}
.h-svh{
  height: 100svh;
}
.max-h-96{
  max-height: 24rem;
}
.max-h-screen{
  max-height: 100vh;
}
.min-h-0{
  min-height: 0px;
}
.min-h-\\[80px\\]{
  min-height: 80px;
}
.min-h-screen{
  min-height: 100vh;
}
.min-h-svh{
  min-height: 100svh;
}
.w-0{
  width: 0px;
}
.w-1{
  width: 0.25rem;
}
.w-1\\/2{
  width: 50%;
}
.w-10{
  width: 2.5rem;
}
.w-11{
  width: 2.75rem;
}
.w-12{
  width: 3rem;
}
.w-16{
  width: 4rem;
}
.w-2{
  width: 0.5rem;
}
.w-2\\.5{
  width: 0.625rem;
}
.w-20{
  width: 5rem;
}
.w-24{
  width: 6rem;
}
.w-3\\.5{
  width: 0.875rem;
}
.w-3\\/4{
  width: 75%;
}
.w-32{
  width: 8rem;
}
.w-4{
  width: 1rem;
}
.w-48{
  width: 12rem;
}
.w-5{
  width: 1.25rem;
}
.w-7{
  width: 1.75rem;
}
.w-72{
  width: 18rem;
}
.w-8{
  width: 2rem;
}
.w-9{
  width: 2.25rem;
}
.w-\\[--sidebar-width\\]{
  width: var(--sidebar-width);
}
.w-\\[100px\\]{
  width: 100px;
}
.w-\\[1px\\]{
  width: 1px;
}
.w-\\[80vw\\]{
  width: 80vw;
}
.w-auto{
  width: auto;
}
.w-full{
  width: 100%;
}
.w-screen{
  width: 100vw;
}
.min-w-0{
  min-width: 0px;
}
.min-w-5{
  min-width: 1.25rem;
}
.min-w-\\[120px\\]{
  min-width: 120px;
}
.min-w-\\[12rem\\]{
  min-width: 12rem;
}
.min-w-\\[250px\\]{
  min-width: 250px;
}
.min-w-\\[8rem\\]{
  min-width: 8rem;
}
.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{
  min-width: var(--radix-select-trigger-width);
}
.max-w-2xl{
  max-width: 42rem;
}
.max-w-4xl{
  max-width: 56rem;
}
.max-w-5xl{
  max-width: 64rem;
}
.max-w-\\[--skeleton-width\\]{
  max-width: var(--skeleton-width);
}
.max-w-\\[180px\\]{
  max-width: 180px;
}
.max-w-lg{
  max-width: 32rem;
}
.max-w-sm{
  max-width: 24rem;
}
.max-w-xs{
  max-width: 20rem;
}
.flex-1{
  flex: 1 1 0%;
}
.flex-shrink{
  flex-shrink: 1;
}
.flex-shrink-0{
  flex-shrink: 0;
}
.shrink-0{
  flex-shrink: 0;
}
.flex-grow{
  flex-grow: 1;
}
.grow{
  flex-grow: 1;
}
.caption-bottom{
  caption-side: bottom;
}
.border-collapse{
  border-collapse: collapse;
}
.-translate-x-1\\/2{
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-x-px{
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-\\[calc\\(50\\%\\+2rem\\)\\]{
  --tw-translate-y: calc(calc(50% + 2rem) * -1);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-\\[-50\\%\\]{
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-px{
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-\\[-50\\%\\]{
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform{
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes pulse{
  50%{
    opacity: .5;
  }
}
.animate-pulse{
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes stars{
  from{
    background-position: 0 0;
  }
  to{
    background-position: -10000px 5000px;
  }
}
.animate-stars{
  animation: stars 200s linear infinite;
}
.cursor-default{
  cursor: default;
}
.cursor-pointer{
  cursor: pointer;
}
.touch-none{
  touch-action: none;
}
.select-none{
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.resize{
  resize: both;
}
.appearance-none{
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.grid-cols-2{
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.flex-col{
  flex-direction: column;
}
.flex-col-reverse{
  flex-direction: column-reverse;
}
.flex-wrap{
  flex-wrap: wrap;
}
.items-start{
  align-items: flex-start;
}
.items-end{
  align-items: flex-end;
}
.items-center{
  align-items: center;
}
.items-stretch{
  align-items: stretch;
}
.justify-center{
  justify-content: center;
}
.justify-between{
  justify-content: space-between;
}
.gap-1{
  gap: 0.25rem;
}
.gap-1\\.5{
  gap: 0.375rem;
}
.gap-2{
  gap: 0.5rem;
}
.gap-4{
  gap: 1rem;
}
.gap-5{
  gap: 1.25rem;
}
.gap-6{
  gap: 1.5rem;
}
.space-x-1 > :not([hidden]) ~ :not([hidden]){
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-2 > :not([hidden]) ~ :not([hidden]){
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-4 > :not([hidden]) ~ :not([hidden]){
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-y-1 > :not([hidden]) ~ :not([hidden]){
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]){
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.space-y-2 > :not([hidden]) ~ :not([hidden]){
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.space-y-4 > :not([hidden]) ~ :not([hidden]){
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.overflow-auto{
  overflow: auto;
}
.overflow-hidden{
  overflow: hidden;
}
.whitespace-nowrap{
  white-space: nowrap;
}
.rounded{
  border-radius: 0.25rem;
}
.rounded-\\[2px\\]{
  border-radius: 2px;
}
.rounded-\\[inherit\\]{
  border-radius: inherit;
}
.rounded-full{
  border-radius: 9999px;
}
.rounded-lg{
  border-radius: var(--radius);
}
.rounded-md{
  border-radius: calc(var(--radius) - 2px);
}
.rounded-sm{
  border-radius: calc(var(--radius) - 4px);
}
.border{
  border-width: 1px;
}
.border-2{
  border-width: 2px;
}
.border-4{
  border-width: 4px;
}
.border-\\[1\\.5px\\]{
  border-width: 1.5px;
}
.border-b{
  border-bottom-width: 1px;
}
.border-l{
  border-left-width: 1px;
}
.border-r{
  border-right-width: 1px;
}
.border-t{
  border-top-width: 1px;
}
.border-dashed{
  border-style: dashed;
}
.border-\\[--color-border\\]{
  border-color: var(--color-border);
}
.border-accent{
  border-color: hsl(var(--accent));
}
.border-accent\\/50{
  border-color: hsl(var(--accent) / 0.5);
}
.border-border\\/50{
  border-color: hsl(var(--border) / 0.5);
}
.border-destructive{
  border-color: hsl(var(--destructive));
}
.border-destructive\\/50{
  border-color: hsl(var(--destructive) / 0.5);
}
.border-input{
  border-color: hsl(var(--input));
}
.border-primary{
  border-color: hsl(var(--primary));
}
.border-primary\\/50{
  border-color: hsl(var(--primary) / 0.5);
}
.border-purple-500{
  --tw-border-opacity: 1;
  border-color: rgb(168 85 247 / var(--tw-border-opacity, 1));
}
.border-transparent{
  border-color: transparent;
}
.border-yellow-400{
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.border-l-transparent{
  border-left-color: transparent;
}
.border-t-transparent{
  border-top-color: transparent;
}
.bg-\\[--color-bg\\]{
  background-color: var(--color-bg);
}
.bg-accent{
  background-color: hsl(var(--accent));
}
.bg-background{
  background-color: hsl(var(--background));
}
.bg-background\\/70{
  background-color: hsl(var(--background) / 0.7);
}
.bg-black\\/20{
  background-color: rgb(0 0 0 / 0.2);
}
.bg-black\\/30{
  background-color: rgb(0 0 0 / 0.3);
}
.bg-black\\/50{
  background-color: rgb(0 0 0 / 0.5);
}
.bg-black\\/70{
  background-color: rgb(0 0 0 / 0.7);
}
.bg-black\\/80{
  background-color: rgb(0 0 0 / 0.8);
}
.bg-blue-900{
  --tw-bg-opacity: 1;
  background-color: rgb(30 58 138 / var(--tw-bg-opacity, 1));
}
.bg-border{
  background-color: hsl(var(--border));
}
.bg-card{
  background-color: hsl(var(--card));
}
.bg-destructive{
  background-color: hsl(var(--destructive));
}
.bg-gray-300{
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.bg-gray-800{
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));
}
.bg-muted{
  background-color: hsl(var(--muted));
}
.bg-muted\\/50{
  background-color: hsl(var(--muted) / 0.5);
}
.bg-popover{
  background-color: hsl(var(--popover));
}
.bg-primary{
  background-color: hsl(var(--primary));
}
.bg-primary\\/10{
  background-color: hsl(var(--primary) / 0.1);
}
.bg-purple-600{
  --tw-bg-opacity: 1;
  background-color: rgb(147 51 234 / var(--tw-bg-opacity, 1));
}
.bg-secondary{
  background-color: hsl(var(--secondary));
}
.bg-sky-900{
  --tw-bg-opacity: 1;
  background-color: rgb(12 74 110 / var(--tw-bg-opacity, 1));
}
.bg-stone-900{
  --tw-bg-opacity: 1;
  background-color: rgb(28 25 23 / var(--tw-bg-opacity, 1));
}
.bg-transparent{
  background-color: transparent;
}
.bg-yellow-200{
  --tw-bg-opacity: 1;
  background-color: rgb(254 240 138 / var(--tw-bg-opacity, 1));
}
.bg-\\[url\\(\\'https\\:\\/\\/placehold\\.co\\/1920x1080\\/333344\\/a020f0\\.png\\?text\\=Sky\\+Background\\'\\)\\]{
  background-image: url('https://placehold.co/1920x1080/333344/a020f0.png?text=Sky+Background');
}
.bg-cover{
  background-size: cover;
}
.bg-center{
  background-position: center;
}
.fill-current{
  fill: currentColor;
}
.p-0{
  padding: 0px;
}
.p-1{
  padding: 0.25rem;
}
.p-2{
  padding: 0.5rem;
}
.p-3{
  padding: 0.75rem;
}
.p-4{
  padding: 1rem;
}
.p-6{
  padding: 1.5rem;
}
.p-\\[1px\\]{
  padding: 1px;
}
.px-1{
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.px-2{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-2\\.5{
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.px-3{
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4{
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-8{
  padding-left: 2rem;
  padding-right: 2rem;
}
.px-\\[10\\%\\]{
  padding-left: 10%;
  padding-right: 10%;
}
.py-0\\.5{
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.py-1{
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-1\\.5{
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-2{
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-4{
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pb-3{
  padding-bottom: 0.75rem;
}
.pb-4{
  padding-bottom: 1rem;
}
.pl-8{
  padding-left: 2rem;
}
.pr-2{
  padding-right: 0.5rem;
}
.pr-8{
  padding-right: 2rem;
}
.pt-0{
  padding-top: 0px;
}
.pt-1{
  padding-top: 0.25rem;
}
.pt-16{
  padding-top: 4rem;
}
.pt-3{
  padding-top: 0.75rem;
}
.text-left{
  text-align: left;
}
.text-center{
  text-align: center;
}
.text-right{
  text-align: right;
}
.align-middle{
  vertical-align: middle;
}
.font-body{
  font-family: Inter, sans-serif;
}
.font-code{
  font-family: "Source Code Pro", monospace;
}
.font-headline{
  font-family: "Space Grotesk", sans-serif;
}
.font-mono{
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.text-2xl{
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-3xl{
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-4xl{
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-5xl{
  font-size: 3rem;
  line-height: 1;
}
.text-6xl{
  font-size: 3.75rem;
  line-height: 1;
}
.text-\\[0\\.8rem\\]{
  font-size: 0.8rem;
}
.text-base{
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-lg{
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-sm{
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xl{
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs{
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold{
  font-weight: 700;
}
.font-medium{
  font-weight: 500;
}
.font-normal{
  font-weight: 400;
}
.font-semibold{
  font-weight: 600;
}
.tabular-nums{
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.leading-none{
  line-height: 1;
}
.leading-tight{
  line-height: 1.25;
}
.tracking-tight{
  letter-spacing: -0.025em;
}
.tracking-tighter{
  letter-spacing: -0.05em;
}
.tracking-widest{
  letter-spacing: 0.1em;
}
.text-accent{
  color: hsl(var(--accent));
}
.text-accent-foreground{
  color: hsl(var(--accent-foreground));
}
.text-black{
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.text-card-foreground{
  color: hsl(var(--card-foreground));
}
.text-current{
  color: currentColor;
}
.text-cyan-300{
  --tw-text-opacity: 1;
  color: rgb(103 232 249 / var(--tw-text-opacity, 1));
}
.text-cyan-400{
  --tw-text-opacity: 1;
  color: rgb(34 211 238 / var(--tw-text-opacity, 1));
}
.text-destructive{
  color: hsl(var(--destructive));
}
.text-destructive-foreground{
  color: hsl(var(--destructive-foreground));
}
.text-foreground{
  color: hsl(var(--foreground));
}
.text-foreground\\/50{
  color: hsl(var(--foreground) / 0.5);
}
.text-gray-700{
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.text-gray-800{
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.text-green-400{
  --tw-text-opacity: 1;
  color: rgb(74 222 128 / var(--tw-text-opacity, 1));
}
.text-muted-foreground{
  color: hsl(var(--muted-foreground));
}
.text-popover-foreground{
  color: hsl(var(--popover-foreground));
}
.text-primary{
  color: hsl(var(--primary));
}
.text-primary-foreground{
  color: hsl(var(--primary-foreground));
}
.text-red-400{
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.text-secondary-foreground{
  color: hsl(var(--secondary-foreground));
}
.text-white{
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.text-yellow-300{
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity, 1));
}
.underline-offset-4{
  text-underline-offset: 4px;
}
.antialiased{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.opacity-0{
  opacity: 0;
}
.opacity-50{
  opacity: 0.5;
}
.opacity-60{
  opacity: 0.6;
}
.opacity-70{
  opacity: 0.7;
}
.opacity-90{
  opacity: 0.9;
}
.shadow{
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\]{
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg{
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md{
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-none{
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm{
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-xl{
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.outline{
  outline-style: solid;
}
.ring-0{
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.ring-offset-background{
  --tw-ring-offset-color: hsl(var(--background));
}
.filter{
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm{
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition{
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[left\\2c right\\2c width\\]{
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[margin\\2c opa\\]{
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[width\\2c height\\2c padding\\]{
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[width\\]{
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all{
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors{
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity{
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-transform{
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-200{
  transition-duration: 200ms;
}
.duration-300{
  transition-duration: 300ms;
}
.ease-in-out{
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-linear{
  transition-timing-function: linear;
}
@keyframes enter{
  from{
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit{
  to{
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
.animate-in{
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.fade-in-0{
  --tw-enter-opacity: 0;
}
.zoom-in-95{
  --tw-enter-scale: .95;
}
.duration-200{
  animation-duration: 200ms;
}
.duration-300{
  animation-duration: 300ms;
}
.ease-in-out{
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-linear{
  animation-timing-function: linear;
}
.bg-stars {
    background-image:
      radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
  }

html {
  font-family: 'Press Start 2P', monospace;
}

.file\\:border-0::file-selector-button{
  border-width: 0px;
}

.file\\:bg-transparent::file-selector-button{
  background-color: transparent;
}

.file\\:text-sm::file-selector-button{
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.file\\:font-medium::file-selector-button{
  font-weight: 500;
}

.file\\:text-foreground::file-selector-button{
  color: hsl(var(--foreground));
}

.placeholder\\:text-muted-foreground::-moz-placeholder{
  color: hsl(var(--muted-foreground));
}

.placeholder\\:text-muted-foreground::placeholder{
  color: hsl(var(--muted-foreground));
}

.after\\:absolute::after{
  content: var(--tw-content);
  position: absolute;
}

.after\\:-inset-2::after{
  content: var(--tw-content);
  inset: -0.5rem;
}

.after\\:inset-y-0::after{
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}

.after\\:left-1\\/2::after{
  content: var(--tw-content);
  left: 50%;
}

.after\\:w-\\[2px\\]::after{
  content: var(--tw-content);
  width: 2px;
}

.focus-within\\:relative:focus-within{
  position: relative;
}

.focus-within\\:z-20:focus-within{
  z-index: 20;
}

.hover\\:z-10:hover{
  z-index: 10;
}

.hover\\:scale-110:hover{
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:border-yellow-500:hover{
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}

.hover\\:bg-accent:hover{
  background-color: hsl(var(--accent));
}

.hover\\:bg-destructive\\/80:hover{
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:bg-destructive\\/90:hover{
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:bg-muted\\/50:hover{
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:bg-primary:hover{
  background-color: hsl(var(--primary));
}

.hover\\:bg-primary\\/80:hover{
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:bg-primary\\/90:hover{
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:bg-purple-700:hover{
  --tw-bg-opacity: 1;
  background-color: rgb(126 34 206 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-secondary:hover{
  background-color: hsl(var(--secondary));
}

.hover\\:bg-secondary\\/80:hover{
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:bg-yellow-300:hover{
  --tw-bg-opacity: 1;
  background-color: rgb(253 224 71 / var(--tw-bg-opacity, 1));
}

.hover\\:text-accent-foreground:hover{
  color: hsl(var(--accent-foreground));
}

.hover\\:text-foreground:hover{
  color: hsl(var(--foreground));
}

.hover\\:text-primary-foreground:hover{
  color: hsl(var(--primary-foreground));
}

.hover\\:underline:hover{
  text-decoration-line: underline;
}

.hover\\:opacity-100:hover{
  opacity: 1;
}

.hover\\:shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover{
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.focus\\:bg-accent:focus{
  background-color: hsl(var(--accent));
}

.focus\\:bg-primary:focus{
  background-color: hsl(var(--primary));
}

.focus\\:text-accent-foreground:focus{
  color: hsl(var(--accent-foreground));
}

.focus\\:text-primary-foreground:focus{
  color: hsl(var(--primary-foreground));
}

.focus\\:opacity-100:focus{
  opacity: 1;
}

.focus\\:outline-none:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:ring-2:focus{
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:ring-ring:focus{
  --tw-ring-color: hsl(var(--ring));
}

.focus\\:ring-offset-2:focus{
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:outline-none:focus-visible{
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\\:ring-2:focus-visible{
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\\:ring-ring:focus-visible{
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:ring-offset-2:focus-visible{
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:ring-offset-background:focus-visible{
  --tw-ring-offset-color: hsl(var(--background));
}

.disabled\\:pointer-events-none:disabled{
  pointer-events: none;
}

.disabled\\:cursor-not-allowed:disabled{
  cursor: not-allowed;
}

.disabled\\:opacity-50:disabled{
  opacity: 0.5;
}

.group\\/menu-item:focus-within .group-focus-within\\/menu-item\\:opacity-100{
  opacity: 1;
}

.group:hover .group-hover\\:border-accent{
  border-color: hsl(var(--accent));
}

.group:hover .group-hover\\:text-accent{
  color: hsl(var(--accent));
}

.group\\/menu-item:hover .group-hover\\/menu-item\\:opacity-100{
  opacity: 1;
}

.group:hover .group-hover\\:opacity-100{
  opacity: 1;
}

.group:hover .group-hover\\:shadow-accent\\/50{
  --tw-shadow-color: hsl(var(--accent) / 0.5);
  --tw-shadow: var(--tw-shadow-colored);
}

.group.destructive .group-\\[\\.destructive\\]\\:border-muted\\/40{
  border-color: hsl(var(--muted) / 0.4);
}

.group.destructive .group-\\[\\.destructive\\]\\:text-red-300{
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity, 1));
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:border-destructive\\/30:hover{
  border-color: hsl(var(--destructive) / 0.3);
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:bg-destructive:hover{
  background-color: hsl(var(--destructive));
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-destructive-foreground:hover{
  color: hsl(var(--destructive-foreground));
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-red-50:hover{
  --tw-text-opacity: 1;
  color: rgb(254 242 242 / var(--tw-text-opacity, 1));
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-destructive:focus{
  --tw-ring-color: hsl(var(--destructive));
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-red-400:focus{
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity, 1));
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-offset-red-600:focus{
  --tw-ring-offset-color: #dc2626;
}

.peer:disabled ~ .peer-disabled\\:cursor-not-allowed{
  cursor: not-allowed;
}

.peer:disabled ~ .peer-disabled\\:opacity-70{
  opacity: 0.7;
}

.group\\/menu-item:has([data-sidebar=menu-action]) .group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8{
  padding-right: 2rem;
}

.aria-disabled\\:pointer-events-none[aria-disabled="true"]{
  pointer-events: none;
}

.aria-disabled\\:opacity-50[aria-disabled="true"]{
  opacity: 0.5;
}

.aria-selected\\:bg-accent[aria-selected="true"]{
  background-color: hsl(var(--accent));
}

.aria-selected\\:bg-accent\\/50[aria-selected="true"]{
  background-color: hsl(var(--accent) / 0.5);
}

.aria-selected\\:text-accent-foreground[aria-selected="true"]{
  color: hsl(var(--accent-foreground));
}

.aria-selected\\:text-muted-foreground[aria-selected="true"]{
  color: hsl(var(--muted-foreground));
}

.aria-selected\\:opacity-100[aria-selected="true"]{
  opacity: 1;
}

.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:translate-y-1[data-side="bottom"]{
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:-translate-x-1[data-side="left"]{
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:translate-x-1[data-side="right"]{
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:-translate-y-1[data-side="top"]{
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:translate-x-5[data-state="checked"]{
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state="unchecked"]{
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[swipe\\=cancel\\]\\:translate-x-0[data-swipe="cancel"]{
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[swipe\\=end\\]\\:translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe="end"]{
  --tw-translate-x: var(--radix-toast-swipe-end-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[swipe\\=move\\]\\:translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe="move"]{
  --tw-translate-x: var(--radix-toast-swipe-move-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes accordion-up{
  from{
    height: var(--radix-accordion-content-height);
  }
  to{
    height: 0;
  }
}

.data-\\[state\\=closed\\]\\:animate-accordion-up[data-state="closed"]{
  animation: accordion-up 0.2s ease-out;
}

@keyframes accordion-down{
  from{
    height: 0;
  }
  to{
    height: var(--radix-accordion-content-height);
  }
}

.data-\\[state\\=open\\]\\:animate-accordion-down[data-state="open"]{
  animation: accordion-down 0.2s ease-out;
}

.data-\\[state\\=active\\]\\:bg-background[data-state="active"]{
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:bg-primary[data-state="checked"]{
  background-color: hsl(var(--primary));
}

.data-\\[state\\=open\\]\\:bg-accent[data-state="open"]{
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:bg-secondary[data-state="open"]{
  background-color: hsl(var(--secondary));
}

.data-\\[state\\=selected\\]\\:bg-muted[data-state="selected"]{
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:bg-input[data-state="unchecked"]{
  background-color: hsl(var(--input));
}

.data-\\[active\\=true\\]\\:font-medium[data-active="true"]{
  font-weight: 500;
}

.data-\\[state\\=active\\]\\:text-foreground[data-state="active"]{
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state="checked"]{
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=open\\]\\:text-accent-foreground[data-state="open"]{
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:text-muted-foreground[data-state="open"]{
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\]\\:opacity-50[data-disabled]{
  opacity: 0.5;
}

.data-\\[state\\=open\\]\\:opacity-100[data-state="open"]{
  opacity: 1;
}

.data-\\[state\\=active\\]\\:shadow-sm[data-state="active"]{
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[swipe\\=move\\]\\:transition-none[data-swipe="move"]{
  transition-property: none;
}

.data-\\[state\\=closed\\]\\:duration-300[data-state="closed"]{
  transition-duration: 300ms;
}

.data-\\[state\\=open\\]\\:duration-500[data-state="open"]{
  transition-duration: 500ms;
}

.data-\\[state\\=open\\]\\:animate-in[data-state="open"]{
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:animate-out[data-state="closed"]{
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[swipe\\=end\\]\\:animate-out[data-swipe="end"]{
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:fade-out-0[data-state="closed"]{
  --tw-exit-opacity: 0;
}

.data-\\[state\\=closed\\]\\:fade-out-80[data-state="closed"]{
  --tw-exit-opacity: 0.8;
}

.data-\\[state\\=open\\]\\:fade-in-0[data-state="open"]{
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:zoom-out-95[data-state="closed"]{
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:zoom-in-95[data-state="open"]{
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side="bottom"]{
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side="left"]{
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side="right"]{
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side="top"]{
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:slide-out-to-bottom[data-state="closed"]{
  --tw-exit-translate-y: 100%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-left[data-state="closed"]{
  --tw-exit-translate-x: -100%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state="closed"]{
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-right[data-state="closed"]{
  --tw-exit-translate-x: 100%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-right-full[data-state="closed"]{
  --tw-exit-translate-x: 100%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-top[data-state="closed"]{
  --tw-exit-translate-y: -100%;
}

.data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state="closed"]{
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:slide-in-from-bottom[data-state="open"]{
  --tw-enter-translate-y: 100%;
}

.data-\\[state\\=open\\]\\:slide-in-from-left[data-state="open"]{
  --tw-enter-translate-x: -100%;
}

.data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state="open"]{
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:slide-in-from-right[data-state="open"]{
  --tw-enter-translate-x: 100%;
}

.data-\\[state\\=open\\]\\:slide-in-from-top[data-state="open"]{
  --tw-enter-translate-y: -100%;
}

.data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state="open"]{
  --tw-enter-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:slide-in-from-top-full[data-state="open"]{
  --tw-enter-translate-y: -100%;
}

.data-\\[state\\=closed\\]\\:duration-300[data-state="closed"]{
  animation-duration: 300ms;
}

.data-\\[state\\=open\\]\\:duration-500[data-state="open"]{
  animation-duration: 500ms;
}

.group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]{
  left: calc(var(--sidebar-width) * -1);
}

.group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]{
  right: calc(var(--sidebar-width) * -1);
}

.group[data-side="left"] .group-data-\\[side\\=left\\]\\:-right-4{
  right: -1rem;
}

.group[data-side="right"] .group-data-\\[side\\=right\\]\\:left-0{
  left: 0px;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:-mt-8{
  margin-top: -2rem;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:hidden{
  display: none;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:\\!size-8{
  width: 2rem !important;
  height: 2rem !important;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:w-\\[--sidebar-width-icon\\]{
  width: var(--sidebar-width-icon);
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\]{
  width: calc(var(--sidebar-width-icon) + 1rem);
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\]{
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}

.group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:w-0{
  width: 0px;
}

.group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0{
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group[data-side="right"] .group-data-\\[side\\=right\\]\\:rotate-180{
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:overflow-hidden{
  overflow: hidden;
}

.group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:rounded-lg{
  border-radius: var(--radius);
}

.group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:border{
  border-width: 1px;
}

.group[data-side="left"] .group-data-\\[side\\=left\\]\\:border-r{
  border-right-width: 1px;
}

.group[data-side="right"] .group-data-\\[side\\=right\\]\\:border-l{
  border-left-width: 1px;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:\\!p-0{
  padding: 0px !important;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:\\!p-2{
  padding: 0.5rem !important;
}

.group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:opacity-0{
  opacity: 0;
}

.group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:shadow{
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full::after{
  content: var(--tw-content);
  left: 100%;
}

.peer\\/menu-button[data-size="default"] ~ .peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5{
  top: 0.375rem;
}

.peer\\/menu-button[data-size="lg"] ~ .peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5{
  top: 0.625rem;
}

.peer\\/menu-button[data-size="sm"] ~ .peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1{
  top: 0.25rem;
}

.peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\]{
  min-height: calc(100svh - 1rem);
}

.dark\\:border-destructive:is(.dark *){
  border-color: hsl(var(--destructive));
}

.dark\\:bg-gray-700:is(.dark *){
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1));
}

@media (min-width: 640px){
  .sm\\:bottom-0{
    bottom: 0px;
  }
  .sm\\:right-0{
    right: 0px;
  }
  .sm\\:top-auto{
    top: auto;
  }
  .sm\\:mb-12{
    margin-bottom: 3rem;
  }
  .sm\\:mb-6{
    margin-bottom: 1.5rem;
  }
  .sm\\:mt-0{
    margin-top: 0px;
  }
  .sm\\:flex{
    display: flex;
  }
  .sm\\:h-16{
    height: 4rem;
  }
  .sm\\:h-24{
    height: 6rem;
  }
  .sm\\:w-16{
    width: 4rem;
  }
  .sm\\:w-24{
    width: 6rem;
  }
  .sm\\:w-40{
    width: 10rem;
  }
  .sm\\:max-w-md{
    max-width: 28rem;
  }
  .sm\\:max-w-sm{
    max-width: 24rem;
  }
  .sm\\:grid-cols-5{
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .sm\\:flex-row{
    flex-direction: row;
  }
  .sm\\:flex-col{
    flex-direction: column;
  }
  .sm\\:justify-end{
    justify-content: flex-end;
  }
  .sm\\:space-x-2 > :not([hidden]) ~ :not([hidden]){
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }
  .sm\\:space-x-4 > :not([hidden]) ~ :not([hidden]){
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }
  .sm\\:space-y-0 > :not([hidden]) ~ :not([hidden]){
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }
  .sm\\:rounded-lg{
    border-radius: var(--radius);
  }
  .sm\\:p-8{
    padding: 2rem;
  }
  .sm\\:text-left{
    text-align: left;
  }
  .sm\\:text-2xl{
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .sm\\:text-7xl{
    font-size: 4.5rem;
    line-height: 1;
  }
  .sm\\:text-base{
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .sm\\:text-xl{
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .data-\\[state\\=open\\]\\:sm\\:slide-in-from-bottom-full[data-state="open"]{
    --tw-enter-translate-y: 100%;
  }
}

@media (min-width: 768px){
  .md\\:block{
    display: block;
  }
  .md\\:flex{
    display: flex;
  }
  .md\\:h-28{
    height: 7rem;
  }
  .md\\:w-28{
    width: 7rem;
  }
  .md\\:max-w-\\[420px\\]{
    max-width: 420px;
  }
  .md\\:max-w-lg{
    max-width: 32rem;
  }
  .md\\:text-base{
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .md\\:text-sm{
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .md\\:opacity-0{
    opacity: 0;
  }
  .after\\:md\\:hidden::after{
    content: var(--tw-content);
    display: none;
  }
  .peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:m-2{
    margin: 0.5rem;
  }
  .peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2{
    margin-left: 0.5rem;
  }
  .peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:ml-0{
    margin-left: 0px;
  }
  .peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl{
    border-radius: 0.75rem;
  }
  .peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:shadow{
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:bg-accent:has([aria-selected]){
  background-color: hsl(var(--accent));
}

.first\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-l-md:has([aria-selected]):first-child{
  border-top-left-radius: calc(var(--radius) - 2px);
  border-bottom-left-radius: calc(var(--radius) - 2px);
}

.last\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-r-md:has([aria-selected]):last-child{
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-outside\\)\\]\\:bg-accent\\/50:has([aria-selected].day-outside){
  background-color: hsl(var(--accent) / 0.5);
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-range-end\\)\\]\\:rounded-r-md:has([aria-selected].day-range-end){
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){
  padding-right: 0px;
}

.\\[\\&\\>button\\]\\:hidden>button{
  display: none;
}

.\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.\\[\\&\\>span\\]\\:line-clamp-1>span{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.\\[\\&\\>svg\\]\\:absolute>svg{
  position: absolute;
}

.\\[\\&\\>svg\\]\\:left-4>svg{
  left: 1rem;
}

.\\[\\&\\>svg\\]\\:top-4>svg{
  top: 1rem;
}

.\\[\\&\\>svg\\]\\:size-4>svg{
  width: 1rem;
  height: 1rem;
}

.\\[\\&\\>svg\\]\\:h-2\\.5>svg{
  height: 0.625rem;
}

.\\[\\&\\>svg\\]\\:h-3>svg{
  height: 0.75rem;
}

.\\[\\&\\>svg\\]\\:w-2\\.5>svg{
  width: 0.625rem;
}

.\\[\\&\\>svg\\]\\:w-3>svg{
  width: 0.75rem;
}

.\\[\\&\\>svg\\]\\:shrink-0>svg{
  flex-shrink: 0;
}

.\\[\\&\\>svg\\]\\:text-destructive>svg{
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:text-foreground>svg{
  color: hsl(var(--foreground));
}

.\\[\\&\\>svg\\]\\:text-muted-foreground>svg{
  color: hsl(var(--muted-foreground));
}

.\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{
  padding-left: 1.75rem;
}

.\\[\\&\\>tr\\]\\:last\\:border-b-0:last-child>tr{
  border-bottom-width: 0px;
}

.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg{
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.\\[\\&_\\.recharts-cartesian-axis-tick_text\\]\\:fill-muted-foreground .recharts-cartesian-axis-tick text{
  fill: hsl(var(--muted-foreground));
}

.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke='#ccc']{
  stroke: hsl(var(--border) / 0.5);
}

.\\[\\&_\\.recharts-curve\\.recharts-tooltip-cursor\\]\\:stroke-border .recharts-curve.recharts-tooltip-cursor{
  stroke: hsl(var(--border));
}

.\\[\\&_\\.recharts-dot\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-dot[stroke='#fff']{
  stroke: transparent;
}

.\\[\\&_\\.recharts-layer\\]\\:outline-none .recharts-layer{
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.\\[\\&_\\.recharts-polar-grid_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-polar-grid [stroke='#ccc']{
  stroke: hsl(var(--border));
}

.\\[\\&_\\.recharts-radial-bar-background-sector\\]\\:fill-muted .recharts-radial-bar-background-sector{
  fill: hsl(var(--muted));
}

.\\[\\&_\\.recharts-rectangle\\.recharts-tooltip-cursor\\]\\:fill-muted .recharts-rectangle.recharts-tooltip-cursor{
  fill: hsl(var(--muted));
}

.\\[\\&_\\.recharts-reference-line_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-reference-line [stroke='#ccc']{
  stroke: hsl(var(--border));
}

.\\[\\&_\\.recharts-sector\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-sector[stroke='#fff']{
  stroke: transparent;
}

.\\[\\&_\\.recharts-sector\\]\\:outline-none .recharts-sector{
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.\\[\\&_\\.recharts-surface\\]\\:outline-none .recharts-surface{
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.\\[\\&_p\\]\\:leading-relaxed p{
  line-height: 1.625;
}

.\\[\\&_svg\\]\\:pointer-events-none svg{
  pointer-events: none;
}

.\\[\\&_svg\\]\\:size-4 svg{
  width: 1rem;
  height: 1rem;
}

.\\[\\&_svg\\]\\:shrink-0 svg{
  flex-shrink: 0;
}

.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{
  border-width: 0px;
}

.\\[\\&_tr\\]\\:border-b tr{
  border-bottom-width: 1px;
}

[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{
  right: -0.5rem;
}

[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{
  cursor: e-resize;
}

[data-side=left] .\\[\\[data-side\\=left\\]_\\&\\]\\:cursor-w-resize{
  cursor: w-resize;
}

[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{
  left: -0.5rem;
}

[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{
  cursor: w-resize;
}

[data-side=right] .\\[\\[data-side\\=right\\]_\\&\\]\\:cursor-e-resize{
  cursor: e-resize;
}
`,""]);let n=s}},t=>{var e=e=>t(t.s=e);t.O(0,[239,346,457,138,45,981,189,96,358],()=>e(42412)),_N_E=t.O()}]);