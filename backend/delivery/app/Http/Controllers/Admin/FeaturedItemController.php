<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\FeaturedItem;
use App\Product;
use App\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FeaturedItemController {

    // create new featured item
    public function create(Request $request)
    {   
        $v = Validator::make($request->all(), [
            'title' => 'required|string',
            'image' => 'file|image',
        ]);

        // conditionally require either product or category for this featured item
        $v->sometimes('product_id', 'required|string', function ($input) {
            return !$input->category_id;
        });

        $v->sometimes('category_id', 'required|string', function ($input) {
            return !$input->product_id;
        });

        $v->validate();

        return DB::transaction(function () use ($request) {
            $featuredItem = new FeaturedItem;
            $featuredItem->title = $request->input('title');

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $path = $request->image->store('', 'public');
                $featuredItem->image = $path;
            }

            if ($request->has('product_id')) {
                $product = Product::findOrFail($request->input('product_id'));
                $featuredItem->featurable_type = 'App\Product';
                $featuredItem->featurable_id = $request->input('product_id');
            }

            if ($request->has('category_id')) {
                $category = Category::findOrFail($request->input('category_id'));
                $featuredItem->featurable_type = 'App\Category';
                $featuredItem->featurable_id = $request->input('category_id');
            }

            $featuredItem->save();
            $featuredItem->featurable;
            return $featuredItem;
        });
    }

    // edit featured item
    public function edit(Request $request, FeaturedItem $featuredItem)
    {
        $hasImageField = $request->has('image');

        $v = Validator::make($request->all(), [
            'title' => 'required|string',
        ]);

        // conditionally require an image file or null to delete featured image
        $v->sometimes('image', 'file|image', function ($input) {
            return $input->image && $input->image != 'null';
        });

        $v->sometimes('image', 'string', function ($input) {
            return $input->image && $input->image == 'null';
        });

        // conditionally require either product or category for this featured item
        $v->sometimes('product_id', 'required|string', function ($input) {
            return !$input->category_id;
        });

        $v->sometimes('category_id', 'required|string', function ($input) {
            return !$input->product_id;
        });

        $v->validate();

        return DB::transaction(function () use ($request, $hasImageField, $featuredItem) {
            $featuredItem->title = $request->input('title');
            if ($request->has('product_id')) {
                $product = Product::findOrFail($request->input('product_id'));
                $featuredItem->featurable_type = 'App\Product';
                $featuredItem->featurable_id = $request->input('product_id');
            }

            if ($request->has('category_id')) {
                $category = Category::findOrFail($request->input('category_id'));
                $featuredItem->featurable_type = 'App\Category';
                $featuredItem->featurable_id = $request->input('category_id');
            }

            $oldImagePath = $featuredItem->image;
            if ($hasImageField) {
                if ($request->hasFile('image')) {
                    if ($request->file('image')->isValid()) {
                        $path = $request->image->store('', 'public');
                        $featuredItem->image = $path;
                    }
                } else {
                    $featuredItem->image = null;
                }
            }

            $featuredItem->save();

            if ($hasImageField) {
                // all changes succeeded delete old image
                if ($oldImagePath) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }
        });
    }
}