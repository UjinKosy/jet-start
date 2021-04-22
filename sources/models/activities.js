export const activities = new webix.DataCollection({
    url: "http://localhost:8096/api/v1/activities/",
    save: "rest->http://localhost:8096/api/v1/activities/",
    scheme:{
        $init:function(obj){
            obj.DueDate = new Date(obj.DueDate);
        },
        $save:function(obj){ 
            const parse = webix.Date.dateToStr("%Y-%m-%d %H:%i");
            console.log(parse(obj.DueDate))
            obj.DueDate = parse(obj.DueDate)
            
        }
    }
})