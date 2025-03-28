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
        Schema::create('medical_history_diagnoses', function (Blueprint $table) {
            $table->id();

            $table->text("tentative_diagnosis")->nullable();
            $table->text("final_diagnosis")->nullable();
            $table->enum("prognosis", ["Favorable", "Unfavorable", "Guarded"])->nullable();
            $table->string("vaccine_given")->nullable();
            $table->string("prescribed_medication")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_history_diagnoses');
    }
};
