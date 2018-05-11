package com.tool.yczhou.sicheckin;

import android.app.AlarmManager;
import android.app.Service;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.SystemClock;
import android.support.annotation.Nullable;
import android.util.Log;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by nuptial on 2018/5/10.
 */

public class CheckInService extends Service {
    private static final String TAG = "MyService";

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.e(TAG,"onBind");
        return null;
    }

    @Override
    public boolean bindService(Intent service, ServiceConnection conn, int flags) {
        Log.e(TAG,"bindService");
        return super.bindService(service, conn, flags);
    }

    @Override
    public void unbindService(ServiceConnection conn) {
        Log.e(TAG,"unbindService");
        super.unbindService(conn);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.e(TAG,"onCreate");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.e(TAG,"onStartCommand");
        doJob();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.e(TAG,"onDestroy");
    }
    private void doJob(){
        Date[] dates = getTask();
        Date d1 =dates[0];
        Date d2 =dates[1];
        Calendar now =Calendar.getInstance();
        Date d0 =now.getTime();
        long elapse1 = d1.getTime()-d0.getTime();
        long elapse2 = d1.getTime()-d0.getTime();
        long trigletime1 = SystemClock.elapsedRealtime()+elapse1;
        long trigletime2 = SystemClock.elapsedRealtime()+elapse1;




    }
    private Date[] getTask(){
        Calendar now =Calendar.getInstance();
        Date d1 =now.getTime();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd ");
        DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String taskDateStr1 = df.format(d1)+tasks.time1;
        String taskDateStr2 = df.format(d1)+tasks.time2;
        Log.e(TAG,taskDateStr1);
        Log.e(TAG,taskDateStr2);
        Date[] dates =new Date[2];
        try{
            Date taskDate1 = df2.parse(taskDateStr1);
            Date taskDate2 = df2.parse(taskDateStr2);
            Log.e(TAG,""+taskDate1.getTime());
            Log.e(TAG,df2.format(taskDate2));
            dates[0] = taskDate1;
            dates[1] = taskDate2;
        }
        catch (Exception e){

        }
        return dates;

    }
    private void getNewTask(){

    }

}
