sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function(Controller) {
	"use strict";

	return Controller.extend("com.test.mock_ListingApp.controller.SearchArticlePage", {

		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel({
				CountryList: [{
					CountryCode: "DE",
					CountryName: "Germany"
				}, {
					CountryCode: "US",
					CountryName: "USA"
				}, {
					CountryCode: "UK",
					CountryName: "United Kingdom"
				}, {
					CountryCode: "AT",
					CountryName: "Austria"
				}],
				ArticleList: [{
					ArticleId: "1122",
					ArticleDescription: "Cabage"
				}, {
					ArticleId: "2312",
					ArticleDescription: "Red Wine"
				}, {
					ArticleId: "1123",
					ArticleDescription: "Apples"
				}, {
					ArticleId: "2221",
					ArticleDescription: "Browne"
				}],
				RegionRietz: [{
					RegionCode: "AT_RIE_WINE_2M",
					RegionDisc: "Rietz wine shelf 2 meter"
				}, {
					RegionCode: "AT_RIE_WINE_3M",
					RegionDisc: "Rietz wine shelf 3 meter"
				}, {
					RegionCode: "AT_RIE_WINE_4M",
					RegionDisc: "Rietz wine shelf 4 meter"
				}, {
					RegionCode: "AT_RIE_CASH_2M",
					RegionDisc: "Rietz cashier shelf 2 meter"
				}],
				RegionHausmannstätten: [{
					RegionCode: "AT_HAU_WINE_2M",
					RegionDisc: "Hausmannstätten wine shelf 2 meter"
				}, {
					RegionCode: "AT_HAU_WINE_3M",
					RegionDisc: "Hausmannstätten wine shelf 3 meter"
				}, {
					RegionCode: "AT_HAU_WINE_4M",
					RegionDisc: "Hausmannstätten wine shelf 4 meter"
				}, {
					RegionCode: "AT_HAU_CASH_2M",
					RegionDisc: "Hausmannstätten cashier  shelf 2 meter"
				}],
				RegionSattledt: [{
					RegionCode: "AT_SAT_WINE_2M",
					RegionDisc: "Sattledt wine shelf 2 meter"
				}, {
					RegionCode: "AT_SAT_WINE_3M",
					RegionDisc: "Sattledt  wine shelf 3 meter"
				}, {
					RegionCode: "AT_SAT_WINE_4M",
					RegionDisc: "Sattledt  wine shelf 4 meter"
				}, {
					RegionCode: "AT_SAT_CASH_2M",
					RegionDisc: "Sattledt cashier  shelf 2 meter"
				}]
			});

			this.setCountryToAsPerLoginCountry();

			this.getView().setModel(oModel);
		},

		setCountryToAsPerLoginCountry: function() {
			var oCountryComboBox = this.getView().byId("idCBCountry");
			//Need to get the Login to find the counry of log in of the user
			oCountryComboBox.setSelectedKey("DE");
			oCountryComboBox.setEnabled(false);
		},

		onPressContinue: function(oEvent) {
			var oCountryComboBox = this.getView().byId("idCBCountry");
			var oArticleIdComboBox = this.getView().byId("idCBArticleId");
			var oFromDate = this.getView().byId("IdFromDate");
			var oToDate = this.getView().byId("IdToDate");

			var oTableReitz = this.getView().byId("IdTableRegionRietz");
			var oTableHausman = this.getView().byId("IdHausman");
			var oTableSattledt = this.getView().byId("IdTableRegionSattledt");

			var aTableReitzSelected = oTableReitz.getSelectedContexts().map(function(oSelectedContext) {
				return oSelectedContext.getObject();
			});

			var aTableHausmanSelected = oTableHausman.getSelectedContexts().map(function(oSelectedContext) {
				return oSelectedContext.getObject();
			});

			var aTableSattledtSelected = oTableSattledt.getSelectedContexts().map(function(oSelectedContext) {
				return oSelectedContext.getObject();
			});

			var aAllRegionData = aTableReitzSelected.concat(aTableHausmanSelected, aTableSattledtSelected);

			var oDataShared = {
				Country: oCountryComboBox.getSelectedKey(),
				ArticleId: oArticleIdComboBox.getSelectedKey(),
				ArticleDesc: oArticleIdComboBox.getSelectedItem().getAdditionalText(),
				FromDate: oFromDate.getDateValue(),
				executionDate: this.getCurrentDate(),
				ToDate: oToDate.getDateValue(),
				summary: aAllRegionData
			};
			var jSelectedModel = new sap.ui.model.json.JSONModel(oDataShared);

			sap.ui.getCore().setModel(jSelectedModel, "sharedData");

			this.getOwnerComponent().getRouter().navTo("confirmArticlePage");
		},

		getCurrentDate: function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}

			return( mm + '/' + dd + '/' + yyyy);
		},

		onChangeDateValidation: function(oEvent) {
			var oFromDate = this.getView().byId("IdFromDate");
			var oToDate = this.getView().byId("IdToDate");
			if (!(oFromDate.getDateValue() === null || oToDate.getDateValue() === null)) {
				if (oFromDate.getDateValue().valueOf() > oToDate.getDateValue().valueOf()) {
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setDateValue(null);
					oEvent.getSource().setValueStateText("To Date cannot be before From Date");
				} else {
					oEvent.getSource().setValueState("None");
					oEvent.getSource().setValueStateText("");
				}
			}
		}
	});

});