"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1016],{1016:(C,g,r)=>{r.r(g),r.d(g,{ViewcarPageModule:()=>q});var s=r(6895),u=r(433),o=r(4556),d=r(3128),l=r(3562),e=r(8256),_=r(8427);function p(n,c){if(1&n){const t=e.EpF();e.TgZ(0,"ion-button",9),e.NdJ("click",function(){e.CHM(t);const a=e.oxw().$implicit,m=e.oxw();return e.KtG(m.deleteComment(a.id))}),e._UZ(1,"ion-icon",10),e._uU(2,"Delete "),e.qZA()}}function Z(n,c){if(1&n&&(e.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),e._uU(3),e.qZA(),e.TgZ(4,"ion-card-subtitle"),e._uU(5),e.qZA()(),e.TgZ(6,"ion-card-content"),e._uU(7),e.qZA(),e.YNc(8,p,3,0,"ion-button",8),e.qZA()),2&n){const t=c.$implicit,i=e.oxw();e.xp6(3),e.Oqu(t.username),e.xp6(2),e.hij("",t.rating," out of 5"),e.xp6(2),e.Oqu(t.comment),e.xp6(1),e.Q6J("ngIf",i.admin)}}function f(n,c){if(1&n&&(e.TgZ(0,"ion-select-option"),e._uU(1),e.qZA()),2&n){const t=c.$implicit;e.xp6(1),e.Oqu(t)}}const h=function(){return[1,2,3,4,5]};function T(n,c){if(1&n){const t=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",11)(3,"ion-button",12),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.modal.dismiss())}),e._uU(4,"Cancel"),e.qZA()(),e.TgZ(5,"ion-title",13),e._uU(6,"Leave comment"),e.qZA(),e.TgZ(7,"ion-buttons",14)(8,"ion-button",15),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.addComment())}),e._uU(9,"Confirm"),e.qZA()()()(),e.TgZ(10,"ion-content",16)(11,"ion-item")(12,"ion-label"),e._uU(13,"Rating: "),e.qZA(),e.TgZ(14,"ion-select",17),e.NdJ("ngModelChange",function(a){e.CHM(t);const m=e.oxw();return e.KtG(m.newComment.rating=a)}),e.YNc(15,f,2,1,"ion-select-option",6),e.qZA(),e.TgZ(16,"ion-label",18),e._uU(17,"Enter comment"),e.qZA(),e.TgZ(18,"ion-input",19),e.NdJ("ngModelChange",function(a){e.CHM(t);const m=e.oxw();return e.KtG(m.newComment.comment=a)}),e.qZA()()()}if(2&n){const t=e.oxw();e.xp6(8),e.Q6J("strong",!0),e.xp6(6),e.Q6J("ngModel",t.newComment.rating),e.xp6(1),e.Q6J("ngForOf",e.DdM(4,h)),e.xp6(3),e.Q6J("ngModel",t.newComment.comment)}}const A=[{path:"",component:(()=>{class n{constructor(t,i){this.dataSrv=t,this.navCtrl=i,this.admin=this.dataSrv.admin,this.car={},this.modal={},this.newComment={},(0,l.QT)((0,l.JU)(this.dataSrv.carCollection,this.dataSrv.selectedCarId)).then(a=>{this.car=a.data()}),this.comments=(0,l.BS)((0,l.IO)(this.dataSrv.commentCollection,(0,l.ar)("carId","==",this.dataSrv.selectedCarId)),{idField:"id"})}addComment(){(0,l.ET)(this.dataSrv.commentCollection,Object.assign(Object.assign({},this.newComment),{username:this.dataSrv.getUsername(),carId:this.dataSrv.selectedCarId})),this.modal.dismiss(),this.newComment={}}deleteComment(t){(0,l.oe)((0,l.JU)(this.dataSrv.commentCollection,t))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_.Z),e.Y36(o.SH))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-viewcar"]],viewQuery:function(t,i){if(1&t&&e.Gf(o.ki,5),2&t){let a;e.iGM(a=e.CRH())&&(i.modal=a.first)}},decls:67,vars:16,consts:[["fill","clear","routerDirection","back",3,"click"],["name","arrow-back"],[1,"myImage",2,"width","100%",3,"src"],[2,"font-weight","bold"],[2,"color","black"],["slot","end","id","commentModal"],[4,"ngFor","ngForOf"],["trigger","commentModal"],["fill","clear","color","danger",3,"click",4,"ngIf"],["fill","clear","color","danger",3,"click"],["name","close-circle"],["slot","start"],[3,"click"],["align","center"],["slot","end"],[3,"strong","click"],[1,"ion-padding"],["aria-label","Rating",3,"ngModel","ngModelChange"],["position","stacked"],["type","text","placeholder","comment...",3,"ngModel","ngModelChange"]],template:function(t,i){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-button",0),e.NdJ("click",function(){return i.navCtrl.back()}),e._UZ(3,"ion-icon",1),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"View Car"),e.qZA()()(),e.TgZ(6,"ion-content")(7,"ion-card"),e._UZ(8,"img",2),e.TgZ(9,"ion-card-header")(10,"ion-card-title"),e._uU(11),e.qZA(),e.TgZ(12,"ion-card-subtitle"),e._uU(13),e.qZA()(),e.TgZ(14,"ion-item")(15,"p",3),e._uU(16,"Type:"),e.qZA(),e.TgZ(17,"p",4),e._uU(18),e.qZA()(),e.TgZ(19,"ion-item")(20,"p",3),e._uU(21,"Color:"),e.qZA(),e.TgZ(22,"p",4),e._uU(23),e.qZA()(),e.TgZ(24,"ion-item")(25,"p",3),e._uU(26,"Engine:"),e.qZA(),e._uU(27),e.qZA(),e.TgZ(28,"ion-item")(29,"p",3),e._uU(30,"Features:"),e.qZA(),e._uU(31),e.qZA(),e.TgZ(32,"ion-item")(33,"p",3),e._uU(34,"Mileage:"),e.qZA(),e._uU(35),e.qZA(),e.TgZ(36,"ion-item")(37,"p",3),e._uU(38,"Number of seats:"),e.qZA(),e._uU(39),e.qZA(),e.TgZ(40,"ion-item")(41,"p",3),e._uU(42,"Mileage:"),e.qZA(),e._uU(43),e.qZA(),e.TgZ(44,"ion-item")(45,"p",3),e._uU(46,"Price:"),e.qZA(),e._uU(47),e.qZA(),e.TgZ(48,"ion-item")(49,"p",3),e._uU(50,"Specifications:"),e.qZA(),e._uU(51),e.qZA(),e.TgZ(52,"ion-item")(53,"p",3),e._uU(54,"Status:"),e.qZA(),e._uU(55),e.qZA()(),e.TgZ(56,"ion-card")(57,"ion-card-header")(58,"ion-item")(59,"ion-card-title",3),e._uU(60,"Comments"),e.qZA(),e.TgZ(61,"ion-button",5),e._uU(62,"Add"),e.qZA()()(),e.YNc(63,Z,9,4,"ion-card",6),e.ALo(64,"async"),e.qZA(),e.TgZ(65,"ion-modal",7),e.YNc(66,T,19,5,"ng-template"),e.qZA()()),2&t&&(e.xp6(8),e.s9C("src",i.car.image,e.LSH),e.xp6(3),e.Oqu(i.car.model),e.xp6(2),e.Oqu(i.car.manufacturer),e.xp6(5),e.Oqu(i.car.type),e.xp6(5),e.Oqu(i.car.color),e.xp6(4),e.hij(" ",i.car.engine,""),e.xp6(4),e.hij(" ",i.car.features,""),e.xp6(4),e.hij(" ",i.car.mileage,""),e.xp6(4),e.hij(" ",i.car.numberOfSeats,""),e.xp6(4),e.hij(" ",i.car.mileage,""),e.xp6(4),e.hij(" ",i.car.price,""),e.xp6(4),e.hij(" ",i.car.specifications,""),e.xp6(4),e.hij(" ",i.car.status,""),e.xp6(8),e.Q6J("ngForOf",e.lcZ(64,14,i.comments)))},dependencies:[s.sg,s.O5,u.JJ,u.On,o.YG,o.Sm,o.PM,o.FN,o.Zi,o.tO,o.Dq,o.W2,o.Gu,o.gu,o.pK,o.Ie,o.Q$,o.t9,o.n0,o.wd,o.sr,o.ki,o.QI,o.j9,s.Ov]}),n})()}];let w=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(A),d.Bz]}),n})(),q=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.ez,u.u5,o.Pc,w]}),n})()}}]);