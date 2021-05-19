sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/simple/SimpleApp/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.simple.SimpleApp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			var urlParameter = this.getComponentData();
			if (urlParameter.startupParameters) {
				if (urlParameter.startupParameters["Name"]) {
					this.getComponentData().Name = urlParameter.startupParameters["Name"][0];
				}
			}

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});