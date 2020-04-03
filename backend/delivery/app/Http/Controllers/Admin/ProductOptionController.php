<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\ProductOption;

class ProductOptionController {

    // create new product
    public function create(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string',
        ]);

        
        $productOption = new ProductOption;
        $productOption->name = $request->input('name');
        $productOption->save();
        return $productOption;
    }
}