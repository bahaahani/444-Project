"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(P,c,s)=>{s.r(c),s.d(c,{LoginPageModule:()=>f});var d=s(6895),l=s(433),e=s(4556),r=s(3128),p=s(655),n=s(8256),m=s(2891);const h=[{path:"",component:(()=>{class o{constructor(i,t){this.authSrv=i,this.toastCtrl=t,this.email="",this.password=""}login(){return(0,p.mG)(this,void 0,void 0,function*(){const i=yield this.toastCtrl.create({message:"Enter Your Email Please!",duration:3e3}),t=yield this.toastCtrl.create({message:"Enter Your Password Please!",duration:3e3});""==this.email?i.present():""==this.password&&t.present(),this.authSrv.signin(this.email,this.password)})}send(){this.authSrv.send(this.email)}}return o.\u0275fac=function(i){return new(i||o)(n.Y36(m.e),n.Y36(e.yF))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-login"]],decls:34,vars:2,consts:[["align","center"],["fill","clear","routerLink","/home","slot","start","color","dark"],["name","home"],[1,"signin-overlay","ion-padding"],["size","12"],["lines","none"],["position","stacked"],["type","text",3,"ngModel","ngModelChange"],["name","mail","slot","start",1,"input-icon"],["type","password",3,"ngModel","ngModelChange"],["name","lock-closed","slot","start",1,"input-icon"],["lines","none",1,"forget-password"],["fill","clear","color","medium","slot","end",3,"click"],["size","12",1,"ion-text-center"],["expand","block","shape","round",1,"sign-in-button",3,"click"],[2,"color","black"],["routerLink","/signup"]],template:function(i,t){1&i&&(n.TgZ(0,"ion-content")(1,"ion-header")(2,"ion-toolbar")(3,"ion-title",0),n._uU(4,"Log In"),n.qZA(),n.TgZ(5,"ion-button",1),n._UZ(6,"ion-icon",2),n.qZA()()(),n.TgZ(7,"div",3)(8,"ion-grid")(9,"ion-row")(10,"ion-col",4)(11,"ion-item",5)(12,"ion-label",6),n._uU(13,"Email"),n.qZA(),n.TgZ(14,"ion-input",7),n.NdJ("ngModelChange",function(u){return t.email=u}),n.qZA(),n._UZ(15,"ion-icon",8),n.qZA()()(),n.TgZ(16,"ion-row")(17,"ion-col",4)(18,"ion-item",5)(19,"ion-label",6),n._uU(20,"Password"),n.qZA(),n.TgZ(21,"ion-input",9),n.NdJ("ngModelChange",function(u){return t.password=u}),n.qZA(),n._UZ(22,"ion-icon",10),n.qZA(),n.TgZ(23,"ion-item",11)(24,"ion-button",12),n.NdJ("click",function(){return t.send()}),n._uU(25," Forgot Password? "),n.qZA()()()(),n.TgZ(26,"ion-row")(27,"ion-col",13)(28,"ion-button",14),n.NdJ("click",function(){return t.login()}),n._uU(29," Sign In "),n.qZA(),n.TgZ(30,"p",15),n._uU(31," Don't have an account? "),n.TgZ(32,"a",16),n._uU(33,"Sign up here"),n.qZA()()()()()()()),2&i&&(n.xp6(14),n.Q6J("ngModel",t.email),n.xp6(7),n.Q6J("ngModel",t.password))},dependencies:[l.JJ,l.On,e.YG,e.wI,e.W2,e.jY,e.Gu,e.gu,e.pK,e.Ie,e.Q$,e.Nd,e.wd,e.sr,e.j9,e.YI,e.Fo,r.rH]}),o})()}];let Z=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[r.Bz.forChild(h),r.Bz]}),o})(),f=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[d.ez,l.u5,e.Pc,Z]}),o})()}}]);