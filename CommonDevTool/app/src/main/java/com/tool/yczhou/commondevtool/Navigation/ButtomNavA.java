package com.tool.yczhou.commondevtool.Navigation;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;

import com.tool.yczhou.commondevtool.BaseActivity;
import com.tool.yczhou.commondevtool.BaseFragment;
import com.tool.yczhou.commondevtool.R;

/**
 * Created by nuptial on 2018/4/18.
 */

public class ButtomNavA extends BaseActivity{
    private TabLayout mTabLayout;
    private Fragment[]  mFragmets;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
    }

    @Override
    public void initView() {
        super.initView();
        mTabLayout = findViewById(R.id.bottom_tab_layout);
        mTabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                for(int i = 0;i<mTabLayout.getTabCount();i++){
                    if(i == tab.getPosition()){
                        mTabLayout.getTabAt(i).setIcon(R.drawable.ic_tab_home);
                    }
                }
            }
            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }
            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });
        BaseFragment f1 = new BaseFragment();
        f1.setText(1);
        BaseFragment f2 = new BaseFragment();
        f1.setText(2);
        BaseFragment f3 = new BaseFragment();
        f1.setText(3);
        BaseFragment f4 = new BaseFragment();
        f1.setText(4);

        mFragmets = new Fragment[]{f1,f2,f3,f4};
    }
    @Override
    public void initData() {
        super.initData();
    }
    @Override
    public void initVarialbe() {
        super.initVarialbe();
    }

    private void onTabItemSelected(int position){
        Fragment fragment =null;
        switch (position){
            case 0:fragment = mFragmets[0];break;
            case 1:fragment = mFragmets[1];break;
            case 2:fragment = mFragmets[2];break;
            case 3:fragment = mFragmets[3];break;
        }
        if(fragment!=null)
            getSupportFragmentManager().beginTransaction().replace(R.id.home_container, fragment).commit();

    }
}
