<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\SectionsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/user/register', 'UserAuthController@register');
Route::post('/user/login', 'UserAuthController@login');
Route::post('/user/logout', 'UserAuthController@logout');

Route::post('/admin/register', 'AdminAuthController@register');
Route::post('/admin/login', 'AdminAuthController@login');
Route::post('/admin/logout', 'AdminAuthController@logout');


 Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admins']],function ()
{
    // admin controller
 Route::get('/admins/{rowNb}','AdminsController@index');
 Route::get('/admin/{id}','AdminsController@show');
 Route::post('/admin','AdminsController@store');
 Route::put('/admin/{id}','AdminsController@update');
 Route::delete('/admin/{id}','AdminsController@destroy');
 Route::get('/countAdmins','AdminsController@count');

// user controller
Route::get('/countUser','UserController@count');
Route::get('/users/{rowNb}','UserController@index');
Route::get('/user/{id}','UserController@show');
Route::delete('/user/{id}','UserController@destroy');
Route::post('/user','UserController@store');

// testemonials
Route::get('/testimonial/{id}','TestimonialsController@show');
Route::post('/testimonial','TestimonialsController@store');
Route::put('/testimonial/{id}','TestimonialsController@update');
Route::delete('/testimonial/{id}','TestimonialsController@destroy');
Route::get('/countTestimonials','TestimonialsController@count');

// comment
Route::get('/countComments','CommentsController@count');
Route::delete('/comment/{id}','CommentsController@destroy');

// replies
Route::delete('/reply/{id}','RepliesController@destroy');
Route::get('/countReplies','RepliesController@count');

// product category
Route::post('/productCategory','ProductCategoriesController@store');
Route::get('/productCategory/{id}','ProductCategoriesController@show');
Route::put('/productCategory/{id}','ProductCategoriesController@update');
Route::delete('/productCategory/{id}','ProductCategoriesController@destroy');
Route::get('/countProductCategories','ProductCategoriesController@count');

// products
Route::post('/product','ProductsController@store');
Route::put('/product/{id}','ProductsController@update');
Route::delete('/product/{id}','ProductsController@destroy');
Route::get('/countProducts','ProductsController@count');


// packages
Route::post('/package','PackagesController@store');
Route::put('/package/{id}','PackagesController@update');
Route::delete('/package/{id}','PackagesController@destroy');
Route::get('/countPackages','PackagesController@count');


// city
Route::post('/city','CitiesController@store');
Route::put('/city/{id}','CitiesController@update');
Route::delete('/city/{id}','CitiesController@destroy');

//articles
Route::put('/articles/{id}', 'ArticlesController@update');
Route::delete('/articles/{id}', 'ArticlesController@destroy');
Route::get('/countArticles','ArticlesController@count');
Route::post('/articles', 'ArticlesController@store');

// articles_category
Route::post('/articlesCategories', 'ArticleCategoriesController@store');
Route::put('/articlesCategories/{id}', 'ArticleCategoriesController@update');
Route::delete('/articlesCategories/{id}', 'ArticleCategoriesController@destroy');
Route::get('/countArticleCategories','ArticleCategoriesController@count');

// workout_categories
Route::put('/workoutCategories/{id}', 'WorkoutCategoriesController@update');
Route::delete('/workoutCategories/{id}', 'WorkoutCategoriesController@destroy');
Route::get('/countWorkoutCategories','WorkoutCategoriesController@count');
Route::post('/workoutCategories', 'WorkoutCategoriesController@store');

// workouts
Route::put('/workouts/{id}', 'WorkoutsController@update');
Route::delete('/workouts/{id}', 'WorkoutsController@destroy');
Route::get('/countWorkouts','WorkoutsController@count');
Route::post('/workouts', 'WorkoutsController@store');

// workout_datas
Route::put('/workoutDatas/{id}', 'WorkoutDatasController@update');
Route::delete('/workoutDatas/{id}', 'WorkoutDatasController@destroy');
Route::get('/countWorkoutDatas','WorkoutDatasController@count');
Route::post('/workoutDatas', 'WorkoutDatasController@store');

// orders
Route::get('/Orders/{row}', 'OrdersController@index');
Route::get('/Orders/{id}', 'OrdersController@show');
Route::delete('/Orders/{id}', 'OrdersController@destroy');
Route::get('/countOrders','OrdersController@count');
Route::put('/updateStatus/{id}','OrdersController@updateStatus');

// package_products
Route::put('/packageProduct/{id}/{quantity}', 'PackageProductsController@update');
Route::post('/packageProduct/{packageId}/{productId}/{quantity}', 'PackageProductsController@store');
Route::delete('/packageProduct/{id}', 'PackageProductsController@destroy');
Route::get('/countpackage','PackageProductsController@count');


// image_hero
Route::get('/imageHeroCount','ImageHeroController@count');
Route::get('/imageHero/{id}','ImageHeroController@show');
Route::post('/imageHero','ImageHeroController@store');
Route::put('/imageHero/{id}','ImageHeroController@update');
Route::delete('/imageHero/{id}','ImageHeroController@destroy');

    
});


