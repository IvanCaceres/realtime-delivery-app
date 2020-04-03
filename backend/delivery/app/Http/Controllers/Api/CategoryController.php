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
        return Category::all();
    }
}