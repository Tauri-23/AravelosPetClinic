<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointment_assigned_staffs', function (Blueprint $table) {
            $table->id();
            $table->string('appointment', 12)->nullable();
            $table->string('staff',6)->nullable();
            $table->timestamps();

            $table->foreign('appointment')
            ->references('id')
            ->on('appointments')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_assigned_staffs');
    }
};
