<?php
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth Related Routes
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::post('/register', 'Auth\RegisterController@register')->name('register');


// public view routes
Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('welcome');
});

Route::get('/register', function () {
    return view('welcome');
});



// regular auth protected user routes
Route::middleware(['auth'])->group(function () {
    Route::get('/order', 'OrderController@get');
    Route::post('/order', 'OrderController@create');
    Route::get('/user', function(Request $request) {
        return $request->user();
    });
    Route::get('/cart', function () {
        return view('welcome');
    });
    Route::get('/trackOrder', function () {
        return view('welcome');
    });
});

// Admin Routes
Route::namespace('Admin')->prefix('admin')->middleware(['can:access-admin'])->group(function () {
    Route::get('/category', function () {
        return view('welcome');
    });
    Route::get('/category/view', function () {
        return view('welcome');
    });
    Route::get('/category/edit/{id}', function () {
        return view('welcome');
    });
    Route::get('/featured', function () {
        return view('welcome');
    });
    Route::get('/featured/view', function () {
        return view('welcome');
    });
    Route::get('/featured/edit/{id}', function () {
        return view('welcome');
    });
    Route::get('/product', function () {
        return view('welcome');
    });
    Route::get('/product/view', function () {
        return view('welcome');
    });
    Route::get('/product/edit/{id}', function () {
        return view('welcome');
    });
    Route::get('/productOption', function () {
        return view('welcome');
    });
    Route::get('/productOption/view', function () {
        return view('welcome');
    });
    Route::get('/productOption/edit/{id}', function () {
        return view('welcome');
    });
    Route::get('/referral', function () {
        return view('welcome');
    });
    Route::get('/referral/view', function () {
        return view('welcome');
    });

    Route::post('/category', 'CategoryController@create');
    Route::put('/category/{category}', 'CategoryController@edit');

    Route::post('/productOption', 'ProductOptionController@create');
    Route::put('/productOption/{productOption}', 'ProductOptionController@edit');

    Route::post('/product', 'ProductsController@create');
    Route::put('/product/{product}', 'ProductsController@edit');

    Route::post('/featuredItem', 'FeaturedItemController@create');
    Route::put('/featuredItem/{featuredItem}', 'FeaturedItemController@edit');

    Route::get('/referralCode', 'ReferralCodeController@index');
    Route::post('/referralCode', 'ReferralCodeController@create');

    Route::get('/', function () {
        return view('welcome');
    });
});
