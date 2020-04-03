<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Category;

class CategoryController {

    // create new category
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

    // edit category
    public function edit(Request $request, Category $category)
    {
        $validator = $request->validate([
            'name' => 'required|string',
        ]);

        
        $category->name = $request->input('name');
        $category->save();
    }
}