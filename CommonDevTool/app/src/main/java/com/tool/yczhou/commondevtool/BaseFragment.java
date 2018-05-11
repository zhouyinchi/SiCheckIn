package com.tool.yczhou.commondevtool;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.w3c.dom.Text;

/**
 * Created by nuptial on 2018/4/18.
 */

public class BaseFragment extends android.support.v4.app.Fragment{
    String mText;
    public BaseFragment setText(int i){
        mText = "this is page "+ i +"st page";
        return this;
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        if(mText != null&& container!=null){
            TextView textView =new TextView(this.getActivity());
            textView.setText(mText);
            container.addView(textView);
        }
        return super.onCreateView(inflater, container, savedInstanceState);
    }
}
