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

function choiceThing(things){
    if(things==null || things.length==0){
        return {}
    }else{
        var num = parseInt(Math.random()*things.length)
        return {
            num:num2bigNum(num+1),
            thing:things[num]
        }
    }
}

axios.get("_config.json").then(
    function(res){
        var data = res.data
        var num_thing = choiceThing(data.things)
        document.title=res.data.html_title?res.data.html_title:"100 Things"
        var app = new Vue({
            el: "#app",
            data:{
                title:data.title,
                num:num_thing.num,
                thing:num_thing.thing,
                author:data.author,
                blessing:data.blessing,
                show_photo:data.show_photo
            }
        })
    }
)