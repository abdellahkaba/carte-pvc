<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EnrolementController;
use App\Http\Controllers\ImpressionController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware('can:user')->group(function () {
        Route::get('/enrolement', [EnrolementController::class, 'index'])->name('enrolement.index');
    });
    
    
    Route::middleware('can:admin')->group(function () {
        Route::get('/utilisateur', [UserController::class, 'index'])->name('utilisateur.index');
        Route::get('/impression', [ImpressionController::class, 'index'])->name('impression.index');
        Route::get('/enrolement', [EnrolementController::class, 'index'])->name('enrolement.index');
    });
});