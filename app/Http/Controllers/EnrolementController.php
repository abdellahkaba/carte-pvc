<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnrolementController extends Controller
{
    public function index (){
        return view('pages.enrolement.index');
    }
}
