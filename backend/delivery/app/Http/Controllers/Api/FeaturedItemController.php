<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\FeaturedItem;

class FeaturedItemController {

    // get product
    public function get(Request $request, $featuredItem = null)
    {   
        if ($featuredItem) {
            return FeaturedItem::with(['featurable'])->findOrFail($featuredItem);
        }

        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }

        return FeaturedItem::with(['featurable'])->orderBy('id')->paginate($per_page);
    }
}