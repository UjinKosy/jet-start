import {JetView} from "webix-jet";

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
						view: "text",
						name: "Details",
						label: "Details"
					}
				]
			},
			template: "hello"
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
