<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The Product Options that belong to the Product.
     */
    public function options()
    {
        return $this->belongsToMany('App\ProductOption');
    }

    /**
     * The Categories that belong to the Product.
     */
    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }

    public function featured_item()
    {
        return $this->morphOne('App\FeaturedItem', 'featurable');
    }
}
