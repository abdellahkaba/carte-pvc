<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImpressionController extends Controller
{
    public function index (){
        return view('pages.impression.index');
    }
}
