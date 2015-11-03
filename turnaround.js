(function(){
  
    function removeAction(elementContain,$ele){
    var parentDiv=elementContain.parentElement;
        $ele.css({'background-image':'none'});
        $ele.removeAttr("style");
        elementContain.removeEventListener("webkitTransitionEnd");
        parentDiv.removeChild(elementContain);
        $ele.remove();
        $ele=null;
        parentDiv.parentElement.removeChild(parentDiv);
    }

    function handlerAction(eleArgs,transitionTransform){
        setTimeout(function(){
            eleArgs.$ele.css({
                "transform":transitionTransform,
                "transition":"all 1s ease-in"
            });
        },0);
    }

    function init($this,callback,fail,type,LPstatus,url){
        var container=document.createElement("div");//创建容器
        var elementContain=document.createElement("div");//内容元素
        //内容插入到容器中
        container.appendChild(elementContain);
        //容器插入到wrapper类的元素中
        $(".wrapper").append(container);
        //元素样式参数对象
        var eleArgs={},$ele=$(elementContain);
        eleArgs.$ele=$ele;
        console.log($ele)
        //绑定过度元素的过渡效果事件
        elementContain.addEventListener("webkitTransitionEnd",function(evt){
           // console.log("=================" + 6)
          
            if(evt.propertyName=="-webkit-transform" || evt.propertyName=="-ms-transform"||evt.propertyName=="transform"){
          
                removeAction(elementContain,$ele);
                 //console.log("=================" + 7);
                  //alert("removeAction2")
                if(typeof callback =="function"){
                    console.log("--------------------------callback")
                    callback();
                }
            }
        });
        var offset=$this.offset();
        var deviceHeight;
        deviceHeight=screen.height;
        if(LPstatus=="landscape"){
            deviceHeight=screen.width;
        }
        if(LPstatus=="portrait"){
            deviceHeight=screen.height;
        }
        $(container).css({
            "width":"100%",
            "height":deviceHeight,
            "background":"rgba(255, 255, 255, 0.05)",
            "position":"absolute",
            "z-index":"100"
        });
        //插件调用者对象$this
        eleArgs.corver=$this;
        //传入图片
        eleArgs.backImage="url("+url+")";
        eleArgs.corverOffset=offset;
        eleArgs.left=offset.left+"px";//左偏移量
        eleArgs.top=offset.top+"px";//上偏移量
        eleArgs.sizeX=$this.width()+"px";//宽度
        eleArgs.sizeY=$this.height()+"px";//高度
        eleArgs.scaleX=$("body").width()/$this.width();//X缩放比例
        eleArgs.scaleY=deviceHeight/$this.height();//Y缩放比例
        var transform1="translate("+eleArgs.left+","+eleArgs.top+")";
        var transform2="translate("+($("body").width()-parseInt(eleArgs.sizeX))/2+"px," +
            (deviceHeight-parseInt(eleArgs.sizeY))/2+"px) scale("+eleArgs.scaleX+","+eleArgs.scaleY+")";
        var transform,transitionTransform;
        if(type=="show"){
            transform=transform1;
            transitionTransform=transform2;
        } else{
            transform=transform2
            transitionTransform=transform1;
        }
        eleArgs.$ele.css({
            "position":"absolute",
            "zIndex":100,
            "opacity":1,
            "transform":transform,
            "background-image":eleArgs.backImage,
            "width":eleArgs.sizeX,
            "height":eleArgs.sizeY,
            "background-repeat":"no-repeat no-repeat",
            "background-size":"100% 100%"
        });
        handlerAction(eleArgs,transitionTransform);
    }
    /**
     * 显示调用
     * @param callback{callback} 成功显示后回调
     * @param fail {callback} 失败回调
     * @param LPstatus {string}横竖屏状态
     * @param url{string}  图片地址
     */
    $.fn.turnaroundShow=function(callback,fail,LPstatus,url){
        init(this,callback,fail,"show",LPstatus,url);
    }
    /**
     * 隐藏调用
     * @param callback    成功显示后回调
     * @param fail   {callback}   失败回调
     * @param LPstatus   {string}横竖屏状态
     * @param url{string}  图片地址
     */
    $.fn.turnaroundHide=function(callback,fail,LPstatus,url){
        init(this,callback,fail,"hide",LPstatus,url);
    }
}())

