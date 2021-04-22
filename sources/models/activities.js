export const activities = new webix.DataCollection({
    url: "http://localhost:8096/api/v1/activities/",
    save: "rest->http://localhost:8096/api/v1/activities/",
    scheme:{
        $init:function(obj){
            obj.DueDate = new Date(obj.DueDate);
        },
        $save:function(obj){ 
            obj.DueDate = webix.i18n.dateFormatStr(obj.DueDate);
        }
    }
})