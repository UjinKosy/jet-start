import {JetView} from "webix-jet";

import {contacts} from "../models/contacts";
import ContactInfoView from "./contactInfo";

export default class ContactsView extends JetView {
	config() {
		const usersList = {
			cols: [
				{
					view: "list",
					id: "contactsList",
					select: true,
					width: 300,
					template: "<span class='webix_icon wxi-user'></span> #value#",
					on: {
						onAfterSelect: () => {
							const selectedId = this.list.getSelectedId();
							this.setUrlParam(selectedId);
						}
					}
				}
			]
		};

		return {cols: [usersList, ContactInfoView]};
	}

	init() {
		this.list = this.$$("contactsList");
		this.list.sync(contacts);
	}

	urlChange() {
		contacts.waitData.then(() => {
			const id = this.getParam("id") || contacts.getFirstId();

			if (contacts.exists(id)) {
				this.list.select(id);
			}

			else {
				this.list.select(contacts.getFirstId());
			}
		});
	}

	setUrlParam(selectedId) {
		this.getSubView().setParam("id", selectedId, true);
	}
}
