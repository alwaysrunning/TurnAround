# TurnAround

     * @param callback{callback} 成功显示后回调
     
     * @param fail {callback} 失败回调
     
     * @param LPstatus {string}横竖屏状态
     
     * @param url{string}  图片地址
     
    $.fn.turnaroundHide=function(callback,fail,LPstatus,url){
    
        init(this,callback,fail,"hide",LPstatus,url);
        
    }
