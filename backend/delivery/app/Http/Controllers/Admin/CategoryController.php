<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function delete(Request $request, Category $category)
    {
        return DB::transaction(function () use ($request, $category) {
            $category->featured_item()->each(function($featured) {
                // and then the static::deleting method when you delete each one
                $featured->delete();
            });
            $category->products()->sync([]);
            $category->delete();
        });
    }
}