sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller,MessageBox) {
	"use strict";

	return Controller.extend("com.test.mock_ListingApp.controller.confirmArticlePage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.test.mock_ListingApp.view.confirmArticlePage
		 */
			onInit: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("confirmArticlePage").attachMatched(this._onRouteFound, this);
			},
			
			_onRouteFound: function(oEvt) {
				var oSharedData = sap.ui.getCore().getModel("sharedData");
				var oView = this.getView();
				oView.setModel(oSharedData,"abc");
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.test.mock_ListingApp.view.confirmArticlePage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.test.mock_ListingApp.view.confirmArticlePage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.test.mock_ListingApp.view.confirmArticlePage
		 */
		//	onExit: function() {
		//
		//	}
		onConfirmBackPress: function(){
			this.getOwnerComponent().getRouter().navTo("SearchArticlePage");
		},
		onConfirmPageBack: function(){
			this.onConfirmBackPress();
		},
		onDataConfirmation: function(){
			var that = this;
			sap.m.MessageBox.confirm("Are your sure want to submit?", {
			    title: "Confirm",
			    onClose: function(oAction) {
		          if (oAction === sap.m.MessageBox.Action.OK) {
		            that._showSuccessMessage();
		          }
		    }});
		},
		_showSuccessMessage: function() {
			var that = this;
			sap.m.MessageBox.success("Layout Article Submitted Successfully", {
			    title: "Success",
			    onClose: function(oAction) {
		          if (oAction === sap.m.MessageBox.Action.OK) {
		        	that.getOwnerComponent().getRouter().navTo("SearchArticlePage");	
		          }
		    }});
		}
	});

});