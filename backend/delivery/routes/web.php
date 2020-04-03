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

// Auth Routes
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::get('/user', function(Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return view('welcome');
});

// Admin Routes
Route::namespace('Admin')->prefix('admin')->middleware(['can:access-admin'])->group(function () {
    Route::get('/category', function () {
        return view('welcome');
    });
    Route::get('/category/edit/{id}', function () {
        return view('welcome');
    });
    Route::post('/category', 'CategoryController@create');
    Route::put('/category/{category}', 'CategoryController@edit');
    Route::post('/productOption', 'ProductOptionController@create');
    Route::post('/product', 'ProductsController@create');
    Route::get('/products/add', function () {
        return view('welcome');
    });
    Route::get('/', function () {
        return view('welcome');
    });
});
