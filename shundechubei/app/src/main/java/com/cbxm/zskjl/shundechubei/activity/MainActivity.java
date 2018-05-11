package com.cbxm.zskjl.shundechubei.activity;

import android.animation.ValueAnimator;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewParent;
import android.view.animation.Animation;
import android.widget.Button;
import android.widget.TextView;

import com.cbxm.zskjl.shundechubei.R;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView mTextMessage;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_project:
                    mTextMessage.setText(R.string.title_project);
                    return true;
                case R.id.navigation_finance:
                    mTextMessage.setText(R.string.title_finance);
                    return true;
                case R.id.navigation_engineering:
                    mTextMessage.setText(R.string.title_engineering);
                    return true;
                case R.id.navigation_personal:
                    mTextMessage.setText(R.string.title_personal);
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.act_main);

        mTextMessage = (TextView) findViewById(R.id.message);
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

    @Override
    public void onClick(View view) {
    }
}
