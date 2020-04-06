<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Product;
use App\FeaturedItem;

class HomeController {

    // get product
    public function get(Request $request, $product = null)
    {   
        $products = Product::with(['options', 'categories'])->orderBy('id')->get();
        $featured = FeaturedItem::all();
        return [
            'products' => $products,
            'featured' => $featured
        ];
    }
}