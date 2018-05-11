package com.tool.yczhou.checkinzs;

import android.os.PersistableBundle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.BitmapDescriptor;
import com.amap.api.maps2d.model.MyLocationStyle;

public class MainActivity extends BaseActivity{
//    MapView map;
//    AMap aMap;
//    MyLocationStyle myLocationStyle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        map = (MapView) findViewById(R.id.main_map);
//        map.onCreate(savedInstanceState);
//        if(aMap == null){
//            aMap = map.getMap();
//        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
//        map.onDestroy();
    }

    @Override
    protected void onPause() {
        super.onPause();
//        map.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
//        map.onResume();
    }

    @Override
    public void onSaveInstanceState(Bundle outState, PersistableBundle outPersistentState) {
        super.onSaveInstanceState(outState, outPersistentState);
//        map.onSaveInstanceState(outState);
    }
}
