<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;

class ProductsController {

    // create new product
    public function create(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string',
            'image' => 'file|image',
            'category_id' => 'required|array',
            'category_id.*' => 'numeric',
            'product_option_id' => 'required|array',
            'product_option_id.*' => 'numeric'
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
            $product->options()->attach($request->input('product_option_id'));
            $product->categories;
            $product->options;
            return $product;
        });
    }

    // create new product
    public function edit(Request $request, Product $product)
    {
        $hasImageField = $request->has('image');

        $validationRules = [
            'name' => 'required|string',
            'image' => 'file|image',
            'category_id' => 'required|array',
            'category_id.*' => 'numeric',
            'product_option_id' => 'required|array',
            'product_option_id.*' => 'numeric'
        ];

        if ($hasImageField && $request->input('image') !== 'null')
        {
            $validationRules['image'] = 'file|image'; 
        }

        $request->validate($validationRules);

        return DB::transaction(function () use ($request, $hasImageField, $product) {
            $product->name = $request->input('name');
            $product->categories()->sync($request->input('category_id'));
            $product->options()->sync($request->input('product_option_id'));

            $oldImagePath = $product->image;
            if ($hasImageField) {
                if ($request->hasFile('image')) {
                    if ($request->file('image')->isValid()) {
                        $path = $request->image->store('', 'public');
                        $product->image = $path;
                    }
                } else {
                    $product->image = null;
                }
            }

            $product->save();
            
            // all changes succeeded delete old image
            if ($oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        });
    }
}