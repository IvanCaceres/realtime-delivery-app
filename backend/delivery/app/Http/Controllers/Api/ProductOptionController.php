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

        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }

        return ProductOption::paginate($per_page);;
    }
}