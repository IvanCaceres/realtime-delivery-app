<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\ReferralCode;
use Illuminate\Support\Facades\Storage;

class ReferralCodeController {

    // create new referral code
    public function create(Request $request)
    {
        $validator = $request->validate([
            'quantity' => 'required|numeric|max:100',
        ]);
        
        for ($x = 0; $x <= $request->input('quantity'); $x++) {
            $refCode = new ReferralCode;
            $refCode->code = bin2hex(random_bytes(15));
            $refCode->save();
        }

        return;
    }
}