<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;

class ProductsController {

    // create new product
    public function createProduct(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string',
            'image' => 'file|image',
            'category_id' => 'required|array',
            'category_id.*' => 'numeric',
            'option_id' => 'required|array',
            'option_id.*' => 'numeric'
        ]);

        
        return DB::transaction(function () use ($request) {
            $product = new Product;
            $product->name = $request->input('name');

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $path = $request->image->store('', 'public');
                $product->image = $path;
            }

            $product->save();

            $product->categories()->attach($request->input('category_id'));
            $product->options()->attach($request->input('option_id'));
            return $conference;
        });
    }
}