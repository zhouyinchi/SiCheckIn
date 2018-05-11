package com.demo.zyc.animationapplication;

import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    Button btnTransparent,btnZoom,btnRotate,btnMove;
    ImageView imAnimateObj;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btnTransparent = findViewById(R.id.button);
        btnZoom = findViewById(R.id.button2);
        btnRotate = findViewById(R.id.button3);
        btnMove= findViewById(R.id.button4);
        imAnimateObj = findViewById(R.id.image_view);

        btnTransparent.setOnClickListener(this);
        btnZoom.setOnClickListener(this);
        btnRotate.setOnClickListener(this);
        btnMove.setOnClickListener(this);
    }


    @Override
    public void onClick(View view) {
        ObjectAnimator animator;
        switch (view.getId()){
            case R.id.button:
                animator = ObjectAnimator.ofFloat(imAnimateObj,"alpha",0f,1);
                animator.setDuration(1000);
                animator.start();
                break;
            case R.id.button2:
                PropertyValuesHolder objAnimatorScaleX = PropertyValuesHolder.ofFloat("scaleX",0f,1f);
                PropertyValuesHolder objAnimatorScaleY = PropertyValuesHolder.ofFloat("scaleY",0f,1f);
                ObjectAnimator.ofPropertyValuesHolder(imAnimateObj,objAnimatorScaleX,objAnimatorScaleY).setDuration(1000).start();
                break;
            case R.id.button3:
                animator = ObjectAnimator.ofFloat(imAnimateObj,"rotation",0f,360f);
                animator.setDuration(1000);
                animator.start();
                break;
            case R.id.button4:;;
        }
    }
}
