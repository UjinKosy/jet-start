import {JetView} from "webix-jet";

import {activities} from "../models/activities";
import {activitiesTypes} from "../models/activitiesTypes";
import {contacts} from "../models/contacts";

export default class PopupView extends JetView {
	config() {
		const window = {
			view: "window",
			localId: "popup",
			position: "center",
			width: 600,
			body: {
				view: "form",
				localId: "popupForm",
				elements: [
					{
						view: "textarea",
						name: "Details",
						label: "Details"
					},
					{
						view: "richselect",
						name: "TypeID",
						label: "Type",
						required: true,
						options: activitiesTypes,
						invalidMessage: "Type should be selected",
						on: {
							onItemClick: () => {
								this.form.clearValidation();
							}
						}
					},
					{
						view: "richselect",
						name: "ContactID",
						label: "Contact",
						required: true,
						options: contacts,
						invalidMessage: "Contact should be selected",
						on: {
							onItemClick: () => {
								this.form.clearValidation();
							}
						}
					},
					{
						cols: [
							{
								view: "datepicker",
								type: "date",
								name: "DueDate",
								label: "Date",
								timepicker: true,
								format: webix.i18n.dateFormatStr
							},
							{},
							{
								view: "datepicker",
								type: "time",
								name: "Time",
								label: "Time",
								format: webix.i18n.timeFormatStr
							}
						]
					},
					{
						cols: [
							{
								view: "checkbox",
								labelRight: "Completed",
								localId: "completionCheck"
							},
							{}
						]
					},
					{
						cols: [
							{},
							{
								view: "button",
								localId: "saveButton",
								value: "Save",
								click: () => {
									this.saveActivity();
								}
							},
							{
								view: "button",
								value: "Cancel",
								click: () => {
									webix.confirm({
										text: "Are you sure that want to close editor?"
									}).then(() => {
										this.popup.hide();
										this.form.clear();
										this.form.clearValidation();
									});
								}
							}
						]
					}
				]
			}
		};

		return window;
	}

	init() {
		this.form = this.$$("popupForm");
		this.popup = this.getRoot();
	}

	showPopup(id) {
		this.popup.show();
		if (id && activities.exists(id)) {
			this.form.setValues(activities.getItem(id));
		}
	}

	saveActivity() {
		const validationResult = this.form.validate();
		const checkboxValue = this.$$("completionCheck").getValue();
		if (validationResult && checkboxValue) {
			const newItem = this.form.getValues();
			if (newItem.id) {
				activities.updateItem(newItem.id, newItem);
			}

			else {
				activities.add(newItem);
			}
			this.popup.hide();
		}
	}
}
