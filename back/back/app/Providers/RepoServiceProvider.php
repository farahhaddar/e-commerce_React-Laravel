<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Repositories\Interfaces\Articles_Interface\ArticleRepositoryInterface',
            'App\Repositories\Articles\ArticleRepository'

        );
        $this->app->bind(

            'App\Repositories\Interfaces\Articles_Categories_Interface\ArticleCatRepositoryInterface',
            'App\Repositories\Article_Categories\ArticleCategoriesRepository'
        );

        $this->app->bind(

            'App\Repositories\Interfaces\Workouts_Categories_Interface\WorkoutCatRepositoryInterface',
                'App\Repositories\Workout_Categories\WorkoutCategoriesRepository'
            );
        $this->app->bind(

            'App\Repositories\Interfaces\Workout_Datas_Interface\WorkoutDatasInterface',
                'App\Repositories\WorkoutDatas\WorkoutDatasRepository'
            );
        $this->app->bind(

            'App\Repositories\Interfaces\Workouts_Interface\WorkoutsRepositoryInterface',
                'App\Repositories\Workouts\WorkoutRepository'
            );
        $this->app->bind(

            'App\Repositories\Interfaces\Product_Categories_Interface\ProductCategoriesRepositoryInterface',
            'App\Repositories\Product_Categories\ProductCategoriesRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Products_Interface\ProductsRepositoryInterface',
            'App\Repositories\Products\ProductsRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Packages_Interface\PackagesRepositoryInterface',
            'App\Repositories\Packages\PackagesRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Comments_Interface\CommentsRepositoryInterface',
            'App\Repositories\Comments\CommentsRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Cities_Interface\CitiesRepositoryInterface',
            'App\Repositories\Cities\CitiesRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Replies_Interface\RepliesRepositoryInterface',
            'App\Repositories\Replies\RepliesRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Testimonials\TestimonialsInterface',
            'App\Repositories\Testimonials\TestimonialsRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\User\UserInterface',
            'App\Repositories\User\UserRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Admin\AdminInterface',
            'App\Repositories\Admin\AdminRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Orders_Interface\OrdersInterface',
            'App\Repositories\Orders\OrdersRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\PackageOrder_ProductOrderInterface\PackageOrder_ProductOrderInterface',
            'App\Repositories\PackageOrder_ProductOrder\PackageOrder_ProductOrder'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Package_Products_Interface\PackageProductsInterface',
            'App\Repositories\Package_Products\PackageProductsRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\ImageHero\ImageHeroInterface',
            'App\Repositories\ImageHero\ImageHeroRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Cart_Products_Interface\CartProductsInterface',
            'App\Repositories\Cart_Products\CartProductsRepository'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Cart_Packages_Interface\CartPackagesInterface',
            'App\Repositories\Cart_Packages\CartPackagesRepository'
        );

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
