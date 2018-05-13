package com.tool.yczhou.sicheckin;

import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.nio.BufferUnderflowException;

/**
 * Created by nuptial on 2018/5/10.
 */

public class mRecycleAdapter extends RecyclerView.Adapter<mRecycleAdapter.mViewHolder> {
    public Bundle[] bundles=null;
    public mRecycleAdapter(Bundle[] bundles){
        this.bundles = bundles;
    }

    @Override
    public mViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_task,parent,false);
        mViewHolder holder=new mViewHolder(view);

        return holder;
    }

    @Override
    public void onBindViewHolder(mViewHolder holder, int position) {
        Bundle bundle = bundles[position];
        holder.checkInType.setText(bundle.getString("CheckInType"));
        holder.checkInTime.setText(bundle.getString("CheckInTime"));
        holder.checkInRemain.setText(bundle.getString("CheckInRemain"));
        holder.latitude.setText(bundle.getString("Latitude"));
        holder.longtitude.setText(bundle.getString("Longtitude"));
        holder.locationName.setText(bundle.getString("LocationName"));
    }

    @Override
    public int getItemCount() {
        return 0;
    }


    public class mViewHolder extends RecyclerView.ViewHolder {
        TextView checkInType,checkInTime,checkInRemain;
        TextView latitude,longtitude,locationName;
        public mViewHolder(final View itemView){
            super(itemView);
        }
    }
}
