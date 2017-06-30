enyo.kind({
    name : "MainForm",
    kind: enyo.Control,
	layoutKind: "FittableRowsLayout",
	classes: "enyo-unselectable onyx enyo-fit",
    components : [
		{name: "popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, autoDismiss: false , classes: "popup", components:[
			{name:"errorPopup",content:"",style: "padding: 20px; text-align: center"},
			{kind:"onyx.Button", content:"关闭", ontap:"hideMsg", style:"width: 100%;"}
		]},
		{kind: "onyx.Toolbar", content: "个税计算器", classes: "header"},
		{kind: "enyo.Scroller", classes: "main", fit: true, components: [
			{name: "inputContainer", components: [
				{kind: "onyx.Groupbox", components: [
					{kind: "onyx.Groupbox", components: [
						{kind: "onyx.GroupboxHeader", content: "计算基数"},
						{kind: "onyx.InputDecorator", components: [
							{kind: "onyx.Input", name: "baseValueInput", placeholder: "扣除公积金和社保个人缴纳部分后的收入", style: "width: 100%;"}
						]}
					]}
				]},
				{tag: "p", classes: "info", content: "”计算基数“为实际收入扣除公积金和社保等个人缴纳部分后的金额"},
				{tag: "p", components: [
					{kind: "onyx.RadioGroup", components: [
						{content: "工资、薪金", active: true, name: "isSallary"},
						{content: "个体工商户"}
					]}
				]}
			]},
			{name: "outputContainer", components: [
				{kind: "onyx.Groupbox", name: "outputGroup", components: [
					{kind: "onyx.GroupboxHeader", name: "outputHeader"},
					{name: "outputContent", allowHtml: true}
				]}
			]},
			{tag: "p", allowHtml: true, content: "&nbsp;"}
		]},
		{kind: "onyx.Toolbar", classes: "footer", components: [
			{kind: "onyx.Grabber", onclick: "doBack"},
			{kind: "onyx.Button", name: "calcButton", onclick: "doCalc", content: "计算所得税"},
			{kind: "onyx.Button", name: "reCalcButton", onclick: "doRecalc", content: "重新计算"},
			{tag: "p", allowHtml: true, classes: "copyright", content: "by QLike.com"}
		]}
    ],
	
	create: function() {
		this.inherited(arguments);
		this.doRecalc();
	},
	
    doCalc : function () {
		var baseValue = this.$.baseValueInput.getValue();
		if(baseValue.trim().length <= 0) {
			this.showMsg("请输入计算基数");
			return;
		}
		
		if(!baseValue.isNumber()) {
			this.showMsg("计算基数必须为数字");
			return;
		}
		
		var rule = null;
		var title = null;
		if(this.$.isSallary.getActive() === true) {
			rule = rule2;
			title = "工资、薪金所得税";
		} else {
			rule = rule4;
			title = "个体工商户所得税";
		}
		
		this.$.outputHeader.setContent(title);
		this.$.outputContent.setContent(getOutput(baseValue, rule));
        
		this.$.calcButton.setShowing(false);
		this.$.inputContainer.setShowing(false);
		this.$.reCalcButton.setShowing(true);
		this.$.outputContainer.setShowing(true);
    },
	
	doRecalc: function() {
		this.$.calcButton.setShowing(true);
		this.$.inputContainer.setShowing(true);
		this.$.reCalcButton.setShowing(false);
		this.$.outputContainer.setShowing(false);
	},
	
	showMsg: function(msg) {
		this.$.errorPopup.setContent(msg);
		this.$.popup.show();
	},
	
	hideMsg: function(){
		this.$.popup.hide();
	}
});
