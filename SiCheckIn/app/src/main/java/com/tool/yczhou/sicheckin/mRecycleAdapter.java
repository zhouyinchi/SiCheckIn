package com.tool.yczhou.sicheckin;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

/**
 * Created by nuptial on 2018/5/10.
 */

public class mRecycleAdapter {

    public class mViewHoder extends RecyclerView.ViewHolder {
        TextView checkInType,checkInTime,checkInRemain;
        TextView latitude,longtitude,locationName;
        public mViewHoder(final View itemView){
            super(itemView);
        }
    }
}
