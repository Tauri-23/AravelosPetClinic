<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')
    ->group(function() {
        Route::get('/user', [AuthController::class, 'getUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });





/*
|----------------------------------------
| Public
|----------------------------------------
*/
Route::post('/signup', [AuthController::class, 'signupPost']);
Route::post('/login', [AuthController::class, 'login']);





/*
|----------------------------------------
| Public
|----------------------------------------
*/
Route::get('/get-all-inventory', [InventoryController::class,'GetAllInventory']);