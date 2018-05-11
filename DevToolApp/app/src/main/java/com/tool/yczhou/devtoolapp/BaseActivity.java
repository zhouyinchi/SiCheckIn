package com.tool.yczhou.devtoolapp;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

/**
 * Created by nuptial on 2018/4/17.
 */

public class BaseActivity extends AppCompatActivity implements View.OnClickListener,IBaseView {
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        initVariables();
        initViews();
        loadData();
    }
    @Override
    public void initVariables() {
    }
    @Override
    public void initViews() {
    }

    @Override
    public void loadData() {
    }
    @Override
    public void onClick(View view) {
    }
}
