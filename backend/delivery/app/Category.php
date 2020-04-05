<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * Get the post's image.
     */
    public function featured_item()
    {
        return $this->morphOne('App\FeaturedItem', 'featurable');
    }
}
