sap.ui.define([
	// "sap/ui/core/mvc/Controller",
	"com/md/library/util/BaseController",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, JSONModel) {
	"use strict";

	return Controller.extend("com.simple.SimpleApp.controller.View1", {

		onInit: function () {
			this._Name = this.getOwnerComponent().getComponentData().Name ? this.getOwnerComponent().getComponentData().Name : "Test";
			this._createEmbeddedComponent();
			var oModel = new JSONModel({
				"Hide": false
			});
			// sap.ui.getCore().setModel(oModel, "globalModel");
			this.setModel(oModel, "globalModel");
			sap.ui.getCore().getEventBus().subscribe("HideButton", this._hideButton.bind(this));
		},

		openPopUp: function (oEvent) {
			var oButton = oEvent.getSource();
			var oView = this.getView();
			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "com.md.library.fragment.PopUp",
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					return oPopover;
				});
			}
			this._pPopover.then(function (oPopover) {
				this._oPopover = oPopover;
				oPopover.openBy(oButton);
			}.bind(this));
		},

		onCancelPopover: function (oEvent) {
			this._oPopover.close();
		},

		_createEmbeddedComponent: function () {
			var oComponent = sap.ui.getCore().createComponent({
				name: "com.md.library.comp.embeddedpanel",
				componentData: {
					Name: this._Name
				}
			});
			this.getView().byId("panelCompContainer").setComponent(oComponent);
		},

		_hideButton: function () {
			var oModel = this.getModel("globalModel");
			oModel.setProperty("/Hide", !oModel.getProperty("/Hide"));
		}
	});
});