<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use App\Events\OrderUpdate;

class OrdersController {
    // list all user orders
    public function index(Request $request)
    {
        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }

        // get existing orders index
        $ordersIndex = Cache::tags(['orders'])->get('index');

        $allOrders = [];
        if ($ordersIndex) {
            foreach($ordersIndex as $orderKey) {
                $order = Cache::tags(['orders'])->get($orderKey);
                $allOrders[] = $order;
            }
        }

        return $allOrders;        
    }

    // get order
    public function get(Request $request, $id)
    {
        $order = Cache::tags(['orders'])->get($id);
        if (!$order) {
            abort(404, 'Order not found.');
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

    // edit order
    public function edit(Request $request, $id)
    {
        $order = Cache::tags(['orders'])->get($id);
        if (!$order) {
            abort(404, 'Order not found.');
        }
        
        $validator = $request->validate([
            'delivery_time' => 'required|date',
            'order_status' => 'required|string'
        ]);
        
        $order['delivery_time'] = $request->input('delivery_time');
        $order['order_status'] = $request->input('order_status');

        Cache::tags(['orders'])->put($id, $order, now()->addDay());

        event(new OrderUpdate($order));

        return $order;
    }
}