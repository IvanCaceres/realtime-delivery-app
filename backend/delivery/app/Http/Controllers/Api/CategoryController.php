<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Category;

class CategoryController {

    // get category
    public function get(Request $request, Category $category = null)
    {   
        if ($category) {
            return $category;
        }

        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }
        return Category::paginate($per_page);
    }
}