
function killApp(packageName) {
    log(packageName)
    res = shell('am force-stop ' + packageName, true);
    log(res)
};

function resetwifi(){
    if(text("重新加载").exists() || text("网络连接失败").exists() || text("点击重试").exists() ){
        if(text("重新加载").exists()){
            text("重新加载").findOne().click();
        }
        if(text("点击重试").exists()){
            text("点击重试").findOne().click();
        }
        log("网络连接失败"+("重新加载"))
        var result = shell("svc wifi disable", true);
        sleep(500)
        log(result);
        var result = shell("svc wifi enable", true);
        log(result);
        sleep(500)
        var result = shell("svc data disable", true);
        log(result);
        sleep(500)
    }
}
function yunxu(){
    sleep(3000)
    if (text("允许").exists()) {
        log("点击允许")
        text("允许").click();
    };
    if (text("跳过广告").exists()) {
        log("跳过广告")
        text("跳过广告").findOne().parent().click();
    };    
    if (text("跳过").exists()) {
        log("跳过")
        text("跳过").findOne().parent().click();
    };
    if (text("暂时不要").exists()) {
        log("暂时不要")
        text("暂时不要").findOne().parent().click();
    };
    if (text("好友推荐").exists()) {
        back()
    };
}
/**如果弹出青少年窗口，点击 */
function youngWin() {
    if (text("我知道了").exists()) {
        log("点击我知道了")
        text("我知道了").click();
    };
}
function lijilingqu(){
    if (text("立即领取").exists()) {
        log("立即领取")
        back()
    };
    if (text("刷新").exists()) {
        log("立即领取")
        text("刷新").findOne().click()
    };
}
function microphone(){
    if (text("以后再说").exists()) {
        log("点击以后再说")
        text("以后再说").click();
    };
}
function taobaojujue(){
    if (text("拒绝").exists()) {
        log("淘宝拒绝")
        back()
    };
}function noupgrade(){
    if (text("暂不升级").exists()) {
        log("暂不升级")
        text("暂不升级").click();
    };
}
/**下滑一个视频 */
function down_swipe(){
    log("down swipe")
    youngWin()
    microphone()
    lijilingqu()
    taobaojujue()
    WidthOne = random(300, 500);
    HeightOne = random(1800, 2000);
    WidthTwo = random(500, 800);
    HeightTwo = random(300, 400);
    timeGo = random(250, 600);
    swipe(WidthOne, HeightOne, WidthTwo, HeightTwo, timeGo);
    sleep(3000);
}
/**下滑10个视频 */
function down_swipe30(){
    killApp(getPackageName("手机淘宝"))
    total = 30;
    for(i=0;i<total+1;i++){
        console.log("当前第"+i.toString()+"个视频，剩余"+(total-i).toString())
        down_swipe()
    }
    log("30down swipe done")
}