Route::group(['prefix' => 'user','middleware' => ['assign.guard:users']],function ()
{

    // user contoller
    Route::post('/user','UserController@store');
    Route::put('/user/{id}','UserController@update');
    Route::get('/user/{id}','UserController@show');
    Route::get('/userrelation/{id}','UserController@relations');
    Route::delete('/user/{id}','UserController@destroy');

    // comments
    Route::post('/comment','CommentsController@store');
    Route::delete('/comment/{id}','CommentsController@destroy');
    
    // replies
    Route::post('/reply','RepliesController@store');
    Route::delete('/reply/{id}','RepliesController@destroy');
   
    // orders
    Route::post('/Orders', 'OrdersController@store');
    Route::put('/Orders/{id}', 'OrdersController@update');

    //Products

    Route::post('/decrementQuantityPro/{id}/{nb}', 'ProductsController@decrementQuantity');

    //Packages
    
    Route::post('/decrementQuantityPack/{id}/{nb}', 'PackagesController@decrementQuantity');

});



//*************************************************************************************//
//                               Testimonials   ROUTES                                 // 
//*************************************************************************************//
Route::get('/testimonials/{rowNb}','TestimonialsController@index');
//*************************************************************************************//
//                               Comment   ROUTES                                      // 
//*************************************************************************************//
Route::get('/comments/{rows}','CommentsController@index');
//*************************************************************************************//
//                               Reply   ROUTES                                        // 
//*************************************************************************************//
Route::get('/replies/{rows}','RepliesController@index');
//*************************************************************************************//
//                               Product_Category   ROUTES                             // 
//*************************************************************************************//
Route::get('/productCategories/{row}','ProductCategoriesController@index');
//*************************************************************************************//
//                               Product   ROUTES                                      // 
//*************************************************************************************//;
Route::get('/products','ProductsController@allProducts');
Route::get('/productsrecnt','ProductsController@mostRecentProducts');
Route::get('/products/{row}','ProductsController@index');
Route::get('/product/{id}','ProductsController@show');
//*************************************************************************************//
//                               Packages   ROUTES                                     // 
//*************************************************************************************//
Route::get('/packages/{row}','PackagesController@index');
Route::get('/package/{id}','PackagesController@show');
Route::get('/packagesrecnt','PackagesController@mostRecentPackages');
//*************************************************************************************//
//                               City   ROUTES                                         // 
//*************************************************************************************//
Route::get('/cities/{row}','CitiesController@index');
//*************************************************************************************//
//                               Articles   ROUTES                                     // 
//*************************************************************************************//
Route::get('/articles', 'ArticlesController@index');
Route::get('/LastArticles', 'ArticlesController@getLast');
Route::get('/articles/{id}', 'ArticlesController@show');

