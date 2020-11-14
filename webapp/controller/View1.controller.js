sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.simple.SimpleApp.controller.View1", {
      
      toPage2: function(){
      	sap.ui.getCore().byFieldGroupId("idAppControl").to("page2");
      	var t = 10;
      }
	});
});