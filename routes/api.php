<?php

use App\Http\Controllers\AdminRolesController;
use App\Http\Controllers\Api\AppointmentsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmailOTPsController;
use App\Http\Controllers\Api\FeedbacksController;
use App\Http\Controllers\Api\inventoryCategoriesController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\InventoryHistoryController;
use App\Http\Controllers\Api\InventoryItemsController;
use App\Http\Controllers\Api\PetsController;
use App\Http\Controllers\Api\SentimentAnalysisController;
use App\Http\Controllers\Api\StaffsController;
use App\Http\Controllers\Api\UserAdminsController;
use App\Http\Controllers\Api\UserClientsController;
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
| Inventories
|----------------------------------------
*/
Route::get('/get-all-inventory', [InventoryController::class,'GetAllInventory']);
Route::get('/get-full-inventory-where-id/{id}', [InventoryController::class,'GetFullInventoryWhereId']);

Route::post('/add-inventory', [InventoryController::class,'createInventory']);
Route::post('/edit-inventory', [InventoryController::class,'editInventoryItem']);





/*
|----------------------------------------
| Inventory Items
|----------------------------------------
*/
Route::post('/add-inventory-item', [InventoryItemsController::class,'AddInventoryItem']);
Route::post('/del-inventory-item', [InventoryItemsController::class,'DelInventoryItem']);





/*
|----------------------------------------
| Inventory Items
|----------------------------------------
*/
Route::get('/get-all-inventory-history', [InventoryHistoryController::class,'GetAllInventoryHistory']);





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
Route::get('/get-appt-where-id/{appointmentId}', [AppointmentsController::class,'getAppointmentWhereId']);
Route::get('/get-all-appointments', [AppointmentsController::class,'getAllAppointments']);
Route::get('/get-all-appointments-where-status/{status}', [AppointmentsController::class,'GetAllAppointmentsWhereStatus']);

Route::post('/add-appointment', [AppointmentsController::class,'createAppointment']);
Route::post('/cancel-appointment', [AppointmentsController::class,'cancelAppointment']);
Route::post('/m-complete-appointment', [AppointmentsController::class,'completeAppointment']);
Route::post('/approve-appointment', [AppointmentsController::class,'approveAppointment']);






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
Route::post('/update-client-profile', [UserClientsController::class, 'UpdateClientProfile']);





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





/*
|----------------------------------------
| Staffs
|----------------------------------------
*/
Route::get('/get-all-staffs', [StaffsController::class, 'GetAllStaffs']);

Route::get('/get-all-staffs-where-status/{status}', [StaffsController::class, 'GetAllStaffsWhereStatus']);





/*
|----------------------------------------
| Models
|----------------------------------------
*/
Route::get('/get-statistics-from-model', [SentimentAnalysisController::class, 'GetStatisticsFromModel']);
Route::get('/get-metrics-from-model', [SentimentAnalysisController::class, 'GetModelMetrics']);
Route::get('/get-sentiments-from-db', [SentimentAnalysisController::class, 'GetSentimentsFromDB']);
Route::get('/test-model', [SentimentAnalysisController::class, 'TestModel']);

Route::post('/update-sentiment-statistics-table', [SentimentAnalysisController::class, 'UpdateSentimentStatisticsTable']);





/*
|----------------------------------------
| Feedbacks
|----------------------------------------
*/
Route::get('/get-all-feedbacks', [FeedbacksController::class, 'GetAllFeedbacks']);

Route::post('/post-feedback', [FeedbacksController::class, 'PostFeedback']);





/*
|----------------------------------------
| OTP
|----------------------------------------
*/
Route::post('/client-send-email-otp', [EmailOTPsController::class, 'GenerateAndSendOTPToEmail']);