<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Product;

class ProductController {

    // get product
    public function get(Request $request, $product = null)
    {   
        if ($product) {
            return Product::with(['options', 'categories'])->findOrFail($product);
        }

        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }

        return Product::with(['options', 'categories'])->paginate($per_page);
    }
}