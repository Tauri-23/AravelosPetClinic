<?php

use App\Models\appointments;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('appointments:cancel-overdue', function () {
    $appointments = appointments::where('status', 'Approved')
        ->where('appointment_date', '<', Carbon::now()->subDays(7))
        ->get();

    foreach ($appointments as $appointment) {
        $appointment->status = 'Cancelled';
        $appointment->save();
        $this->info("Appointment with ID {$appointment->id} has been cancelled.");
    }

    $this->info('All overdue appointments have been processed.');
})->purpose('Cancel overdue approved appointments')
  ->everyFiveSeconds(); // Adjust the frequency of the task (e.g., daily)

Schedule::command("appointments:cancel-overdue")->everyFiveSeconds();
