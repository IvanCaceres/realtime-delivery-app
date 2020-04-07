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
        $user = $request->user();
        $username = $user->username;
        $cacheOrderKey = $username . '_order'; 

        if (Cache::tags(['orders'])->get($cacheOrderKey)) {
            abort(422, 'A current order already exists for this user.');
        }

        $validator = $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.product_option_id' => 'required_without:products.*.custom_message|numeric|exists:product_options,id',
            'products.*.custom_message' => 'required_without:products.*.product_option_id|string',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric'
        ]);

        
        // each product in products array will contain product id and either product_option_id (the product option selected) or a custom_message
        // add order as pending status to be confirmed from admin
        $orderData = [
            'id' => $cacheOrderKey,
            'products' => $request->input('products'),
            'order_status' => 'pending',
            'user' => $user,
            'placed' => now(),
            'location' => $request->input('location')
        ];

        // tag as an order for user
        Cache::tags(['orders'])->put($cacheOrderKey, $orderData, now()->addDay());

        // get existing orders index
        $ordersIndex = Cache::tags(['orders'])->get('index');
        if (!$ordersIndex) {
            $ordersIndex = []; 
        }
        $ordersIndex[] = $cacheOrderKey;
        // add to orders index cache
        Cache::tags(['orders'])->put('index', $ordersIndex, now()->addDay());
        return $orderData;
    }

    // get user order
    public function get(Request $request, Product $product)
    {
        $user = $request->user();
        $username = $user->username;
        $cacheOrderKey = $username . '_order';
        $order = Cache::tags(['orders'])->get($cacheOrderKey);

        if (!$order) {
            return $order;
        }

        $productIds = [];
        foreach ($order['products'] as &$value) {
            array_push($productIds, $value['id']);
        }

        $products = Product::with(['options'])->find($productIds);

        $keyed = $products->keyBy('id');
        foreach ($order['products'] as $productInfo) {
            if (isset($productInfo['product_option_id']))
            {
                foreach  ($keyed[$productInfo['id']]['options'] as $option) {
                    if ($option['id'] == $productInfo['product_option_id']) {
                        $keyed[$productInfo['id']]['option_selected'] = $option['name'];
                        break;
                    }
                }
            }
            if (isset($productInfo['custom_message']))
            {
                $keyed[$productInfo['id']]['custom_message'] = $productInfo['custom_message'];
            }
            unset($keyed[$productInfo['id']]['options']);
        }
        $order['products'] = $keyed;
        return $order;
    }
}