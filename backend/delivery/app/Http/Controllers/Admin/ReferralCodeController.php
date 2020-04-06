<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\ReferralCode;
use Illuminate\Support\Facades\Storage;

class ReferralCodeController {

    // list referral codes
    public function index(Request $request)
    {
        $per_page = null;

        if ($request->has('per_page')) {
            $per_page = $request->input('per_page');
        }

        return ReferralCode::with(['user'])->paginate($per_page);
    }

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