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
        Schema::create('medical_history_physical_exams', function (Blueprint $table) {
            $table->id();
            
            $table->enum("general_condition", ["N", "AB", "NE"]);
            $table->enum("general_attitude", ["N", "AB", "NE"]);
            $table->enum("hydration", ["N", "AB", "NE"]);
            $table->enum("mucous_membrane", ["N", "AB", "NE"]);
            $table->enum("head_neck", ["N", "AB", "NE"]);
            $table->enum("eyes", ["N", "AB", "NE"]);
            $table->enum("ears", ["N", "AB", "NE"]);
            $table->enum("gastrointestinal", ["N", "AB", "NE"]);
            $table->enum("urogenitals", ["N", "AB", "NE"]);
            $table->enum("respiratory", ["N", "AB", "NE"]);
            $table->enum("circulatory", ["N", "AB", "NE"]);
            $table->enum("musculoskeleton", ["N", "AB", "NE"]);
            $table->enum("lymph_nodes", ["N", "AB", "NE"]);
            $table->enum("venous_return", ["N", "AB", "NE"]);
            $table->enum("integumentary_skin", ["N", "AB", "NE"]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_history_physical_exams');
    }
};
