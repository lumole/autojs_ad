auto();

threads.start(function(){
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function(keyCode){
        //音量键关闭脚本
        if(keyCode == keys.volume_down){
            exit();
        }
    });
});

events.on("exit", function(){
    toast("脚本已结束");
    log("脚本已结束");
});

var shape = [8, 12];
var dex1 = [110, 981];
var dex2 = [693, 2067];
var Xs = [];
var Ys = [];
var x_step = (dex2[0]-dex1[0]) / (shape[0] - 1);
var y_step = (dex2[1]-dex1[1]) / (shape[1]-1);
var flag = 1;

for(var i = 0; i < shape[0]; i++){
    Xs.push(dex1[0] + i*x_step);
}
for(var i = 0; i < shape[1]; i++){
    Ys.push(dex1[1] + i*y_step);
}

var x = Xs[i_x];
var y = Ys[i_y];
var x_sub = Xs[shape[0]-i_x-1];
var y_sub = Ys[shape[1]-i_y-1];
var duration = 15;

while(1){
    if(textMatches(".*真棒.*").exists()){
        i_x = 0;
        i_y = 0;
        //slip();
        sleep(1000);
        click((328+753)/2,(1197+1302)/2);
        log("已检测到");
        sleep(6000);
        continue;
    }
    for(var i_x = 0; i_x < Xs.length; i_x+=2){
        
        // var enter_button = bounds(252.0, 1857.0, 828.0, 2100.0).findOnce();
        // if(enter_button){
        //     enter_button.clickCenter();
        //     sleep(3500);
        // }
        for(var i_y = 0; i_y < Ys.length; i_y+=2)
        {
            x = Xs[i_x];
            y = Ys[i_y];
            x_sub = Xs[shape[0]-i_x-1];
            y_sub = Ys[shape[1]-i_y-1];
            duration = 10;
            swipe(x, y, x, y + y_step, duration);
            swipe(x, y, x, y - y_step, duration);
            swipe(x, y, x + x_step, y, duration);
            swipe(x, y, x - x_step, y, duration);
            swipe(x_sub, y_sub, x_sub , y_sub + y_step, duration);
            swipe(x_sub, y_sub, x_sub , y_sub - y_step, duration);
            swipe(x_sub, y_sub, x_sub + x_step, y_sub, duration);
            swipe(x_sub, y_sub, x_sub - x_step, y_sub, duration);
            // //sleep(30);
            // swipe(x_sub - x_step, y_sub + y_step,x_sub, y_sub,  duration);
            // //sleep(100);
            // swipe(x_sub - x_step, y_sub - y_step,x_sub, y_sub,  duration);
        }
        
    }
}

// while(1)
// {
//     sleep(2000);
//     var recive_video = bounds(648.0, 1356.0, 915.0, 1461.0).findOnce();
//     if(recive_video){
//         recive_video.clickCenter();
//         sleep(500);
//     }

// }

function slip(){
    flag = 0;
    while(1)
    {
        var widget = bounds(648.0, 1356.0, 915.0, 1461.0).findOnce();
        if (widget){
            widget.clickCenter();
        }
        
        //back();
        while(1){
            sleep(2000);
            var if_existed = textMatches(".*恭喜.*|.*成功.*").findOnce();
            var close_but = className("android.widget.ImageView").bounds(912.0, 42.0, 1038.0, 168.0).findOnce();
            var close_but2 = textMatches(".*放弃.*").findOnce();
            if (if_existed){
                back();
                var widget = bounds(959.0, 73.0, 1007.0, 121.0).findOnce();
                if(widget){
                    widget.clickCenter();
                }
                var widget = bounds(981.0, 184.0, 1008.0, 211.0).findOnce();
                if(widget){
                    widget.clickCenter();
                }
                var widget = bounds(956.0, 60.0, 1022.0, 126.0).findOnce();
                if(widget){
                    widget.clickCenter();
                }
                
                sleep(500);
            }
            if(close_but){
                close_but.clickCenter();
                sleep(500);
            }
            sleep(500);
            if(textMatches(".*幸运积分.*").exists()){
                flag = 1;
                return 0;
            }
            if(close_but2){
                sleep(4000);
                close_but2.clickCenter();
                sleep(500);
            }

            var enter_button = bounds(252.0, 1857.0, 828.0, 2100.0).findOnce();
            if(enter_button){
                enter_button.clickCenter();
                sleep(3500);
                flag = 1;
                return;
            }
        }
        sleep(500);
        continue;
            
    }
}
