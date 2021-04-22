import {JetView} from "webix-jet";

import {activities} from "../models/activities";
import {activitiesTypes} from "../models/activitiesTypes";
import {contacts} from "../models/contacts";


export default class PopupView extends JetView {
	config() {
		const window = {
			view: "window",
			localId: "popup",
			width: 200,
			height: 200,
			position: "center",
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
						view: "combo",
						name: "Type",
						label: "TypeID",
						options: activitiesTypes
					},
					{
						view: "combo",
						name: "ContactID",
						label: "Contact",
						options: contacts
					},
					{
						cols: [
							{
								view: "datepicker",
								type: "date",
								name: "DueDate",
								label: "Date"
							},
							{
								view: "datepicker",
								name: "Time",
								label: "Date"
							}
						]
					}
				]
			}
		};

		return {
			rows: [window, {}]
		};
	}

	init() {
		this.popup = this.$$("popup");
		this.popup.show();
	}
}
