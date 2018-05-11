package com.tool.yczhou.httptest;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    EditText send_text,return_text;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        send_text = findViewById(R.id.send_txt);
        return_text= findViewById(R.id.return_txt);
        doJob();


    }
    private void doJob(){
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try{
                        OkHttpClient httpClient = new OkHttpClient();
                        FormBody formBody = new FormBody.Builder().add("loginid","zhouyc")
                                .add("password","130016")
                                .add("clienttype","WebClient")
                                .add("clientver","6.5")
                                .build();

                        final Request request = new Request.Builder()
                                .url("http://cnc.gisquest.com:89/verifyLogin.do")
                                .post(formBody)
                                .build();

                        Response response = httpClient.newCall(request).execute();
                        Bundle bu = new Bundle();
                        Message message =new Message();
                        message.what=0;
                        bu.putString("return_url",response.);
                        message.setData(bu);
                        handler.sendMessage(message);
                    }
                    catch (Exception exc){
                        Bundle bu = new Bundle();
                        bu.putString("post",exc.getMessage());
                    }
                }
            }).start();



    }
    private Handler handler =new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what){
                case 0:
                    return_text.setText(msg.getData().getString("return_url"));
                    break;
                case 1:
                    send_text.setText(msg.getData().getString("post"));
            }

        }
    };

}
