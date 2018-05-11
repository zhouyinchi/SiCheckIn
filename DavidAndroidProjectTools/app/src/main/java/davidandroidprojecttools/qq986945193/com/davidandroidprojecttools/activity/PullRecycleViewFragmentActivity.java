package davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.activity;

import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.R;
import davidandroidprojecttools.qq986945193.com.davidandroidprojecttools.fragment.PullRecycleViewFragment;

/**
 * @author ：程序员小冰
 * @新浪微博 ：http://weibo.com/mcxiaobing
 * @GitHub: https://github.com/QQ986945193
 * @CSDN博客: http://blog.csdn.net/qq_21376985
 */

/**
 * 带有自动加载与上拉刷新的fragment
 */
public class PullRecycleViewFragmentActivity extends BaseFragmentActivity {

    @Override
    protected void initView() {
        getSupportFragmentManager().beginTransaction().replace(R.id.flayout,new PullRecycleViewFragment()).commit();
    }

    @Override
    protected void initData() {

    }

    @Override
    protected int getLayoutResId() {
        return R.layout.activity_pull_recycle_view_fragment;
    }
}
