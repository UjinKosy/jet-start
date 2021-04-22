import {JetView} from "webix-jet";

import {activities} from "../models/activities";
import {PopupView} from "./popup";

export default class ActivitiesView extends JetView {
	config() {
		return {
			rows: [
				{
					cols: [
						{
							view: "button",
							type: "icon",
							label: "Add activity",
							icon: "mdi mdi-plus-circle",
							css: "webix_primary",
							width: 170,
							click: () => {
								this.ui(PopupView).showPopupForm();
							}
						},
						{}
					]
				},
				{
					view: "datatable",
					localId: "activitiesTable",
					select: true,
					columns: [
						{
							id: "State"
						},
						{
							id: "TypeID",
							header: [
								{text: "Activity type"},
								{content: "selectFilter"}
							],
							sort: "int"
						},
						{
							id: "DueDate",
							fillspace: true,
							header: [
								{text: "Due Date"},
								{content: "datepickerFilter"}
							],
							format: webix.i18n.dateFormatStr,
							sort: "date"
						},
						{
							id: "Details",
							fillspace: true,
							header: [
								{text: "Details"},
								{content: "textFilter"}
							],
							sort: "text"
						},
						{
							id: "ContactID",
							header: [
								{text: "Contact"},
								{content: "selectFilter"}
							],
							sort: "int"
						},
						{template: "<span class='webix_icon wxi-pencil'></span>"},
						{template: "<span class='webix_icon wxi-trash'></span>"}
					],
					onClick: {
						"wxi-trash": (event, id) => {
							webix.confirm({
								text: "Do you want to remove this activity item?"
							}).then(() => {
								activities.remove(id);
							});
							return false;
						}
					}
				}
			]
		};
	}

	init() {
		this.activities = this.$$("activitiesTable");
		this.activities.sync(activities);
	}
}
