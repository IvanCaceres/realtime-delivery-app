<?php

use Illuminate\Http\Request;

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

Route::get('/category/{category?}', 'Api\CategoryController@get');

Route::get('/featuredItem/{featuredItem?}', 'Api\FeaturedItemController@get');

Route::get('/productOption/{productOption?}', 'Api\ProductOptionController@get');

Route::get('/product/{product?}', 'Api\ProductController@get');

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