//*************************************************************************************//
//                               Aarticles Category   ROUTES                           // 
//*************************************************************************************//

Route::get('/articlesCategories', 'ArticleCategoriesController@index');
Route::get('/articlesCategories/{id}', 'ArticleCategoriesController@show');

//*************************************************************************************//
//                               Workout Categories   ROUTES                           // 
//*************************************************************************************//

Route::get('/workoutCategories/{rows}', 'WorkoutCategoriesController@index');
Route::get('/workoutCategory/{id}', 'WorkoutCategoriesController@show');

//*************************************************************************************//
//                               Workouts   ROUTES                               // 
//*************************************************************************************//
Route::get('/workouts/{rows}', 'WorkoutsController@index');
Route::get('/workout/{id}', 'WorkoutsController@show');
Route::get('/workoutsByCatVideo/{id}','WorkoutsController@showByCatVideo');
Route::get('/workoutsByCatImage/{id}','WorkoutsController@showByCatImage');


//*************************************************************************************//
//                               Workout Datas   ROUTES                           // 
//*************************************************************************************//

Route::get('/workoutDatas/{row}', 'WorkoutDatasController@index');
Route::get('/workoutData/{id}', 'WorkoutDatasController@show');

//*************************************************************************************//
//                               Order Products   ROUTES                           // 
//*************************************************************************************//
Route::post('/OrderProducts', 'OrderProductsController@store');
Route::put('/OrderProducts/{id}', 'OrderProductsController@update');

Route::get('/OrderProducts/{rows}', 'OrderProductsController@index');
Route::get('/OrderProducts/{id}', 'OrderProductsController@show');

Route::delete('/OrderProducts/{id}', 'OrderProductsController@destroy');

Route::get('/countOrderProducts','OrderProductsController@count');

//*************************************************************************************//
//                               Order Packages   ROUTES                           // 
//*************************************************************************************//
Route::post('/OrderPackages', 'OrderPackagesController@store');

Route::get('/OrderPackages/{row}', 'OrderPackagesController@index');
Route::get('/OrderPackages/{id}', 'OrderPackagesController@show');

Route::put('/OrderPackages/{id}', 'OrderPackagesController@update');
Route::delete('/OrderPackages/{id}', 'OrderPackagesController@destroy');
Route::get('/countOrder','OrderPackagesController@count');

//*************************************************************************************//
//                               Package Products   ROUTES                           // 
//*************************************************************************************//
Route::get('/packageProducts/{packageId}/{row}', 'PackageProductsController@index');
Route::get('/packageProduct/{packageId}/{row}', 'PackageProductsController@show');



//*************************************************************************************//
//                                Image Hero ROUTES                                    // 
//*************************************************************************************//
Route::get('/imageHero','ImageHeroController@index');
//*************************************************************************************//
//                               Cart Products   ROUTES                           // 
//*************************************************************************************//
Route::get('/cartProducts','CartProductsController@index');
// Route::get('/cartProduct/{id}','CartProductsController@show');
Route::post('/cartProduct','CartProductsController@store');
Route::put('/updateProduct','CartProductsController@update');
Route::delete('/cartProduct/{id}','CartProductsController@destroy');
Route::delete('/destroyByUserIdPro/{id}','CartProductsController@destroyByUserId');


//*************************************************************************************//
//                               Cart Packages   ROUTES                           // 
//*************************************************************************************//
Route::get('/cartPackages','CartPackagesController@index');
// Route::get('/cartPackage/{id}','CartPackagesController@show');
Route::post('/cartPackage','CartPackagesController@store');
Route::put('/updatePackage','CartPackagesController@update');
Route::delete('/cartPackage/{id}','CartPackagesController@destroy');
Route::delete('/destroyByUserIdPack/{id}','CartPackagesController@destroyByUserId');




// City
Route::get('/city/{id}','CitiesController@show');

Route::get('/countCities','CitiesController@count');
