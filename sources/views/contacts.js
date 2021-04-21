import {JetView} from "webix-jet";
import {contacts} from "../models/contacts.js"

export default class ContactsView extends JetView {
	config() {
        const contactsList = {
            view: "list",
            localId: "contactsList",
            type:{
                height: "auto"
            },
            width: 300,
            select: true,
            template: function(obj){
                return `<div class="contacts">
                            <span class="contacts_photo">
                                ${obj.Photo && `<img src="${obj.Photo}" width="50">` || "<span class=\"far fa-user\"></span>"}
                            </span>
                            <div class="contacts_info">
                                <span class="contacts_name">
                                    ${obj.FirstName} ${obj.LastName}
                                </span>
                                <span class="contacts_company">
                                    ${obj.Company}
                                </span>
                            </div>
                        </div>`
            },
            on:{
                "onAfterSelect": (id) =>{
                    this.setParam("user", id, true);
                }		
            }
        }

        return contactsList
    }
    init(){
        console.log(contacts)
        this.contactsList = this.$$("contactsList");
        contacts.waitData.then(()=>{
            this.contactsList.sync(contacts);
        })
    }
    urlChange(view, url){
        contacts.waitData.then(()=>{
			const id = url[0].params.user  ;
			if(!!id && contacts.exists(id)){
				this.contactsList.select(id);
			}
			else{
                console.log(contacts.getFirstId())
				this.contactsList.select(contacts.getFirstId());
			}
		});
    }
}
