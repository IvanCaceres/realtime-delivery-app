<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\ProductOption;

class ProductOptionController {

    // get product option
    public function get(Request $request, ProductOption $productOption = null)
    {   
        if ($productOption) {
            return $productOption;
        }
        return ProductOption::all();
    }
}