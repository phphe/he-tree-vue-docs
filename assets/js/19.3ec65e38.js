(window.webpackJsonp=window.webpackJsonp||[]).push([[19,21],{269:function(t,e,s){},281:function(t,e,s){"use strict";s(269)},299:function(t,e,s){"use strict";s.r(e);s(91),s(248);var o=s(249),n=s(259),a={extends:o.d,mixins:[o.c,o.a,o.b],props:{triggerClass:{default:"drag-trigger"},draggable:{type:[Boolean,Function],default:!1},droppable:{type:[Boolean,Function],default:!1}},data:()=>({treeClass:"my-tree-view1"}),computed:{total(){let t=0;return this.walkTreeData(e=>{t++}),t}},methods:{overrideSlotDefault({node:t,index:e,path:s,tree:o},n){const a=this.$createElement;return a("div",{class:"node-content"},[a("button",{class:"mrs drag-trigger"},["Drag"]),a("button",{class:"mrs fold-btn",on:{click:()=>o.toggleFold(t,s)}},[t.$folded?"+":"-"]),n(),a("button",{class:"mls",on:{click:()=>this.edit(t)}},["edit"]),a("button",{class:"mls",on:{click:()=>this.removeNodeByPath(s)}},["remove"]),a("button",{class:"mls",on:{click:()=>this.hideNode(t)}},["hide"])])},blockHeader(){const t=this.$createElement;return t("div",{class:"header"},[t("div",[t("button",{on:{click:this.add}},["add"]),t("button",{on:{click:this.showHidden},class:"mls"},["show hidden"])]),t("input",{on:{input:t=>this.search(t)},attrs:{placeholder:"Search"}})])},blockFooter(){const t=this.$createElement;return t("div",{class:"footer"},[t("i",["Nodes count:"])," ",this.total])},add(){this.treeData.push({text:"node "+n.C(3).toLowerCase()})},edit(t){t.text=window.prompt("Edit node",t.text)},showHidden(){this.walkTreeData(t=>{this.$set(t,"$hidden",!1)})},hideNode(t){this.$set(t,"$hidden",!0)},search(t){const e=t.target.value||"";this.walkTreeData(t=>{this.$set(t,"$hidden",!t.text.includes(e))})}}},d=(s(281),s(15)),i=Object(d.a)(a,void 0,void 0,!1,null,null,null);e.default=i.exports},343:function(t,e,s){"use strict";s.r(e);var o={components:{TreeView:s(299).default},data:()=>({treeData:[{text:"node 1"},{text:"node 2",children:[{text:"node 2-1"}]}]})},n=s(15),a=Object(n.a)(o,(function(){return(0,this._self._c)("TreeView",{attrs:{value:this.treeData,draggable:"",droppable:""}})}),[],!1,null,null,null);e.default=a.exports}}]);