function douyin(){
    /** 打开APP，打开控制台*/
    appName = "抖音"
    packageName = getPackageName(appName)
    killApp(packageName)
    launchApp(appName);
    yunxu();
    console.show()
    sleep(5000);
    down_swipe30()

    desc("直播").findOne().click()
    // 停止APP
    sleep(5000);
    down_swipe30()
    killApp(packageName) 
}
function kuaishou(){
    /** 打开APP，打开控制台*/
    appName = "快手"
    packageName = getPackageName(appName)
    killApp(packageName)
    launchApp(appName);
    yunxu();
    console.show()
    sleep(5000);
    down_swipe30()
    desc("菜单").findOne().click()
    sleep(1000);
    text("直播广场").findOne().parent().click()
    // 停止APP
    sleep(5000);
    down_swipe30()
    console.hide()
    killApp(packageName) 

}
function kuaishoujisu(){
    /** 打开APP，打开控制台*/
    appName = "快手极速版"
    packageName = getPackageName(appName)
    killApp(packageName)
    launchApp(appName);
    yunxu();
    console.show()
    sleep(5000);
    down_swipe30()
    id("left_btn").findOne().click()
    sleep(1000);
    text("直播广场").findOne().parent().click()
    // 停止APP
    sleep(5000);
    down_swipe30()
    console.hide()
    killApp(packageName) 


}
function douyinjisu(){
    /** 打开APP，打开控制台*/
    appName = "抖音极速版"
    packageName = getPackageName(appName)
    killApp(packageName)
    launchApp(appName);
    yunxu();
    console.show()
    sleep(5000);
    down_swipe30()

    desc("live").findOne().click()
    // 停止APP
    sleep(5000);
    down_swipe30()
    killApp(packageName)
}
function douyinhuoshan(){
    /** 打开APP，打开控制台*/
    appName = "抖音火山版"
    packageName = getPackageName(appName)
    killApp(packageName)
    launchApp(appName);
    yunxu();
    console.show()
    sleep(5000);
    down_swipe30()
    bounds(415, 105, 515, 172).clickable().click()
    //text("直播").findOne().click()
    // 停止APP
    sleep(5000);
    down_swipe30()
    killApp(packageName)
}
function tencentvideo(){
    /** 打开APP，打开控制台*/
    console.show()
    appName = "腾讯视频"
    packageName = getPackageName(appName)
    //killApp(packageName)
    launchApp(appName);
    while(className("android.support.v7.widget.RecyclerView").clickable(false).findOnce() == null){
        yunxu();
        sleep(5000);
        microphone();
        sleep(2000);
        noupgrade();
        sleep(2000);
        youngWin();
        sleep(2000);
        microphone();
    }
    

    var temlist = new Array();
    temlist.length = 0;
    repeatcount = 0;
    while(true){
        if(repeatcount>15) break;
        titlelist = className("android.support.v7.widget.RecyclerView").clickable(false).findOne();
        titlelist.children().forEach(title => {
            log("relativelayout length:"+title.find(className("TextView")).length)
            if(title.find(className("TextView")).length>0){
                if(title.findOne(className("TextView")) == null){
                    return;
                }
                var titext = title.findOne(className("TextView")).text();
                log(titext);
                //temlist 里如果没有title 说明还没点击过
                if(temlist.indexOf(title.findOne(className("TextView")).text())<0){
                    //title是relativelayout
                    //点击进入相应标签页
                    title.click();
                    sleep(2000)
                    log(temlist);
                    //log(title.children())
                    temlist.push(titext)
                    if(titext == "发现"){
                        //下滑
                        i = 11
                        while(i--){
                            WidthOne = random(300, 500);
                            HeightOne = random(1800, 2000);
                            WidthTwo = random(500, 800);
                            HeightTwo = random(300, 400);
                            timeGo = random(250, 600);
                            log("下滑"+i+"个视频")
                            swipe(WidthOne, HeightOne, WidthTwo, HeightTwo, timeGo);
                            sleep(3000);
                        }
                    }else{
                         //找到当前页所有图片下带文字的视频矩形坐标
                        var waitforclick = new Array();
                        waitforclick.length = 0;
                        //下滑一点加载更多的视频
                        swipe(random(300, 500), random(1800, 2000), random(500, 800), random(300, 400), random(250, 600));
                        rel = className("RelativeLayout").clickable().find();
                        //rel所有的relativelayout
                        log(rel.length);
                        rel.forEach(child => {
                            //child--每个relativelayout
                            //children--每个relativelayout下所有控件的集合(texeview和imageview)
                            children = child.children();
                            //c--每一个relativelayout下的控件
                            if(children != null){
                                children.forEach(c => {
                                    if(c != null){
                                        i = c.findOne(className("ImageView"))
                                        if(i != null && (children.size()>1)){
                                            //log(children.size());
                                            waitforclick.push(child.bounds());
                                        }
                                    }else{
                                        log("c is null")
                                    }
                                    
                                });
                            }
                        });
                        sleep(5000);
                        //取后五个视频坐标
                        waitforclick = waitforclick.slice(-5)
                        log("waitforclick:"+waitforclick.length)
                        log("************************")
                        waitforclick.forEach(rect => {
                            log(rect);
                            bounds(rect.left, rect.top, rect.right, rect.bottom).clickable().click();
                            sleep(5000);
                            back();
                            sleep(2000);
                            back();
                        });
                    }
                    
                }else{ 
                    log(title.findOne(className("TextView")).text()+"已经存在");
                    repeatcount+=1
                    sleep(100)

                }
            //title.child(0) 是导航栏的TextView
            //log(text(title.child(0))); 
            }else{
                log("title length:"+title.find(className("TextView")).length);
            }
            
        });
        //log(titlelist.children())
    }
    killApp(packageName)
}
function main(){
    

    while(1){
        tic = Date()
        device.wakeUpIfNeeded()
        resetwifi()
        tencentvideo()
        douyin()
        kuaishou()
        kuaishoujisu()
        douyinjisu()
        douyinhuoshan()
        toc = Date()
        log(tic,toc)
    }
}
main()
