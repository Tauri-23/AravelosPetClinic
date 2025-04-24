<?php

namespace App\Console\Commands;

use App\Models\appointments;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CancelOverdueAppointments extends Command
{
    protected $signature = 'appointments:cancel-overdue';
    protected $description = 'Cancel approved appointments that are past the 7-day grace period';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get appointments where status is 'Approved' and check if the appointment date is 7 days ago
        $appointments = appointments::where('status', 'Approved')
            ->where('appointment_date', '<', Carbon::now()->subDays(7))
            ->get();

        // Update each appointment to 'Cancelled'
        foreach ($appointments as $appointment) {
            $appointment->status = 'Cancelled';
            $appointment->save();

            $this->info("Appointment with ID {$appointment->id} has been cancelled.");
        }

        $this->info('All overdue appointments have been processed.');
    }
}
