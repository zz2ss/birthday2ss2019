bigNum = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"]

function num2bigNum(num) {
    if (num > 10 && num < 100) {
        return bigNum[num.toString().split("")[0]] + "拾" + (num.toString().split("")[1]==0?"":bigNum[num.toString().split("")[1]])
    } else if (num <= 10) {
        return bigNum[num]
    } else if (num == 100) {
        return "壹佰"
    } else if (num > 100){
        var res=""
        num.toString().split("").forEach(e => {
            res+=bigNum[e]
        });
        return res
    }
}

class Things{
    constructor(config){
        this.things = config.things
        this.default = config.default
        this.index = 0
    }

    getThing(index){
        let things = this.things
        if(things!=null && things.length>0 && index>=0 && index<things.length){
            let thing= things[index].thing?things[index].thing:things[index]
            let photo_url = things[index].show_photo?things[index].show_photo:this.default.show_photo
            return {
                num: num2bigNum(index+1),
                thing: thing,
                show_photo: 'url(\''+ photo_url + '\') center/cover no-repeat'
            }
        }else{
            return {
                num: 0,
                thing: "配置文件出现问题",
                show_photo: this.default.show_photo
            }
        }
    }

    nextThing(){
        this.index = (this.index+this.things.length+1)%this.things.length
        return this.getThing(this.index)
    }

    preThing(){
        this.index = (this.index+this.things.length-1)%this.things.length
        return this.getThing(this.index)
    }

    randomThing(){
        this.index =parseInt(Math.random*this.things.length)
        return this.getThing(this.index)
    }
}

function init(){
    axios.get("config.json").then(
        function(res){
            var config = res.data
            document.title=config.html_title?config.html_title:"100 Things"
            let things = new Things(config)
            var app = new Vue({
                el: "#app", 
                data: {
                    title: config.title,
                    author: config.author,
                    blessing: config.blessing,
                    thing: things.getThing(0),
                },
                methods: {
                    nextThing: function(){
                        this.thing = things.nextThing()
                    },
                    preThing: function(){
                        this.thing = things.preThing()
                    },
                    randomThing: function(){
                        this.thing = things.preThing()
                    },
                },
            })
        }
    )
}

init()