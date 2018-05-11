package com.tool.yczhou.sicheckin;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{
    public static final String TAG = "MainActivity";

    private RecyclerView recyclerView;
    private Button startAEndBtn;
    private boolean isStarted;
    CheckInService mService;
    Intent intent  = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_main);

//        recyclerView = findViewById(R.id.main_recycle);

        startAEndBtn = findViewById(R.id.main_start_end_btn);
        startAEndBtn.setOnClickListener(this);
        isStarted = isServiceRunning(this);
        setStartBtnTxt();
        intent = new Intent(this,CheckInService.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        mWebView = findViewById(R.id.main_web);
//        mWebView.getSettings().setJavaScriptEnabled(true);
//        mWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
//        mWebView.getSettings().setSupportMultipleWindows(true);
//        mWebView.setWebViewClient(new WebViewClient());
//        mWebView.setWebChromeClient(new WebChromeClient());
//        mWebView.loadUrl("http://cnc.gisquest.com:89");
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.main_start_end_btn:
                if (!isStarted){
                    startAEndBtn.setText("暂停");
                    isStarted=!isStarted;
                    startService(intent);

//                    bindService(intent,serviceConnection, Context.BIND_AUTO_CREATE);
                }
                else{
                    startAEndBtn.setText("启动");
                    isStarted=!isStarted;
//                    unbindService(serviceConnection);
                    stopService(intent);
                }
                break;
        }
    }
    /*
	 * 判断服务是否启动,context上下文对象 ，className服务的name
	 */
    public static boolean isServiceRunning(Context mContext) {
        String className = "com.tool.yczhou.sicheckin.CheckInService";

        boolean isRunning = false;
        ActivityManager activityManager = (ActivityManager) mContext
                .getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningServiceInfo> serviceList = activityManager
                .getRunningServices(30);

        if (!(serviceList.size() > 0)) {
            return false;
        }

        for (int i = 0; i < serviceList.size(); i++) {
            Log.e("ServiceOthers",serviceList.get(i).service.getClassName());
            if (serviceList.get(i).service.getClassName().equals(className) == true) {
                isRunning = true;
                break;
            }
        }
        return isRunning;
    }
    ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
           Log.e(TAG,"ConnectSuccess");
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            Log.e(TAG,"DisconnectSuccess");
        }
    };
    private void setStartBtnTxt(){
        if(!isStarted){
            startAEndBtn.setText("启动");
        }
        else{
            startAEndBtn.setText("暂停");
        }
    }
}
