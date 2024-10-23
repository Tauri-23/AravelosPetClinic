<?php

use App\Http\Controllers\AdminRolesController;
use App\Http\Controllers\Api\AppointmentsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\inventoryCategoriesController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\PetsController;
use App\Http\Controllers\Api\UserAdminsController;
use App\Http\Controllers\Api\UserClientsController;
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
| Inventory Items
|----------------------------------------
*/
Route::get('/get-all-inventory', [InventoryController::class,'GetAllInventory']);
Route::post('/add-inventory-item', [InventoryController::class,'createInventoryItem']);





/*
|----------------------------------------
| Inventory Categories
|----------------------------------------
*/
Route::post('/add-inventory-categories', [inventoryCategoriesController::class,'createCategory']);
Route::post('/edit-inventory-categories', [inventoryCategoriesController::class,'editCategory']);
Route::post('/delete-inventory-categories', [inventoryCategoriesController::class,'deleteCategory']);

Route::get('/get-all-inventory-categories', [inventoryCategoriesController::class,'getAllCategories']);





/*
|----------------------------------------
| Appointments
|----------------------------------------
*/
Route::get('/get-all-appointments-where-client/{clientId}', [AppointmentsController::class,'getAllAppointmentWhereClient']);
Route::post('/add-appointment', [AppointmentsController::class,'createAppointment']);
Route::post('/cancel-appointment', [AppointmentsController::class,'cancelAppointment']);






/*
|----------------------------------------
| Pets
|----------------------------------------
*/
Route::post('/add-pet', [PetsController::class,'CreatePet']);
Route::get('/retrieve-pet-where-client/{clientId}', [PetsController::class,'GetPetWhereClient']);





/*
|----------------------------------------
| Clients
|----------------------------------------
*/
Route::get('/retrieve-all-clients-not-deleted', [UserClientsController::class, 'GetAllClientsNotDeleted']);

Route::post('/suspend-unsuspend-client', [UserClientsController::class, 'SuspendUnsuspendClient']);
Route::post('/del-client', [UserClientsController::class, 'DeleteClient']);





/*
|----------------------------------------
| Admins
|----------------------------------------
*/
Route::get('/retrieve-all-admins-not-deleted/{adminId}', [UserAdminsController::class, 'GetAllAdminsNotDeleted']);

Route::post('/create-admin', [UserAdminsController::class, 'CreateAdmin']);
Route::post('/suspend-unsuspend-admin', [UserAdminsController::class, 'SuspendUnsuspendAdmin']);
Route::post('/del-admin', [UserAdminsController::class, 'DeleteAdmin']);





/*
|----------------------------------------
| Admin Types
|----------------------------------------
*/
Route::get('/get-all-admin-roles', [AdminRolesController::class, 'GetAllAdminRoles']);