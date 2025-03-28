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
        Schema::create('medical_histories', function (Blueprint $table) {
            $table->id();

            $table->float("weight");
            $table->string("pulse");
            $table->string("respiratory_rate");
            $table->float("temperature");
            $table->string("diet")->nullable();
            $table->text("allergies")->nullable();
            $table->string("previous_surgery")->nullable();
            $table->string("complaints_or_requests")->nullable();
            $table->text("medication_by_owner")->nullable();
            $table->text("medication_by_other_vets")->nullable();
            $table->text("procedure_done")->nullable();
            $table->date("next_appointment_date")->nullable();

            $table->unsignedBigInteger("physical_exams")->nullable();
            $table->unsignedBigInteger("laboratory_exams")->nullable();
            $table->unsignedBigInteger("diagnosis")->nullable();

            $table->timestamps();

            $table->foreign("physical_exams")
            ->references("id")
            ->on("medical_history_physical_exams")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("laboratory_exams")
            ->references("id")
            ->on("medical_history_laboratory_exams")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("diagnosis")
            ->references("id")
            ->on("medical_history_diagnoses")
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_histories');
    }
};
