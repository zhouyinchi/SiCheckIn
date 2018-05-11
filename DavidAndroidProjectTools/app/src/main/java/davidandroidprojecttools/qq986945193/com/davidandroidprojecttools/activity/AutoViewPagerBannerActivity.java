package davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.umeng.analytics.MobclickAgent;

import java.util.ArrayList;
import java.util.List;

import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.R;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.autobanner.CBPageAdapter;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.autobanner.CBViewHolderCreator;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.autobanner.ConvenientBanner;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.autobanner.OnItemClickListener;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.constant.Urls;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.utils.PicassoWithImageLoaderImageViewUtils;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.utils.URLUtils;

/**
 * @author ：程序员小冰
 * @新浪微博 ：http://weibo.com/mcxiaobing
 * @CSDN博客: http://blog.csdn.net/qq_21376985
 * @交流Qq ：986945193
 * @GitHub: https://github.com/QQ986945193
 */

/**
 * 使用项目中自己封装的无限滚动
 */
public class AutoViewPagerBannerActivity extends Activity implements OnItemClickListener {
    private ConvenientBanner<String> vp_auto_bannar;
    private List<String> listImages = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auto_viewpager_banner);
        vp_auto_bannar = (ConvenientBanner<String>) findViewById(R.id.vp_auto_bannar);
//        if (lists != null) {
//            for (int i = 0; i < lists.size(); i++) {
//                listImages.add(lists.get(i).getPoster_image());
//                initViewPager();
//            }
//        }
        initViewPager();
    }


    /**
     * 添加ImageView到ViewPager中
     */
    private void initViewPager() {
        listImages.add(Urls.VIEWPAGE_BANNERIMAGE_ONE);
        listImages.add(Urls.VIEWPAGE_BANNERIMAGE_TWO);
        listImages.add(Urls.VIEWPAGE_BANNERIMAGE_THREE);
        vp_auto_bannar.setPages(
                new CBViewHolderCreator<NetworkImageHolderView1>() {
                    @Override
                    public NetworkImageHolderView1 createHolder() {
                        return new NetworkImageHolderView1();
                    }
                }, listImages)
                // 设置两个点图片作为翻页指示器，不设置则没有指示器，可以根据自己需求自行配合自己的指示器,不需要圆点指示器可用不设
                .setPageIndicator(
                        new int[]{
                                R.mipmap.page_now,
                                R.mipmap.page});
        vp_auto_bannar.setOnItemClickListener(this);

    }


    /*bannar图片点击设置*/
    class NetworkImageHolderView1 implements CBPageAdapter.Holder<String> {
        public ImageView imageView;

        @Override
        public View createView(Context context) {
            // 你可以通过layout文件来创建，也可以像我一样用代码创建，不一定是Image，任何控件都可以进行翻页
            imageView = new ImageView(context);
            imageView.setScaleType(ImageView.ScaleType.FIT_XY);

            return imageView;
        }

        @Override
        public void UpdateUI(Context context, final int position, String data) {
            if (URLUtils.isNetworkImageUrl(data)) {
                PicassoWithImageLoaderImageViewUtils.withImageView(AutoViewPagerBannerActivity.this, data, imageView);
            } else {
//                PicassoWithImageLoaderImageViewUtils.displayImage(AddressManager.BASE_URL + data, imageView);

            }
//            PicassoWithImageLoaderImageViewUtils.displayImage(data, imageView);
        }

    }

    /**
     * 首页轮廓图banner滚动监听事件
     *
     * @param position
     */
    @Override
    public void onItemClick(int position) {
        Toast.makeText(AutoViewPagerBannerActivity.this, "position" + position, Toast.LENGTH_SHORT).show();
    }

    /**
     * 设置滚动时间
     */
    @Override
    protected void onResume() {
        super.onResume();
        vp_auto_bannar.startTurning(2000);
        MobclickAgent.onResume(this);

    }


    /**
     * onResume与onPause()封装提取原因友盟统计
     */

    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

}
