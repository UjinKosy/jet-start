import {JetView} from "webix-jet";
import {contacts} from "../models/contacts.js";

export default class ContactsTemplateView extends JetView {
	config() {
        const contactTemplate = {
            cols:[
                {
                    view: "template",
                    localId: "contactsTemplate",
                    template: function(obj){
                        Object.keys(obj).forEach(key =>{
                            if(key != "Photo"){
                                obj[key] = obj[key] || "-"
                            }
                        });
                        return `<div class="contacts-template">
                                    <div class="contacts-template_first-row">
                                        <span class="contacts-template_name">${obj.FirstName} ${obj.LastName}</span>
                                    </div>
                                    <div class="contacts-template_second-row">
                                        <div class="contacts-template_photo">
                                        ${obj.Photo && `<img src="${obj.Photo}" width="150">` || "<span class=\"far fa-user\"></span>"}
                                        </div>
                                        <div class="contacts-template_info">
                                            <ul>
                                                <li><span class="fas fa-at"></span>${obj.Email}</li>
                                                <li><span class="fab fa-skype"></span>${obj.Skype}</li>
                                                <li><span class="fas fa-tags"></span>${obj.Job}</li>
                                                <li><span class="fas fa-briefcase"></span>${obj.Company}</li>
                                            </ul>
                                            <ul>
                                                <li><span class="far fa-calendar-alt"></span>${obj.Birthday}</li>
                                                <li><span class="fas fa-map-marker-alt"></span>${obj.Address}</li>
                                            </ul>
                                        </div>     
                                    </div>     
                                    <div class="contacts-template_third-row">
                                        <span class="contacts-template_status">${obj.StatusID}</span>
                                    </div>
                                </div> 
                                </div>` 
                    }
                },
                {
                    css: {
                        "background-color": "#fff",
                        "border-top": "1px solid #DADEE0",
                        "padding": "30px 0 0 0"
                    },
                    rows:[
                        {
                            margin: 10,
                            width: 300,
                            cols:[
                                {
                                    view:"button",
                                    label: "Delete",
                                    type:"icon", 
                                    icon:"fas fa-trash-alt",
                                    autowidth: true,
                                },
                                {
                                    view:"button",
                                    label: "Edit",
                                    type:"icon", 
                                    icon:"fas fa-edit",
                                    autowidth: true,
                                }
                            ]
                        },
                        {}
                    ]
                }
            ]
        }

        return contactTemplate;
    }
    init(){
        this.contactsTemplate = this.$$("contactsTemplate");
    }
    urlChange(view, url){
        contacts.waitData.then(()=>{
            const id = url[0].params.user;
            if(!!id && contacts.exists(id)){
                this.contactsTemplate.parse(contacts.getItem(id));
			}
        })
    }
}