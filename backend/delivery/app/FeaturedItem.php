<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeaturedItem extends Model
{
    //
        /**
     * Get the owning imageable model.
     */
    public function featurable()
    {
        return $this->morphTo();
    }
}
