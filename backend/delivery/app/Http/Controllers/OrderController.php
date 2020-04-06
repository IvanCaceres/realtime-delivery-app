<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class OrderController {

    // create new user order
    public function create(Request $request)
    {
        $validator = $request->validate([
            'products' => 'required|array',
            'products.*.product_id' => 'required|numeric',
            'products.*.product_option' => 'required|numeric',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric'
        ]);
        $user = $request->user();
        $username = $user->username;
        
        // each product in products array will contain product_id and product_option wil be the product option selected or a custom order message

        // add order as pending status to be confirmed from admin
        $orderData = [
            'products' => $request->input('products'),
            'order_status' => 'pending',
            'user' => $user
        ];

        $cacheOrderKey = $username . '_order'; 

        // tag as an order for user
        Cache::tags([$username, 'orders'])->put($cacheOrderKey, $orderData, now()->addDay());
        return $orderData;
    }

    // create new product
    public function edit(Request $request, Product $product)
    {
        $hasImageField = $request->has('image');

        $validationRules = [
            'name' => 'required|string',
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
            
            if ($hasImageField) {
                // all changes succeeded delete old image
                if ($oldImagePath) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }
        });
    }
}