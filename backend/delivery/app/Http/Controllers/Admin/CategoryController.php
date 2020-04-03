<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Category;

class CategoryController {

    // create new product
    public function create(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string',
        ]);

        
        $category = new Category;
        $category->name = $request->input('name');
        $category->save();
        return $category;
    }
}