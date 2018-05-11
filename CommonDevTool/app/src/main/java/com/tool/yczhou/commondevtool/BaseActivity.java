package com.tool.yczhou.commondevtool;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.tool.yczhou.commondevtool.Interfaces.IActLoad;

/**
 * Created by nuptial on 2018/4/18.
 */

public class BaseActivity extends AppCompatActivity implements IActLoad , View.OnClickListener{
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        initData();
        initVarialbe();
        initView();
    }
    @Override
    public void initData() {
    }
    @Override
    public void initVarialbe() {
    }
    @Override
    public void initView() {
    }

    @Override
    public void onClick(View view) {

    }
}
